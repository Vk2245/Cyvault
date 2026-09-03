'use client';
import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Calendar, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Feed() {
  const { merchantId } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  return (
    <main className="flex-1 flex flex-col h-full relative w-full bg-[#030303] text-white">
      <header className="h-16 border-b border-white/10 bg-[#ffffff08] backdrop-blur-xl flex items-center justify-between px-margin-desktop w-full shrink-0 z-30 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="font-headline-md font-bold">Action Feed</h2>
        </div>
        <div className="flex items-center gap-6">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high border border-[#ffffff1a] hover:opacity-80 transition-opacity ml-2">
            <User size={16} className="text-on-surface-variant" />
          </button>
        </div>
      </header>

      <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center w-full">
        {loading ? (
          <div className="text-on-surface-variant">Loading action feed...</div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center glass-panel rounded-2xl p-12 w-full max-w-2xl">
            <Activity size={48} className="text-primary mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Action Feed Empty</h3>
            <p className="text-on-surface-variant max-w-md">No automated actions have been taken by Cyvault AI yet. Try running a scenario in the Simulator to generate some actions.</p>
          </div>
        )}
      </div>
    </main>
  );
}
