'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const authState = localStorage.getItem('cyvault_auth');
    if (authState) {
      try {
        const parsed = JSON.parse(authState);
        setIsAuthenticated(parsed.isAuthenticated);
        setUser(parsed.user);
      } catch (e) {
        console.error("Error parsing auth state", e);
      }
    }
  }, []);

  const login = (email: string) => {
    const newState = { isAuthenticated: true, user: { email } };
    setIsAuthenticated(true);
    setUser(newState.user);
    localStorage.setItem('cyvault_auth', JSON.stringify(newState));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('cyvault_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
