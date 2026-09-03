'use client';

import React, { useState } from 'react';
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#ffffff08] dark:bg-[#00000008] backdrop-blur-xl border-b border-[#ffffff1a] dark:border-[#ffffff1a] transition-all duration-300">
      <div className="flex justify-between items-center px-gutter py-2 max-w-container-max mx-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <img alt="Cyvault Logo" className="w-8 h-8 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] object-contain" src="/cyvault-logo-no-caption.png"/>
          <span className="font-[family-name:var(--font-orbitron)] text-[18px] font-bold text-primary drop-shadow-[0_0_8px_rgba(208,188,255,0.8)] tracking-wide">CYVAULT</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-[14px] font-body-md" href="/recovery">Dashboard</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-[14px] font-body-md" href="/radar">Leakage Radar</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-[14px] font-body-md" href="/graph">Entity Graph</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-[14px] font-body-md" href="/chatbot">Insights Bot</Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {!isAuthenticated ? (
            <>
              <Link href="/login">
                <button className="bg-white text-black px-4 py-1.5 rounded-full text-[14px] font-body-md font-medium hover:bg-white/90 transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                  Log In
                </button>
              </Link>
              <Link href="/connect">
                <button className="bg-primary text-white px-4 py-1.5 rounded-full text-[14px] font-body-md font-medium hover:bg-primary/90 transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <Link href="/recovery">
              <button className="bg-primary text-white px-4 py-1.5 rounded-full text-[14px] font-body-md font-medium hover:bg-primary/90 transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                Go to Dashboard
              </button>
            </Link>
          )}
        </div>
        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-on-surface p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full right-4 mt-2 w-56 bg-[#0a0a0a] border border-[#ffffff1a] rounded-2xl py-4 px-5 flex flex-col items-end gap-4 shadow-2xl">
          <Link className="text-white font-medium hover:text-primary transition-colors duration-300 text-[15px] font-body-md text-right w-full" href="/recovery" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          <Link className="text-white font-medium hover:text-primary transition-colors duration-300 text-[15px] font-body-md text-right w-full" href="/radar" onClick={() => setIsMenuOpen(false)}>Leakage Radar</Link>
          <Link className="text-white font-medium hover:text-primary transition-colors duration-300 text-[15px] font-body-md text-right w-full" href="/graph" onClick={() => setIsMenuOpen(false)}>Entity Graph</Link>
          <Link className="text-white font-medium hover:text-primary transition-colors duration-300 text-[15px] font-body-md text-right w-full" href="/chatbot" onClick={() => setIsMenuOpen(false)}>Insights Bot</Link>
          
          <div className="h-[1px] w-full bg-[#ffffff1a] my-1"></div>
          
          <div className="flex flex-col items-end gap-3 w-full">
            <ThemeToggle />
            {!isAuthenticated ? (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <button className="w-full bg-[#ffffff1a] text-white px-4 py-2 rounded-lg text-[14px] font-body-md font-medium text-right flex justify-end">
                    Log In
                  </button>
                </Link>
                <Link href="/connect" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <button className="w-full bg-primary text-white px-4 py-2 rounded-lg text-[14px] font-body-md font-medium text-right flex justify-end">
                    Get Started
                  </button>
                </Link>
              </>
            ) : (
              <Link href="/recovery" onClick={() => setIsMenuOpen(false)} className="w-full">
                <button className="w-full bg-primary text-white px-4 py-2 rounded-lg text-[14px] font-body-md font-medium text-right flex justify-end">
                  Go to Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
