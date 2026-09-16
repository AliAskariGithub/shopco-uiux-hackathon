import React from "react";
import Link from "next/link";
import { getNewArrivalProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Arrivals = () => {
  const arrivalProducts = getNewArrivalProducts().slice(0, 4);

  return (
    <section id="newarrivals" className="py-12 sm:py-16 border-b border-zinc-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-bold-1 text-center text-black uppercase tracking-tight mb-8 sm:mb-12">
          New Arrivals
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {arrivalProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:mt-12">
          <Link
            href="/Product?filter=new-arrivals"
            className="btn-animated px-12 py-3.5 border border-zinc-300 text-zinc-800 font-bold text-sm rounded-full hover:bg-black hover:text-white hover:border-black active:scale-98 transition duration-200"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Arrivals;
