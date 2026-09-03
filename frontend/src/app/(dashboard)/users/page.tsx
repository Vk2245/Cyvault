"use client";
import React, { useState, useEffect } from 'react';
import { Menu, Search, Filter, User, Users as UsersIcon, Smartphone, Calendar, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Users() {
  const { merchantId } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!merchantId) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/merchants/${merchantId}/customers`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
    
    // Poll every 3 seconds for live updates in demo
    const interval = setInterval(fetchUsers, 3000);
    return () => clearInterval(interval);
  }, [merchantId]);

  return (
    <main className="flex-1 flex flex-col h-full relative w-full text-white">
      <div className="flex-1 w-full max-w-container-max mx-auto p-4 md:p-6 flex flex-col gap-6 animate-fade-in-up">
        {loading && users.length === 0 ? (
           <div className="flex justify-center items-center h-64 text-on-surface-variant">Loading users...</div>
        ) : users.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-64 text-center glass-panel rounded-2xl p-12">
             <UsersIcon size={48} className="text-primary mb-4 opacity-50" />
             <h3 className="text-xl font-semibold mb-2">No users yet</h3>
             <p className="text-on-surface-variant max-w-md">Users will appear here when they register or transact. Run the Simulator to see your first customer.</p>
           </div>
        ) : (
           <div className="glass-panel rounded-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
             <div className="p-6 border-b border-[#ffffff1a] flex justify-between items-center bg-[#ffffff05]">
               <h3 className="font-headline-md text-headline-md font-semibold text-on-surface">Registered Users ({users.length})</h3>
               <button className="flex items-center gap-2 px-4 py-2 border border-[#ffffff33] rounded-lg text-white font-label-mono text-xs hover:bg-[#ffffff1a] transition-colors">
                 <Download size={14} />
                 Export CSV
               </button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b border-[#ffffff1a] bg-[#ffffff02]">
                     <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">Customer ID</th>
                     <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">Email</th>
                     <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">Phone</th>
                     <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">Device Fingerprint</th>
                     <th className="py-4 px-6 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">Joined Date</th>
                   </tr>
                 </thead>
                 <tbody className="font-body-md text-sm divide-y divide-[#ffffff0a]">
                   {users.map((user, index) => (
                     <tr key={user.id} className="hover:bg-[#ffffff08] transition-colors">
                       <td className="py-4 px-6 font-label-mono text-primary font-medium">{user.id}</td>
                       <td className="py-4 px-6">{user.email || '—'}</td>
                       <td className="py-4 px-6 font-label-mono text-on-surface-variant">{user.phone || '—'}</td>
                       <td className="py-4 px-6">
                         {user.device_fingerprint ? (
                           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 font-label-mono text-[10px] text-on-surface-variant">
                             <Smartphone size={12} />
                             {user.device_fingerprint}
                           </span>
                         ) : '—'}
                       </td>
                       <td className="py-4 px-6 font-label-mono text-on-surface-variant flex items-center gap-2">
                         <Calendar size={14} className="opacity-50" />
                         {new Date(user.created_at).toLocaleDateString()}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        )}
      </div>
    </main>
  );
}
