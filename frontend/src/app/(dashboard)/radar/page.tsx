"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ScrollText, User, Activity, TriangleAlert, ShieldCheck, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Radar() {
  const { merchantId } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchRadarData = async () => {
    if (!merchantId) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/merchants/${merchantId}/radar`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRadarData();
    const interval = setInterval(fetchRadarData, 5000);
    return () => clearInterval(interval);
  }, [merchantId]);

  return (
    <main className="flex-1 flex flex-col h-full relative w-full text-white overflow-y-auto">
      <div className="flex-1 w-full max-w-container-max mx-auto h-full flex flex-col p-4 md:p-6 animate-fade-in-up">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-1 flex items-center gap-2">
              <Activity className="text-primary" />
              Leakage Radar
            </h2>
            <p className="text-on-surface-variant max-w-2xl text-sm">Real-time monitoring of revenue leakage, payment failures, and high-value anomalies.</p>
          </div>
          <button onClick={fetchRadarData} className="p-2 bg-surface-container-high hover:bg-surface border border-white/10 rounded-lg transition-colors text-on-surface-variant hover:text-on-surface">
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {loading && !data ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-on-surface-variant animate-pulse flex items-center gap-2">
              <Activity className="animate-spin" /> Scanning for anomalies...
            </div>
          </div>
        ) : !data ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center glass-panel rounded-2xl p-12">
            <ShieldCheck size={48} className="text-primary mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No Anomalies Detected</h3>
            <p className="text-on-surface-variant max-w-md">Your payment flows are currently healthy. The Leakage Radar will automatically alert you if any anomalies or fraud rings are detected.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full pb-8">
            
            {/* Main Chart Area */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-error">
                  <p className="text-on-surface-variant text-xs uppercase tracking-wider font-semibold mb-1">Total Leakage (Today)</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-on-surface">₹{data.total_leakage > 0 ? data.total_leakage.toLocaleString() : "0"}</h3>
                    {data.total_leakage > 0 && <span className="flex items-center text-error text-xs bg-error/10 px-1.5 py-0.5 rounded"><ArrowUpRight size={12}/> +12%</span>}
                  </div>
                </div>
                <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-success">
                  <p className="text-on-surface-variant text-xs uppercase tracking-wider font-semibold mb-1">Total Recovered</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-on-surface">₹{data.trend[data.trend.length-1].recovered.toLocaleString()}</h3>
                  </div>
                </div>
              </div>

              {/* Trend Chart (Custom CSS Bar Chart) */}
              <div className="glass-panel p-6 rounded-2xl flex-1 flex flex-col min-h-[300px]">
                <h3 className="font-semibold text-on-surface mb-6 flex items-center gap-2"><TrendingUp size={18} className="text-primary"/> 7-Day Revenue Trend</h3>
                
                <div className="flex-1 flex items-end justify-between gap-2 pt-10 pb-4 px-2 border-b border-white/10 relative">
                  {/* Y-Axis lines */}
                  <div className="absolute inset-x-0 bottom-1/2 border-b border-white/5 border-dashed"></div>
                  <div className="absolute inset-x-0 top-10 border-b border-white/5 border-dashed"></div>
                  
                  {data.trend.map((point: any, idx: number) => {
                    // Find max to scale bars
                    const maxVal = Math.max(...data.trend.map((p: any) => p.at_risk));
                    const scale = maxVal > 0 ? 200 / maxVal : 1; // 200px max height approx
                    
                    const riskHeight = Math.max(point.at_risk * scale, 4);
                    const recoveredHeight = Math.max(point.recovered * scale, 4);
                    
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2 group relative z-10 w-full">
                        {/* Tooltip */}
                        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-container border border-white/10 rounded p-2 text-[10px] whitespace-nowrap z-20 shadow-xl pointer-events-none">
                          <div className="text-error mb-0.5">At Risk: ₹{point.at_risk.toLocaleString()}</div>
                          <div className="text-success">Recovered: ₹{point.recovered.toLocaleString()}</div>
                        </div>

                        <div className="flex items-end gap-1 w-full justify-center h-[200px]">
                          <motion.div 
                            initial={{ height: 0 }} animate={{ height: riskHeight }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="w-1/3 max-w-[24px] bg-error/80 rounded-t-sm"
                          ></motion.div>
                          <motion.div 
                            initial={{ height: 0 }} animate={{ height: recoveredHeight }} transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                            className="w-1/3 max-w-[24px] bg-success/80 rounded-t-sm"
                          ></motion.div>
                        </div>
                        <span className="text-xs text-on-surface-variant font-label-mono">{point.day}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-error/80 rounded-sm"></div><span className="text-xs text-on-surface-variant">At Risk</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-success/80 rounded-sm"></div><span className="text-xs text-on-surface-variant">Recovered</span></div>
                </div>
              </div>

            </div>

            {/* Right Sidebar: Anomalies */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-on-surface flex items-center gap-2"><TriangleAlert size={18} className="text-warning"/> Live Anomalies</h3>
                <span className="bg-warning/20 text-warning text-xs font-label-mono px-2 py-0.5 rounded">{data.anomalies.length} Events</span>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {data.anomalies.length === 0 ? (
                  <div className="text-center py-10 text-on-surface-variant text-sm">
                    <ShieldCheck size={32} className="mx-auto mb-2 opacity-50" />
                    No anomalies detected today.
                  </div>
                ) : (
                  data.anomalies.map((anom: any, idx: number) => (
                    <motion.div 
                      key={anom.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 bg-surface-container-high border border-white/5 rounded-xl hover:border-warning/30 transition-colors group cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-warning font-semibold">₹{anom.amount.toLocaleString()}</span>
                        <span className="text-[10px] text-on-surface-variant font-label-mono">{anom.time}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mb-1">Customer: <span className="text-on-surface font-label-mono">{anom.customer_id}</span></p>
                      <p className="text-xs text-on-surface-variant">Order: <span className="font-label-mono">{anom.id}</span></p>
                      
                      <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-[10px] py-1.5 rounded transition-colors">Investigate</button>
                        <button className="flex-1 bg-primary/20 hover:bg-primary/30 text-primary text-[10px] py-1.5 rounded transition-colors">Apply Policy</button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
