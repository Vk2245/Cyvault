
import React from 'react';

export default function Policies() {
  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden bg-[#030303] text-white">
      
{/* SideNavBar (Predicted & Rendered from JSON Style Logic) */}
<nav className="hidden md:flex flex-col h-screen p-unit*4 bg-background/80 dark:bg-background/80 backdrop-blur-xl border-r border-white/10 fixed left-0 top-0 w-64 z-50">
<div className="px-6 py-8">
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary mb-1">Cyvault</h1>
<p className="font-label-mono text-label-mono text-on-surface-variant text-xs opacity-70">Policy Management</p>
</div>
<ul className="flex flex-col gap-2 mt-8 px-4 flex-grow">
{/* Inactive */}
<li>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-white/5 transition-colors" href="/feed">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                    Dashboard
                </a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-white/5 transition-colors" href="/feed">
<span className="material-symbols-outlined" data-icon="warning">warning</span>
                    Alerts
                </a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-white/5 transition-colors" href="/graph">
<span className="material-symbols-outlined" data-icon="account_tree">account_tree</span>
                    Entity Graph
                </a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-white/5 transition-colors" href="/feed">
<span className="material-symbols-outlined" data-icon="storefront">storefront</span>
                    Merchants
                </a>
</li>
{/* Active State */}
<li>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 text-primary font-bold border-r-2 border-primary transition-transform duration-150 transform hover:scale-95" href="/policies">
<span className="material-symbols-outlined" data-icon="gavel" style={{fontVariationSettings: "'FILL' 1"}}>gavel</span>
                    Policies
                </a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-white/5 transition-colors mt-auto" href="/settings">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
                    Settings
                </a>
</li>
</ul>
<div className="p-4 mt-auto">
<div className="px-4 py-3 rounded-lg bg-surface-container-low border border-white/5 flex items-center justify-between">
<span className="font-label-mono text-[10px] text-on-surface-variant">System Status</span>
<span className="flex items-center gap-2 font-label-mono text-[10px] text-primary"><span className="status-active status-dot w-1.5 h-1.5"></span> Active</span>
</div>
</div>
</nav>
{/* TopNavBar (Predicted & Rendered) */}
<header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-background/60 dark:bg-background/60 backdrop-blur-xl border-b border-white/10 z-40 flex items-center justify-between px-margin-mobile md:px-margin-desktop w-full transition-all">
<div className="md:hidden flex items-center gap-4">
<span className="material-symbols-outlined text-primary text-2xl" data-icon="menu">menu</span>
<span className="font-headline-md text-headline-md font-extrabold text-on-surface dark:text-on-surface">Cyvault</span>
</div>
<div className="hidden md:block">
{/* Empty space to balance flex on desktop if needed, or breadcrumbs could go here */}
<span className="font-label-mono text-label-mono text-on-surface-variant opacity-70">Policies / Manager</span>
</div>
<div className="flex items-center gap-6">
<div className="relative group hidden sm:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors text-sm" data-icon="search">search</span>
<input className="input-glass pl-9 pr-4 py-1.5 rounded-full text-sm w-48 focus:w-64 transition-all duration-300 font-label-mono" placeholder="Search rules..." type="text"/>
</div>
<button className="text-on-surface-variant hover:text-primary transition-all relative">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
<span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
</button>
<button className="text-on-surface-variant hover:text-primary transition-all">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
</button>
</div>
</header>
{/* Main Content Area */}
<main className="flex-1 ml-0 md:ml-64 pt-24 pb-32 px-margin-mobile md:px-margin-desktop min-h-screen">
<div className="max-w-container-max mx-auto h-full flex flex-col">
{/* Page Header */}
<div className="mb-8 md:mb-12">
<h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2 glow-text">Policy Engine</h2>
<p className="text-on-surface-variant max-w-2xl">Define, test, and deploy automated logic rules to mitigate risk and optimize revenue recovery strategies.</p>
</div>
{/* 2-Column Grid */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start h-full pb-8">
{/* LEFT COLUMN: Active Policies List */}
<section className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 h-full">
<div className="flex items-center justify-between mb-2">
<div className="flex items-center gap-3">
<div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
<span className="material-symbols-outlined text-primary text-xl" data-icon="shield">shield</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">Active Policies</h3>
</div>
<span className="bg-surface-container-high border border-white/10 text-on-surface font-label-mono text-xs px-3 py-1 rounded-full">5 Rules</span>
</div>
{/* Policy List Container */}
<div className="flex flex-col gap-3 overflow-y-auto pr-2" style={{maxHeight: 'calc(100vh - 280px)'}}>
{/* Policy Card 1 */}
<div className="glass-card rounded-xl p-4 relative group">
<div className="flex justify-between items-start mb-2">
<div className="flex items-center gap-2">
<span className="status-active status-dot"></span>
<span className="font-label-mono text-primary text-sm font-bold tracking-wide">retry_under_5k</span>
</div>
<div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
<button className="hover:text-primary"><span className="material-symbols-outlined text-[18px]" data-icon="edit">edit</span></button>
<button className="hover:text-error"><span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span></button>
</div>
</div>
<p className="text-on-surface-variant text-sm mb-4">Auto-retry payments under ₹5,000.</p>
<div className="flex justify-between items-center mt-auto border-t border-white/5 pt-3">
<span className="text-xs font-label-mono text-on-surface-variant bg-white/5 px-2 py-1 rounded">0 violations</span>
{/* Toggle */}
<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
<input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out border-primary" id="toggle1" name="toggle1" style={{transform: 'translateX(100%)', right: 'auto', left: '0'}} type="checkbox"/>
<label className="toggle-label block overflow-hidden h-5 rounded-full bg-primary cursor-pointer transition-colors duration-200 ease-in-out" htmlFor="toggle1"></label>
</div>
</div>
</div>
{/* Policy Card 2 */}
<div className="glass-card rounded-xl p-4 relative group">
<div className="flex justify-between items-start mb-2">
<div className="flex items-center gap-2">
<span className="status-active status-dot"></span>
<span className="font-label-mono text-primary text-sm font-bold tracking-wide">max_2_recovery</span>
</div>
<div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
<button className="hover:text-primary"><span className="material-symbols-outlined text-[18px]" data-icon="edit">edit</span></button>
<button className="hover:text-error"><span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span></button>
</div>
</div>
<p className="text-on-surface-variant text-sm mb-4">Max 2 recovery messages per customer per day.</p>
<div className="flex justify-between items-center mt-auto border-t border-white/5 pt-3">
<span className="text-xs font-label-mono text-on-surface-variant bg-white/5 px-2 py-1 rounded">0 violations</span>
{/* Toggle */}
<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
<input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out border-primary" id="toggle2" name="toggle2" style={{transform: 'translateX(100%)', right: 'auto', left: '0'}} type="checkbox"/>
<label className="toggle-label block overflow-hidden h-5 rounded-full bg-primary cursor-pointer transition-colors duration-200 ease-in-out" htmlFor="toggle2"></label>
</div>
</div>
</div>
{/* Policy Card 3 */}
<div className="glass-card rounded-xl p-4 relative group border-primary/30 bg-primary/5">
<div className="flex justify-between items-start mb-2">
<div className="flex items-center gap-2">
<span className="status-active status-dot"></span>
<span className="font-label-mono text-primary text-sm font-bold tracking-wide">block_high_risk</span>
</div>
<div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
<button className="hover:text-primary"><span className="material-symbols-outlined text-[18px]" data-icon="edit">edit</span></button>
<button className="hover:text-error"><span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span></button>
</div>
</div>
<p className="text-on-surface-variant text-sm mb-4">Block customers with risk score above 0.7.</p>
<div className="flex justify-between items-center mt-auto border-t border-white/5 pt-3">
<span className="text-xs font-label-mono text-on-surface-variant bg-white/5 px-2 py-1 rounded">0 violations</span>
{/* Toggle */}
<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
<input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out border-primary" id="toggle3" name="toggle3" style={{transform: 'translateX(100%)', right: 'auto', left: '0'}} type="checkbox"/>
<label className="toggle-label block overflow-hidden h-5 rounded-full bg-primary cursor-pointer transition-colors duration-200 ease-in-out" htmlFor="toggle3"></label>
</div>
</div>
</div>
{/* Policy Card 4 */}
<div className="glass-card rounded-xl p-4 relative group">
<div className="flex justify-between items-start mb-2">
<div className="flex items-center gap-2">
<span className="status-active status-dot"></span>
<span className="font-label-mono text-secondary text-sm font-bold tracking-wide flex items-center gap-1">
                                        approval_above_10k
                                        <span className="material-symbols-outlined text-[14px]" data-icon="warning">warning</span>
</span>
</div>
<div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
<button className="hover:text-primary"><span className="material-symbols-outlined text-[18px]" data-icon="edit">edit</span></button>
<button className="hover:text-error"><span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span></button>
</div>
</div>
<p className="text-on-surface-variant text-sm mb-4">Need approval for retry above ₹10,000.</p>
<div className="flex justify-between items-center mt-auto border-t border-white/5 pt-3">
<span className="text-xs font-label-mono text-on-surface-variant bg-white/5 px-2 py-1 rounded">0 violations</span>
{/* Toggle */}
<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
<input defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out border-primary" id="toggle4" name="toggle4" style={{transform: 'translateX(100%)', right: 'auto', left: '0'}} type="checkbox"/>
<label className="toggle-label block overflow-hidden h-5 rounded-full bg-primary cursor-pointer transition-colors duration-200 ease-in-out" htmlFor="toggle4"></label>
</div>
</div>
</div>
{/* Policy Card 5 (Paused) */}
<div className="glass-card rounded-xl p-4 relative group opacity-60 hover:opacity-100">
<div className="flex justify-between items-start mb-2">
<div className="flex items-center gap-2">
<span className="status-paused status-dot"></span>
<span className="font-label-mono text-on-surface text-sm font-bold tracking-wide">discount_cap_5pct</span>
</div>
<div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
<button className="hover:text-primary"><span className="material-symbols-outlined text-[18px]" data-icon="edit">edit</span></button>
<button className="hover:text-error"><span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span></button>
</div>
</div>
<p className="text-on-surface-variant text-sm mb-4">Maximum 5% discount for recovery.</p>
<div className="flex justify-between items-center mt-auto border-t border-white/5 pt-3">
<span className="text-xs font-label-mono text-on-surface-variant bg-white/5 px-2 py-1 rounded">0 violations</span>
{/* Toggle (Off) */}
<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
<input className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out border-surface-container-highest" id="toggle5" name="toggle5" style={{transform: 'translateX(0)', left: '0', right: 'auto'}} type="checkbox"/>
<label className="toggle-label block overflow-hidden h-5 rounded-full bg-surface-container-highest cursor-pointer transition-colors duration-200 ease-in-out" htmlFor="toggle5"></label>
</div>
</div>
</div>
</div>
{/* Add New Button */}
<button className="mt-4 w-full py-4 border border-secondary/50 rounded-xl text-secondary font-bold hover:bg-secondary/10 transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined" data-icon="add">add</span>
                        Add New Policy
                    </button>
</section>
{/* RIGHT COLUMN: Create / Edit Policy (AI Workspace) */}
<section className="lg:col-span-7 xl:col-span-8 flex flex-col h-full mt-8 lg:mt-0">
<div className="glass-panel rounded-2xl p-1 flex flex-col h-full relative overflow-hidden">
{/* subtle animated background for the workspace */}
<div className="absolute inset-0 z-0 opacity-20 pointer-events-none">

</div>
<div className="relative z-10 p-6 md:p-8 flex flex-col h-full bg-background/95 rounded-[15px]">
<div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
<div className="p-2 bg-secondary/10 rounded-lg border border-secondary/20">
<span className="material-symbols-outlined text-secondary text-xl" data-icon="auto_awesome">auto_awesome</span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-on-surface">Create / Edit Policy</h3>
<p className="text-xs font-label-mono text-on-surface-variant">Natural Language to Executable Logic</p>
</div>
</div>
{/* Input Area */}
<div className="flex-grow flex flex-col gap-4">
<label className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                                    Describe your policy rule
                                </label>
<textarea className="w-full h-32 md:h-40 bg-[#0A0A0A] border border-primary/40 rounded-xl p-4 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" placeholder="e.g., Block transactions over $10k from new IPs...">If a customer has more than 2 chargebacks in the last 30 days, block all auto-retry attempts and flag for manual review.</textarea>
<div className="flex justify-end mt-2">
<button className="bg-secondary text-[#030303] px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-secondary-fixed transition-colors shadow-[0_0_15px_rgba(255,185,95,0.3)] hover:shadow-[0_0_25px_rgba(255,185,95,0.5)]">
<span className="material-symbols-outlined text-[20px]" data-icon="auto_awesome">auto_awesome</span>
                                        Compile Rule
                                    </button>
</div>
</div>
{/* Compiled Preview (Glassmorphism Card) */}
<div className="mt-8">
<div className="flex items-center gap-2 mb-3">
<span className="material-symbols-outlined text-sm text-on-surface-variant" data-icon="terminal">terminal</span>
<span className="text-sm font-medium text-on-surface-variant">Compiled Rule Preview</span>
</div>
<div className="glass-card rounded-xl p-5 border-l-4 border-l-primary relative overflow-hidden">
{/* Small glow effect inside card */}
<div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
<div className="flex justify-between items-center mb-4 relative z-10">
<span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-label-mono flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="check_circle">check_circle</span>
                                            Compiled Successfully
                                        </span>
<span className="text-xs font-label-mono text-on-surface-variant opacity-50">v1.0.4 • 12ms processing</span>
</div>
<div className="font-label-mono text-sm leading-relaxed text-on-surface-variant bg-[#050505] p-4 rounded-lg border border-white/5 relative z-10 overflow-x-auto">
<div className="flex mb-1"><span className="text-primary w-28 shrink-0">Rule:</span> <span className="text-on-surface">chargeback_block</span></div>
<div className="flex mb-1"><span className="text-primary w-28 shrink-0">Condition:</span> <span className="text-tertiary">customer.chargebacks_30d &gt; 2</span></div>
<div className="flex mb-1"><span className="text-primary w-28 shrink-0">Action:</span> <span className="text-error">BLOCK</span> <span className="ml-2 text-on-surface">auto-retry</span></div>
<div className="flex"><span className="text-primary w-28 shrink-0">Escalation:</span> <span className="text-secondary">FLAG</span> <span className="ml-2 text-on-surface">for manual review</span></div>
</div>
<div className="flex flex-col sm:flex-row gap-3 mt-6 relative z-10">
<button className="flex-1 bg-secondary text-[#030303] py-2.5 rounded-lg font-bold hover:bg-secondary-fixed transition-colors">
                                            Confirm &amp; Activate
                                        </button>
<button className="flex-1 border border-white/20 bg-transparent text-on-surface py-2.5 rounded-lg font-medium hover:bg-white/5 transition-colors">
                                            Edit Structure
                                        </button>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
</div>
</main>
{/* Footer (Predicted & Rendered) */}
<footer className="fixed bottom-0 right-0 left-0 md:left-64 py-4 bg-background/40 dark:bg-background/40 backdrop-blur-md border-t border-white/10 z-30 flex justify-between items-center px-margin-mobile md:px-margin-desktop w-full text-sm">
<span className="font-label-mono text-label-mono text-secondary-fixed-dim">© 2024 SecureGuard AI Compliance Engine</span>
<div className="hidden sm:flex gap-6">
<a className="font-label-mono text-label-mono text-on-surface-variant hover:text-secondary-fixed transition-colors cursor-pointer" href="/feed">GDPR Policy</a>
<a className="font-label-mono text-label-mono text-on-surface-variant hover:text-secondary-fixed transition-colors cursor-pointer" href="/feed">System Audit</a>
<a className="font-label-mono text-label-mono text-on-surface-variant hover:text-secondary-fixed transition-colors cursor-pointer" href="/feed">Support</a>
</div>
</footer>

    </div>
  );
}
