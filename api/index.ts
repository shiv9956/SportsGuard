import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || "sportsguard-tactical-secret";

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// In-memory "DB" for demo (Warning: Stateless on Vercel)
const db = {
  users: [] as any[],
  assets: [] as any[],
  detections: [] as any[],
  takedowns: [] as any[],
};

// Seed Demo Data
const seedData = async () => {
  const hashedPass = await bcrypt.hash("DemoPass123!", 10);
  db.users.push({
    id: uuidv4(),
    email: "demo@sportsguard.io",
    password: hashedPass,
    organization: "SportsGuard Demo League",
    full_name: "Lead Operator",
  });
};
seedData();

// Auth Middleware
const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Auth Routes
app.post("/api/auth/register", async (req, res) => {
  const { email, password, organization, full_name } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing credentials" });
  if (db.users.find(u => u.email === email.toLowerCase())) return res.status(400).json({ error: "User exists" });
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), email: email.toLowerCase(), password: hashedPassword, organization, full_name };
  db.users.push(user);
  
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, organization, full_name } });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email.toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, organization: user.organization, full_name: user.full_name } });
});

// Assets Routes
app.post("/api/assets", authenticate, (req: any, res) => {
  const { title, sport, event, description, image_base64 } = req.body;
  const asset = {
    id: uuidv4(),
    userId: req.user.id,
    title,
    sport,
    event,
    description,
    thumbnail: image_base64,
    pHash: "a9b4c7d2e1f08833",
    createdAt: new Date().toISOString(),
  };
  db.assets.push(asset);
  res.json(asset);
});

app.get("/api/assets", authenticate, (req: any, res) => {
  res.json(db.assets.filter(a => a.userId === req.user.id));
});

// Scan Routes
app.post("/api/scan", authenticate, (req: any, res) => {
  const { target_url } = req.body;
  const newDetections = [
    {
      id: uuidv4(),
      userId: req.user.id,
      assetId: db.assets[0]?.id || "NBA_FINALS_G7_0042",
      sourceUrl: target_url,
      imageUrl: "https://images.unsplash.com/photo-1773161009810-3625731b769f",
      similarity: 94.2,
      status: "NEW",
      platform: "TikTok",
      timestamp: new Date().toISOString(),
    }
  ];
  db.detections.push(...newDetections);
  res.json({ summary: `Found ${newDetections.length} infringements.`, detections: newDetections });
});

app.get("/api/detections", authenticate, (req: any, res) => {
  res.json(db.detections.filter(d => d.userId === req.user.id).reverse());
});

app.get("/api/stats/dashboard", authenticate, (req: any, res) => {
  const userAssets = db.assets.filter(a => a.userId === req.user.id).length;
  const userDetections = db.detections.filter(d => d.userId === req.user.id).length;
  res.json({
    assets_protected: userAssets + 12450,
    infringements_detected: userDetections + 342,
    integrity_score: 98,
    platform_breakdown: [
      { label: "TikTok", value: 55 },
      { label: "X (Twitter)", value: 25 },
      { label: "Reddit", value: 15 },
      { label: "Other", value: 5 },
    ]
  });
});

// Handling production static files or dev middleware
const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

if (!isProd) {
  // We'll handle this in a separate server for local dev to avoid Vite in serverless
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    // Only serve index.html if it exists and it's not an API route
    if (!req.path.startsWith('/api')) {
       res.sendFile(path.join(distPath, "index.html"), (err) => {
         if (err) res.status(404).send("Not Found");
       });
    } else {
       res.status(404).json({ error: "API Route Not Found" });
    }
  });
}

// Local dev listener logic
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  const startDev = async () => {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    const PORT = 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`[DEV] Server running at http://localhost:${PORT}`);
    });
  };
  startDev();
}

export default app;
