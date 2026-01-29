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
      const res = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', mobile: '', city: '', state: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
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
          
          {/* --- LEFT SIDE: ANIMATED LAVA CARD --- */}
          <div className="lg:col-span-2 relative overflow-hidden min-h-[600px] text-white flex flex-col justify-between p-12">
             
             {/* 🔥 The New Safer Animation Class */}
             <div className="absolute inset-0 z-0 animate-lava"></div>
             
             {/* Texture Overlay for Premium Feel */}
             <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
             
             {/* Content Overlay */}
             <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2 tracking-wide drop-shadow-md">Contact Info</h3>
                <p className="text-gray-300 mb-12 text-sm drop-shadow-sm">We are available 24/7 to answer your questions.</p>

                <div className="space-y-10">
                    {/* Item 1: Call */}
                    <div className="flex items-start gap-5 group cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-red-200 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 backdrop-blur-sm shadow-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        </div>
                        <div>
                            <p className="text-xs text-red-200 uppercase font-bold tracking-wider mb-1">Call Us</p>
                            <p className="text-lg font-medium text-white group-hover:text-red-100 transition-colors">+91 98765 43210</p>
                        </div>
                    </div>

                    {/* Item 2: Email */}
                    <div className="flex items-start gap-5 group cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-red-200 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 backdrop-blur-sm shadow-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <div>
                            <p className="text-xs text-red-200 uppercase font-bold tracking-wider mb-1">Email Support</p>
                            <p className="text-lg font-medium text-white group-hover:text-red-100 transition-colors">support@flash360.com</p>
                        </div>
                    </div>

                    {/* Item 3: Address */}
                    <div className="flex items-start gap-5 group cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-red-200 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 backdrop-blur-sm shadow-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </div>
                        <div>
                            <p className="text-xs text-red-200 uppercase font-bold tracking-wider mb-1">Head Office</p>
                            <p className="text-lg font-medium text-white leading-snug group-hover:text-red-100 transition-colors">
                                Flash 360 Media House,<br />Civil Lines, Raipur, CG
                            </p>
                        </div>
                    </div>
                </div>
             </div>

             {/* Social Media Row */}
             <div className="relative z-10 mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
                 <span className="text-sm font-bold text-red-100">Follow us on:</span>
                 <div className="flex gap-4">
                     <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                     </a>
                     <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                     </a>
                     <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                     </a>
                 </div>
             </div>
          </div>

          {/* --- RIGHT SIDE: DYNAMIC FORM --- */}
          <div className="lg:col-span-3 bg-white p-8 lg:p-16 relative">
            
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100 animate-bounce">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Thank you for reaching out. Our editorial team will review your message shortly.</p>
                <button onClick={() => setStatus('idle')} className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-red-700 hover:-translate-y-1 transition-all duration-300 shadow-lg">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative">
                        <label className="absolute -top-3 left-3 bg-white px-2 text-xs font-bold text-gray-400 transition-all group-focus-within:text-red-600 uppercase tracking-wider">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-red-600 transition-colors bg-gray-50 focus:bg-white font-medium placeholder-transparent" placeholder="John Doe" />
                    </div>
                    <div className="group relative">
                        <label className="absolute -top-3 left-3 bg-white px-2 text-xs font-bold text-gray-400 transition-all group-focus-within:text-red-600 uppercase tracking-wider">Mobile Number</label>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-red-600 transition-colors bg-gray-50 focus:bg-white font-medium placeholder-transparent" placeholder="+91" />
                    </div>
                </div>

                <div className="group relative">
                    <label className="absolute -top-3 left-3 bg-white px-2 text-xs font-bold text-gray-400 transition-all group-focus-within:text-red-600 uppercase tracking-wider">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-red-600 transition-colors bg-gray-50 focus:bg-white font-medium placeholder-transparent" placeholder="mail@example.com" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative">
                        <label className="absolute -top-3 left-3 bg-white px-2 text-xs font-bold text-gray-400 transition-all group-focus-within:text-red-600 uppercase tracking-wider">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-red-600 transition-colors bg-gray-50 focus:bg-white font-medium placeholder-transparent" placeholder="City" />
                    </div>
                    <div className="group relative">
                        <label className="absolute -top-3 left-3 bg-white px-2 text-xs font-bold text-gray-400 transition-all group-focus-within:text-red-600 uppercase tracking-wider">State</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-red-600 transition-colors bg-gray-50 focus:bg-white font-medium placeholder-transparent" placeholder="State" />
                    </div>
                </div>

                <div className="group relative">
                    <label className="absolute -top-3 left-3 bg-white px-2 text-xs font-bold text-gray-400 transition-all group-focus-within:text-red-600 uppercase tracking-wider">Your Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-red-600 transition-colors bg-gray-50 focus:bg-white font-medium resize-none placeholder-transparent" placeholder="Type here..."></textarea>
                </div>

                {status === 'error' && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-center text-sm font-bold border border-red-200">
                        Failed to send message. Please try again later.
                    </div>
                )}

                <div className="pt-2">
                    <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-red-700 to-red-900 text-white font-bold uppercase tracking-widest hover:from-black hover:to-gray-900 transition-all duration-500 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 group">
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}