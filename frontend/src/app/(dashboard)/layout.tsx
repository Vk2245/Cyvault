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
      <div className="antialiased h-screen flex flex-col font-body-md overflow-hidden bg-[#030303] text-white">
        <Sidebar />
        <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
          <div style={{ zoom: 0.9 }} className="flex-1 flex flex-col h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
