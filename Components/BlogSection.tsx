"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

export default function BlogSection({
  posts = [], // ✅ Prevent undefined errors
}: {
  posts: {
    _id: string;
    title: string;
    image: string;
    author: string;
    content: [{ headline: string; description: string }];
    date: string;
  }[];
}) {
  return (
    <div className="relative bg-white px-6 py-16" id="blogs">
      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-emerald-600 sm:text-4xl">
            Blog & News
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-700 sm:mt-4">
            Here are some of our latest blog posts
          </p>
        </div>

        {/* If no posts */}
        {posts.length === 0 && (
          <div className="mt-16 text-center py-20 text-gray-500 text-xl">
            No Blogs Available
          </div>
        )}

        {/* Swiper Section */}
        {posts.length > 0 && (
          <div className="mx-auto mt-12 max-w-6xl">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              grabCursor
              watchOverflow
              className="mySwiper w-full"
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16, centeredSlides: true },
                640: { slidesPerView: 1.2, spaceBetween: 20, centeredSlides: true },
                768: { slidesPerView: 2, spaceBetween: 24, centeredSlides: false },
                1024: { slidesPerView: 2.5, spaceBetween: 28, centeredSlides: false },
                1280: { slidesPerView: 3, spaceBetween: 32, centeredSlides: false },
              }}
            >
              {posts?.map((post, i) => (
                <SwiperSlide key={i} className="!h-auto">
                  <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white border border-gray-200 shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
                    
                    {/* Image */}
                    <div className="shrink-0">
                      <Image
                        width={500}
                        height={500}
                        src={post.image}
                        alt={post.title}
                        className="h-48 w-full object-contain bg-white sm:h-56 md:h-64"
                        loading="lazy"
                        unoptimized={true}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-emerald-600">
                          <Link href={`/blog/${post._id}`} className="hover:underline">
                            ~ By {post.author}
                          </Link>
                        </p>

                        <Link href={`/blog/${post._id}`} className="mt-2 block">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {post.title}
                          </h3>
                          <p className="mt-3 text-base text-gray-600 line-clamp-3">
                            {post?.content?.[0]?.description ?? ""}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}
