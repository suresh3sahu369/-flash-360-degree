'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // --- STATE ---
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  // --- HANDLER ---
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMsg('');

    try {
      // ✅ FIX: Dashboard variable use kiya localhost hatakar
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const res = await fetch(`${baseUrl}/newsletter`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' // InfinityFree compatibility
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMsg('Thank you for joining our community! 🚀');
        setEmail('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setMsg(data.message || 'Subscription failed.');
      }
    } catch (error) {
      console.error("Newsletter Error:", error);
      setStatus('error');
      setMsg('Something went wrong.');
    }
  };

  // 1. COMPANY LINKS
  const companyLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Support', path: '/contact' },
    { name: 'Editorial Team', path: '/team' },
    { name: 'Careers', path: '/careers' }
  ];

  // 2. CATEGORIES
  const footerCategories = [
    { name: 'India', slug: 'india' },
    { name: 'World', slug: 'world' },
    { name: 'Business', slug: 'business' },
    { name: 'Tech', slug: 'tech' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Education', slug: 'education' }
  ];

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t-4 border-red-700 mt-20 font-sans relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-75"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- TOP SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Social */}
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold uppercase tracking-tighter group cursor-default">
              Flash<span className="text-red-700 group-hover:text-white transition-colors duration-300">360</span> Degree
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed hover:text-gray-200 transition-colors duration-300">
              Your trusted source for unbiased news, in-depth analysis, and real-time updates. We cover the truth from every angle.
            </p>
            
            <div className="flex space-x-4">
              {[
                { icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', color: 'hover:bg-blue-600' }, 
                { icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', color: 'hover:bg-white hover:text-black' },
                { icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z M17.5 6.5h.01', rect: true, color: 'hover:bg-pink-600' }
              ].map((social, idx) => (
                <a key={idx} href="#" className={`w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/50 ${social.color}`}>
                  <svg className="w-5 h-5" fill={social.rect ? 'none' : 'currentColor'} stroke={social.rect ? 'currentColor' : 'none'} strokeWidth="2" viewBox="0 0 24 24">
                    {social.rect && <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>}
                    <path d={social.icon}></path>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-6 border-b-2 border-red-700 pb-2 inline-block">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {companyLinks.map((item) => (
                <li key={item.name}>
                    <Link href={item.path} className="hover:text-white hover:translate-x-2 transition-transform duration-300 inline-block">
                        → {item.name}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-6 border-b-2 border-red-700 pb-2 inline-block">Top Categories</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {footerCategories.map((cat) => (
                 <li key={cat.slug}>
                    <Link href={`/category/${cat.slug}`} className="hover:text-white hover:translate-x-2 transition-transform duration-300 inline-block">
                        → {cat.name}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            
            <div className="relative bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-2xl">
              <h3 className="text-lg font-bold uppercase tracking-wider mb-2 text-white flex items-center gap-2">
                 Subscribe <span className="text-red-500 animate-pulse">●</span>
              </h3>
              <p className="text-gray-400 text-xs mb-4">
                Join 10,000+ readers. Get the latest headlines daily.
              </p>
              
              <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black/50 text-white px-4 py-3 text-sm rounded border border-gray-700 focus:outline-none focus:border-red-500 transition-all duration-300"
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="bg-gradient-to-r from-red-700 to-red-900 text-white px-4 py-3 text-sm font-bold uppercase tracking-wide rounded hover:from-red-600 hover:to-red-800 transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg"
                >
                  {status === 'loading' ? 'Processing...' : 'Sign Me Up'}
                </button>
              </form>

              <div className="h-6 mt-3 overflow-hidden">
                {status === 'success' && <p className="text-green-400 text-xs font-bold text-center animate-bounce">{msg}</p>}
                {status === 'error' && <p className="text-red-400 text-xs font-bold text-center animate-pulse">{msg}</p>}
              </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} Flash 360 Degree. Designed & Developed by <span className="text-white font-bold">Chitresh Kumar Sahu</span>.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <Link key={link} href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="hover:text-white transition-colors duration-200">
                    {link}
                </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}