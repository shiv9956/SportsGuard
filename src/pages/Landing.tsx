import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Radar, Zap, Lock, Eye, Gavel, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#A1A1AA] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 tactical-grid opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blaze/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="absolute top-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-brand-blaze"></div>
          <span className="text-white font-bold tracking-tighter text-xl md:text-2xl uppercase" style={{ fontFamily: "'Arial Narrow', sans-serif" }}>SportsGuard</span>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
           <Link to="/login" className="hidden sm:block font-mono text-xs uppercase tracking-widest text-text-muted hover:text-white transition-colors">Client Terminal</Link>
           <Link to="/login">
             <button className="bg-white text-black font-mono text-[10px] md:text-[11px] px-4 md:px-6 py-2 md:py-2.5 tracking-[0.2em] uppercase hover:bg-brand-blaze hover:text-white transition-all transform active:scale-95">
               Authenticate
             </button>
           </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 text-center max-w-4xl px-6 pt-24 md:pt-0 space-y-8 md:space-y-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-4"
        >
          <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-brand-blaze inline-block border border-brand-blaze/30 px-3 md:px-4 py-1 bg-brand-blaze/5 mb-4 max-w-full truncate">
            Next-Gen Asset Defense // 2026.SG
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[140px] font-bold tracking-tighter leading-none mb-4 uppercase break-words" style={{ fontFamily: "'Arial Narrow', sans-serif" }}>
            <span className="text-brand-blaze">Sports</span><span className="text-white">Guard</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-text-muted font-medium tracking-tight max-w-2xl mx-auto px-4">
            Digital Asset Protection for Sports Media. Register, Fingerprint, and Neutralize unauthorized usage across the global edge.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/login">
            <button className="bg-brand-blaze text-white font-mono text-xs px-12 py-5 tracking-[0.3em] uppercase hover:bg-[#FF3B6B] transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_-10px_rgba(255,45,85,0.4)]">
              INITIALIZE_PROTECTION
            </button>
          </Link>
          <Link to="/docs">
            <button className="border border-tactical-border text-white font-mono text-xs px-12 py-5 tracking-[0.3em] uppercase hover:bg-white/5 transition-all w-full sm:w-auto">
              DOCUMENTATION_v4.5
            </button>
          </Link>
        </motion.div>

        {/* Feature Tickers */}
        <div className="pt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
           <div className="space-y-2 border-l border-brand-blaze/30 pl-6">
              <div className="text-white font-mono text-xs uppercase tracking-widest font-bold">Perceptual Hashing</div>
              <div className="text-[11px] leading-relaxed uppercase tracking-wide text-text-muted">Instant DNA mapping for media assets. Immune to re-encoded crops and resolution shifts.</div>
           </div>
           <div className="space-y-2 border-l border-white/10 pl-6">
              <div className="text-white font-mono text-xs uppercase tracking-widest font-bold">AI Threat Intel</div>
              <div className="text-[11px] leading-relaxed uppercase tracking-wide text-text-muted">Real-time crawler network identifying leaks on P2P, Social, and Dark Web IPTV nodes.</div>
           </div>
           <div className="space-y-2 border-l border-white/10 pl-6">
              <div className="text-white font-mono text-xs uppercase tracking-widest font-bold">Automated Takedown</div>
              <div className="text-[11px] leading-relaxed uppercase tracking-wide text-text-muted">One-click DMCA issuance with direct integration to CDN and ISP legal terminals.</div>
           </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="absolute bottom-6 md:bottom-12 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-end font-mono text-[9px] uppercase tracking-widest text-[#52525B] gap-4">
        <div className="flex flex-col gap-1 text-text-muted items-center md:items-start text-center md:text-left">
          <div>LATENCY: 14MS // CLOUD_RUN_REGION: US-CENTRAL1</div>
          <div>ENCRYPTION: AES-256-GCM // SECURITY_LEVEL: ALPHA</div>
        </div>
        <div className="flex gap-8 items-center">
          <span className="text-neon-green">STATUS: OPTIMAL</span>
          <span>© 2026 SPORTSGUARD SYSTEM</span>
        </div>
      </footer>
    </div>
  );
};

// Placeholder for Activity icon
const Activity = (props: any) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

export default Landing;
