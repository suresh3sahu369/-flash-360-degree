'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfileDropdown() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Check karo ki user login hai ya nahi
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout ka logic
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsOpen(false);
    alert('Logged out successfully');
    router.push('/');
    window.location.reload(); // Page refresh taaki state clear ho jaye
  };

  // User ka pehla letter (Jaise 'S' for Suresh)
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'G';

  return (
    <div className="relative">
      
      {/* --- PROFILE ICON (Tri-Color Ring) --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none group"
      >
        {/* 1. Outer Ring (Gradient: Blue -> Green -> Red) */}
        <div className="p-[2px] rounded-full bg-gradient-to-tr from-blue-500 via-green-500 to-red-500 hover:scale-110 transition duration-300 shadow-md">
          
          {/* 2. Inner Circle (Black Background) */}
          <div className="h-9 w-9 bg-black rounded-full flex items-center justify-center border-2 border-white">
            <span className="text-white font-bold text-sm">
              {user ? initial : '?'}
            </span>
          </div>

        </div>
      </button>

      {/* --- DROPDOWN MENU --- */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden animate-fade-in-down">
          
          {user ? (
            // AGAR LOGIN HAI
            <>
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-500 uppercase font-bold">Signed in as</p>
                <p className="text-sm font-bold text-black truncate">{user.name}</p>
              </div>
              <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 font-bold hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            // AGAR LOGIN NAHI HAI
            <>
               <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-500 font-bold">Welcome, Guest!</p>
              </div>
              <Link href="/auth/login" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition">
                Login
              </Link>
              <Link href="/auth/register" className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition">
                Register
              </Link>
            </>
          )}

        </div>
      )}
    </div>
  );
}