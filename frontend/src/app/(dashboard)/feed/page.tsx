"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Bot, ShieldAlert, ArrowUpRight, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Feed() {
  const { merchantId } = useAuth();
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      if (!merchantId) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/merchants/${merchantId}/alerts`);
        if (res.ok) {
          const data = await res.json();
          setFeedItems(data);
        }
      } catch (e) {
        console.error("Error fetching feed:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
    
    // Poll every 3 seconds for live updates
    const interval = setInterval(fetchFeed, 3000);
    return () => clearInterval(interval);
  }, [merchantId]);

  // Get icon and color based on action type
  const getActionStyle = (actionType: string, decision: string) => {
    if (decision === 'BLOCKED') return { icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', strip: 'bg-red-500' };
    if (actionType === 'offer_discount') return { icon: Bot, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', strip: 'bg-emerald-500' };
    if (actionType === 'settlement_processed') return { icon: ArrowUpRight, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', strip: 'bg-blue-500' };
    return { icon: Bot, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', strip: 'bg-primary' };
  };

  return (
    <main className="flex-1 flex flex-col h-full relative w-full text-white">
      <div className="flex-1 w-full max-w-container-max mx-auto p-4 md:p-6 flex flex-col gap-6 animate-fade-in-up">
        {loading && feedItems.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-on-surface-variant">Loading action feed...</div>
        ) : feedItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center p-12 max-w-lg glass-panel rounded-2xl w-full"
            >
              <div className="relative w-24 h-24 mb-6">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-primary/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-on-surface">Action Feed Empty</h3>
              <p className="text-on-surface-variant">No automated actions have been taken by Cyvault AI yet. Try running a scenario in the Simulator to generate some actions.</p>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-on-surface-variant text-sm font-mono">Live Feed — {feedItems.length} actions recorded</span>
            </div>
            
            {/* Timeline */}
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10"></div>
              
              {feedItems.map((item, index) => {
                const style = getActionStyle(item.action_type, item.decision);
                const Icon = style.icon;
                
                return (
                  <div key={item.id} className="relative pl-14 pb-6 group">
                    {/* Timeline dot */}
                    <div className={`absolute left-3 top-2 w-5 h-5 rounded-full ${style.bg} ${style.border} border flex items-center justify-center z-10`}>
                      <div className={`w-2 h-2 rounded-full ${style.strip}`}></div>
                    </div>
                    
                    {/* Card */}
                    <div className="glass-panel glass-panel-hover rounded-xl p-5 relative overflow-hidden">
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.strip}`}></div>
                      
                      <div className="flex justify-between items-start mb-2 pl-2">
                        <div className="flex items-center gap-2">
                          <Icon size={16} className={style.color} />
                          <span className="font-semibold text-on-surface text-sm">Cyvault AI</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-mono uppercase ${item.decision === 'ALLOWED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                            {item.decision}
                          </span>
                        </div>
                        <span className="font-label-mono text-xs text-on-surface-variant flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(item.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <p className="text-on-surface-variant text-sm pl-2 leading-relaxed">{item.narrative}</p>
                      
                      <div className="flex gap-2 text-xs font-mono pl-2 mt-3">
                        <span className="px-2 py-1 bg-white/5 rounded-md text-white/60">{item.action_type.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
