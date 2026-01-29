'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NewsDetail() {
  const { slug } = useParams();
  
  // --- STATES ---
  const [news, setNews] = useState<any>(null);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Interaction States
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // Subscription States
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  
  // Comment States
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  // --- 1. DATA FETCHING ---
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers: any = token ? { Authorization: `Bearer ${token}` } : {};

      try {
        // A. Main News Details
        const newsRes = await fetch(`http://127.0.0.1:8000/api/news-details/${slug}`, { headers });
        if (!newsRes.ok) throw new Error('News not found');
        const newsData = await newsRes.json();
        
        setNews(newsData.news);
        setIsLiked(newsData.is_liked);
        setLikeCount(newsData.news.likes_count || 0);

        // Subscription Data
        setIsSubscribed(newsData.is_subscribed);
        setSubscriberCount(newsData.subscribers_count || 0);

        // B. Comments Load
        const commentsRes = await fetch(`http://127.0.0.1:8000/api/news/${newsData.news.id}/comments`);
        const commentsData = await commentsRes.json();
        setComments(commentsData);

        // C. Check Saved Status
        if (token) {
            const bookmarksRes = await fetch('http://127.0.0.1:8000/api/bookmarks', { headers });
            if (bookmarksRes.ok) {
                const bookmarks = await bookmarksRes.json();
                const found = bookmarks.find((b: any) => b.id === newsData.news.id);
                if (found) setIsSaved(true);
            }
        }

        // D. Related News
        const allNewsRes = await fetch('http://127.0.0.1:8000/api/news');
        const allNewsData = await allNewsRes.json();
        const allNews = allNewsData.data || allNewsData;
        const related = allNews
            .filter((item: any) => item.category_id === newsData.news.category_id && item.id !== newsData.news.id)
            .slice(0, 3);
        setRelatedNews(related);

      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadAllData();
  }, [slug]);

  // --- 2. HANDLERS ---

  // 👇 UPDATED SUBSCRIBE HANDLER (Asli Error Dikhayega)
  const handleSubscribe = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login to Subscribe!');

    if (!news.user || !news.user.id) {
        return alert('Cannot subscribe: Author info missing.');
    }

    // Save previous state (Error aane par wapas lane ke liye)
    const previousState = isSubscribed;
    const previousCount = subscriberCount;

    // Optimistic Update
    setIsSubscribed(!isSubscribed);
    setSubscriberCount(prev => isSubscribed ? prev - 1 : prev + 1);

    try {
        const res = await fetch(`http://127.0.0.1:8000/api/author/${news.user.id}/subscribe`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        });

        const data = await res.json();

        if (!res.ok) {
            // Agar Backend ne error bheja (e.g. "You cannot subscribe yourself")
            throw new Error(data.message || 'Subscription failed');
        }

    } catch (err: any) {
        // Revert State
        setIsSubscribed(previousState);
        setSubscriberCount(previousCount);
        
        // Asli Error Alert karo
        alert(err.message);
    }
  };

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login to like!');

    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);

    try {
      await fetch(`http://127.0.0.1:8000/api/news/${news.id}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      setIsLiked(!isLiked);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login to save!');

    const oldState = isSaved;
    setIsSaved(!isSaved);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/bookmark/toggle', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ news_id: news.id })
      });
      const data = await res.json();
      if (data.status === 'added') setIsSaved(true);
      else setIsSaved(false);
    } catch (error) {
      setIsSaved(oldState);
    }
  };

  const handleShare = async () => {
    const shareData = {
        title: news.title,
        text: `Read this amazing news: ${news.title}`,
        url: window.location.href,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log(err);
        }
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link Copied to Clipboard!');
    }
  };

  const handlePostComment = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login to comment!');
    if (!newComment.trim()) return;

    setCommentLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/news/${news.id}/comment`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ content: newComment })
      });
      const data = await res.json();
      setComments([data.comment, ...comments]);
      setNewComment('');
    } catch (err) {
      alert('Failed to post comment');
    } finally {
      setCommentLoading(false);
    }
  };

  const getImageUrl = (path: string) => path?.startsWith('http') ? path : `http://127.0.0.1:8000/storage/${path}`;

  if (loading) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-700"></div></div>;
  if (!news) return <div className="text-center py-20">News Not Found</div>;

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <TopBar />
      <Header />
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Breadcrumb */}
        <div className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
            <Link href="/" className="hover:text-red-700">Home</Link> / <span className="text-red-700">{news.category?.name}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            {news.title}
        </h1>
        <p className="text-gray-500 mb-6 text-sm">Published on {new Date(news.created_at).toDateString()}</p>

        {/* --- 🔥 ACTION BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center border-y border-gray-100 py-4 mb-8 gap-4">
            
            {/* Left: Author Profile */}
            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="w-12 h-12 bg-gradient-to-tr from-gray-700 to-black rounded-full flex items-center justify-center text-white font-bold text-lg uppercase shadow-md overflow-hidden">
                    {news.user?.name ? news.user.name[0] : 'A'}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-base leading-none">
                        {news.user?.name || 'NewsDaily Bureau'}
                    </h4>
                    {/* Subscriber Count */}
                    <span className="text-xs text-gray-500 font-medium">{subscriberCount} Subscribers</span>
                </div>
                
                {/* SUBSCRIBE BUTTON */}
                <button 
                    onClick={handleSubscribe}
                    className={`ml-4 px-5 py-2 rounded-full text-xs font-bold transition shadow-sm ${
                        isSubscribed 
                        ? 'bg-gray-200 text-black hover:bg-gray-300' 
                        : 'bg-black text-white hover:bg-red-700'
                    }`}
                >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
                {/* LIKE */}
                <button 
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition border ${
                        isLiked ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-100 border-transparent hover:bg-gray-200'
                    }`}
                >
                    <svg className={`w-5 h-5 ${isLiked ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span>{likeCount}</span>
                </button>

                {/* SHARE */}
                <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-bold bg-gray-100 hover:bg-green-100 hover:text-green-700 transition"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                    Share
                </button>

                {/* SAVE */}
                <button 
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition border ${
                        isSaved ? 'bg-black text-white border-black' : 'bg-gray-100 border-transparent hover:bg-gray-200'
                    }`}
                >
                    <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                    {isSaved ? 'Saved' : 'Save'}
                </button>
            </div>
        </div>

        {/* News Image */}
        {news.image && (
            <div className="w-full mb-10 overflow-hidden rounded-xl shadow-lg">
                <img src={getImageUrl(news.image)} alt={news.title} className="w-full h-auto object-cover" />
            </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-serif mb-16" dangerouslySetInnerHTML={{ __html: news.content }} />


        {/* --- 💬 COMMENTS SECTION --- */}
        <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                {comments.length} Comments
            </h3>

            {/* Comment Box */}
            <form onSubmit={handlePostComment} className="flex gap-4 mb-8">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-gray-600">ME</div>
                <div className="flex-1">
                    <input 
                        type="text" 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full border-b border-gray-300 bg-transparent py-2 focus:border-black focus:outline-none transition"
                    />
                    <div className="flex justify-end mt-2">
                        <button 
                            type="submit" 
                            disabled={commentLoading || !newComment.trim()}
                            className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold disabled:opacity-50 hover:bg-gray-800"
                        >
                            {commentLoading ? 'Posting...' : 'Comment'}
                        </button>
                    </div>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.length > 0 ? (
                    comments.map((comment: any) => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold uppercase text-sm">
                                {comment.user?.name ? comment.user.name[0] : 'U'}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-gray-900">{comment.user?.name}</span>
                                    <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="text-gray-800 mt-1 text-sm">{comment.content}</p>
                                <div className="flex gap-4 mt-2 text-xs font-bold text-gray-500 cursor-pointer">
                                    <span className="hover:text-black">Like</span>
                                    <span className="hover:text-black">Reply</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center text-sm italic">No comments yet.</p>
                )}
            </div>
        </div>
        
        {/* --- RELATED NEWS --- */}
        {relatedNews.length > 0 && (
            <div className="mt-16">
                 <h3 className="text-2xl font-bold mb-6">Related Stories</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedNews.map((item) => (
                        <Link key={item.id} href={`/news/${item.slug}`} className="group">
                            <div className="h-40 bg-gray-200 rounded-lg overflow-hidden mb-3">
                                {item.image && <img src={getImageUrl(item.image)} className="w-full h-full object-cover group-hover:scale-105 transition" />}
                            </div>
                            <h4 className="font-bold leading-tight group-hover:text-red-700">{item.title}</h4>
                        </Link>
                    ))}
                 </div>
            </div>
        )}

      </main>
      <Footer />
    </div>
  );
}