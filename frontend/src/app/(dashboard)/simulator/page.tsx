"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { Bot, Send, User, TriangleAlert, CheckCircle2, XCircle, Router as RouterIcon } from 'lucide-react';
import styles from './simulator.module.css';

export default function SimulatorPage() {
  const { isAuthenticated, user, merchantId } = useAuth();
  const router = useRouter();

  const [activeScenario, setActiveScenario] = useState('none'); 
  const [paymentState, setPaymentState] = useState('idle'); 
  const [discount, setDiscount] = useState(0);
  const [fraudBlocked, setFraudBlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testId, setTestId] = useState('');
  
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
    await triggerBackend('recovery_fail');
    setTimeout(() => {
      setDiscount(5); 
    }, 1500);
  };

  const handleFraudAttack = async () => {
    setActiveScenario('fraud');
    setFraudBlocked(false);
    await triggerBackend('fraud_attack');
    setTimeout(() => {
      setFraudBlocked(true); 
    }, 1000);
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
        <div className={styles.simulatorBrandHeader}>
          <img src="/cyvault_transparent.png" alt="Cyvault" className={styles.brandLogo} />
          <div>
            <h2 className={styles.brandTitle}>Storefront Simulator</h2>
            <span className={styles.brandBadge}>Customer ID: {testId}</span>
          </div>
          <div className={styles.pulseDot}></div>
        </div>

        <div className={styles.demoControlsWrapper}>
          
          {/* Main Checkout View (Recovery Scenario) */}
          <div className={`${styles.glassPanel} ${styles.checkoutCard}`}>
            <h3 className={styles.sectionTitle}>1. Revenue Recovery (Cart Abandonment)</h3>
            <div className={styles.productInfo}>
              <div className={styles.productImage}>🎧</div>
              <h2>Premium Wireless Headphones</h2>
              <div className={styles.price}>
                ₹{discount > 0 ? (4999 * (1 - discount/100)).toFixed(0) : 4999}
                {discount > 0 && <span className={styles.originalPrice}>₹4999</span>}
              </div>
            </div>

            {paymentState === 'idle' && (
              <div className="flex flex-col gap-2 w-full">
                <button className={styles.primaryBtn} onClick={() => alert('Payment Successful')} disabled={loading}>
                  Pay ₹4999
                </button>
                <button className={styles.outlineBtn} onClick={handleSimulateCartAbandonment} disabled={loading}>
                  {loading ? 'Processing...' : 'Cancel / Close Checkout'}
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
                <div className={styles.aiBadge}>🤖 Cyvault Recovery AI</div>
                <h4>Wait! Don't leave empty-handed.</h4>
                <p>Complete your purchase now with a special <strong>{discount}% discount</strong>.</p>
                <div className="flex flex-col gap-2 mt-4">
                  <button className={styles.successBtn} style={{ marginTop: 0 }} onClick={() => setPaymentState('idle')}>Pay ₹{(4999 * (1 - discount/100)).toFixed(0)} Now</button>
                  <button className={styles.outlineBtn} onClick={() => setPaymentState('idle')}>No thanks, cancel order</button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.gridControls}>
            {/* Fraud Scenario */}
            <div className={styles.glassPanel}>
              <h3 className={styles.sectionTitle}>2. Fraud Prevention</h3>
              <p className={styles.desc}>Simulate 3 rapid payment failures from the same device fingerprint (Velocity attack).</p>
              {!fraudBlocked ? (
                <button className={`${styles.outlineBtn} ${styles.btnFraud}`} onClick={handleFraudAttack} disabled={loading}>
                  Run Fraud Attack
                </button>
              ) : (
                <div className={styles.blockedState}>
                  <div className={styles.blockIcon}>🛡️</div>
                  <p>BLOCKED BY CYVAULT</p>
                  <span>Device {testId} flagged as part of a fraud ring.</span>
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
      </div>
    </div>
  );
}
