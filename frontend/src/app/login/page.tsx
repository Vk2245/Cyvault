'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      router.push('/recovery');
    }
  };

  return (
    <div className="antialiased min-h-screen flex flex-col font-body-md bg-[#030303] text-white overflow-hidden relative">
      
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>

      {/* Top Navbar Simple */}
      <nav className="w-full z-50 p-6 absolute top-0 left-0">
        <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200">
          <ArrowLeft size={16} />
          <span className="text-[14px] font-medium tracking-wide">Back to Home</span>
        </a>
      </nav>

      <main className="flex-grow flex items-center justify-center p-4">
        {/* Glassmorphic Login Card */}
        <div className="w-full max-w-md p-8 md:p-10 flex flex-col items-center shadow-2xl relative overflow-hidden bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 rounded-3xl">
          
          {/* Top border highlight */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

          {/* Logo */}
          <img alt="Cyvault Logo" className="w-12 h-12 object-contain mb-6 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]" src="/cyvault-logo-no-caption.png"/>
          
          <h1 className="font-headline-md text-[28px] font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-400 text-[14px] mb-8 text-center">Enter your credentials to access your secure vault.</p>

          <form className="w-full space-y-5" onSubmit={handleLogin}>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-gray-400 uppercase tracking-wider pl-1">Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-500 outline-none transition-all duration-200"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center pl-1">
                <label className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">Password</label>
                <a href="#" className="text-[12px] text-primary hover:text-white transition-colors duration-200">Forgot?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-[#ffffff05] border border-[#ffffff1a] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-500 outline-none transition-all duration-200"
                required
              />
            </div>

            <button type="submit" className="w-full bg-white text-black px-4 py-3 rounded-xl text-[14px] font-bold hover:bg-white/90 transition-all duration-300 active:scale-[0.98] mt-4 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Log In
            </button>
          </form>

          <div className="mt-8 text-center text-[14px] text-gray-400">
            Don't have an account?{' '}
            <a href="/connect" className="text-primary hover:text-white font-medium transition-colors duration-200">
              Get Started
            </a>
          </div>

        </div>
      </main>

    </div>
  );
}
