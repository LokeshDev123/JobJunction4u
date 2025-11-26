'use client'
import CategoryManager from "@/Components/Category";
import DashboardNavbar from "@/Components/DashboardNavbar"
import RoleManager from "@/Components/RoleManager";
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

     <div className="bg-[#242323] flex flex-col gap-4 max-w-7xl mx-auto my-10 p-6 ">

     <CategoryManager/>
     <RoleManager/>
     </div>
 
     </>
    );
}