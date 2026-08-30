'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', path: '/recovery', icon: 'dashboard' },
    { name: 'Leakage Radar', path: '/radar', icon: 'radar' },
    { name: 'Action Feed', path: '/feed', icon: 'receipt_long' },
    { name: 'Entity Graph', path: '/graph', icon: 'account_tree' },
    { name: 'Policies', path: '/policies', icon: 'gavel' },
    { name: 'Reconciliation', path: '/reconciliation', icon: 'compare_arrows' },
    { name: 'Insights Bot', path: '/chatbot', icon: 'smart_toy' },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/10 bg-background/80 dark:bg-background/80 backdrop-blur-xl flex flex-col py-4 z-40 hidden md:flex">
      {/* Header */}
      <div className="px-6 py-6 border-b border-white/10 mb-4 flex items-center gap-4">
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
            Agentic Vault
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
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
      </nav>

      {/* System Status CTA */}
      <div className="mt-auto px-4 pt-4 border-t border-white/10">
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-label-mono text-label-mono text-xs">System Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
