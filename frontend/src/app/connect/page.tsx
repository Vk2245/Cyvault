import React from 'react';
import { Key, Eye, Copy, ArrowRight } from 'lucide-react';

export default function Connect() {
  return (
    <div className="antialiased h-screen overflow-y-auto md:overflow-hidden flex flex-col font-body-md bg-[#030303] text-white">
      
<main className="flex-grow flex flex-col items-center justify-start md:justify-center pt-8 md:pt-0 pb-16 px-margin-mobile md:px-margin-desktop w-full relative z-10 transform scale-100 md:scale-[1.03] origin-top md:origin-center">
{/* Logo Area */}
<div className="mt-4 md:mt-12 mb-6 flex flex-col items-center">
<img alt="Cyvault Logo" className="w-14 h-14 mb-2 object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" src="/cyvault-logo-no-caption.png"/>
<h1 className="font-[family-name:var(--font-orbitron)] text-[16px] font-bold text-on-surface tracking-widest uppercase">CYVAULT</h1>
</div>
{/* Progress Stepper */}
<div className="w-full max-w-[460px] flex items-center justify-center mb-4 gap-3 font-body-md text-[10px]">
<div className="flex items-center gap-1.5 text-primary font-bold">
<div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div>
<span>1. Connect</span>
</div>
<div className="w-6 h-[1px] bg-outline-variant"></div>
<div className="flex items-center gap-1.5 text-on-surface-variant font-medium">
<div className="w-1.5 h-1.5 rounded-full bg-surface-variant"></div>
<span>2. Policies</span>
</div>
<div className="w-6 h-[1px] bg-outline-variant"></div>
<div className="flex items-center gap-1.5 text-on-surface-variant font-medium">
<div className="w-1.5 h-1.5 rounded-full bg-surface-variant"></div>
<span>3. Done</span>
</div>
</div>
{/* Glassmorphism Card */}
<div className="glass-card w-full max-w-[460px] rounded-xl p-4 md:p-5 relative group">
{/* Hover Glow Effect */}
<div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl -z-10 rounded-xl pointer-events-none"></div>
{/* Header */}
<div className="flex items-center gap-1.5 mb-1.5">
<Key size={14} className="text-primary" />
<h2 className="font-headline-md text-[14px] font-bold text-on-surface">Connect Your Razorpay Account</h2>
</div>
<p className="text-on-surface-variant text-[10px] font-body-md mb-4">We only need test-mode keys. No real money will be involved.</p>
{/* Form Area */}
<form className="flex flex-col gap-2.5">
{/* Field 1 */}
<div className="flex flex-col gap-1">
<label className="text-[9px] font-medium text-on-surface-variant uppercase tracking-wider pl-1" htmlFor="apiKey">Razorpay API Key</label>
<input className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg px-2.5 py-1.5 font-label-mono text-[9px] text-white placeholder-on-surface-variant outline-none transition-all duration-200" id="apiKey" placeholder="rzp_test_XXXXXXXXX" required type="text"/>
</div>
{/* Field 2 */}
<div className="flex flex-col gap-1 relative">
<label className="text-[9px] font-medium text-on-surface-variant uppercase tracking-wider pl-1" htmlFor="apiSecret">Razorpay API Secret</label>
<div className="relative">
<input className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg px-2.5 py-1.5 font-label-mono text-[9px] text-white placeholder-on-surface-variant outline-none transition-all duration-200 pr-8" id="apiSecret" placeholder="XXXXXXXX" required type="password"/>
<button className="absolute right-2 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors" type="button">
<Eye size={12} />
</button>
</div>
</div>
{/* Field 3 */}
<div className="flex flex-col gap-1">
<label className="text-[8px] font-medium text-on-surface-variant uppercase tracking-wider pl-1" htmlFor="webhookSecret">Webhook Secret</label>
<input className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg px-2.5 py-1.5 font-label-mono text-[8px] text-white placeholder-on-surface-variant outline-none transition-all duration-200" id="webhookSecret" placeholder="whsec_XXXXXXXX" required type="text"/>
</div>
{/* Webhook Info Box */}
<div className="glass-info rounded-lg p-2.5 mt-1 flex flex-col gap-2.5">
<p className="font-body-md text-on-surface text-[10px]">After connecting, add this webhook URL to your Razorpay Dashboard:</p>
<div className="bg-[#030303] rounded border border-outline-variant p-1.5 flex justify-between items-center group">
<code className="font-label-mono text-[9px] text-tertiary-fixed-dim truncate">https://cyvault-api.onrender.com/webhook/your_id</code>
<button className="text-outline-variant hover:text-primary transition-colors flex-shrink-0 ml-2 group-hover:opacity-100 opacity-70" title="Copy" type="button">
<Copy size={12} />
</button>
</div>
<div>
<p className="font-label-mono text-[9px] text-on-surface-variant mb-1">Required Events:</p>
<div className="flex flex-wrap gap-1">
<span className="px-1.5 py-0.5 bg-surface-container rounded text-[8px] font-label-mono text-on-surface border border-outline-variant">payment.failed</span>
<span className="px-1.5 py-0.5 bg-surface-container rounded text-[8px] font-label-mono text-on-surface border border-outline-variant">payment.captured</span>
<span className="px-1.5 py-0.5 bg-surface-container rounded text-[8px] font-label-mono text-on-surface border border-outline-variant">settlement.processed</span>
</div>
</div>
</div>
{/* Animated Connection Line Visualization (Conceptual) */}
<div className="w-full py-2">
<div className="animated-line rounded-full opacity-50"></div>
</div>
{/* Actions */}
<div className="flex flex-col items-center gap-2 mt-1">
<button className="w-full bg-white text-black px-4 py-1.5 rounded-lg text-[11px] font-bold hover:bg-white/90 transition-all duration-300 active:scale-[0.98] mt-1 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]" type="submit">
                        Connect &amp; Verify
                    </button>
<a className="font-body-md text-[10px] text-outline hover:text-primary transition-colors flex items-center gap-1 group" href="https://razorpay.com/docs/api/authentication/" target="_blank" rel="noopener noreferrer">
                        Don't have Razorpay keys? Get them here
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
</a>
</div>
</form>
{/* Status Indicator (Hidden by default) */}
<div className="hidden absolute top-4 right-4 flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant shadow-lg z-20" id="status-indicator">
<div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
<span className="font-label-mono text-[12px] text-on-surface">Checking...</span>
</div>
</div>
</main>
{/* Suppressed BottomNav: Linear/Transactional Onboarding flow */}

    </div>
  );
}
