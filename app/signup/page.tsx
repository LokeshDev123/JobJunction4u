'use client'
import DashboardNavbar from "@/Components/DashboardNavbar";
import Footer from "@/Components/Footer";
import Link from "next/link";
import { FormEvent, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

import {  ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app, auth } from "@/lib/firebase";
import HeroSection from "@/Components/HeroSection";




export default function Page() {
  const router=useRouter()
const [confirmationResult, setConfirmationResult] =useState<ConfirmationResult | null>(null); 
  const [loading, setloading] = useState(true)
 useEffect(()=>{
    if(sessionStorage.getItem("authToken")){
      router.push("/")
    }
  },[])



  const setupUpRecaptcha=()=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
  'size': 'invisible',
  'callback': (response:string) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
   
    
  }
});
  }

  const [credentials, setcredentials] = useState({email:"",password:"",cpassword:"",mobile_no:"",name:"",otp:""})

  

  


  const generateOTP=async(e:FormEvent)=>{

    e.preventDefault();


    setupUpRecaptcha()


    if(typeof window !== "undefined"){

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const appVerifier = (window as any).recaptchaVerifier;
      const result=await signInWithPhoneNumber(auth, "+91"+credentials.mobile_no, appVerifier)
      
      setConfirmationResult(result);          // state update
// If you still want a global fallback:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).confirmationResult = result;

toast.success("OTP Sent Successfully",{duration:2000})
      setloading(false)
    }


  }



  const handleSubmit=async(e:FormEvent)=>{
    e.preventDefault();


    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (window as any).confirmationResult.confirm(credentials.otp)

      const response=await (await fetch(`/api/user/createuser`,{headers:{
        "Content-Type":"application/json"
      
      },body:JSON.stringify({name:credentials.name,email:credentials.email,mobile_no:credentials.mobile_no,password:credentials.password,cpassword:credentials.cpassword,authpasscode:process.env.NEXT_PUBLIC_AUTH_PASS,user_type:"user"}),method:"POST"})).json()
      
      if(response.success){
        toast.success("Account Created Successfully",{duration:2000})
     

        setTimeout(()=>{
          router.push("/signin")
        },2000)
      }
      else if(response.success===false){
        toast.error(response.message,{duration:2000})
         setTimeout(()=>{

          window.location.reload()
        },2000)
        
      }
      else{
        toast.error("Something Went Wrong",{duration:2000})
        setloading(true)
        setcredentials({email:"",password:"",cpassword:"",mobile_no:"",name:"",otp:""})
 
        setTimeout(()=>{

          window.location.reload()
        },2000)
        


        
      }
 

    } catch (error) {
     
       setTimeout(()=>{

          window.location.reload()
        },2000)
        
      
      toast.error("Something Went Wrong")

    }
  }







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
                className="h-16 w-auto border border-gray-400 rounded-full dark:hidden"
                />
              <img
                alt="Your Company"
                src="/logo.png"
                className="hidden h-10 w-auto dark:block"
                />
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
                Sign up to your account
              </h2>
              {loading &&<p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/signin"
                  className="font-semibold text-emerald-600  hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                  Sign in
                </Link>
              </p>}
            </div>

            <div className="mt-10">
              <div>
                
               {loading && <form onSubmit={generateOTP}
                 className="space-y-6">


                        <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={(e)=>{
                          setcredentials({...credentials,name:e.target.value})
                        }}
                        value={credentials.name}
                        maxLength={50}
                        minLength={2}
                        pattern="^[a-zA-Z ]+$"
                        required
                        autoComplete="name"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                        />
                    </div>
                  </div>



                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"

                        onChange={(e)=>{
                          setcredentials({...credentials,email:e.target.value})
                        }}
                        value={credentials.email}
                       
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                        />
                    </div>
                  </div>


                  
                        <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                      Mobile No.
                    </label>
                    <div className="mt-2">
                      <input
                        id="mobile"
                        onChange={(e)=>{
                          setcredentials({...credentials,mobile_no:e.target.value})
                        }}
                        value={credentials.mobile_no}
                        maxLength={10}
                        minLength={10}
                        
                        name="mobile_no"
                        type="tel"
                        pattern="^[0-9]{10}$"
                        required
                        
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
                        
                        onChange={(e)=>{
                          setcredentials({...credentials,password:e.target.value})
                        }}
                        value={credentials.password}
                        
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                        />
                    </div>
                  </div>


                    <div>
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                     Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="cpassword"
                        type="password"
                        onChange={(e)=>{
                          setcredentials({...credentials,cpassword:e.target.value})
                        }}
                        value={credentials.cpassword}
                        
                        
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                        />
                    </div>
                  </div>


                  <div>
                    <button
                    
                      type="submit"
                      
                      className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                      >
                      Sign Up With OTP
                    </button>

                    
                  
                  </div>
                </form>}








                 {!loading && <form onSubmit={handleSubmit}
                 className="space-y-6">


                     




                  
                        <div>
                    <label htmlFor="otp" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                      OTP
                    </label>
                    <div className="mt-2">
                      <input
                        id="mobile"
                        onChange={(e)=>{
                          setcredentials({...credentials,otp:e.target.value})
                        }}
                        value={credentials.otp}
                        maxLength={6}
                        minLength={6}
                        
                        name="otp"
                        type="tel"
                        pattern="^[0-9]{6}$"
                        required
                        
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                        />
                    </div>
                  </div>



                  <div>
                    <button
                    
                      type="submit"
                      
                      className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                      >
                      Submit OTP
                    </button>

                    
                  
                  </div>
                </form>}
 <div id="sign-in-button"></div>
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


   
    </>
  )
}
