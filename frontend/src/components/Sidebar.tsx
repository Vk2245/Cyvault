'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  TriangleAlert, 
  Network, 
  Store,
  Users,
  Gavel, 
  Receipt, 
  Radar, 
  ArrowLeftRight, 
  Bot, 
  Shield, 
  Settings,
  PlayCircle
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', path: '/recovery', icon: LayoutDashboard },
    { name: 'Alerts', path: '/alerts', icon: TriangleAlert },
    { name: 'Entity Graph', path: '/graph', icon: Network },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Policies', path: '/policies', icon: Gavel },
    { name: 'Action Feed', path: '/feed', icon: Receipt },
    { name: 'Leakage Radar', path: '/radar', icon: Radar },
    { name: 'Reconciliation', path: '/reconciliation', icon: ArrowLeftRight },
    { name: 'Insights Bot', path: '/chatbot', icon: Bot },
    { name: 'Test Demo Mode', path: '/simulator', icon: PlayCircle },
  ];

  // Get active page name for the logo subtitle
  const activeLink = links.find(l => l.path !== '#' && l.path === pathname) || { name: 'Settings' };
  
  // Settings is separate at the bottom in the design
  const isSettingsActive = pathname === '/settings';

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/10 bg-background/80 dark:bg-background/80 backdrop-blur-xl flex flex-col z-40 hidden md:flex">
      {/* Header */}
      <Link href="/" className="px-6 h-16 border-b border-white/5 flex items-center gap-4 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
          <img src="/cyvault_transparent.png" alt="Cyvault Logo" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]" />
        </div>
        <div>
          <h1 
            className="font-headline-md text-headline-md font-bold tracking-tight leading-none bg-clip-text text-transparent drop-shadow-md"
            style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), #a78bfa, var(--color-secondary))' }}
          >
            Cyvault
          </h1>
          <p className="text-[12px] font-label-mono text-on-surface-variant mt-1 uppercase tracking-wider">
            {activeLink.name}
          </p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-2 overflow-y-auto pt-6 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {links.map((link) => {
          const isActive = pathname === link.path;
          const Icon = link.icon;
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
              <Icon size={20} className={isActive ? "fill-primary/20 text-primary" : ""} />
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
          <Settings size={20} className={isSettingsActive ? "fill-primary/20 text-primary" : ""} />
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
