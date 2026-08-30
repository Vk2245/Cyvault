import React from 'react';

export default function Reconciliation() {
  return (
    <main className="flex-1 flex flex-col h-full relative w-full">

{/* Header Section */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
<div>
<h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-white mb-2">Reconciliation Dashboard</h2>
<p className="text-on-surface-variant max-w-2xl">Real-time ledger matching and anomaly detection across all payment gateways.</p>
</div>
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
<span className="text-label-mono font-label-mono text-sm text-on-surface-variant">Live Sync: Active</span>
</div>
</div>
{/* Top Row Stats */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Matched Stat */}
<div className="glass-panel p-6 rounded-xl card-hover transition-all duration-300 relative overflow-hidden group">
<div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all"></div>
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-green-400">check_circle</span>
<h3 className="text-on-surface-variant text-sm uppercase tracking-wider font-semibold">Matched</h3>
</div>
</div>
<div className="flex items-end justify-between">
<div>
<div className="text-stat-lg font-stat-lg text-white mb-1">342</div>
<div className="text-xs text-green-400 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                            94.2% match rate
                        </div>
</div>
</div>
</div>
{/* Unmatched Stat */}
<div className="glass-panel p-6 rounded-xl card-hover transition-all duration-300 relative overflow-hidden group border-red-500/30">
<div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-red-400">cancel</span>
<h3 className="text-on-surface-variant text-sm uppercase tracking-wider font-semibold">Unmatched</h3>
</div>
</div>
<div className="flex items-end justify-between">
<div>
<div className="text-stat-lg font-stat-lg text-white mb-1">12</div>
<div className="text-xs text-red-400 font-label-mono bg-red-500/10 px-2 py-1 rounded inline-block mt-1">
                            ₹38,400 discrepancy
                        </div>
</div>
</div>
</div>
{/* Pending Stat */}
<div className="glass-panel p-6 rounded-xl card-hover transition-all duration-300 relative overflow-hidden group">
<div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-gold/10 rounded-full blur-2xl group-hover:bg-neon-gold/20 transition-all"></div>
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-neon-gold">schedule</span>
<h3 className="text-on-surface-variant text-sm uppercase tracking-wider font-semibold">Pending</h3>
</div>
</div>
<div className="flex items-end justify-between">
<div>
<div className="text-stat-lg font-stat-lg text-white mb-1">9</div>
<div className="text-xs text-neon-gold flex items-center gap-1 mt-1">
                            Expected by tomorrow
                        </div>
</div>
</div>
</div>
</div>
{/* Main Area */}
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
{/* Left/Main Column (75%) */}
<div className="lg:col-span-3 space-y-6">
{/* Tabs */}
<div className="flex gap-4 border-b border-outline-variant/30 pb-px overflow-x-auto hide-scrollbar">
<button className="px-4 py-2 border-b-2 border-electric-violet text-white font-medium whitespace-nowrap">All</button>
<button className="px-4 py-2 border-b-2 border-transparent text-on-surface-variant hover:text-white transition-colors whitespace-nowrap">Matched ✅</button>
<button className="px-4 py-2 border-b-2 border-transparent text-on-surface-variant hover:text-white transition-colors whitespace-nowrap">Unmatched ❌</button>
<button className="px-4 py-2 border-b-2 border-transparent text-on-surface-variant hover:text-white transition-colors whitespace-nowrap">Pending ⏳</button>
</div>
{/* Table Container */}
<div className="glass-panel rounded-xl overflow-hidden border border-outline-variant/20">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-outline-variant/20 bg-white/5">
<th className="py-4 px-4 text-xs uppercase tracking-wider font-semibold text-on-surface-variant w-12">Status</th>
<th className="py-4 px-4 text-xs uppercase tracking-wider font-semibold text-on-surface-variant">Order ID</th>
<th className="py-4 px-4 text-xs uppercase tracking-wider font-semibold text-on-surface-variant text-right">Expected (₹)</th>
<th className="py-4 px-4 text-xs uppercase tracking-wider font-semibold text-on-surface-variant text-right">Settled (₹)</th>
<th className="py-4 px-4 text-xs uppercase tracking-wider font-semibold text-on-surface-variant text-right">Difference</th>
<th className="py-4 px-4 text-xs uppercase tracking-wider font-semibold text-on-surface-variant">UTR</th>
<th className="py-4 px-4 text-xs uppercase tracking-wider font-semibold text-on-surface-variant">Match Type</th>
<th className="py-4 px-4 text-xs uppercase tracking-wider font-semibold text-on-surface-variant max-w-[200px]">Notes</th>
</tr>
</thead>
<tbody className="text-sm font-label-mono divide-y divide-outline-variant/10">
{/* Row 1 */}
<tr className="hover:bg-white/5 transition-colors group">
<td className="py-3 px-4 text-center"><span className="material-symbols-outlined text-green-400 text-[18px]">check_circle</span></td>
<td className="py-3 px-4 text-white">#4521</td>
<td className="py-3 px-4 text-right text-on-surface-variant">2,499</td>
<td className="py-3 px-4 text-right text-white">2,499</td>
<td className="py-3 px-4 text-right text-green-400">0</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">UTR12345</td>
<td className="py-3 px-4"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs">Exact Match</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs truncate max-w-[200px]" title="Recovery payment">Recovery payment</td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-white/5 transition-colors group">
<td className="py-3 px-4 text-center"><span className="material-symbols-outlined text-green-400 text-[18px]">check_circle</span></td>
<td className="py-3 px-4 text-white">#4388</td>
<td className="py-3 px-4 text-right text-on-surface-variant">8,750</td>
<td className="py-3 px-4 text-right text-white">8,750</td>
<td className="py-3 px-4 text-right text-green-400">0</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">UTR12346</td>
<td className="py-3 px-4"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs">Exact Match</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs">—</td>
</tr>
{/* Row 3 */}
<tr className="hover:bg-white/5 transition-colors group bg-red-500/5">
<td className="py-3 px-4 text-center"><span className="material-symbols-outlined text-red-400 text-[18px]">cancel</span></td>
<td className="py-3 px-4 text-white">#4102</td>
<td className="py-3 px-4 text-right text-on-surface-variant">5,000</td>
<td className="py-3 px-4 text-right text-white">4,500</td>
<td className="py-3 px-4 text-right text-red-400 font-bold">-500</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">UTR12350</td>
<td className="py-3 px-4"><span className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs">Amt Mismatch</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs truncate max-w-[200px]" title="₹500 discount applied during recovery">₹500 discount applied...</td>
</tr>
{/* Row 4 */}
<tr className="hover:bg-white/5 transition-colors group bg-red-500/5">
<td className="py-3 px-4 text-center"><span className="material-symbols-outlined text-red-400 text-[18px]">cancel</span></td>
<td className="py-3 px-4 text-white">#4233</td>
<td className="py-3 px-4 text-right text-on-surface-variant">3,200</td>
<td className="py-3 px-4 text-right text-white">0</td>
<td className="py-3 px-4 text-right text-red-400 font-bold">-3,200</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">—</td>
<td className="py-3 px-4"><span className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs border border-red-500/30">No UTR</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs truncate max-w-[200px]" title="Settlement pending from bank">Settlement pending...</td>
</tr>
{/* Row 5 */}
<tr className="hover:bg-white/5 transition-colors group bg-red-500/5">
<td className="py-3 px-4 text-center"><span className="material-symbols-outlined text-red-400 text-[18px]">cancel</span></td>
<td className="py-3 px-4 text-white">#4567</td>
<td className="py-3 px-4 text-right text-on-surface-variant">12,000</td>
<td className="py-3 px-4 text-right text-white">11,640</td>
<td className="py-3 px-4 text-right text-red-400 font-bold">-360</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">UTR12355</td>
<td className="py-3 px-4"><span className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs">Amt Mismatch</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs truncate max-w-[200px]" title="₹360 = 3% recovery discount">₹360 = 3% discount</td>
</tr>
{/* Row 6 */}
<tr className="hover:bg-white/5 transition-colors group bg-neon-gold/5">
<td className="py-3 px-4 text-center"><span className="material-symbols-outlined text-neon-gold text-[18px]">schedule</span></td>
<td className="py-3 px-4 text-white">#4601</td>
<td className="py-3 px-4 text-right text-on-surface-variant">3,200</td>
<td className="py-3 px-4 text-right text-on-surface-variant">—</td>
<td className="py-3 px-4 text-right text-on-surface-variant">—</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">—</td>
<td className="py-3 px-4"><span className="bg-neon-gold/10 text-neon-gold px-2 py-1 rounded text-xs">Pending</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs truncate max-w-[200px]">Recovery in progress</td>
</tr>
{/* Row 7 */}
<tr className="hover:bg-white/5 transition-colors group">
<td className="py-3 px-4 text-center"><span className="material-symbols-outlined text-green-400 text-[18px]">check_circle</span></td>
<td className="py-3 px-4 text-white">#4634</td>
<td className="py-3 px-4 text-right text-on-surface-variant">4,200</td>
<td className="py-3 px-4 text-right text-white">4,200</td>
<td className="py-3 px-4 text-right text-green-400">0</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">UTR12360</td>
<td className="py-3 px-4"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs">Exact Match</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs">—</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
{/* Right Panel (25%) - Gap Analysis */}
<div className="lg:col-span-1 flex flex-col order-first lg:order-last mb-8 lg:mb-0">
<div className="glass-panel p-6 rounded-xl flex-1 flex flex-col h-full relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-b from-electric-violet/5 to-transparent pointer-events-none"></div>
<h3 className="text-headline-md font-headline-md text-white mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-electric-violet">analytics</span>
                        Gap Analysis
                    </h3>
<div className="space-y-6 font-label-mono mb-8">
<div>
<div className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider">Total Expected</div>
<div className="text-xl text-white">₹1,47,500</div>
</div>
<div>
<div className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider">Total Settled</div>
<div className="text-xl text-white">₹1,27,100</div>
</div>
<div className="pt-4 border-t border-outline-variant/30">
<div className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider">Net Gap</div>
<div className="text-2xl text-red-400 font-bold mb-4">₹20,400</div>
<div className="bg-surface/50 rounded-lg p-4 space-y-3">
<div className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Gap Breakdown</div>
<div className="flex justify-between items-center text-sm">
<span className="text-on-surface-variant flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-neon-gold"></span>
                                        Discounts
                                    </span>
<span className="text-white">₹12,860</span>
</div>
<div className="text-[10px] text-on-surface-variant opacity-70 ml-3">(3 orders)</div>
<div className="flex justify-between items-center text-sm mt-2">
<span className="text-on-surface-variant flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                        Pending
                                    </span>
<span className="text-white">₹7,540</span>
</div>
<div className="text-[10px] text-on-surface-variant opacity-70 ml-3">(2 orders)</div>
</div>
</div>
</div>
<div className="mt-auto">
<div className="bg-gradient-to-r from-electric-violet/20 to-green-500/20 border border-electric-violet/30 rounded-lg p-4 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-green-400 text-[20px]">verified</span>
<span className="text-sm font-medium text-white">Every rupee accounted for</span>
</div>
</div>
</div>
</div>
</div>

    </main>
  );
}
