import React from 'react';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      {/* 
        Overhauled Layout:
        - Replaced flat bg-[#030303] with a dynamic background
        - Added animated glowing orbs (purple & blue) for glassmorphism base
      */}
      <div className="antialiased h-screen flex flex-col font-body-md overflow-hidden bg-background text-on-background relative">
        
        {/* Background Ambient Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Top Left Primary Glow */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          {/* Bottom Right Secondary Glow */}
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          {/* Center Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-primary/10 rounded-full blur-[120px]"></div>
        </div>

        <Sidebar />
        <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden relative z-10">
          <div style={{ zoom: 0.9 }} className="flex-1 flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
