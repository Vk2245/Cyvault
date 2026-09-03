"use client";
import React, { useState, useEffect } from 'react';
import { Menu, User, TriangleAlert, ShieldAlert, Bot } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Alerts() {
  const { merchantId } = useAuth();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!merchantId) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/merchants/${merchantId}/alerts`);
        if (response.ok) {
          const data = await response.json();
          setAlerts(data);
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
    
    // Poll every 3 seconds for live updates in demo
    const interval = setInterval(fetchAlerts, 3000);
    return () => clearInterval(interval);
  }, [merchantId]);

  return (
    <main className="flex-1 flex flex-col h-full relative w-full">
      <div className="flex-1 w-full max-w-container-max mx-auto p-4 md:p-6 flex flex-col gap-6 animate-fade-in-up">
        {loading && alerts.length === 0 ? (
           <div className="flex justify-center items-center h-64 text-on-surface-variant">Loading alerts...</div>
        ) : alerts.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-64 text-center glass-panel rounded-2xl p-12">
             <ShieldAlert size={48} className="text-primary mb-4 opacity-50" />
             <h3 className="text-xl font-semibold mb-2">No alerts yet</h3>
             <p className="text-on-surface-variant max-w-md">Alerts will appear here when our AI agents take actions (like offering discounts or blocking fraud) on your behalf.</p>
           </div>
        ) : (
           <div className="space-y-4">
             {alerts.map((alert, index) => (
               <div key={alert.id} className="glass-panel glass-panel-hover rounded-xl p-6 relative overflow-hidden group animate-in fade-in slide-in-from-top-4">
                 <div className="flex items-start gap-4">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                     alert.decision === 'ALLOWED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                     alert.decision === 'BLOCKED' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                     'bg-primary/10 text-primary border border-primary/20'
                   }`}>
                     <Bot size={20} />
                   </div>
                   <div className="flex-1">
                     <div className="flex justify-between items-start mb-2">
                       <h3 className="font-semibold text-on-surface text-lg">Cyvault AI Action</h3>
                       <span className="font-label-mono text-xs text-on-surface-variant">{new Date(alert.created_at).toLocaleTimeString()}</span>
                     </div>
                     <p className="text-on-surface-variant text-sm mb-3 leading-relaxed">{alert.narrative}</p>
                     
                     <div className="flex gap-2">
                       <span className="px-2.5 py-1 rounded bg-[#ffffff08] border border-[#ffffff1a] font-label-mono text-[10px] text-on-surface uppercase tracking-wider">
                         Action: {alert.action_type.replace('_', ' ')}
                       </span>
                       <span className={`px-2.5 py-1 rounded font-label-mono text-[10px] uppercase tracking-wider border ${
                         alert.decision === 'ALLOWED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                         alert.decision === 'BLOCKED' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                         'bg-[#ffffff08] text-on-surface-variant border-[#ffffff1a]'
                       }`}>
                         {alert.decision}
                       </span>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        )}
      </div>
    </main>
  );
}
