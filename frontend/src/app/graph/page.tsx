
import React from 'react';

export default function Graph() {
  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden bg-[#030303] text-white">
      
{/* Left Sidebar (Appears on Desktop, Hidden on Mobile for brevity in this specific task) */}
<aside className="hidden md:flex flex-col w-64 glass-panel border-r border-t-0 border-b-0 border-l-0 h-screen shrink-0 relative z-20">
<div className="p-gutter flex items-center gap-3 border-b border-[#ffffff1a]">
<span className="material-symbols-outlined text-primary text-3xl font-bold drop-shadow-[0_0_8px_rgba(208,188,255,0.8)]" data-icon="shield">shield</span>
<span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">CYVAULT</span>
</div>
<nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary transition-colors duration-300" href="/feed">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary transition-colors duration-300" href="/feed">
<span className="material-symbols-outlined" data-icon="warning">warning</span>
<span>Alerts</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-container text-primary shadow-[0_0_15px_rgba(208,188,255,0.15)] border border-[#ffffff1a] transition-all duration-300 relative overflow-hidden group" href="/graph">
<div className="absolute inset-0 bg-primary opacity-5 group-hover:opacity-10 transition-opacity"></div>
<span className="material-symbols-outlined" data-icon="hub">hub</span>
<span className="font-semibold relative z-10">Entity Graph</span>
<div className="absolute right-0 top-0 bottom-0 w-1 bg-primary"></div>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary transition-colors duration-300" href="/feed">
<span className="material-symbols-outlined" data-icon="manage_accounts">manage_accounts</span>
<span>Merchants</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary transition-colors duration-300" href="/settings">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span>Settings</span>
</a>
</nav>
</aside>
{/* Main Content Area */}
<main className="flex-1 flex flex-col h-screen relative z-10 bg-background overflow-hidden">
{/* Top Bar */}
<header className="glass-panel h-16 flex items-center justify-between px-gutter border-b border-t-0 border-l-0 border-r-0 shrink-0">
<div className="flex items-center gap-4">
<span className="font-headline-md text-headline-md text-on-surface">TrendKart</span>
<span className="px-2 py-1 bg-surface-container-high rounded text-on-surface-variant font-label-mono text-label-mono border border-[#ffffff1a]">Merchant ID: TK-8892</span>
</div>
<div className="flex-1 max-w-md mx-8">
<div className="relative group">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>
<input className="w-full bg-[#ffffff05] border border-[#ffffff1a] rounded-full py-2 pl-10 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-[0_0_10px_rgba(208,188,255,0)] focus:shadow-[0_0_10px_rgba(208,188,255,0.2)]" placeholder="Search Node ID, IP, or Customer..." type="text"/>
</div>
</div>
<div className="flex items-center gap-4">
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="filter_list">filter_list</span>
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
<path className="animated-line opacity-50" d="M128,128 L32,32" fill="none" stroke="url(#blue-grad)" strokeWidth="1.5"></path>
<path className="animated-line opacity-50" d="M128,128 L224,32" fill="none" stroke="url(#blue-grad)" strokeWidth="1.5"></path>
<path className="animated-line opacity-50" d="M128,128 L128,224" fill="none" stroke="url(#blue-grad)" strokeWidth="1.5"></path>
<defs>
<lineargradient id="blue-grad" x1="0%" x2="100%" y1="0%" y2="0%">
<stop offset="0%" stop-color="#3B82F6"></stop>
<stop offset="100%" stop-color="#8B5CF6"></stop>
</lineargradient>
</defs>
</svg>
{/* Central Node */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-surface-container rounded-full border border-tertiary-container flex items-center justify-center shadow-[0_0_15px_rgba(77,142,255,0.3)] pointer-events-auto cursor-pointer hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-tertiary-container text-sm" data-icon="person">person</span>
</div>
{/* Peripheral Nodes */}
<div className="absolute top-0 left-0 w-8 h-8 bg-surface-container rounded-full border border-outline flex items-center justify-center pointer-events-auto tooltip-trigger">
<span className="material-symbols-outlined text-outline text-xs" data-icon="phone_iphone">phone_iphone</span>
</div>
<div className="absolute top-0 right-0 w-8 h-8 bg-surface-container rounded-full border border-[#4ADE80] flex items-center justify-center pointer-events-auto">
<span className="material-symbols-outlined text-[#4ADE80] text-xs" data-icon="credit_card">credit_card</span>
</div>
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-surface-container rounded-full border border-outline flex items-center justify-center pointer-events-auto">
<span className="material-symbols-outlined text-outline text-xs" data-icon="laptop_mac">laptop_mac</span>
</div>
</div>
</div>
{/* Right: FRAUD RING Cluster */}
<div className="absolute top-1/4 right-[35%] flex flex-col items-center">
<div className="mb-4 px-3 py-1 bg-[#2a0808] border border-error rounded-full flex items-center gap-2 pulse-red pointer-events-auto z-10 backdrop-blur-md">
<span className="material-symbols-outlined text-error text-sm" data-icon="warning">warning</span>
<span className="text-error font-label-mono text-label-mono whitespace-nowrap">⚠ FRAUD RING — 3 linked accounts, ₹45,000 loss</span>
</div>
<div className="relative w-72 h-72">
<svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{zIndex: '0'}}>
{/* Connections to shared device */}
<path className="opacity-80" d="M144,144 L48,48" fill="none" stroke="#ffb4ab" stroke-dasharray="4,4" strokeWidth="1.5"></path>
<path className="opacity-80" d="M144,144 L240,48" fill="none" stroke="#ffb4ab" stroke-dasharray="4,4" strokeWidth="1.5"></path>
<path className="opacity-80" d="M144,144 L144,240" fill="none" stroke="#ffb4ab" stroke-dasharray="4,4" strokeWidth="1.5"></path>
</svg>
{/* Shared Device Node (Center of ring) */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-error-container rounded border-2 border-error flex items-center justify-center pulse-red pointer-events-auto cursor-pointer">
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-on-error-container text-sm" data-icon="router">router</span>
<span className="text-[8px] text-on-error-container font-label-mono mt-1">D-44F</span>
</div>
</div>
{/* Fraudulent Customers */}
<div className="absolute top-0 left-0 w-10 h-10 bg-[#351111] rounded-full border border-error flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-error-container transition-colors ring-2 ring-error ring-offset-2 ring-offset-background">
<span className="material-symbols-outlined text-error text-xs" data-icon="person">person</span>
<span className="absolute -top-6 text-xs text-error font-label-mono">Amit K.</span>
</div>
<div className="absolute top-0 right-0 w-10 h-10 bg-[#351111] rounded-full border border-error flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-error-container transition-colors">
<span className="material-symbols-outlined text-error text-xs" data-icon="person">person</span>
<span className="absolute -top-6 text-xs text-error font-label-mono">Priya S.</span>
</div>
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#351111] rounded-full border border-error flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-error-container transition-colors">
<span className="material-symbols-outlined text-error text-xs" data-icon="person">person</span>
<span className="absolute -bottom-6 text-xs text-error font-label-mono">Suresh M.</span>
</div>
{/* Shared IP connected to shared device */}
<svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{zIndex: '0'}}>
<path className="opacity-50" d="M144,144 L280,144" fill="none" stroke="#ffb4ab" strokeWidth="1.5"></path>
</svg>
<div className="absolute top-1/2 -translate-y-1/2 -right-16 w-12 h-8 bg-surface-container rounded border border-error flex flex-col items-center justify-center pointer-events-auto">
<span className="text-[9px] text-error font-label-mono">103.21.xx.xx</span>
</div>
</div>
</div>
</div>
{/* Right Sidebar: Node Details overlay */}
<aside className="absolute right-0 top-0 bottom-0 w-80 glass-panel border-l border-t-0 border-b-0 border-r-0 flex flex-col pointer-events-auto shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-20">
<div className="p-4 border-b border-[#ffffff1a] flex justify-between items-center bg-[#ffffff05]">
<h2 className="font-headline-md text-headline-md text-on-surface">Node Details</h2>
<button className="text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="close">close</span>
</button>
</div>
<div className="p-6 flex-1 overflow-y-auto">
<div className="flex items-start gap-4 mb-6">
<div className="w-12 h-12 rounded-full bg-[#351111] border-2 border-error flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-error text-xl" data-icon="person">person</span>
</div>
<div>
<h3 className="font-bold text-on-surface text-lg">Amit K.</h3>
<p className="text-on-surface-variant font-label-mono text-sm">ID: C-091</p>
<div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-[#2a0808] border border-error rounded text-error text-xs font-label-mono">
<span className="material-symbols-outlined text-[14px]" data-icon="warning">warning</span>
                                RISK SCORE: 0.93
                            </div>
</div>
</div>
<div className="space-y-4">
<div className="p-4 rounded-lg bg-surface-container border border-[#ffffff1a]">
<h4 className="text-sm font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">Shared Connections</h4>
<ul className="space-y-3">
<li className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container-high border border-error flex items-center justify-center">
<span className="material-symbols-outlined text-error text-sm" data-icon="router">router</span>
</div>
<div className="flex-1">
<p className="text-sm text-on-surface font-label-mono">Device D-44F</p>
<p className="text-xs text-on-surface-variant">Linked to 3 bad actors</p>
</div>
</li>
<li className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container-high border border-outline flex items-center justify-center">
<span className="material-symbols-outlined text-outline text-sm" data-icon="location_on">location_on</span>
</div>
<div className="flex-1">
<p className="text-sm text-on-surface font-label-mono">103.21.xx.xx</p>
<p className="text-xs text-on-surface-variant">High risk subnet</p>
</div>
</li>
</ul>
</div>
<div className="p-4 rounded-lg bg-surface-container border border-[#ffffff1a]">
<h4 className="text-sm font-semibold text-on-surface-variant mb-2 uppercase tracking-wider">Recent Activity</h4>
<p className="text-sm text-on-surface mb-1">Failed payment attempt (₹15,000)</p>
<p className="text-xs text-on-surface-variant font-label-mono">2 mins ago</p>
</div>
</div>
</div>
<div className="p-4 border-t border-[#ffffff1a] bg-[#ffffff05]">
<button className="w-full py-3 px-4 bg-error text-on-error font-bold rounded-lg hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
<span className="material-symbols-outlined" data-icon="block">block</span>
                        Block Customer
                    </button>
</div>
</aside>
</div>
{/* Bottom Bar (Stats) */}
<footer className="glass-panel h-12 flex items-center justify-between px-gutter border-t border-b-0 border-l-0 border-r-0 shrink-0">
<div className="flex items-center gap-6 font-label-mono text-label-mono text-on-surface-variant">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-tertiary-container"></div>
<span>247 nodes</span>
</div>
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-outline"></div>
<span>892 edges</span>
</div>
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-error pulse-red"></div>
<span className="text-error">3 fraud rings detected</span>
</div>
</div>
<div className="text-xs text-on-surface-variant opacity-50">
                Live Analysis Active
            </div>
</footer>
</main>

    </div>
  );
}
