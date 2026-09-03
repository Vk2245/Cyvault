'use client';

/**
 * FILE: TopBar.tsx
 * PURPOSE: Unified top navigation bar for ALL dashboard pages. Single source of truth.
 * USED BY: (dashboard)/layout.tsx
 * USES: SidebarContext.tsx (hamburger toggle), AuthContext.tsx (user email), lucide-react icons
 */

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Search, Bell, LogOut } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import { useAuth } from '@/contexts/AuthContext';

// ──────────────────────────────────────────────
// PAGE TITLE MAP — Maps route paths to display titles
// ──────────────────────────────────────────────
const PAGE_TITLES: Record<string, string> = {
  '/recovery': 'Recovery Command',
  '/alerts': 'Live AI Alerts',
  '/graph': 'Entity Graph',
  '/users': 'Customer Profiles',
  '/policies': 'Policy Engine',
  '/feed': 'Action Feed',
  '/radar': 'Leakage Radar',
  '/reconciliation': 'Reconciliation',
  '/chatbot': 'Insights Bot',
  '/simulator': 'Simulator',
  '/settings': 'Settings',
};

// ──────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────
export default function TopBar() {
  const pathname = usePathname();
  const { toggle } = useSidebar();
  const { user, logout } = useAuth();

  // Get the page title from the current route
  const pageTitle = PAGE_TITLES[pathname] || 'Dashboard';

  // Get user initials for avatar
  const userEmail = user?.email || 'user@demo.com';
  const userInitial = userEmail.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 backdrop-blur-2xl bg-black/40 flex justify-between items-center h-14 px-4 md:px-6 shrink-0">
      {/* Left Section: Hamburger + Page Title */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger — only visible on small screens */}
        <button
          onClick={toggle}
          className="md:hidden p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-white/5 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Page Title with gradient */}
        <h2
          className="text-lg font-bold bg-clip-text text-transparent drop-shadow-md"
          style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), #a78bfa, var(--color-secondary))' }}
        >
          {pageTitle}
        </h2>
      </div>

      {/* Right Section: Search + Bell + User Avatar */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-white/5 transition-colors">
          <Search size={18} />
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-white/5 transition-colors relative">
          <Bell size={18} />
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block"></div>

        {/* User email — hidden on very small screens */}
        <span className="text-xs text-on-surface-variant font-mono hidden sm:block max-w-[140px] truncate">
          {userEmail}
        </span>

        {/* User Avatar */}
        <button className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary hover:bg-primary/30 transition-colors">
          {userInitial}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-2 rounded-lg text-on-surface-variant hover:text-red-400 hover:bg-red-500/10 transition-colors"
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
