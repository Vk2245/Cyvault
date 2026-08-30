'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', path: '/recovery', icon: 'dashboard' },
    { name: 'Alerts', path: '#', icon: 'warning' },
    { name: 'Entity Graph', path: '/graph', icon: 'account_tree' },
    { name: 'Merchants', path: '#', icon: 'storefront' },
    { name: 'Policies', path: '/policies', icon: 'gavel' },
    { name: 'Action Feed', path: '/feed', icon: 'receipt_long' },
    { name: 'Leakage Radar', path: '/radar', icon: 'radar' },
    { name: 'Reconciliation', path: '/reconciliation', icon: 'compare_arrows' },
    { name: 'Insights Bot', path: '/chatbot', icon: 'smart_toy' },
  ];

  // Get active page name for the logo subtitle
  const activeLink = links.find(l => l.path !== '#' && l.path === pathname) || { name: 'Settings' };
  
  // Settings is separate at the bottom in the design
  const isSettingsActive = pathname === '/settings';

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/10 bg-background/80 dark:bg-background/80 backdrop-blur-xl flex flex-col z-40 hidden md:flex">
      {/* Header */}
      <div className="px-6 py-8 border-b border-white/10 mb-6 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
          <span className="material-symbols-outlined text-background" style={{ fontVariationSettings: "'FILL' 1" }}>
            security
          </span>
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary tracking-tight leading-none">
            Cyvault
          </h1>
          <p className="text-[12px] font-label-mono text-on-surface-variant mt-1 uppercase tracking-wider">
            {activeLink.name}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-2 overflow-y-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.name}
              href={link.path}
              className={`flex items-center gap-3 px-6 py-3 font-medium transition-colors ${
                isActive
                  ? 'text-primary font-bold border-r-2 border-primary bg-white/5'
                  : 'text-on-surface-variant hover:bg-white/5'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {link.icon}
              </span>
              <span>{link.name}</span>
            </Link>
          );
        })}
        
        {/* Spacer to push Settings and Status to bottom */}
        <div className="flex-1"></div>

        {/* Settings Link */}
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-6 py-3 font-medium transition-colors ${
            isSettingsActive
              ? 'text-primary font-bold border-r-2 border-primary bg-white/5'
              : 'text-on-surface-variant hover:bg-white/5'
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={isSettingsActive ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            settings
          </span>
          <span>Settings</span>
        </Link>
      </nav>

      {/* System Status CTA */}
      <div className="p-6 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" style={{backgroundColor: '#22c55e'}}></div>
          <span className="font-label-mono text-label-mono text-xs">System Status: Active</span>
        </div>
      </div>
    </aside>
  );
}
