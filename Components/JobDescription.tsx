/* eslint-disable react-hooks/immutability */
"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import { FormEvent, useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { SquareLock01Icon } from "@hugeicons-pro/core-duotone-rounded";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
export default function JobDescriptionPage({myjob}:{myjob:{_id:string,title: string; description: string, image_url: string, category: string, role: string, job_type: string, location: string, responsibilities: string[], skills: string[], salary: string, experience: string, job_link: string, created_at: string, job_expiry_date: string}}) {
  const router = useRouter();
   const { error, isLoading, Razorpay } = useRazorpay();
  const [status, setstatus] = useState(false)

  useEffect(()=>{

    if(!sessionStorage.getItem("authToken")){
      router.push("/signin")
    }

  },[])


  useEffect(()=>{
    

      checkSubscriptionStatus()
    
  },[])
  

  if (!myjob) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Job not found
      </div>
    );
  }


  const checkSubscriptionStatus=async()=>{

    try {
      
      const res=await(await fetch(`/api/payment/exist-subscription?token=${sessionStorage.getItem("authToken")}`,{method:"POST",headers:{"Content-Type":"application/json"}})).json()
     
      
      if(res.success){

        setstatus(true)
        

      }
      
    } catch (error) {
      
    }
  
}

const checkSubscription = async (e: FormEvent) => {
  e.preventDefault();

  try {
    const res = await (
      await fetch(
        `/api/payment/exist-subscription?token=${sessionStorage.getItem("authToken")}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      )
    ).json();

    if (res.success) {
 window.open(myjob.job_link, "_blank");
  return;
    }

    // Create order
    const createorder = await (
      await fetch(
        `/api/payment/create-order?token=${sessionStorage.getItem("authToken")}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      )
    ).json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      amount: createorder.order.amount,
      currency: "INR",
      name: "Jobjunction4u",
      description: "1 Year Premium Subscription",
      image: "https://www.jobjunction4u.com/logo.png",
      order_id: createorder.order.id,

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: async function (response: any) {
        try {
          const verify = await (
            await fetch(`/api/payment/verify-payment?token=${sessionStorage.getItem("authToken")}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({razorpayOrderId:response.razorpay_order_id,razorpayPaymentId:response.razorpay_payment_id,razorpaySignature:response.razorpay_signature}),
            })
          ).json();

          if (verify.success) {
            setstatus(true);
            alert("Payment Successful!");
          } else {
            alert("Payment verification failed!");
          }
        } catch (err) {
          alert("Something went wrong!");
        }
      },

      prefill: {
        name: createorder.name,
        email: createorder.email,
        contact: createorder.phone,
      },
      theme: { color: "#3399cc" },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
  }
};


  return (
    <>
    <HeroSection/>
    
    <div id="rzp-button1"></div>
    <div className="min-h-screen bg-gray-50 py-6 px-3 sm:px-6">
      
      {/* Header */}
      <div className=" mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-semibold">Job Description</h2>
        <button onClick={() => router.back()}>
          <XMarkIcon className="h-7 w-7 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="  mx-auto bg-white mt-4 rounded-xl shadow-md p-4 sm:p-8 space-y-8">

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

        {/* Meta Info */}
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
            {(myjob.responsibilities || []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold">Required Skills</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {(myjob.skills || []).map((skill, i) => (
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
  <button
    onClick={checkSubscription}
    className={`flex items-center justify-center gap-2 text-center w-full
      ${!status ? "bg-blue-600 hover:bg-blue-700" : "bg-teal-600 hover:bg-teal-700"} 
      text-white py-3 rounded-xl font-medium transition-all`}
  >
    {!status ? (
      <>
        <HugeiconsIcon icon={SquareLock01Icon} className="w-5 h-5" />
        <span>Subscribe • ₹29 / 1 Year</span>
      </>
    ) : (
      <span>Apply Now</span>
    )}
  </button>
</div>


      </div>
    </div>

    <Footer/>
            </>
  );
}
