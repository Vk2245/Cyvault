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
    <main className="flex-1 flex flex-col h-full relative w-full text-white">
      <div className="flex-1 p-4 md:p-6 flex flex-col items-center justify-center w-full animate-fade-in-up">
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
