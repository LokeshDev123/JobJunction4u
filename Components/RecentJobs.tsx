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
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";

// STATIC JOB FOR DESCRIPTION MODAL
const selectedJob = {
  _id:"1",
  title: "Senior Full Stack Developer",
  description:
    "We are looking for a highly skilled full-stack developer to build scalable web applications and contribute to product architecture.",
  image_url:
    "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=300",
  category: "IT & Software",
  role: "Full Stack Developer",
  job_type: "Full Time",
  responsibilities: [
    "Develop and maintain scalable backend services",
    "Create responsive UI components",
    "Collaborate with teams",
    "Optimize apps",
    "Write clean code",
  ],
  skills: ["React.js", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
  salary: "₹12,00,000 - ₹18,00,000 / year",
  location: "Bangalore, India",
  experience: "3+ Years",
  job_link: "https://google.com",
  created_at: "2025-01-20",
  job_expiry_date: "2025-03-01",
};

export default function Page() {
  const [open, setOpen] = useState(false);
  const [jobdescription, setjobdescription] = useState(false);

  // SEARCH + DEBOUNCE
  const [search, setsearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);


  // JOB DATA
  const [result, setresult] = useState<{_id:string,title: string; description: string, image_url: string, category: string, role: string, job_type: string, location: string, responsibilities: string[], skills: string[], salary: string, experience: string, job_link: string, created_at: string, job_expiry_date: string}[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);

  const [credentials, setcredentials] = useState<{category:string,role:string,job_type:string,experience:string}>({category:"",role:"",job_type:"",experience:""})
 const [myjob, setmyjob] = useState<{_id:string,title: string; description: string, image_url: string, category: string, role: string, job_type: string, location: string, responsibilities: string[], skills: string[], salary: string, experience: string, job_link: string, created_at: string, job_expiry_date: string}>(selectedJob);
 
 
   const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [roles, setRoles] = useState<{ _id: string; name: string }[]>([]);
  const [role, setRole] = useState<string>("");
  const [myCategory, setMyCategory] = useState<string>("");
 // ===============================
  // 🔥 DEBOUNCE SEARCH INPUT (300ms)
  // ===============================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search,credentials]);

  // ===============================
  // 🔥 FETCH JOBS WITH PAGINATION
  // ===============================
  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/jobs/fetch-recent-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: debouncedSearch, skip:page, ...credentials,role:role }),
      });

      const data = await response.json();
      if (!data.success) return;

      if (data.jobs.length === 0) {
        setHasMore(false);
        return;
      }

      setresult((prev) => [...prev, ...data.jobs]);
      setPage((prev) => prev + 50);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  // RESET WHEN SEARCH CHANGES
  useEffect(() => {
    setTimeout(() => {
          setPage(0);
    setresult([]);
    setHasMore(true);
    fetchData();
    }, 0);

  }, [debouncedSearch]);

  // Format job dates
  const posted = new Date(selectedJob.created_at).toISOString().split("T")[0];
  const expires = new Date(selectedJob.job_expiry_date)
    .toISOString()
    .split("T")[0];




    function timeAgo(dateString:string) {
  const now = new Date();
  const past = new Date(dateString);

let diff = Math.floor((now.getTime() - past.getTime()) / 1000)

  const days = Math.floor(diff / (3600 * 24));
  diff %= 3600 * 24;

  const hours = Math.floor(diff / 3600);
  diff %= 3600;

  const minutes = Math.floor(diff / 60);

  // Build readable string
  let result = "";
  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}hr `;
  if (minutes > 0) result += `${minutes}min `;

  return result.trim() + " ago";
}


const handleJobdescription=(jobData:{_id:string,title: string; description: string, image_url: string, category: string, role: string, job_type: string, location: string, responsibilities: string[], skills: string[], salary: string, experience: string, job_link: string, created_at: string, job_expiry_date: string})=>{

  
    setmyjob(jobData);


  setjobdescription(true);
}






















  // ✅ Fetch categories once
  const fetchCategories = async (): Promise<void> => {
    try {
      const res = await fetch(`/api/admin/category/fetch-category`, { method: "POST" });
      const data = await res.json();
      setCategories(data.data || []);
      if (data.data.length > 0 && !myCategory) {
        setMyCategory(data.data[0]._id);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {

    }
  };

  // ✅ Fetch roles based on selected category
  const fetchRoles = async (categoryId: string): Promise<void> => {
    if (!categoryId) return;
    try {
      const res = await fetch(`/api/admin/role/fetch-role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_id: categoryId }),
      });
      const data = await res.json();
      
      setRoles(data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
    
      console.log("Fetched roles for category:", categoryId);
    }
  };
  useEffect(() => {
    if (myCategory) {
      fetchRoles(myCategory);
    }
  }, [myCategory]);

  // ✅ Run only once on mount
  useEffect(() => {
    fetchCategories();
  }, []);



  const applyfilter=()=>{
    setOpen(false);
    setTimeout(() => {
      setPage(0);
    setresult([]);
    setHasMore(true);
    fetchData();
    }, 0);
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function formatDate(dateString:any) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months start from 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
  return (
    <>

      <div className="max-w-7xl mx-auto my-10" id="jobs">
        {/* Search + Filter */}
        <div className="w-full mt-6 flex justify-between flex-col md:flex-row gap-3">
      
<div>

        <h1 className="font-bold text-4xl mt-6">Recent Jobs Available</h1>
        <p className="text-sm text-gray-600 py-2">
          Explore the latest job opportunities...
        </p>
</div>


<Link href="/findjobs" className="flex items-center justify-center gap-2 w-full h-16 md:w-1/3 bg-blue-600 text-white px-4 py-3 rounded-md shadow hover:bg-blue-700"><span>Find Jobs</span></Link>
        
        </div>



        {/* ========================= */}
        {/*     INFINITE SCROLL UI    */}
        {/* ========================= */}
        <InfiniteScroll
          dataLength={result.length}
          next={fetchData}
          hasMore={false}
          className="p-4 overflow-hidden"
          loader={<h4 className="text-center py-4">Loading...</h4>}
          endMessage={
            ""
          }
        >
          {result.map((jobData, i) => (
            <div
              key={i}
              className="w-full min-h-64 bg-white  flex gap-4 flex-col p-4 shadow mb-4"
            >
              <span className="max-w-fit rounded-full bg-green-400/10 px-2 py-1 text-xs font-medium text-green-600">
                {timeAgo(jobData.created_at) || "12 Min Ago"}
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
                  <Link
                    
                    href={`/job/${jobData._id}`}
                   
                    className="flex gap-2 my-2 px-4 py-2 text-sm bg-emerald-700 rounded-sm text-white"
                  >
                    Apply Now
                  </Link>

           
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
              <select onChange={(e )=>setMyCategory(e.target.value)} className="w-full border rounded-lg px-3 py-2 outline-none">
                <option defaultChecked>Select Category</option>
                {categories.map((ele:{name:string,_id:string},i:number)=>{
                  return <option  key={i} value={ele._id}>{ele.name}</option>
                })}
              </select>

              <select onChange={(e)=>setRole(e.target.value)} className="w-full border rounded-lg px-3 py-2 outline-none">
              <option defaultChecked>Select Role</option>
                {roles.map((ele:{name:string,_id:string},i:number)=>{
                  return <option  key={i} value={ele.name}>{ele.name}</option>
                })}
              </select>

              <select onChange={(e)=>setcredentials({...credentials,job_type:e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none">
                <option defaultChecked>Select Job Type</option>
                <option value={"Full Time"}>Full Time</option>
                <option value={"Part Time"}>Part Time</option>
                <option value={"Remote"}>Remote</option>
                <option value={"Contract"}>Contract</option>
                <option value={"Internship"}>Internship</option>
              </select>

              <select onChange={(e)=>setcredentials({...credentials,experience:e.target.value})} className="w-full border rounded-lg px-3 py-2 outline-none">
                <option  defaultChecked>Select Experience</option>
                <option value={"Freshers"}>Freshers</option>
                <option value={"1 years"}>1 years</option>
                <option value={"2 years"}>2 years</option>
                <option value={"5+ years"}>5+ years</option>
                <option value={"7+ years"}>7+ years</option>
                <option value={"10+ years"}>10+ years</option>
              </select>

          
            </div>

            <button onClick={applyfilter} className="w-full mt-6 bg-emerald-600 text-white py-2 rounded-lg">
              Apply Filters
            </button>
          </DialogPanel>
        </div>
      </Dialog>

      {/* JOB DESCRIPTION MODAL */}
 
    </>
  );
}
