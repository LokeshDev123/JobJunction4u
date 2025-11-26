'use client'

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import DashboardNavbar from "@/Components/DashboardNavbar";

export default function AdminSignup() {
  const router = useRouter();



    useEffect(()=>{
      if(!sessionStorage.getItem("adminToken")){router.push("/dashboard/signin")}
      
    },[])

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    mobile_no: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`/api/user/createrecruiter?token=${sessionStorage.getItem("adminToken")}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...credentials,
          user_type: "recruiter",
          authpasscode: process.env.NEXT_PUBLIC_AUTH_PASS,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Recruiter Account Created Successfully");
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Error creating admin");
    }
  };

  return (
    <>
      <Toaster position="top-center" />

<DashboardNavbar/>
      <div className=" mt-6 text-white flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-[#181818] p-8 rounded-xl shadow-xl border border-white/10">

          <h2 className="text-3xl font-bold text-center mb-6">Admin Signup</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* NAME */}
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                required
                maxLength={50}
                pattern="^[a-zA-Z ]+$"
                value={credentials.name}
                onChange={(e) =>
                  setCredentials({ ...credentials, name: e.target.value })
                }
                className="mt-1 w-full rounded-md bg-[#262626] px-3 py-2 text-white border border-white/10 focus:outline-emerald-500"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                required
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="mt-1 w-full rounded-md bg-[#262626] px-3 py-2 text-white border border-white/10 focus:outline-emerald-500"
              />
            </div>

            {/* MOBILE */}
            <div>
              <label className="text-sm font-medium">Mobile No</label>
              <input
                type="tel"
                required
                maxLength={10}
                minLength={10}
                pattern="^[0-9]{10}$"
                value={credentials.mobile_no}
                onChange={(e) =>
                  setCredentials({ ...credentials, mobile_no: e.target.value })
                }
                className="mt-1 w-full rounded-md bg-[#262626] px-3 py-2 text-white border border-white/10 focus:outline-emerald-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="mt-1 w-full rounded-md bg-[#262626] px-3 py-2 text-white border border-white/10 focus:outline-emerald-500"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                required
                value={credentials.cpassword}
                onChange={(e) =>
                  setCredentials({ ...credentials, cpassword: e.target.value })
                }
                className="mt-1 w-full rounded-md bg-[#262626] px-3 py-2 text-white border border-white/10 focus:outline-emerald-500"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-emerald-600 py-2 rounded-md text-white font-semibold hover:bg-emerald-500 transition"
            >
              Create Recruiter Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
