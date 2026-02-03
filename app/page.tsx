import Link from 'next/link';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import BreakingNews from '@/components/BreakingNews';
import NewsGrid from '@/components/NewsGrid';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getNews() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      console.error("NEXT_PUBLIC_API_URL missing");
      return [];
    }

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 30000); // Badha kar 30 second kiya

    // ✅ Naya Stable Proxy use kar rahe hain InfinityFree bypass ke liye
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const targetUrl = encodeURIComponent(`${baseUrl}/news`);

    const res = await fetch(`${proxyUrl}${targetUrl}`, {
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        // Real browser ki pehchan
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
    });

    const contentType = res.headers.get("content-type");
    
    // Check if response is real JSON and not InfinityFree's HTML
    if (!res.ok || !contentType || !contentType.includes("application/json")) {
      console.error('Backend Error: Received HTML instead of JSON. InfinityFree is blocking.');
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error('Backend Connection Error:', error);
    return [];
  }
}

export default async function Home() {
  const apiData = await getNews();

  // News list handle karna
  const newsList =
    apiData?.data && Array.isArray(apiData.data)
      ? apiData.data
      : Array.isArray(apiData)
      ? apiData
      : [];

  const heroNews = newsList[0] || null;
  const moreNews = newsList.slice(1);

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const backendDomain = "http://flash-360-degree.ct.ws";
    return `${backendDomain}/storage/${imagePath}`;
  };

  return (
    <div className="min-h-screen bg-white font-serif text-gray-900">
      <TopBar />
      <Header />
      <Navbar />

      <BreakingNews
        text={
          heroNews
            ? heroNews.title
            : 'Welcome to Flash 360 Degree - Covering every angle of the truth...'
        }
      />

      <main className="container mx-auto px-4 py-10">
        {/* HERO SECTION */}
        {heroNews && (
          <section className="mb-16 border-b border-gray-200 pb-12">
            <Link
              href={`/news/${heroNews.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-10 items-center cursor-pointer"
            >
              <div className="w-full h-[400px] lg:h-[500px] bg-gray-100 overflow-hidden rounded-lg shadow-sm relative">
                {heroNews.image ? (
                  <img
                    src={getImageUrl(heroNews.image)!}
                    alt={heroNews.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 bg-gray-200">No Image</div>
                )}
                <span className="absolute bottom-4 left-4 bg-red-700 text-white text-xs font-bold px-3 py-1 uppercase rounded-full z-10 shadow-md">
                  {heroNews.category?.name || 'Top Story'}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-bold tracking-widest mb-4">
                  <span className="text-red-600 font-bold uppercase">Trending Now</span>
                  <span>•</span>
                  <span>{heroNews.updated_at ? new Date(heroNews.updated_at).toDateString() : ''}</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6 group-hover:text-red-700 transition duration-300">
                  {heroNews.title}
                </h2>
                <div className="text-lg text-gray-600 leading-relaxed mb-6 line-clamp-4">
                  {heroNews.excerpt || 'Read the full story on Flash 360 Degree.'}
                </div>
                <span className="inline-block border-b-2 border-black pb-1 text-sm font-bold uppercase tracking-wide group-hover:text-red-700 group-hover:border-red-700 transition">
                  Read Full Story
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* NEWS GRID */}
        {moreNews.length > 0 && <NewsGrid news={moreNews} />}

        {/* EMPTY STATE */}
        {newsList.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded border-dashed border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-400">No News Found</h3>
            <p className="text-gray-500 mt-2">Connecting to Flash 360 Backend... Please refresh if it takes too long.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}