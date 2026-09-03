'use client';
import React, { useState } from 'react';
import { Key, Eye, Copy, ArrowRight, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Connect() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showApiSecret, setShowApiSecret] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    merchantName: '',
    companyName: '',
    businessEmail: '',
    password: '',
    industry: '',
    volume: '',
    apiKey: '',
    apiSecret: '',
    webhookSecret: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/merchants/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Save merchant_id to localStorage for future requests
        localStorage.setItem('merchant_id', data.merchant_id);
        // Set auth state
        login(formData.businessEmail);
        // Redirect to dashboard
        router.push('/recovery');
      } else {
        setError(data.detail || 'Failed to register account');
      }
    } catch (err) {
      setError('Connection to server failed. Ensure backend is running on port 8000.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md bg-[#030303] text-white">
      {/* Background fill to prevent subpixel white lines */}
      <div className="fixed inset-0 bg-[#030303] -z-50 pointer-events-none"></div>
      
      <main className="flex-grow flex flex-col items-center justify-start md:justify-center pt-8 md:pt-0 pb-16 px-margin-mobile md:px-margin-desktop w-full relative z-10 transform scale-100 md:scale-[1.03] origin-top md:origin-center">
        {/* Logo Area */}
        <div className="mt-4 md:mt-12 mb-6 flex flex-col items-center">
          <img alt="Cyvault Logo" className="w-14 h-14 mb-2 object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" src="/cyvault-logo-no-caption.png"/>
          <h1 className="font-[family-name:var(--font-orbitron)] text-[16px] font-bold text-white tracking-widest uppercase">CYVAULT</h1>
        </div>
        
        {/* Progress Stepper */}
        <div className="w-full max-w-[460px] flex items-center justify-center mb-4 gap-3 font-body-md text-[10px]">
          <div className="flex items-center gap-1.5 text-primary font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div>
            <span>1. Connect</span>
          </div>
          <div className="w-6 h-[1px] bg-outline-variant"></div>
          <div className="flex items-center gap-1.5 text-gray-400 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-surface-variant"></div>
            <span>2. Policies</span>
          </div>
          <div className="w-6 h-[1px] bg-outline-variant"></div>
          <div className="flex items-center gap-1.5 text-gray-400 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-surface-variant"></div>
            <span>3. Done</span>
          </div>
        </div>

        {/* Glassmorphism Card */}
        <div className="w-full max-w-[460px] rounded-xl p-4 md:p-5 relative group bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10">
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl -z-10 rounded-xl pointer-events-none"></div>
          
          {/* Header */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <Key size={14} className="text-primary" />
            <h2 className="font-headline-md text-[14px] font-bold text-white">Connect Your Razorpay Account</h2>
          </div>
          <p className="text-gray-400 text-[10px] font-body-md mb-4">Register your account and connect test-mode keys. No real money will be involved.</p>
          
          {/* Form Area */}
          <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-xs bg-red-500/10 p-2 rounded border border-red-500/20">{error}</div>}
            
            {/* Field: Merchant Name */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-medium text-gray-400 uppercase tracking-wider pl-1" htmlFor="merchantName">Merchant Name</label>
              <input value={formData.merchantName} onChange={handleChange} className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg px-2.5 py-1.5 font-label-mono text-[9px] text-white placeholder-gray-500 outline-none transition-all duration-200" id="merchantName" placeholder="John Doe" required type="text"/>
            </div>
            
            {/* Field: Company Name */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-medium text-gray-400 uppercase tracking-wider pl-1" htmlFor="companyName">Company / Store Name</label>
              <input value={formData.companyName} onChange={handleChange} className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg px-2.5 py-1.5 font-label-mono text-[9px] text-white placeholder-gray-500 outline-none transition-all duration-200" id="companyName" placeholder="Acme Electronics" required type="text"/>
            </div>
            
            <div className="grid grid-cols-2 gap-2.5">
              {/* Field: Business Email */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-medium text-gray-400 uppercase tracking-wider pl-1" htmlFor="businessEmail">Business Email</label>
                <input value={formData.businessEmail} onChange={handleChange} className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg px-2.5 py-1.5 font-label-mono text-[9px] text-white placeholder-gray-500 outline-none transition-all duration-200" id="businessEmail" placeholder="founder@acme.com" required type="email"/>
              </div>
              
              {/* Field: Create Password */}
              <div className="flex flex-col gap-1 relative">
                <label className="text-[9px] font-medium text-gray-400 uppercase tracking-wider pl-1" htmlFor="password">Create Password</label>
                <div className="relative">
                  <input value={formData.password} onChange={handleChange} className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg px-2.5 py-1.5 font-label-mono text-[9px] text-white placeholder-gray-500 outline-none transition-all duration-200 pr-8" id="password" placeholder="********" required type={showPassword ? "text" : "password"}/>
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors" type="button">
                    {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* 2-Column Grid for Industry & Volume */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-medium text-gray-400 uppercase tracking-wider pl-1" htmlFor="industry">Industry</label>
                <select value={formData.industry} onChange={handleChange} id="industry" required className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg px-2.5 py-1.5 font-label-mono text-[9px] text-white outline-none transition-all duration-200 appearance-none">
                  <option value="" className="bg-[#030303]">Select Industry</option>
                  <option value="ecommerce" className="bg-[#030303]">E-Commerce</option>
                  <option value="saas" className="bg-[#030303]">SaaS / Subscription</option>
                  <option value="edtech" className="bg-[#030303]">EdTech</option>
                  <option value="other" className="bg-[#030303]">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-medium text-gray-400 uppercase tracking-wider pl-1" htmlFor="volume">Monthly Txn Volume</label>
                <select value={formData.volume} onChange={handleChange} id="volume" required className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg px-2.5 py-1.5 font-label-mono text-[9px] text-white outline-none transition-all duration-200 appearance-none">
                  <option value="" className="bg-[#030303]">Select Volume</option>
                  <option value="low" className="bg-[#030303]">&lt; 10,000 / mo</option>
                  <option value="mid" className="bg-[#030303]">10,000 - 100,000 / mo</option>
                  <option value="high" className="bg-[#030303]">&gt; 100,000 / mo</option>
                </select>
              </div>
            </div>
            
            {/* Divider */}
            <div className="w-full h-[1px] bg-outline-variant/30 my-1"></div>
            
            {/* Field 1 */}
            <div className="flex flex-col gap-1 mt-2">
              <label className="text-[9px] font-medium text-gray-400 uppercase tracking-wider pl-1" htmlFor="apiKey">Razorpay API Key</label>
              <input value={formData.apiKey} onChange={handleChange} className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg px-2.5 py-1.5 font-label-mono text-[9px] text-white placeholder-gray-500 outline-none transition-all duration-200" id="apiKey" placeholder="rzp_test_XXXXXXXXX" required type="password"/>
            </div>
            
            {/* Field 2 */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-[9px] font-medium text-gray-400 uppercase tracking-wider pl-1" htmlFor="apiSecret">Razorpay API Secret</label>
              <div className="relative">
                <input value={formData.apiSecret} onChange={handleChange} className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg px-2.5 py-1.5 font-label-mono text-[9px] text-white placeholder-gray-500 outline-none transition-all duration-200 pr-8" id="apiSecret" placeholder="XXXXXXXX" required type={showApiSecret ? "text" : "password"}/>
                <button onClick={() => setShowApiSecret(!showApiSecret)} className="absolute right-2 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors" type="button">
                  {showApiSecret ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
            </div>
            
            {/* Field 3 */}
            <div className="flex flex-col gap-1">
              <label className="text-[8px] font-medium text-gray-400 uppercase tracking-wider pl-1" htmlFor="webhookSecret">Webhook Secret</label>
              <input value={formData.webhookSecret} onChange={handleChange} className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg px-2.5 py-1.5 font-label-mono text-[8px] text-white placeholder-gray-500 outline-none transition-all duration-200" id="webhookSecret" placeholder="whsec_XXXXXXXX" required type="password"/>
            </div>
            
            {/* Webhook Info Box */}
            <div className="glass-info rounded-lg p-2.5 mt-1 flex flex-col gap-2.5 bg-[#ffffff08] border border-[#ffffff1a]">
              <p className="font-body-md text-white text-[10px]">After connecting, add this webhook URL to your Razorpay Dashboard:</p>
              <div className="bg-[#030303] rounded border border-[#ffffff1a] p-1.5 flex justify-between items-center group">
                <code className="font-label-mono text-[9px] text-gray-300 truncate">https://your-domain.com/webhook/razorpay</code>
                <button className="text-gray-400 hover:text-primary transition-colors flex-shrink-0 ml-2 group-hover:opacity-100 opacity-70" title="Copy" type="button">
                  <Copy size={12} />
                </button>
              </div>
              <div>
                <p className="font-label-mono text-[9px] text-gray-400 mb-1">Required Events:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 bg-[#111] rounded text-[8px] font-label-mono text-white border border-[#ffffff1a]">payment.failed</span>
                  <span className="px-1.5 py-0.5 bg-[#111] rounded text-[8px] font-label-mono text-white border border-[#ffffff1a]">payment.captured</span>
                  <span className="px-1.5 py-0.5 bg-[#111] rounded text-[8px] font-label-mono text-white border border-[#ffffff1a]">settlement.processed</span>
                </div>
              </div>
            </div>
            
            {/* Animated Connection Line Visualization (Conceptual) */}
            <div className="w-full py-2">
              <div className="animated-line rounded-full opacity-50"></div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col items-center gap-2 mt-1">
              <button disabled={isSubmitting} className="w-full bg-white text-black px-4 py-1.5 rounded-lg text-[11px] font-bold hover:bg-white/90 transition-all duration-300 active:scale-[0.98] mt-1 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50" type="submit">
                {isSubmitting ? 'Connecting...' : 'Connect & Verify'}
              </button>
              <a className="font-body-md text-[10px] text-outline hover:text-primary transition-colors flex items-center gap-1 group" href="https://razorpay.com/docs/api/authentication/" target="_blank" rel="noopener noreferrer">
                Don't have Razorpay keys? Get them here
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="mt-2 text-center text-[10px] text-gray-400">
                Already have an account?{' '}
                <a href="/login" className="text-primary hover:text-white font-medium transition-colors duration-200">
                  Login here
                </a>
              </div>
            </div>
          </form>
          
        </div>
      </main>
    </div>
  );
}
