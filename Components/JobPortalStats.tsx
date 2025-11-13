"use client";
import { useEffect, useState } from "react";

const stats = [
  { id: 1, name: "Active Job Listings", value: 12000 },
  { id: 2, name: "Companies Hiring", value: 2500 },
  { id: 3, name: "Successful Placements", value: 45000 },
  { id: 4, name: "Average Response Time (hrs)", value: 24 },
];

export default function JobPortalStats() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000; // animation duration in ms
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);

      setCounts(
        stats.map((stat) =>
          Math.floor(stat.value * progress)
        )
      );

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="bg-emerald-700 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Empowering Careers. Connecting Talent.
            </h2>
            <p className="mt-4 text-lg text-teal-50">
              Join thousands of professionals finding their dream jobs and companies discovering top talent.
            </p>
          </div>

          {/* Stats */}
          <dl className="mt-16 grid grid-cols-1 gap-1 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className="flex flex-col bg-white/10 backdrop-blur-sm p-8 hover:bg-white/20 transition-all duration-300"
              >
                <dt className="text-sm font-medium text-teal-100">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                  {counts[index].toLocaleString()}
                  {stat.id !== 4 && "+"}
                  {stat.id === 4 && " hrs"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
