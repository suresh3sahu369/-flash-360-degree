export default function TeamPage() {
  const team = [
    { name: 'Suresh Kumar Sahu', role: 'Founder & Editor-in-Chief', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh' },
    { name: 'Chitresh Kumar Sahu', role: 'Senior Business Analyst', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chitresh' },
    { name: 'Aditi Sharma', role: 'Head of Politics', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditi' },
    { name: 'Rahul Verma', role: 'Tech Journalist', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
  ];

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold uppercase mb-4">Meet The <span className="text-red-700">Team</span></h1>
          <p className="text-gray-500">The minds behind the headlines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition text-center group">
              <div className="h-48 bg-gray-200 overflow-hidden relative">
                 <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-red-700 transition">{member.name}</h3>
                <p className="text-red-600 text-xs font-bold uppercase tracking-wider mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}