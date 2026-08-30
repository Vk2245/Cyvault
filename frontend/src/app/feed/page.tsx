
import React from 'react';

export default function Feed() {
  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden bg-[#030303] text-white">
      
{/* SideNavBar */}
<aside className="fixed left-0 top-0 h-full w-64 border-r border-white/10 bg-background/80 dark:bg-background/80 backdrop-blur-xl flex flex-col p-unit*4 z-40 hidden md:flex">
{/* Header */}
<div className="px-6 py-8 border-b border-white/10 mb-6 flex items-center gap-4">
<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
<span className="material-symbols-outlined text-background" style={{fontVariationSettings: "'FILL' 1"}}>security</span>
</div>
<div>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary tracking-tight leading-none">Cyvault</h1>
<p className="text-[12px] font-label-mono text-on-surface-variant mt-1 uppercase tracking-wider">Action Feed</p>
</div>
</div>
{/* Navigation */}
<nav className="flex-1 px-4 space-y-2">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-white/5 transition-colors" href="/feed">
<span className="material-symbols-outlined">dashboard</span>
<span>Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-white/5 transition-colors" href="/feed">
<span className="material-symbols-outlined">warning</span>
<span>Alerts</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-white/5 transition-colors" href="/graph">
<span className="material-symbols-outlined">account_tree</span>
<span>Entity Graph</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-white/5 transition-colors" href="/feed">
<span className="material-symbols-outlined">storefront</span>
<span>Merchants</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-white/5 transition-colors" href="/policies">
<span className="material-symbols-outlined">gavel</span>
<span>Policies</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-r-2 border-primary bg-white/5" href="/feed">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>receipt_long</span>
<span>Action Feed</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-white/5 transition-colors mt-auto" href="/settings">
<span className="material-symbols-outlined">settings</span>
<span>Settings</span>
</a>
</nav>
{/* System Status CTA */}
<div className="mt-auto p-4">
<div className="glass-panel p-4 rounded-xl flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-status-success animate-pulse"></div>
<span className="font-label-mono text-label-mono text-xs">System Status: Active</span>
</div>
</div>
</div>
</aside>
{/* Main Content Area */}
<main className="flex-1 flex flex-col ml-0 md:ml-64 h-screen relative">
{/* Background Ambient Glow */}
<div className="absolute top-0 left-1/4 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
{/* TopNavBar */}
<header className="h-16 border-b border-white/10 bg-background/60 dark:bg-background/60 backdrop-blur-xl flex items-center justify-between px-margin-desktop w-full shrink-0 z-30 sticky top-0">
{/* Search */}
<div className="flex-1 max-w-md">
<div className="relative flex items-center focus-within:ring-2 focus-within:ring-primary rounded-lg">
<span className="material-symbols-outlined absolute left-3 text-on-surface-variant">search</span>
<input className="w-full bg-white/5 border-none rounded-lg pl-10 pr-4 py-2 text-on-surface font-body-md focus:ring-0 placeholder-on-surface-variant/50" placeholder="Search orders, customers, UTR..." type="text"/>
</div>
</div>
{/* Actions */}
<div className="flex items-center gap-6 ml-4">
<button className="text-on-surface-variant hover:text-primary transition-all relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
</button>
<button className="text-on-surface-variant hover:text-primary transition-all">
<span className="material-symbols-outlined">account_circle</span>
</button>
</div>
</header>
{/* Filters Bar */}
<div className="border-b border-white/10 bg-surface-container-lowest/50 backdrop-blur-md px-margin-desktop py-4 flex flex-wrap items-center gap-4 z-20 shrink-0 sticky top-16">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-on-surface-variant text-sm">calendar_today</span>
<select className="glass-input rounded-md px-3 py-1.5 text-sm font-label-mono text-label-mono appearance-none pr-8">
<option>Today</option>
<option>Last 7 Days</option>
<option>Last 30 Days</option>
</select>
</div>
<div className="h-6 w-px bg-white/10 mx-2"></div>
<div className="flex items-center gap-2">
<span className="text-sm text-on-surface-variant mr-2">Action Type:</span>
<div className="flex gap-2">
<button className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">All</button>
<button className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-on-surface-variant hover:bg-white/10 border border-transparent">Retry</button>
<button className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-on-surface-variant hover:bg-white/10 border border-transparent">Block</button>
<button className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-on-surface-variant hover:bg-white/10 border border-transparent">Recovery</button>
<button className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-on-surface-variant hover:bg-white/10 border border-transparent">Settlement</button>
</div>
</div>
<div className="h-6 w-px bg-white/10 mx-2 hidden lg:block"></div>
<div className="flex items-center gap-2 hidden lg:flex">
<span className="text-sm text-on-surface-variant mr-2">Status:</span>
<select className="glass-input rounded-md px-3 py-1.5 text-sm font-label-mono text-label-mono">
<option>All Statuses</option>
<option>Success</option>
<option>Blocked</option>
<option>Pending</option>
</select>
</div>
<div className="ml-auto">
<button className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined text-sm">download</span>
                    Export CSV
                </button>
</div>
</div>
{/* Feed Canvas */}
<div className="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop relative z-10 scroll-smooth">
<div className="max-w-4xl mx-auto space-y-6 pb-24">
{/* Timeline Line (Visual only, behind cards) */}
<div className="absolute left-[calc(64px+1.5rem)] top-0 bottom-0 w-px bg-white/5 -z-10 hidden md:block"></div>
{/* Card 1 (Success) */}
<div className="glass-panel rounded-xl overflow-hidden flex relative group transition-transform duration-300 hover:-translate-y-1">
<div className="w-1 bg-status-success shrink-0"></div>
<div className="p-6 flex-1 flex flex-col gap-4">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-status-success shadow-[0_0_10px_#10B981]"></div>
<h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Auto-Retried Payment</h3>
</div>
<span className="font-label-mono text-label-mono text-on-surface-variant/70 text-xs">10:42 AM, Aug 28</span>
</div>
<div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
<div><span className="text-on-surface-variant">Order:</span> <span className="font-label-mono text-on-surface">#4521</span></div>
<div><span className="text-on-surface-variant">Customer:</span> <span className="text-on-surface">Ravi S.</span></div>
<div><span className="text-on-surface-variant">Amount:</span> <span className="font-label-mono text-on-surface text-status-success">₹2,499</span></div>
</div>
<div className="bg-black/40 border border-white/5 rounded-lg p-3 font-label-mono text-[12px] leading-relaxed pipeline-trace">
<span className="text-on-surface-variant">ML Risk: 0.15 (LOW)</span> <span className="text-primary mx-2">→</span>
<span className="text-on-surface-variant">LLM: Agreed</span> <span className="text-primary mx-2">→</span>
<span className="text-on-surface-variant">Policy: retry_under_5k <span className="text-status-success">PASS</span></span> <span className="text-primary mx-2">→</span>
<span className="text-on-surface-variant">Action: Payment Link Created</span>
</div>
<div className="mt-2 pt-4 border-t border-white/10 flex items-center gap-2">
<span className="material-symbols-outlined text-status-success text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
<span className="text-sm font-medium text-status-success">RECOVERED</span>
<span className="text-sm text-on-surface-variant">— Customer paid via link at 11:15 AM</span>
</div>
</div>
</div>
{/* Card 2 (Blocked) */}
<div className="glass-panel rounded-xl overflow-hidden flex relative group transition-transform duration-300 hover:-translate-y-1">
<div className="w-1 bg-status-error shrink-0"></div>
<div className="p-6 flex-1 flex flex-col gap-4">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-status-error shadow-[0_0_10px_#EF4444]"></div>
<h3 className="font-headline-md text-[20px] font-semibold text-on-surface">BLOCKED Retry Attempt</h3>
<span className="px-2 py-0.5 rounded text-[10px] font-label-mono bg-status-error/20 text-status-error border border-status-error/30 uppercase">Policy: block_high_risk</span>
</div>
<span className="font-label-mono text-label-mono text-on-surface-variant/70 text-xs">10:45 AM</span>
</div>
<div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
<div><span className="text-on-surface-variant">Order:</span> <span className="font-label-mono text-on-surface">#4590</span></div>
<div><span className="text-on-surface-variant">Customer:</span> <span className="text-on-surface">Amit K.</span></div>
<div><span className="text-on-surface-variant">Amount:</span> <span className="font-label-mono text-on-surface">₹12,000</span></div>
</div>
<div className="bg-black/40 border border-white/5 rounded-lg p-3 font-label-mono text-[12px] leading-relaxed pipeline-trace">
<span className="text-status-error/80">ML Risk: 0.93 (HIGH)</span> <span className="text-primary mx-2">→</span>
<span className="text-status-error/80">Fraud Ring: YES (Cluster #7)</span> <span className="text-primary mx-2">→</span>
<span className="text-on-surface-variant">Policy: block_high_risk <span className="text-status-error font-bold">TRIGGERED</span></span> <span className="text-primary mx-2">→</span>
<span className="text-status-error font-bold">Action: BLOCKED</span>
</div>
<div className="mt-2 pt-4 border-t border-white/10 flex items-center gap-2">
<span className="material-symbols-outlined text-status-error text-sm" style={{fontVariationSettings: "'FILL' 1"}}>cancel</span>
<span className="text-sm font-medium text-status-error">BLOCKED</span>
<span className="text-sm text-on-surface-variant">— Customer in fraud ring, risk too high</span>
</div>
</div>
</div>
{/* Card 3 (Pending) */}
<div className="glass-panel rounded-xl overflow-hidden flex relative group transition-transform duration-300 hover:-translate-y-1">
<div className="w-1 bg-status-warning shrink-0"></div>
<div className="p-6 flex-1 flex flex-col gap-4">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-status-warning shadow-[0_0_10px_#F59E0B]"></div>
<h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Recovery Email Sent</h3>
</div>
<span className="font-label-mono text-label-mono text-on-surface-variant/70 text-xs">10:48 AM</span>
</div>
<div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
<div><span className="text-on-surface-variant">Order:</span> <span className="font-label-mono text-on-surface">#4601</span></div>
<div><span className="text-on-surface-variant">Customer:</span> <span className="text-on-surface">Neha R.</span></div>
<div><span className="text-on-surface-variant">Amount:</span> <span className="font-label-mono text-on-surface">₹3,200</span></div>
</div>
<div className="bg-black/40 border border-white/5 rounded-lg p-4 text-sm text-on-surface-variant">
                            Cart abandoned at payment step. Risk: 0.08 (LOW). Recovery contact 1/2 today.
                        </div>
<div className="mt-2 pt-4 border-t border-white/10 flex items-center gap-2">
<span className="material-symbols-outlined text-status-warning text-sm" style={{fontVariationSettings: "'FILL' 1"}}>pending</span>
<span className="text-sm font-medium text-status-warning">PENDING</span>
<span className="text-sm text-on-surface-variant">— Awaiting customer response</span>
</div>
</div>
</div>
</div>
</div>
</main>

    </div>
  );
}
