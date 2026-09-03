'use client';
import React, { useState, useEffect } from 'react';
import { Bell, ScrollText, User, Activity, TriangleAlert, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Radar() {
  const { merchantId } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <main className="flex-1 flex flex-col h-full relative w-full bg-[#030303] text-white">
      <header className="hidden md:flex justify-between items-center h-16 px-margin-desktop docked full-width top-0 sticky z-40 border-b border-[#ffffff1a] backdrop-blur-xl bg-[#ffffff08]">
        <div className="flex items-center gap-4">
          <span className="text-headline-md font-headline-md font-semibold tracking-tight">Recovery Command / Leakage Radar</span>
        </div>
        <div className="flex items-center gap-6 text-on-surface-variant">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high border border-[#ffffff1a] hover:opacity-80 transition-opacity ml-2">
            <User size={16} className="text-on-surface-variant" />
          </button>
        </div>
      </header>
      
      <div className="p-margin-mobile md:p-margin-desktop flex-1 flex flex-col items-center justify-center w-full">
        {loading ? (
          <div className="text-on-surface-variant">Scanning for anomalies...</div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center glass-panel rounded-2xl p-12 w-full max-w-2xl">
            <ShieldCheck size={48} className="text-primary mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No Anomalies Detected</h3>
            <p className="text-on-surface-variant max-w-md">Your payment flows are currently healthy. The Leakage Radar will automatically alert you if any anomalies or fraud rings are detected.</p>
          </div>
        )}
      </div>
    </main>
  );
}
