'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import styles from './simulator.module.css';

export default function SimulatorPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [activeScenario, setActiveScenario] = useState('none'); 
  const [paymentState, setPaymentState] = useState('idle'); 
  const [discount, setDiscount] = useState(0);
  const [fraudBlocked, setFraudBlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testId, setTestId] = useState('');

  useEffect(() => {
    // Generate a unique test ID for this simulator session
    setTestId(`SIM_${Math.floor(Math.random() * 9000) + 1000}`);
  }, []);

  // Route protection with hydration safety
  useEffect(() => {
    const authState = localStorage.getItem('cyvault_auth');
    if (!authState && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Helper to call FastAPI
  const triggerBackend = async (scenario) => {
    try {
      setLoading(true);
      const merchant_id = user?.email || "demo_merchant_1"; // Tie action to logged-in merchant
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario, merchant_id, customer_id: testId })
      });
      const data = await res.json();
      console.log('Backend response:', data);
      return data;
    } catch (e) {
      console.error("Backend error:", e);
    } finally {
      setLoading(false);
    }
  };

  // SCENARIO 1: Revenue Recovery
  const handleSimulateFailure = async () => {
    setActiveScenario('recovery');
    setPaymentState('processing');
    
    // 1. Simulate network delay
    await new Promise(r => setTimeout(r, 1000));
    setPaymentState('failed');
    
    // 2. Call backend
    await triggerBackend('recovery_fail');
    
    // 3. Backend processes and AI creates discount. Mocking the wait for response UI.
    setPaymentState('negotiating');
    setTimeout(() => {
      setDiscount(5); // UI Mock: AI proposed 5%
    }, 1500);
  };

  // SCENARIO 2: Fraud Ring Attack
  const handleFraudAttack = async () => {
    setActiveScenario('fraud');
    setFraudBlocked(false);
    
    // Call backend to simulate 3 fast failures
    await triggerBackend('fraud_attack');
    
    setTimeout(() => {
      setFraudBlocked(true); // AI detected same fingerprint
    }, 1000);
  };

  // SCENARIO 3: Settlement
  const handleSettlement = async () => {
    setActiveScenario('settlement');
    await triggerBackend('settlement');
    setTimeout(() => {
      setActiveScenario('none');
      alert("Webhook 'settlement.processed' fired! Backend database updated. Refresh the dashboard iframe to see changes.");
    }, 1000);
  };

  // SCENARIO 4: Refund
  const handleRefund = async () => {
    setActiveScenario('refund');
    await triggerBackend('refund');
    setTimeout(() => {
      setActiveScenario('none');
      alert("Support AI triggered in backend! Customer notified.");
    }, 1000);
  };

  const handleReset = () => {
    setActiveScenario('none');
    setPaymentState('idle');
    setDiscount(0);
    setFraudBlocked(false);
  };

  return (
    <div className={styles.appContainer}>
      {/* Left Side: Merchant Dashboard iframe */}
      <div className={styles.merchantSide}>
        <iframe 
          src="http://localhost:3000" 
          title="Cyvault Merchant Dashboard"
          className={styles.dashboardIframe}
        />
      </div>

      {/* Right Side: Customer Simulator */}
      <div className={styles.customerSide}>
        <div className={styles.simulatorHeader}>
          <div className={styles.pulseDot}></div>
          Hackathon Demo Control Panel (Connected to Backend)
          <span style={{marginLeft: '15px', background: 'rgba(157, 78, 221, 0.2)', padding: '4px 8px', borderRadius: '4px', color: '#fff'}}>
            Customer ID: <strong>{testId}</strong>
          </span>
        </div>

        <div className={styles.demoControlsWrapper}>
          
          {/* Main Checkout View (Recovery Scenario) */}
          <div className={`${styles.glassPanel} ${styles.checkoutCard}`}>
            <h3 className={styles.sectionTitle}>1. Test Revenue Recovery (AI Negotiation)</h3>
            <div className={styles.productInfo}>
              <div className={styles.productImage}>🎧</div>
              <h2>Premium Wireless Headphones</h2>
              <div className={styles.price}>
                ₹{discount > 0 ? (4999 * (1 - discount/100)).toFixed(0) : 4999}
                {discount > 0 && <span style={{fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '10px'}}>₹4999</span>}
              </div>
            </div>

            <div className={styles.actions}>
              {paymentState === 'idle' && (
                <button className={styles.btnPrimary} onClick={handleSimulateFailure}>
                  Simulate Failed Payment
                </button>
              )}
              {paymentState === 'processing' && (
                <button className={styles.btnPrimary} disabled style={{opacity: 0.7}}>
                  Processing Payment...
                </button>
              )}
              {paymentState === 'failed' && (
                <button className={styles.btnOutline} style={{borderColor: 'var(--error)', color: 'var(--error)'}}>
                  Payment Failed
                </button>
              )}
              {paymentState === 'success' && (
                <button className={styles.btnPrimary} style={{background: 'var(--success)'}} onClick={handleReset}>
                  Payment Successful! (Reset)
                </button>
              )}
            </div>
          </div>

          {/* Other Hackathon Features */}
          <div className={`${styles.glassPanel} ${styles.hackathonFeaturesCard}`}>
            <h3 className={styles.sectionTitle}>2. Test Advanced Cyvault Features</h3>
            
            <div className={styles.featureGrid}>
              <div className={styles.featureItem}>
                <h4>Risk AI (Fraud Ring)</h4>
                <p>Simulate an attack from a single device fingerprint.</p>
                <button className={`${styles.btnOutline} ${styles.btnSm} ${styles.btnFraud}`} onClick={handleFraudAttack}>
                  Simulate Fraud Attack
                </button>
              </div>

              <div className={styles.featureItem}>
                <h4>Finance AI (Cashflow)</h4>
                <p>Simulate a successful bank settlement to reconcile ledger.</p>
                <button className={`${styles.btnOutline} ${styles.btnSm} ${styles.btnFinance}`} onClick={handleSettlement}>
                  Trigger Settlement
                </button>
              </div>

              <div className={styles.featureItem}>
                <h4>Support AI (Refunds)</h4>
                <p>Trigger a refund event to see AI customer communication.</p>
                <button className={`${styles.btnOutline} ${styles.btnSm} ${styles.btnSupport}`} onClick={handleRefund}>
                  Trigger Refund/Dispute
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ================= MODALS ================= */}
        {/* 1. AI Negotiation Modal */}
        <div className={`${styles.aiModalOverlay} ${paymentState === 'negotiating' ? styles.active : ''}`}>
          <div className={`${styles.glassPanel} ${styles.aiModal}`}>
            <div className={styles.aiAvatar}>🤖</div>
            {discount === 0 ? (
              <>
                <h3 style={{marginBottom: '10px'}}>Cyvault AI Analyzing...</h3>
                <p style={{color: 'var(--text-muted)'}}>Reviewing policy to recover payment...</p>
                <div className={styles.typingIndicator}>
                  <span></span><span></span><span></span>
                </div>
              </>
            ) : (
              <>
                <h3 style={{marginBottom: '10px', color: 'var(--neon-purple)'}}>Wait! Don't leave.</h3>
                <p style={{marginBottom: '20px'}}>
                  We noticed your payment failed. As a special offer, we've applied an instant <strong>{discount}% discount</strong> to your cart!
                </p>
                <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                  <button className={styles.btnOutline} onClick={() => { setPaymentState('idle'); setDiscount(0); }}>Decline</button>
                  <button className={styles.btnPrimary} onClick={() => setPaymentState('success')}>Pay ₹{(4999 * (1 - discount/100)).toFixed(0)}</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 2. Fraud Block Modal */}
        <div className={`${styles.aiModalOverlay} ${activeScenario === 'fraud' ? styles.active : ''}`}>
          <div className={`${styles.glassPanel} ${styles.aiModal}`} style={{borderTopColor: 'var(--error)'}}>
            <div className={styles.aiAvatar} style={{background: 'var(--error)', boxShadow: '0 0 20px var(--error)'}}>🛡️</div>
            {!fraudBlocked ? (
              <>
                <h3 style={{marginBottom: '10px'}}>Cyvault Risk AI Scanning...</h3>
                <p style={{color: 'var(--text-muted)'}}>Analyzing device fingerprint and velocity...</p>
                <div className={styles.typingIndicator}>
                  <span></span><span></span><span></span>
                </div>
              </>
            ) : (
              <>
                <h3 style={{marginBottom: '10px', color: 'var(--error)'}}>Access Denied</h3>
                <p style={{marginBottom: '20px'}}>
                  Cyvault has blocked this request. High risk score (0.95) detected from this device fingerprint across multiple accounts.
                </p>
                <button className={styles.btnOutline} style={{borderColor: 'var(--error)', color: 'var(--error)'}} onClick={handleReset}>Acknowledge</button>
              </>
            )}
          </div>
        </div>

        {/* Loading Spinner Modal (For Settlement/Refund delays) */}
        <div className={`${styles.aiModalOverlay} ${(activeScenario === 'settlement' || activeScenario === 'refund') ? styles.active : ''}`}>
          <div className={`${styles.glassPanel} ${styles.aiModal}`} style={{background: 'transparent', border: 'none', boxShadow: 'none'}}>
            <div className={styles.pulseDot} style={{width: '30px', height: '30px', margin: '0 auto'}}></div>
            <h3 style={{marginTop: '20px'}}>Processing Webhook...</h3>
          </div>
        </div>

      </div>
    </div>
  );
}
