'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

export default function CreateNewsDashboard() {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { ssr: false }), []);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // State for Multiple Image Previews
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Form Data
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_id: '',
    content: '',
    images: [] as File[], 
    is_breaking: false,
    status: 'draft'
  });

  // Auto-generate Slug when Title changes
  useEffect(() => {
    const newSlug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') 
      .replace(/(^-|-$)+/g, '');   
    setFormData(prev => ({ ...prev, slug: newSlug }));
  }, [formData.title]);

  const categories = [
    { id: 1, name: 'India' },
    { id: 2, name: 'World' },
    { id: 3, name: 'Business' },
    { id: 4, name: 'Tech' },
    { id: 5, name: 'Sports' },
    { id: 6, name: 'Education' }
  ];

  // Handle Multiple Files
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData({ ...formData, images: filesArray });
      
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token') || localStorage.getItem('auth_token');

    if (!token) {
        alert("You are not logged in! Please login first.");
        router.push('/login'); 
        setLoading(false);
        return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('slug', formData.slug);
    data.append('category_id', formData.category_id);
    data.append('content', formData.content);
    data.append('author_name', 'Frontend User'); 
    data.append('is_breaking', formData.is_breaking ? '1' : '0');
    data.append('status', formData.status);
    
    // Append images
    if (formData.images.length > 0) {
        formData.images.forEach((file) => {
            data.append('images[]', file);
        });
    }

    try {
      // ✅ FIX: Dashboard variable use kiya localhost hatakar
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${baseUrl}/news/store`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`, 
            // 'Content-Type': 'multipart/form-data' khud Next.js set kar lega FormData ke liye
        },
        body: data,
      });

      if (res.ok) {
        alert('News Created Successfully! 🚀');
        router.push('/dashboard');
      } else {
        const errorData = await res.json();
        console.error("Backend Error:", errorData);

        if (res.status === 401) {
            alert("Session Expired. Please Login Again.");
            router.push('/login');
        } else {
            alert('Error: ' + (errorData.message || JSON.stringify(errorData)));
        }
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert('Server connection failed! Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create News</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none text-black bg-white"
                  placeholder="Enter title"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Slug <span className="text-red-500">*</span></label>
                <input 
                  type="text"
                  value={formData.slug}
                  readOnly
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
                  placeholder="auto-generated-slug"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                <select 
                    required
                    value={formData.category_id}
                    onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none bg-white text-black"
                >
                    <option value="">Select an option</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id} className="text-black">{cat.name}</option>)}
                </select>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Images (Select Multiple)</label>
                <div className="border border-gray-300 rounded-lg p-2 flex flex-col gap-2 bg-white relative">
                    <input 
                        type="file" 
                        accept="image/*"
                        multiple 
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                    />
                     {imagePreviews.length > 0 && (
                        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                            {imagePreviews.map((src, index) => (
                                <div key={index} className="w-20 h-20 shrink-0 rounded overflow-hidden border border-gray-200">
                                     <img src={src} className="w-full h-full object-cover" alt={`preview ${index}`} />
                                </div>
                            ))}
                        </div>
                     )}
                </div>
            </div>
        </div>

        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content <span className="text-red-500">*</span></label>
            <div className="bg-white rounded-lg">
                <ReactQuill 
                    theme="snow"
                    value={formData.content}
                    onChange={(val) => setFormData({...formData, content: val})}
                    className="h-[300px] text-black"
                />
            </div>
        </div>

        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
             <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                    <input 
                        type="checkbox" 
                        id="breaking-toggle" 
                        checked={formData.is_breaking}
                        onChange={(e) => setFormData({...formData, is_breaking: e.target.checked})}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-orange-500"
                    />
                    <label htmlFor="breaking-toggle" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${formData.is_breaking ? 'bg-orange-500' : 'bg-gray-300'}`}></label>
                </div>
                <label htmlFor="breaking-toggle" className="text-sm font-bold text-gray-700 cursor-pointer">Is Breaking News</label>
             </div>

             <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none bg-white text-black"
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
             </div>
        </div>

        <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
            <button 
                type="submit" 
                disabled={loading}
                className="px-6 py-2.5 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all shadow-sm flex items-center gap-2 text-sm"
            >
                {loading ? 'Creating...' : 'Create'}
            </button>
            <button 
                type="button" 
                onClick={() => router.push('/dashboard')}
                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all text-sm"
            >
                Cancel
            </button>
        </div>
      </form>

      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          left: auto;
          border-color: #f97316;
        }
        .toggle-checkbox {
          right: auto;
          left: 0;
          transition: all 0.3s;
        }
      `}</style>
    </div>
  );
}