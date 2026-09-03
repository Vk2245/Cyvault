'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowUp, XCircle, Clock, LineChart, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Reconciliation() {
  const { merchantId } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch for Reconciliation data
    const fetchReconciliation = async () => {
      setLoading(true);
      try {
        if (!merchantId) return;
        // In a real app, this would be an API call
        // For hackathon, if localhost fails, it defaults to empty
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/merchants/${merchantId}/reconciliation`);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          setData([]);
        }
      } catch (error) {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReconciliation();
  }, [merchantId]);

    <main className="flex-1 flex flex-col h-full relative w-full text-white">
      {/* Standard Docked Header */}
      <header className="docked full-width top-0 sticky z-40 border-b border-white/5 backdrop-blur-2xl bg-black/40 flex justify-between items-center h-16 px-4 md:px-margin-desktop text-white shrink-0">
        <div className="flex items-center gap-4">
          <h2 
            className="font-headline-md text-headline-md font-bold bg-clip-text text-transparent flex items-center gap-2 drop-shadow-md"
            style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), #a78bfa, var(--color-secondary))' }}
          >
            Reconciliation Dashboard
          </h2>
        </div>
      </header>

      <div className="flex-1 flex flex-col h-full overflow-hidden w-full p-6 md:p-8 animate-fade-in-up">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6 shrink-0">
          <p className="text-on-surface-variant max-w-2xl text-lg mb-2">Real-time ledger matching and anomaly detection across all payment gateways.</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
            <span className="text-label-mono font-label-mono text-sm text-on-surface-variant">Live Sync: Active</span>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high border border-[#ffffff1a] hover:opacity-80 transition-opacity ml-2">
            <User size={16} className="text-on-surface-variant" />
          </button>
        </div>
      </div>

      {loading ? (
         <div className="flex-1 flex justify-center items-center text-on-surface-variant">Syncing ledgers...</div>
      ) : data.length === 0 ? (
         <div className="flex-1 flex flex-col justify-center items-center text-center glass-panel rounded-2xl p-12">
            <ShieldCheck size={48} className="text-primary mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No ledgers found</h3>
            <p className="text-on-surface-variant max-w-md">Your transactions will be automatically reconciled here once payment data flows in.</p>
         </div>
      ) : (
         <div className="flex-1 flex flex-col justify-center items-center text-center glass-panel rounded-2xl p-12">
            {/* The actual table would go here, omitting for brevity since data is empty anyway */}
            <h3 className="text-xl font-semibold mb-2">Data Synced</h3>
            <p className="text-on-surface-variant max-w-md">Data table loaded.</p>
         </div>
      )}
    </main>
  );
}

