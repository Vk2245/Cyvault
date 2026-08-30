import React from 'react';
import { Menu, Search, Bell, ScrollText, TrendingDown, TrendingUp, Shield } from 'lucide-react';

export default function Recovery() {
  return (
    <main className="flex-1 flex flex-col h-full relative w-full">

{/* TopAppBar (Shared Component) */}
{/* Applying style_component_shape: docked full-width top-0 sticky z-40 */}
{/* Applying style_separation_logic: border-b border-[#ffffff1a] backdrop-blur-xl bg-[#ffffff08] */}
{/* Applying style_shell_layout: flex justify-between items-center h-16 px-margin-desktop */}
<header className="docked full-width top-0 sticky z-40 border-b border-[#ffffff1a] backdrop-blur-xl bg-[#ffffff08] flex justify-between items-center h-16 px-4 md:px-margin-desktop">
<div className="flex items-center gap-4">
{/* Mobile Menu Trigger (Visible only on mobile) */}
<button className="md:hidden text-on-surface-variant hover:text-primary">
<Menu size={24} />
</button>
{/* Applying style_brand_logo/typography */}
<h2 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary">Recovery Command</h2>
</div>
<div className="flex items-center gap-6">
{/* Search Icon (Search Bar on left representation) */}
<button className="text-on-surface-variant hover:text-secondary dark:hover:text-secondary hover:opacity-80 transition-opacity">
<Search size={20} />
</button>
{/* Trailing Icons */}
<div className="flex items-center gap-4 border-l border-[#ffffff1a] pl-6">
<button className="text-on-surface-variant hover:text-secondary dark:hover:text-secondary hover:opacity-80 transition-opacity relative">
<Bell size={20} />
<span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
</button>
<button className="text-on-surface-variant hover:text-secondary dark:hover:text-secondary hover:opacity-80 transition-opacity">
<ScrollText size={20} />
</button>
{/* Avatar */}
<button className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-[#ffffff1a] hover:opacity-80 transition-opacity ml-2">
<img alt="Chief Security Officer" className="w-8 h-8 object-contain" src="/cyvault-logo-no-caption.png"/>
</button>
</div>
</div>
</header>
{/* Canvas / Dashboard Content */}
{/* Using container-max and fluid padding */}
<div className="flex-1 w-full max-w-container-max mx-auto p-4 md:p-margin-desktop flex flex-col gap-8 md:gap-16">
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
<div className="font-stat-lg text-stat-lg text-on-surface">₹1,47,500</div>
<div className="mt-4 h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-cyan-400/50 w-3/4"></div>
</div>
{/* Decorative subtle glow */}
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
<div className="font-stat-lg text-stat-lg text-on-surface">₹1,02,300</div>
</div>
<div className="mt-4 flex items-center gap-2">
<span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-label-mono text-[10px] border border-emerald-500/30">+₹12,400 today</span>
</div>
{/* Decorative subtle glow */}
<div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
</div>
{/* KPI 3: Recovery Rate */}
<div className="glass-panel glass-panel-hover rounded-xl p-6 glow-violet relative overflow-hidden flex items-center justify-between group">
<div>
<h3 className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider mb-4">Recovery Rate</h3>
<div className="font-stat-lg text-stat-lg text-primary">68.4%</div>
</div>
{/* Circular Progress */}
<div className="relative w-16 h-16 shrink-0">
<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
{/* Background Circle */}
<path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
{/* Progress Circle */}
<path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="68.4, 100" strokeWidth="3"></path>
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
<div className="font-stat-lg text-stat-lg text-on-surface">7</div>
<div className="mt-4 font-label-mono text-xs text-red-400">
                        ₹45K saved from fraud
                    </div>
<div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
</div>
</section>
{/* Middle Section: 2 Columns */}
<section className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
{/* Left Column: Active Recovery Cases (Spans 2 columns on XL) */}
<div className="xl:col-span-2 glass-panel rounded-2xl flex flex-col overflow-hidden">
<div className="p-6 border-b border-[#ffffff1a] flex justify-between items-center bg-[#ffffff05]">
<h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Active Recovery Cases</h3>
<button className="px-4 py-2 border border-[#ffffff33] rounded-lg text-white font-label-mono text-xs hover:bg-[#ffffff1a] transition-colors">
                            View All
                        </button>
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
{/* Row 1 */}
<tr className="hover:bg-[#ffffff08] transition-colors">
<td className="py-4 px-6 font-label-mono text-on-surface-variant">#4521</td>
<td className="py-4 px-6">Ravi S.</td>
<td className="py-4 px-6 text-right font-label-mono">₹2,499</td>
<td className="py-4 px-6 text-on-surface-variant">Payment Fail</td>
<td className="py-4 px-6">Payment Link</td>
<td className="py-4 px-6">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-label-mono text-[10px] uppercase">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                            Success (Recovered)
                                        </span>
</td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-[#ffffff08] transition-colors">
<td className="py-4 px-6 font-label-mono text-on-surface-variant">#4590</td>
<td className="py-4 px-6">Amit K.</td>
<td className="py-4 px-6 text-right font-label-mono">₹12,000</td>
<td className="py-4 px-6 text-on-surface-variant">Payment Fail</td>
<td className="py-4 px-6 text-on-surface-variant">—</td>
<td className="py-4 px-6">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-label-mono text-[10px] uppercase">
<span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                            Error (Blocked - Fraud)
                                        </span>
</td>
</tr>
{/* Row 3 */}
<tr className="hover:bg-[#ffffff08] transition-colors">
<td className="py-4 px-6 font-label-mono text-on-surface-variant">#4601</td>
<td className="py-4 px-6">Neha R.</td>
<td className="py-4 px-6 text-right font-label-mono">₹3,200</td>
<td className="py-4 px-6 text-on-surface-variant">Cart Abandon</td>
<td className="py-4 px-6">Email</td>
<td className="py-4 px-6">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 font-label-mono text-[10px] uppercase">
<span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                            Warning (Pending)
                                        </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
{/* Right Column: Intervention Effectiveness */}
<div className="xl:col-span-1 glass-panel rounded-2xl flex flex-col overflow-hidden">
<div className="p-6 border-b border-[#ffffff1a] bg-[#ffffff05]">
<h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Intervention Effectiveness</h3>
</div>
<div className="p-6 flex-1 flex flex-col justify-center gap-6">
{/* Bar 1 */}
<div>
<div className="flex justify-between font-label-mono text-xs mb-2">
<span className="text-on-surface">Payment Link</span>
<span className="text-primary">72%</span>
</div>
<div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-primary w-[72%]"></div>
</div>
</div>
{/* Bar 2 */}
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
                            Bandit learning from 234 cases
                        </p>
</div>
</div>
</section>
</div>

    </main>
  );
}
