import BlogSection from "@/Components/BlogSection";
import CategoryContainer from "@/Components/CategoryContainer";
import ContactUs from "@/Components/ContactUs";
import Footer from "@/Components/Footer";
import HeroSection from "@/Components/HeroSection";
import JobPortalStats from "@/Components/JobPortalStats";
import JobStatsSection from "@/Components/JobStatsSection";
import RecentJobs from "@/Components/RecentJobs";
import ServiceWorkerRegister from '@/Components/ServiceWorkerRegister';
import InstallPopup from '@/Components/InstallPopup';
import TestimonialSection from "@/Components/TestimonialSection";
import {Inter} from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })
export default async function Page() {

   const blogData=await (await fetch(`${process.env.BASE_URL}/api/admin/blog/readallblogs`,{method:"POST",next:{revalidate:0},cache:"no-store"})).json();
  
 
   
  return (
    <>
       <ServiceWorkerRegister/>
        <InstallPopup/>
<div className={`${inter.className}`}>

<HeroSection/>
<JobPortalStats/>
<RecentJobs/>
<CategoryContainer/>
<JobStatsSection/>
<TestimonialSection/>
<BlogSection posts={blogData.data} />
<ContactUs/>
<Footer/>
</div>
    </>
  );
}