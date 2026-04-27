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
  BrainCircuit,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SidebarItem: React.FC<{ to: string, icon: any, label: string, active: boolean, count?: number, onClick?: () => void }> = ({ to, icon: Icon, label, active, count, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  if (loading) return <div className="bg-bg-void h-screen flex items-center justify-center font-mono text-brand-blaze">INITIALIZING_SECURE_LINK...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const navItems: Array<{ to: string; icon: any; label: string; count?: number }> = [
    { to: "/dashboard", icon: Grid3X3, label: "Command Center" },
    { to: "/dashboard/assets", icon: Archive, label: "Asset Vault" },
    { to: "/dashboard/threats", icon: ShieldAlert, label: "Threat Feed", count: 12 },
    { to: "/dashboard/scan", icon: Radar, label: "Crawler Node" },
    { to: "/dashboard/insights", icon: BrainCircuit, label: "AI Insights" },
  ];

  return (
    <div className="flex h-screen bg-bg-void overflow-hidden selection:bg-brand-blaze selection:text-black relative">
      {/* Sidebar - Inspired by Elegant Dark */}
      <aside className={`fixed inset-y-0 left-0 w-[264px] bg-bg-void border-r border-tactical-border flex flex-col z-50 transition-transform duration-300 lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-tactical-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-brand-blaze"></div>
            <h1 className="text-white font-bold tracking-tighter text-2xl uppercase" style={{ fontFamily: "'Arial Narrow', sans-serif" }}>SportsGuard</h1>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-text-muted hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 py-6 overflow-y-auto">
          <div className="px-8 mb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">Security Protocol</div>
          {navItems.map((item) => (
            <SidebarItem 
              key={item.to}
              to={item.to} 
              icon={item.icon} 
              label={item.label} 
              active={location.pathname === item.to}
              count={item.count}
              onClick={() => setMobileMenuOpen(false)}
            />
          ))}
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

      {/* Overlay for mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative min-w-0">
        <div className="absolute inset-0 tactical-grid pointer-events-none opacity-40 z-0"></div>
        
        <header className="h-[80px] border-b border-tactical-border bg-bg-void/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-10 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white border border-tactical-border p-2">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted">Operation Status</span>
              <span className="text-white font-bold text-base lg:text-lg uppercase tracking-tight truncate max-w-[150px] sm:max-w-none">SG_GLOBAL_DEFENSE_v4.5</span>
            </div>
          </div>
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden sm:flex items-center gap-3">
              <div className="hidden lg:block text-right">
                <div className="font-mono text-[10px] uppercase text-white font-bold leading-none">{user?.full_name || 'GUEST_OPERATOR'}</div>
                <div className="font-mono text-[8px] uppercase text-text-muted mt-1">{user?.organization || 'SECURE_NODE'}</div>
              </div>
              <div className="w-8 h-8 border border-tactical-border bg-panel-card flex items-center justify-center text-brand-blaze overflow-hidden">
                <img 
                  src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user?.id || 'default'}`} 
                  alt="avatar" 
                  className="w-full h-full object-cover grayscale opacity-80"
                />
              </div>
            </div>
            <Link to="/dashboard/scan">
              <button className="bg-brand-blaze text-white font-mono text-[11px] px-4 lg:px-6 py-2 tracking-widest uppercase hover:bg-brand-blaze-hover transition-colors whitespace-nowrap">
                {/* Shorten text on small mobile */}
                <span className="hidden xs:inline">Deploy Crawler</span>
                <span className="xs:hidden">Deploy</span>
              </button>
            </Link>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-4 lg:p-8 relative z-10 custom-scrollbar">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashLayout;
