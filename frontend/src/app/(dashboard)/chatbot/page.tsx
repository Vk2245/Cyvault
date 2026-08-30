"use client";
import React, { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    {
      role: "agent",
      content: "Hi! I'm your Cyvault Insights Agent. Ask me anything about your transactions, customers, recovery, or settlements. I only share allowed data — no sensitive details like card numbers or PAN."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      
      if (!response.ok) throw new Error("API Error");
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: "agent", content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "agent", content: "⚠️ System offline: Cannot connect to FastAPI backend. Ensure uvicorn is running on port 8000." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
            <img alt="Chief Security Officer" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-BmCAH82It4lfISBYPJbgMmIWrki3tBU6d8dDonxSXtnIEf_smdS_1SJNnnu97QTF4rOpbvkqzSVj456pm2qGR98BGfWQ5zhEDXA6VbMgUCLD8XB7DLQopQMUMgQmTSYwxLIydzdM8tLqLM4P_HJ1ty-hWmm1ez_MBmEbLomhTPs38yg7Frty3aW7eFlru_2q1jwO97zMiZagLgul8P_xVWhs0D9QCdhomnh4oRxIkRzZCOU28Dey"/>
          </div>
        </div>
      </header>

      {/* Content Layout */}
      <div className="flex-1 p-margin-mobile md:p-margin-desktop flex gap-gutter overflow-hidden">
        {/* Left Column (Chat Interface) */}
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
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-[12px]">Online (Live with Groq)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat History Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col scrollbar-thin scrollbar-thumb-surface-variant scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center mt-1 border overflow-hidden ${msg.role === 'user' ? 'bg-surface-variant border-[#ffffff1a]' : 'bg-[rgba(59,130,246,0.1)] border-[#3B82F6]'}`}>
                  <span className={`material-symbols-outlined text-[18px] ${msg.role === 'user' ? 'text-on-surface-variant' : 'text-[#3B82F6]'}`}>
                    {msg.role === 'user' ? 'person' : 'smart_toy'}
                  </span>
                </div>
                <div className={`p-4 text-on-surface font-body-md text-body-md leading-relaxed ${msg.role === 'user' ? 'chat-bubble-user text-right' : 'chat-bubble-agent'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
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
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-[#ffffff1a] bg-[#ffffff02]">
            <div className="relative flex items-end gap-3">
              <button className="p-3 text-on-surface-variant hover:text-primary transition-colors flex-shrink-0 mb-1">
                <span className="material-symbols-outlined">attach_file</span>
              </button>
              <div className="flex-1 relative">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full glass-input rounded-xl py-4 pl-4 pr-12 text-on-surface font-body-md resize-none placeholder:text-on-surface-variant/50 focus:ring-0 overflow-hidden" 
                  placeholder="Ask about any customer, order, or metric... (Press Enter to send)" 
                  rows={1} 
                  style={{minHeight: '56px', maxHeight: '120px'}}
                />
              </div>
              <button onClick={handleSend} disabled={isLoading} className={`w-14 h-14 rounded-xl flex items-center justify-center transition-opacity flex-shrink-0 mb-[1px] ${isLoading || !input.trim() ? 'bg-surface-variant opacity-50' : 'bg-neon-primary hover:opacity-90'}`}>
                <span className="material-symbols-outlined text-[#141313]" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Quick Actions) */}
        <div className="hidden md:flex md:w-[30%] flex-col gap-6 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-surface-variant scrollbar-track-transparent">
          <div className="glass-panel rounded-xl p-6">
            <h3 className="font-headline-md text-[18px] font-semibold text-on-surface flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
              Suggested Questions
            </h3>
            <div className="flex flex-col gap-3">
              {["How many payments failed today?", "Show me the top 5 risky customers", "What's the settlement gap this week?"].map((q, idx) => (
                <button key={idx} onClick={() => { setInput(q); }} className="glass-button rounded-lg p-3 text-left font-body-md text-[14px] text-on-surface-variant hover:text-primary hover:border-primary transition-all flex items-center gap-3 group">
                  <span className="material-symbols-outlined text-[16px] opacity-50 group-hover:opacity-100">search</span>
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
