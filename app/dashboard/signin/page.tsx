"use client";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
export default function Page() {

    const router=useRouter()
  const [role, setRole] = useState<"admin" | "recruiter">("admin");

  interface userSchema{
    mobile_no:string,
    password:string
  }
  const handleSubmit=async(oldData:userSchema,formData:FormData):Promise<userSchema>=>{


    const mobile_no=formData.get("mobile_no")
    const password=formData.get("password")


    if(!mobile_no || !password){
      
        toast.success("Please fill all the fields",{
            duration:3000
        })
        }


        const res=await (await fetch(`/api/user/login${role==="admin"?"admin":"recruiter"}`,{
            method:"POST",
            body:JSON.stringify({
                mobile_no,
                password,
                user_type:role
            })
        })).json()


        if(res.success){
            if(role==="admin"){
                toast.success("Login Successful",{
                    duration:3000
                })

                sessionStorage.setItem("adminToken", res.token)
                 setTimeout(()=>{
                router.push("/dashboard")
            },3000)
            }
            else{
                toast.success("Login Successful",{
                    duration:3000
                })

                sessionStorage.setItem("recruiterToken", res.token)
                 setTimeout(()=>{
                router.push("/dashboard/create-job")
            },3000)
            }

           


        }
        else{
            toast.error(res.message,{
                duration:3000
            })
        }

        return {
            mobile_no:"",
            password:""
        }
        
        



    

    


       
  }
  const [state,formAction,isPending]=useActionState<userSchema,FormData>(handleSubmit, {
    mobile_no:"",
    password:""
  })






  return (
    <>
    <Toaster />
    <div className="bg-[#101828] min-h-screen flex items-center flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="p-8 w-full bg-white/10 rounded-2xl max-w-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <img
            alt="Your Company"
            src="/logo.png"
            className="mx-auto h-28 bg-white rounded-full w-auto"
            />
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-gray-800/50 px-6 py-10 outline outline-1 -outline-offset-1 outline-white/10 rounded-lg sm:px-12">
            
            {/* Role Switch */}
            <div className="flex justify-center items-center gap-3 mb-6">
              <span
                className={`text-sm font-semibold ${
                    role === "admin" ? "text-indigo-400" : "text-gray-400"
                    }`}
                    >
                Admin
              </span>

              {/* Switch Toggle */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={role === "recruiter"}
                  onChange={(e) =>
                    setRole(e.target.checked ? "recruiter" : "admin")
                }
                className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-600 peer-focus:outline-none rounded-full peer 
                  peer-checked:bg-indigo-500 after:content-[''] after:absolute after:top-[3px] after:left-[4px]
                  after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
                  peer-checked:after:translate-x-7"></div>
              </label>

              <span
                className={`text-sm font-semibold ${
                    role === "recruiter" ? "text-indigo-400" : "text-gray-400"
                    }`}
                    >
                Recruiter
              </span>
            </div>

            {/* Login Form */}
            <form action={formAction}  className="space-y-6">
              <div>
                <label
                  htmlFor="mobile_no"
                  className="block text-sm font-medium text-white"
                  >
                  Mobile Number
                </label>
                <div className="mt-2">
                  <input
                    id="mobile_no"
                    name="mobile_no"
                    type="tel"
                    required
                    placeholder="Enter mobile number"
                    className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-indigo-500 sm:text-sm"
                    />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                  >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter password"
                    className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-indigo-500 sm:text-sm"
                    />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                >
                Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
                  </>
  );
}
