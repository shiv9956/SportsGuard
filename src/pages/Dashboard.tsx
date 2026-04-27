import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import api from '../lib/api';
import { 
  ShieldAlert, 
  Archive, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Globe,
  Radio,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';

const StatCard = ({ label, value, subValue, trend, icon: Icon, colorClass }: any) => (
  <div className="bg-panel-card border border-tactical-border p-6 group hover:border-brand-blaze transition-all scan-line relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blaze to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="absolute top-4 right-4 font-mono text-[8px] text-text-muted uppercase tracking-widest">
      {`[SYS_ST_${label.substring(0,3).toUpperCase()}]`}
    </div>
    <div className="flex flex-col gap-1">
      <div className="font-mono text-[10px] uppercase text-text-muted tracking-[0.2em] mb-4 flex items-center gap-2">
        <Icon className={`w-3 h-3 ${colorClass}`} />
        {label}
      </div>
      <div className={`text-5xl font-bold leading-none ${colorClass}`} style={{ fontFamily: "'Arial Narrow', sans-serif" }}>{value}</div>
      {subValue && (
        <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
           {trend && <TrendingUp className="w-3 h-3 text-neon-green" />}
           {subValue}
        </div>
      )}
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentDetections, setRecentDetections] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, detectionsRes] = await Promise.all([
          api.get('/stats/dashboard'),
          api.get('/detections')
        ]);
        setStats(statsRes.data);
        setRecentDetections(detectionsRes.data.slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      }
    };
    fetchDashboardData();
  }, []);

  if (!stats) return <div className="font-mono text-brand-blaze text-[10px] animate-pulse">SYNCHRONIZING_THREAT_DATABASE...</div>;

  return (
    <div className="space-y-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-tactical-border pb-8">
        <div>
           <h1 className="text-5xl md:text-7xl font-bebas">Global Overview</h1>
           <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-brand-blaze mt-2 flex items-center gap-2">
             <div className="status-dot bg-brand-blaze status-dot-pulse"></div>
             System_Status: Nominal [Sys_Uptime: 99.98%]
           </div>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-1.5 bg-neon-green/5 border border-neon-green text-neon-green font-mono text-[9px] md:text-[10px] uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
              <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_8px_#32D74B]"></div>
              Protection_Active
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Assets Protected" 
          value={stats.assets_protected.toLocaleString()} 
          subValue="+4.2% THIS CYCLE" 
          trend={true}
          icon={Archive}
          colorClass="text-white"
        />
        <StatCard 
          label="Live Threats" 
          value={stats.infringements_detected} 
          subValue="REQUIRES_ATTENTION" 
          trend={false}
          icon={ShieldAlert}
          colorClass="text-brand-blaze"
        />
        <StatCard 
          label="Takedowns Sent" 
          value={842} 
          subValue="STABLE_NODE_HEALTH" 
          trend={true}
          icon={CheckCircle2}
          colorClass="text-white"
        />
        <StatCard 
          label="Integrity Score" 
          value={stats.integrity_score + '%'} 
          subValue="PROTOCOL_NOMINAL" 
          trend={true}
          icon={CheckCircle2}
          colorClass="text-neon-green"
        />
      </div>

      {/* Main Grid: Timeline & Detections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Platform Analysis */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Platform Distribution */}
          <div className="bg-surface-matte border border-tactical-border p-8">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.4em] text-text-muted mb-8 border-b border-tactical-border pb-4">
              Platform_Distribution_Analysis
            </h3>
            <div className="space-y-8">
              {stats.platform_breakdown.map((item: any, i: number) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-[#A1A1AA]">
                    <span className="text-white">{item.label}</span>
                    <span className="text-text-muted">{item.value}% // {Math.floor(item.value * 3.42)} INCIDENTS</span>
                  </div>
                  <div className="h-1 bg-tactical-border overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }} 
                      className={`h-full ${i === 0 ? 'bg-brand-blaze' : 'bg-white/40'}`}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Detection Log */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-panel-card border border-tactical-border flex flex-col h-full">
            <div className="bg-bg-void px-6 py-4 border-b border-tactical-border flex justify-between items-center">
               <h3 className="text-white font-mono text-xs uppercase tracking-widest flex items-center gap-3">
                 <Radio className="w-4 h-4 text-brand-blaze" />
                 Recent Infringements
               </h3>
               <span className="text-text-muted text-[10px] font-mono uppercase">Updated 2s ago</span>
            </div>
            
            <div className="flex-1 p-0 divide-y divide-tactical-border overflow-y-auto max-h-[500px] custom-scrollbar">
              {recentDetections.map((d, i) => (
                <div key={i} className={`p-6 space-y-3 transition-colors ${i === 0 ? 'bg-brand-blaze/5' : 'hover:bg-white/5'}`}>
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[11px] text-white uppercase tracking-tight">
                      {d.platform} NODE_{d.id.substring(0,4)}
                    </span>
                    <span className="font-mono text-[10px] text-text-muted flex items-center gap-1">
                      <Clock className="w-2 h-2" />
                      {new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-mono text-[11px] text-text-secondary uppercase underline decoration-brand-blaze/50 cursor-pointer">{d.similarity}% Match</div>
                    <div className="font-mono text-[11px] text-text-muted truncate flex-1 uppercase">Src: {d.sourceUrl}</div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Link to="/dashboard/threats">
                      <button className="font-mono text-[10px] text-brand-blaze uppercase tracking-widest border border-brand-blaze px-4 py-1.5 hover:bg-brand-blaze hover:text-white transition-all">
                        REVIEW
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
              {recentDetections.length === 0 && (
                <div className="p-12 text-center text-text-muted font-mono text-[10px] uppercase">No active threats detected</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
