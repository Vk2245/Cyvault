import React from 'react';

export default function Policies() {
  return (
    <main className="flex-1 flex flex-col h-full relative w-full">

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
<textarea className="w-full h-32 md:h-40 bg-[#0A0A0A] border border-primary/40 rounded-xl p-4 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" placeholder="e.g., Block transactions over $10k from new IPs..." defaultValue="If a customer has more than 2 chargebacks in the last 30 days, block all auto-retry attempts and flag for manual review."></textarea>
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
  );
}
