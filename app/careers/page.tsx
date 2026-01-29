export default function CareersPage() {
  const jobs = [
    { title: 'Senior Political Editor', location: 'Remote / Delhi', type: 'Full Time' },
    { title: 'Tech Journalist', location: 'Remote', type: 'Part Time' },
    { title: 'React/Next.js Intern', location: 'Raipur', type: 'Internship' },
  ];

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-center mb-4 uppercase">Join Our <span className="text-red-700">Team</span></h1>
        <p className="text-center text-gray-500 mb-12">We are looking for passionate storytellers and tech wizards.</p>

        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-red-700 transition">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
              </div>
              <a href="mailto:hr@flash360.com" className="bg-black text-white px-6 py-2 rounded font-bold text-sm hover:bg-red-700 transition">
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}