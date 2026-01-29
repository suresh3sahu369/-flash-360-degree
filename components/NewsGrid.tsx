// 📂 SAVE THIS IN: frontend/components/NewsGrid.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewsGrid({ news }: { news: any[] }) {
  const [visibleCount, setVisibleCount] = useState(6); // Shuru mein 6 news dikhengi

  const showMore = () => {
    setVisibleCount((prev) => prev + 6); // Button dabane par 6 aur aayengi
  };

  // Image URL Fixer
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  };

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold uppercase border-l-4 border-red-700 pl-4 mb-8">
        Latest Stories
      </h3>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.slice(0, visibleCount).map((item) => (
          // 👇 UPDATE: Pura Card ab <Link> ban gaya hai
          <Link 
            key={item.id} 
            href={`/news/${item.slug}`}
            className="group cursor-pointer flex flex-col h-full border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white rounded-md overflow-hidden"
          >
            
            {/* Image Section */}
            <div className="h-48 overflow-hidden bg-gray-200 relative">
              {item.image ? (
                <img 
                  src={getImageUrl(item.image)} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>
              )}
              <span className="absolute top-2 left-2 bg-red-700 text-white text-[10px] font-bold px-2 py-1 uppercase rounded z-10">
                {item.category?.name || 'News'}
              </span>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
              <h4 className="font-bold text-lg leading-snug mb-2 group-hover:text-red-700 line-clamp-2 transition-colors">
                {item.title}
              </h4>
              <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
                 {/* HTML tags hatane ke liye replace use kiya */}
                 {item.content?.replace(/<[^>]+>/g, '')}
              </p>
              
              {/* Footer: Date & Read More */}
              <div className="text-xs text-gray-400 border-t pt-3 flex justify-between items-center mt-auto">
                <span>{new Date(item.created_at).toDateString()}</span>
                <span className="text-red-600 font-bold uppercase tracking-wide group-hover:underline flex items-center gap-1">
                    Read More 
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < news.length && (
        <div className="text-center mt-12">
          <button 
            onClick={showMore}
            className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition rounded-full shadow-lg"
          >
            Load More Stories
          </button>
        </div>
      )}
    </div>
  );
}