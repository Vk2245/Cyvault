import { ThemeToggle } from "@/components/theme-toggle";
import { Link as LinkIcon, PlayCircle, MessageSquare, ShieldAlert, RefreshCcw, BrainCircuit, Activity, Headset, Sliders, Send } from 'lucide-react';
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden bg-background text-on-background">
      
      <Navbar />
      <main className="flex-grow pt-[52px] flex flex-col">
        {/* Hero Section */}
        <section className="relative flex-grow flex flex-col items-center justify-center pb-16 px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-[#ffffff1a]">
          
          {/* Inline Video */}
          <div className="alchemy-light relative z-0 w-full max-w-[600px] md:max-w-[800px] mx-auto pointer-events-none flex justify-center">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-auto object-cover opacity-90 origin-top scale-x-[1.4] scale-y-[1.45] dark:mix-blend-screen"
              style={{ 
                maskImage: 'var(--hero-mask)', 
                WebkitMaskImage: 'var(--hero-mask)' 
              }}
              src="/hero-animation.mp4"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center mt-[80px] mb-8 flex flex-col items-center">
            <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-gray-950 dark:via-[#a78bfa]/40 to-transparent mb-6"></div>
            <h1 
              className="font-[family-name:var(--font-orbitron)] text-[32px] md:text-[40px] font-bold tracking-[0.15em] bg-clip-text text-transparent dark:drop-shadow-[0_0_20px_rgba(139,92,246,0.2)] uppercase"
              style={{ backgroundImage: 'linear-gradient(to right, var(--cyvault-start), var(--cyvault-mid), var(--cyvault-end))' }}
            >
              Cyvault
            </h1>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-4 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-medium text-primary tracking-wider text-xs uppercase">Cyvault Security Intelligence</span>
            </div>
            
            {/* AGGRESSIVE PITCH */}
            <h1 className="font-headline-lg text-[42px] md:text-[56px] text-on-surface max-w-4xl mx-auto leading-[1.1] tracking-tight drop-shadow-lg">
              You lose 15% to failed payments.<br className="hidden md:block"/> 
              <span className="bg-gradient-to-r from-primary via-[#a78bfa] to-secondary bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                And 2% to chargeback fraud.
              </span>
            </h1>
            <p className="font-body-lg text-[18px] md:text-[20px] text-on-surface-variant max-w-2xl mx-auto drop-shadow-md">
              CyVault plugs the leaks automatically. It acts as an autonomous Agentic AI that recovers lost carts, blocks fraud rings, and reconciles ledgers in real-time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <a href="/connect" className="w-full sm:w-auto bg-white dark:bg-white text-black px-8 py-3 rounded-full font-body-md font-medium hover:bg-white/90 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <LinkIcon size={16} />
                Connect Razorpay
              </a>
              <a href="/simulator" className="w-full sm:w-auto px-8 py-3 rounded-full font-body-md font-medium text-on-surface glass-panel hover:bg-white/10 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group">
                <PlayCircle size={16} className="group-hover:text-primary transition-colors" />
                Try Interactive Demo
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 mt-8 border-t border-[#ffffff1a]/30">
              <div className="flex flex-col items-center gap-2 glass-panel p-4 rounded-2xl">
                <span className="font-stat-lg text-stat-lg text-secondary drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">&lt;50ms</span>
                <span className="font-label-mono text-label-mono text-on-surface/70 uppercase tracking-widest text-xs">AI Response Time</span>
              </div>
              <div className="flex flex-col items-center gap-2 glass-panel p-4 rounded-2xl">
                <span className="font-stat-lg text-stat-lg text-primary drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">0</span>
                <span className="font-label-mono text-label-mono text-on-surface/70 uppercase tracking-widest text-xs">Policy Violations</span>
              </div>
              <div className="flex flex-col items-center gap-2 glass-panel p-4 rounded-2xl">
                <span className="font-stat-lg text-stat-lg text-on-surface drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">100%</span>
                <span className="font-label-mono text-label-mono text-on-surface/70 uppercase tracking-widest text-xs">Actions Explained</span>
              </div>
            </div>
          </div>
        </section>

        {/* Entity Graph Visual Section */}
        <section className="relative w-full py-20 px-margin-mobile md:px-margin-desktop bg-background z-10 border-b border-[#ffffff1a]/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-2">
                <Activity size={14} className="text-secondary" />
                <span className="font-medium text-secondary tracking-wider text-[10px] uppercase">Entity Graph AI</span>
              </div>
              <h2 className="font-headline-lg text-[32px] md:text-[40px] font-bold leading-tight">
                We don't just look at one transaction.
              </h2>
              <p className="text-on-surface-variant text-[16px] md:text-[18px]">
                CyVault maps millions of data points across merchants to identify fraud rings before they checkout. 
                If a bad actor attempts a velocity attack on Merchant A, their Device ID and IP are instantly blacklisted for Merchant B.
              </p>
            </div>
            
            <div className="flex-1 relative w-full min-h-[400px] md:h-[400px] glass-card rounded-3xl flex items-center justify-center overflow-hidden border border-[#ffffff1a] mt-8 md:mt-0 shadow-2xl">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background"></div>
              
              {/* Orbital Rings */}
              <div className="absolute w-[300px] h-[300px] rounded-full border border-secondary/20 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute w-[200px] h-[200px] rounded-full border border-[#00f5ff]/30 animate-[spin_8s_linear_infinite_reverse]"></div>
              <div className="absolute w-[100px] h-[100px] rounded-full border border-primary/40 animate-[spin_6s_linear_infinite]"></div>
              
              {/* Central Core */}
              <div className="absolute z-30 w-16 h-16 bg-[#0a0a0a] border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.8)]">
                <div className="w-8 h-8 bg-primary rounded-full animate-pulse flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,1)]">
                   <ShieldAlert size={16} className="text-white" />
                </div>
              </div>
              <div className="absolute z-30 top-[58%] text-[10px] font-label-mono text-white bg-primary/90 px-3 py-1 rounded-full border border-primary/50 shadow-lg backdrop-blur-md">Fraud Ring Detected</div>

              {/* Static Orbiting Nodes */}
              {/* Node 1 - Outer Ring */}
              <div className="absolute z-20 top-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                 <div className="w-6 h-6 bg-secondary/80 border-2 border-secondary-100 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"></div>
                 <div className="text-[9px] font-label-mono text-white bg-[#0a0a0a] px-2 py-0.5 rounded border border-secondary/50 shadow-md">Suspicious IP</div>
              </div>

              {/* Node 2 - Middle Ring */}
              <div className="absolute z-20 bottom-[20%] left-[25%] -translate-x-1/2 flex flex-col items-center gap-1">
                 <div className="w-5 h-5 bg-[#00f5ff]/80 border-2 border-white rounded-full shadow-[0_0_15px_rgba(0,245,255,0.8)] animate-bounce"></div>
                 <div className="text-[9px] font-label-mono text-[#00f5ff] bg-[#0a0a0a] px-2 py-0.5 rounded border border-[#00f5ff]/50 shadow-md">VPN Proxy</div>
              </div>

              {/* Node 3 - Outer Ring 2 */}
              <div className="absolute z-20 bottom-[25%] right-[10%] translate-x-1/2 flex flex-col items-center gap-1">
                 <div className="w-6 h-6 bg-pink-500/80 border-2 border-white rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)] animate-pulse"></div>
                 <div className="text-[9px] font-label-mono text-pink-300 bg-[#0a0a0a] px-2 py-0.5 rounded border border-pink-500/50 shadow-md">Shared Device</div>
              </div>

              {/* Scanning Radar Sweep */}
              <div className="absolute w-[300px] h-[300px] rounded-full overflow-hidden animate-[spin_4s_linear_infinite]">
                <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(from 0deg, transparent 0%, transparent 75%, rgba(139,92,246,0.1) 85%, rgba(59,130,246,0.5) 100%)' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section (Expanded Bento Grid) */}
        <section className="relative w-full pt-24 pb-12 px-margin-mobile md:px-margin-desktop bg-background z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline-md text-[32px] md:text-[48px] text-on-surface font-bold tracking-tight mb-4">
                The Complete Intelligence Suite
              </h2>
              <p className="text-on-surface-variant text-[16px] md:text-[18px] max-w-2xl mx-auto">
                Everything a modern merchant needs to stop fraud, recover lost revenue, and automate ledgers. All powered by advanced AI.
              </p>
            </div>

            {/* Asymmetrical Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Feature 1: AI Revenue Recovery (Span 2) */}
              <div className="glass-card p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] flex flex-col md:flex-row gap-8 justify-between min-h-[300px] md:col-span-2 overflow-hidden relative">
                <div className="z-10 max-w-sm">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                    <MessageSquare size={24} className="text-primary drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                  </div>
                  <h3 className="font-headline-md text-[24px] font-bold text-on-surface mb-3">
                    AI Revenue Recovery
                  </h3>
                  <p className="text-on-surface-variant text-[15px] leading-relaxed">
                    When a payment fails, our AI texts the customer instantly, negotiating a dynamic discount based on their risk profile to save the sale autonomously.
                  </p>
                </div>
                <div className="flex-1 relative h-[180px] w-full max-w-[280px] mx-auto flex items-start justify-center z-10 overflow-hidden mt-4 md:mt-0 mask-image-bottom-fade">
                  <div className="absolute top-2 w-full flex flex-col gap-3 opacity-100" style={{ animation: 'chat-scroll 16s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}>
                    <div className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white p-3 rounded-2xl rounded-tl-sm self-start text-[12px] border border-gray-300 dark:border-gray-700 shadow-md font-medium" style={{ animation: 'chat-bubble-1 16s ease infinite' }}>
                      Payment ₹4,999 failed.
                    </div>
                    <div className="bg-primary p-3 rounded-2xl rounded-tr-sm self-end text-[12px] border border-primary/30 text-white flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.4)]" style={{ animation: 'chat-bubble-2 16s ease infinite' }}>
                      Make it 15%?
                    </div>
                    <div className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white p-3 rounded-2xl rounded-tl-sm self-start text-[12px] border border-gray-300 dark:border-gray-700 shadow-md font-medium" style={{ animation: 'chat-bubble-3 16s ease infinite' }}>
                      I can do 10% maximum.
                    </div>
                    <div className="bg-primary p-3 rounded-2xl rounded-tr-sm self-end text-[12px] border border-primary/30 text-white flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.4)]" style={{ animation: 'chat-bubble-4 16s ease infinite' }}>
                      Okay, paying now.
                    </div>
                    <div className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white p-3 rounded-2xl rounded-tl-sm self-start text-[12px] border border-gray-300 dark:border-gray-700 shadow-md font-medium" style={{ animation: 'chat-bubble-5 16s ease infinite' }}>
                      Processing...
                    </div>
                    <div className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white p-3 rounded-2xl rounded-tl-sm self-start text-[12px] border border-gray-300 dark:border-gray-700 shadow-md font-medium flex items-center gap-2" style={{ animation: 'chat-bubble-6 16s ease infinite' }}>
                      <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center font-bold text-[10px] text-green-600 dark:text-green-400">✓</div>
                      Payment ₹4,500 recovered!
                    </div>
                  </div>
                </div>
                {/* Bg glow */}
                <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 blur-[100px] pointer-events-none"></div>
              </div>

              {/* Feature 2: Finance AI (Span 1) */}
              <div className="glass-card p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(167,139,250,0.15)] flex flex-col justify-between min-h-[300px] md:col-span-1 relative overflow-hidden">
                <div className="z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#a78bfa]/10 border border-[#a78bfa]/20 flex items-center justify-center mb-6">
                    <RefreshCcw size={24} className="text-[#a78bfa] drop-shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
                  </div>
                  <h3 className="font-headline-md text-[20px] font-bold text-on-surface mb-3">
                    Finance AI
                  </h3>
                  <p className="text-on-surface-variant text-[14px] leading-relaxed">
                    Instantly reconcile Razorpay webhooks against your ledger.
                  </p>
                </div>
                <div className="mt-6 flex flex-col items-center gap-2 w-full z-10 opacity-100 relative pt-4">
                  <div className="flex justify-between w-full relative h-10 items-center">
                    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-700 text-black dark:text-[#a78bfa] rounded-lg px-2 py-1 text-center text-[10px] font-label-mono font-bold z-10 shadow-md">Webhook</div>
                    <div className="absolute w-full h-[2px] bg-gray-200 dark:bg-[#a78bfa]/20 top-1/2 left-0 -translate-y-1/2 overflow-hidden rounded-full z-0">
                      <div className="w-4 h-full bg-primary dark:bg-[#a78bfa] rounded-full absolute shadow-[0_0_10px_rgba(139,92,246,0.8)]" style={{ animation: 'data-flow 2s linear infinite' }}></div>
                    </div>
                    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#a78bfa]/40 text-black dark:text-white rounded-lg px-2 py-1 text-center text-[10px] font-label-mono font-bold z-10 shadow-md flex items-center gap-1">Ledger ✓</div>
                  </div>
                </div>
              </div>

              {/* Feature 3: Strict Policy Engine (Span 1) */}
              <div className="glass-card p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(250,204,21,0.15)] flex flex-col justify-between min-h-[300px] md:col-span-1 relative overflow-hidden">
                <div className="z-10">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-6">
                    <Sliders size={24} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                  </div>
                  <h3 className="font-headline-md text-[20px] font-bold text-on-surface mb-3">
                    Strict Policy Engine
                  </h3>
                  <p className="text-on-surface-variant text-[14px] leading-relaxed">
                    Define hard limits on discounts. The AI operates strictly within rules.
                  </p>
                </div>
                <div className="mt-6 w-full bg-white dark:bg-[#050505] border border-gray-300 dark:border-gray-700 rounded-xl p-4 z-10 shadow-md flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-[11px] font-bold text-gray-900 dark:text-gray-300">
                      <span>Max Discount</span>
                      <span className="text-yellow-600 dark:text-yellow-500">10%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-yellow-400 rounded-full" style={{ animation: 'slider-fill 4s ease-in-out infinite' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-gray-900 dark:text-gray-300">Auto-Approve</span>
                    <div className="w-8 h-4 rounded-full relative transition-colors shadow-inner" style={{ animation: 'toggle-bg 4s ease-in-out infinite' }}>
                       <div className="w-3 h-3 bg-white rounded-full absolute top-[2px] shadow-md transition-transform" style={{ animation: 'slider-handle-fix 4s ease-in-out infinite' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 4: Support AI (Span 1) */}
              <div className="glass-card p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(244,114,182,0.15)] flex flex-col justify-between min-h-[300px] md:col-span-1 relative overflow-hidden">
                <div className="z-10">
                  <div className="w-14 h-14 rounded-2xl bg-pink-400/10 border border-pink-400/20 flex items-center justify-center mb-6">
                    <Headset size={24} className="text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]" />
                  </div>
                  <h3 className="font-headline-md text-[20px] font-bold text-on-surface mb-3">
                    Support AI
                  </h3>
                  <p className="text-on-surface-variant text-[14px] leading-relaxed">
                    Merchant dashboard visibility for tickets. CyVault handles chargeback inquiries for you.
                  </p>
                </div>
                <div className="mt-6 w-full bg-gray-100 dark:bg-[#ffffff0a] border border-gray-200 dark:border-[#ffffff1a] rounded-lg p-4 z-10 shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-label-mono font-bold text-gray-800 dark:text-gray-300">Ticket #992</span>
                    <span className="text-[10px] font-label-mono font-bold px-2 py-0.5 rounded-full border" style={{ animation: 'ticket-resolve 6s ease-in-out infinite' }}></span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-full h-[1px] bg-gray-200 dark:bg-[#ffffff1a]"></div>
                    <div className="text-[10px] font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                      CyVault AI automatically verified delivery proof and submitted evidence to bank.
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 5: Entity Graph Shield (Span 1) */}
              <div className="glass-card p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col justify-between min-h-[300px] md:col-span-1 relative overflow-hidden">
                <div className="z-10">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6">
                    <ShieldAlert size={24} className="text-secondary drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  </div>
                  <h3 className="font-headline-md text-[20px] font-bold text-on-surface mb-3">
                    Graph Shield
                  </h3>
                  <p className="text-on-surface-variant text-[14px] leading-relaxed">
                    Defeat fraud rings. CyVault blocks bad actors globally.
                  </p>
                </div>
                <div className="mt-6 relative h-24 w-full flex items-center justify-center z-10 opacity-100">
                  {/* Central Fraudster */}
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center z-20" style={{ animation: 'node-pulse-red 2s infinite' }}>
                    <ShieldAlert size={12} className="text-red-500"/>
                  </div>
                  {/* Connecting Lines */}
                  <div className="absolute w-[80%] h-[2px] bg-red-500/50" style={{ animation: 'fade-out-early 4s infinite' }}></div>
                  
                  {/* Block Shield Slam */}
                  <div className="absolute z-30" style={{ animation: 'shield-slam 4s infinite' }}>
                     <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border-2 border-red-500 text-red-500 font-bold shadow-2xl text-[16px]">🚫</div>
                  </div>
                  
                  {/* Outer Nodes */}
                  <div className="absolute left-2 w-5 h-5 rounded-full bg-surface border-2 border-secondary z-10" style={{ animation: 'node-block 4s infinite' }}></div>
                  <div className="absolute right-2 w-5 h-5 rounded-full bg-surface border-2 border-secondary z-10" style={{ animation: 'node-block 4s infinite' }}></div>
                </div>
              </div>

              {/* Feature 6: CyVault AI (Span 3 - Massive Bottom Banner) */}
              <div className="glass-card p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,245,255,0.15)] flex flex-col md:flex-row gap-8 justify-between min-h-[350px] md:col-span-3 overflow-hidden relative">
                <div className="z-10 max-w-md">
                  <div className="w-14 h-14 rounded-2xl bg-[#00f5ff]/10 border border-[#00f5ff]/20 flex items-center justify-center mb-6">
                    <BrainCircuit size={24} className="text-[#00f5ff] drop-shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
                  </div>
                  <h3 className="font-headline-md text-[24px] font-bold text-on-surface mb-3">
                    CyVault AI
                  </h3>
                  <p className="text-on-surface-variant text-[15px] leading-relaxed">
                    Chat with your ledger. Ask <span className="font-bold">"Why did revenue drop yesterday?"</span> and get instant, RAG-powered SQL analytics derived directly from your payments. No more exporting CSVs.
                  </p>
                </div>
                <div className="flex-1 relative min-h-[200px] flex items-center justify-center z-10 w-full mt-4 md:mt-0">
                  <div className="w-full max-w-md bg-[#050505] border border-gray-700 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                    <div className="bg-[#111] px-4 py-2 border-b border-gray-700 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                      <span className="text-[11px] font-label-mono text-gray-400 ml-2">cyvault-terminal</span>
                    </div>
                    <div className="p-4 flex flex-col font-label-mono text-[13px] relative flex-1">
                      <div className="text-white font-bold whitespace-nowrap overflow-hidden inline-block" style={{ animation: 'text-type-1 8s infinite' }}>
                        <span className="text-pink-400 mr-2">{'>'}</span>Show chargeback reasons
                      </div>
                      <div className="text-[#00f5ff] font-bold flex items-center gap-2 opacity-0 mt-3" style={{ animation: 'fade-in-late 8s infinite' }}>
                        <RefreshCcw size={14} className="animate-spin-slow" /> Generated instantly
                      </div>
                      <div className="mt-4 flex items-end gap-3 h-16 w-full border-b border-gray-700 pb-1 opacity-0" style={{ animation: 'fade-in-late 8s infinite' }}>
                        <div className="w-8 bg-blue-500/80 rounded-t-sm shadow-[0_0_10px_rgba(59,130,246,0.5)] origin-bottom" style={{ height: '80%', animation: 'bar-grow-1 8s infinite' }}></div>
                        <div className="w-8 bg-purple-500/80 rounded-t-sm shadow-[0_0_10px_rgba(168,85,247,0.5)] origin-bottom" style={{ height: '50%', animation: 'bar-grow-2 8s infinite' }}></div>
                        <div className="w-8 bg-pink-500/80 rounded-t-sm shadow-[0_0_10px_rgba(236,72,153,0.5)] origin-bottom" style={{ height: '90%', animation: 'bar-grow-3 8s infinite' }}></div>
                        <div className="w-8 bg-[#00f5ff]/80 rounded-t-sm shadow-[0_0_10px_rgba(0,245,255,0.5)] origin-bottom" style={{ height: '60%', animation: 'bar-grow-4 8s infinite' }}></div>
                      </div>
                      {/* User Input Mock */}
                      <div className="mt-4 flex items-center bg-[#1a1a1a] border border-gray-700 rounded-lg p-1.5 opacity-0" style={{ animation: 'fade-in-late 8s infinite' }}>
                        <span className="text-gray-500 text-[10px] pl-2 flex-1">Ask a follow up question...</span>
                        <div className="bg-primary p-1.5 rounded-md flex items-center justify-center">
                          <MessageSquare size={10} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Bg glow */}
                <div className="absolute left-[40%] bottom-[-30%] w-1/2 h-[80%] bg-[#00f5ff]/5 blur-[120px] pointer-events-none"></div>
              </div>

            </div>
          </div>
        </section>

        {/* Dedicated Chatbot Section */}
        <section className="relative w-full pt-8 pb-24 px-margin-mobile md:px-margin-desktop bg-surface dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-[#ffffff1a]/30">
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BrainCircuit size={14} className="text-primary" />
              <span className="font-medium text-primary tracking-wider text-[10px] uppercase">CyVault Co-Pilot</span>
            </div>
            <h2 className="font-headline-md text-[32px] md:text-[48px] text-gray-900 dark:text-white font-bold tracking-tight mb-4 text-center">
              Meet your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00f5ff]">Financial AI</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-[16px] md:text-[18px] max-w-2xl mx-auto text-center mb-12">
              Talk to your ledger in plain English. Ask for revenue metrics, refund statuses, or chargeback analysis, and get instant answers.
            </p>
            
            <div className="w-full max-w-3xl rounded-2xl border border-gray-200 dark:border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col bg-white dark:bg-[#111]">
               {/* Chat Header */}
               <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-[#0a0a0a]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shadow-inner border border-primary/30">
                       <BrainCircuit className="text-primary" size={20}/>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-[15px]">CyVault Intelligence</h3>
                      <p className="text-[11px] text-green-600 dark:text-green-400 flex items-center gap-1.5 font-medium"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online & connected to your ledger</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  </div>
               </div>
               
               {/* Chat Body */}
               <div className="relative p-6 h-[400px] overflow-hidden bg-white dark:bg-transparent mask-image-bottom-fade">
                  <div className="absolute top-6 left-6 right-6 flex flex-col gap-6" style={{ animation: 'merchant-chat-scroll 24s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}>
                    
                    {/* Message 1 */}
                    <div className="self-end max-w-[85%] bg-primary text-white p-4 rounded-2xl rounded-tr-sm shadow-md text-[14px]" style={{ animation: 'm-bubble-1 24s ease infinite' }}>
                       What was our total revenue yesterday and how many refunds were processed?
                    </div>
                    
                    {/* Bot Response 1 */}
                    <div className="self-start max-w-[85%] flex gap-4" style={{ animation: 'm-bubble-2 24s ease infinite' }}>
                       <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-1 border border-primary/30">
                          <BrainCircuit className="text-primary" size={14}/>
                       </div>
                       <div className="bg-gray-50 dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200 p-4 rounded-2xl rounded-tl-sm shadow-sm border border-gray-200 dark:border-gray-800 text-[14px]">
                          Yesterday's total revenue was <strong className="text-black dark:text-white">₹12,45,000</strong> across 4,200 successful transactions. 
                          <br/><br/>
                          We processed <strong className="text-black dark:text-white">12 refunds</strong> totaling ₹45,000. Interestingly, 8 of these were from the same BIN (Credit Card ending in 4421). I've flagged this for review in the Graph Shield.
                       </div>
                    </div>
                    
                    {/* Message 2 */}
                    <div className="self-end max-w-[85%] bg-primary text-white p-4 rounded-2xl rounded-tr-sm shadow-md text-[14px]" style={{ animation: 'm-bubble-3 24s ease infinite' }}>
                       Show me a breakdown of payment methods used.
                    </div>
                    
                    {/* Bot Response 2 */}
                    <div className="self-start max-w-[85%] flex gap-4" style={{ animation: 'm-bubble-4 24s ease infinite' }}>
                       <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-1 border border-primary/30">
                          <BrainCircuit className="text-primary" size={14}/>
                       </div>
                       <div className="bg-gray-50 dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200 p-4 rounded-2xl rounded-tl-sm shadow-sm border border-gray-200 dark:border-gray-800 w-full text-[14px]">
                          Here is the breakdown of your volume by payment method for yesterday:
                          <div className="mt-4 flex flex-col gap-3 font-label-mono text-[12px]">
                             <div className="flex items-center gap-3"><div className="w-24 text-gray-600 dark:text-gray-400">UPI</div><div className="h-2 bg-primary rounded-full w-[60%]"></div><span className="font-bold text-gray-900 dark:text-white">60%</span></div>
                             <div className="flex items-center gap-3"><div className="w-24 text-gray-600 dark:text-gray-400">Credit Card</div><div className="h-2 bg-[#00f5ff] rounded-full w-[25%]"></div><span className="font-bold text-gray-900 dark:text-white">25%</span></div>
                             <div className="flex items-center gap-3"><div className="w-24 text-gray-600 dark:text-gray-400">Netbanking</div><div className="h-2 bg-pink-500 rounded-full w-[10%]"></div><span className="font-bold text-gray-900 dark:text-white">10%</span></div>
                             <div className="flex items-center gap-3"><div className="w-24 text-gray-600 dark:text-gray-400">Wallets</div><div className="h-2 bg-yellow-500 rounded-full w-[5%]"></div><span className="font-bold text-gray-900 dark:text-white">5%</span></div>
                          </div>
                       </div>
                    </div>

                    {/* Message 3 */}
                    <div className="self-end max-w-[85%] bg-primary text-white p-4 rounded-2xl rounded-tr-sm shadow-md text-[14px]" style={{ animation: 'm-bubble-5 24s ease infinite' }}>
                       Are there any high-risk alerts right now?
                    </div>
                    
                    {/* Bot Response 3 */}
                    <div className="self-start max-w-[85%] flex gap-4" style={{ animation: 'm-bubble-6 24s ease infinite' }}>
                       <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-1 border border-primary/30">
                          <BrainCircuit className="text-primary" size={14}/>
                       </div>
                       <div className="bg-gray-50 dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200 p-4 rounded-2xl rounded-tl-sm shadow-sm border border-gray-200 dark:border-gray-800 text-[14px]">
                          Yes, we just blocked <strong className="text-red-500">3 fraud attempts</strong> from a known proxy network originating in Eastern Europe. The Graph Shield isolated the IP cluster successfully. No revenue was lost.
                       </div>
                    </div>
                  </div>
               </div>
               
               {/* Chat Input */}
               <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111]">
                  <div className="relative">
                     <input type="text" disabled placeholder="Ask CyVault anything about your business..." className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-full py-3.5 pl-6 pr-14 text-[14px] text-gray-900 dark:text-white outline-none shadow-inner" />
                     <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center shadow-md">
                        <Send size={14} />
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-background border-t border-[#ffffff1a]">
        <div className="flex items-center justify-center gap-2 px-gutter max-w-container-max mx-auto opacity-80">
          <img alt="Cyvault Logo" className="w-5 h-5 object-contain" src="/cyvault-logo-no-caption.png"/>
          <span className="font-[family-name:var(--font-orbitron)] text-[14px] font-bold text-on-surface tracking-widest">CYVAULT</span>
          <span className="font-body-md text-[12px] text-on-surface-variant ml-2">
            © 2026. All rights reserved.
          </span>
        </div>
      </footer>

    </div>
  );
}
