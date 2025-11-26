import { CallIcon, Mail01Icon, PinLocation03Icon } from "@hugeicons-pro/core-duotone-rounded"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

/* eslint-disable @typescript-eslint/no-explicit-any */
const navigation = {
  company: [
    { name: 'Jobs', href: '/findjobs' },
    { name: 'Our Growth', href: '#ourgrowth' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blogs', href: '#blogs' },
  ],
  legal: [
    { name: 'Terms & Conditions', href: '/term&condition' },
    { name: 'Privacy policy', href: '/privacypolicy' },
    { name: 'Refund & cancellation policy', href: '/refund&cancellation' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 
            3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 
            1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 
            0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 
            21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 
            1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 
            0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 
            1.407.60 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 
            1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 
            0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 
            0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 
            4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 
            4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 
            1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">

          {/* Only Company + Legal */}
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div>
              <h3 className="text-sm font-semibold text-white">Company</h3>
              <ul className="mt-6 space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm text-gray-400 hover:text-white">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Legal</h3>
              <ul className="mt-6 space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm text-gray-400 hover:text-white">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">Contact us</h3>

            <p className="mt-2 text-sm text-gray-400 flex items-center gap-2 hover:underline">
             <HugeiconsIcon icon={PinLocation03Icon} /> F277, Subh Ashray Society,  
              Keshwana Rajput, Kotputli, Rajasthan, 333031
            </p>

            <a href="tel:+918000272419" className="mt-2 block text-sm text-gray-400 flex items-center gap-2 hover:underline">
            <HugeiconsIcon icon={CallIcon} />  +91 8000272419
            </a>

            <a href="mailto:jobjunction4u1981@gmail.com" className="mt-2 block text-sm flex items-center gap-2 text-gray-400 hover:underline">
             <HugeiconsIcon icon={Mail01Icon} /> jobjunction4u1981@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex gap-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-white">
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>

          <p className="mt-8 text-sm text-gray-400 md:order-1 md:mt-0">
            &copy; 2025 Jobjunction4u Inc. All rights reserved. Design by{" "}
            <Link href="http://www.lokeshdevcoder.com" className="underline hover:text-white">
              LokeshDevCoder
            </Link> Managed by Inderpal Saini.
          </p>
        </div>
      </div>
    </footer>
  )
}
