/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  CalendarIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'



function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardNavbar() {
  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any>(null)
  const [hydrated, setHydrated] = useState(false)

  const [recruiterToken, setrecruiterToken] = useState(false)
  const [adminToken, setadminToken] = useState(false)
  useEffect(() => {
    if (window !== undefined) {
      if (sessionStorage.getItem('recruiterToken')) {
        setrecruiterToken(true)
      }
      if (sessionStorage.getItem('adminToken')) {
        setadminToken(true)
      }
    }
  }, [])

  const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: UsersIcon, current: false,access:adminToken },
  { name: 'Create Recruiter Account', href: '/dashboard/recuritersignup', icon: UsersIcon, current: false,access:adminToken },
  { name: 'Create Blogs', href: '/dashboard/createblog', icon: UsersIcon, current: false,access:adminToken },
  { name: 'Fetch & Delete Blogs', href: '/dashboard/allblogs', icon: FolderIcon, current: false,access:adminToken },
  { name: 'Create Job', href: '/dashboard/create-job', icon: CalendarIcon, current: false,access:recruiterToken || adminToken },
  { name: 'Fetch & Delete Jobs', href: '/dashboard/fetchjobs', icon: DocumentDuplicateIcon, current: false,access: adminToken },
  { name: 'Fetch & Delete Jobs', href: '/dashboard/fetch-recruiter-jobs', icon: DocumentDuplicateIcon, current: false,access: recruiterToken },
  { name: 'User Details', href: '/dashboard/fetchalluser', icon: DocumentDuplicateIcon, current: false,access:adminToken },
]


  /** Ensure client hydration first */
  useEffect(() => {
    setHydrated(true)
  }, [])

  const handleLogout = () => {
    sessionStorage.clear()
    setTimeout(() => {
      router.push('/dashboard/signin')
    }, 100)
  }

  /** Fetch user data AFTER hydration to avoid SSR mismatch */
  useEffect(() => {
    if (!hydrated) return

    ;(async function () {
      const token =
        sessionStorage.getItem('adminToken') || sessionStorage.getItem('recruiterToken')

      const res = await fetch(`/api/user/fetchuser-details?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()

      if (data.success) {
        setUsers(data.data)
      }
    })()
  }, [hydrated])

  /** Prevent hydration mismatch */
  if (!hydrated) {
    return null
  }

  return (
    <Disclosure
      as="header"
      className="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto px-2 sm:px-4 lg:divide-y lg:divide-white/10 lg:px-8">
        <div className="relative flex h-16 justify-between">
          {/* LOGO */}
          <div className="relative z-10 flex px-2 lg:px-0">
            <img
              alt="Logo"
              src="/logo.png"
              className="h-12 w-auto rounded-full bg-white"
            />
          </div>

          {/* SEARCH */}
          

          {/* MOBILE MENU BUTTON */}
          <div className="relative z-10 flex items-center xl:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          {/* DESKTOP PROFILE + NOTIF */}
          <div className="hidden xl:flex xl:items-center xl:ml-4 relative z-10">
            <button
              type="button"
              className="rounded-full p-1 text-gray-400 hover:text-white focus:outline focus:outline-2 focus:outline-indigo-500"
            >
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-4 shrink-0">
              <MenuButton className="relative flex rounded-full focus:outline-none">
                <img
                  alt="User"
                  src={users?.imageUrl || '/logo.png'}
                  className="size-8 rounded-full bg-gray-800"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 
                outline outline-1 -outline-offset-1 outline-white/10 transition 
                data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav aria-label="Global" className="hidden xl:flex space-x-8 py-2">
          {navigation.map((item) => {
           return item.access && (
           <Link
              key={item.name}
              href={item.href}
              className={classNames(
                'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white'
              )}
            >
              {item.name}
            </Link>)
})}
        </nav>
      </div>

      {/* MOBILE NAV */}
      <DisclosurePanel as="nav" aria-label="Global" className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>

        {/* Mobile bottom user section */}
        <div className="border-t border-white/10 pb-3 pt-4">
          <div className="flex items-center px-4">
            <img
              alt="User"
              src={users?.imageUrl || '/logo.png'}
              className="size-10 rounded-full bg-white"
            />

            <div className="ml-3">
              <div className="text-base font-medium text-white">{users?.name}</div>
              <div className="text-sm font-medium text-gray-400">{users?.email}</div>
            </div>

            <button
              type="button"
              className="ml-auto rounded-full p-1 text-gray-400 hover:text-white"
            >
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-3 space-y-1 px-2">
            <button
              onClick={handleLogout}
              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
