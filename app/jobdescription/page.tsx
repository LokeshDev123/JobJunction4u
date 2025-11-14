"use client";

import HeroSection from "@/Components/HeroSection";

export default function Page() {

  // DUMMY JOB DATA
  const job = {
    title: "Senior Full Stack Developer",
    description:
      "We are looking for a highly skilled full-stack developer to build scalable web applications and contribute to product architecture. You will be responsible for frontend, backend, API design, and deployment pipelines.",
    image_url:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000", // dummy banner
    category: "IT & Software",
    role: "Full Stack Developer",
    job_type: "Full Time",
    responsibilities: [
      "Develop and maintain scalable backend services",
      "Create responsive and user-friendly UI components",
      "Collaborate with product & design teams",
      "Optimize applications for maximum performance",
      "Write clean, reusable, testable code",
    ],
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "REST APIs",
      "Git",
    ],
    salary: "₹12,00,000 - ₹18,00,000 / year",
    location: "Bangalore, India",
    experience: "3+ Years",
    job_link: "https://google.com", // dummy apply link
    created_at: "2025-01-20",
    job_expiry_date: "2025-03-01",
  };

  return (

    <>
    <HeroSection/>
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* Banner Image */}
        <img
          src={job.image_url}
          alt={job.title}
          className="w-full h-64 object-cover rounded-xl"
          />

        {/* Job Title & Meta */}
        <div className="mt-8">
          <h1 className="text-3xl font-semibold text-gray-900">{job.title}</h1>

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {job.category}
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              {job.role}
            </span>
            <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
              {job.job_type}
            </span>
          </div>

          <div className="mt-4 text-gray-600 text-sm">
            📍 <span className="font-medium">{job.location}</span>
          </div>

          <div className="mt-1 text-gray-600 text-sm">
            🕒 Experience: <span className="font-medium">{job.experience}</span>
          </div>

          <div className="mt-1 text-gray-600 text-sm">
            💰 Salary: <span className="font-medium">{job.salary}</span>
          </div>

          <div className="mt-1 text-gray-500 text-sm">
            Posted: {new Date(job.created_at).toLocaleDateString()} • Expires:{" "}
            {new Date(job.job_expiry_date).toLocaleDateString()}
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        {/* Responsibilities */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Responsibilities</h2>
          <ul className="mt-3 list-disc list-inside text-gray-700 space-y-2">
            {job.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Required Skills</h2>
          <div className="flex flex-wrap gap-3 mt-4">
            {job.skills.map((skill, i) => (
                <span
                key={i}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-10">
          <a
            href={job.job_link}
            target="_blank"
            className="block text-center bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-all"
            >
            Apply Now
          </a>
        </div>

      </div>
    </div>
              </>
  );
}
