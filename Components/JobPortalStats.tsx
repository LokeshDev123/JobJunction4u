const stats = [
  { id: 1, name: 'Active Job Listings', value: '12,000+' },
  { id: 2, name: 'Companies Hiring', value: '2,500+' },
  { id: 3, name: 'Successful Placements', value: '45,000+' },
  { id: 4, name: 'Average Response Time', value: '24 hrs' },
];

export default function JobPortalStats() {
  return (
    <div className="bg-emerald-700 py-16 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Empowering Careers. Connecting Talent.
            </h2>
            <p className="mt-4 text-lg text-teal-50">
              Join thousands of professionals finding their dream jobs and companies discovering top talent.
            </p>
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-1 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-white/10 backdrop-blur-sm p-8 hover:bg-white/20 transition-all duration-300">
                <dt className="text-sm font-medium text-teal-100">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
