"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import Image from "next/image";
import { StarIcon } from "@hugeicons-pro/core-duotone-rounded";
import { HugeiconsIcon } from "@hugeicons/react";


export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Aarav Sharma",
      role: "Software Engineer at TechCorp",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      text: "JobJunction made my job search effortless! I landed a full-stack developer position in less than 3 weeks. The platform is smooth and reliable.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Mehta",
      role: "HR Manager at Innovent Solutions",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "As a recruiter, I’ve used many platforms — but this one stands out! The candidate quality and dashboard analytics are outstanding.",
      rating: 5,
    },
    {
      id: 3,
      name: "Rohit Verma",
      role: "Marketing Specialist at Growthly",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      text: "The personalized job recommendations saved me a ton of time. It’s the most intuitive job portal I’ve ever used!",
      rating: 4,
    },
    {
      id: 4,
      name: "Simran Kaur",
      role: "Frontend Developer at Pixel Labs",
      image: "https://randomuser.me/api/portraits/women/55.jpg",
      text: "Loved the user experience and how easy it was to connect with employers. Highly recommend JobJunction to every job seeker!",
      rating: 5,
    },
  ];

  return (
    <section className="bg-emerald-700 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          What Our Users Say
        </h2>
        <p className="mt-3 text-lg text-white max-w-2xl mx-auto">
          Real stories from professionals who found success through our platform.
        </p>

        {/* Swiper Carousel */}
        <div className="mt-12">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10 "
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white border border-gray-200 my-6 shadow-md hover:shadow-lg transition-all min-h-96 rounded-2xl p-8 flex flex-col items-center text-center">
                  {/* Profile Image */}
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>

                  {/* Name + Role */}
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-emerald-600">{item.role}</p>

                  {/* Testimonial Text */}
                  <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                    “{item.text}”
                  </p>

                  {/* Rating */}
                  <div className="flex justify-center mt-4">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      
                      <HugeiconsIcon key={i} icon={StarIcon} className="w-5 h-5 text-yellow-400 fill-yellow-400"/>
                      
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
