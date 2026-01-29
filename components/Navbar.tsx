'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // 👇 Updated: 'technology' ko 'tech' kar diya hai taaki DB se match kare
  const categories = [
    { name: 'India', slug: 'india' },
    { name: 'World', slug: 'world' },
    { name: 'Business', slug: 'business' },
    { name: 'Tech', slug: 'tech' }, // ✅ Ab ye sahi match karega
    { name: 'Education', slug: 'education' },
    { name: 'Sports', slug: 'sports' },
  ];

  return (
    <nav className="border-b border-gray-200 sticky top-0 bg-white z-50 shadow-sm font-sans">
      <div className="container mx-auto px-4">
        {/* Mobile Friendly Scrollable Menu */}
        <div className="flex items-center justify-center md:justify-start overflow-x-auto whitespace-nowrap py-4 scrollbar-hide">
            
            {/* Home Link */}
            <Link 
                href="/" 
                className={`text-sm font-bold uppercase tracking-wide px-4 py-2 rounded-full transition-all duration-200 ${
                    pathname === '/' 
                    ? 'bg-black text-white' 
                    : 'text-gray-700 hover:text-red-700 hover:bg-gray-50'
                }`}
            >
                Home
            </Link>

            {/* Dynamic Category Links */}
            {categories.map((cat) => (
                <Link 
                    key={cat.slug} 
                    href={`/category/${cat.slug}`} 
                    className={`text-sm font-bold uppercase tracking-wide px-4 py-2 rounded-full transition-all duration-200 ${
                        pathname === `/category/${cat.slug}` 
                        ? 'bg-red-700 text-white' 
                        : 'text-gray-700 hover:text-red-700 hover:bg-gray-50'
                    }`}
                >
                    {cat.name}
                </Link>
            ))}

        </div>
      </div>
    </nav>
  );
}