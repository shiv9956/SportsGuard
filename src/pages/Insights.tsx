import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { 
  BrainCircuit, 
  Terminal as TerminalIcon, 
  ShieldAlert, 
  Zap, 
  Network, 
  Send,
  Loader2,
  Sparkles,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const Insights = () => {
  const [query, setQuery] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const handleIdentifyThreats = async () => {
    setIsTyping(true);
    const mockContext = "The current threat landscape shows a 15% increase in mirrored HLS streams on TikTok and Telegram. Source nodes appear to be concentrated in Eastern Europe. A new obfuscation technique using frame-rotation was detected in 3 instances.";
    
    try {
      const prompt = `As the SportsGuard AI Analyst, analyze this threat data: "${mockContext}". 
      Provide a tactical intelligence summary with headings: 
      1. THREAT_VECTOR_ANALYSIS
      2. SOURCE_NODE_GEOLOCATION
      3. MITIGATION_PROTOCOLS
      Maintain a professional, tactical, intelligence-grade tone. Use uppercase for labels.`;

      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      const text = response.text || '';
      
      setChat(prev => [...prev, { role: 'ai', content: text }]);
    } catch (err) {
      toast.error('AI_LINK_FAILURE');
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const userMsg = query;
    setQuery('');
    setChat(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const prompt = `Context: You are the SportsGuard Tactical AI Assistant. You assist sports organizations in protecting media assets. 
      You have access to perceptual hash logs and global crawl data. 
      Analyze the following commander request: "${userMsg}"
      Respond in a concise, tactical format. Use terminal formatting if appropriate.`;

      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      const text = response.text || '';
      
      setChat(prev => [...prev, { role: 'ai', content: text }]);
    } catch (err) {
      toast.error('COMM_FAILURE: AI_OFFLINE');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-12 h-screen flex flex-col -mt-8 -mx-8 overflow-hidden">
       {/* Inner Header */}
       <div className="p-8 pb-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
             <h1 className="text-7xl font-bebas uppercase tracking-tighter">AI Intelligence</h1>
             <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-blaze mt-2 flex items-center gap-2">
               <BrainCircuit className="w-4 h-4" />
               Neural Core Alpha // Model: Gemini_Enterprise_Ops
             </div>
          </div>
          <div className="flex gap-4">
             <button 
               onClick={handleIdentifyThreats}
               className="px-8 py-3 bg-brand-blaze/10 border border-brand-blaze/30 text-brand-blaze font-mono text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-brand-blaze hover:text-white transition-all flex items-center gap-3 shadow-[0_0_15px_rgba(255,45,85,0.1)]"
             >
                <Zap className="w-4 h-4" />
                Regenerate_Global_Summary
             </button>
          </div>
       </div>

       <div className="flex-1 flex min-h-0 mt-8 border-t border-tactical-border">
          
          {/* Left: Intelligence Summary */}
          <div className="w-1/3 border-r border-tactical-border bg-[#050505] p-8 space-y-10 overflow-y-auto custom-scrollbar">
             <div className="space-y-8">
                <h3 className="font-mono text-xs text-white font-bold uppercase tracking-[0.2em] flex items-center gap-3 border-b border-tactical-border pb-4">
                   Deployment Insights
                </h3>
                
                {[
                  { title: "Network Risk", value: "ELEVATED", color: "text-brand-blaze" },
                  { title: "Active Nodes", value: "42 Identified", color: "text-white" },
                  { title: "AI Confidence", value: "98.4%", color: "text-neon-green" },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center bg-panel-card p-5 border border-tactical-border">
                    <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest font-bold">{stat.title}</span>
                    <span className={`font-mono text-[11px] font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
             </div>

             <div className="space-y-6">
                <h3 className="font-mono text-[10px] text-text-muted uppercase tracking-[0.4em] mb-4 font-bold">Strategic_Directives</h3>
                <div className="space-y-4">
                   <div className="p-6 bg-panel-card border-l-2 border-brand-blaze border-r border-t border-b border-tactical-border space-y-3">
                      <div className="font-mono text-[10px] text-brand-blaze font-bold uppercase tracking-widest">Alert: Mirroring Spike</div>
                      <p className="font-mono text-[11px] text-text-muted leading-relaxed uppercase tracking-tight">System detected coordinated leak pattern in SEA region. 12 domains added to priority crawl list.</p>
                   </div>
                   <div className="p-6 bg-panel-card border-l-2 border-white border-r border-t border-b border-tactical-border space-y-3">
                      <div className="font-mono text-[10px] text-white font-bold uppercase tracking-widest">Core Update: PHASH_v9</div>
                      <p className="font-mono text-[11px] text-text-muted leading-relaxed uppercase tracking-tight">Successfully optimized frame-rotation detection algorithm. False negative rate reduced by 2.4%.</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Right: Tactical Analyst Chat */}
          <div className="flex-1 flex flex-col bg-bg-void relative">
             <div className="absolute inset-0 tactical-grid opacity-5 pointer-events-none"></div>
             
             {/* Chat Monitor */}
             <div 
               ref={scrollRef}
               className="flex-1 p-10 overflow-y-auto custom-scrollbar flex flex-col gap-8 relative z-10"
             >
                {chat.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-8 opacity-20 h-full">
                     <Sparkles className="w-20 h-20 text-brand-blaze" />
                     <div className="text-center font-mono text-xl uppercase tracking-[0.6em] text-white">Awaiting_Query_Stream</div>
                  </div>
                )}

                {chat.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                     <div className={`max-w-2xl p-8 border ${
                       msg.role === 'user' 
                        ? 'bg-panel-card border-tactical-border text-white' 
                        : 'bg-[#0a0a0a] border-brand-blaze/30 text-white scan-line shadow-[0_10px_40px_-20px_rgba(255,45,85,0.2)]'
                     }`}>
                        <div className="flex items-center gap-3 mb-6 border-b border-tactical-border pb-4">
                           {msg.role === 'user' ? <TerminalIcon className="w-4 h-4 text-text-muted" /> : <BrainCircuit className="w-4 h-4 text-brand-blaze" />}
                           <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">
                             {msg.role === 'user' ? 'Operator Command' : 'Tactical AI Intelligence'}
                           </span>
                        </div>
                        <div className="font-mono text-xs leading-relaxed uppercase tracking-wide">
                           {msg.role === 'ai' ? (
                             <div className="terminal-text text-[#E4E4E7]">{msg.content}</div>
                           ) : msg.content}
                        </div>
                     </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                     <div className="bg-panel-card border border-brand-blaze/30 p-6 flex items-center gap-4">
                        <Loader2 className="w-4 h-4 text-brand-blaze animate-spin" />
                        <span className="font-mono text-[11px] text-brand-blaze uppercase tracking-[0.3em] font-bold animate-pulse">Neural_Processing...</span>
                     </div>
                  </div>
                )}
             </div>

             {/* Input Bar */}
             <div className="p-10 border-t border-tactical-border bg-panel-card/30 backdrop-blur-md z-20">
                <form onSubmit={handleQuery} className="flex gap-6 max-w-5xl mx-auto">
                   <div className="flex-1 bg-bg-void border border-tactical-border p-1 flex items-center transition-all focus-within:border-brand-blaze shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
                      <div className="px-6 text-text-muted"><Search className="w-5 h-5" /></div>
                      <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="ENTER_STRATEGIC_QUERY..." 
                        className="flex-1 bg-transparent border-none text-white font-mono text-[12px] py-5 focus:ring-0 uppercase tracking-[0.3em] placeholder:text-[#27272A]"
                      />
                   </div>
                   <button className="bg-brand-blaze text-white px-12 py-5 font-mono text-xs font-bold flex items-center gap-5 hover:bg-brand-blaze-hover transition-all transform active:scale-95 group tracking-[0.3em] shadow-[0_10px_30px_-10px_rgba(255,45,85,0.4)]">
                      EXECUTE
                      <Send className="w-4 h-4 group-hover:translate-x-1 p-0 transition-transform" />
                   </button>
                </form>
             </div>
          </div>

       </div>
    </div>
  );
};

export default Insights;
