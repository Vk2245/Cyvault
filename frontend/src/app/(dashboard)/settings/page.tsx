import React from 'react';
import { Shield, Key, Lock, TriangleAlert, Eye, RefreshCw, Webhook, Copy, Bot } from 'lucide-react';

export default function Settings() {
  return (
    <main className="flex-1 flex flex-col h-full relative w-full">

<div className="flex flex-col md:flex-row gap-gutter">
{/* Settings Navigation (Left Column 25%) */}
<div className="w-full md:w-1/4 shrink-0">
<div className="sticky top-28">
{/* Mobile: Horizontal scroll, Desktop: Vertical */}
<ul className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-4 md:pb-0 scrollbar-hide snap-x">
<li className="snap-start shrink-0">
<button className="w-full text-left px-5 py-3 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-white/5 transition-colors">
                                Profile
                            </button>
</li>
<li className="snap-start shrink-0">
<button className="w-full text-left px-5 py-3 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-white/5 transition-colors">
                                Notifications
                            </button>
</li>
<li className="snap-start shrink-0">
<button className="w-full text-left px-5 py-3 rounded-lg font-body-md text-body-md text-primary bg-primary-container/10 border border-primary-container/30 flex items-center justify-between">
                                API &amp; Security
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_8px_rgba(160,120,255,0.8)]"></div>
</button>
</li>
<li className="snap-start shrink-0">
<button className="w-full text-left px-5 py-3 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-white/5 transition-colors">
                                Team Members
                            </button>
</li>
<li className="snap-start shrink-0">
<button className="w-full text-left px-5 py-3 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-white/5 transition-colors">
                                Billing
                            </button>
</li>
</ul>
</div>
</div>
{/* Settings Content (Right Column 75%) */}
<div className="w-full md:w-3/4 flex flex-col gap-8">
{/* Header */}
<div className="flex items-center gap-4 mb-2">
<div className="w-12 h-12 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-center">
<Shield size={24} className="text-primary-container" />
</div>
<div>
<h2 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight text-glow">API &amp; Security Configuration</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage integration keys, webhooks, and agent permissions.</p>
</div>
</div>
{/* Section 1: Razorpay Connection */}
<section className="glass-panel rounded-xl p-8 neon-glow-primary">
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
{/* Warning Banner */}
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
<input className="input-glass pr-12 cursor-default bg-surface-container-highest/50" readOnly type="password" defaultValue="secret_key_1234567890"/>
<button className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
<Eye size={20} />
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
<section className="glass-panel rounded-xl p-8 neon-glow-primary">
<div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-4">
<h3 className="font-body-lg text-body-lg font-semibold text-on-surface flex items-center gap-2">
<Webhook size={20} className="text-primary" />
                            Event Listeners
                        </h3>
<div className="font-label-mono text-label-mono text-on-surface-variant text-sm flex items-center gap-2 bg-surface-container py-1.5 px-3 rounded-lg border border-outline-variant">
<div className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></div>
                            Last webhook received: 2 mins ago
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
<input className="input-glass pr-12 bg-surface-container-highest/50" readOnly type="password" defaultValue="whsec_dummysecretkeyhere"/>
<button className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
<Eye size={20} />
</button>
</div>
</div>
</div>
<div className="bg-surface-container/30 rounded-lg p-5 border border-outline-variant/50">
<h4 className="font-label-mono text-label-mono text-on-surface mb-4 uppercase tracking-wider text-xs">Subscribed Events</h4>
<div className="space-y-4">
<div className="flex items-center justify-between">
<div className="font-label-mono text-label-mono text-on-surface">payment.failed</div>
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
<div className="flex items-center justify-between">
<div className="font-label-mono text-label-mono text-on-surface">payment.captured</div>
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
<div className="flex items-center justify-between">
<div className="font-label-mono text-label-mono text-on-surface">settlement.processed</div>
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
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
<div className="flex items-start justify-between p-4 rounded-lg bg-surface-container/20 border border-outline-variant/30">
<div>
<div className="font-body-md text-body-md font-medium text-on-surface mb-1">Allow fetching exact transaction details</div>
<div className="font-label-mono text-label-mono text-on-surface-variant text-sm">Permit agent to read PII and exact amounts of specific transactions.</div>
</div>
<label className="relative inline-flex items-center cursor-pointer mt-1">
<input defaultChecked className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
<div className="flex items-start justify-between p-4 rounded-lg bg-surface-container/20 border border-outline-variant/30 opacity-75">
<div>
<div className="font-body-md text-body-md font-medium text-on-surface mb-1">Allow triggering manual recovery via chat</div>
<div className="font-label-mono text-label-mono text-on-surface-variant text-sm flex items-center gap-2">
<TriangleAlert size={14} className="text-secondary" />
                                    Requires Elevated Permissions
                                </div>
</div>
<label className="relative inline-flex items-center cursor-pointer mt-1">
<input className="sr-only peer" type="checkbox"/>
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
</div>

    </main>
  );
}
