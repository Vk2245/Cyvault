"use client";
import React, { useState, useEffect } from 'react';
import { Search, Filter, User, Smartphone, AlertTriangle, Router, X, BrainCircuit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Graph() {
  const { merchantId } = useAuth();
  const [data, setData] = useState<any>({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  useEffect(() => {
    const fetchGraph = async () => {
      if (!merchantId) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/merchants/${merchantId}/graph`);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        }
      } catch (error) {
        console.error("Error fetching graph:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGraph();
    
    const interval = setInterval(fetchGraph, 5000);
    return () => clearInterval(interval);
  }, [merchantId]);

  const hasData = data && data.nodes && data.nodes.length > 0;

  // Simple layout logic for demo: Customer nodes orbit around a central device node
  const deviceNode = data.nodes.find((n: any) => n.type === 'device');
  const customerNodes = data.nodes.filter((n: any) => n.type === 'customer');

  return (
    <main className="flex-1 flex flex-col h-full relative w-full overflow-hidden bg-[#030303]">
      <header className="glass-panel h-16 flex items-center justify-between px-gutter border-b border-[#ffffff1a] shrink-0 z-10 bg-[#ffffff05] backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <span className="font-headline-md text-headline-md text-primary font-bold flex items-center gap-2">
            <BrainCircuit size={24} />
            Cyvault Entity Graph
          </span>
        </div>
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative group">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
            <input className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-[0_0_10px_rgba(139,92,246,0)] focus:shadow-[0_0_10px_rgba(139,92,246,0.2)]" placeholder="Search Node ID, IP, or Customer..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <Filter size={24} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high border border-[#ffffff1a] hover:opacity-80 transition-opacity ml-2">
            <User size={16} className="text-on-surface-variant" />
          </button>
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        {loading ? (
          <div className="text-on-surface-variant animate-pulse">Initializing neural graph...</div>
        ) : !hasData ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center p-12 max-w-lg glass-panel rounded-2xl"
          >
            <div className="relative w-24 h-24 mb-6">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <BrainCircuit size={48} className="text-primary/50" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-on-surface">Entity Graph Empty</h3>
            <p className="text-on-surface-variant">The graph will dynamically populate as our AI agents process transactions and detect relationships. Run the Simulator to see it in action.</p>
          </motion.div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            
            <div className="relative w-96 h-96">
              
              {/* Edges */}
              {deviceNode && customerNodes.map((node: any, index: number) => {
                const angle = (index / customerNodes.length) * 2 * Math.PI;
                const radius = 140;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.svg key={`edge-${index}`} className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{zIndex: 0}}>
                    <motion.path 
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      d={`M 192 192 L ${192 + x} ${192 + y}`} 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeDasharray="6,6" 
                      strokeWidth="2"
                    />
                    {/* Glowing pulse trail on edge */}
                    <motion.circle
                      r="4"
                      fill="#ef4444"
                      initial={{ offsetDistance: "0%" }}
                      animate={{ offsetDistance: "100%" }}
                      style={{ offsetPath: `path('M 192 192 L ${192 + x} ${192 + y}')` }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="shadow-[0_0_10px_#ef4444]"
                    />
                  </motion.svg>
                );
              })}

              {/* Center Device Node */}
              {deviceNode && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  onClick={() => setSelectedNode(deviceNode)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-surface-container rounded-full border-2 border-red-500/50 flex flex-col items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(239,68,68,0.3)] z-10"
                >
                  <Router size={24} className="text-red-400 mb-1" />
                  <span className="text-[10px] font-label-mono text-red-300">Device</span>
                  
                  {/* Warning Ripple */}
                  <motion.div
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-red-500"
                  />
                </motion.div>
              )}

              {/* Orbiting Customer Nodes */}
              {customerNodes.map((node: any, index: number) => {
                const angle = (index / customerNodes.length) * 2 * Math.PI;
                const radius = 140;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={node.id}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{ x, y, opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.5 + (index * 0.2) }}
                    onClick={() => setSelectedNode(node)}
                    className="absolute top-1/2 left-1/2 -ml-8 -mt-8 w-16 h-16 bg-surface-container-high rounded-full border-2 border-red-400/40 flex flex-col items-center justify-center cursor-pointer hover:bg-surface hover:border-red-400 transition-colors z-20 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                  >
                    <User size={20} className="text-on-surface mb-1" />
                    <span className="text-[9px] font-label-mono text-on-surface-variant max-w-full truncate px-1">{node.label}</span>
                  </motion.div>
                );
              })}

            </div>

            {/* High Risk Cluster Label */}
            {customerNodes.length > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute top-8 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full flex items-center gap-2 backdrop-blur-md"
              >
                <AlertTriangle size={16} className="text-red-500" />
                <span className="text-red-100 font-label-mono text-sm">High Risk Fraud Ring Detected</span>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Right Sidebar: Node Details */}
      <AnimatePresence>
        {selectedNode && (
          <motion.aside 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 bottom-0 w-80 glass-panel border-l border-white/10 flex flex-col z-20"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="font-headline-md text-lg text-on-surface flex items-center gap-2">
                <BrainCircuit size={18} className="text-primary" /> Node Details
              </h2>
              <button onClick={() => setSelectedNode(null)} className="text-on-surface-variant hover:text-primary transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedNode.type === 'device' ? 'bg-red-500/10 border-red-500/50' : 'bg-white/5 border-white/20'}`}>
                  {selectedNode.type === 'device' ? <Router size={24} className="text-red-400" /> : <User size={24} className="text-on-surface" />}
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-lg truncate max-w-[180px]" title={selectedNode.label}>{selectedNode.label}</h3>
                  <p className="text-on-surface-variant font-label-mono text-xs uppercase tracking-wider mt-1">{selectedNode.type}</p>
                  
                  {customerNodes.length > 1 && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/20 border border-red-500/30 rounded text-red-200 text-xs font-label-mono shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                      <AlertTriangle size={14} />
                      RISK SCORE: 0.95
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-container border border-white/10">
                  <h4 className="text-xs font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">Connections</h4>
                  <ul className="space-y-3">
                    {selectedNode.type === 'customer' && deviceNode && (
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                          <Router size={14} className="text-red-400" />
                        </div>
                        <div className="flex-1 truncate">
                          <p className="text-sm text-on-surface font-label-mono truncate" title={deviceNode.label}>{deviceNode.label}</p>
                          <p className="text-[10px] text-on-surface-variant uppercase mt-0.5">Shared Device</p>
                        </div>
                      </li>
                    )}
                    {selectedNode.type === 'device' && customerNodes.map((n: any) => (
                      <li key={n.id} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <User size={14} className="text-on-surface-variant" />
                        </div>
                        <div className="flex-1 truncate">
                          <p className="text-sm text-on-surface font-label-mono truncate">{n.label}</p>
                          <p className="text-[10px] text-on-surface-variant uppercase mt-0.5">Linked Account</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="w-full py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-label-mono text-xs hover:bg-red-500/20 transition-colors uppercase tracking-wider flex items-center justify-center gap-2">
                  <AlertTriangle size={14} />
                  Block Cluster
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}
