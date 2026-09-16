import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface StyleCard {
  title: string;
  image: string;
  href: string;
  spanClass: string;
}

const styles: StyleCard[] = [
  {
    title: "Casual",
    image: "/frame01.png",
    href: "/Product?style=Casual",
    spanClass: "md:col-span-5",
  },
  {
    title: "Formal",
    image: "/frame02.png",
    href: "/Product?style=Formal",
    spanClass: "md:col-span-7",
  },
  {
    title: "Party",
    image: "/frame03.png",
    href: "/Product?style=Party",
    spanClass: "md:col-span-7",
  },
  {
    title: "Gym",
    image: "/frame04.png",
    href: "/Product?style=Gym",
    spanClass: "md:col-span-5",
  },
];

const DressStyle = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F0F0F0] rounded-3xl p-6 sm:p-12 lg:p-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-bold-1 text-center text-black uppercase tracking-tight mb-8 sm:mb-12">
            Browse by Dress Style
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            {styles.map((style) => (
              <Link
                key={style.title}
                href={style.href}
                aria-label={`Browse ${style.title} style collection`}
                className={`group relative h-48 sm:h-64 lg:h-72 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${style.spanClass}`}
              >
                {/* Background Image with baked-in style title */}
                <Image
                  src={style.image}
                  alt={`${style.title} dressing style collection`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent group-hover:from-black/20 transition-colors" />

                {/* Accessible screen-reader label */}
                <span className="sr-only">{style.title}</span>

                {/* Subtle hover arrow in top-right */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressStyle;
