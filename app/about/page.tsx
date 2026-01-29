export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 text-center">
        <h1 className="text-5xl font-extrabold uppercase tracking-tighter mb-4">
          About <span className="text-red-700">Flash 360</span> Degree
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Unbiased. Unstoppable. Unfiltered. We bring you the truth from every angle.
        </p>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-8 text-lg leading-relaxed text-gray-700">
          <p>
            <span className="font-bold text-black text-2xl">Flash 360 Degree</span> is India's fastest-growing digital news platform. 
            Founded with a vision to democratize information, we believe in journalism that speaks truth to power.
          </p>
          <p>
            In an era of noise, we bring you clarity. Whether it's politics, technology, business, or sports, 
            our team of dedicated journalists ensures that you get the news <strong>fast</strong> and <strong>accurate</strong>.
          </p>
        </div>

        {/* Our Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { title: 'Truth First', desc: 'We verify before we publish. No fake news, only facts.' },
            { title: '360° Coverage', desc: 'We look at every story from all perspectives.' },
            { title: 'Reader Focused', desc: 'News that matters to you and impacts your life.' }
          ].map((val, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-700 shadow-sm">
              <h3 className="text-xl font-bold mb-2 uppercase">{val.title}</h3>
              <p className="text-sm text-gray-600">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}