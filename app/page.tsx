import BlogSection from "@/Components/BlogSection";
import CategoryContainer from "@/Components/CategoryContainer";
import Footer from "@/Components/Footer";
import HeroSection from "@/Components/HeroSection";
import JobPortalStats from "@/Components/JobPortalStats";
import JobStatsSection from "@/Components/JobStatsSection";
import RecentJobs from "@/Components/RecentJobs";

import TestimonialSection from "@/Components/TestimonialSection";
import {Inter} from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })
export default function Page() {
  return (
<div className={`${inter.className}`}>
<HeroSection/>
<JobPortalStats/>
<RecentJobs/>
<CategoryContainer/>
<JobStatsSection/>

<TestimonialSection/>
<BlogSection/>
<Footer/>
</div>
  );
}