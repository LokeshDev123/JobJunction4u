import DashboardNavbar from "@/Components/DashboardNavbar"
import { redirect,RedirectType } from "next/navigation"

import {Montserrat} from 'next/font/google'
import Image from "next/image"
import HeroSection from "@/Components/HeroSection"
import Footer from "@/Components/Footer"
const montserrat=Montserrat({subsets:["latin"]})

/*export async function generateStaticParams() {
  type BlogItem = {
  id: string;
  title: string;
  author: string;
  content: any[];  // or more specific if you know
  image: string;
  date: string;
};

const data=await(await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/read-all-blogs`,{next:{revalidate:3600},cache:"no-cache",method:"POST"})).json()
const iterateData: BlogItem[] = data.data;
 
  return iterateData.map((post:BlogItem) => ({
    blog: post.id,
  }))
}*/

export default async function Page({params}:{params:{blog:Promise<{ blog: string }>}}) {
  const resolvedParams = await params;
  const blogSlug = resolvedParams.blog; // Access properties after awaiting
  
  const data=await (await fetch(`${process.env.BASE_URL}/api/admin/blog/getmyblog`,{headers:{"Content-Type":"application/json"},body:JSON.stringify({id:blogSlug}),next:{revalidate:1},cache:"no-cache",method:"POST"})).json()
 
  
  console.log(data);
  
  if(!data.success){

    redirect("/404")
  }
 
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  
  const monthName = date.toLocaleString("en-US", { month: "long" }); // e.g., "October"
  const day = String(date.getDate()).padStart(2, "0");

  return `${monthName}, ${day} ${year}`;
}
 return (
  <>
  <HeroSection/>
    <div
      className={`${montserrat.className} min-h-screen mt-32 md:mt-20 mb-20 flex flex-col items-center p-4 sm:p-8 w-full bg-white text-black`}
    >
      <div className="max-w-7xl w-full">
        <h1 className="text-gray-600 text-xl font-semibold">
          {formatDate(data.data.date)}
        </h1>

        <h1 className="text-[#d97706] my-4 text-5xl sm:text-7xl font-bold">
          {data.data.title}
        </h1>

        <Image
          src={data.data.image}
          width={1920}
          height={1080}
          className="rounded-2xl shadow-lg"
          alt="Blog Image"
          unoptimized={true}
        />

        <p className="text-gray-700 mt-3 text-md font-medium">
          By ~ {data.data.author}
        </p>
      </div>

      {data.data.content.map(
        (
          ele: { headline: string; description: string },
          i: number
        ) => (
          <div key={i + 1} className="max-w-7xl w-full">
            <h1 className="text-black my-6 text-3xl font-semibold">
              {ele.headline}
            </h1>

            <p className="text-gray-800 mt-2 text-lg leading-8 text-justify">
              {ele.description}
            </p>
          </div>
        )
      )}
    </div>
    <Footer/>
  </>
);
}
