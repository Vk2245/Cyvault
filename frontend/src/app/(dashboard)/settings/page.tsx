"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Key, Lock, TriangleAlert, Eye, EyeOff, RefreshCw, Webhook, Copy, Bot, User, Bell, Users, CreditCard, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Settings() {
  const { merchantId, user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showKeySecret, setShowKeySecret] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  const [settingsData, setSettingsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  // Profile form state
  const [profileName, setProfileName] = useState('');
  const [profileCompany, setProfileCompany] = useState('');

  // Notification toggles
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(false);
  const [notifWebhook, setNotifWebhook] = useState(true);
  const [notifFraudAlert, setNotifFraudAlert] = useState(true);
  const [notifRecovery, setNotifRecovery] = useState(true);
  const [notifSettlement, setNotifSettlement] = useState(true);

  // Load notification preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cyvault_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotifEmail(parsed.email ?? true);
        setNotifSms(parsed.sms ?? false);
        setNotifWebhook(parsed.webhook ?? true);
        setNotifFraudAlert(parsed.fraudAlert ?? true);
        setNotifRecovery(parsed.recovery ?? true);
        setNotifSettlement(parsed.settlement ?? true);
      } catch (e) {}
    }
  }, []);

  // Fetch merchant settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      if (!merchantId) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/merchants/${merchantId}/settings`);
        if (res.ok) {
          const data = await res.json();
          setSettingsData(data);
          setProfileName(data.profile.name || '');
          setProfileCompany(data.profile.company_name || '');
        }
      } catch (e) {
        console.error("Failed to fetch settings:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [merchantId]);

  const handleSaveProfile = async () => {
    if (!merchantId) return;
    setSaveStatus('saving');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/merchants/${merchantId}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profileName, company_name: profileCompany })
      });
      if (res.ok) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(''), 2000);
      }
    } catch (e) {
      setSaveStatus('error');
    }
  };

  const handleSaveNotifications = () => {
    const prefs = {
      email: notifEmail,
      sms: notifSms,
      webhook: notifWebhook,
      fraudAlert: notifFraudAlert,
      recovery: notifRecovery,
      settlement: notifSettlement
    };
    localStorage.setItem('cyvault_notifications', JSON.stringify(prefs));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSaveStatus('copied');
    setTimeout(() => setSaveStatus(''), 1500);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'api', name: 'API & Security', icon: Shield },
    { id: 'team', name: 'Team Members', icon: Users },
    { id: 'billing', name: 'Billing', icon: CreditCard },
  ];

  // Toggle component for notifications
  const Toggle = ({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) => (
    <label className="relative inline-flex items-center cursor-pointer mt-1">
      <input checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" type="checkbox"/>
      <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
    </label>
  );

  return (
    <main className="flex-1 flex flex-col h-full relative w-full p-4 md:p-margin-desktop">
      <div className="flex flex-col md:flex-row gap-gutter">
        {/* Settings Navigation */}
        <div className="w-full md:w-1/4 shrink-0">
          <div className="sticky top-28">
            <ul className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-4 md:pb-0 scrollbar-hide snap-x">
              {tabs.map((tab) => (
                <li key={tab.id} className="snap-start shrink-0">
                  <button 
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-5 py-3 rounded-lg font-body-md text-body-md transition-colors flex items-center justify-between ${
                      activeTab === tab.id 
                        ? 'text-primary bg-primary-container/10 border border-primary-container/30' 
                        : 'text-on-surface-variant hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <tab.icon size={16} className={activeTab === tab.id ? 'text-primary' : 'text-on-surface-variant'} />
                      {tab.name}
                    </span>
                    {activeTab === tab.id && <div className="w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_8px_rgba(160,120,255,0.8)]"></div>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Settings Content */}
        <div className="w-full md:w-3/4 flex flex-col gap-8">
          
          {/* ========== PROFILE TAB ========== */}
          {activeTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-center">
                  <User size={24} className="text-primary-container" />
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight text-glow">Profile Settings</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage your merchant account details.</p>
                </div>
              </div>

              <section className="glass-panel rounded-xl p-8 neon-glow-primary mb-8">
                <div className="flex items-center border-b border-white/10 pb-4 mb-6">
                  <h3 className="font-body-lg text-body-lg font-semibold text-on-surface">Account Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Full Name</label>
                    <input className="input-glass" type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} placeholder="Your name"/>
                  </div>
                  <div>
                    <label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Company Name</label>
                    <input className="input-glass" type="text" value={profileCompany} onChange={(e) => setProfileCompany(e.target.value)} placeholder="Company name"/>
                  </div>
                  <div>
                    <label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Email Address</label>
                    <input className="input-glass bg-surface-container-highest/50 cursor-not-allowed" readOnly type="email" value={user?.email || settingsData?.profile?.email || ''}/>
                  </div>
                  <div>
                    <label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Industry</label>
                    <input className="input-glass bg-surface-container-highest/50 cursor-not-allowed" readOnly type="text" value={settingsData?.profile?.industry || 'Not specified'}/>
                  </div>
                  <div>
                    <label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Merchant ID</label>
                    <input className="input-glass bg-surface-container-highest/50 cursor-not-allowed font-mono text-xs" readOnly type="text" value={merchantId || ''}/>
                  </div>
                  <div>
                    <label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Member Since</label>
                    <input className="input-glass bg-surface-container-highest/50 cursor-not-allowed" readOnly type="text" value={settingsData?.profile?.created_at ? new Date(settingsData.profile.created_at).toLocaleDateString() : 'N/A'}/>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button 
                    onClick={handleSaveProfile}
                    className="px-8 py-3 rounded-full bg-white text-black font-body-md text-body-md font-bold hover:bg-white/90 transition-colors shadow-sm flex items-center gap-2"
                  >
                    {saveStatus === 'saved' ? <><CheckCircle2 size={16}/> Saved!</> : <><Save size={16}/> Save Changes</>}
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* ========== NOTIFICATIONS TAB ========== */}
          {activeTab === 'notifications' && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-center">
                  <Bell size={24} className="text-primary-container" />
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight text-glow">Notification Preferences</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">Choose how you want to be notified about AI actions.</p>
                </div>
              </div>

              {/* Channels Section */}
              <section className="glass-panel rounded-xl p-8 neon-glow-primary mb-8">
                <div className="flex items-center border-b border-white/10 pb-4 mb-6">
                  <h3 className="font-body-lg text-body-lg font-semibold text-on-surface">Notification Channels</h3>
                </div>
                <div className="space-y-5">
                  <div className="flex items-start justify-between p-4 rounded-lg bg-surface-container/20 border border-outline-variant/30">
                    <div>
                      <div className="font-body-md text-body-md font-medium text-on-surface mb-1">Email Notifications</div>
                      <div className="font-label-mono text-label-mono text-on-surface-variant text-sm">Receive alerts at {user?.email || 'your email'}</div>
                    </div>
                    <Toggle checked={notifEmail} onChange={setNotifEmail} />
                  </div>
                  <div className="flex items-start justify-between p-4 rounded-lg bg-surface-container/20 border border-outline-variant/30">
                    <div>
                      <div className="font-body-md text-body-md font-medium text-on-surface mb-1">SMS Notifications</div>
                      <div className="font-label-mono text-label-mono text-on-surface-variant text-sm">Get text alerts for critical events</div>
                    </div>
                    <Toggle checked={notifSms} onChange={setNotifSms} />
                  </div>
                  <div className="flex items-start justify-between p-4 rounded-lg bg-surface-container/20 border border-outline-variant/30">
                    <div>
                      <div className="font-body-md text-body-md font-medium text-on-surface mb-1">Webhook Push</div>
                      <div className="font-label-mono text-label-mono text-on-surface-variant text-sm">Push events to your custom endpoint</div>
                    </div>
                    <Toggle checked={notifWebhook} onChange={setNotifWebhook} />
                  </div>
                </div>
              </section>

              {/* Event Types Section */}
              <section className="glass-panel rounded-xl p-8 neon-glow-primary mb-8">
                <div className="flex items-center border-b border-white/10 pb-4 mb-6">
                  <h3 className="font-body-lg text-body-lg font-semibold text-on-surface">Event Types</h3>
                </div>
                <div className="space-y-5">
                  <div className="flex items-start justify-between p-4 rounded-lg bg-surface-container/20 border border-outline-variant/30">
                    <div>
                      <div className="font-body-md text-body-md font-medium text-on-surface mb-1">🛡️ Fraud Alerts</div>
                      <div className="font-label-mono text-label-mono text-on-surface-variant text-sm">When AI blocks a suspected fraud ring or suspicious activity</div>
                    </div>
                    <Toggle checked={notifFraudAlert} onChange={setNotifFraudAlert} />
                  </div>
                  <div className="flex items-start justify-between p-4 rounded-lg bg-surface-container/20 border border-outline-variant/30">
                    <div>
                      <div className="font-body-md text-body-md font-medium text-on-surface mb-1">🤖 Recovery Actions</div>
                      <div className="font-label-mono text-label-mono text-on-surface-variant text-sm">When AI offers a discount or intercepts cart abandonment</div>
                    </div>
                    <Toggle checked={notifRecovery} onChange={setNotifRecovery} />
                  </div>
                  <div className="flex items-start justify-between p-4 rounded-lg bg-surface-container/20 border border-outline-variant/30">
                    <div>
                      <div className="font-body-md text-body-md font-medium text-on-surface mb-1">💰 Settlement Updates</div>
                      <div className="font-label-mono text-label-mono text-on-surface-variant text-sm">When a settlement is processed or reconciled</div>
                    </div>
                    <Toggle checked={notifSettlement} onChange={setNotifSettlement} />
                  </div>
                </div>
              </section>

              <div className="flex justify-end">
                <button 
                  onClick={handleSaveNotifications}
                  className="px-8 py-3 rounded-full bg-white text-black font-body-md text-body-md font-bold hover:bg-white/90 transition-colors shadow-sm flex items-center gap-2"
                >
                  {saveStatus === 'saved' ? <><CheckCircle2 size={16}/> Saved!</> : <><Save size={16}/> Save Preferences</>}
                </button>
              </div>
            </div>
          )}

          {/* ========== API & SECURITY TAB ========== */}
          {activeTab === 'api' && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-center">
                  <Shield size={24} className="text-primary-container" />
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight text-glow">API &amp; Security Configuration</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage integration keys, webhooks, and agent permissions.</p>
                </div>
              </div>

              {/* Section 1: Razorpay Connection */}
              <section className="glass-panel rounded-xl p-8 neon-glow-primary mb-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h3 className="font-body-lg text-body-lg font-semibold text-on-surface flex items-center gap-2">
                    <Key size={20} className="text-primary" />
                    Razorpay Connection
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-outline-variant font-label-mono text-label-mono text-on-surface-variant text-xs">
                    <Lock size={14} />
                    Keys Encrypted at Rest (AES-256-GCM)
                  </span>
                </div>
                <div className="bg-secondary-container/10 border border-secondary-container/30 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <TriangleAlert size={20} className="text-secondary-container mt-0.5" />
                  <div className="font-body-md text-body-md text-secondary-fixed-dim">
                    <strong className="font-semibold block mb-1">Security Notice</strong>
                    Always use Restricted API Keys with minimum necessary privileges. Never share your secret keys.
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Key ID</label>
                    <input className="input-glass border-primary-container/50 bg-primary-container/5 cursor-default select-all" readOnly type="text" value={settingsData?.api_keys?.key_id || 'Loading...'}/>
                  </div>
                  <div>
                    <label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Key Secret</label>
                    <div className="relative">
                      <input className="input-glass pr-12 cursor-default bg-surface-container-highest/50" readOnly type={showKeySecret ? "text" : "password"} value={settingsData?.api_keys?.key_secret_masked || 'Loading...'}/>
                      <button 
                        onClick={() => setShowKeySecret(!showKeySecret)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                      >
                        {showKeySecret ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="px-6 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors font-body-md text-body-md font-medium flex items-center gap-2">
                    <RefreshCw size={18} />
                    Rotate Keys
                  </button>
                </div>
              </section>

              {/* Section 2: Event Listeners */}
              <section className="glass-panel rounded-xl p-8 neon-glow-primary mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-4">
                  <h3 className="font-body-lg text-body-lg font-semibold text-on-surface flex items-center gap-2">
                    <Webhook size={20} className="text-primary" />
                    Event Listeners
                  </h3>
                  <div className="font-label-mono text-label-mono text-on-surface-variant text-sm flex items-center gap-2 bg-surface-container py-1.5 px-3 rounded-lg border border-outline-variant">
                    <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></div>
                    Last webhook received: Live
                  </div>
                </div>
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block font-label-mono text-label-mono text-on-surface-variant mb-2 flex items-center justify-between">
                      Cyvault Webhook URL
                    </label>
                    <div className="flex gap-2">
                      <input className="input-glass flex-1 bg-surface-container-highest/50 text-tertiary-fixed-dim" readOnly type="text" value={settingsData?.api_keys?.webhook_url || 'Loading...'}/>
                      <button onClick={() => copyToClipboard(settingsData?.api_keys?.webhook_url || '')} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center" title="Copy to clipboard">
                        <Copy size={20} className="text-on-surface-variant" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Webhook Secret</label>
                    <div className="relative max-w-md">
                      <input className="input-glass pr-12 bg-surface-container-highest/50" readOnly type={showWebhookSecret ? "text" : "password"} value={settingsData?.api_keys?.webhook_secret_masked || 'Loading...'}/>
                      <button 
                        onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                      >
                        {showWebhookSecret ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Insights Agent Permissions */}
              <section className="glass-panel rounded-xl p-8 neon-glow-primary">
                <div className="flex items-center border-b border-white/10 pb-4 mb-6">
                  <h3 className="font-body-lg text-body-lg font-semibold text-on-surface flex items-center gap-2">
                    <Bot size={20} className="text-primary" />
                    Insights Agent Permissions
                  </h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Configure what data the AI agent is allowed to access and act upon during chat interactions.</p>
                <div className="space-y-5 mb-8">
                  <div className="flex items-start justify-between p-4 rounded-lg bg-surface-container/20 border border-outline-variant/30">
                    <div>
                      <div className="font-body-md text-body-md font-medium text-on-surface mb-1">Allow aggregate financial summaries</div>
                      <div className="font-label-mono text-label-mono text-on-surface-variant text-sm">Permit agent to calculate daily, weekly, or monthly totals.</div>
                    </div>
                    <Toggle checked={true} onChange={() => {}} />
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button className="px-8 py-3 rounded-full bg-white text-black font-body-md text-body-md font-bold hover:bg-white/90 transition-colors shadow-sm">
                    Save Changes
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* ========== TEAM & BILLING (Placeholder) ========== */}
          {(activeTab === 'team' || activeTab === 'billing') && (
            <div className="animate-in fade-in slide-in-from-right-4 glass-panel rounded-xl p-12 flex flex-col items-center justify-center text-center h-[60vh]">
              {activeTab === 'team' && <Users size={48} className="text-primary/50 mb-4" />}
              {activeTab === 'billing' && <CreditCard size={48} className="text-primary/50 mb-4" />}
              <h3 className="text-xl font-semibold mb-2 text-on-surface capitalize">{activeTab} Settings</h3>
              <p className="text-on-surface-variant max-w-md">This section is currently under development. Core AI features are active in the other tabs.</p>
            </div>
          )}

        </div>
      </div>

      {/* Toast notification */}
      {saveStatus === 'copied' && (
        <div className="fixed bottom-6 right-6 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg font-mono text-sm animate-in fade-in slide-in-from-bottom-4">
          ✓ Copied to clipboard
        </div>
      )}
    </main>
  );
}
