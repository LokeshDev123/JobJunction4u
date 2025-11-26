'use client'
import Footer from "@/Components/Footer";
import HeroSection from "@/Components/HeroSection";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useActionState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';


export default function Page() {
  const router=useRouter()
interface signupSchema{
    mobile_no:string,
    password:string,
   
  }

  useEffect(()=>{
    if(sessionStorage.getItem("authToken")){
      router.push("/")
    }
  },[])

const submitForm=async(oldData:signupSchema,newData:FormData):Promise<signupSchema>=>{



 const mobile_no=newData.get("mobile_no")
  const password=newData.get("password")
 
  const response=await fetch(`/api/user/loginuser`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({mobile_no,password})
  })
  const data=await response.json()
 
  
  if(data.success){
    toast.success(data.message,{duration:2000})
    sessionStorage.setItem("authToken",data.token)
   
    setTimeout(()=>{
      router.push("/")

    },2000)
    return {mobile_no:"",password:""}
  }
  else{
    toast.error("Something Went Wrong",{duration:2000})
    return {mobile_no:"",password:""}
  }

          return {mobile_no:"",password:""}

}

const [state,formAction,isPending]=useActionState<signupSchema,FormData>(submitForm,{mobile_no:"",password:""})

  return (
    <>
    <HeroSection/>
 
      
      <Toaster   position="top-center" reverseOrder={false}  />


      <div  className="max-w-7xl shadow rounded-2xl mx-auto min-h-[768px]">

      <div className="flex h-full min-h-[768px] my-10 bg-white ">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                alt="Your Company"
                src="/logo.png"
                className="h-16 border border-gray-400 rounded-full w-auto dark:hidden"
                />
              <img
                alt="Your Company"
                src="/logo.png"
                className="hidden h-16 border border-gray-400 rounded-full w-auto dark:block"
                />
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-400">
                You don&apos;t have an account?{' '}
                <Link
                  href="/signup"
                  className="font-semibold text-emerald-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form action={formAction} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                      Mobile Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="mobile_no"
                        type="tel"
                        pattern="^[0-9]{10}$"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                        />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                        />
                    </div>
                  </div>

                    <div className="text-sm/6">
                      <Link href="/forgetpassword" className="font-semibold text-emerald-600 hover:text-indigo-300">
                        Forgot password?
                      </Link>
                    </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                      >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>

            
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="/jobs/job-hiring-online-recruitment-checklist-questionnaire-business-concept-vector-illustration_114835-242.jpg"
            className="absolute inset-0 size-full object-cover"
            />
        </div>
      </div>
            </div>
 <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}></Script>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy='afterInteractive'></Script>
    </>
  )
}
