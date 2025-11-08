'use client'
import DashboardNavbar from "@/Components/DashboardNavbar"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
const router=useRouter()
    useEffect(()=>{

    if(window!==undefined && !sessionStorage.getItem("adminToken") && !sessionStorage.getItem("recruiterToken")){
        router.push("/dashboard/signin")
    }
},[])
    
    return (
     <>
     <DashboardNavbar/>
     <div>sfsdfsdf</div>
     </>
    );
}