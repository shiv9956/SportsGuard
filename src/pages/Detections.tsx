import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { 
  ShieldAlert, 
  ExternalLink, 
  Clock, 
  Gavel, 
  MoreHorizontal,
  ChevronRight,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

const Detections = () => {
  const [detections, setDetections] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetections();
  }, []);

  const fetchDetections = async () => {
    try {
      const { data } = await api.get('/detections');
      setDetections(data);
      if (data.length > 0) setSelected(data[0]);
    } catch (err) {
      toast.error('FAILED_TO_SYNC_DETECTIONS');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, status: string) => {
    toast.info(`UPDATING_STATUS: ${status}`);
    setDetections(prev => prev.map(d => d.id === id ? { ...d, status } : d));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const issueTakedown = (id: string) => {
    toast.success('DMCA_NOTICE_GENERATED: DISPATCHED_TO_LEGAL_NODE');
    handleAction(id, 'TAKEDOWN_ISSUED');
  };

  if (loading) return <div className="text-brand-blaze font-mono text-[10px] animate-pulse">SYNCHRONIZING_THREAT_DATABASE...</div>;

  return (
    <div className="space-y-12 h-screen flex flex-col -mt-8 -mx-8 overflow-hidden">
       {/* Inner Header */}
       <div className="p-8 pb-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
             <h1 className="text-7xl font-bebas uppercase tracking-tighter">Threat Feed</h1>
             <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-blaze mt-2 flex items-center gap-2">
               <div className="status-dot bg-brand-blaze status-dot-pulse"></div>
               Live Global Monitoring // Triage Required
             </div>
          </div>
          <div className="flex gap-4 font-mono text-[10px] text-text-muted uppercase tracking-widest">
             <span>Nodes Active: 1,024</span>
             <span>Last Sync: {new Date().toISOString().split('T')[1].split('.')[0]}Z</span>
          </div>
       </div>

       <div className="flex-1 flex min-h-0 border-t border-tactical-border mt-8 relative">
          
          {/* Left: Incident Queue */}
          <div className={`${selected && 'hidden md:flex'} w-full md:w-96 border-r border-tactical-border flex flex-col bg-bg-void overflow-hidden absolute inset-0 md:relative z-20`}>
             <div className="p-4 px-6 border-b border-tactical-border bg-panel-card/50 flex justify-between items-center">
                <span className="font-mono text-[10px] uppercase text-text-muted tracking-widest font-bold">Inbound Queue</span>
                <span className="bg-brand-blaze/10 border border-brand-blaze/30 px-2 py-0.5 text-brand-blaze font-mono text-[9px] uppercase font-bold">
                  {detections.filter(d => d.status === 'NEW').length} Potential Threats
                </span>
             </div>
             
             <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-tactical-border">
                {detections.map((d) => (
                  <div 
                    key={d.id} 
                    onClick={() => setSelected(d)}
                    className={`p-6 cursor-pointer transition-all relative ${selected?.id === d.id ? 'bg-panel-card' : 'hover:bg-white/5 opacity-60'}`}
                  >
                     {selected?.id === d.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blaze"></div>}
                     
                     <div className="flex justify-between items-start mb-3">
                        <span className={`font-mono text-[9px] px-1.5 py-0.5 border uppercase font-bold tracking-widest ${
                          d.status === 'NEW' ? 'text-brand-blaze border-brand-blaze/30 bg-brand-blaze/5' : 
                          d.status === 'TAKEDOWN_ISSUED' ? 'text-neon-green border-neon-green/30 bg-neon-green/5' : 
                          'text-text-muted border-tactical-border'
                        }`}>
                          {d.status?.replace('_', ' ') || 'UNKNOWN'}
                        </span>
                        <span className="font-mono text-[9px] text-text-muted">ID_{d.id?.substring(0,6) || 'XXXXXX'}</span>
                     </div>

                     <h3 className="font-mono text-xs text-white uppercase font-bold tracking-tight mb-1">{d.platform} NODE_{d.id?.substring(6,10) || 'XXXX'}</h3>
                     <p className="font-mono text-[9px] text-text-muted truncate uppercase tracking-widest">{d.sourceUrl}</p>
                     
                     <div className="mt-4 flex items-center justify-between border-t border-tactical-border pt-3">
                        <div className="flex items-center gap-2">
                           <ShieldAlert className={`w-3 h-3 ${d.similarity > 90 ? 'text-brand-blaze' : 'text-text-secondary'}`} />
                           <span className={`font-mono text-[10px] font-bold ${d.similarity > 90 ? 'text-brand-blaze' : 'text-text-secondary'}`}>
                             {d.similarity}% MATCH
                           </span>
                        </div>
                        <ChevronRight className={`w-3 h-3 transition-transform ${selected?.id === d.id ? 'translate-x-1 text-brand-blaze' : 'text-text-muted'}`} />
                     </div>
                  </div>
                ))}
                {detections.length === 0 && !loading && (
                  <div className="p-12 text-center text-text-muted font-mono text-[10px] uppercase">No active threats logged</div>
                )}
             </div>
          </div>

          {/* Right: Detail View */}
          <div className={`${!selected && 'hidden md:flex'} flex-1 bg-[#050505] flex flex-col min-w-0 absolute inset-0 md:relative z-30`}>
             <AnimatePresence mode="wait">
               {selected ? (
                 <motion.div 
                   key={selected.id}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="flex-1 flex flex-col overflow-hidden"
                 >
                    {/* Header Strip */}
                    <div className="p-6 md:p-10 border-b border-tactical-border bg-panel-card flex flex-col sm:flex-row justify-between items-start sm:items-end backdrop-blur-md gap-4">
                       <div>
                          <button 
                            onClick={() => setSelected(null)}
                            className="md:hidden flex items-center gap-2 font-mono text-[10px] text-brand-blaze uppercase tracking-widest mb-4 border border-brand-blaze/30 px-3 py-1"
                          >
                             <ChevronRight className="w-3 h-3 rotate-180" /> Back to Queue
                          </button>
                          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.4em] mb-3">Threat_Dossier: Verified Leak</div>
                          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none" style={{ fontFamily: "'Arial Narrow', sans-serif" }}>
                             {selected.platform} Analysis
                          </h2>
                       </div>
                       <div className="text-left sm:text-right w-full sm:w-auto">
                          <div className="font-mono text-[9px] text-brand-blaze uppercase tracking-widest mb-2 font-bold">Perceptual Confidence</div>
                          <div className="text-4xl md:text-6xl font-bold text-brand-blaze leading-none" style={{ fontFamily: "'Arial Narrow', sans-serif" }}>{selected.similarity}%</div>
                       </div>
                    </div>

                    {/* Comparison Grid */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10 custom-scrollbar">
                       
                       {/* Master Asset */}
                       <div className="space-y-4">
                          <div className="flex justify-between items-center px-4 py-2 bg-neon-green/5 border-l-2 border-neon-green border-r border-t border-b border-tactical-border">
                             <span className="font-mono text-[10px] text-white uppercase font-bold tracking-widest">Authorized Master Stream</span>
                             <span className="font-mono text-[9px] text-neon-green uppercase font-bold tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_8px_#32D74B]"></div>
                                VALID_SEED
                             </span>
                          </div>
                          <div className="aspect-[16/9] bg-black border border-tactical-border relative group overflow-hidden">
                             <img src="https://images.unsplash.com/photo-1773161009810-3625731b769f" className="w-full h-full object-cover grayscale opacity-40" alt="original" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                <Eye className="w-12 h-12 text-neon-green/10" />
                             </div>
                             <div className="absolute top-4 left-4 font-mono text-[8px] text-text-muted uppercase tracking-widest">Node_Alpha_Source_41.2</div>
                          </div>
                       </div>

                       {/* Captured Infringement */}
                       <div className="space-y-4">
                          <div className="flex justify-between items-center px-4 py-2 bg-brand-blaze/10 border-l-2 border-brand-blaze border-r border-t border-b border-tactical-border">
                             <span className="font-mono text-[10px] text-white uppercase font-bold tracking-widest">Inbound Illicit Capture</span>
                             <span className="font-mono text-[9px] text-brand-blaze uppercase font-bold tracking-widest animate-pulse">Violation</span>
                          </div>
                          <div className="aspect-[16/9] bg-black border border-brand-blaze relative group overflow-hidden scan-line">
                             <img src={selected.imageUrl} className="w-full h-full object-cover grayscale brightness-125 contrast-150 opacity-80" alt="violation" />
                             <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white bg-brand-blaze px-2 py-1 uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(255,45,85,0.4)]">
                                THREAT_PROCESSED
                             </div>
                          </div>
                       </div>

                       {/* Metadata Compare */}
                       <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="p-6 md:p-8 bg-panel-card border border-tactical-border scan-line">
                             <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.3em] mb-4">Metadata Analysis</div>
                             <div className="space-y-4">
                                <div>
                                   <div className="text-[10px] font-mono text-text-muted uppercase leading-none mb-1">Source Domain</div>
                                   <div className="font-mono text-xs text-white truncate font-bold">{selected.sourceUrl}</div>
                                </div>
                                <div>
                                   <div className="text-[10px] font-mono text-text-muted uppercase leading-none mb-1">Fingerprint (pHash)</div>
                                   <div className="font-mono text-xs text-brand-blaze break-all uppercase tracking-tighter">{selected.pHash || 'A9B4C7D2E1F08833'}</div>
                                </div>
                             </div>
                          </div>
                          
                          <div className="p-6 md:p-8 bg-panel-card border border-tactical-border">
                             <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.3em] mb-4">Infection Metrics</div>
                             <div className="flex justify-between">
                                <div>
                                   <div className="text-3xl md:text-4xl font-bold text-white leading-none" style={{ fontFamily: "'Arial Narrow', sans-serif" }}>423</div>
                                   <div className="font-mono text-[9px] text-text-muted uppercase mt-2">Active Nodes</div>
                                </div>
                                <div className="w-px h-full bg-tactical-border"></div>
                                <div className="text-right">
                                   <div className="text-3xl md:text-4xl font-bold text-white leading-none" style={{ fontFamily: "'Arial Narrow', sans-serif" }}>1.8s</div>
                                   <div className="font-mono text-[9px] text-text-muted uppercase mt-2">Detection Latency</div>
                                </div>
                             </div>
                          </div>

                          <div className="p-6 md:p-8 bg-panel-card border border-tactical-border flex flex-col justify-between">
                             <div>
                                <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.3em] mb-2">Protocol Status</div>
                                <div className="text-lg md:text-xl font-mono text-white font-bold uppercase tracking-widest underline decoration-brand-blaze underline-offset-8 decoration-2">{selected.status}</div>
                             </div>
                             <div className="flex gap-2 mt-6 md:mt-4">
                                <button 
                                  onClick={() => handleAction(selected.id, 'FALSE_ALARM')}
                                  className="flex-1 py-3 md:py-2 border border-tactical-border text-text-muted hover:text-white transition-colors font-mono text-[9px] uppercase tracking-widest"
                                >
                                  FALSE_ALARM
                                </button>
                                <button 
                                  onClick={() => handleAction(selected.id, 'URGENT')}
                                  className="flex-1 py-3 md:py-2 bg-brand-blaze/10 border border-brand-blaze/30 text-brand-blaze font-mono text-[9px] uppercase tracking-widest font-bold"
                                >
                                  FLAG_URGENT
                                </button>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-6 md:p-8 border-t border-tactical-border bg-panel-card flex flex-col sm:flex-row justify-end gap-4 md:gap-6 items-stretch sm:items-center">
                       <button 
                         onClick={() => {
                           setDetections(prev => prev.filter(d => d.id !== selected.id));
                           setSelected(null);
                           toast.success('THREAT_ARCHIVED: MOVED_TO_COLD_STORAGE');
                         }}
                         className="font-mono text-[10px] md:text-xs px-6 md:px-10 py-4 md:py-5 border border-tactical-border text-text-muted uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-white/5 hover:text-white transition-all shadow-sm"
                       >
                          ARCHIVE_THREAT
                       </button>
                       <button 
                         onClick={() => issueTakedown(selected.id)}
                         disabled={selected.status === 'TAKEDOWN_ISSUED'}
                         className="font-mono text-[10px] md:text-xs px-8 md:px-12 py-4 md:py-5 bg-brand-blaze text-white font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-brand-blaze-hover transition-all transform active:scale-95 flex items-center justify-center gap-3 md:gap-4 disabled:opacity-50 disabled:grayscale shadow-[0_10px_30px_-10px_rgba(255,45,85,0.4)]"
                       >
                          <Gavel className="w-4 h-4 md:w-5 md:h-5" />
                          {selected.status === 'TAKEDOWN_ISSUED' ? 'ENFORCEMENT_ISSUED' : 'INITIALIZE_TAKEDOWN'}
                       </button>
                    </div>
                 </motion.div>
               ) : (
                 <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-30 h-full">
                    <Search className="w-16 h-16 md:w-24 md:h-24 text-text-muted" />
                    <div className="text-center font-mono text-lg md:text-xl uppercase tracking-[0.3em] md:tracking-[0.4em] text-text-muted p-6">SELECT_INCIDENT_FOR_ANALYSIS</div>
                 </div>
               )}
             </AnimatePresence>
          </div>

       </div>
    </div>
  );
};

export default Detections;
