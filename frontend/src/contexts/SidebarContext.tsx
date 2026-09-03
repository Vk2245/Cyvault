'use client';

/**
 * FILE: SidebarContext.tsx
 * PURPOSE: Manages sidebar open/close state for mobile overlay and collapse toggle.
 * USED BY: layout.tsx (wraps the dashboard), Sidebar.tsx (reads state), TopBar.tsx (hamburger toggle)
 * USES: React context API
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

// ──────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────
interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

// ──────────────────────────────────────────────
// CONTEXT
// ──────────────────────────────────────────────
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// ──────────────────────────────────────────────
// PROVIDER
// ──────────────────────────────────────────────
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
}

// ──────────────────────────────────────────────
// HOOK
// ──────────────────────────────────────────────
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
