import React from 'react';
import { Menu, Link as LinkIcon, PlayCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden bg-[#030303] text-white">
      
{/* TopNavBar */}
<nav className="fixed top-0 w-full z-50 bg-[#ffffff08] backdrop-blur-xl border-b border-[#ffffff1a] transition-all duration-300">
<div className="flex justify-between items-center px-gutter py-2 max-w-container-max mx-auto">
<div className="flex items-center gap-3 group">
<img alt="Cyvault Logo" className="w-8 h-8 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] object-contain" src="/cyvault-logo-no-caption.png"/>
<span className="font-[family-name:var(--font-orbitron)] text-[18px] font-bold text-primary drop-shadow-[0_0_8px_rgba(208,188,255,0.8)] tracking-wide">CYVAULT</span>
</div>
<div className="hidden md:flex items-center gap-6">
<a className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-[14px] font-body-md" href="/recovery">Dashboard</a>
<a className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-[14px] font-body-md" href="/radar">Leakage Radar</a>
<a className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-[14px] font-body-md" href="/graph">Entity Graph</a>
<a className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-[14px] font-body-md" href="/chatbot">Insights Bot</a>
</div>
<div className="hidden md:flex items-center gap-4">
<a href="/login">
  <button className="bg-white text-black px-4 py-1.5 rounded-full text-[14px] font-body-md font-medium hover:bg-white/90 transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                  Log In
  </button>
</a>
<a href="/connect">
  <button className="bg-white text-black px-4 py-1.5 rounded-full text-[14px] font-body-md font-medium hover:bg-white/90 transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                  Get Started
  </button>
</a>
</div>
{/* Mobile Menu Toggle */}
<button className="md:hidden text-on-surface p-2">
<Menu size={24} />
</button>
</div>
</nav>
<main className="flex-grow pt-16 flex flex-col">
{/* Hero Section */}
<section className="relative flex-grow flex items-center justify-center py-8 px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-[#ffffff1a]">
<div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
<div className="flex justify-center mb-2">
<img alt="Cyvault Logo" className="w-32 md:w-48 h-auto object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.3)] animate-fade-in-up" src="/cyvault-logo-with-name.png"/>
</div>
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-fade-in-up">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span className="font-medium text-primary tracking-wider text-xs uppercase">Cyvault Security Intelligence</span>
</div>
<h1 className="font-headline-lg text-[40px] md:text-[56px] text-on-surface max-w-4xl mx-auto leading-tight tracking-tight">
                    Secure Every Transaction.<br className="hidden md:block"/> <span className="bg-gradient-to-r from-primary via-[#a78bfa] to-secondary bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">With Zero Blind Spots.</span>
</h1>
<p className="font-body-lg text-[16px] md:text-[18px] text-on-surface-variant max-w-2xl mx-auto">
                    The missing vault that connects all your payment gateways — real-time anomaly detection, ledger reconciliation, and automated fraud prevention.
                </p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
<button className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-full font-body-md font-medium hover:bg-white/90 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-sm">
<LinkIcon size={16} />
                        Connect Razorpay
                    </button>
<button className="w-full sm:w-auto px-8 py-3 rounded-full font-body-md font-medium text-white bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group">
<PlayCircle size={16} className="group-hover:text-white transition-colors" />
                        Watch Demo
                    </button>
</div>
{/* Stats Row */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 mt-4 border-t border-[#ffffff1a]/50">
<div className="flex flex-col items-center gap-2">
<span className="font-stat-lg text-stat-lg text-secondary">₹1.2Cr+</span>
<span className="font-label-mono text-label-mono text-on-surface/50 uppercase tracking-widest text-xs">Recovered</span>
</div>
<div className="flex flex-col items-center gap-2">
<span className="font-stat-lg text-stat-lg text-primary">0</span>
<span className="font-label-mono text-label-mono text-on-surface/50 uppercase tracking-widest text-xs">Policy Violations</span>
</div>
<div className="flex flex-col items-center gap-2">
<span className="font-stat-lg text-stat-lg text-on-surface">100%</span>
<span className="font-label-mono text-label-mono text-on-surface/50 uppercase tracking-widest text-xs">Actions Explained</span>
</div>
</div>
</div>
</section>
</main>
{/* Footer */}
<footer className="w-full py-4 bg-background border-t border-[#ffffff1a]">
<div className="flex items-center justify-center gap-2 px-gutter max-w-container-max mx-auto opacity-80">
<img alt="Cyvault Logo" className="w-5 h-5 object-contain" src="/cyvault-logo-no-caption.png"/>
<span className="font-[family-name:var(--font-orbitron)] text-[14px] font-bold text-on-surface tracking-widest">CYVAULT</span>
<span className="font-body-md text-[12px] text-on-surface-variant ml-2">
                    © 2026. All rights reserved.
                </span>
</div>
</footer>

    </div>
  );
}
