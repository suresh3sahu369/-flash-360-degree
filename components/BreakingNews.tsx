// 📂 SAVE THIS IN: frontend/components/BreakingNews.tsx

export default function BreakingNews({ text }: { text: string }) {
  return (
    <div className="bg-red-700 text-white text-sm py-2 px-4 flex items-center shadow-md">
      <span className="font-bold uppercase tracking-wider mr-4 bg-white text-red-700 px-2 py-0.5 text-xs rounded">
        Breaking
      </span>
      <marquee className="w-full">
        {text}
      </marquee>
    </div>
  );
}