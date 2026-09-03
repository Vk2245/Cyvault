import { useState } from 'react';
import './App.css';

function App() {
  const [activeScenario, setActiveScenario] = useState('none'); 
  const [paymentState, setPaymentState] = useState('idle'); 
  const [discount, setDiscount] = useState(0);
  const [fraudBlocked, setFraudBlocked] = useState(false);

  // SCENARIO 1: Revenue Recovery
  const handleSimulateFailure = () => {
    setActiveScenario('recovery');
    setPaymentState('processing');
    
    setTimeout(() => {
      setPaymentState('failed');
      setTimeout(() => {
        setPaymentState('negotiating');
        setTimeout(() => {
          setDiscount(5); // AI proposed 5%
        }, 1500);
      }, 1000);
    }, 1500);
  };

  // SCENARIO 2: Fraud Ring Attack
  const handleFraudAttack = () => {
    setActiveScenario('fraud');
    setFraudBlocked(false);
    
    setTimeout(() => {
      setFraudBlocked(true); // AI detected same fingerprint
    }, 2000);
  };

  // SCENARIO 3: Settlement
  const handleSettlement = () => {
    setActiveScenario('settlement');
    setTimeout(() => {
      setActiveScenario('none');
      alert("Webhook 'settlement.processed' fired! Check Merchant Dashboard for updated Cashflow.");
    }, 1500);
  };

  // SCENARIO 4: Refund
  const handleRefund = () => {
    setActiveScenario('refund');
    setTimeout(() => {
      setActiveScenario('none');
      alert("Support AI triggered! Customer has been notified about their refund.");
    }, 1500);
  };

  const handleReset = () => {
    setActiveScenario('none');
    setPaymentState('idle');
    setDiscount(0);
    setFraudBlocked(false);
  };

  return (
    <div className="app-container">
      {/* Left Side: Merchant Dashboard iframe */}
      <div className="merchant-side">
        <iframe 
          src="http://localhost:3000" 
          title="Cyvault Merchant Dashboard"
          className="dashboard-iframe"
        />
      </div>

      {/* Right Side: Customer Simulator */}
      <div className="customer-side">
        <div className="simulator-header">
          <div className="pulse-dot"></div>
          Hackathon Demo Control Panel
        </div>

        {/* Demo Controls Wrapper */}
        <div className="demo-controls-wrapper">
          
          {/* Main Checkout View (Recovery Scenario) */}
          <div className="glass-panel checkout-card">
            <h3 className="section-title">1. Test Revenue Recovery (AI Negotiation)</h3>
            <div className="product-info">
              <div className="product-image">🎧</div>
              <h2>Premium Wireless Headphones</h2>
              <div className="price">
                ₹{discount > 0 ? (4999 * (1 - discount/100)).toFixed(0) : 4999}
                {discount > 0 && <span style={{fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '10px'}}>₹4999</span>}
              </div>
            </div>

            <div className="actions">
              {paymentState === 'idle' && (
                <button className="btn-primary" onClick={handleSimulateFailure}>
                  Simulate Failed Payment
                </button>
              )}
              {paymentState === 'processing' && (
                <button className="btn-primary" disabled style={{opacity: 0.7}}>
                  Processing Payment...
                </button>
              )}
              {paymentState === 'failed' && (
                <button className="btn-outline" style={{borderColor: 'var(--error)', color: 'var(--error)'}}>
                  Payment Failed
                </button>
              )}
              {paymentState === 'success' && (
                <button className="btn-primary" style={{background: 'var(--success)'}} onClick={handleReset}>
                  Payment Successful! (Reset)
                </button>
              )}
            </div>
          </div>

          {/* Other Hackathon Features */}
          <div className="glass-panel hackathon-features-card">
            <h3 className="section-title">2. Test Advanced Cyvault Features</h3>
            
            <div className="feature-grid">
              <div className="feature-item">
                <h4>Risk AI (Fraud Ring)</h4>
                <p>Simulate an attack from a single device fingerprint.</p>
                <button className="btn-outline btn-sm btn-fraud" onClick={handleFraudAttack}>
                  Simulate Fraud Attack
                </button>
              </div>

              <div className="feature-item">
                <h4>Finance AI (Cashflow)</h4>
                <p>Simulate a successful bank settlement to reconcile ledger.</p>
                <button className="btn-outline btn-sm btn-finance" onClick={handleSettlement}>
                  Trigger Settlement
                </button>
              </div>

              <div className="feature-item">
                <h4>Support AI (Refunds)</h4>
                <p>Trigger a refund event to see AI customer communication.</p>
                <button className="btn-outline btn-sm btn-support" onClick={handleRefund}>
                  Trigger Refund/Dispute
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ================= MODALS ================= */}

        {/* 1. AI Negotiation Modal */}
        <div className={`ai-modal-overlay ${paymentState === 'negotiating' ? 'active' : ''}`}>
          <div className="glass-panel ai-modal">
            <div className="ai-avatar">🤖</div>
            {discount === 0 ? (
              <>
                <h3 style={{marginBottom: '10px'}}>Cyvault AI Analyzing...</h3>
                <p style={{color: 'var(--text-muted)'}}>Reviewing policy to recover payment...</p>
                <div className="typing-indicator">
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
                  <button className="btn-outline" onClick={() => { setPaymentState('idle'); setDiscount(0); }}>Decline</button>
                  <button className="btn-primary" onClick={() => setPaymentState('success')}>Pay ₹{(4999 * (1 - discount/100)).toFixed(0)}</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 2. Fraud Block Modal */}
        <div className={`ai-modal-overlay ${activeScenario === 'fraud' ? 'active' : ''}`}>
          <div className="glass-panel ai-modal" style={{borderTopColor: 'var(--error)'}}>
            <div className="ai-avatar" style={{background: 'var(--error)', boxShadow: '0 0 20px var(--error)'}}>🛡️</div>
            {!fraudBlocked ? (
              <>
                <h3 style={{marginBottom: '10px'}}>Cyvault Risk AI Scanning...</h3>
                <p style={{color: 'var(--text-muted)'}}>Analyzing device fingerprint and velocity...</p>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </>
            ) : (
              <>
                <h3 style={{marginBottom: '10px', color: 'var(--error)'}}>Access Denied</h3>
                <p style={{marginBottom: '20px'}}>
                  Cyvault has blocked this request. High risk score (0.95) detected from this device fingerprint across multiple accounts.
                </p>
                <button className="btn-outline" style={{borderColor: 'var(--error)', color: 'var(--error)'}} onClick={handleReset}>Acknowledge</button>
              </>
            )}
          </div>
        </div>

        {/* Loading Spinner Modal (For Settlement/Refund delays) */}
        <div className={`ai-modal-overlay ${(activeScenario === 'settlement' || activeScenario === 'refund') ? 'active' : ''}`}>
          <div className="glass-panel ai-modal" style={{background: 'transparent', border: 'none', boxShadow: 'none'}}>
            <div className="pulse-dot" style={{width: '30px', height: '30px', margin: '0 auto'}}></div>
            <h3 style={{marginTop: '20px'}}>Processing Webhook...</h3>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
