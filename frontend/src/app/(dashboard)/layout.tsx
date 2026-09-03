/**
 * FILE: layout.tsx
 * PURPOSE: Dashboard layout wrapper — provides Sidebar, TopBar, and animated background.
 * USED BY: All (dashboard) pages automatically via Next.js routing.
 * USES: Sidebar.tsx, TopBar.tsx, SidebarContext.tsx, ProtectedRoute.tsx
 */

import React from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { SidebarProvider } from '@/contexts/SidebarContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="antialiased h-screen flex flex-col font-body-md overflow-hidden bg-background text-on-background relative">

          {/* Background Ambient Glows — creates glassmorphism depth */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] animate-pulse mix-blend-screen"></div>
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[120px] animate-pulse mix-blend-screen" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/15 rounded-full blur-[150px] mix-blend-screen"></div>
          </div>

          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area — offset for desktop sidebar */}
          <div className="flex-1 md:ml-60 flex flex-col h-screen overflow-hidden relative z-10">
            {/* Unified TopBar */}
            <TopBar />

            {/* Page Content — scrollable */}
            <div className="flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
