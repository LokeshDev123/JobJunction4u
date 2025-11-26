'use client'
import { PhoneIcon } from '@heroicons/react/24/outline';
import { Call02Icon, InstagramIcon, Linkedin01Icon, Location06Icon, Mail01Icon, WhatsappIcon, YoutubeIcon } from '@hugeicons-pro/core-duotone-rounded';
import { HugeiconsIcon } from '@hugeicons/react';
import {Raleway} from 'next/font/google'
import Link from 'next/link';
import Script from 'next/script';
import { useActionState } from 'react';
const raleway=Raleway({subsets:["latin"]})
import toast, { Toaster } from 'react-hot-toast';
const ContactUs = () => {


    
type contactSchema={
    name:string,
    email:string,
    mobile:string,
    message:string
}

const contactForm=async(olddata:contactSchema,newdata:FormData):Promise<contactSchema>=>{


  
  const sitekey:string|undefined=process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if(sitekey==undefined){return {name:"",email:"",mobile:"",message:""}}
 await grecaptcha.ready(function() {
          grecaptcha.execute(sitekey, {action: 'submit'}).then(async function(token) {
              // Add your logic to submit to your backend server here.
   
       
  
    const name=newdata.get("name") 
    const email=newdata.get("email") 
    const mobile=newdata.get("mobile")
    const message=newdata.get("message")


    const response=await fetch(`/api/lead/createlead`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:name,email:email,phone:mobile,message:message,recaptcha:token})
    })
    const data=await response.json()
    
    
    if(data.success){
        toast.success(data.message,{duration:2000})
        return {name:"",email:"",mobile:"",message:""}
    }
    else{
        toast.error("Something Went Wrong",{duration:2000})
        return {name:"",email:"",mobile:"",message:""}
    }
            
  
  })
        });

        
return {name:"",email:"",mobile:"",message:""}

}

