'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData({ name: user.name, email: user.email, password: '' });
    }
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/update-profile', {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json', // 👈 YE LINE ERROR ROKEGI (CORS Fix)
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Update failed');
      }

      // Success: Naya data save karo aur refresh karo
      localStorage.setItem('user', JSON.stringify(data.user));
      alert('Profile Updated Successfully!');
      window.location.reload(); 

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-xl border border-gray-100 relative overflow-hidden">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-10 -mt-10 blur-2xl"></div>

      <h2 className="text-3xl font-extrabold mb-8 border-b border-gray-100 pb-4 text-gray-900 relative z-10">
        Edit Your Profile
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        
        {/* FULL NAME INPUT */}
        <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name</label>
            <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-4 rounded-lg bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none font-medium shadow-sm"
            />
        </div>

        {/* EMAIL INPUT (Read Only) */}
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address <span className="text-xs text-red-500 lowercase">(cannot change)</span></label>
            <input 
                type="email" 
                name="email" 
                value={formData.email}
                disabled
                className="w-full p-4 rounded-lg bg-gray-200 text-gray-600 border border-gray-300 cursor-not-allowed font-medium"
            />
        </div>

        {/* PASSWORD INPUT */}
        <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">New Password</label>
            <input 
                type="password" 
                name="password" 
                placeholder="Leave blank to keep current password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-gray-50 text-gray-900 border border-gray-200 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none font-medium shadow-sm"
            />
        </div>

        {/* SUBMIT BUTTON */}
        <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-black to-gray-800 text-white font-bold py-4 rounded-lg hover:from-red-700 hover:to-red-900 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 transform"
        >
            {loading ? 'Updating...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}