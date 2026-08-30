
import React from 'react';

export default function Settings() {
  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden bg-[#030303] text-white">
      
{/* Ambient Background Light Effect */}
<div className="fixed top-0 right-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
<div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary-container/5 rounded-full blur-[120px] opacity-50 mix-blend-screen"></div>
<div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-secondary-container/5 rounded-full blur-[100px] opacity-30 mix-blend-screen"></div>
</div>
{/* SideNavBar */}
<nav className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-background dark:bg-background border-r border-outline-variant flex-col py-8 px-4 z-40">
<div className="mb-12 px-4">
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary tracking-tight">Cyvault</h1>
<p className="font-label-mono text-label-mono text-on-surface-variant mt-1">Secure AI Operations</p>
</div>
<ul className="flex flex-col gap-2 flex-grow">
<li>
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all duration-300 ease-in-out font-body-md text-body-md" href="/feed">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                    Dashboard
                </a>
</li>
<li>
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all duration-300 ease-in-out font-body-md text-body-md" href="/feed">
<span className="material-symbols-outlined" data-icon="monitoring">monitoring</span>
                    Analytics
                </a>
</li>
<li>
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all duration-300 ease-in-out font-body-md text-body-md" href="/feed">
<span className="material-symbols-outlined" data-icon="restart_alt">restart_alt</span>
                    Recovery
                </a>
</li>
<li>
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all duration-300 ease-in-out font-body-md text-body-md" href="/feed">
<span className="material-symbols-outlined" data-icon="verified_user">verified_user</span>
                    Compliance
                </a>
</li>
<li>
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all duration-300 ease-in-out font-body-md text-body-md" href="/feed">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
                    Chatbot
                </a>
</li>
<li>
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-primary font-bold border-r-2 border-primary bg-primary-container/10 transition-all duration-300 ease-in-out font-body-md text-body-md" href="/settings">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
                    Settings
                </a>
</li>
</ul>
<div className="mt-auto px-4">
<div className="flex items-center gap-3">
<img alt="Merchant Profile Avatar" className="w-10 h-10 rounded-full border border-outline-variant object-cover" data-alt="A futuristic minimalist abstract avatar image featuring glowing geometric nodes connected by fine lines in a deep dark void with purple accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcH0UiPnB5I_ED1zJGrE6td1LRTeqGzx-9WqLF0PG-oTJmdIZRFihw26whuVzOrVKtP7hy5JyMl1AIhn-sl42D2TC9JiUXBJMvl7GYWseN3z4CZwAw_YpfQrgC-ck20xiPte0aO47mo49r8Co1p8oKXSfg7ns1xuC4zysd0e654bgZe0qROl9ErxOngHhzFmQgxY4itFMMNEXh191OR4kGpqYKSzfEeIvBUTAD60wSkaGekzTx52Ky"/>
<div className="font-body-md text-body-md text-on-surface-variant">Merchant</div>
</div>
</div>
</nav>
{/* TopAppBar */}
<header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop transition-opacity duration-200">
{/* Search (Left) */}
<div className="flex-1 max-w-md hidden md:flex items-center relative">
<span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl">search</span>
<input className="w-full bg-surface-container/50 border border-outline-variant rounded-lg py-1.5 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container" placeholder="Search operations, alerts..." type="text"/>
</div>
{/* Mobile Menu & Title */}
<div className="md:hidden flex items-center gap-4">
<span className="material-symbols-outlined text-primary cursor-pointer">menu</span>
<span className="font-headline-md text-headline-md font-bold text-primary">Cyvault</span>
</div>
{/* Trailing Actions */}
<div className="flex items-center gap-6 text-on-surface-variant font-body-md text-body-md">
<button className="hover:text-primary transition-colors relative">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
<span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="security">security</span>
</button>
<button className="hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
</button>
</div>
</header>
{/* Main Content Canvas */}
<main className="md:ml-64 pt-24 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto">
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
<span className="material-symbols-outlined text-primary-container text-2xl" data-icon="security">security</span>
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
<span className="material-symbols-outlined text-primary text-xl" data-icon="key">key</span>
                            Razorpay Connection
                        </h3>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-outline-variant font-label-mono text-label-mono text-on-surface-variant text-xs">
<span className="material-symbols-outlined text-[14px]" data-icon="lock">lock</span>
                            Keys Encrypted at Rest (AES-256-GCM)
                        </span>
</div>
{/* Warning Banner */}
<div className="bg-secondary-container/10 border border-secondary-container/30 rounded-lg p-4 mb-6 flex items-start gap-3">
<span className="material-symbols-outlined text-secondary-container mt-0.5" data-icon="warning">warning</span>
<div className="font-body-md text-body-md text-secondary-fixed-dim">
<strong className="font-semibold block mb-1">Security Notice</strong>
                            Always use Restricted API Keys with minimum necessary privileges. Never share your secret keys.
                        </div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
<div>
<label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Key ID</label>
<input className="input-glass border-primary-container/50 bg-primary-container/5 cursor-default select-all" readonly="" type="text" defaultValue="rzp_test_XyZ12389abcDEF"/>
</div>
<div>
<label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Key Secret</label>
<div className="relative">
<input className="input-glass pr-12 cursor-default bg-surface-container-highest/50" readonly="" type="password" defaultValue="secret_key_1234567890"/>
<button className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
<span className="material-symbols-outlined" data-icon="visibility">visibility</span>
</button>
</div>
</div>
</div>
<div className="flex justify-end">
<button className="px-6 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors font-body-md text-body-md font-medium flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]" data-icon="sync">sync</span>
                            Rotate Keys
                        </button>
</div>
</section>
{/* Section 2: Event Listeners */}
<section className="glass-panel rounded-xl p-8 neon-glow-primary">
<div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-4">
<h3 className="font-body-lg text-body-lg font-semibold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-xl" data-icon="webhook">webhook</span>
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
<input className="input-glass flex-1 bg-surface-container-highest/50 text-tertiary-fixed-dim" readonly="" type="text" defaultValue="https://api.cyvault.io/v1/webhooks/incoming/rZP_992x"/>
<button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center" title="Copy to clipboard">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="content_copy">content_copy</span>
</button>
</div>
</div>
<div>
<label className="block font-label-mono text-label-mono text-on-surface-variant mb-2">Webhook Secret</label>
<div className="relative max-w-md">
<input className="input-glass pr-12 bg-surface-container-highest/50" readonly="" type="password" defaultValue="whsec_dummysecretkeyhere"/>
<button className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
<span className="material-symbols-outlined" data-icon="visibility">visibility</span>
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
<span className="material-symbols-outlined text-primary text-xl" data-icon="smart_toy">smart_toy</span>
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
<span className="material-symbols-outlined text-secondary text-[14px]" data-icon="warning">warning</span>
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
<button className="px-8 py-3 rounded-lg bg-primary text-on-primary font-body-md text-body-md font-bold hover:bg-primary-fixed transition-colors shadow-[0_0_15px_rgba(208,188,255,0.3)]">
                            Save Preferences
                        </button>
</div>
</section>
</div>
</div>
</main>

    </div>
  );
}
