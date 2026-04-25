import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Code, Terminal, Shield, Zap, Globe, Radar } from 'lucide-react';
import { motion } from 'motion/react';

const Docs = () => {
  return (
    <div className="min-h-screen bg-bg-void text-text-secondary font-sans pb-20 selection:bg-brand-blaze selection:text-white">
      <nav className="border-b border-tactical-border/50 bg-panel-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-4 h-4 text-brand-blaze group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white">Back to Terminal</span>
          </Link>
          <div className="flex items-center gap-3">
             <BookOpen className="w-4 h-4 text-brand-blaze" />
             <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-white">Project_Docs_v4.5</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-20 space-y-24 text-pretty">
        <section className="space-y-8">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="space-y-4"
           >
             <h1 className="text-6xl font-bebas uppercase tracking-tighter text-white">System Architecture</h1>
             <p className="text-lg text-text-muted leading-relaxed">
               SPORTSGUARD is a high-performance media enforcement infrastructure designed for the digital-first sports landscape. 
               The system leverages perceptual fingerprinting to identify unauthorized distributions across the global edge.
             </p>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div className="p-8 border border-tactical-border bg-panel-card space-y-4">
                 <Terminal className="w-8 h-8 text-brand-blaze" />
                 <h3 className="text-white font-bebas text-3xl uppercase tracking-tight">Technical Stack</h3>
                 <ul className="space-y-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    <li>- React 18 / Vite</li>
                    <li>- TypeScript 5.x</li>
                    <li>- Tailwind Engine 4.0</li>
                    <li>- Gemini Intelligence Alpha</li>
                    <li>- Framer Motion Layer</li>
                 </ul>
              </div>
              <div className="p-8 border border-tactical-border bg-panel-card space-y-4">
                 <Shield className="w-8 h-8 text-neon-green" />
                 <h3 className="text-white font-bebas text-3xl uppercase tracking-tight">Security Protocol</h3>
                 <ul className="space-y-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    <li>- AES-256-GCM Vault</li>
                    <li>- Perceptual DNA Hashing</li>
                    <li>- JWT Authentication</li>
                    <li>- Isolated API Proxy</li>
                 </ul>
              </div>
           </div>
        </section>

        <section className="space-y-12">
           <h2 className="text-4xl font-bebas uppercase tracking-tight text-white border-b border-tactical-border pb-4">Operational Workflow</h2>
           
           <div className="space-y-16">
              {[
                {
                  step: "01",
                  title: "Digital DNA Extraction",
                  icon: <Zap className="w-6 h-6" />,
                  desc: "Assets are analyzed via the pHash_v9 engine. This creates a spatial fingerprint of the media that remains consistent even if the video is cropped, re-encoded, or altered in resolution."
                },
                {
                  step: "02",
                  title: "Crawler Deployment",
                  icon: <Globe className="w-6 h-6" />,
                  desc: "Tactical nodes are deployed to scan identified external URIs. The crawler compares external media against the Vault signatures in real-time."
                },
                {
                  step: "03",
                  title: "Threat Detection & Triage",
                  icon: <Radar className="w-6 h-6" />,
                  desc: "The Threat Feed aggregates potential violations, providing a Perceptual Confidence Score. Operators can then initialize enforcement protocols or archive the threat."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                   <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-brand-blaze font-mono font-bold text-lg group-hover:bg-brand-blaze group-hover:text-white transition-all transform group-hover:-rotate-12">
                         {item.step}
                      </div>
                      <div className="w-px h-full bg-tactical-border mt-4"></div>
                   </div>
                   <div className="pt-2 space-y-4">
                      <div className="flex items-center gap-3 text-white">
                         {item.icon}
                         <h4 className="text-2xl font-bold uppercase tracking-tight">{item.title}</h4>
                      </div>
                      <p className="text-text-muted leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        <section className="p-12 bg-brand-blaze/5 border border-brand-blaze/20 relative overflow-hidden">
           <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-blaze/10 blur-[80px] rounded-full"></div>
           <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-brand-blaze">
                 <Code className="w-8 h-8" />
                 <h2 className="text-4xl font-bebas uppercase tracking-tight">API Integration</h2>
              </div>
              <p className="text-text-muted font-mono text-sm leading-relaxed uppercase">
                The SportsGuard system provides a RESTful interface for enterprise integration. All requests must be accompanied by an X-ALPHA-TOKEN in the header.
              </p>
              <div className="bg-black/40 p-6 font-mono text-[10px] text-brand-blaze border border-brand-blaze/10">
                 $ GET /api/v1/vault/validate?dna=F8E2-A1C9-90B2
              </div>
           </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-tactical-border p-12 text-center">
         <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted opacity-50">
            End of Documentation // SportsGuard Defense v4.5
         </p>
      </footer>
    </div>
  );
};

export default Docs;
