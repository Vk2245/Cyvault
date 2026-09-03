"use client";
import React, { useState } from 'react';
import { Shield, Key, Lock, TriangleAlert, Eye, EyeOff, RefreshCw, Webhook, Copy, Bot, User, Bell, Users, CreditCard } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('api');
  const [showKeySecret, setShowKeySecret] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'api', name: 'API & Security', icon: Shield },
    { id: 'team', name: 'Team Members', icon: Users },
    { id: 'billing', name: 'Billing', icon: CreditCard },
  ];

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
                    <input className="input-glass border-primary-container/50 bg-primary-container/5 cursor-default select-all" readOnly type="text" defaultValue="rzp_test_XyZ12389abcDEF"/>
                  </div>
                  <div>
                    <label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Key Secret</label>
                    <div className="relative">
                      <input className="input-glass pr-12 cursor-default bg-surface-container-highest/50" readOnly type={showKeySecret ? "text" : "password"} defaultValue="secret_key_1234567890"/>
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
                      <input className="input-glass flex-1 bg-surface-container-highest/50 text-tertiary-fixed-dim" readOnly type="text" defaultValue="https://api.cyvault.io/v1/webhooks/incoming/rZP_992x"/>
                      <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center" title="Copy to clipboard">
                        <Copy size={20} className="text-on-surface-variant" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Webhook Secret</label>
                    <div className="relative max-w-md">
                      <input className="input-glass pr-12 bg-surface-container-highest/50" readOnly type={showWebhookSecret ? "text" : "password"} defaultValue="whsec_dummysecretkeyhere"/>
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
                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                      <input defaultChecked className="sr-only peer" type="checkbox"/>
                      <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                    </label>
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

          {activeTab !== 'api' && (
            <div className="animate-in fade-in slide-in-from-right-4 glass-panel rounded-xl p-12 flex flex-col items-center justify-center text-center h-[60vh]">
              {activeTab === 'profile' && <User size={48} className="text-primary/50 mb-4" />}
              {activeTab === 'notifications' && <Bell size={48} className="text-primary/50 mb-4" />}
              {activeTab === 'team' && <Users size={48} className="text-primary/50 mb-4" />}
              {activeTab === 'billing' && <CreditCard size={48} className="text-primary/50 mb-4" />}
              <h3 className="text-xl font-semibold mb-2 text-on-surface capitalize">{activeTab} Settings</h3>
              <p className="text-on-surface-variant max-w-md">This section is currently under development. Core AI features are active in the API & Security tab.</p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
