// 📂 SAVE THIS IN: frontend/components/TopBar.tsx

'use client';

import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown'; // 👇 Naya Component Import kiya

export default function TopBar() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="bg-gray-100 border-b border-gray-300 text-xs py-2 relative z-50">
      <div className="container mx-auto px-4 flex justify-between items-center text-gray-600">
        
        {/* Left Side: Date */}
        <span className="font-medium tracking-wide">{currentDate} | New Delhi, India</span>
        
        {/* Right Side: Socials & Profile */}
        <div className="flex items-center space-x-6">
          <span className="cursor-pointer hover:text-black hidden md:inline">Facebook</span>
          <span className="cursor-pointer hover:text-black hidden md:inline">Twitter</span>
          <span className="cursor-pointer hover:text-black hidden md:inline">Instagram</span>
          
          {/* 👇 Login Text hata kar ye Icon laga diya */}
          <ProfileDropdown />
          
        </div>
      </div>
    </div>
  );
}