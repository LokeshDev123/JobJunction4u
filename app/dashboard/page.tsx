'use client'
import CategoryManager from "@/Components/Category";
import DashboardNavbar from "@/Components/DashboardNavbar"
import RoleManager from "@/Components/RoleManager";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

    const [jobs, setjobs] = useState(200)
const router=useRouter()
    useEffect(()=>{

    if(window!==undefined && !sessionStorage.getItem("adminToken") && !sessionStorage.getItem("recruiterToken")){
        router.push("/dashboard/signin")
    }
},[])



const countjobs=async()=>{
    const res=await fetch("/api/admin/jobs/total-jobs-counts",{
        method:"POST",
        headers:{'Content-Type':'application/json'}
    })
    const data=await res.json()
    setjobs(data.jobs)
   
}


    
    return (
     <>

     
     <DashboardNavbar/>

     <div className="bg-[#242323] flex flex-col gap-4 max-w-7xl mx-auto my-10 p-6 ">
     
     <div className="text-white">Total Jobs: {jobs}</div>

     <CategoryManager/>
     <RoleManager/>
     </div>
 
     </>
    );
}