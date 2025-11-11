'use client'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, MagnifyingGlassIcon, UsersIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Create Blogs', href: '#', icon: UsersIcon, current: false },
  { name: 'Fetch & Delete Blogs', href: '#', icon: FolderIcon, current: false },
  { name: 'Create Job', href: '#', icon: CalendarIcon, current: false },
  { name: 'Fetch, Edit & Delete Jobs', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Create Plan', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Users Concern', href: '#', icon: ChartPieIcon, current: false },
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardNavbar() {

const [users, setusers] = useState({name:"",email:"",mobile_no:""})

  const router=useRouter()

  const handlelogout=()=>{

    sessionStorage.clear()
    setTimeout(() => {
      
      router.push("/dashboard/signin")
    }, 100);
  }


  useEffect(()=>{

    (async function(){

      const res=await (await fetch(`/api/user/fetchuser-details?token=${sessionStorage.getItem("adminToken")?sessionStorage.getItem("adminToken"):sessionStorage.getItem("recruiterToken")}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }

        
      })).json()

      if(res.success){

        setusers(res.data)
      }

      
      
    })()
  },[])


  return (
    <Disclosure
      as="header"
      className="relative  bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto   px-2 sm:px-4 lg:divide-y lg:divide-white/10 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="/logo.png"
                className="h-12 rounded-full bg-white w-auto"
              />
            </div>
          </div>
          <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
            <div className="grid w-full grid-cols-1 sm:max-w-xs">
              <input
                name="search"
                placeholder="Search"
                className="col-start-1 row-start-1 block w-full rounded-md bg-white/5 py-1.5 pl-10 pr-3 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
              />
            </div>
          </div>
          <div className="relative z-10 flex items-center xl:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="hidden xl:relative xl:z-10 xl:ml-4 xl:flex lg:items-center">
            <button
              type="button"
              className="relative shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-4 shrink-0">
              <MenuButton className="relative flex rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src={user.imageUrl}
                  className="size-8 rounded-full bg-gray-800 outline outline-1 -outline-offset-1 outline-white/10"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline outline-1 -outline-offset-1 outline-white/10 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                
                  <MenuItem >
                    <a
                      href={"#"}
                      onClick={handlelogout}
                      className="block px-4 py-2 text-sm text-gray-300 data-[focus]:bg-white/5 data-[focus]:outline-none"
                    >
                     Sign out
                    </a>
                  </MenuItem>
              
              </MenuItems>
            </Menu>
          </div>
        </div>
        <nav aria-label="Global" className="hidden xl:flex lg:space-x-8 lg:py-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium',
              )}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      <DisclosurePanel as="nav" aria-label="Global" className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-white/5 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        <div className="border-t border-white/10 pb-3 pt-4">
          <div className="flex items-center px-4">
            <div className="shrink-0">
              <img
                alt=""
                src={"/logo.png"}
                className="size-10 rounded-full bg-white outline outline-1 -outline-offset-1 outline-white/10"
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">{users.name}</div>
              <div className="text-sm font-medium text-gray-400">{users.email}</div>
            </div>
            <button
              type="button"
              className="relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-3 space-y-1 px-2">
            
              <DisclosureButton
             
                as="a"
                onClick={handlelogout}
                href={"#"}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
              >
                Sign out
              </DisclosureButton>
         
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
