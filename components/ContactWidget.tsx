'use client';

import { useState } from 'react';

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 👇 Form state structure
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    mobile: '', 
    city: '', 
    state: '', 
    message: '' 
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ FIX: Dashboard variable use kiya localhost hatakar
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const res = await fetch(`${baseUrl}/contact`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'application/json' // InfinityFree compatibility
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Message Sent Successfully! 🚀');
        setFormData({ name: '', email: '', mobile: '', city: '', state: '', message: '' });
        setIsOpen(false);
      } else {
        alert('Failed to send. Please try again.');
      }
    } catch (error) {
      console.error("Widget Error:", error);
      alert('Server Connection Error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* POPUP FORM */}
      {isOpen && (
        <div className="mb-4 w-[320px] md:w-[380px] bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-red-700 to-red-900 p-4 flex justify-between items-center">
            <h3 className="text-white font-bold tracking-wide text-lg">Contact Us</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 font-bold text-xl">&times;</button>
          </div>

          {/* Form Body (Scrollable) */}
          <form onSubmit={handleSubmit} className="p-5 space-y-3 max-h-[400px] md:max-h-[450px] overflow-y-auto custom-scrollbar">
            
            <input type="text" name="name" required placeholder="Full Name" 
                className="w-full bg-[#1a1a1a] border border-gray-700 text-white p-3 rounded focus:border-red-500 outline-none placeholder-gray-500"
                value={formData.name} onChange={handleChange} />

            <input type="email" name="email" required placeholder="Email Address"
                className="w-full bg-[#1a1a1a] border border-gray-700 text-white p-3 rounded focus:border-red-500 outline-none placeholder-gray-500"
                value={formData.email} onChange={handleChange} />

            <input type="tel" name="mobile" required placeholder="Mobile Number"
                className="w-full bg-[#1a1a1a] border border-gray-700 text-white p-3 rounded focus:border-red-500 outline-none placeholder-gray-500"
                value={formData.mobile} onChange={handleChange} />

            <div className="flex gap-2">
                <input type="text" name="city" required placeholder="City"
                    className="w-1/2 bg-[#1a1a1a] border border-gray-700 text-white p-3 rounded focus:border-red-500 outline-none placeholder-gray-500"
                    value={formData.city} onChange={handleChange} />
                
                <input type="text" name="state" required placeholder="State"
                    className="w-1/2 bg-[#1a1a1a] border border-gray-700 text-white p-3 rounded focus:border-red-500 outline-none placeholder-gray-500"
                    value={formData.state} onChange={handleChange} />
            </div>

            <textarea name="message" required rows={3} placeholder="Your Message..."
                className="w-full bg-[#1a1a1a] border border-gray-700 text-white p-3 rounded focus:border-red-500 outline-none resize-none placeholder-gray-500"
                value={formData.message} onChange={handleChange} ></textarea>

            <button type="submit" disabled={loading}
                className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded uppercase tracking-wider transition-all duration-300 shadow-lg transform active:scale-95">
                {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      )}

      {/* FLOATING BUTTON ICON */}
      <button onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-50 ${isOpen ? 'bg-gray-800 rotate-90' : 'bg-red-700'}`}>
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
      </button>

      {/* Scrollbar CSS */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0a0a0a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>
    </div>
  );
}