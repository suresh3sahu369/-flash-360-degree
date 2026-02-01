'use client';

import { useState } from 'react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({ 
    name: '', email: '', mobile: '', city: '', state: '', message: '' 
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      // ✅ FIX: Localhost hataya aur dashboard variable use kiya
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const res = await fetch(`${baseUrl}/contact`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' // InfinityFree compatibility ke liye
        },
        body: JSON.stringify(formData),
      });

      // Response check
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', mobile: '', city: '', state: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 flex flex-col justify-between">
      <div>
        <TopBar />
        <Header />
        <Navbar />
      </div>

      <main className="container mx-auto px-4 py-12 max-w-7xl flex-grow">
        
        {/* Heading Section */}
        <div className="text-center mb-16 animate-fade-in-down">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">Touch</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Have an inquiry or some feedback for us? Fill out the form below to contact our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
          
          {/* --- LEFT SIDE: CONTACT INFO --- */}
          <div className="lg:col-span-2 relative overflow-hidden min-h-[600px] text-white flex flex-col justify-between p-12 bg-black">
             <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
             
             <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2 tracking-wide">Contact Info</h3>
                <p className="text-gray-400 mb-12 text-sm">We are available 24/7 to answer your questions.</p>

                <div className="space-y-10">
                    <div className="flex items-start gap-5 group cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        </div>
                        <div>
                            <p className="text-xs text-red-400 uppercase font-bold tracking-wider mb-1">Call Us</p>
                            <p className="text-lg font-medium text-white">+91 62680 25095</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-5 group cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <div>
                            <p className="text-xs text-red-400 uppercase font-bold tracking-wider mb-1">Email Support</p>
                            <p className="text-lg font-medium text-white">sureshsahu966989@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-5 group cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </div>
                        <div>
                            <p className="text-xs text-red-400 uppercase font-bold tracking-wider mb-1">Head Office</p>
                            <p className="text-lg font-medium text-white leading-snug">
                                Flash 360 Media House,<br />Raipur, Chhattisgarh, India
                            </p>
                        </div>
                    </div>
                </div>
             </div>
          </div>

          {/* --- RIGHT SIDE: FORM --- */}
          <div className="lg:col-span-3 bg-white p-8 lg:p-16 relative">
            
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Thank you for reaching out. We will get back to you soon.</p>
                <button onClick={() => setStatus('idle')} className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-red-700 transition-all">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-red-600 bg-gray-50" />
                    </div>
                    <div className="group relative">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mobile Number</label>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-red-600 bg-gray-50" />
                    </div>
                </div>

                <div className="group relative">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-red-600 bg-gray-50" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-red-600 bg-gray-50" />
                    </div>
                    <div className="group relative">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">State</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-red-600 bg-gray-50" />
                    </div>
                </div>

                <div className="group relative">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-red-600 bg-gray-50 resize-none"></textarea>
                </div>

                {status === 'error' && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-center text-sm font-bold border border-red-200">
                        Failed to send message. Please check your internet or try again.
                    </div>
                )}

                <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-red-700 to-red-900 text-white font-bold uppercase tracking-widest hover:from-black transition-all rounded-xl shadow-lg">
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}