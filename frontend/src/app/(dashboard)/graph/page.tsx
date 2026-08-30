import React from 'react';
import { Search, Filter, User, Smartphone, CreditCard, Laptop, AlertTriangle, Router, X, MapPin, Ban } from 'lucide-react';

export default function Graph() {
  return (
    <main className="flex-1 flex flex-col h-full relative w-full">

{/* Top Bar */}
<header className="glass-panel h-16 flex items-center justify-between px-gutter border-b border-t-0 border-l-0 border-r-0 shrink-0">
<div className="flex items-center gap-4">
<span className="font-headline-md text-headline-md text-on-surface">TrendKart</span>
<span className="px-2 py-1 bg-surface-container-high rounded text-on-surface-variant font-label-mono text-label-mono border border-white/10">Merchant ID: TK-8892</span>
</div>
<div className="flex-1 max-w-md mx-8">
<div className="relative group">
<Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
<input className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-[0_0_10px_rgba(208,188,255,0)] focus:shadow-[0_0_10px_rgba(208,188,255,0.2)]" placeholder="Search Node ID, IP, or Customer..." type="text"/>
</div>
</div>
<div className="flex items-center gap-4">
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
<Filter size={24} />
</button>
</div>
</header>
{/* Visualization Canvas (Middle Area) */}
<div className="flex-1 relative overflow-hidden flex">
{/* Shader Background */}

{/* Graph Overlay Area (Mockup) */}
<div className="absolute inset-0 pointer-events-none p-8">
{/* Center: Normal Nodes */}
<div className="absolute top-1/3 left-1/4 flex flex-col items-center gap-8">
{/* Just placing some static visual nodes to represent the description */}
<div className="relative w-64 h-64">
{/* Connecting lines (mocked) */}
<svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{zIndex: '0'}}>
<path className="opacity-50" d="M128,128 L32,32" fill="none" stroke="url(#blue-grad)" strokeWidth="1.5"></path>
<path className="opacity-50" d="M128,128 L224,32" fill="none" stroke="url(#blue-grad)" strokeWidth="1.5"></path>
<path className="opacity-50" d="M128,128 L128,224" fill="none" stroke="url(#blue-grad)" strokeWidth="1.5"></path>
<defs>
<linearGradient id="blue-grad" x1="0%" x2="100%" y1="0%" y2="0%">
<stop offset="0%" stopColor="#3B82F6"></stop>
<stop offset="100%" stopColor="#8B5CF6"></stop>
</linearGradient>
</defs>
</svg>
{/* Central Node */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-surface-container rounded-full border border-tertiary-container flex items-center justify-center shadow-[0_0_15px_rgba(77,142,255,0.3)] pointer-events-auto cursor-pointer hover:scale-110 transition-transform">
<User size={16} className="text-secondary" />
</div>
{/* Peripheral Nodes */}
<div className="absolute top-0 left-0 w-8 h-8 bg-surface-container rounded-full border border-outline flex items-center justify-center pointer-events-auto tooltip-trigger">
<Smartphone size={14} className="text-outline" />
</div>
<div className="absolute top-0 right-0 w-8 h-8 bg-surface-container rounded-full border border-[#4ADE80] flex items-center justify-center pointer-events-auto">
<CreditCard size={14} className="text-[#4ADE80]" />
</div>
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-surface-container rounded-full border border-outline flex items-center justify-center pointer-events-auto">
<Laptop size={14} className="text-outline" />
</div>
</div>
</div>
{/* Right: FRAUD RING Cluster */}
<div className="absolute top-1/4 right-[35%] flex flex-col items-center">
<div className="mb-4 px-3 py-1 bg-white/5 border border-red-500/30 rounded-full flex items-center gap-2 pointer-events-auto z-10 backdrop-blur-md">
<AlertTriangle size={16} className="text-red-500" />
<span className="text-on-surface-variant font-label-mono text-xs whitespace-nowrap">High Risk Cluster (3 Accounts)</span>
</div>
<div className="relative w-72 h-72">
<svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{zIndex: '0'}}>
{/* Connections to shared device */}
<path className="opacity-80" d="M144,144 L48,48" fill="none" stroke="#ffb4ab" strokeDasharray="4,4" strokeWidth="1.5"></path>
<path className="opacity-80" d="M144,144 L240,48" fill="none" stroke="#ffb4ab" strokeDasharray="4,4" strokeWidth="1.5"></path>
<path className="opacity-80" d="M144,144 L144,240" fill="none" stroke="#ffb4ab" strokeDasharray="4,4" strokeWidth="1.5"></path>
</svg>
{/* Shared Device Node (Center of ring) */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/5 rounded-full border border-white/20/50 flex items-center justify-center pointer-events-auto cursor-pointer">
<div className="flex flex-col items-center">
<Router size={16} className="text-on-surface-variant" />
<span className="text-[8px] text-on-surface-variant font-label-mono mt-1">D-44F</span>
</div>
</div>
{/* Fraudulent Customers */}
<div className="absolute top-0 left-0 w-10 h-10 bg-white/5 rounded-full border border-white/20 flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors ring-2 ring-error ring-offset-2 ring-offset-background">
<User size={14} className="text-on-surface-variant" />
<span className="absolute -top-6 text-xs text-on-surface-variant font-label-mono">Amit K.</span>
</div>
<div className="absolute top-0 right-0 w-10 h-10 bg-white/5 rounded-full border border-white/20 flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors">
<User size={14} className="text-on-surface-variant" />
<span className="absolute -top-6 text-xs text-on-surface-variant font-label-mono">Priya S.</span>
</div>
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-white/5 rounded-full border border-white/20 flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors">
<User size={14} className="text-on-surface-variant" />
<span className="absolute -bottom-6 text-xs text-on-surface-variant font-label-mono">Suresh M.</span>
</div>
{/* Shared IP connected to shared device */}
<svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{zIndex: '0'}}>
<path className="opacity-50" d="M144,144 L280,144" fill="none" stroke="#ffb4ab" strokeWidth="1.5"></path>
</svg>
<div className="absolute top-1/2 -translate-y-1/2 -right-16 w-12 h-8 bg-surface-container rounded border border-white/20 flex flex-col items-center justify-center pointer-events-auto">
<span className="text-[9px] text-on-surface-variant font-label-mono">103.21.xx.xx</span>
</div>
</div>
</div>
</div>
{/* Right Sidebar: Node Details overlay */}
<aside className="absolute right-0 top-0 bottom-0 w-80 glass-panel border-l border-t-0 border-b-0 border-r-0 flex flex-col pointer-events-auto shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-20">
<div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
<h2 className="font-headline-md text-headline-md text-on-surface">Node Details</h2>
<button className="text-on-surface-variant hover:text-primary transition-colors">
<X size={24} />
</button>
</div>
<div className="p-6 flex-1 overflow-y-auto">
<div className="flex items-start gap-4 mb-6">
<div className="w-12 h-12 rounded-full bg-white/5 border-2 border-white/20 flex items-center justify-center shrink-0">
<User size={24} className="text-on-surface-variant" />
</div>
<div>
<h3 className="font-bold text-on-surface text-lg">Amit K.</h3>
<p className="text-on-surface-variant font-label-mono text-sm">ID: C-091</p>
<div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 border border-white/20 rounded text-on-surface-variant text-xs font-label-mono">
<AlertTriangle size={14} />
                                RISK SCORE: 0.93
                            </div>
</div>
</div>
<div className="space-y-4">
<div className="p-4 rounded-lg bg-surface-container border border-white/10">
<h4 className="text-sm font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">Shared Connections</h4>
<ul className="space-y-3">
<li className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container-high border border-white/20 flex items-center justify-center">
<Router size={16} className="text-on-surface-variant" />
</div>
<div className="flex-1">
<p className="text-sm text-on-surface font-label-mono">Device D-44F</p>
<p className="text-xs text-on-surface-variant">Linked to 3 bad actors</p>
</div>
</li>
<li className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container-high border border-outline flex items-center justify-center">
<MapPin size={16} className="text-outline" />
</div>
<div className="flex-1">
<p className="text-sm text-on-surface font-label-mono">103.21.xx.xx</p>
<p className="text-xs text-on-surface-variant">High risk subnet</p>
</div>
</li>
</ul>
</div>
<div className="p-4 rounded-lg bg-surface-container border border-white/10">
<h4 className="text-sm font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">Recent Activity</h4>
<p className="text-sm text-on-surface mb-1">Failed payment attempt (₹15,000)</p>
<p className="text-xs text-on-surface-variant font-label-mono">2 mins ago</p>
</div>
</div>
</div>
<div className="p-4 border-t border-white/10 bg-white/5">
<button className="w-full py-3 px-4 bg-white/10 border border-white/20 text-white hover:bg-white/20 font-bold rounded-full hover:opacity-90 transition-opacity flex justify-center items-center gap-2 shadow-sm">
<Ban size={24} />
                        Block Customer
                    </button>
</div>
</aside>
</div>
{/* Bottom Bar (Stats) */}
<footer className="glass-panel h-12 flex items-center justify-between px-gutter border-t border-b-0 border-l-0 border-r-0 shrink-0">
<div className="flex items-center gap-6 font-label-mono text-label-mono text-on-surface-variant">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-secondary"></div>
<span>247 nodes</span>
</div>
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-outline"></div>
<span>892 edges</span>
</div>
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-on-surface-variant"></div>
<span className="text-on-surface-variant">3 fraud rings detected</span>
</div>
</div>
<div className="text-xs text-on-surface-variant opacity-50">
                Live Analysis Active
            </div>
</footer>

    </main>
  );
}
