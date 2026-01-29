'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardOverview() {
  const [stats, setStats] = useState({ saved_stories: 0, comments: 0, status: 'Loading...', recent_activity: [] });
  const [loading, setLoading] = useState(true);

  // Helper for Image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  };

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://127.0.0.1:8000/api/dashboard-stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to load stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-2xl shadow-lg text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
        <div className="relative z-10">
            <h1 className="text-3xl font-extrabold mb-2">Dashboard Overview</h1>
            <p className="text-gray-300">Here is what's happening with your account.</p>
        </div>
        <Link href="/dashboard/profile" className="relative z-10 mt-4 md:mt-0">
            <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-red-700 hover:text-white transition shadow-lg">
                Edit Profile &rarr;
            </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Account Status</h3>
          <p className="text-3xl font-black text-blue-600">{loading ? '...' : stats.status}</p>
        </div>
        {/* Saved Stories */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Saved Stories</h3>
          <p className="text-3xl font-black text-green-600">{loading ? '...' : stats.saved_stories}</p>
        </div>
        {/* Comments */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Comments</h3>
          <p className="text-3xl font-black text-purple-600">{loading ? '...' : stats.comments}</p>
        </div>
      </div>

      {/* 👇 RECENT ACTIVITY SECTION (Updated) */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Recent Saved Stories</h3>
        
        {stats.recent_activity && stats.recent_activity.length > 0 ? (
            <div className="space-y-4">
                {stats.recent_activity.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                        {/* Image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                             {item.image && <img src={getImageUrl(item.image)} alt="news" className="w-full h-full object-cover" />}
                        </div>
                        {/* Content */}
                        <div className="flex-1">
                             <span className="text-[10px] font-bold text-red-700 uppercase">{item.category_name || 'News'}</span>
                             <Link href={`/news/${item.slug}`}>
                                <h4 className="text-sm font-bold text-gray-900 hover:text-red-700 leading-tight line-clamp-2">
                                    {item.title}
                                </h4>
                             </Link>
                             <p className="text-xs text-gray-400 mt-1">Saved on {new Date(item.created_at).toDateString()}</p>
                        </div>
                        {/* Read Button */}
                        <Link href={`/news/${item.slug}`} className="bg-black text-white p-2 rounded-full hover:bg-red-700 transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </Link>
                    </div>
                ))}
                
                <div className="pt-4 text-center">
                    <Link href="/dashboard/saved" className="text-sm font-bold text-gray-500 hover:text-black hover:underline">
                        View All Saved Stories &rarr;
                    </Link>
                </div>
            </div>
        ) : (
            // Empty State (Agar koi activity nahi hai)
            <div className="text-center py-10">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h4 className="text-gray-900 font-bold">No Recent Activity</h4>
                <p className="text-gray-500 text-sm mb-4">Go read some news and save them!</p>
                <Link href="/" className="text-red-700 font-bold hover:underline">Start Reading &rarr;</Link>
            </div>
        )}
      </div>

    </div>
  );
}