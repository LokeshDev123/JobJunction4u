"use client";
import Link from "next/link";

import { BrainIcon, CodeIcon, FigmaIcon, HandBag01Icon, Megaphone01Icon, SmartPhone01Icon } from "@hugeicons-pro/core-duotone-rounded";
import { HugeiconsIcon } from "@hugeicons/react";

export default function CategoryContainer() {
  const categories = [
    { id: 1, name: "Full Stack Development", icon: CodeIcon },
    { id: 2, name: "UI/UX Design", icon: FigmaIcon},
    { id: 3, name: "Data Science & AI", icon: BrainIcon },
    { id: 4, name: "Mobile App Development", icon: SmartPhone01Icon },
    { id: 5, name: "Digital Marketing", icon: Megaphone01Icon },
    { id: 6, name: "Business & Management", icon: HandBag01Icon },
  ];

  return (
    <div className="bg-gray-900 py-20 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
          Explore Job Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              href={`#`}
              key={category.id}
              className="group bg-white/10 backdrop-blur-sm hover:bg-emerald-600 transition-all duration-300 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-white hover:scale-105"
            >
              <HugeiconsIcon
                icon={category.icon}
                className="w-8 h-8 sm:w-10 sm:h-10 mb-3 text-emerald-400 group-hover:text-white transition-all"
              />
              <p className="text-sm sm:text-base font-medium">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
