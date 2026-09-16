"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size: product.sizes[0] || "Medium",
      color: product.colors[0]?.name || "Default",
      quantity: 1,
    });
  };

  // Render 5 stars based on rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1 text-amber-400" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;
          return (
            <Star
              key={star}
              className={`w-4 h-4 ${
                filled
                  ? "fill-amber-400 text-amber-400"
                  : half
                  ? "fill-amber-400/50 text-amber-400"
                  : "text-zinc-300 fill-zinc-100"
              }`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl p-3 sm:p-4 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-zinc-200 transition-all duration-300">
      <Link href={`/Product/Product${product.id}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative w-full aspect-square bg-[#F0EEED] rounded-xl overflow-hidden mb-3 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Discount Badge */}
          {product.discount && (
            <span className="absolute top-2 left-2 bg-red-500/10 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded-full border border-red-200/50">
              {product.discount}
            </span>
          )}

          {/* Quick Add overlay button */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 bg-black text-white p-2.5 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:bg-zinc-800 hover:scale-110 active:scale-95 focus:opacity-100 focus:outline-none"
            title="Quick add to cart"
            aria-label={`Quick add ${product.name} to cart`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 line-clamp-1 group-hover:text-zinc-700 transition">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-1.5 mb-2">
              {renderStars(product.rating)}
              <span className="text-xs text-zinc-500 font-medium">
                {product.rating.toFixed(1)}/5
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2.5 mt-auto">
            <span className="text-base sm:text-lg font-black text-black">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-zinc-400 line-through font-medium">
                ${product.originalPrice}
              </span>
            )}
            {product.discount && (
              <span className="text-[11px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-md ml-auto sm:ml-0">
                {product.discount}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
