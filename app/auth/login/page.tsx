'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      alert('Login Successful!');
      router.push('/');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4 font-sans">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
        
        {/* Title Updated: Dark Black Text */}
        <h2 className="text-4xl font-extrabold text-center mb-8 uppercase tracking-tighter text-gray-900">
            Flash<span className="text-red-700">360</span> Login
        </h2>

        {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-sm font-bold border border-red-200">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition"
              placeholder="you@example.com"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition"
              placeholder="********"
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50 shadow-md uppercase tracking-wider"
          >
            {loading ? 'Logging in...' : 'Login Now'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8 font-medium">
          Don't have an account? <Link href="/auth/register" className="text-red-700 font-bold hover:underline">Register Here</Link>
        </p>
        <p className="text-center text-sm text-gray-500 mt-3">
            <Link href="/" className="hover:text-black flex items-center justify-center gap-1">
              &larr; Back to Home
            </Link>
        </p>
      </div>
    </div>
  );
}