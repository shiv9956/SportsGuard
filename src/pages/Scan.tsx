import React, { useState, useEffect, useRef } from 'react';
import api from '../lib/api';
import { 
  Terminal, 
  Play, 
  Square, 
  Loader2, 
  AlertCircle, 
  Link as LinkIcon, 
  ShieldCheck, 
  Database,
  Cpu,
  Radar,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

const Scan = () => {
  const [targetUrl, setTargetUrl] = useState('https://piratesportshub.io/live/premier-league');
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    setLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
  };

  const startScan = async () => {
    setIsScanning(true);
    setLogs([]);
    addLog('INITIATING_SECURE_TUNNEL...');
    
    setTimeout(() => addLog('TUNNEL_ESTABLISHED. IP_MASKING: ACTIVE (PROX_SGP_11)'), 800);
    setTimeout(() => addLog(`FETCHING_TARGET: ${targetUrl}`), 1600);
    setTimeout(() => addLog('TARGET_RESOLVED. PAYLOAD_DETECTED: HLS_AUTO_CONSTRUCT'), 2400);
    setTimeout(() => addLog('EXTRACTING_FRAME_BUFFERS... BATCH_SIZE=128'), 3200);
    setTimeout(() => addLog('PERCEPTUAL_HASH_COMPARISON_IN_PROGRESS... THREADS: 8'), 4000);
    
    try {
      setTimeout(async () => {
        try {
          const { data } = await api.post('/scan', { target_url: targetUrl });
          addLog('>>> ALERT: POSITIVE_MATCH_FOUND <<<');
          addLog(`ASSET_ID: ${data.detections[0].assetId}`);
          addLog(`SIMILARITY_COEFFICIENT: ${data.detections[0].similarity}%`);
          addLog('LOGGING_INCIDENT_TO_DATABASE...');
          addLog('SCAN_COMPLETE. LISTENING_FOR_FEED_UPDATES...');
          setIsScanning(false);
          toast.success('DETECTION_LOGGED: REVIEW_INCIDENT_FEED');
        } catch (err) {
          addLog('CRITICAL_ERROR: API_COMMUNICATION_FAILURE');
          setIsScanning(false);
        }
      }, 5000);
    } catch (err) {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-12 h-full flex flex-col pb-12">
       {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-tactical-border pb-8">
        <div>
           <h1 className="text-7xl font-bebas uppercase tracking-tighter">Crawler Node</h1>
           <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted mt-2 flex items-center gap-2">
             <div className="status-dot bg-brand-blaze status-dot-pulse"></div>
             Active Reconnaissance // Status: {isScanning ? 'RUNNING' : 'STANDBY'}
           </div>
        </div>
        <div className="px-5 py-2 bg-panel-card border border-tactical-border flex items-center gap-3">
           <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-brand-blaze status-dot-pulse' : 'bg-neon-green shadow-[0_0_8px_#32D74B]'}`}></div>
           <span className="font-mono text-[10px] uppercase text-white tracking-widest">Protocol: PHASH_DEEP_SYNC</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-1 min-h-0">
         
         {/* Left: Input Panel */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-panel-card border border-tactical-border p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-bg-void border-b border-l border-tactical-border px-3 py-1 font-mono text-[8px] text-text-muted uppercase tracking-widest">Command_Input</div>
               <h3 className="font-mono text-sm text-white font-bold uppercase tracking-widest mb-10 pb-4 border-b border-tactical-border">Target Directive</h3>
               
               <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="font-mono text-[10px] uppercase text-text-muted tracking-widest flex items-center gap-2">
                       <LinkIcon className="w-3 h-3 text-brand-blaze" /> Input Target URI
                    </label>
                    <input 
                      type="text" 
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      disabled={isScanning}
                      className="w-full bg-bg-void border border-tactical-border p-5 font-mono text-[11px] text-white focus:border-brand-blaze outline-none transition-all disabled:opacity-50 uppercase tracking-widest"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="font-mono text-[10px] uppercase text-text-muted tracking-widest">Scanning Algorithm</label>
                    <div className="relative">
                      <select className="w-full bg-bg-void border border-tactical-border p-5 font-mono text-[11px] text-white uppercase tracking-widest focus:border-brand-blaze outline-none transition-all appearance-none cursor-pointer">
                         <option>PHASH_DEEP_ALGO_v4.5</option>
                         <option>METADATA_EXTRACTOR</option>
                         <option>WATERMARK_PROBE</option>
                      </select>
                      <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted rotate-90" />
                    </div>
                  </div>

                  <button 
                    onClick={isScanning ? () => setIsScanning(false) : startScan}
                    disabled={!targetUrl}
                    className={`w-full font-mono text-xs font-bold py-5 flex items-center justify-center gap-4 transition-all tracking-[0.2em] uppercase ${isScanning ? 'bg-panel-card text-text-muted border border-tactical-border' : 'bg-brand-blaze text-white hover:bg-brand-blaze-hover shadow-[0_10px_30px_-10px_rgba(255,45,85,0.4)]'}`}
                  >
                    {isScanning ? (
                      <>
                        <Square className="w-4 h-4 fill-current" />
                        Abort_Crawl
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        Execute_Scan
                      </>
                    )}
                  </button>
               </div>
            </div>

            <div className="bg-panel-card border border-tactical-border p-6 flex items-center gap-5">
               <div className="w-14 h-14 bg-bg-void border border-tactical-border flex items-center justify-center text-brand-blaze">
                  <Database className="w-6 h-6" />
               </div>
               <div>
                  <div className="font-mono text-[9px] text-text-muted uppercase tracking-widest">Asset Central</div>
                  <div className="font-mono text-[11px] text-white uppercase font-bold tracking-tight">Cloud_Sync: ACTIVE</div>
               </div>
            </div>

            <div className="bg-panel-card border border-tactical-border p-6 flex items-center gap-5">
               <div className="w-14 h-14 bg-bg-void border border-tactical-border flex items-center justify-center text-neon-green">
                  <Cpu className="w-6 h-6" />
               </div>
               <div>
                  <div className="font-mono text-[9px] text-text-muted uppercase tracking-widest">Neural Array</div>
                  <div className="font-mono text-[11px] text-white uppercase font-bold tracking-tight">GPU_Core: STABLE [32°C]</div>
               </div>
            </div>
         </div>

         {/* Right: Console Display */}
         <div className="lg:col-span-8 flex flex-col min-h-[500px]">
            <div className="bg-[#050505] border border-tactical-border flex-1 flex flex-col overflow-hidden relative">
               
               {/* Console Header */}
               <div className="bg-panel-card border-b border-tactical-border px-8 py-4 flex justify-between items-center relative z-20">
                  <div className="flex items-center gap-4">
                    <Terminal className="w-4 h-4 text-brand-blaze" />
                    <span className="font-mono text-[11px] uppercase text-white tracking-[0.2em] font-bold">Node_TTY_Alpha_01</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">{new Date().toLocaleTimeString('en-US', {hour12: false})} UTC</span>
                    <div className="flex gap-2">
                       <span className="w-3 h-3 border border-tactical-border rounded-full"></span>
                       <span className="w-3 h-3 border border-tactical-border rounded-full"></span>
                       <span className="w-3 h-3 bg-brand-blaze/30 border border-brand-blaze rounded-full"></span>
                    </div>
                  </div>
               </div>

               {/* Console Content */}
               <div 
                 ref={scrollRef}
                 className="flex-1 p-10 font-mono text-xs leading-loose text-neon-green overflow-y-auto custom-scrollbar relative z-10"
               >
                  <AnimatePresence>
                    {logs.map((log, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i} 
                        className={`flex gap-6 ${log.includes('ALERT') ? 'text-brand-blaze font-bold bg-brand-blaze/5 p-4 border-l-2 border-brand-blaze my-4 uppercase tracking-tighter' : 'opacity-80'}`}
                      >
                         <span className="text-[#3F3F46] flex-shrink-0 font-bold uppercase tracking-widest">{log.split(']')[0]}]</span>
                         <span className="whitespace-pre-wrap uppercase tracking-wide">{log.split(']')[1]}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isScanning && (
                    <div className="flex items-center gap-3 mt-4">
                       <span className="w-2.5 h-5 bg-neon-green animate-pulse shadow-[0_0_8px_#32D74B]"></span>
                       <span className="text-neon-green uppercase tracking-widest opacity-50 text-[10px]">Processing_Bitstream...</span>
                    </div>
                  )}

                  {!isScanning && logs.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20">
                       <Radar className="w-20 h-20 text-brand-blaze" />
                       <div className="text-center">
                          <p className="uppercase tracking-[0.6em] text-white">System Standby</p>
                          <p className="text-[10px] mt-2 font-mono uppercase tracking-widest">Awaiting Link Initialization</p>
                       </div>
                    </div>
                  )}
               </div>

               {/* Effects Overlay */}
               <div className="absolute inset-0 pointer-events-none z-20 tactical-grid opacity-5"></div>
               <div className="absolute inset-0 scan-line opacity-20 pointer-events-none z-20"></div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default Scan;
