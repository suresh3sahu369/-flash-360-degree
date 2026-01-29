// 📂 SAVE THIS IN: frontend/components/Header.tsx

export default function Header() {
  return (
    <header className="border-b-4 border-black py-10 bg-white">
      <div className="container mx-auto px-4 text-center">
        
        {/* --- MAIN LOGO (Animated & Gradient) --- */}
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter uppercase mb-2">
          
          {/* 1. FLASH (Black Gradient - Ab ye White background par saaf dikhega) */}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-800 to-gray-600">
            FLASH
          </span>

          {/* 2. 360 (Red Pulse Animation - Ye chamkega) */}
          <span className="text-red-700 animate-pulse mx-1 inline-block">
            360
          </span>

          {/* 3. DEGREE (Black Gradient) */}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 via-gray-800 to-black">
            DEGREE
          </span>

        </h1>

        {/* --- TAGLINE (Stylish Lines ke saath) --- */}
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold text-gray-600 uppercase tracking-[0.2em] mt-2">
          <span className="w-8 h-[2px] bg-red-700 inline-block"></span>
          <span>Fast . Accurate . 360° Coverage</span>
          <span className="w-8 h-[2px] bg-red-700 inline-block"></span>
        </div>

      </div>
    </header>
  );
}