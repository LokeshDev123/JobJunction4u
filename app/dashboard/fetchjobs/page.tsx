/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Footer from "@/Components/Footer";
import {
  HandBag01Icon,
  Location04Icon,
  PermanentJobIcon,
  TimeQuarter02Icon,
} from "@hugeicons-pro/core-duotone-rounded";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import DashboardNavbar from "@/Components/DashboardNavbar";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [jobdescription, setjobdescription] = useState(false);
  
  // SEARCH + DEBOUNCE
  const [search, setsearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  
  // JOB DATA
  const [result, setresult] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  const [credentials, setcredentials] = useState({
    category: "",
    role: "",
    job_type: "",
    experience: "",
  })
  
  const router=useRouter()
  useEffect(()=>{
    if(!sessionStorage.getItem("adminToken")){router.push("/dashboard/signin")}
    
  },[])

  const [myjob, setmyjob] = useState<any>(null);

  const [categories, setCategories] = useState([]);
  const [roles, setRoles] = useState([]);
  const [myCategory, setMyCategory] = useState("");

  const [categoryName, setcategoryName] = useState('')
  // 🔥 Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);





  // 🔥 Fetch data
  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/jobs/fetchjob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          search: debouncedSearch,
          skip: page,
          ...credentials,
        }),
      });

      const data = await response.json();

      
      if (!data.success) return;

      if (!data.data || data.data.length === 0) {
        setHasMore(false);
        return;
      }

      setresult((prev): any => [...prev, ...data.data]);
      setPage((prev) => prev + 50);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  // Reset & refetch when search or filter changes
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setresult([]);
    fetchData();
  }, [debouncedSearch, credentials]);

  // 🕒 Time Ago Function
  function timeAgo(dateString: string) {
    const now = new Date();
    const past = new Date(dateString);

    let diff = Math.floor((now.getTime() - past.getTime()) / 1000);

    const days = Math.floor(diff / (3600 * 24));
    diff %= 3600 * 24;

    const hours = Math.floor(diff / 3600);
    diff %= 3600;

    const minutes = Math.floor(diff / 60);

    let result = "";
    if (days > 0) result += `${days}d `;
    if (hours > 0) result += `${hours}hr `;
    if (minutes > 0) result += `${minutes}min `;

    return result.trim() + " ago";
  }

  const handleJobdescription = (jobData: any) => {
    setmyjob(jobData);
    setjobdescription(true);
  };

  const handleDeleteJob = async (id: string) => {
    const response = await (
      await fetch(`/api/admin/jobs/deletejob?token=${sessionStorage.getItem(
        "adminToken"
      )}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      })
    ).json();

    if (response.success) {
      alert("Job Deleted Successfully");
      setresult([]);
      setPage(0);
      setHasMore(true);
      fetchData();
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`/api/admin/category/fetch-category`, {
        method: "POST",
      });
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Fetch roles by category ID
  const fetchRoles = async (categoryId: string) => {
    if (!categoryId) return;
    try {
      const res = await fetch(`/api/admin/role/fetch-role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_id: categoryId }),
      });
      const data = await res.json();
      setRoles(data.data || []);
      setcategoryName(data.category || '');
      
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Load categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Load roles when category changes
  useEffect(() => {
    if (myCategory) {
      fetchRoles(myCategory);
      setcredentials((prev) => ({ ...prev, category: myCategory }));
    }
  }, [myCategory]);

  const applyfilter = () => {

    setOpen(false);
    setPage(0);
    setresult([]);
    setHasMore(true);
    fetchData();
  };


  const RemoveFilter=()=>{
    setcredentials({
      category: "",
      role: "",
      job_type: "",
      experience: "",
    })
    setOpen(false);
    setPage(0);
    setresult([]);
    setHasMore(true);
    setcategoryName('')
    fetchData();
  }

  return (
    <>
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto my-10">
        {/* Search + Filter */}
        <div className="w-full mt-6 flex flex-col md:flex-row gap-3">
          <div className="flex items-center w-full md:w-2/3 bg-white shadow rounded-md px-4 py-3">
            <input
              type="text"
              placeholder="Search job title, company, or skills..."
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              className="w-full text-gray-700 outline-none"
            />
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center gap-2 w-full md:w-1/3 bg-blue-600 text-white px-4 py-3 rounded-md shadow hover:bg-blue-700"
          >
            Filters
          </button>
        </div>

        <h1 className="font-bold text-4xl mt-6">Recent Jobs Available</h1>
        <p className="text-sm text-gray-600 py-2">
          Explore the latest job opportunities...
        </p>

        {/* Infinite Scroll */}
        <InfiniteScroll
          dataLength={result.length}
          next={fetchData}
          hasMore={hasMore}
          className="p-4"
          loader={<h4 className="text-center py-4">Loading...</h4>}
          endMessage={
            <p className="text-center py-4 font-semibold text-gray-600">
              🎉 Yay! You have seen it all
            </p>
          }
        >
          {result.map((jobData: any, i) => (
            <div
              key={i}
              className="w-full bg-white min-h-64 flex gap-4 flex-col p-4 shadow mb-4"
            >
              <span className="max-w-fit rounded-full bg-green-400/10 px-2 py-1 text-xs font-medium text-green-600">
                {timeAgo(jobData.created_at)}
              </span>

              <div className="flex flex-col sm:flex-row items-center gap-2">
                <Image
                  src={jobData.image_url}
                  width={100}
                  height={100}
                  className="rounded-full size-24"
                  alt="Job Image"
                />

                <div>
                  <h1 className="font-semibold text-md md:text-xl">
                    {jobData.title}
                  </h1>
                  <p className="text-gray-600 hidden md:block">
                    {jobData.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center flex-wrap md:justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex gap-2 items-center p-2 text-sm">
                    <HugeiconsIcon icon={HandBag01Icon} />
                    {jobData.category}
                  </div>

                  <div className="flex gap-2 items-center p-2 text-sm">
                    <HugeiconsIcon icon={PermanentJobIcon} />
                    {jobData.role}
                  </div>

                  <div className="flex gap-2 items-center p-2 text-sm">
                    <HugeiconsIcon icon={TimeQuarter02Icon} />
                    {jobData.job_type}
                  </div>

                  <div className="flex gap-2 items-center p-2 text-sm">
                    <HugeiconsIcon icon={Location04Icon} />
                    {jobData.location}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleJobdescription(jobData)}
                    className="flex gap-2 my-2 px-4 py-2 text-sm bg-emerald-700 rounded-sm text-white"
                  >
                    Apply Now
                  </button>
                     <Link
                    href={`/dashboard/job/${jobData._id}`}
                    className="flex gap-2 my-2 px-4 py-2 text-sm bg-amber-700 rounded-sm text-white"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDeleteJob(jobData._id)}
                    className="flex gap-2 my-2 px-4 py-2 text-sm bg-red-700 rounded-sm text-white"
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>

      {/* FILTER MODAL */}
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

            <div className="space-y-4">
              <select
                onChange={(e) => setMyCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none"
              >
                <option>{categoryName ? categoryName :"Select Category"}</option>
                {categories.map((ele: any, i: number) => (
                  <option key={i} value={ele._id}>
                    {ele.name}
                  </option>
                ))}
              </select>

              <select
                onChange={(e) =>
                  setcredentials((prev) => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
                className="w-full border rounded-lg px-3 py-2 outline-none"
              >
                <option>{credentials.role ? credentials.role : "Select Role"} </option>
                {roles.map((ele: any, i: number) => (
                  <option key={i} value={ele.name}>
                    {ele.name}
                  </option>
                ))}
              </select>

              <select
                onChange={(e) =>
                  setcredentials((prev) => ({
                    ...prev,
                    job_type: e.target.value,
                  }))
                }
                className="w-full border rounded-lg px-3 py-2 outline-none"
              >
                <option defaultChecked>{credentials.job_type ? credentials.job_type : "Select Job Type"}</option>
                <option value={"Full Time"}>Full Time</option>
                <option value={"Part Time"}>Part Time</option>
                <option value={"Remote"}>Remote</option>
                <option value={"Contract"}>Contract</option>
                <option value={"Internship"}>Internship</option>
              </select>

              <select
                onChange={(e) =>
                  setcredentials((prev) => ({
                    ...prev,
                    experience: e.target.value,
                  }))
                }
                className="w-full border rounded-lg px-3 py-2 outline-none"
              >
                <option defaultChecked>{credentials.experience ? credentials.experience : "Select Experience"}</option>
                <option value={"Freshers"}>Freshers</option>
                <option value={"1 years"}>1 years</option>
                <option value={"2 years"}>2 years</option>
                <option value={"5 years"}>5 years</option>
                <option value={"7 years"}>7 years</option>
                <option value={"10 years"}>10 years</option>
              </select>
            </div>

            {/* <button
              onClick={applyfilter}
              className="w-full mt-6 bg-emerald-600 text-white py-2 rounded-lg"
            >
              Apply Filters
            </button> */}
             <button
              onClick={RemoveFilter}
              className="w-full mt-2 bg-red-600 text-white py-2 rounded-lg"
            >
              Delete Filters
            </button>
          </DialogPanel>
        </div>
      </Dialog>

      {/* JOB DESCRIPTION MODAL */}
<Dialog
  open={jobdescription}
  onClose={() => setjobdescription(false)}
  className="relative z-50"
>
  {/* Backdrop */}
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

  {/* Wrapper */}
  <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">

    <DialogPanel className="w-full max-w-4xl sm:max-w-5xl lg:max-w-7xl bg-white rounded-xl shadow-xl overflow-hidden">

      {myjob && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b">
            <h2 className="text-xl sm:text-2xl font-semibold">Job Description</h2>

            <button onClick={() => setjobdescription(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-8 space-y-8">

            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

              <img
                src={myjob.image_url}
                alt="Company Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shadow-md border"
              />

              <div className="text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  {myjob.title}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3 text-xs sm:text-sm">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {myjob.category}
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {myjob.role}
                  </span>
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                    {myjob.job_type}
                  </span>
                </div>
              </div>
            </div>

            {/* Meta Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 text-sm">
              <p>📍 {myjob.location}</p>
              <p>🕒 Experience: {myjob.experience}</p>
              <p>💰 Salary: {myjob.salary}</p>
              <p className="text-gray-500">
                📅 Posted: {myjob.created_at?.split("T")[0]}
              </p>
              <p className="text-red-600 font-medium">
                ⏳ Expires: {myjob.job_expiry_date?.split("T")[0]}
              </p>
            </div>

            <hr className="my-4" />

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold">Job Description</h2>
              <p className="mt-3 text-gray-700 leading-relaxed text-sm sm:text-base">
                {myjob.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div>
              <h2 className="text-xl font-semibold">Responsibilities</h2>
              <ul className="mt-3 list-disc list-inside text-gray-700 space-y-2 text-sm sm:text-base">
                {(myjob.responsibilities || []).map((item: any, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xl font-semibold">Required Skills</h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {(myjob.skills || []).map((skill: any, i: number) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-4">
              <a
                href={myjob.job_link}
                target="_blank"
                className="block text-center bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-all"
              >
                Apply Now
              </a>
            </div>

            

          </div>
        </>
      )}

    </DialogPanel>
  </div>
</Dialog>


    </>
  );
}
