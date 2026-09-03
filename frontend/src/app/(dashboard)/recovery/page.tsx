"use client";
import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, ScrollText, TrendingDown, TrendingUp, Shield, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Recovery() {
  const { merchantId } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!merchantId) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/merchants/${merchantId}/dashboard`);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [merchantId]);

  // If no cases, we show empty state
  const hasData = data && data.recent_cases && data.recent_cases.length > 0;

  return (
    <main className="flex-1 flex flex-col h-full relative w-full">
      <header className="docked full-width top-0 sticky z-40 border-b border-white/5 backdrop-blur-2xl bg-black/40 flex justify-between items-center h-16 px-4 md:px-margin-desktop">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-on-surface-variant hover:text-primary">
            <Menu size={24} />
          </button>
          <h2 
            className="font-headline-md text-headline-md font-bold bg-clip-text text-transparent flex items-center gap-2 drop-shadow-md"
            style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), #a78bfa, var(--color-secondary))' }}
          >
            Recovery Command
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-on-surface-variant hover:text-secondary dark:hover:text-secondary hover:opacity-80 transition-opacity">
            <Search size={20} />
          </button>
          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            <button className="text-on-surface-variant hover:text-secondary dark:hover:text-secondary hover:opacity-80 transition-opacity relative">
              <Bell size={20} />
            </button>
            <button className="text-on-surface-variant hover:text-secondary dark:hover:text-secondary hover:opacity-80 transition-opacity">
              <ScrollText size={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high border border-white/10 hover:opacity-80 transition-opacity ml-2">
              <User size={16} className="text-on-surface-variant" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 w-full max-w-container-max mx-auto p-4 md:p-margin-desktop flex flex-col gap-8 md:gap-16 animate-fade-in-up">
        
        {loading ? (
           <div className="flex items-center justify-center h-64 text-on-surface-variant">Loading dashboard data...</div>
        ) : !hasData ? (
           <div className="flex flex-col items-center justify-center h-64 text-center glass-panel rounded-2xl p-12">
             <Shield size={48} className="text-primary mb-4 opacity-50" />
             <h3 className="text-xl font-semibold mb-2">No data yet</h3>
             <p className="text-on-surface-variant max-w-md">Your dashboard is empty. Run the simulator to generate test traffic, or wait for real transactions to be processed by Cyvault AI.</p>
           </div>
        ) : (
           <>
             {/* Top Row: 4 KPI Cards */}
             <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
               {/* KPI 1: ₹ At Risk */}
               <div className="glass-panel glass-panel-hover rounded-xl p-6 glow-amber relative overflow-hidden group">
                 <div className="flex justify-between items-start mb-4">
                   <h3 className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">₹ At Risk</h3>
                   <div className="w-8 h-8 rounded-full bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20">
                     <TrendingDown size={16} />
                   </div>
                 </div>
                 <div className="font-stat-lg text-stat-lg text-on-surface">₹{(data.at_risk || 0).toLocaleString()}</div>
                 <div className="mt-4 h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-400/50 w-3/4"></div>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl group-hover:bg-cyan-400/20 transition-all"></div>
               </div>

               {/* KPI 2: ₹ Recovered */}
               <div className="glass-panel glass-panel-hover rounded-xl p-6 glow-green relative overflow-hidden group">
                 <div className="flex justify-between items-start mb-4">
                   <h3 className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">₹ Recovered</h3>
                   <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                     <TrendingUp size={16} />
                   </div>
                 </div>
                 <div className="flex items-end gap-3">
                   <div className="font-stat-lg text-stat-lg text-on-surface">₹{(data.recovered || 0).toLocaleString()}</div>
                 </div>
                 <div className="mt-4 flex items-center gap-2">
                   <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-label-mono text-[10px] border border-emerald-500/30">Active</span>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
               </div>

               {/* KPI 3: Recovery Rate */}
               <div className="glass-panel glass-panel-hover rounded-xl p-6 glow-violet relative overflow-hidden flex items-center justify-between group">
                 <div>
                   <h3 className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider mb-4">Recovery Rate</h3>
                   <div className="font-stat-lg text-stat-lg text-primary">{data.recovery_rate || 0}%</div>
                 </div>
                 <div className="relative w-16 h-16 shrink-0">
                   <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                     <path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                     <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${data.recovery_rate || 0}, 100`} strokeWidth="3"></path>
                   </svg>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
               </div>

               {/* KPI 4: Correctly Blocked */}
               <div className="glass-panel glass-panel-hover rounded-xl p-6 glow-red relative overflow-hidden group">
                 <div className="flex justify-between items-start mb-4">
                   <h3 className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">Correctly Blocked</h3>
                   <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                     <Shield size={16} />
                   </div>
                 </div>
                 <div className="font-stat-lg text-stat-lg text-on-surface">{data.blocked || 0}</div>
                 <div className="mt-4 font-label-mono text-xs text-red-400">Threats mitigated</div>
                 <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
               </div>
             </section>

             {/* Middle Section: 2 Columns */}
             <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
               <div className="xl:col-span-2 glass-panel rounded-2xl flex flex-col overflow-hidden">
                 <div className="p-6 border-b border-[#ffffff1a] flex justify-between items-center bg-[#ffffff05]">
                   <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Active Recovery Cases</h3>
                   <button className="px-4 py-2 border border-[#ffffff33] rounded-lg text-white font-label-mono text-xs hover:bg-[#ffffff1a] transition-colors">View All</button>
                 </div>
                 <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                     <thead>
                       <tr className="border-b border-[#ffffff1a] bg-[#ffffff02]">
                         <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">Order</th>
                         <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">Customer</th>
                         <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider text-right">Amount</th>
                         <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">Type</th>
                         <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">Intervention</th>
                         <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">Status</th>
                       </tr>
                     </thead>
                     <tbody className="font-body-md text-sm divide-y divide-[#ffffff0a]">
                       {data.recent_cases.map((c: any, i: number) => (
                         <tr key={i} className="hover:bg-[#ffffff08] transition-colors">
                           <td className="py-4 px-6 font-label-mono text-on-surface-variant">{c.order_id}</td>
                           <td className="py-4 px-6">{c.customer}</td>
                           <td className="py-4 px-6 text-right font-label-mono">₹{c.amount.toLocaleString()}</td>
                           <td className="py-4 px-6 text-on-surface-variant">{c.type}</td>
                           <td className="py-4 px-6">{c.intervention}</td>
                           <td className="py-4 px-6">
                             <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-label-mono text-[10px] uppercase ${
                               c.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                               c.color === 'red' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                               'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20'
                             }`}>
                               <span className={`w-1.5 h-1.5 rounded-full ${
                                 c.color === 'emerald' ? 'bg-emerald-400' :
                                 c.color === 'red' ? 'bg-red-400' :
                                 'bg-cyan-400'
                               }`}></span>
                               {c.status}
                             </span>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>

               <div className="xl:col-span-1 glass-panel rounded-2xl flex flex-col overflow-hidden">
                 <div className="p-6 border-b border-[#ffffff1a] bg-[#ffffff05]">
                   <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Intervention Effectiveness</h3>
                 </div>
                 <div className="p-6 flex-1 flex flex-col justify-center gap-6">
                   <div>
                     <div className="flex justify-between font-label-mono text-xs mb-2">
                       <span className="text-on-surface">Payment Link</span>
                       <span className="text-primary">72%</span>
                     </div>
                     <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                       <div className="h-full bg-primary w-[72%]"></div>
                     </div>
                   </div>
                   <div>
                     <div className="flex justify-between font-label-mono text-xs mb-2">
                       <span className="text-on-surface">SMS + Discount</span>
                       <span className="text-secondary">58%</span>
                     </div>
                     <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                       <div className="h-full bg-secondary w-[58%]"></div>
                     </div>
                   </div>
                 </div>
                 <div className="p-4 border-t border-[#ffffff1a] bg-[#ffffff02]">
                   <p className="font-label-mono text-[10px] text-on-surface-variant text-center uppercase tracking-wider">
                     Bandit learning active
                   </p>
                 </div>
               </div>
             </section>
           </>
        )}
      </div>
    </main>
  );
}
