import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { toast } from 'sonner';
import { Shield, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  isRegister?: boolean;
}

const Login: React.FC<LoginProps> = ({ isRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [org, setOrg] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        const { data } = await api.post('/auth/register', { email, password, organization: org, full_name: name });
        login(data.token, data.user);
        toast.success('ACCESS_GRANTED: COMMAND_ESTABLISHED');
      } else {
        const { data } = await api.post('/auth/login', { email, password });
        login(data.token, data.user);
        toast.success('AUTHENTICATION_SUCCESSFUL: SECTOR_01_LINKED');
      }
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'AUTHENTICATION_FAILED: ACCESS_DENIED');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex selection:bg-brand-blaze selection:text-white font-sans">
       <div className="absolute inset-0 tactical-grid opacity-5 pointer-events-none"></div>
       
       {/* Left Side: Brand/Visual */}
       <div className="hidden lg:flex w-1/2 bg-[#050505] border-r border-tactical-border relative overflow-hidden p-20 flex-col justify-between">
          <Link to="/" className="font-bebas text-5xl text-brand-blaze italic tracking-tighter uppercase relative z-10">SPORTSGUARD</Link>
          
          <div className="relative z-10 space-y-8">
             <div className="inline-flex items-center gap-3 border border-brand-blaze/30 bg-brand-blaze/5 px-3 py-1.5 backdrop-blur-sm">
                <span className="font-mono text-[9px] text-brand-blaze uppercase tracking-[0.3em] font-bold">Protocol: Secure_Vault_Entry</span>
             </div>
             <h2 className="text-8xl font-bold uppercase tracking-tighter leading-[0.9]" style={{ fontFamily: "'Arial Narrow', sans-serif" }}>
                SECURE THE<br/><span className="text-brand-blaze underline decoration-4 underline-offset-[12px] decoration-brand-blaze">METADATA</span>
             </h2>
             <p className="text-text-muted max-w-sm font-mono text-[11px] uppercase tracking-[0.2em] leading-relaxed">
                Advanced perceptual fingerprinting for global sports media protection and enforcement.
             </p>
          </div>

          <div className="font-mono text-[9px] text-text-muted uppercase tracking-[0.5em] relative z-10 font-bold">
            Zero_Trust // AES_256_ENC // 2026_COMPLIANT
          </div>

          {/* Background Decorative */}
          <div className="absolute -bottom-20 -left-20 opacity-10 transform rotate-12">
             <Shield className="w-[800px] h-[800px] text-brand-blaze" />
          </div>
       </div>

       {/* Right Side: Form */}
       <div className="flex-1 flex items-center justify-center p-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md space-y-12"
          >
            <div className="space-y-4">
               <div className="w-16 h-1 bg-brand-blaze mb-8"></div>
               <h1 className="font-bebas text-6xl uppercase tracking-tighter leading-none">{isRegister ? 'New Deployment' : 'Commander Login'}</h1>
               <p className="text-text-muted text-xs uppercase font-mono tracking-widest font-bold">
                  {isRegister ? 'Initialize organization profile' : 'Enter security keys to access terminal'}
               </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {isRegister && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase text-text-muted tracking-widest font-bold px-1">Operator Name</label>
                    <input 
                      required
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="NAME_01"
                      className="w-full bg-panel-card border border-tactical-border px-5 py-4 text-xs font-mono text-white focus:border-brand-blaze focus:ring-0 outline-none transition-all placeholder:text-[#27272A] uppercase tracking-widest"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase text-text-muted tracking-widest font-bold px-1">Agency</label>
                    <input 
                      required
                      type="text" 
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="ORG_01"
                      className="w-full bg-panel-card border border-tactical-border px-5 py-4 text-xs font-mono text-white focus:border-brand-blaze focus:ring-0 outline-none transition-all placeholder:text-[#27272A] uppercase tracking-widest"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase text-text-muted tracking-widest font-bold px-1">Secure_Communication_ID</label>
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@agency.com"
                  className="w-full bg-panel-card border border-tactical-border px-5 py-4 text-xs font-mono text-white focus:border-brand-blaze focus:ring-0 outline-none transition-all placeholder:text-[#27272A] uppercase tracking-widest"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase text-text-muted tracking-widest font-bold px-1">Authentication_Cipher</label>
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-panel-card border border-tactical-border px-5 py-4 text-xs font-mono text-white focus:border-brand-blaze focus:ring-0 outline-none transition-all placeholder:text-[#27272A] uppercase tracking-widest"
                />
              </div>

              <button 
                disabled={loading}
                className="w-full bg-brand-blaze text-white font-mono text-xs font-bold py-5 flex items-center justify-center gap-5 hover:bg-brand-blaze-hover transition-all disabled:opacity-50 group tracking-[0.3em] uppercase shadow-[0_10px_30px_-10px_rgba(255,45,85,0.4)]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isRegister ? 'Deploy System' : 'Initiate Link')}
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 p-0 transition-transform" />}
              </button>
            </form>

            <div className="pt-8 border-t border-tactical-border">
               <p className="text-text-muted font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-center">
                 {isRegister ? 'Already registered?' : 'Awaiting credentials?'} {' '}
                 <Link to={isRegister ? '/login' : '/register'} className="text-brand-blaze hover:text-brand-blaze-hover transition-colors ml-4 border-b border-brand-blaze/30 pb-0.5">
                   {isRegister ? 'SIGN_IN' : 'REGISTER_NODE'}
                 </Link>
               </p>
            </div>
          </motion.div>
       </div>
    </div>
  );
};

export default Login;
