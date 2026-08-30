import React from 'react';

export default function Chatbot() {
  return (
    <main className="flex flex-col relative w-full overflow-hidden" style={{ height: 'calc(100vh / 0.9)' }}>

{/* TopAppBar */}
<header className="bg-surface dark:bg-surface text-primary dark:text-primary font-headline-md text-headline-md docked full-width top-0 sticky z-40 border-b border-[#ffffff1a] backdrop-blur-xl bg-[#ffffff08] flex justify-between items-center h-16 px-margin-desktop">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined cursor-pointer hover:text-secondary dark:hover:text-secondary hover:opacity-80 transition-opacity">search</span>
<h2 className="text-headline-md font-headline-md font-bold text-primary dark:text-primary">Recovery Command</h2>
</div>
<div className="flex items-center gap-6">
<span className="material-symbols-outlined cursor-pointer text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary hover:opacity-80 transition-opacity">notifications</span>
<span className="material-symbols-outlined cursor-pointer text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary hover:opacity-80 transition-opacity">history_edu</span>
<span className="material-symbols-outlined cursor-pointer text-on-surface-variant dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary hover:opacity-80 transition-opacity">account_circle</span>
<div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden border border-[#ffffff1a]">
<img alt="Chief Security Officer" className="w-full h-full object-cover" data-alt="A futuristic, high-contrast headshot of a Chief Security Officer in a neon-lit command center, cyberpunk aesthetic, deep shadows, electric violet and neon gold accents, hyper-realistic, 8k resolution." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-BmCAH82It4lfISBYPJbgMmIWrki3tBU6d8dDonxSXtnIEf_smdS_1SJNnnu97QTF4rOpbvkqzSVj456pm2qGR98BGfWQ5zhEDXA6VbMgUCLD8XB7DLQopQMUMgQmTSYwxLIydzdM8tLqLM4P_HJ1ty-hWmm1ez_MBmEbLomhTPs38yg7Frty3aW7eFlru_2q1jwO97zMiZagLgul8P_xVWhs0D9QCdhomnh4oRxIkRzZCOU28Dey"/>
</div>
</div>
</header>
{/* Content Layout */}
<div className="flex-1 p-margin-mobile md:p-margin-desktop flex gap-gutter overflow-hidden">
{/* Left Column (Chat Interface) - 70% on desktop */}
<div className="flex-1 md:w-[70%] flex flex-col h-full glass-panel rounded-xl overflow-hidden">
{/* Chat Header */}
<div className="p-6 border-b border-[#ffffff1a] flex items-center justify-between bg-[#ffffff05]">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-[rgba(59,130,246,0.1)] border border-[#3B82F6] flex items-center justify-center relative">
<span className="material-symbols-outlined text-[#3B82F6]">smart_toy</span>
<span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#141313]"></span>
</div>
<div>
<h3 className="font-headline-md text-[20px] font-semibold text-on-surface">Cyvault Insights Agent</h3>
<div className="flex items-center gap-2">
<span className="text-emerald-500 text-xs">●</span>
<span className="font-label-mono text-label-mono text-on-surface-variant text-[12px]">Online</span>
</div>
</div>
</div>
<div className="font-label-mono text-label-mono text-on-surface-variant text-[12px] bg-[#ffffff0a] px-3 py-1 rounded-full border border-[#ffffff1a]">
                        Powered by Groq
                    </div>
</div>
{/* Chat History Area */}
<div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col scrollbar-thin scrollbar-thumb-surface-variant scrollbar-track-transparent">
{/* Agent Message 1 */}
<div className="flex gap-4 max-w-[85%]">
<div className="w-8 h-8 flex-shrink-0 rounded-full bg-[rgba(59,130,246,0.1)] border border-[#3B82F6] flex items-center justify-center mt-1">
<span className="material-symbols-outlined text-[#3B82F6] text-[18px]">smart_toy</span>
</div>
<div className="chat-bubble-agent p-4 text-on-surface font-body-md text-body-md leading-relaxed">
                            Hi! I'm your Cyvault Insights Agent. Ask me anything about your transactions, customers, recovery, or settlements. I only share allowed data — no sensitive details like card numbers or PAN.
                        </div>
</div>
{/* User Message 1 */}
<div className="flex gap-4 max-w-[85%] self-end flex-row-reverse">
<div className="w-8 h-8 flex-shrink-0 rounded-full bg-surface-variant border border-[#ffffff1a] overflow-hidden mt-1">
<span className="material-symbols-outlined text-on-surface-variant text-[18px] w-full h-full flex items-center justify-center">person</span>
</div>
<div className="chat-bubble-user p-4 text-on-surface font-body-md text-body-md leading-relaxed text-right">
                            Show me all failed transactions for customer Ravi
                        </div>
</div>
{/* Agent Message 2 */}
<div className="flex gap-4 max-w-[85%]">
<div className="w-8 h-8 flex-shrink-0 rounded-full bg-[rgba(59,130,246,0.1)] border border-[#3B82F6] flex items-center justify-center mt-1">
<span className="material-symbols-outlined text-[#3B82F6] text-[18px]">smart_toy</span>
</div>
<div className="chat-bubble-agent p-4 text-on-surface font-body-md text-body-md leading-relaxed space-y-3">
<p>Ravi Sharma (C-045) has 3 failed transactions:</p>
<div className="space-y-2 font-label-mono text-label-mono text-[13px] bg-[#00000033] p-3 rounded-lg border border-[#ffffff0a]">
<div className="flex gap-2"><span>•</span><span>Order #4521 — ₹2,499 — Network Timeout — ✅ RECOVERED</span></div>
<div className="flex gap-2"><span>•</span><span>Order #4102 — ₹1,200 — Insufficient Funds — ⏳ Pending Recovery</span></div>
<div className="flex gap-2 text-[#ffb4ab]"><span>•</span><span>Order #3890 — ₹8,500 — Bank Declined — 🚫 Not Retried (risk score: HIGH)</span></div>
</div>
<div className="pt-2 border-t border-[#ffffff1a] font-label-mono text-label-mono text-[13px]">
<span className="text-on-surface-variant">Total at risk:</span> ₹12,199 | <span className="text-emerald-400">Recovered:</span> ₹2,499 (20.5%)
                            </div>
</div>
</div>
{/* User Message 2 */}
<div className="flex gap-4 max-w-[85%] self-end flex-row-reverse">
<div className="w-8 h-8 flex-shrink-0 rounded-full bg-surface-variant border border-[#ffffff1a] overflow-hidden mt-1">
<span className="material-symbols-outlined text-on-surface-variant text-[18px] w-full h-full flex items-center justify-center">person</span>
</div>
<div className="chat-bubble-user p-4 text-on-surface font-body-md text-body-md leading-relaxed text-right">
                            Why wasn't order #3890 retried?
                        </div>
</div>
{/* Agent Message 3 */}
<div className="flex gap-4 max-w-[85%]">
<div className="w-8 h-8 flex-shrink-0 rounded-full bg-[rgba(59,130,246,0.1)] border border-[#3B82F6] flex items-center justify-center mt-1">
<span className="material-symbols-outlined text-[#3B82F6] text-[18px]">smart_toy</span>
</div>
<div className="chat-bubble-agent p-4 text-on-surface font-body-md text-body-md leading-relaxed space-y-3">
<p>Order #3890 was not retried because:</p>
<ol className="list-decimal pl-5 space-y-1 font-label-mono text-label-mono text-[13px] text-on-surface-variant">
<li>Amount ₹8,500 exceeds your policy 'retry_under_5k' (₹5,000 limit)</li>
<li>Customer risk score: <span className="text-[#ffb4ab]">0.72</span> — above your threshold of 0.7</li>
<li>Decision: <span className="text-secondary bg-[#ee980033] px-1 rounded">NEEDS_APPROVAL</span> — awaiting your manual review</li>
</ol>
<div className="flex items-center gap-2 text-primary font-label-mono text-[13px] pt-2">
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                Action needed: Approve or dismiss in Recovery Dashboard
                            </div>
</div>
</div>
{/* Loading Indicator (Simulated active state) */}
<div className="flex gap-4 max-w-[85%] opacity-70">
<div className="w-8 h-8 flex-shrink-0 rounded-full bg-[rgba(59,130,246,0.1)] border border-[#3B82F6] flex items-center justify-center mt-1">
<span className="material-symbols-outlined text-[#3B82F6] text-[18px]">smart_toy</span>
</div>
<div className="chat-bubble-agent p-4 flex items-center gap-1 h-[52px]">
<div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
<div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
<div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
</div>
</div>
</div>
{/* Input Area */}
<div className="p-6 border-t border-[#ffffff1a] bg-[#ffffff02]">
<div className="relative flex items-end gap-3">
<button className="p-3 text-on-surface-variant hover:text-primary transition-colors flex-shrink-0 mb-1">
<span className="material-symbols-outlined">attach_file</span>
</button>
<div className="flex-1 relative">
<textarea className="w-full glass-input rounded-xl py-4 pl-4 pr-12 text-on-surface font-body-md resize-none placeholder:text-on-surface-variant/50 focus:ring-0 overflow-hidden" placeholder="Ask about any customer, order, or metric..." rows={1} style={{minHeight: '56px', maxHeight: '120px'}}></textarea>
<button className="absolute right-3 bottom-3 p-1 text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">mic</span>
</button>
</div>
<button className="w-14 h-14 bg-neon-primary rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0 mb-[1px]">
<span className="material-symbols-outlined text-[#141313]" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
</button>
</div>
</div>
</div>
{/* Right Column (Quick Actions) - 30% on desktop, hidden on mobile */}
<div className="hidden md:flex md:w-[30%] flex-col gap-6 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-surface-variant scrollbar-track-transparent">
{/* Suggested Questions */}
<div className="glass-panel rounded-xl p-6">
<h3 className="font-headline-md text-[18px] font-semibold text-on-surface flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
                        Suggested Questions
                    </h3>
<div className="flex flex-col gap-3">
<button className="glass-button rounded-lg p-3 text-left font-body-md text-[14px] text-on-surface-variant hover:text-primary hover:border-primary transition-all flex items-center gap-3 group">
<span className="material-symbols-outlined text-[16px] opacity-50 group-hover:opacity-100">search</span>
                            How many payments failed today?
                        </button>
<button className="glass-button rounded-lg p-3 text-left font-body-md text-[14px] text-on-surface-variant hover:text-primary hover:border-primary transition-all flex items-center gap-3 group">
<span className="material-symbols-outlined text-[16px] opacity-50 group-hover:opacity-100">search</span>
                            Show me the top 5 risky customers
                        </button>
<button className="glass-button rounded-lg p-3 text-left font-body-md text-[14px] text-on-surface-variant hover:text-primary hover:border-primary transition-all flex items-center gap-3 group">
<span className="material-symbols-outlined text-[16px] opacity-50 group-hover:opacity-100">search</span>
                            What's the settlement gap this week?
                        </button>
<button className="glass-button rounded-lg p-3 text-left font-body-md text-[14px] text-on-surface-variant hover:text-primary hover:border-primary transition-all flex items-center gap-3 group">
<span className="material-symbols-outlined text-[16px] opacity-50 group-hover:opacity-100">search</span>
                            Which intervention works best?
                        </button>
<button className="glass-button rounded-lg p-3 text-left font-body-md text-[14px] text-on-surface-variant hover:text-primary hover:border-primary transition-all flex items-center gap-3 group">
<span className="material-symbols-outlined text-[16px] opacity-50 group-hover:opacity-100">search</span>
                            Show fraud ring details
                        </button>
</div>
</div>
{/* Data Access Info */}
<div className="glass-panel rounded-xl p-6 relative overflow-hidden">
<div className="absolute -right-10 -top-10 w-32 h-32 bg-primary opacity-5 blur-[50px] rounded-full"></div>
<h3 className="font-headline-md text-[18px] font-semibold text-on-surface flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-secondary text-[20px]">shield</span>
                        Data Access Info
                    </h3>
<div className="space-y-4">
<div className="p-3 bg-[#00000033] border border-[#ffffff0a] rounded-lg">
<div className="flex items-center gap-2 text-emerald-400 font-label-mono text-[12px] mb-2">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
                                VISIBLE TO AGENT
                            </div>
<p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                                Transaction IDs, amounts, status, reasons, risk category, timelines.
                            </p>
</div>
<div className="p-3 bg-[#00000033] border border-[#ffffff0a] rounded-lg">
<div className="flex items-center gap-2 text-[#ffb4ab] font-label-mono text-[12px] mb-2">
<span className="material-symbols-outlined text-[16px]">cancel</span>
                                RESTRICTED DATA
                            </div>
<p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                                Card numbers, CVV, bank accounts, PAN, full addresses.
                            </p>
</div>
</div>
<div className="mt-6 pt-4 border-t border-[#ffffff1a] flex justify-between items-center">
<span className="font-label-mono text-[11px] text-on-surface-variant opacity-70">COMPLIANCE PROTOCOL ACTIVE</span>
<div className="flex gap-1">
<div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
<div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{animationDelay: '200ms'}}></div>
<div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{animationDelay: '400ms'}}></div>
</div>
</div>
</div>
</div>
</div>

    </main>
  );
}
