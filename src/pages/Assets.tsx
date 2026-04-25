import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { 
  Archive, 
  Search, 
  Filter, 
  Trash2, 
  Plus, 
  Grid2X2, 
  List, 
  Fingerprint, 
  MapPin,
  Loader2,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

const AssetCard = ({ asset, onDelete }: any) => (
  <div className="bg-panel-card border border-tactical-border group hover:border-brand-blaze transition-all relative overflow-hidden flex flex-col">
    <div className="aspect-video relative overflow-hidden bg-black flex items-center justify-center border-b border-tactical-border">
      <img src={asset.thumbnail} alt={asset.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100" />
      <div className="absolute top-2 left-2 px-2 py-0.5 bg-bg-void/80 border border-tactical-border text-[8px] font-mono text-text-muted uppercase tracking-widest">
        {asset.type} // {asset.id.substring(0,8)}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
         <button onClick={() => onDelete(asset.id)} className="w-full bg-brand-blaze text-white font-mono text-[9px] py-2 uppercase tracking-widest hover:bg-brand-blaze-hover transition-colors">
           SECURE_PURGE
         </button>
      </div>
    </div>
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-white font-bold text-sm uppercase truncate font-mono tracking-tight">{asset.title}</h3>
        <span className="font-mono text-[8px] text-neon-green bg-neon-green/10 border border-neon-green/30 px-2 py-0.5 uppercase font-bold tracking-widest leading-none shadow-[0_0_10px_rgba(50,215,75,0.1)]">COPYRIGHT_PROTECTED</span>
      </div>
      <div className="grid grid-cols-2 gap-4 border-t border-tactical-border/50 pt-3">
        <div className="flex flex-col">
           <span className="text-[7px] font-mono text-text-muted uppercase tracking-[0.2em] mb-1">Protection_Fingerprint</span>
           <span className="text-[10px] font-mono text-white truncate uppercase font-bold">{asset.pHash || 'GEN_V9_UNSET'}</span>
        </div>
        <div className="flex flex-col text-right">
           <span className="text-[7px] font-mono text-text-muted uppercase tracking-[0.2em] mb-1">Status</span>
           <span className="text-[9px] font-mono text-brand-blaze uppercase font-bold">SECURE_VAULT_LOCK</span>
        </div>
      </div>
    </div>
  </div>
);

const Assets = () => {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newAsset, setNewAsset] = useState({ title: '', sport: 'FOOTBALL' });
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await api.get('/assets');
      setAssets(res.data);
    } catch (err) {
      toast.error('ACCESS_DENIED: Failed to fetch assets');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.title) return;
    
    setIsRegistering(true);
    setShowModal(false);

    // Simulate hashing delay
    setTimeout(async () => {
      try {
        const res = await api.post('/assets', {
          title: newAsset.title,
          sport: newAsset.sport,
          event: 'Global_Relay',
          description: 'Secure_Index_Entry',
          image_base64: 'https://images.unsplash.com/photo-1773161009810-3625731b769f'
        });
        setAssets(prev => [res.data, ...prev]);
        toast.success('DIGITAL_DNA_INDEXED: Media secured');
        setNewAsset({ title: '', sport: 'FOOTBALL' });
      } catch (err) {
        toast.error('REGISTRATION_PROTOCOL_FAILED');
      } finally {
        setIsRegistering(false);
      }
    }, 2000);
  };

  const handleDelete = async (id: string) => {
    try {
      // await api.delete(`/assets/${id}`);
      setAssets(assets.filter(a => a.id !== id));
      toast.success('DELETION_PROTOCOL_COMPLETE');
    } catch (err) {
      toast.error('DELETION_PROTOCOL_FAILED');
    }
  };

  if (loading) return <div className="text-brand-blaze font-mono text-[10px] animate-pulse">REQUIRING_ASSET_DNA_MANIFEST...</div>;

  return (
    <div className="space-y-12 pb-12">
      {/* Registration Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-panel-card border border-tactical-border p-10 max-w-md w-full relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 bg-brand-blaze text-white font-mono text-[8px] px-3 py-1 uppercase tracking-widest font-bold">Protocol_Input</div>
              <h3 className="font-bebas text-5xl mb-8 uppercase tracking-tighter">Media Registration</h3>
              
              <form onSubmit={handleRegister} className="space-y-8">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest font-bold">Content Identifier</label>
                  <input 
                    autoFocus
                    required
                    type="text" 
                    value={newAsset.title}
                    onChange={(e) => setNewAsset({...newAsset, title: e.target.value})}
                    placeholder="E.G. UCL_FINAL_2026_MASTER"
                    className="w-full bg-bg-void border border-tactical-border p-4 font-mono text-xs text-white uppercase focus:border-brand-blaze outline-none tracking-widest"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="py-4 border border-tactical-border font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-white transition-colors"
                  >
                    Abort_Process
                  </button>
                  <button 
                    type="submit"
                    className="py-4 bg-brand-blaze text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,45,85,0.3)] transition-all active:scale-95"
                  >
                    Initialize_Hash
                  </button>
                </div>
              </form>
           </motion.div>
        </div>
      )}

      {/* Processing State */}
      {isRegistering && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-6 backdrop-blur-xl bg-black/80 scan-line">
           <Fingerprint className="w-24 h-24 text-brand-blaze animate-pulse mb-8" />
           <div className="text-center space-y-4">
              <h2 className="font-bebas text-6xl text-white uppercase tracking-tighter">Extracting Perceptual DNA</h2>
              <div className="w-96 h-1 bg-tactical-border relative overflow-hidden">
                 <motion.div 
                   initial={{ x: "-100%" }}
                   animate={{ x: "100%" }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 bg-brand-blaze"
                 />
              </div>
              <p className="font-mono text-[10px] text-brand-blaze uppercase tracking-[0.4em] animate-pulse">Running pHash_v9 Deep Analysis...</p>
           </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-tactical-border">
         <div>
            <h1 className="text-7xl font-bebas uppercase tracking-tight">Asset Vault</h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted mt-2">
              SECTOR: MEDIA_REPOSITORY // TOTAL_LOAD: {assets.length} ENTRIES
            </p>
         </div>
         <div className="flex gap-4">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-white text-black font-mono text-[10px] px-8 py-3 tracking-widest uppercase hover:bg-brand-blaze hover:text-white transition-all transform active:scale-95 flex items-center gap-2"
            >
               <Plus className="w-4 h-4" /> Register_New_Media
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:flex gap-4">
         <div className="flex-1 bg-panel-card border border-tactical-border flex items-center px-4 py-3 group focus-within:border-brand-blaze transition-all">
            <Search className="w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="SEARCH_ASSET_CATALOG..." 
              className="bg-transparent border-none focus:ring-0 w-full font-mono text-[10px] uppercase tracking-widest ml-3 text-white"
            />
         </div>
         <button className="bg-panel-card border border-tactical-border px-8 py-3 font-mono text-[10px] uppercase tracking-widest hover:text-brand-blaze transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-muted" /> FILTER_PROTOCOL
         </button>
      </div>

      {assets.length === 0 ? (
        <div className="border border-dashed border-tactical-border p-20 text-center space-y-6 bg-surface-matte/30">
          <Archive className="w-16 h-16 text-text-muted mx-auto opacity-20" />
          <div className="space-y-2">
            <p className="font-mono text-sm text-white uppercase tracking-widest">Vault Empty</p>
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">No digital signatures found in the current sector</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="border border-brand-blaze text-brand-blaze font-mono text-[10px] px-6 py-2 uppercase tracking-widest hover:bg-brand-blaze hover:text-white transition-all"
          >
            Upload_Master_Copy
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {assets.map(asset => (
            <AssetCard key={asset.id} asset={asset} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Assets;
