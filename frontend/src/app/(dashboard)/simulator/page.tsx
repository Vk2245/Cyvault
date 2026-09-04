"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { Bot, Send, User, TriangleAlert, CheckCircle2, XCircle, Router as RouterIcon, History, Trash2, Plus, MessageSquare, Smartphone, CreditCard, ShieldCheck } from 'lucide-react';
import styles from './simulator.module.css';

export default function SimulatorPage() {
  const { isAuthenticated, user, merchantId } = useAuth();
  const router = useRouter();

  const [activeScenario, setActiveScenario] = useState('none'); 
  const [paymentState, setPaymentState] = useState('idle'); 
  const [discount, setDiscount] = useState(0);
  const [fraudBlocked, setFraudBlocked] = useState(false);
  const [executingAction, setExecutingAction] = useState<string | null>(null);
  const [fraudAttempts, setFraudAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [testId, setTestId] = useState('');
  const [activeTab, setActiveTab] = useState('single');
  const [showCheckout, setShowCheckout] = useState(false);
  const [smsClicked, setSmsClicked] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [attackCount, setAttackCount] = useState(3);

  
  // Chat state
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([
    { role: 'agent', content: 'Hi! I am Cyvault Support. Your payment failed. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Action Feed state
  const [actionFeed, setActionFeed] = useState<any[]>([]);

  useEffect(() => {
    setTestId(`SIM_${Math.floor(Math.random() * 9000) + 1000}`);
  }, []);

  useEffect(() => {
    const authState = localStorage.getItem('cyvault_auth');
    if (!authState && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  
  // Fetch action feed periodically
  useEffect(() => {
    const fetchFeed = async () => {
      if (!merchantId) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/merchants/${merchantId}/alerts`);
        if (res.ok) {
          const data = await res.json();
          setActionFeed(data);
        }
      } catch(e) {}
    };
    fetchFeed();
    const interval = setInterval(fetchFeed, 2000);
    return () => clearInterval(interval);
  }, [merchantId]);

  useEffect(() => {
    if (chatMessages.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const triggerBackend = async (scenario: string) => {
    try {
      setLoading(true);
      const m_id = merchantId || "demo";
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario, merchant_id: m_id, customer_id: testId })
      });
      return await res.json();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateCartAbandonment = async () => {
    setActiveScenario('recovery');
    setPaymentState('processing');
    await new Promise(r => setTimeout(r, 500));
    // Skip 'failed' state, go straight to AI intercept
    setPaymentState('negotiating');
    const res = await triggerBackend('recovery_fail');
    setTimeout(() => {
      let finalDiscount = 5;
      if (res && res.discount_offered) {
         finalDiscount = res.discount_offered;
      }
      setDiscount(finalDiscount); 
    }, 1500);
  };

  const handleFraudAttack = async () => {
    setActiveScenario('fraud');
    setFraudBlocked(false);
    const nextAttempts = fraudAttempts + 1;
    setFraudAttempts(nextAttempts);
    
    if (nextAttempts >= 3) {
      await triggerBackend('fraud_attack');
      setTimeout(() => {
        setFraudBlocked(true); 
      }, 500);
    }
  };

  const handleSettlement = async () => {
    setActiveScenario('settlement');
    await triggerBackend('settlement');
    setTimeout(() => setActiveScenario('none'), 1000);
  };

  const handleRefund = async () => {
    setActiveScenario('refund');
    await triggerBackend('refund');
    setTimeout(() => setActiveScenario('none'), 1000);
  };
  
  const sendChatMessage = async () => {
    if(!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, {role: 'user', content: msg}]);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/customer/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, merchant_id: merchantId || "demo", customer_id: testId })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, {role: 'agent', content: data.reply}]);
    } catch (e) {
      setChatMessages(prev => [...prev, {role: 'agent', content: 'Connection error'}]);
    }
  };

  // --- Session Management ---
  const [sessions, setSessions] = useState<{id: string, date: string}[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const getStorageKey = () => `cyvault_demo_sessions_${merchantId || 'demo'}`;

  useEffect(() => {
    // Load sessions from local storage
    const saved = localStorage.getItem(getStorageKey());
    if (saved) {
      setSessions(JSON.parse(saved));
    }
  }, [merchantId]);

  const saveCurrentSession = (id: string) => {
    const saved = localStorage.getItem(getStorageKey());
    let parsed = saved ? JSON.parse(saved) : [];
    if (!parsed.find((s: any) => s.id === id)) {
      parsed.unshift({ id, date: new Date().toLocaleString() });
      localStorage.setItem(getStorageKey(), JSON.stringify(parsed));
      setSessions(parsed);
    }
  };

  const startNewSession = () => {
    if (testId) saveCurrentSession(testId);
    
    const newId = `SIM_${Math.floor(Math.random() * 9000) + 1000}`;
    setTestId(newId);
    setPaymentState('idle');
    setDiscount(0);
    setFraudBlocked(false);
    setFraudAttempts(0);
    setActiveScenario('none');
    setShowCheckout(false);
    setSmsClicked(false);
    setRetryCount(0);
    setChatMessages([{ role: 'agent', content: 'Hi! I am Cyvault Support. Your payment failed. How can I help you today?' }]);
    setShowHistory(false);
  };

  const loadSession = (id: string) => {
    setTestId(id);
    setPaymentState('idle');
    setDiscount(0);
    setFraudBlocked(false);
    setFraudAttempts(0);
    setActiveScenario('none');
    setShowCheckout(false);
    setSmsClicked(false);
    setRetryCount(0);
    setShowHistory(false);
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    localStorage.setItem(getStorageKey(), JSON.stringify(updated));
    setSessions(updated);
    if (testId === id) {
      startNewSession();
    }
  };

  const handleUnifiedAttack = async (type: string) => {
    setLoading(true);
    setExecutingAction(type);
    
    const targets = sessions.slice(0, attackCount);
    for (const session of targets) {
      const m_id = merchantId || "demo";
      try {
        if (type === 'fraud') {
          // Trigger 3 fraud attempts to reliably spawn graph nodes
          for(let i=0; i<3; i++) {
             await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/simulate`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ scenario: 'fraud_attack', merchant_id: m_id, customer_id: session.id })
             });
          }
        } else if (type === 'recovery') {
           await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/simulate`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ scenario: 'recovery_fail', merchant_id: m_id, customer_id: session.id })
           });
        }
      } catch(e) {
        console.error(e);
      }
    }
    setLoading(false);
    setExecutingAction(null);
    alert(`${type === 'fraud' ? 'Fraud Attack' : 'Mass Recovery'} triggered for ${targets.length} users! Check Dashboard / Radar.`);
  };

  // Make sure to save the very first session on mount if it's not saved yet
  useEffect(() => {
    if (testId && !sessions.find(s => s.id === testId)) {
      saveCurrentSession(testId);
    }
  }, [testId, sessions]);

  return (
    <div className={styles.appContainer}>
      {/* Left Side: Merchant Live Action Feed (Replaces Dashboard Iframe) */}
      <div className={`${styles.merchantSide} bg-[#0a0a0a]`}>
        <div className="h-full flex flex-col text-white p-8 overflow-y-auto">
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6 shrink-0">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/30">
              <TriangleAlert size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Merchant Live Feed</h1>
              <p className="text-white/60 text-sm">Real-time Cyvault AI Actions</p>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            {actionFeed.length === 0 ? (
              <div className="text-center text-white/40 mt-20 flex flex-col items-center gap-4">
                <Bot size={48} className="opacity-20" />
                <p>No actions yet.<br/>Interact with the store simulator on the right.</p>
              </div>
            ) : (
              actionFeed.map((alert: any) => (
                <div key={alert.id} className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:bg-white/10 transition-colors">
                  {/* Status strip */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${alert.decision === 'ALLOWED' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                  
                  <div className="flex justify-between items-start mb-2 pl-3">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Bot size={18} className={alert.decision === 'ALLOWED' ? 'text-emerald-400' : 'text-red-400'}/> 
                      Cyvault AI Action
                    </h3>
                    <span className="text-xs text-white/50">{new Date(alert.created_at).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-white/80 text-sm mb-4 pl-3 leading-relaxed">{alert.narrative}</p>
                  <div className="flex gap-2 text-xs font-mono pl-3">
                    <span className="px-2 py-1 bg-white/10 rounded-md uppercase tracking-wider text-white/70">Action: {alert.action_type.replace('_', ' ')}</span>
                    <span className={`px-2 py-1 rounded-md uppercase tracking-wider border ${alert.decision === 'ALLOWED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                      {alert.decision}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Side: Customer Simulator */}
      <div className={styles.customerSide}>
        {/* Cyvault Branding Header */}
        <div className={styles.simulatorBrandHeader} style={{ position: 'relative' }}>
          <img src="/cyvault_transparent.png" alt="Cyvault" className={styles.brandLogo} />
          <div className="flex-1">
            <h2 className={styles.brandTitle}>Storefront Simulator</h2>
            <span className={styles.brandBadge}>Customer ID: {testId}</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={startNewSession}
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center justify-center border border-primary/20 bg-primary/5"
              title="New Session"
            >
              <Plus size={16} />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowHistory(!showHistory)} 
                className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                title="Session History"
              >
                <History size={18} />
              </button>

              {/* History Dropdown */}
              <AnimatePresence>
                {showHistory && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-3 border-b border-white/10 flex justify-between items-center bg-black/40">
                      <h3 className="text-sm font-semibold text-white">Demo Sessions</h3>
                      <button onClick={startNewSession} className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded flex items-center gap-1 hover:bg-primary/30 transition-colors">
                        <Plus size={12} /> New
                      </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                      {sessions.length === 0 ? (
                        <p className="text-xs text-white/40 text-center py-4">No past sessions.</p>
                      ) : (
                        sessions.map(s => (
                          <div 
                            key={s.id} 
                            onClick={() => loadSession(s.id)}
                            className={`p-2 rounded-lg cursor-pointer flex justify-between items-center group transition-colors ${s.id === testId ? 'bg-white/10' : 'hover:bg-white/5'}`}
                          >
                            <div>
                              <p className="text-xs font-mono text-white/90">{s.id}</p>
                              <p className="text-[9px] text-white/40 mt-0.5">{s.date}</p>
                            </div>
                            <button 
                              onClick={(e) => deleteSession(s.id, e)}
                              className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className={styles.pulseDot}></div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 mx-6 mt-4 shrink-0">
          <button 
            className={`px-4 py-3 text-sm font-semibold transition-colors ${activeTab === 'single' ? 'text-primary border-b-2 border-primary' : 'text-white/50 hover:text-white'}`}
            onClick={() => setActiveTab('single')}
          >
            Single User Test
          </button>
          <button 
            className={`px-4 py-3 text-sm font-semibold transition-colors ${activeTab === 'multi' ? 'text-primary border-b-2 border-primary' : 'text-white/50 hover:text-white'}`}
            onClick={() => setActiveTab('multi')}
          >
            Multi-User Unified Testing
          </button>
        </div>

        {activeTab === 'single' ? (
          <div className={styles.demoControlsWrapper}>
          
          {/* SMS Simulation Visualizer */}
          <AnimatePresence>
            {paymentState === 'negotiating' && discount > 0 && !smsClicked && (
              <motion.div initial={{ opacity: 0, y: -20, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, height: 0, scale: 0.95 }} className="mx-6 mb-4">
                <div className="p-4 rounded-xl bg-[#0f172a] border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)] relative overflow-hidden">
                  {/* Glass reflection */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                  
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0">
                      <Smartphone size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        New SMS Received 
                        <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded uppercase tracking-wider font-mono border border-blue-500/30">Just Now</span>
                      </h4>
                      <p className="text-[10px] text-white/50 font-mono">From: DEMO_STORE</p>
                    </div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 border border-white/5 relative z-10">
                    <p className="text-xs text-white/80 leading-relaxed font-mono">
                      Hi! We noticed you left some items in your cart. Complete your purchase now with a special <span className="text-emerald-400 font-bold">{discount}% discount</span>!
                    </p>
                    <button onClick={() => { setShowCheckout(true); setSmsClicked(true); }} className="mt-3 w-full py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold rounded border border-blue-500/30 transition-colors flex items-center justify-center gap-2">
                      <CreditCard size={14} /> Claim Discount & Pay
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Checkout View (Recovery Scenario) */}
          <div className={`${styles.glassPanel} ${styles.checkoutCard} relative overflow-hidden`}>
            {/* Fake Razorpay Checkout Overlay */}
            <AnimatePresence>
              {showCheckout && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-white z-50 flex flex-col"
                >
                  {/* Header */}
                  <div className="bg-[#02042b] p-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-bold text-[#02042b]">D</div>
                      <div>
                        <h4 className="font-bold text-sm">Demo Store</h4>
                        <p className="text-xs text-white/70">Test Transaction</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/70">Amount to pay</p>
                      <h3 className="font-bold text-lg">₹{discount > 0 ? (4999 * (1 - discount/100)).toFixed(0) : 4999}</h3>
                    </div>
                  </div>
                  
                  {/* Body */}
                  <div className="flex-1 p-6 flex flex-col items-center justify-center bg-gray-50 text-gray-800">
                    <ShieldCheck size={48} className="text-emerald-500 mb-4" />
                    <h3 className="text-lg font-bold mb-1">Secure Checkout</h3>
                    <p className="text-sm text-gray-500 mb-8 text-center">Complete your payment for Premium Wireless Headphones.</p>
                    
                    <button 
                      className="w-full bg-[#528FF0] hover:bg-[#437de0] text-white py-3 rounded text-sm font-bold shadow-lg transition-all"
                      onClick={async () => {
                        const finalAmount = discount > 0 ? (4999 * (1 - discount/100)).toFixed(0) : "4999";
                        setLoading(true);
                        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/simulate`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ scenario: 'payment_success', merchant_id: merchantId || "demo", customer_id: testId, amount: parseInt(finalAmount)*100 })
                        });
                        setLoading(false);
                        setPaymentState('idle'); 
                        setDiscount(0); 
                        setShowCheckout(false);
                        alert(`Payment of ₹${finalAmount} Successful!`);
                      }}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : `Pay ₹${discount > 0 ? (4999 * (1 - discount/100)).toFixed(0) : 4999}`}
                    </button>
                    
                    <button 
                      className="w-full mt-3 py-3 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
                      onClick={async () => {
                        setShowCheckout(false);
                        if (paymentState === 'idle') {
                          // First cancel
                          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/simulate`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ scenario: 'recovery_fail', merchant_id: merchantId || "demo", customer_id: testId, retry_count: retryCount })
                          });
                          const data = await res.json();
                          if (data.status === 'abandoned') {
                            setPaymentState('idle');
                            alert('Order completely abandoned.');
                          } else {
                            setPaymentState('negotiating');
                            setDiscount(data.discount_offered || 5);
                            setSmsClicked(false);
                            setRetryCount(retryCount + 1);
                          }
                        } else if (paymentState === 'negotiating') {
                          // Subsequent cancel (retry)
                          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/simulate`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ scenario: 'recovery_fail', merchant_id: merchantId || "demo", customer_id: testId, retry_count: retryCount })
                          });
                          const data = await res.json();
                          if (data.status === 'abandoned') {
                            setPaymentState('idle');
                            setDiscount(0);
                            alert('Order completely abandoned.');
                          } else {
                            setDiscount(data.discount_offered || 5);
                            setSmsClicked(false);
                            setRetryCount(retryCount + 1);
                          }
                        }
                      }}
                      disabled={loading}
                    >
                      Cancel Payment
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className={styles.sectionTitle}>1. Revenue Recovery (Cart Abandonment)</h3>
            <div className={styles.productInfo}>
              <div className={styles.productImage}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path></svg>
              </div>
              <h2>Premium Wireless Headphones</h2>
              <div className={styles.price}>
                ₹{discount > 0 ? (4999 * (1 - discount/100)).toFixed(0) : 4999}
                {discount > 0 && <span className={styles.originalPrice}>₹4999</span>}
              </div>
            </div>

            {paymentState === 'idle' && (
              <div className="flex flex-col gap-2 w-full mt-4">
                <button className={styles.primaryBtn} onClick={() => setShowCheckout(true)} disabled={loading}>
                  Proceed to Checkout
                </button>
              </div>
            )}

            {paymentState === 'processing' && (
              <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <p>Processing Exit Intent...</p>
              </div>
            )}

            {paymentState === 'negotiating' && discount === 0 && (
              <div className={styles.aiNegotiating}>
                <div className={styles.pulseDot}></div>
                <p>Cyvault AI analyzing recovery options...</p>
              </div>
            )}

            {paymentState === 'negotiating' && discount > 0 && (
              <div className={styles.discountOffer}>
                <div className={styles.aiBadge}>Cyvault Recovery AI Active</div>
                <h4>Checkout Abandoned!</h4>
                <p className="mb-4">But don't worry, Cyvault has intercepted the drop-off and sent an automated SMS recovery link to the customer.</p>
                
                <div className="text-[10px] text-white/50 text-center uppercase tracking-wider font-mono">
                  Waiting for customer response...
                </div>
              </div>
            )}
          </div>

          <div className={styles.gridControls}>
            {/* Fraud Scenario */}
            <div className={styles.glassPanel}>
              <div className="flex justify-between items-start">
                <h3 className={styles.sectionTitle}>2. Fraud Prevention</h3>
                {fraudAttempts > 0 && <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-1 rounded">Velocity: {fraudAttempts}/3</span>}
              </div>
              <p className={styles.desc}>Simulate rapid payment failures from the same device (Velocity attack).</p>
              
              {/* Entity Graph Visualization */}
              <div className="relative w-full h-40 bg-black/40 border border-white/5 rounded-xl my-4 overflow-hidden flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 160">
                  {/* Central Node to Acct 1 */}
                  {fraudAttempts >= 1 && (
                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} stroke={fraudBlocked ? "#ef4444" : "#ffffff40"} strokeWidth="2" strokeDasharray={fraudBlocked ? "0" : "4"} className={fraudBlocked ? "animate-pulse" : ""} x1="200" y1="40" x2="100" y2="120" />
                  )}
                  {/* Central Node to Acct 2 */}
                  {fraudAttempts >= 2 && (
                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} stroke={fraudBlocked ? "#ef4444" : "#ffffff40"} strokeWidth="2" strokeDasharray={fraudBlocked ? "0" : "4"} className={fraudBlocked ? "animate-pulse" : ""} x1="200" y1="40" x2="200" y2="120" />
                  )}
                  {/* Central Node to Acct 3 */}
                  {fraudAttempts >= 3 && (
                    <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} stroke={fraudBlocked ? "#ef4444" : "#ffffff40"} strokeWidth="2" strokeDasharray={fraudBlocked ? "0" : "4"} className={fraudBlocked ? "animate-pulse" : ""} x1="200" y1="40" x2="300" y2="120" />
                  )}
                </svg>

                {/* Nodes HTML Overlay */}
                {fraudAttempts >= 1 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={`absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 p-2 rounded-lg bg-surface-container border ${fraudBlocked ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-outline-variant'}`}>
                    <RouterIcon size={16} className={fraudBlocked ? 'text-red-400' : 'text-primary'} />
                    <span className="text-[10px] font-mono">Device {testId}</span>
                  </motion.div>
                )}

                {/* Account 1 */}
                {fraudAttempts >= 1 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-4 left-[80px] flex flex-col items-center gap-1 z-10">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <User size={14} className="text-white/60" />
                    </div>
                    <span className="text-[10px] font-mono text-white/50">Acct A</span>
                  </motion.div>
                )}
                {/* Account 2 */}
                {fraudAttempts >= 2 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-4 left-[184px] flex flex-col items-center gap-1 z-10">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <User size={14} className="text-white/60" />
                    </div>
                    <span className="text-[10px] font-mono text-white/50">Acct B</span>
                  </motion.div>
                )}
                {/* Account 3 */}
                {fraudAttempts >= 3 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-4 left-[284px] flex flex-col items-center gap-1 z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${fraudBlocked ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'}`}>
                      {fraudBlocked ? <XCircle size={14} className="text-red-400" /> : <User size={14} className="text-white/60" />}
                    </div>
                    <span className={`text-[10px] font-mono ${fraudBlocked ? 'text-red-400' : 'text-white/50'}`}>Acct C</span>
                  </motion.div>
                )}
                
                {fraudAttempts === 0 && (
                   <div className="text-white/30 text-sm flex items-center gap-2">Graph will spawn on attempt</div>
                )}
              </div>

              {!fraudBlocked ? (
                <button className={`${styles.outlineBtn} ${styles.btnFraud}`} onClick={handleFraudAttack} disabled={loading}>
                  {fraudAttempts === 0 ? 'Attempt 1st Payment' : fraudAttempts === 1 ? 'Attempt 2nd Payment' : 'Attempt 3rd Payment'}
                </button>
              ) : (
                <div className={styles.blockedState}>
                  <div className={styles.blockIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <p>BLOCKED BY CYVAULT</p>
                  <span>Fraud ring detected sharing Device Fingerprint.</span>
                  <button className="mt-3 text-xs text-white/50 hover:text-white underline" onClick={() => { setFraudBlocked(false); setFraudAttempts(0); }}>Reset Sim</button>
                </div>
              )}
            </div>

            {/* Other Webhooks */}
            <div className={styles.glassPanel}>
              <h3 className={styles.sectionTitle}>3. Background Events</h3>
              <p className={styles.desc}>Fire standard webhook events to populate the dashboard data.</p>
              <div className={styles.btnGroup}>
                <button className={styles.outlineBtn} onClick={handleSettlement} disabled={loading}>
                  Trigger Settlement
                </button>
                <button className={styles.outlineBtn} onClick={handleRefund} disabled={loading}>
                  Trigger Refund
                </button>
              </div>
            </div>
            
            {/* NEW: Customer Support Chatbot */}
            <div className={`${styles.glassPanel} col-span-full w-full`} style={{ gridColumn: '1 / -1' }}>
              <h3 className={styles.sectionTitle}>4. Support Chatbot (Negotiation AI)</h3>
              <p className={styles.desc}>Chat with the Cyvault Support AI. Try asking for a discount on your failed payment!</p>
              <div className="flex flex-col h-64 bg-black/40 rounded-xl border border-white/10 overflow-hidden mt-4">
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${msg.role === 'user' ? 'bg-primary/20 text-primary-100 border border-primary/30 rounded-br-none' : 'bg-white/10 text-white/90 border border-white/10 rounded-bl-none'}`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="p-3 border-t border-white/10 bg-white/5 flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                    className="flex-1 bg-black/50 border border-white/10 rounded-lg outline-none text-sm text-white px-3 py-2 placeholder-white/30 focus:border-primary/50 transition-colors"
                    placeholder="Message Support..."
                  />
                  <button onClick={sendChatMessage} className="p-2 bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 rounded-lg transition-colors flex items-center justify-center w-10">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>

          </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 text-white space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
              <h3 className="text-xl font-bold mb-2">Multi-User Unified Testing</h3>
              <p className="text-white/70 max-w-2xl mb-6">
                Fire stress tests across all your generated demo sessions simultaneously. 
                This will simulate high traffic and populate the Dashboard, Leakage Radar, and Entity Graph dynamically for <strong>{sessions.length}</strong> unique customers.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <div className="bg-black/40 border border-white/10 p-5 rounded-lg flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold mb-1 flex items-center gap-2"><RouterIcon size={16} className="text-red-400"/> Unified Fraud Ring Attack</h4>
                    <p className="text-sm text-white/50 mb-4">Triggers 3 rapid failed payments for {attackCount} customers in your session history. Watch the Entity Graph light up with Fraud Rings.</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>Target Pool</span>
                        <span>{attackCount} / {sessions.length}</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max={Math.max(1, sessions.length)} 
                        value={Math.min(attackCount, sessions.length)}
                        onChange={(e) => setAttackCount(parseInt(e.target.value))}
                        className="w-full accent-red-500"
                        disabled={sessions.length === 0}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => handleUnifiedAttack('fraud')}
                    disabled={loading || sessions.length === 0}
                    className="w-full py-2.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
                  >
                    {executingAction === 'fraud' ? 'Executing Attack...' : `Fire Fraud Attack (${Math.min(attackCount, sessions.length)} users)`}
                  </button>
                </div>
                
                <div className="bg-black/40 border border-white/10 p-5 rounded-lg flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold mb-1 flex items-center gap-2"><TriangleAlert size={16} className="text-emerald-400"/> Mass Cart Abandonment</h4>
                    <p className="text-sm text-white/50 mb-4">Triggers a cart abandonment event for {attackCount} customers, forcing Cyvault AI to mass-negotiate discounts.</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>Target Pool</span>
                        <span>{attackCount} / {sessions.length}</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max={Math.max(1, sessions.length)} 
                        value={Math.min(attackCount, sessions.length)}
                        onChange={(e) => setAttackCount(parseInt(e.target.value))}
                        className="w-full accent-emerald-500"
                        disabled={sessions.length === 0}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => handleUnifiedAttack('recovery')}
                    disabled={loading || sessions.length === 0}
                    className="w-full py-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 transition-colors disabled:opacity-50"
                  >
                    {executingAction === 'recovery' ? 'Executing...' : `Fire Mass Recovery (${Math.min(attackCount, sessions.length)} users)`}
                  </button>
                </div>
              </div>
            </div>
            
            <div>
               <h4 className="font-semibold text-white/80 mb-3 border-b border-white/10 pb-2">Active Target Pool ({sessions.length})</h4>
               <div className="flex flex-wrap gap-2">
                 {sessions.map(s => (
                   <div key={s.id} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono">
                     <User size={12} className="text-white/40" />
                     {s.id}
                   </div>
                 ))}
                 {sessions.length === 0 && <p className="text-sm text-white/40">No users generated yet. Go to Single User Test and create some sessions first!</p>}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
