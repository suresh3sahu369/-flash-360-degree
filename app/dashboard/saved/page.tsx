'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SavedStories() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://127.0.0.1:8000/api/bookmarks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        }
      } catch (error) {
        console.error("Failed to load bookmarks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-red-700"></div>
        </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* 👇 1. ANIMATED BACK BUTTON (Top Left) */}
      <div>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 font-bold hover:text-red-700 transition-all duration-300 group"
          >
              <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full group-hover:bg-red-700 group-hover:text-white transition-all duration-300 group-hover:-translate-x-1">
                &larr;
              </span>
              <span className="group-hover:translate-x-1 transition-transform">Back to Home</span>
          </Link>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-white to-gray-50 p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -mr-8 -mt-8 opacity-50"></div>
        
        <div className="relative z-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Saved Stories</h1>
            <p className="text-gray-500 font-medium">Your personal collection of news.</p>
        </div>
        <div className="mt-4 md:mt-0 relative z-10">
            <span className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                {news.length} Items Saved
            </span>
        </div>
      </div>

      {/* Content Grid */}
      {news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((item) => (
                <div key={item.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                    <div className="flex h-36">
                        {/* Image Side */}
                        <div className="w-2/5 bg-gray-100 relative overflow-hidden">
                             {item.image ? (
                                <img 
                                    src={getImageUrl(item.image)} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                             ) : (
                                <div className="flex items-center justify-center h-full text-xs text-gray-400 font-bold">NO IMAGE</div>
                             )}
                             <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        </div>
                        
                        {/* Text Side */}
                        <div className="w-3/5 p-5 flex flex-col justify-between">
                            <div>
                                <span className="inline-block px-2 py-1 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                                    {item.category_name || 'News'}
                                </span>
                                <Link href={`/news/${item.slug}`}>
                                    <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-red-700 transition-colors">
                                        {item.title}
                                    </h3>
                                </Link>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-400 font-medium">{new Date(item.created_at).toLocaleDateString()}</span>
                                <Link href={`/news/${item.slug}`} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all">
                                    &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      ) : (
        // 👇 2. EMPTY STATE WITH ANIMATED BUTTON
        <div className="bg-white p-16 rounded-2xl border-2 border-dashed border-gray-200 text-center hover:border-red-200 transition-colors">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Stories Saved Yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">It looks like you haven't bookmarked any articles. Go explore the news and save what interests you!</p>
            
            <Link href="/" className="inline-block relative overflow-hidden group bg-black text-white px-8 py-4 rounded-full font-bold shadow-lg transform transition hover:scale-105 hover:shadow-xl">
                <span className="relative z-10 flex items-center gap-2">
                    Start Reading News 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
                <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </Link>
        </div>
      )}

    </div>
  );
}