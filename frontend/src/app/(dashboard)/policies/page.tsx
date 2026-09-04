"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Edit2, Trash2, AlertTriangle, Plus, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

export default function Policies() {
  return (
    <main className="flex-1 flex flex-col h-full relative w-full">
      <div className="flex-1 w-full max-w-container-max mx-auto h-full flex flex-col p-4 md:p-6 animate-fade-in-up">
        {/* Page Context */}
        <div className="mb-6">
          <p className="text-on-surface-variant max-w-2xl">Define, test, and deploy automated logic rules to mitigate risk and optimize revenue recovery strategies.</p>
        </div>
{/* 2-Column Grid */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start h-full pb-8">
{/* LEFT COLUMN: Active Policies List */}
<section className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 h-full">
<div className="flex items-center justify-between mb-2">
<div className="flex items-center gap-3">
<div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
<Shield size={20} className="text-primary" />
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">Active Policies</h3>
</div>
<span className="bg-surface-container-high border border-white/10 text-on-surface font-label-mono text-xs px-3 py-1 rounded-full">0 Rules</span>
</div>
{/* Policy List Container */}
<div className="flex flex-col gap-3 overflow-y-auto pr-2" style={{maxHeight: 'calc(100vh - 280px)'}}>
{/* Empty State */}
<div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/20 rounded-xl bg-white/5">
<AlertTriangle size={32} className="text-on-surface-variant mb-4 opacity-50" />
<h4 className="text-on-surface font-semibold mb-2">No Active Policies</h4>
<p className="text-sm text-on-surface-variant max-w-[200px] mb-4">Create your first automated recovery rule.</p>
</div>
{/* Add Button */}
<button className="mt-4 w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
<Plus size={20} />
                            Add New Policy
                        </button>
</div>
</section>
{/* RIGHT COLUMN: Create / Edit Policy (AI Workspace) */}
<section className="lg:col-span-7 xl:col-span-8 flex flex-col h-full mt-8 lg:mt-0">
<div className="glass-panel rounded-2xl p-1 flex flex-col h-full relative overflow-hidden">
{/* subtle animated background for the workspace */}
<div className="absolute inset-0 z-0 opacity-20 pointer-events-none">

</div>
<div className="relative z-10 p-6 md:p-8 flex flex-col h-full bg-background/95 rounded-[15px]">
<div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
<div className="p-2 bg-secondary/10 rounded-lg border border-secondary/20">
<Sparkles size={20} className="text-secondary" />
</div>
<div>
<h3 className="font-headline-md text-headline-md text-on-surface">Create / Edit Policy</h3>
<p className="text-xs font-label-mono text-on-surface-variant">Natural Language to Executable Logic</p>
</div>
</div>
{/* Input Area */}
<div className="flex-grow flex flex-col gap-4">
<label className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
                                    Describe your policy rule
                                </label>
<textarea className="w-full h-32 md:h-40 bg-[#0A0A0A] border border-primary/40 rounded-xl p-4 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" placeholder="e.g., Block transactions over $10k from new IPs..." defaultValue="If a customer has more than 2 chargebacks in the last 30 days, block all auto-retry attempts and flag for manual review."></textarea>
<div className="flex justify-end mt-2">
<button className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white/90 transition-colors shadow-sm">
<Sparkles size={20} />
                                        Compile Rule
                                    </button>
</div>
</div>
{/* Compiled Preview (Glassmorphism Card) */}
<div className="mt-8">
<div className="flex items-center gap-2 mb-3">
<Terminal size={16} className="text-on-surface-variant" />
<span className="text-sm font-medium text-on-surface-variant">Compiled Rule Preview</span>
</div>
<div className="glass-card rounded-xl p-5 border-l-4 border-l-primary relative overflow-hidden">
{/* Small glow effect inside card */}
<div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
<div className="flex justify-between items-center mb-4 relative z-10">
<span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-label-mono flex items-center gap-1">
<CheckCircle2 size={14} />
                                            Compiled Successfully
                                        </span>
<span className="text-xs font-label-mono text-on-surface-variant opacity-50">v1.0.4 • 12ms processing</span>
</div>
<div className="font-label-mono text-sm leading-relaxed text-on-surface-variant bg-[#050505] p-4 rounded-lg border border-white/5 relative z-10 overflow-x-auto">
<div className="flex mb-1"><span className="text-primary w-28 shrink-0">Rule:</span> <span className="text-on-surface">chargeback_block</span></div>
<div className="flex mb-1"><span className="text-primary w-28 shrink-0">Condition:</span> <span className="text-tertiary">customer.chargebacks_30d &gt; 2</span></div>
<div className="flex mb-1"><span className="text-primary w-28 shrink-0">Action:</span> <span className="text-error">BLOCK</span> <span className="ml-2 text-on-surface">auto-retry</span></div>
<div className="flex"><span className="text-primary w-28 shrink-0">Escalation:</span> <span className="text-secondary">FLAG</span> <span className="ml-2 text-on-surface">for manual review</span></div>
</div>
<div className="flex flex-col sm:flex-row gap-3 mt-6 relative z-10">
<button className="flex-1 bg-white text-black py-2.5 rounded-full font-bold hover:bg-white/90 transition-colors">
                                            Confirm &amp; Activate
                                        </button>
<button className="flex-1 border border-white/20 bg-transparent text-white py-2.5 rounded-full font-medium hover:bg-white/10 transition-colors">
                                            Edit Structure
                                        </button>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
</div>

    </main>
  );
}
