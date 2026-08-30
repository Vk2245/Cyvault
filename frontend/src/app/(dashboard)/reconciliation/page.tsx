import React from 'react';
import { CheckCircle2, ArrowUp, XCircle, Clock, LineChart, ShieldCheck } from 'lucide-react';

export default function Reconciliation() {
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden w-full p-6 md:p-8">

{/* Header Section */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6 shrink-0">
<div>
<h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-white mb-2">Reconciliation Dashboard</h2>
<p className="text-on-surface-variant max-w-2xl">Real-time ledger matching and anomaly detection across all payment gateways.</p>
</div>
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
<span className="text-label-mono font-label-mono text-sm text-on-surface-variant">Live Sync: Active</span>
</div>
</div>
{/* Main Area */}
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 min-h-0">
{/* Left/Main Column (75%) */}
<div className="lg:col-span-3 flex flex-col min-h-0 h-full">
{/* Top Row Stats */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 shrink-0">
{/* Matched Stat */}
<div className="glass-panel p-6 rounded-xl card-hover transition-all duration-300 relative overflow-hidden group">
<div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all"></div>
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-2">
<CheckCircle2 size={24} className="text-on-surface" />
<h3 className="text-on-surface-variant text-sm uppercase tracking-wider font-semibold">Matched</h3>
</div>
</div>
<div className="flex items-end justify-between">
<div>
<div className="text-stat-lg font-stat-lg text-white mb-1">342</div>
<div className="text-xs text-on-surface flex items-center gap-1">
<ArrowUp size={14} />
                            94.2% match rate
                        </div>
</div>
</div>
</div>
{/* Unmatched Stat */}
<div className="glass-panel p-6 rounded-xl card-hover transition-all duration-300 relative overflow-hidden group border-red-500/30">
<div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-2">
<XCircle size={24} className="text-on-surface-variant" />
<h3 className="text-on-surface-variant text-sm uppercase tracking-wider font-semibold">Unmatched</h3>
</div>
</div>
<div className="flex items-end justify-between">
<div>
<div className="text-stat-lg font-stat-lg text-white mb-1">12</div>
<div className="text-xs text-on-surface-variant font-label-mono bg-white/5 px-2 py-1 rounded inline-block mt-1">
                            ₹38,400 discrepancy
                        </div>
</div>
</div>
</div>
{/* Pending Stat */}
<div className="glass-panel p-6 rounded-xl card-hover transition-all duration-300 relative overflow-hidden group">
<div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl group-hover:bg-neon-gold/20 transition-all"></div>
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-2">
<Clock size={24} className="text-secondary" />
<h3 className="text-on-surface-variant text-sm uppercase tracking-wider font-semibold">Pending</h3>
</div>
</div>
<div className="flex items-end justify-between">
<div>
<div className="text-stat-lg font-stat-lg text-white mb-1">9</div>
<div className="text-xs text-secondary flex items-center gap-1 mt-1">
                            Expected by tomorrow
                        </div>
</div>
</div>
</div>
</div>
{/* Tabs */}
<div className="flex gap-4 border-b border-outline-variant/30 pb-px overflow-x-auto hide-scrollbar shrink-0 mb-6">
<button className="px-4 py-2 border-b-2 border-electric-violet text-white font-medium whitespace-nowrap">All</button>
<button className="px-4 py-2 border-b-2 border-transparent text-on-surface-variant hover:text-white transition-colors whitespace-nowrap">Matched</button>
<button className="px-4 py-2 border-b-2 border-transparent text-on-surface-variant hover:text-white transition-colors whitespace-nowrap">Unmatched</button>
<button className="px-4 py-2 border-b-2 border-transparent text-on-surface-variant hover:text-white transition-colors whitespace-nowrap">Pending</button>
</div>
{/* Table Container */}
<div className="glass-panel rounded-xl border border-outline-variant/20 flex flex-col flex-1 min-h-0">
<div className="overflow-x-auto overflow-y-auto hide-scrollbar flex-1">
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
<td className="py-3 px-4 text-center flex justify-center"><CheckCircle2 size={18} className="text-on-surface" /></td>
<td className="py-3 px-4 text-white">#4521</td>
<td className="py-3 px-4 text-right text-on-surface-variant">2,499</td>
<td className="py-3 px-4 text-right text-white">2,499</td>
<td className="py-3 px-4 text-right text-on-surface">0</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">UTR12345</td>
<td className="py-3 px-4"><span className="bg-white/10 text-on-surface px-2 py-1 rounded text-xs">Exact Match</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs truncate max-w-[200px]" title="Recovery payment">Recovery payment</td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-white/5 transition-colors group">
<td className="py-3 px-4 text-center flex justify-center"><CheckCircle2 size={18} className="text-on-surface" /></td>
<td className="py-3 px-4 text-white">#4388</td>
<td className="py-3 px-4 text-right text-on-surface-variant">8,750</td>
<td className="py-3 px-4 text-right text-white">8,750</td>
<td className="py-3 px-4 text-right text-on-surface">0</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">UTR12346</td>
<td className="py-3 px-4"><span className="bg-white/10 text-on-surface px-2 py-1 rounded text-xs">Exact Match</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs">—</td>
</tr>
{/* Row 3 */}
<tr className="hover:bg-white/5 transition-colors group bg-white/5">
<td className="py-3 px-4 text-center flex justify-center"><XCircle size={18} className="text-on-surface-variant" /></td>
<td className="py-3 px-4 text-white">#4102</td>
<td className="py-3 px-4 text-right text-on-surface-variant">5,000</td>
<td className="py-3 px-4 text-right text-white">4,500</td>
<td className="py-3 px-4 text-right text-on-surface-variant font-bold">-500</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">UTR12350</td>
<td className="py-3 px-4"><span className="bg-white/5 text-on-surface-variant px-2 py-1 rounded text-xs">Amt Mismatch</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs truncate max-w-[200px]" title="₹500 discount applied during recovery">₹500 discount applied...</td>
</tr>
{/* Row 4 */}
<tr className="hover:bg-white/5 transition-colors group bg-white/5">
<td className="py-3 px-4 text-center flex justify-center"><XCircle size={18} className="text-on-surface-variant" /></td>
<td className="py-3 px-4 text-white">#4233</td>
<td className="py-3 px-4 text-right text-on-surface-variant">3,200</td>
<td className="py-3 px-4 text-right text-white">0</td>
<td className="py-3 px-4 text-right text-on-surface-variant font-bold">-3,200</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">—</td>
<td className="py-3 px-4"><span className="bg-white/5 text-on-surface-variant px-2 py-1 rounded text-xs border border-red-500/30">No UTR</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs truncate max-w-[200px]" title="Settlement pending from bank">Settlement pending...</td>
</tr>
{/* Row 5 */}
<tr className="hover:bg-white/5 transition-colors group bg-white/5">
<td className="py-3 px-4 text-center flex justify-center"><XCircle size={18} className="text-on-surface-variant" /></td>
<td className="py-3 px-4 text-white">#4567</td>
<td className="py-3 px-4 text-right text-on-surface-variant">12,000</td>
<td className="py-3 px-4 text-right text-white">11,640</td>
<td className="py-3 px-4 text-right text-on-surface-variant font-bold">-360</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">UTR12355</td>
<td className="py-3 px-4"><span className="bg-white/5 text-on-surface-variant px-2 py-1 rounded text-xs">Amt Mismatch</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs truncate max-w-[200px]" title="₹360 = 3% recovery discount">₹360 = 3% discount</td>
</tr>
{/* Row 6 */}
<tr className="hover:bg-white/5 transition-colors group bg-secondary/5">
<td className="py-3 px-4 text-center flex justify-center"><Clock size={18} className="text-secondary" /></td>
<td className="py-3 px-4 text-white">#4601</td>
<td className="py-3 px-4 text-right text-on-surface-variant">3,200</td>
<td className="py-3 px-4 text-right text-on-surface-variant">—</td>
<td className="py-3 px-4 text-right text-on-surface-variant">—</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">—</td>
<td className="py-3 px-4"><span className="bg-secondary/10 text-secondary px-2 py-1 rounded text-xs">Pending</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs truncate max-w-[200px]">Recovery in progress</td>
</tr>
{/* Row 7 */}
<tr className="hover:bg-white/5 transition-colors group">
<td className="py-3 px-4 text-center flex justify-center"><CheckCircle2 size={18} className="text-on-surface" /></td>
<td className="py-3 px-4 text-white">#4634</td>
<td className="py-3 px-4 text-right text-on-surface-variant">4,200</td>
<td className="py-3 px-4 text-right text-white">4,200</td>
<td className="py-3 px-4 text-right text-on-surface">0</td>
<td className="py-3 px-4 text-on-surface-variant text-xs">UTR12360</td>
<td className="py-3 px-4"><span className="bg-white/10 text-on-surface px-2 py-1 rounded text-xs">Exact Match</span></td>
<td className="py-3 px-4 text-on-surface-variant text-xs">—</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
{/* Right Panel (25%) - Gap Analysis */}
<div className="lg:col-span-1 flex flex-col h-full min-h-0">
<div className="glass-panel p-4 rounded-xl flex flex-col h-full overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-b from-electric-violet/5 to-transparent pointer-events-none"></div>
<h3 className="text-lg font-headline-md text-white mb-3 flex items-center gap-2">
<LineChart size={20} className="text-electric-violet" />
                        Gap Analysis
                    </h3>
<div className="space-y-3 font-label-mono mb-4">
<div>
<div className="text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider">Total Expected</div>
<div className="text-lg text-white">₹1,47,500</div>
</div>
<div>
<div className="text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider">Total Settled</div>
<div className="text-lg text-white">₹1,27,100</div>
</div>
<div className="pt-2 border-t border-outline-variant/30">
<div className="text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider">Net Gap</div>
<div className="text-xl text-on-surface-variant font-bold mb-2">₹20,400</div>
<div className="bg-surface/50 rounded-lg p-3 space-y-2">
<div className="text-[10px] font-semibold text-white uppercase tracking-wider mb-2">Gap Breakdown</div>
<div className="flex justify-between items-center text-sm">
<span className="text-on-surface-variant flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                        Discounts
                                    </span>
<span className="text-white">₹12,860</span>
</div>
<div className="text-[10px] text-on-surface-variant opacity-70 ml-3">(3 orders)</div>
<div className="flex justify-between items-center text-sm mt-2">
<span className="text-on-surface-variant flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-white/5"></span>
                                        Pending
                                    </span>
<span className="text-white">₹7,540</span>
</div>
<div className="text-[10px] text-on-surface-variant opacity-70 ml-3">(2 orders)</div>
</div>
</div>
</div>
<div className="mt-auto">
<div className="bg-gradient-to-r from-electric-violet/20 to-green-500/20 border border-electric-violet/30 rounded-lg p-3 flex items-center justify-center gap-2">
<ShieldCheck size={16} className="text-secondary" />
<span className="text-xs font-medium text-white">Every rupee accounted for</span>
</div>
</div>
</div>
</div>
</div>

    </main>
  );
}
