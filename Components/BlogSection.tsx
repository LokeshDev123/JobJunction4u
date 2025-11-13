"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";


const posts = [
  {
    title: "Top 10 In-Demand Tech Skills for 2025",
    href: "#",
    category: { name: "Career Tips", href: "#" },
    description:
      "Stay ahead in your career! Discover which technical skills will be most sought-after in 2025 and how to start learning them today.",
    date: "Oct 15, 2025",
    datetime: "2025-10-15",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?auto=format&fit=crop&w=1679&q=80",
    readingTime: "6 min",
    author: {
      name: "Aarav Singh",
      href: "#",
      imageUrl: "https://randomuser.me/api/portraits/men/62.jpg",
    },
  },
  {
    title: "How to Impress Recruiters with Your Resume",
    href: "#",
    category: { name: "Job Hacks", href: "#" },
    description:
      "Make your resume stand out! Learn the secret strategies recruiters use to shortlist candidates and how to adapt your resume for success.",
    date: "Oct 10, 2025",
    datetime: "2025-10-10",
    imageUrl:
      "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?auto=format&fit=crop&w=1679&q=80",
    readingTime: "4 min",
    author: {
      name: "Priya Mehta",
      href: "#",
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  },
  {
    title: "The Future of Remote Work: Trends for 2026",
    href: "#",
    category: { name: "Work Culture", href: "#" },
    description:
      "Remote work is here to stay — but it's evolving fast. Here’s what you need to know to stay ahead of workplace trends in 2026.",
    date: "Oct 01, 2025",
    datetime: "2025-10-01",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1679&q=80",
    readingTime: "5 min",
    author: {
      name: "Rohit Verma",
      href: "#",
      imageUrl: "https://randomuser.me/api/portraits/men/52.jpg",
    },
  },
  {
    title: "Mastering Interview Skills in the AI Era",
    href: "#",
    category: { name: "Career Advice", href: "#" },
    description:
      "Learn how AI is changing the interview process and what you can do to stand out when companies use automated screening tools.",
    date: "Sep 25, 2025",
    datetime: "2025-09-25",
    imageUrl:
      "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1679&q=80",
    readingTime: "7 min",
    author: {
      name: "Simran Kaur",
      href: "#",
      imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  },
];

export default function BlogSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* Header */}
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          From Our Blog
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600 sm:mt-4">
          Insights, tips, and stories to help you grow your career and find your dream job.
        </p>

        {/* Swiper Section */}
        <div className="mt-12">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.title}>
                <article className="flex flex-col h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Blog Image */}
                  <div className="shrink-0">
                    <img
                      alt={post.title}
                      src={post.imageUrl}
                      className="h-52 w-full object-cover"
                    />
                  </div>

                  {/* Blog Content */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-emerald-600">
                        <a href={post.category.href} className="hover:underline">
                          {post.category.name}
                        </a>
                      </p>
                      <a href={post.href} className="mt-2 block">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-emerald-700 transition-colors">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                          {post.description}
                        </p>
                      </a>
                    </div>

                    {/* Author Info */}
                    <div className="mt-6 flex items-center">
                      <div className="shrink-0">
                        <a href={post.author.href}>
                          <img
                            alt={post.author.name}
                            src={post.author.imageUrl}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </a>
                      </div>
                      <div className="ml-3 text-left">
                        <p className="text-sm font-medium text-gray-900">
                          <a href={post.author.href} className="hover:underline">
                            {post.author.name}
                          </a>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={post.datetime}>{post.date}</time>
                          <span aria-hidden="true">&middot;</span>
                          <span>{post.readingTime} read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
