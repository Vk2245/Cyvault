'use client';

/**
 * FILE: Sidebar.tsx
 * PURPOSE: Dashboard sidebar navigation with mobile overlay, user profile, and glassmorphism.
 * USED BY: (dashboard)/layout.tsx
 * USES: SidebarContext.tsx (open/close state), AuthContext.tsx (user info), lucide-react icons
 */

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/contexts/SidebarContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  TriangleAlert,
  Network,
  Users,
  Gavel,
  Receipt,
  Radar,
  ArrowLeftRight,
  Bot,
  PlayCircle,
  Settings,
  LogOut,
  X,
} from 'lucide-react';

// ──────────────────────────────────────────────
// NAVIGATION LINKS — Single source of truth
// ──────────────────────────────────────────────
const NAV_LINKS = [
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

// ──────────────────────────────────────────────
// SIDEBAR CONTENT — Shared between desktop and mobile
// ──────────────────────────────────────────────
function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isSettingsActive = pathname === '/settings';

  // Get user email and initials for the profile section
  const userEmail = user?.email || 'user@demo.com';
  const userInitial = userEmail.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col h-full">
      {/* Logo Header */}
      <Link
        href="/"
        className="px-5 h-14 border-b border-white/5 flex items-center gap-3 hover:opacity-80 transition-opacity shrink-0"
        onClick={onNavigate}
      >
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
          <img
            src="/cyvault_transparent.png"
            alt="Cyvault Logo"
            className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]"
          />
        </div>
        <h1
          className="text-xl font-bold tracking-tight leading-none bg-clip-text text-transparent drop-shadow-md"
          style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), #a78bfa, var(--color-secondary))' }}
        >
          Cyvault
        </h1>
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col pt-4 pb-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex flex-col gap-0.5 px-3">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? 'text-primary bg-primary/10 border border-primary/20 shadow-[0_0_12px_rgba(139,92,246,0.15)]'
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full shadow-[0_0_8px_rgba(139,92,246,0.6)]"></div>
                )}
                <Icon size={18} className={isActive ? 'text-primary' : 'group-hover:text-primary/70 transition-colors'} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Settings Link — pinned to bottom of nav */}
        <div className="px-3 mt-2">
          <Link
            href="/settings"
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
              isSettingsActive
                ? 'text-primary bg-primary/10 border border-primary/20'
                : 'text-on-surface-variant hover:bg-white/5 hover:text-white border border-transparent'
            }`}
          >
            <Settings size={18} className={isSettingsActive ? 'text-primary' : 'group-hover:text-primary/70 transition-colors'} />
            <span>Settings</span>
          </Link>
        </div>
      </nav>

      {/* User Profile Section — always at bottom */}
      <div className="border-t border-white/5 p-3 shrink-0">
        <div className="flex items-center gap-3 px-2 py-2">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary shrink-0">
            {userInitial}
          </div>
          {/* User info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">{userEmail}</p>
            <p className="text-[10px] text-on-surface-variant font-mono">Merchant</p>
          </div>
          {/* Logout */}
          <button
            onClick={logout}
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
            title="Logout"
          >
            <LogOut size={14} />
          </button>
        </div>

        {/* System Status */}
        <div className="flex items-center gap-2 px-2 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]"></div>
          <span className="text-[10px] font-mono text-on-surface-variant">System Active</span>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// MAIN SIDEBAR EXPORT
// ──────────────────────────────────────────────
export default function Sidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Desktop Sidebar — always visible on md+ */}
      <aside className="fixed left-0 top-0 h-full w-60 bg-black/60 backdrop-blur-2xl border-r border-white/5 z-40 hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
          onClick={close}
        ></div>
      )}

      {/* Mobile Sidebar — slides in from left */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-2xl border-r border-white/5 z-50 flex flex-col md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>
        <SidebarContent onNavigate={close} />
      </aside>
    </>
  );
}
