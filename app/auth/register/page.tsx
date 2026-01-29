'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  
  // 👇 UPDATE: password_confirmation add kiya
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    password_confirmation: '' 
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic Validation: Passwords match hone chahiye
    if (formData.password !== formData.password_confirmation) {
        setError("Passwords do not match!");
        setLoading(false);
        return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json' // 👈 IMPORTANT: Ye zaroori hai
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Laravel validation errors ko string mein convert karna
        const errorMessage = data.message || 'Registration failed';
        throw new Error(errorMessage);
      }

      alert('Account Created Successfully! Redirecting to Login...');
      router.push('/auth/login');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4 font-sans">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
        
        <h2 className="text-3xl font-extrabold text-center mb-8 uppercase tracking-tighter text-gray-900">
            Join Flash<span className="text-red-700">360</span>
        </h2>

        {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-sm font-bold border border-red-200">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
            <input 
              type="text" 
              name="name" 
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-red-700 transition"
              placeholder="Your Name"
              onChange={handleChange}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-red-700 transition"
              placeholder="you@example.com"
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-red-700 transition"
              placeholder="Create Password"
              onChange={handleChange}
            />
          </div>

          {/* 👇 NEW: Confirm Password Field */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Confirm Password</label>
            <input 
              type="password" 
              name="password_confirmation" 
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-red-700 transition"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-700 text-white font-bold py-4 rounded-lg hover:bg-black transition duration-300 disabled:opacity-50 shadow-md uppercase tracking-wider"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8 font-medium">
          Already have an account? <Link href="/auth/login" className="text-red-700 font-bold hover:underline">Login Here</Link>
        </p>
      </div>
    </div>
  );
}