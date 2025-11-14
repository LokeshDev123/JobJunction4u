import DashboardNavbar from "@/Components/DashboardNavbar"
import Footer from "@/Components/Footer"
import { redirect,RedirectType } from "next/navigation"

import {Montserrat} from 'next/font/google'
import Image from "next/image"
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

  
  const data=await (await fetch(`/api/getmyblog`,{headers:{"Content-Type":"application/json"},body:JSON.stringify({id:params.blog}),next:{revalidate:1},cache:"no-cache",method:"POST"})).json()
 
  if(!data.success){

    redirect("/404")
  }
 
  const formattedDate=(dateString:string)=>{
    
  const formatted = new Date(dateString.split(" ")[0]).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  
  return formatted
}

  
  return (
    <>
    <DashboardNavbar/>
    <div className={`${montserrat.className} min-h-screen my-20 flex flex-col items-center p-4 sm:p-8   bg-[url(/blob-scene-haikei3.svg)] md:bg-[url(/blob-scene-haikei2.svg)] lg:bg-[url(/blob-scene-haikei.svg)]  w-full  bg-cover bg-center bg-no-repeat `}>

<div className="max-w-7xl  w-full ">

      <h1 className="text-gray-700 text-xl font-semibold">{formattedDate(data.data.date)}</h1>
      <h1 className="text-gray-700 my-4 text-5xl sm:text-7xl font-semibold">{data.data.title}</h1>
      <Image src={data.data.image} width={1920} height={1080} className="rounded-2xl shadow" alt="Blog Image"/>
      <p className="text-gray-900 mt-2 text-md ">By ~ {data.data.author}</p>
</div>

{

data.data.content.map((ele:{headline:string,description:string},i:number)=>(

  <div key={i+1} className="max-w-7xl  w-full  ">
 <h1 className="text-gray-700 my-4 text-3xl font-semibold">{ele.headline}</h1>
 <p className="text-gray-900 mt-2 text-justify text-md ">{ele.description}</p>
</div>
))
}
    </div>
    <Footer/>
                  </>
  )
}
