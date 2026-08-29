
import React from 'react';

export default function LandingPage() {
  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden bg-[#030303] text-white">
      
{/* TopNavBar */}
<nav className="fixed top-0 w-full z-50 bg-[#ffffff08] backdrop-blur-xl border-b border-[#ffffff1a] transition-all duration-300">
<div className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
<div className="flex items-center gap-4 group">
<img alt="Cyvault Logo" className="w-8 h-8 rounded-md group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(139,92,246,0.5)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSfYHMRYx_L_7A4iXS7T-x_B7n5O_Xu65sSioXJniUz9EfBEAKNcNKWkS-mItATrZOAGz2UmAG-6Cc9c-dSWXZYPQU34uDLlSmFWzS0qjH3oPXWVRmbViM0IZu8wY9W2VJmTuWiNYoLE8fpyZTQgtBwSpuiSzRWuC79xvc2r0MTc_SmTqgm3Iu7sgN9s-ef8q-VHdoz4cwDsf0jsApR81YmL9bRQm5hekL0RiVu_aDc-z1KqCUILpY"/>
<span className="font-headline-md text-headline-md font-bold text-primary drop-shadow-[0_0_8px_rgba(208,188,255,0.8)] tracking-tight">CYVAULT</span>
</div>
<div className="hidden md:flex items-center gap-8">
<a className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-body-md font-body-md" href="#">Features</a>
<a className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-body-md font-body-md" href="#">How It Works</a>
<a className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-body-md font-body-md" href="#">Pricing</a>
<a className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-body-md font-body-md" href="#">Docs</a>
</div>
<button className="hidden md:flex bg-primary text-on-primary px-6 py-2 rounded-DEFAULT font-label-mono text-label-mono hover:bg-primary-fixed-dim transition-colors duration-300 active:scale-95 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                Get Started
            </button>
{/* Mobile Menu Toggle */}
<button className="md:hidden text-on-surface p-2">
<span className="material-symbols-outlined">menu</span>
</button>
</div>
</nav>
<main className="flex-grow pt-24">
{/* Hero Section */}
<section className="relative min-h-[90vh] flex items-center justify-center pt-16 pb-32 px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-[#ffffff1a]">
{/* WebGL Background */}
<div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
{/* STITCH_SHADER_START:ANIMATION_2 className="absolute inset-0 w-full h-full" */}
<div className="absolute inset-0 w-full h-full" style={{display: 'block'}}>
<canvas id="shader-canvas-ANIMATION_2" style={{display: 'block', width: '100%', height: '100%'}}></canvas>

</div>
{/* STITCH_SHADER_END:ANIMATION_2 */}
</div>
<div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-primary/30 mb-4 animate-fade-in-up">
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
<span className="font-label-mono text-label-mono text-secondary tracking-wider text-xs">SYSTEM ONLINE</span>
</div>
<h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface max-w-3xl mx-auto leading-tight drop-shadow-2xl">
                    Your Agents Already Work.<br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">Now Make Them Work Together.</span>
</h1>
<p className="font-body-lg text-body-lg text-on-surface/60 max-w-2xl mx-auto">
                    The missing vault that connects Razorpay's payment agents — shared memory, governed actions, zero blind spots.
                </p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
<button className="w-full sm:w-auto bg-secondary text-on-secondary px-8 py-3 rounded-DEFAULT font-label-mono text-label-mono hover:bg-secondary-fixed-dim transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm">link</span>
                        Connect Razorpay
                    </button>
<button className="w-full sm:w-auto px-8 py-3 rounded-DEFAULT font-label-mono text-label-mono text-on-surface border border-[#ffffff33] hover:bg-[#ffffff1a] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group">
<span className="material-symbols-outlined text-sm group-hover:text-primary transition-colors">play_circle</span>
                        Watch Demo
                    </button>
</div>
{/* Stats Row */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 mt-8 border-t border-[#ffffff1a]/50">
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
<footer className="w-full py-12 bg-background border-t border-[#ffffff1a]">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-gutter max-w-container-max mx-auto">
<div className="flex flex-col gap-4">
<div className="flex items-center gap-3">
<span className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">CYVAULT</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                    © 2024 CYVAULT. Built for Razorpay Buildathon 2026.
                </p>
</div>
<div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
<a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md" href="#">Privacy Policy</a>
<a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md" href="#">Terms of Service</a>
<a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md" href="#">Security Audit</a>
<a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md" href="#">Contact</a>
</div>
</div>
</footer>

    </div>
  );
}
