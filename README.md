# SPORTSGUARD | Tactical Media Enforcement System

SPORTSGUARD is a full-stack media protection platform designed to secure high-stakes sports content using perceptual fingerprinting and AI-driven threat analysis. The system provides a centralized terminal for registering official media, crawling external nodes for illicit distributions, and automating the DMCA enforcement workflow.

## Technical Architecture

The application is built on a modern high-performance stack:

- **Frontend**: React 18+ with Vite for sub-second build times.
- **Styling**: Tailwind CSS for a utility-first, tactical-grade UI/UX.
- **Backend**: Node.js / Express server proxying API requests and handling asset logic.
- **Animations**: Framer Motion for hardware-accelerated interface transitions.
- **Digital DNA**: Implementation of perceptual hashing (pHash) simulation for unique media identification.
- **AI Core**: Google Gemini model integration for intelligent threat detection and tactical response recommendation.

## Core Modules

### 1. Asset Vault (Digital DNA)
The entry point for media authentication. Users register official video streams or URLs. The system executes a "Deep Analysis" phase to generate a unique digital signature (pHash) that is immune to basic compression or rotation changes.

### 2. Crawler Node (Active Recon)
A simulated web-crawling terminal that executes target directives. It scans external URIs against the internal Vault database to identify matching perceptual signatures across the web.

### 3. Threat Feed (Detections)
A real-time triage queue that logs potential violations. Each detection includes a "Perceptual Confidence Score" comparing the inbound illicit capture against the authorized master seed.

### 4. AI Tactical Analyst
An integrated intelligence engine powered by Gemini that provides strategic summaries of the threat landscape and assists operators in drafting mitigation protocols.

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd sportsguard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and add your credentials:
   ```env
   GEMINI_API_KEY=your_api_key_here
   VITE_API_URL=http://localhost:3000/api
   JWT_SECRET=your_secure_secret
   ```

## Operating Procedure

### Phase 1: Media Registration
1. Access the **Asset Vault**.
2. Select **Register_New_Media**.
3. Input the Master URL or identifier.
4. Wait for the **PHASH_V9** deep analysis to complete. The media is now "Locked."

### Phase 2: Deployment of Crawler
1. Navigate to the **Crawler Node**.
2. Enter a target URI (e.g., a suspected streaming site).
3. Execute **Start_Scan**.
4. Monitor the live terminal logs for signature matches.

### Phase 3: Threat Triage & Enforcement
1. Open the **Threat Feed** to view incident reports.
2. Select an incident to view the side-by-side comparison.
3. Verify the **Confidence Score**.
4. If a violation is confirmed, trigger **INITIALIZE_TAKEDOWN** to execute the enforcement protocol.

### Phase 4: Intelligence Gathering
1. Use the **AI Intelligence** panel to query the system.
2. Request reports such as "Identify leak hotspots" or "Generate mitigation summary."
3. Review global network risk levels.
