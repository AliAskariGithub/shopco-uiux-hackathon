import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkle } from "lucide-react";

const brandLogos = [
  { name: "Versace", src: "/comp-logo-1.png", width: 160 },
  { name: "Zara", src: "/comp-logo-2.png", width: 120 },
  { name: "Gucci", src: "/comp-logo-3.png", width: 160 },
  { name: "Prada", src: "/comp-logo-4.png", width: 160 },
  { name: "Calvin Klein", src: "/comp-logo-5.png", width: 180 },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#F2F0F1] pt-6 sm:pt-10 lg:pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Left Column (Copy & CTAs) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left z-10 pb-6 lg:pb-16">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black font-bold-1 tracking-tight text-black leading-[1.08] uppercase mb-4 sm:mb-6">
              Find Clothes That Match Your Style
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 max-w-xl leading-relaxed mb-6 sm:mb-8">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>

            {/* Shop Now CTA */}
            <div className="mb-10 sm:mb-12">
              <Link
                href="/Product"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 bg-black text-white font-bold text-sm sm:text-base rounded-full hover:bg-zinc-800 active:scale-95 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
              </Link>
            </div>

            {/* Stats Counter Row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 border-t border-zinc-200/80 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-bold-1 text-black">
                  200+
                </div>
                <div className="text-xs sm:text-sm text-zinc-500 font-medium">
                  International Brands
                </div>
              </div>
              <div className="border-l border-zinc-200/80 pl-4 sm:pl-8">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-bold-1 text-black">
                  2,000+
                </div>
                <div className="text-xs sm:text-sm text-zinc-500 font-medium">
                  High-Quality Products
                </div>
              </div>
              <div className="border-l border-zinc-200/80 pl-4 sm:pl-8">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-bold-1 text-black">
                  30,000+
                </div>
                <div className="text-xs sm:text-sm text-zinc-500 font-medium">
                  Happy Customers
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Column (Hero Image with Decorative Sparkles) */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-end justify-center lg:justify-end -mb-6 sm:-mb-10 lg:-mb-16">
            {/* Small decorative sparkle */}
            <div className="absolute top-1/3 left-4 sm:left-6 z-10 animate-pulse pointer-events-none">
              <Sparkle className="w-7 h-7 sm:w-10 sm:h-10 text-black fill-black" />
            </div>

            {/* Large decorative sparkle */}
            <div className="absolute top-2 sm:top-4 right-4 sm:right-6 z-10 animate-pulse pointer-events-none">
              <Sparkle className="w-11 h-11 sm:w-16 sm:h-16 text-black fill-black" />
            </div>

            <div className="relative w-full max-w-[500px] sm:max-w-[620px] lg:max-w-[760px] xl:max-w-[850px] h-[480px] sm:h-[600px] lg:h-[740px] xl:h-[820px] flex items-end justify-center lg:justify-end">
              <Image
                src="/hero-models-transparent.png"
                alt="Find clothes that match your style - Models wearing modern street fashion"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain object-bottom origin-bottom scale-[1.18] sm:scale-[1.26] lg:scale-[1.38] xl:scale-[1.44] transition-transform duration-700 hover:scale-[1.42] lg:hover:scale-[1.48]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Logos Strip (Continuous moving right to left marquee) */}
      <div id="brand" className="relative z-20 w-full bg-black py-8 sm:py-10 mt-6 overflow-hidden border-t border-zinc-800">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-12 sm:gap-20 items-center">
          {/* First set of logos */}
          {brandLogos.map((logo, idx) => (
            <div key={`brand-1-${idx}`} className="flex-shrink-0 flex items-center justify-center px-4">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={38}
                className="h-7 sm:h-9 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300"
              />
            </div>
          ))}

          {/* Second duplicate set for seamless infinite loop */}
          {brandLogos.map((logo, idx) => (
            <div key={`brand-2-${idx}`} className="flex-shrink-0 flex items-center justify-center px-4">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={38}
                className="h-7 sm:h-9 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300"
              />
            </div>
          ))}

          {/* Third duplicate set for ultra-wide displays */}
          {brandLogos.map((logo, idx) => (
            <div key={`brand-3-${idx}`} className="flex-shrink-0 flex items-center justify-center px-4">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={38}
                className="h-7 sm:h-9 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
