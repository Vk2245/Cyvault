"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, User, Smartphone, AlertTriangle, Router, X, BrainCircuit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Graph() {
  const { merchantId } = useAuth();
  const [data, setData] = useState<any>({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [showOnlyHighRisk, setShowOnlyHighRisk] = useState(false);
  const [blockedClusters, setBlockedClusters] = useState<string[]>([]);

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

  const deviceNodes = data.nodes.filter((n: any) => n.type === 'device');
  const customerNodes = data.nodes.filter((n: any) => n.type === 'customer');

  // Identify high risk clusters (devices with >1 customer)
  const highRiskDevices = deviceNodes.filter((d: any) => {
    const connectedCustomers = data.edges.filter((e: any) => e.target === d.id).length;
    return connectedCustomers > 1;
  });

  let displayDeviceNodes = deviceNodes.filter((d: any) => !blockedClusters.includes(d.id));
  if (showOnlyHighRisk) {
    displayDeviceNodes = displayDeviceNodes.filter((d: any) => highRiskDevices.find((h: any) => h.id === d.id));
  }

  const handleBlockCluster = async () => {
    if (selectedNode) {
      const deviceId = selectedNode.type === 'device' 
        ? selectedNode.id 
        : data.edges.find((e: any) => e.source === selectedNode.id)?.target;
        
      if (deviceId) {
        setBlockedClusters(prev => [...prev, deviceId]);
        setSelectedNode(null);
        
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/merchants/${merchantId}/customers/block`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_fingerprint: deviceId })
          });
        } catch (e) {
          console.error("Failed to block cluster", e);
        }
      }
    }
  };

  return (
    <main className="flex-1 flex flex-col h-full relative w-full overflow-hidden text-white">
      <div className="flex-1 relative overflow-hidden flex items-center justify-center animate-fade-in-up">
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
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
            
            <motion.div 
              drag
              dragConstraints={{ left: -1500, right: 1500, top: -1500, bottom: 1500 }}
              dragElastic={0.1}
              className="absolute flex items-center justify-center"
              style={{ width: 4000, height: 4000 }}
            >
              {/* Background Grid */}
              <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
              
              <div className="relative w-96 h-96">
              
              {/* We render each device cluster at a calculated position */}
              {displayDeviceNodes.map((deviceNode: any, clusterIndex: number) => {
                // Distribute device nodes in a circle if there are multiple
                const clusterAngle = displayDeviceNodes.length > 1 ? (clusterIndex / displayDeviceNodes.length) * 2 * Math.PI : 0;
                const clusterRadius = displayDeviceNodes.length > 1 ? 250 : 0; // offset from center
                const clusterCenterX = displayDeviceNodes.length > 1 ? Math.cos(clusterAngle) * clusterRadius : 0;
                const clusterCenterY = displayDeviceNodes.length > 1 ? Math.sin(clusterAngle) * clusterRadius : 0;
                
                // Get customers connected to this device
                const connectedEdges = data.edges.filter((e: any) => e.target === deviceNode.id);
                const connectedCustomerIds = connectedEdges.map((e: any) => e.source);
                const linkedCustomers = customerNodes.filter((c: any) => connectedCustomerIds.includes(c.id));
                const isHighRisk = linkedCustomers.length > 1;

                return (
                  <motion.div 
                    key={deviceNode.id} 
                    drag 
                    dragMomentum={false}
                    initial={{ x: clusterCenterX, y: clusterCenterY }}
                    className="absolute inset-0 pointer-events-none" 
                  >
                    
                    {/* Edges for this cluster */}
                    {linkedCustomers.map((node: any, index: number) => {
                      const angle = (index / linkedCustomers.length) * 2 * Math.PI;
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
                            stroke={isHighRisk ? "#ef4444" : "#3b82f6"} 
                            strokeDasharray="6,6" 
                            strokeWidth="2"
                          />
                          <motion.circle
                            r="4"
                            fill={isHighRisk ? "#ef4444" : "#3b82f6"}
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            style={{ offsetPath: `path('M 192 192 L ${192 + x} ${192 + y}')` }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className={isHighRisk ? "shadow-[0_0_10px_#ef4444]" : "shadow-[0_0_10px_#3b82f6]"}
                          />
                        </motion.svg>
                      );
                    })}

                    {/* Center Device Node */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      onClick={() => setSelectedNode(deviceNode)}
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 flex flex-col items-center justify-center cursor-pointer pointer-events-auto z-10 ${isHighRisk ? 'bg-surface-container border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'bg-surface-container border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]'}`}
                    >
                      <Router size={24} className={isHighRisk ? "text-red-400 mb-1" : "text-blue-400 mb-1"} />
                      <span className={`text-[10px] font-label-mono ${isHighRisk ? "text-red-300" : "text-blue-300"}`}>Device</span>
                      
                      {isHighRisk && (
                        <motion.div
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full border-2 border-red-500"
                        />
                      )}
                    </motion.div>

                    {/* Orbiting Customer Nodes */}
                    {linkedCustomers.map((node: any, index: number) => {
                      const angle = (index / linkedCustomers.length) * 2 * Math.PI;
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
                          className={`absolute top-1/2 left-1/2 -ml-8 -mt-8 w-16 h-16 bg-surface-container-high rounded-full border-2 flex flex-col items-center justify-center cursor-pointer pointer-events-auto hover:bg-surface transition-colors z-20 ${isHighRisk ? 'border-red-400/40 hover:border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-blue-400/40 hover:border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]'}`}
                        >
                          <User size={20} className="text-on-surface mb-1" />
                          <span className="text-[9px] font-label-mono text-on-surface-variant max-w-full truncate px-1">{node.label}</span>
                        </motion.div>
                      );
                    })}

                  </motion.div>
                );
              })}

              </div>
            </motion.div>

            {/* Controls panel */}
            <div className="absolute top-8 left-8 z-30 flex flex-col gap-3">
              <button 
                onClick={() => setShowOnlyHighRisk(!showOnlyHighRisk)}
                className={`px-4 py-2 rounded-full border text-sm font-label-mono flex items-center gap-2 transition-colors ${showOnlyHighRisk ? 'bg-red-500/20 border-red-500/40 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-surface-container border-white/10 text-on-surface-variant hover:text-white'}`}
              >
                <Filter size={16} /> 
                {showOnlyHighRisk ? 'Showing High Risk Only' : 'Filter High Risk Only'}
              </button>
            </div>

            {/* High Risk Cluster Label */}
            {highRiskDevices.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute top-8 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full flex items-center gap-2 backdrop-blur-md"
              >
                <AlertTriangle size={16} className="text-red-500" />
                <span className="text-red-100 font-label-mono text-sm">{highRiskDevices.length} Fraud Ring{highRiskDevices.length > 1 ? 's' : ''} Detected</span>
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
                    {selectedNode.type === 'customer' && (
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                          <Router size={14} className="text-blue-400" />
                        </div>
                        <div className="flex-1 truncate">
                          <p className="text-sm text-on-surface font-label-mono truncate">
                            {data.nodes.find((n: any) => n.id === data.edges.find((e: any) => e.source === selectedNode.id)?.target)?.label || 'Unknown'}
                          </p>
                          <p className="text-[10px] text-on-surface-variant uppercase mt-0.5">Linked Device</p>
                        </div>
                      </li>
                    )}
                    {selectedNode.type === 'device' && data.edges.filter((e: any) => e.target === selectedNode.id).map((e: any) => {
                      const linkedCust = data.nodes.find((n: any) => n.id === e.source);
                      return linkedCust ? (
                        <li key={linkedCust.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            <User size={14} className="text-on-surface-variant" />
                          </div>
                          <div className="flex-1 truncate">
                            <p className="text-sm text-on-surface font-label-mono truncate">{linkedCust.label}</p>
                            <p className="text-[10px] text-on-surface-variant uppercase mt-0.5">Linked Account</p>
                          </div>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
                
                <button 
                  onClick={handleBlockCluster}
                  className="w-full py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-label-mono text-xs hover:bg-red-500/20 transition-colors uppercase tracking-wider flex items-center justify-center gap-2"
                >
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
