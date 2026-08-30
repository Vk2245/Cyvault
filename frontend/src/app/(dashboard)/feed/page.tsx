import React from 'react';
import { Search, Bell, User, Calendar, Download, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function Feed() {
  return (
    <main className="flex-1 flex flex-col h-full relative w-full">


{/* TopNavBar */}
<header className="h-16 border-b border-white/10 bg-background/60 dark:bg-background/60 backdrop-blur-xl flex items-center justify-between px-margin-desktop w-full shrink-0 z-30 sticky top-0">
{/* Search */}
<div className="flex-1 max-w-md">
<div className="relative flex items-center focus-within:ring-2 focus-within:ring-primary rounded-lg">
<Search size={20} className="absolute left-3 text-on-surface-variant" />
<input className="w-full bg-white/5 border-none rounded-lg pl-10 pr-4 py-2 text-on-surface font-body-md focus:ring-0 placeholder-on-surface-variant/50" placeholder="Search orders, customers, UTR..." type="text"/>
</div>
</div>
{/* Actions */}
<div className="flex items-center gap-6 ml-4">
<button className="text-on-surface-variant hover:text-primary transition-all relative">
<Bell size={24} />
<span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
</button>
<button className="text-on-surface-variant hover:text-primary transition-all">
<User size={24} />
</button>
</div>
</header>
{/* Filters Bar */}
<div className="border-b border-white/10 bg-surface-container-lowest/50 backdrop-blur-md px-margin-desktop py-4 flex flex-wrap items-center gap-4 z-20 shrink-0 sticky top-16">
<div className="flex items-center gap-2">
<Calendar size={16} className="text-on-surface-variant" />
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
<Download size={16} />
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
<div className="w-1 bg-secondary shrink-0"></div>
<div className="p-6 flex-1 flex flex-col gap-4">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_#10B981]"></div>
<h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Auto-Retried Payment</h3>
</div>
<span className="font-label-mono text-label-mono text-on-surface-variant/70 text-xs">10:42 AM, Aug 28</span>
</div>
<div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
<div><span className="text-on-surface-variant">Order:</span> <span className="font-label-mono text-on-surface">#4521</span></div>
<div><span className="text-on-surface-variant">Customer:</span> <span className="text-on-surface">Ravi S.</span></div>
<div><span className="text-on-surface-variant">Amount:</span> <span className="font-label-mono text-on-surface text-secondary">₹2,499</span></div>
</div>
<div className="bg-white/5 border border-white/10 rounded-lg p-3 mt-2 flex items-center justify-between text-xs text-on-surface-variant">
<span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Risk: Low</span>
<span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> LLM: Approved</span>
<span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Policy: Passed</span>
</div>
<div className="mt-2 pt-4 border-t border-white/10 flex items-center gap-2">
<CheckCircle2 size={16} className="text-secondary" />
<span className="text-sm font-medium text-secondary">RECOVERED</span>
<span className="text-sm text-on-surface-variant">— Customer paid via link at 11:15 AM</span>
</div>
</div>
</div>
{/* Card 2 (Blocked) */}
<div className="glass-panel rounded-xl overflow-hidden flex relative group transition-transform duration-300 hover:-translate-y-1">
<div className="w-1 bg-white/10 shrink-0"></div>
<div className="p-6 flex-1 flex flex-col gap-4">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-white/10 shadow-[0_0_10px_#EF4444]"></div>
<h3 className="font-headline-md text-[20px] font-semibold text-on-surface">BLOCKED Retry Attempt</h3>
<span className="px-2 py-0.5 rounded text-[10px] font-label-mono bg-white/10/20 text-on-surface-variant border border-status-error/30 uppercase">Policy: block_high_risk</span>
</div>
<span className="font-label-mono text-label-mono text-on-surface-variant/70 text-xs">10:45 AM</span>
</div>
<div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
<div><span className="text-on-surface-variant">Order:</span> <span className="font-label-mono text-on-surface">#4590</span></div>
<div><span className="text-on-surface-variant">Customer:</span> <span className="text-on-surface">Amit K.</span></div>
<div><span className="text-on-surface-variant">Amount:</span> <span className="font-label-mono text-on-surface">₹12,000</span></div>
</div>
<div className="bg-white/5 border border-white/10 rounded-lg p-3 mt-2 flex items-center justify-between text-xs text-on-surface-variant">
<span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white/10"></span> Risk: High</span>
<span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white/10"></span> Fraud Ring Match</span>
<span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white/10"></span> Policy: Triggered</span>
</div>
<div className="mt-2 pt-4 border-t border-white/10 flex items-center gap-2">
<XCircle size={16} className="text-on-surface-variant" />
<span className="text-sm font-medium text-on-surface-variant">BLOCKED</span>
<span className="text-sm text-on-surface-variant">— Customer in fraud ring, risk too high</span>
</div>
</div>
</div>
{/* Card 3 (Pending) */}
<div className="glass-panel rounded-xl overflow-hidden flex relative group transition-transform duration-300 hover:-translate-y-1">
<div className="w-1 bg-secondary shrink-0"></div>
<div className="p-6 flex-1 flex flex-col gap-4">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_#F59E0B]"></div>
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
<Clock size={16} className="text-secondary" />
<span className="text-sm font-medium text-secondary">PENDING</span>
<span className="text-sm text-on-surface-variant">— Awaiting customer response</span>
</div>
</div>
</div>
</div>
</div>

    </main>
  );
}
