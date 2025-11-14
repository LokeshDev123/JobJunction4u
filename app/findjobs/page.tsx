'use client'
import Footer from "@/Components/Footer";
import HeroSection from "@/Components/HeroSection";
import { HandBag01Icon, Location04Icon, PermanentJobIcon, TimeQuarter02Icon } from "@hugeicons-pro/core-duotone-rounded";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

  const job = {
    title: "Senior Full Stack Developer",
    company: "TechNova Pvt Ltd",
    description:
      "We are looking for a highly skilled full-stack developer to build scalable web applications and contribute to product architecture. You will be responsible for frontend, backend, API design, and deployment pipelines.",
    image_url:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=300", // looks like logo
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
    job_link: "https://google.com",
    created_at: "2025-01-20",
    job_expiry_date: "2025-03-01",
  };


    const posted = new Date(job.created_at).toISOString().split("T")[0];
  const expires = new Date(job.job_expiry_date).toISOString().split("T")[0];
export default function Page() {
      const [open, setOpen] = useState(false)

      const [jobdescription, setjobdescription] = useState(false)
    return (
        <>
        <HeroSection/>

           <div className="max-w-7xl mx-auto my-10">
     {/* Search + Filter */}
<div className="w-full mt-6 flex flex-col md:flex-row gap-3">

  {/* Search Bar */}
  <div className="flex items-center w-full md:w-2/3 bg-white shadow rounded-md px-4 py-3">
    <input
      type="text"
      placeholder="Search job title, company, or skills..."
      className="w-full text-gray-700 outline-none"
    />
  </div>

  {/* Filter Button */}
  <button onClick={()=>setOpen(true)} className="flex items-center justify-center gap-2 w-full md:w-1/3 bg-blue-600 text-white px-4 py-3 rounded-md shadow hover:bg-blue-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6h16.5M6 12h12M9.75 18h4.5"
      />
    </svg>
    Filters
  </button>

</div>

<div className="flex flex-wrap items-center justify-between py-4" >


     <div>

<h1 className="font-bold text-4xl ">Recent Jobs Available</h1>
<p className="text-sm 2xl:text-lg text-gray-600 py-2">
  Explore the latest job opportunities...
</p>
     </div>


</div>
<div className="flex flex-col b py-4   gap-4">

    <div className="w-full min-h-64 flex gap-4 flex-col p-4 shadow">

           <span className=" max-w-fit  rounded-full bg-green-400/10 px-2 py-1 text-xs font-medium text-green-600">
        12 Minute Ago
      </span>

      <div className="flex flex-col  sm:flex-row items-center gap-2">
        <Image src={"/logo.png"} width={100} height={100} className="rounded-full size-24" alt="Job Image"/>

        <div>

        <h1 className="font-semibold text-md md:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur reiciendis sit aspernatur hic deleniti cum iste magnam ea adipisci in.</h1>
        <p className="text-gray-600 hidden md:block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit molestias, nemo maxime alias ullam deleniti? Maxime, totam rem voluptatibus porro, excepturi error hic eligendi nesciunt ea quaerat illum. Sequi placeat officiis iure animi repellendus voluptates exercitationem iusto, illum explicabo error ex quod eaque amet.</p>
        </div>



      </div>

      <div className="flex items-center flex-wrap 2xl:flex-nowrap md:justify-between ">

    <div className="flex items-center gap-2 flex-wrap">

<Link href={"#"} className="flex gap-2 items-center p-2 text-sm sm:text-lg  rounded-sm  " ><HugeiconsIcon icon={HandBag01Icon} className="text-emerald-900   " />IT Industries</Link>
<Link href={"#"} className="flex gap-2 items-center p-2 text-sm sm:text-lg  rounded-sm  " ><HugeiconsIcon icon={PermanentJobIcon} className="text-emerald-900   " />Full Stack Developer</Link>
<Link href={"#"} className="flex gap-2 items-center p-2 text-sm sm:text-lg  rounded-sm  " ><HugeiconsIcon icon={TimeQuarter02Icon} className="text-emerald-900   " />Part Time</Link>
<Link href={"#"} className="flex gap-2 items-center p-2 text-sm sm:text-lg  rounded-sm  " ><HugeiconsIcon icon={Location04Icon} className="text-emerald-900   " />New Delhi, India</Link>
    </div>


    <Link onClick={()=>setjobdescription(true)} href={"#"} className="flex gap-2 w-full 2xl:w-fit text-center justify-center items-center my-4 px-4 py-2 text-sm sm:text-lg bg-emerald-700 rounded-sm text-white " >Apply Now <HugeiconsIcon icon={HandBag01Icon} className="text-white   " /></Link>
      </div>
    </div>

</div>





</div>













{/* Filter */}

<Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filter Jobs</h2>
            <button onClick={() => setOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* FILTER FIELDS */}
          <div className="space-y-4">

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select className="w-full border rounded-lg px-3 py-2 outline-none">
                <option value="">Select Category</option>
                <option>Full Stack Developer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select className="w-full border rounded-lg px-3 py-2 outline-none">
                <option value="">Select Role</option>
                <option>Software Engineer</option>
                <option>Senior Developer</option>
                <option>Team Lead</option>
              </select>
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Job Type</label>
              <select className="w-full border rounded-lg px-3 py-2 outline-none">
                <option value="">Select Job Type</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Remote</option>
                <option>Contract</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium mb-1">Experience</label>
              <select className="w-full border rounded-lg px-3 py-2 outline-none">
                <option value="">Select Experience</option>
                <option>Fresher</option>
                <option>1 - 2 years</option>
                <option>2 - 4 years</option>
                <option>5+ years</option>
              </select>
            </div>

            {/* Date Posted */}
            <div>
              <label className="block text-sm font-medium mb-1">Date Posted</label>
              <select className="w-full border rounded-lg px-3 py-2 outline-none">
                <option value="">Select Time</option>
                <option>Last 24 hours</option>
                <option>Last 3 days</option>
                <option>Last 7 days</option>
                <option>Last 14 days</option>
              </select>
            </div>
          </div>

          {/* APPLY BUTTON */}
          <button className="w-full mt-6 bg-emerald-600 text-white py-2 rounded-lg">
            Apply Filters
          </button>
        </DialogPanel>
      </div>
    </Dialog>



    {/* Job Description */}



<Dialog open={jobdescription} onClose={() => setjobdescription(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-7xl rounded-xl bg-white p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Job Description</h2>
            <button onClick={() => setjobdescription(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

        <div className=" bg-gray-50 py-10 px-6 md:px-10">
        <div className=" mx-auto bg-white rounded-2xl shadow-md p-8">

          {/* HEADER + LOGO */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={job.image_url}
              alt="Company Logo"
              className="w-24 h-24 rounded-xl object-cover shadow-md border"
            />

            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                {job.title}
              </h1>
              <p className="text-gray-600 text-sm mt-1">{job.company}</p>

              <div className="flex flex-wrap gap-3 mt-3 text-xs">
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
            </div>
          </div>

          {/* METADATA */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <p>📍 <span className="font-medium">{job.location}</span></p>
            <p>🕒 Experience: <span className="font-medium">{job.experience}</span></p>
            <p>💰 Salary: <span className="font-medium">{job.salary}</span></p>
            <p className="text-gray-500">
              Posted: {posted} • Expires: {expires}
            </p>
          </div>

          <hr className="my-8" />

          {/* DESCRIPTION */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* RESPONSIBILITIES */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Responsibilities</h2>
            <ul className="mt-3 list-disc list-inside text-gray-700 space-y-2">
              {job.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* SKILLS */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Required Skills</h2>
            <div className="flex flex-wrap gap-2 mt-4">
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

          {/* APPLY BUTTON */}
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
        </DialogPanel>
      </div>
    </Dialog>
<Footer/>
        
        </>
    );
}