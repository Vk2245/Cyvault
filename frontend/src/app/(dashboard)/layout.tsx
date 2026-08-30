import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden bg-[#030303] text-white">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
