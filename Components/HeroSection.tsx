/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import { HugeiconsIcon } from '@hugeicons/react'
import { UserCircleIcon } from '@hugeicons-pro/core-duotone-rounded'
import Link from 'next/link'

const navigation = [
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'Jobs', href: '#jobs' },
  { name: 'Our Growth', href: '#ourgrowth' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Contact Us', href: '#contactus' },
]

export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [users, setusers] = useState({name:"",email:"",mobile_no:"",status:""})
  const [authToken, setauthToken] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard") // ⭐ NEW
  const router=useRouter()
  const pathname=usePathname()


  const [categories, setcategories] = useState<{ _id: string; name: string }[]>([])

  const [myCategory, setmyCategory] = useState("")
  const [myRoles, setmyRoles] = useState([])

  const [credentials, setcredentials] = useState({category:"",role:"",job_type:""})



  const fetchData=async()=>{
    const res=await (await fetch("/api/admin/category/fetch-category",{
      method:"POST",
      headers:{ "Content-Type":"application/json" }
    })).json();

    
    
    if(res.success){
      setcategories(res.data)
    }
  }



  const fetchRole=async()=>{
     
    const res=await (await fetch("/api/admin/role/fetch-role",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ category_id:myCategory })
    })).json();

    
    if(res.success){
      setmyRoles(res.data)
      setcredentials({...credentials,category:myCategory} )
    }
  }


  useEffect(()=>{

    fetchData()
  },[])

  useEffect(()=>{

    fetchRole()
  },[myCategory])



  // ⭐ Smooth Scroll Function
  const handleScroll = (e:any, href:any) => {
    e.preventDefault()
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  // ⭐ Auto Highlight on Scroll (Scroll-Spy)
  useEffect(() => {
    const sectionIds = navigation.map((n) => n.href.replace("#", ""))

    const onScroll = () => {
      let current = "dashboard"

      for (const id of sectionIds) {
        const section = document.getElementById(id)
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = id
            break
          }
        }
      }

      setActiveSection(current)
    }

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(()=>{
    if(window!==undefined && sessionStorage.getItem("authToken")){
      setTimeout(()=>{
        setauthToken(true)
      },0)
    }
  },[])

  const handlelogout=()=>{
    sessionStorage.clear()
    setusers({name:"",email:"",mobile_no:"",status:""})
    setTimeout(() => {
      router.push("/signin")
    }, 100);
  }

  useEffect(()=>{
    (async function(){
      const res=await (await fetch(`/api/user/fetchuser-details?token=${sessionStorage.getItem("authToken")}`,{
        method:"GET",
        headers:{ "Content-Type":"application/json" }
      })).json()


      
      if(res.success){
        setusers(res.data)

      }
    })()
  },[])





  return (
    <div className="bg-gray-900" id='dashboard'>
      <header className=" fixed inset-x-0 top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-white/10">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <img alt="" src="/logo.png" className="h-14 rounded-full bg-white w-auto" />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            >
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* ⭐ Desktop Navbar with Active Highlight + Scroll */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={`text-sm/6 font-semibold ${
                  activeSection === item.href.replace("#", "")
                    ? "text-emerald-400"
                    : "text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 items-center gap-2 lg:justify-end">
            { !authToken && (
              <Link href="/signin" className="text-sm/6 font-semibold text-white">
                Log in →
              </Link>
            )}

            <Menu as="div" className="relative inline-block">
              { authToken && (
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/5 hover:bg-white/20">
                  <HugeiconsIcon icon={UserCircleIcon} />
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
              )}

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline outline-1 -outline-offset-1 outline-white/10 
                transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <a className="block px-4 py-2 text-sm text-gray-300">
                      Hi {users.name}!
                    </a>
                  </MenuItem>

                   <MenuItem>
                    <a className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300">
                      Subscription:
                        <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
        <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-green-500">
          <circle r={3} cx={3} cy={3} />
        </svg>
    {users.status}
      </span>
                      
                    </a>
                  </MenuItem>

                  <MenuItem>
                    <a
                      onClick={handlelogout}
                      className="block px-4 py-2 text-sm text-gray-300 cursor-pointer"
                    >
                      Sign out
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>

        </nav>

        {/* ⭐ Mobile Drawer */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">

            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <img alt="" src="/logo.png" className="h-14 bg-white rounded-full" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
              >
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-700/50">

                {/* ⭐ Mobile Links with Active Highlight + Scroll */}
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleScroll(e, item.href)}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold ${
                        activeSection === item.href.replace("#", "")
                          ? "text-emerald-400"
                          : "text-white"
                      } hover:bg-white/10`}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>

                <div className="py-6 flex flex-col gap-4">
                  {!authToken && (
                    <Link
                      href="/signin"
                      className="text-white text-base font-semibold px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20"
                    >
                      Log in →
                    </Link>
                  )}

                  {authToken && (
                    <Menu as="div" className="relative inline-block text-left">
                      <MenuButton className="inline-flex w-full justify-between items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/20">
                        <span className="flex items-center gap-2">
                          <HugeiconsIcon icon={UserCircleIcon} />
                          {users?.name}
                        </span>
                        <ChevronDownIcon className="size-5 text-gray-300" />
                      </MenuButton>

                      <MenuItems
                        transition
                        className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 ring-1 ring-white/10 shadow-lg"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <span className="block px-4 py-2 text-sm text-gray-300">
                              Hi {users.name}!
                            </span>
                          </MenuItem>

                          <MenuItem>
                            <button
                              onClick={handlelogout}
                              className="w-full text-left block px-4 py-2 text-sm text-gray-300"
                            >
                              Sign out
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  )}
                </div>

              </div>
            </div>

          </DialogPanel>
        </Dialog>

      </header>

      {/* ⭐⭐ FULL HERO SECTION ⭐⭐ */}
      <div
        className={`relative ${
          pathname.startsWith("/blog/") ||
          pathname.startsWith("/job/") ||
          pathname === "/signin" ||
          pathname === "/signup" ||
     
          pathname === "/forgetpassword"||
          pathname === "/term&condition" ||
          pathname === "/refund&cancellation" ||
          pathname === "/privacypolicy"  
            ? "h-24"
            : ""
        } isolate overflow-hidden pt-14`}
      >
        <img
          alt=""
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className="absolute inset-0 -z-10 size-full object-cover"
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">

              {pathname==="/" && (
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                  Find Your Dream Job Today!
                </h1>
              )}

              {pathname==="/findjobs" && (
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                  Find Your Dream Job
                </h1>
              )}

              {pathname==="/jobdescription" && (
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                  Job Description
                </h1>
              )}

              {pathname==="/" && (
                <p className="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
                  Connecting Talent with Opportunity: Your Gateway to Career Success
                </p>
              )}

              { pathname==="/" && (
                <div className="mt-10 flex w-full items-center justify-center gap-x-6">

                  <div className="w-fit bg-white flex flex-wrap md:flex-nowrap justify-between md:justify-center text-base md:text-xl items-center h-auto md:h-20 rounded-xl p-2 gap-4 md:gap-6">

                    <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
                      <select onChange={(e)=>setmyCategory(e.target.value)} className="w-full md:w-auto py-2 px-2 text-[#808080] outline-none border border-gray-200 rounded-md md:rounded-none md:border-none">
                       <option defaultChecked>Select Category</option>
                       {categories.map((ele:{_id:string,name:string},i)=>{

                        return <option  value={ele._id} key={i}>{ele.name}</option>
                       })}
                       
                      </select>
                      <div className="hidden md:block w-0.5 h-12 bg-gray-300"></div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
                      <select onChange={(e)=>setcredentials({...credentials,role:e.target.value})} className="w-full md:w-auto py-2 px-2 text-[#808080] outline-none border border-gray-200 rounded-md md:rounded-none md:border-none">
                        <option defaultChecked>Select Role</option>
                     {myRoles.map((ele:{_id:string,name:string},i)=>{
                        return <option  value={ele.name} key={i}>{ele.name}</option>
                       })}
                      </select>
                      <div className="hidden md:block w-0.5 h-12 bg-gray-300"></div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
                      <select onChange={(e)=>setcredentials({...credentials,job_type:e.target.value})} className="w-full md:w-auto py-2 px-2 text-[#808080] outline-none border border-gray-200 rounded-md md:rounded-none md:border-none">
                        <option defaultChecked>Job Type</option>
                        
                        <option value={"Full Time"}>Full Time</option>
                        <option value={"Part Time"}>Part Time</option>
                        <option value={"Internship"}>Internship</option>
                        <option value={"Contract"}>Contract</option>
                      </select>
                      <div className="hidden md:block w-0.5 h-12 bg-gray-300"></div>
                    </div>

                    <Link href={`/findjobs?category=${credentials.category}&role=${credentials.role}&job_type=${credentials.job_type}`} className="flex md:text-2xl items-center min-w-48 justify-center py-2 bg-emerald-600 text-white font-semibold h-full px-6 rounded-lg md:rounded-none w-full md:w-auto cursor-pointer hover:bg-emerald-500 transition">
                      Search
                    </Link>

                  </div>

                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