const [state,formAction,isPending]=useActionState<contactSchema,FormData>(contactForm, {name:"",email:"",mobile:"",message:""})

    return (
       <>
        <Toaster   position="top-center" reverseOrder={false}  />
       
       <div className={`${raleway.className}  Contact_Us p-4 mb-10`} id='contactus'>

<h1 className='text-4xl font-semibold text-center p-0 sm:py-2 text-[#1e0e09]'>Contact</h1>
<div className='h-1 w-14 mx-auto bg-emerald-600'></div>
<p className='text-md max-w-2xl mx-auto my-4 text-gray-500 text-center'>We are committed to being a trusted resource for mental health support and advocacy. Don’t 
hesitate to reach out to us; we are here to help.</p>

<div className='flex  flex-wrap  items-center justify-center gap-4'>
<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3528.1181311266746!2d76.23534454188133!3d27.836903523761702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDUwJzEyLjQiTiA3NsKwMTQnMTMuMSJF!5e0!3m2!1sen!2sin!4v1763478152996!5m2!1sen!2sin"   style={{border:"0"}} className='rounded-2xl shadow w-full h-80 lg:w-[550px] lg:h-[800px]'  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>


<div className="flex flex-col gap-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Card */}
    <div className="w-full md:w-72 min-h-20 flex gap-2 p-4 bg-white shadow-sm shadow-gray-200 rounded-2xl">
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl text-emerald-700 bg-[#feeee9]">
        <HugeiconsIcon icon={Location06Icon} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-[#1e0e09]">Location</h1>
        <p className="text-sm text-gray-900">F-277, Subh Ashray, Keshwana Rajput, Kotputli, RJ 333031</p>
      </div>
    </div>

    {/* Card */}
    <div className="w-full md:w-72 min-h-20 flex gap-2 p-4 bg-white shadow-sm shadow-gray-200 rounded-2xl">
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl text-emerald-700 bg-[#feeee9]">
        <HugeiconsIcon icon={Mail01Icon} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-[#1e0e09]">Email</h1>
        <p className="text-sm text-gray-900">jobjunction4u1981@gmail.com</p>
      </div>
    </div>

    {/* Card */}
    <div className="w-full md:w-72 min-h-20 flex gap-2 p-4 bg-white shadow-sm shadow-gray-200 rounded-2xl">
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl text-emerald-700 bg-[#feeee9]">
        <HugeiconsIcon icon={Call02Icon} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-[#1e0e09]">Call</h1>
        <p className="text-sm text-gray-900">+91 8000272419</p>
      </div>
    </div>

    {/* Card */}
    <div className="w-full md:w-72 min-h-20 flex gap-2 p-4 bg-white shadow-sm shadow-gray-200 rounded-2xl">
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl text-emerald-700 bg-[#feeee9]">
        <HugeiconsIcon icon={Call02Icon} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-[#1e0e09]">Open Hours</h1>
        <p className="text-sm text-gray-900">24/7: 9:00 AM - 7:00 PM</p>
      </div>
    </div>

    {/* Form block: span 1 on mobile, 2 on md+ */}
    <div className="bg-white shadow rounded-2xl py-6 min-h-96 md:col-span-2">
      <div className="flex gap-2 mx-6">
        <div className="h-8 rounded-2xl w-1.5 bg-emerald-600"></div>
        <h1 className="text-3xl font-semibold text-[#1e0e09]">Get In Touch</h1>
      </div>

      <p className="text-sm py-2 max-w-[550px] text-gray-900 mx-6">
        To access any of our services, please contact us through our Help Centre via phone, email, or by
        visiting our office during the designated hours. Our team is here to guide you and provide the
        support you need to improve your mental health and well-being.
      </p>

      <form action={formAction} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 mx-6">
        {/* Name */}
        <div className="relative">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900 dark:bg-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            pattern='^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$'
            type="text"
            
            maxLength={50}
            placeholder="Jane Smith"
            className="block w-full rounded-md h-14 bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6 dark:bg-gray-900 dark:text-white dark:outline-gray-600 dark:placeholder:text-gray-500 dark:focus:outline-emerald-600"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <label
            htmlFor="email"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900 dark:bg-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={50}
            placeholder="abc@gmail.com"
            className="block w-full rounded-md h-14 bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6 dark:bg-gray-900 dark:text-white dark:outline-gray-600 dark:placeholder:text-gray-500 dark:focus:outline-emerald-600"
          />
        </div>

        {/* Mobile: full width on mobile, half on sm+ if you want -> keep sm:col-span-2 for full width on sm as well */}
        <div className="relative sm:col-span-2">
          <label
            htmlFor="mobile"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900 dark:bg-gray-900 dark:text-white"
          >
            Mobile No.
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            maxLength={10}
            pattern="[0-9]{10}"
            placeholder="+91 88XXXXXXXX"
            className="block w-full rounded-md h-14 bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6 dark:bg-gray-900 dark:text-white dark:outline-gray-600 dark:placeholder:text-gray-500 dark:focus:outline-emerald-600"
          />
        </div>

        {/* Subject/Message: full width */}
        <div className="relative sm:col-span-2">
          <label
            htmlFor="message"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900 dark:bg-gray-900 dark:text-white"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            maxLength={200}

            placeholder="Your Message"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6 dark:bg-gray-900 dark:text-white dark:outline-gray-600 dark:placeholder:text-gray-500 dark:focus:outline-emerald-600"
          />
        </div>

        {/* Actions */}
        <div className="relative sm:col-span-2 flex flex-wrap items-center justify-between">
          <button
          disabled={isPending}
            type="submit"
            className="text-white bg-emerald-600 hover:bg-emerald-600/90 focus:ring-4 focus:ring-emerald-600/50 font-medium rounded-full text-md cursor-pointer px-5 py-2.5 text-center mr-2 mb-2"
          >
            Send Message
          </button>

          <div className="flex gap-2 items-center">
        
        <Link href={"tel:+919958831147"} className=" flex  items-center bg- justify-center font-normal text-center text-lg"><HugeiconsIcon className='text-gray-700' icon={Call02Icon}/></Link>
        <Link href={"https://wa.me/919958831147"} className=" flex  items-center justify-center font-normal text-center text-lg"><HugeiconsIcon className='text-gray-700' icon={WhatsappIcon}/></Link>
        <Link href={"https://instagram.com/warmefoundation"} className=" flex  items-center justify-center font-normal text-center text-lg"><HugeiconsIcon className='text-gray-700' icon={InstagramIcon}/></Link>
        <Link href={"https://linkedin.com/company/warmefoundation"} className=" flex  items-center justify-center font-normal text-center text-lg"><HugeiconsIcon className='text-gray-700' icon={Linkedin01Icon}/></Link>
        <Link href={"https://youtube.com/@warmefoundation"} className=" flex  items-center justify-center font-normal text-center text-lg"><HugeiconsIcon className='text-gray-700' icon={YoutubeIcon}/></Link>

          </div>
        </div>
      </form>
    </div>
  </div>
</div>




</div>
       </div>

       <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}></Script>
       </>
    );
}

export default ContactUs;