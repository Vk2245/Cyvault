
import React from 'react';

export default function Connect() {
  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden bg-[#030303] text-white">
      
{/* Suppressed Shell: Linear/Transactional Onboarding flow */}
<main className="flex-grow flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop w-full relative z-10">
{/* Logo Area */}
<div className="mb-12 flex flex-col items-center">
<img alt="Cyvault Logo" className="w-16 h-16 rounded-md mb-4 shadow-[0_0_20px_rgba(139,92,246,0.5)]" src="https://lh3.googleusercontent.com/aida/AEtjO1Un1QDHbEBzjOttc9_T2zAHSTWwCwR894yEckeqBe3Uqxmn1Gg628wv4i6A1VSRVCD8faSGqTqFQCuMSnsZFQaRflxhKeJgJcz2SLjtRW1ism5xY2RqH_4afU3CxvtcTAakPAsZc3o06SOXP3VGmwk6vEi3cCNHHnQN5amGJXTeu8vcSgrWRtdmsF7f6wVPv27SqbSvR-s0ujqr65LGPxV2UZ0YEh0ECOgctZrvJ1NAl8PxRZDsfmK9WtY"/>
<h1 className="font-headline-md text-headline-md font-bold text-primary tracking-wide">Cyvault</h1>
</div>
{/* Progress Stepper */}
<div className="w-full max-w-[640px] flex items-center justify-center mb-8 gap-4 font-label-mono text-label-mono">
<div className="flex items-center gap-2 text-primary font-bold">
<div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div>
<span>1. Connect</span>
</div>
<div className="w-8 h-[1px] bg-outline-variant"></div>
<div className="flex items-center gap-2 text-on-surface-variant">
<div className="w-2 h-2 rounded-full bg-surface-variant"></div>
<span>2. Policies</span>
</div>
<div className="w-8 h-[1px] bg-outline-variant"></div>
<div className="flex items-center gap-2 text-on-surface-variant">
<div className="w-2 h-2 rounded-full bg-surface-variant"></div>
<span>3. Done</span>
</div>
</div>
{/* Glassmorphism Card */}
<div className="glass-card w-full max-w-[640px] rounded-xl p-6 md:p-10 relative group">
{/* Hover Glow Effect */}
<div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl -z-10 rounded-xl pointer-events-none"></div>
{/* Header */}
<div className="flex items-center gap-3 mb-2">
<span className="material-symbols-outlined text-primary font-variation-settings: 'FILL' 1;">vpn_key</span>
<h2 className="font-headline-md text-headline-md font-bold text-on-surface">Connect Your Razorpay Account</h2>
</div>
<p className="text-on-surface-variant font-body-md mb-8">We only need test-mode keys. No real money will be involved.</p>
{/* Form Area */}
<form className="flex flex-col gap-6" onSubmit="event.preventDefault(); document.getElementById('status-indicator').classList.remove('hidden');">
{/* Field 1 */}
<div className="flex flex-col gap-2">
<label className="font-label-mono text-label-mono text-on-surface-variant" htmlFor="apiKey">Razorpay API Key</label>
<input className="glass-input w-full rounded-md px-4 py-3 font-label-mono text-label-mono text-on-surface placeholder:text-outline focus:ring-0" id="apiKey" placeholder="rzp_test_XXXXXXXXX" required="" type="text"/>
</div>
{/* Field 2 */}
<div className="flex flex-col gap-2 relative">
<label className="font-label-mono text-label-mono text-on-surface-variant" htmlFor="apiSecret">Razorpay API Secret</label>
<div className="relative">
<input className="glass-input w-full rounded-md px-4 py-3 font-label-mono text-label-mono text-on-surface placeholder:text-outline focus:ring-0 pr-10" id="apiSecret" placeholder="XXXXXXXX" required="" type="password"/>
<button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors" onClick="const input = document.getElementById('apiSecret'); input.type = input.type === 'password' ? 'text' : 'password';" type="button">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</div>
{/* Field 3 */}
<div className="flex flex-col gap-2">
<label className="font-label-mono text-label-mono text-on-surface-variant" htmlFor="webhookSecret">Webhook Secret</label>
<input className="glass-input w-full rounded-md px-4 py-3 font-label-mono text-label-mono text-on-surface placeholder:text-outline focus:ring-0" id="webhookSecret" placeholder="whsec_XXXXXXXX" required="" type="text"/>
</div>
{/* Webhook Info Box */}
<div className="glass-info rounded-lg p-5 mt-2 flex flex-col gap-4">
<p className="font-body-md text-on-surface text-sm">After connecting, add this webhook URL to your Razorpay Dashboard:</p>
<div className="bg-[#030303] rounded border border-outline-variant p-3 flex justify-between items-center group">
<code className="font-label-mono text-label-mono text-tertiary-fixed-dim truncate">https://cyvault-api.onrender.com/webhook/your_id</code>
<button className="text-outline-variant hover:text-primary transition-colors flex-shrink-0 ml-2 group-hover:opacity-100 opacity-70" title="Copy" type="button">
<span className="material-symbols-outlined text-[18px]">content_copy</span>
</button>
</div>
<div>
<p className="font-label-mono text-[12px] text-on-surface-variant mb-2">Required Events:</p>
<div className="flex flex-wrap gap-2">
<span className="px-2 py-1 bg-surface-container rounded text-[11px] font-label-mono text-on-surface border border-outline-variant">payment.failed</span>
<span className="px-2 py-1 bg-surface-container rounded text-[11px] font-label-mono text-on-surface border border-outline-variant">payment.captured</span>
<span className="px-2 py-1 bg-surface-container rounded text-[11px] font-label-mono text-on-surface border border-outline-variant">settlement.processed</span>
</div>
</div>
</div>
{/* Animated Connection Line Visualization (Conceptual) */}
<div className="w-full py-2">
<div className="animated-line rounded-full opacity-50"></div>
</div>
{/* Actions */}
<div className="flex flex-col items-center gap-6 mt-4">
<button className="w-full md:w-auto px-8 py-4 bg-gold text-[#030303] rounded font-label-mono text-label-mono font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 min-h-[48px]" type="submit">
                        Connect &amp; Verify
                    </button>
<a className="font-body-md text-sm text-outline hover:text-primary transition-colors flex items-center gap-1 group" href="/feed">
                        Don't have Razorpay keys? Get them here
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
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
