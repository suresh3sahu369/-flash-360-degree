'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Check Login Status
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/auth/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
    window.location.reload();
  };

  if (!user) return null; // Jab tak check ho raha hai, kuch mat dikhao

  // Menu Items Array
  const menuItems = [
    { name: 'Overview', href: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Edit Profile', href: '/dashboard/profile', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { name: 'Saved Stories', href: '/dashboard/saved', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-serif">
      {/* Website Navigation (Taaki user wapas ja sake) */}
      <TopBar />
      <Header />
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* --- LEFT SIDEBAR --- */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              
              {/* User Info Card */}
              <div className="p-6 bg-black text-white text-center">
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold border-2 border-white">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-bold text-lg truncate">{user.name}</h3>
                <p className="text-gray-400 text-xs">{user.email}</p>
              </div>

              {/* Menu Links */}
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-bold rounded-md transition ${
                      pathname === item.href 
                        ? 'bg-red-50 text-red-700' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                    {item.name}
                  </Link>
                ))}

                {/* 🔥 NEW: WRITE NEWS BUTTON (Added Here) */}
                <Link 
                    href="/dashboard/create-news" 
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-bold group mt-4 border border-gray-100 ${
                        pathname === '/dashboard/create-news' 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-black hover:border-gray-300'
                    }`}
                >
                    <div className={`p-1.5 rounded-md transition-colors ${
                        pathname === '/dashboard/create-news' ? 'bg-red-200 text-red-800' : 'bg-gray-100 group-hover:bg-red-100 group-hover:text-red-700'
                    }`}>
                        {/* Pen Icon */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </div>
                    <span>Write News</span>
                </Link>
                
                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-md transition mt-4 border-t border-gray-100"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Logout
                </button>
              </nav>

            </div>
          </aside>

          {/* --- RIGHT CONTENT AREA --- */}
          <main className="md:col-span-3">
              {children}
          </main>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}