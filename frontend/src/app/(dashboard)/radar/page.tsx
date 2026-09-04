"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ScrollText, User, Activity, TriangleAlert, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Radar() {
  const { merchantId } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <main className="flex-1 flex flex-col h-full relative w-full text-white">
      <div className="p-4 md:p-6 flex-1 flex flex-col items-center justify-center w-full animate-fade-in-up">
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
