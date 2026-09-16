"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Star, CheckCircle } from "lucide-react";

interface TestimonialItem {
  id: number;
  name: string;
  rating: number;
  feedback: string;
  date: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    feedback:
      "“I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant shirts, every piece I've bought has exceeded my expectations.”",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 5,
    feedback:
      "“Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "James L.",
    rating: 5,
    feedback:
      "“As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.”",
    date: "2 weeks ago",
  },
  {
    id: 4,
    name: "Emily R.",
    rating: 5,
    feedback:
      "“The fit of the skinny jeans and oversized graphic tee was absolutely perfect. The delivery was fast, packaging was pristine, and customer support was incredibly responsive!”",
    date: "3 weeks ago",
  },
  {
    id: 5,
    name: "Michael B.",
    rating: 5,
    feedback:
      "“Top notch quality fabrics! I've washed the polos and checkered shirts multiple times now, and they haven't shrunk or faded at all. Shop.co is now my go-to fashion store.”",
    date: "1 month ago",
  },
];

const Testimonial = () => {
  return (
    <section className="py-12 sm:py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative w-full"
        >
          {/* Header & Controls Bar */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-bold-1 text-black uppercase tracking-tight">
              Our Happy Customers
            </h2>

            <div className="flex items-center gap-3">
              <CarouselPrevious className="static translate-y-0 translate-x-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-zinc-200 bg-white hover:bg-black hover:text-white transition shadow-sm" />
              <CarouselNext className="static translate-y-0 translate-x-0 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-zinc-200 bg-white hover:bg-black hover:text-white transition shadow-sm" />
            </div>
          </div>

          {/* Carousel Cards */}
          <CarouselContent className="-ml-4">
            {testimonials.map((t) => (
              <CarouselItem
                key={t.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="space-y-3">
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Customer Name & Verified Badge */}
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-base sm:text-lg text-black">
                        {t.name}
                      </span>
                      <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                    </div>

                    {/* Review text */}
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {t.feedback}
                    </p>
                  </div>

                  <div className="text-xs text-zinc-400 font-medium pt-4 mt-4 border-t border-zinc-100">
                    Posted {t.date}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonial;
