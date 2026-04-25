import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Grid3X3, 
  Video, 
  Archive, 
  ShieldAlert, 
  Terminal, 
  Settings, 
  LogOut, 
  Radar,
  ArrowRightLeft,
  Activity,
  BrainCircuit
} from 'lucide-react';
import { motion } from 'motion/react';

const SidebarItem = ({ to, icon: Icon, label, active, count }: { to: string, icon: any, label: string, active: boolean, count?: number }) => (
  <Link 
    to={to} 
    className={`flex items-center px-8 py-3 transition-all duration-200 border-l-2 ${
      active 
        ? 'bg-panel-card text-white border-brand-blaze' 
        : 'text-text-secondary border-transparent hover:text-white'
    }`}
  >
    <div className={`w-4 h-4 border mr-4 ${active ? 'border-brand-blaze' : 'border-tactical-border'}`}></div>
    <span className="font-mono text-xs uppercase tracking-widest">{label}</span>
    {count && (
      <span className="ml-auto bg-brand-blaze text-white text-[10px] px-1.5 font-mono">{count}</span>
    )}
  </Link>
);

const DashLayout: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="bg-bg-void h-screen flex items-center justify-center font-mono text-brand-blaze">INITIALIZING_SECURE_LINK...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen bg-bg-void overflow-hidden selection:bg-brand-blaze selection:text-black">
      {/* Sidebar - Inspired by Elegant Dark */}
      <aside className="w-[264px] h-full border-r border-tactical-border bg-bg-void flex flex-col z-40">
        <div className="p-8 border-b border-tactical-border flex items-center gap-3">
          <div className="w-4 h-4 bg-brand-blaze"></div>
          <h1 className="text-white font-bold tracking-tighter text-2xl uppercase" style={{ fontFamily: "'Arial Narrow', sans-serif" }}>SportsGuard</h1>
        </div>
        
        <nav className="flex-1 py-6">
          <div className="px-8 mb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">Security Protocol</div>
          <SidebarItem to="/dashboard" icon={Grid3X3} label="Command Center" active={location.pathname === '/dashboard'} />
          <SidebarItem to="/dashboard/assets" icon={Archive} label="Asset Vault" active={location.pathname === '/dashboard/assets'} />
          <SidebarItem to="/dashboard/threats" icon={ShieldAlert} label="Threat Feed" active={location.pathname === '/dashboard/threats'} count={12} />
          <SidebarItem to="/dashboard/scan" icon={Radar} label="Crawler Node" active={location.pathname === '/dashboard/scan'} />
          <SidebarItem to="/dashboard/insights" icon={BrainCircuit} label="AI Insights" active={location.pathname === '/dashboard/insights'} />
        </nav>

        <div className="p-6 border-t border-tactical-border bg-surface-matte">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_8px_#32D74B] animate-pulse"></div>
            <span className="text-[10px] font-mono text-white uppercase tracking-widest">Scanner Active</span>
          </div>
          <div className="text-[9px] font-mono text-text-muted break-all uppercase">pHash: 8B2C4F1E9A3D72B5</div>
          <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-tactical-border">
            <button onClick={logout} className="flex items-center text-text-muted hover:text-white font-mono text-[9px] uppercase tracking-widest text-left transition-colors">
              <LogOut className="w-3 h-3 mr-3" /> LOGOUT_PROTOCOL
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative min-w-0">
        <div className="absolute inset-0 tactical-grid pointer-events-none opacity-40 z-0"></div>
        
        <header className="h-[80px] border-b border-tactical-border bg-bg-void/80 backdrop-blur-md flex items-center justify-between px-10 z-30">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted">Operation Status</span>
            <span className="text-white font-bold text-lg uppercase tracking-tight">SG_GLOBAL_DEFENSE_v4.5</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-3">
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase text-white font-bold leading-none">{user.full_name}</div>
                <div className="font-mono text-[8px] uppercase text-text-muted mt-1">{user.organization}</div>
              </div>
              <div className="w-8 h-8 border border-tactical-border bg-panel-card flex items-center justify-center text-brand-blaze overflow-hidden">
                <img 
                  src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.id}`} 
                  alt="avatar" 
                  className="w-full h-full object-cover grayscale opacity-80"
                />
              </div>
            </div>
            <Link to="/dashboard/scan">
              <button className="bg-brand-blaze text-white font-mono text-[11px] px-6 py-2 tracking-widest uppercase hover:bg-brand-blaze-hover transition-colors">
                Deploy Crawler
              </button>
            </Link>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashLayout;
