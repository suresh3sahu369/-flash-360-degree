'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CategoryPage() {
  const { slug } = useParams(); 
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // ✅ FIX: Localhost hataya aur dashboard wala variable use kiya
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${baseUrl}/news?category=${slug}`, {
           cache: 'no-store',
           headers: {
             'Accept': 'application/json' // InfinityFree compatibility ke liye
           }
        });
        
        const data = await res.json();
        setNewsList(data.data || data);
      } catch (error) {
        console.error("Category Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchNews();
  }, [slug]);

  // ✅ FIX: Images ab seedha aapke live backend domain se aayengi
  const getImageUrl = (path: string) => 
    path?.startsWith('http') ? path : `http://flash-360-degree.ct.ws/storage/${path}`;

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <TopBar />
      <Header />
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        
        {/* Category Title */}
        <div className="flex items-center gap-4 mb-8 border-b pb-4">
            <h1 className="text-4xl font-extrabold uppercase text-red-700">
                {slug} <span className="text-black">News</span>
            </h1>
            <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded text-sm font-bold">
                {newsList.length} Stories
            </span>
        </div>

        {/* Loading State */}
        {loading ? (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-700"></div>
            </div>
        ) : newsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsList.map((item: any) => (
                    <Link key={item.id} href={`/news/${item.slug}`} className="group">
                        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 h-full flex flex-col">
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                {item.image ? (
                                    <img src={getImageUrl(item.image)} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={item.title} />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                                )}
                                <span className="absolute top-4 left-4 bg-red-700 text-white text-xs font-bold px-3 py-1 rounded uppercase">
                                    {item.category?.name || slug}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h2 className="text-xl font-bold mb-3 leading-snug group-hover:text-red-700 transition">
                                    {item.title}
                                </h2>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                                    {item.content.replace(/<[^>]*>?/gm, '')}
                                </p>
                                <div className="text-xs text-gray-400 font-medium mt-auto">
                                    {new Date(item.created_at).toDateString()} • By {item.user?.name || 'Bureau'}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">No news found in <span className="font-bold text-red-600 capitalize">{slug}</span> yet.</p>
                <Link href="/" className="text-black font-bold mt-4 inline-block hover:underline">Go to Homepage</Link>
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
}