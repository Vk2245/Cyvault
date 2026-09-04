"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <main className="flex-1 flex flex-col h-full relative w-full text-white">
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full p-4 md:p-6 animate-fade-in-up">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6 shrink-0">
          <p className="text-on-surface-variant max-w-2xl mb-2">Real-time ledger matching and anomaly detection across all payment gateways.</p>
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
         <div className="flex-1 overflow-hidden glass-panel rounded-2xl flex flex-col">
            <div className="p-6 border-b border-[#ffffff1a] flex justify-between items-center bg-[#ffffff05]">
              <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Recent Settlements</h3>
              <button className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-semibold hover:bg-primary/30 transition-colors">Export CSV</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#ffffff1a] bg-[#ffffff02] sticky top-0 z-10 backdrop-blur-md">
                    <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">Settlement ID</th>
                    <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider text-right">Amount</th>
                    <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider text-right">Fees/Tax</th>
                    <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">UTR</th>
                    <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">Date</th>
                    <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-sm divide-y divide-[#ffffff0a]">
                  {data.map((row: any) => (
                    <tr key={row.id} className="hover:bg-[#ffffff08] transition-colors group">
                      <td className="py-4 px-6 font-label-mono text-primary/80">{row.id}</td>
                      <td className="py-4 px-6 text-right font-label-mono">₹{(row.amount_paise / 100).toLocaleString()}</td>
                      <td className="py-4 px-6 text-right font-label-mono text-on-surface-variant">₹{((row.fees_paise + row.tax_paise) / 100).toLocaleString()}</td>
                      <td className="py-4 px-6 font-label-mono text-xs text-on-surface-variant">{row.utr}</td>
                      <td className="py-4 px-6 text-on-surface-variant">{new Date(row.created_at).toLocaleDateString()}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-label-mono text-[10px] uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         </div>
      )}
      </div>
    </main>
  );
}

