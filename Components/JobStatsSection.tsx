"use client";

const stats = [
  { id: 1, name: "Active Job Listings", value: "12,500+" },
  { id: 2, name: "Registered Companies", value: "3,200+" },
  { id: 3, name: "Active Job Seekers", value: "45,000+" },
  { id: 4, name: "Successful Hires", value: "10,800+" },
];

export default function JobStatsSection() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        {/* Left: Image Card */}
        <div className="flex justify-center">
          <div className="w-80 h-80 sm:w-96 sm:h-96 bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
            <img
              alt="Job Portal Team"
              src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1000&q=80"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Right: Content Section */}
        <div>
          <h2 className="text-base font-semibold text-emerald-600">
            Our Growth Journey
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Connecting talent with opportunity across industries
          </p>
          <p className="mt-6 text-lg text-gray-600">
            Our job portal bridges the gap between job seekers and employers.
            Trusted by thousands of professionals, we simplify hiring and help
            businesses grow faster.
          </p>

          {/* Stats Section */}
          <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col gap-y-2 border-l-4 border-emerald-500 pl-4"
              >
                <dt className="text-sm text-gray-500">{stat.name}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-gray-900">
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
