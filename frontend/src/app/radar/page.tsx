
import React from 'react';

export default function Radar() {
  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden bg-[#030303] text-white">
      
{/* SideNavBar (Desktop) */}
<nav className="hidden md:flex h-screen w-64 fixed left-0 top-0 border-r border-[#ffffff1a] backdrop-blur-xl bg-[#ffffff08] flex-col py-8 z-50">
<div className="px-6 mb-12">
<h1 className="text-headline-md font-headline-md font-bold text-primary dark:text-primary">Cyvault</h1>
<p className="text-on-surface-variant text-label-mono font-label-mono mt-1 uppercase tracking-wider">AI Governance</p>
</div>
<div className="flex-1 px-4 space-y-2">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-[#ffffff1a] transition-colors duration-200 active:scale-95 transition-transform font-body-md text-body-md" href="/feed">
<span className="material-symbols-outlined">dashboard</span>
                Dashboard
            </a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary dark:text-primary font-bold border-r-2 border-primary bg-[#ffffff08] shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:bg-[#ffffff1a] transition-colors duration-200 active:scale-95 transition-transform font-body-md text-body-md" href="/settings">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>bar_chart</span>
                Analytics
            </a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-[#ffffff1a] transition-colors duration-200 active:scale-95 transition-transform font-body-md text-body-md" href="/feed">
<span className="material-symbols-outlined">restore_page</span>
                Recovery
            </a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-[#ffffff1a] transition-colors duration-200 active:scale-95 transition-transform font-body-md text-body-md" href="/feed">
<span className="material-symbols-outlined">gavel</span>
                Compliance
            </a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-[#ffffff1a] transition-colors duration-200 active:scale-95 transition-transform font-body-md text-body-md" href="/settings">
<span className="material-symbols-outlined">settings</span>
                Settings
            </a>
</div>
<div className="px-6 mt-auto">
<div className="flex items-center gap-3 p-4 glass-panel rounded-xl">
<div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
<span className="font-label-mono text-label-mono text-on-surface">System Secure</span>
</div>
</div>
</nav>
{/* BottomNavBar (Mobile) */}
<nav className="md:hidden fixed bottom-0 w-full glass-panel z-50 flex justify-around items-center h-16 pb-safe">
<a className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant" href="/feed">
<span className="material-symbols-outlined text-[20px]">dashboard</span>
</a>
<a className="flex flex-col items-center justify-center w-full h-full text-primary relative" href="/settings">
<div className="absolute inset-0 bg-primary/10 rounded-full blur-md scale-50"></div>
<span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>bar_chart</span>
</a>
<a className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant" href="/feed">
<span className="material-symbols-outlined text-[20px]">restore_page</span>
</a>
<a className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant" href="/feed">
<span className="material-symbols-outlined text-[20px]">gavel</span>
</a>
</nav>
{/* Main Content Wrapper */}
<main className="flex-1 flex flex-col min-h-screen md:ml-64 w-full">
{/* TopAppBar */}
<header className="hidden md:flex justify-between items-center h-16 px-margin-desktop docked full-width top-0 sticky z-40 border-b border-[#ffffff1a] backdrop-blur-xl bg-[#ffffff08]">
<div className="flex items-center gap-4">
<span className="text-headline-md font-headline-md text-on-surface font-semibold tracking-tight">Recovery Command</span>
</div>
<div className="flex items-center gap-6 text-on-surface-variant dark:text-on-surface-variant">
<button className="hover:text-secondary dark:hover:text-secondary hover:opacity-80 transition-opacity">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="hover:text-secondary dark:hover:text-secondary hover:opacity-80 transition-opacity">
<span className="material-symbols-outlined">history_edu</span>
</button>
<button className="hover:text-secondary dark:hover:text-secondary hover:opacity-80 transition-opacity">
<span className="material-symbols-outlined">account_circle</span>
</button>
</div>
</header>
{/* Canvas */}
<div className="p-margin-mobile md:p-margin-desktop flex-1 flex flex-col gap-[64px] md:gap-[128px] pb-32 md:pb-margin-desktop max-w-container-max mx-auto w-full">
{/* Hero Stat */}
<section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center rounded-xl overflow-hidden group">
{/* STITCH_SHADER_START:ANIMATION_15 className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen pointer-events-none" */}
<div className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen pointer-events-none" style={{display: 'block'}}>
<canvas id="shader-canvas-ANIMATION_15" style={{display: 'block', width: '100%', height: '100%'}}></canvas>

</div>
{/* STITCH_SHADER_END:ANIMATION_15 */}
<div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030303] pointer-events-none"></div>
<div className="glass-panel relative z-10 p-8 md:p-12 rounded-2xl flex flex-col items-center text-center max-w-2xl w-full mx-4 border-t border-[#ffffff33] shadow-[0_0_40px_rgba(77,142,255,0.1)] group-hover:shadow-[0_0_60px_rgba(139,92,246,0.15)] transition-shadow duration-500">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container/20 border border-error/30 mb-6">
<span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
<span className="font-label-mono text-label-mono text-error uppercase tracking-wider text-[10px]">Active Anomaly</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface-variant mb-2">Total Revenue Leakage Detected</h2>
<div className="font-stat-lg text-[48px] md:text-[72px] text-tertiary-container tracking-tighter leading-none mb-6 drop-shadow-[0_0_15px_rgba(77,142,255,0.3)]">
                        ₹4,82,000
                    </div>
<p className="font-label-mono text-label-mono text-on-surface-variant opacity-70">
                        Across 4 major lifecycle stages in the last 24h
                    </p>
</div>
</section>
{/* Ranked Cards Bento */}
<section className="w-full">
<div className="flex items-center gap-3 mb-8">
<span className="material-symbols-outlined text-primary">troubleshoot</span>
<h3 className="font-headline-md text-[20px] text-on-surface">Top Anomalies Ranked</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
{/* Card 1: Critical (Spans 8 cols on desktop) */}
<div className="glass-panel md:col-span-8 rounded-xl p-6 border-l-4 border-l-error relative overflow-hidden group hover:bg-[#ffffff12] transition-colors duration-300">
<div className="absolute -right-20 -top-20 w-64 h-64 bg-error/5 rounded-full blur-3xl group-hover:bg-error/10 transition-colors"></div>
<div className="flex flex-col h-full justify-between relative z-10">
<div className="flex justify-between items-start mb-6">
<div>
<div className="flex items-center gap-2 mb-2">
<span className="px-2 py-0.5 rounded text-[10px] font-label-mono bg-surface-variant text-on-surface-variant">Isolation Forest</span>
<span className="px-2 py-0.5 rounded text-[10px] font-label-mono bg-error/20 text-error">Critical</span>
</div>
<h4 className="font-headline-md text-[22px] text-on-surface">Bank Server Timeout Spike</h4>
</div>
<span className="material-symbols-outlined text-error text-[32px]">warning</span>
</div>
<div className="mb-6">
<div className="flex justify-between font-label-mono text-label-mono text-on-surface-variant mb-2">
<span>Impact Estimate</span>
<span className="text-error font-bold">₹2,15,000</span>
</div>
<div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
<div className="h-full bg-error w-[85%] relative">
<div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 animate-pulse"></div>
</div>
</div>
</div>
<div className="h-16 w-full border-t border-[#ffffff1a] pt-4 mt-auto">

</div>
</div>
</div>
{/* Card 2: High (Spans 4 cols) */}
<div className="glass-panel md:col-span-4 rounded-xl p-6 border-l-4 border-l-secondary flex flex-col hover:bg-[#ffffff12] transition-colors duration-300">
<div className="flex justify-between items-start mb-4">
<span className="px-2 py-0.5 rounded text-[10px] font-label-mono bg-secondary/20 text-secondary">High</span>
<span className="material-symbols-outlined text-secondary">credit_card_off</span>
</div>
<h4 className="font-body-lg text-body-lg text-on-surface font-semibold mb-2">Gateway Retry Failures</h4>
<div className="mt-auto">
<div className="font-stat-lg text-[24px] text-secondary mb-1">₹1,10,000</div>
<div className="font-label-mono text-[11px] text-on-surface-variant">Model: DBSCAN Clustering</div>
</div>
</div>
{/* Card 3: Medium (Spans 6 cols) */}
<div className="glass-panel md:col-span-6 rounded-xl p-6 border-l-4 border-l-secondary-container flex items-center justify-between hover:bg-[#ffffff12] transition-colors duration-300">
<div>
<span className="px-2 py-0.5 rounded text-[10px] font-label-mono bg-secondary-container/20 text-secondary-container mb-3 inline-block">Elevated</span>
<h4 className="font-body-md text-on-surface font-semibold">Promotion Code Abuse</h4>
<div className="font-label-mono text-[11px] text-on-surface-variant mt-1">Rule Engine Triggered</div>
</div>
<div className="text-right">
<div className="font-stat-lg text-[20px] text-secondary-container">₹85,000</div>
<span className="material-symbols-outlined text-secondary-container/50 text-[32px] mt-2">loyalty</span>
</div>
</div>
{/* Card 4: Medium (Spans 6 cols) */}
<div className="glass-panel md:col-span-6 rounded-xl p-6 border-l-4 border-l-secondary-container flex items-center justify-between hover:bg-[#ffffff12] transition-colors duration-300">
<div>
<span className="px-2 py-0.5 rounded text-[10px] font-label-mono bg-secondary-container/20 text-secondary-container mb-3 inline-block">Elevated</span>
<h4 className="font-body-md text-on-surface font-semibold">Settlement Reconciliation Gap</h4>
<div className="font-label-mono text-[11px] text-on-surface-variant mt-1">Ledger Matching Model</div>
</div>
<div className="text-right">
<div className="font-stat-lg text-[20px] text-secondary-container">₹72,000</div>
<span className="material-symbols-outlined text-secondary-container/50 text-[32px] mt-2">account_balance</span>
</div>
</div>
</div>
</section>
{/* Lifecycle Funnel */}
<section className="w-full relative py-8">
<h3 className="font-headline-md text-[20px] text-on-surface mb-12 text-center md:text-left">Lifecycle Drop-off Analysis</h3>
<div className="relative flex flex-col md:flex-row justify-between items-center md:items-stretch gap-8 md:gap-4 z-10">
{/* Desktop Connecting Line */}
<div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-surface-variant via-primary/30 to-surface-variant -translate-y-1/2 z-0">
<div className="w-full h-full relative">
<div className="absolute top-[-2px] w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#d0bcff] animate-[moveDot_4s_linear_infinite]"></div>
</div>
</div>
{/* Mobile Connecting Line */}
<div className="md:hidden absolute left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-surface-variant via-primary/30 to-surface-variant -translate-x-1/2 z-0"></div>
{/* Step 1 */}
<div className="relative z-10 flex flex-col items-center glass-panel p-6 rounded-xl w-64 border-t-2 border-t-outline-variant hover:-translate-y-2 transition-transform duration-300 bg-[#141313]/80">
<div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 border border-[#ffffff1a]">
<span className="material-symbols-outlined text-on-surface-variant">shopping_cart</span>
</div>
<h5 className="font-body-md text-on-surface mb-1">Checkout</h5>
<span className="font-stat-lg text-[18px] text-error font-bold">₹1,20,000</span>
</div>
{/* Step 2 */}
<div className="relative z-10 flex flex-col items-center glass-panel p-6 rounded-xl w-64 border-t-2 border-t-secondary hover:-translate-y-2 transition-transform duration-300 bg-[#141313]/80">
<div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 border border-secondary/30">
<span className="material-symbols-outlined text-secondary">security</span>
</div>
<h5 className="font-body-md text-on-surface mb-1">Risk &amp; Fraud</h5>
<span className="font-stat-lg text-[18px] text-secondary font-bold">₹2,15,000</span>
</div>
{/* Step 3 */}
<div className="relative z-10 flex flex-col items-center glass-panel p-6 rounded-xl w-64 border-t-2 border-t-primary hover:-translate-y-2 transition-transform duration-300 bg-[#141313]/80 shadow-[0_0_30px_rgba(208,188,255,0.05)]">
<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/30 shadow-[0_0_15px_rgba(208,188,255,0.2)]">
<span className="material-symbols-outlined text-primary">restore_page</span>
</div>
<h5 className="font-body-md text-on-surface mb-1">Recovery</h5>
<span className="font-stat-lg text-[18px] text-primary font-bold">₹75,000</span>
</div>
{/* Step 4 */}
<div className="relative z-10 flex flex-col items-center glass-panel p-6 rounded-xl w-64 border-t-2 border-t-outline-variant hover:-translate-y-2 transition-transform duration-300 bg-[#141313]/80">
<div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 border border-[#ffffff1a]">
<span className="material-symbols-outlined text-on-surface-variant">assured_workload</span>
</div>
<h5 className="font-body-md text-on-surface mb-1">Settlement</h5>
<span className="font-stat-lg text-[18px] text-on-surface-variant font-bold">₹72,000</span>
</div>
</div>
</section>
</div>
</main>

    </div>
  );
}
