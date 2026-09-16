"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Star,
  Minus,
  Plus,
  Check,
  CheckCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Product, Review, getRelatedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";
import ProductCard from "@/components/ProductCard";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  // State
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[1] || product.sizes[0] || "Medium"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "faqs">("reviews");
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // New review form state
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerText, setReviewerText] = useState("");

  const { addItem } = useCart();
  const { showToast } = useToast();

  const relatedProducts = getRelatedProducts(product.id, 4);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: selectedImage,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerText.trim()) {
      showToast("Please fill all review fields", undefined, "error");
      return;
    }

    const newReview: Review = {
      id: `r-${Date.now()}`,
      name: reviewerName.trim(),
      rating: reviewerRating,
      review: reviewerText.trim(),
      date: "Just now",
      verified: true,
    };

    setReviewsList([newReview, ...reviewsList]);
    setIsReviewModalOpen(false);
    setReviewerName("");
    setReviewerText("");
    setReviewerRating(5);
    showToast("Review submitted!", "Thank you for your feedback.", "success");
  };

  return (
    <div className="py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 sm:mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/Product">Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/Product?category=${product.category}`}>
                  {product.category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-black truncate max-w-[200px] sm:max-w-none">
                  {product.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Top Section: Gallery & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Product Gallery (Left) */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#F0EEED] border-2 transition-all flex-shrink-0 flex items-center justify-center p-2 ${
                    selectedImage === img
                      ? "border-black ring-2 ring-black/10 scale-105"
                      : "border-transparent hover:border-zinc-300 opacity-75 hover:opacity-100"
                  }`}
                  aria-label={`View thumbnail ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>

            {/* Main Image Display */}
            <div className="relative flex-1 aspect-square bg-[#F0EEED] rounded-3xl overflow-hidden flex items-center justify-center p-6 border border-zinc-100">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4 transition-all duration-300"
              />
              {product.discount && (
                <span className="absolute top-4 left-4 bg-red-500/10 text-red-600 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
                  {product.discount}
                </span>
              )}
            </div>
          </div>

          {/* Product Details (Right) */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <h1 className="text-2xl sm:text-4xl font-black font-bold-1 text-black uppercase tracking-tight mb-3">
              {product.name}
            </h1>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      product.rating >= s
                        ? "fill-amber-400 text-amber-400"
                        : product.rating >= s - 0.5
                        ? "fill-amber-400/50 text-amber-400"
                        : "text-zinc-200 fill-zinc-100"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-zinc-700">
                {product.rating.toFixed(1)}/5
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price Row */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-100">
              <span className="text-2xl sm:text-3xl font-black text-black">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl sm:text-2xl text-zinc-400 line-through font-medium">
                  ${product.originalPrice}
                </span>
              )}
              {product.discount && (
                <span className="text-xs sm:text-sm font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
                  {product.discount} OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Select Colors */}
            <div className="mb-6 pb-6 border-b border-zinc-100">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                Select Colors: <span className="text-black capitalize">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                      color.bgColor
                    } ${
                      selectedColor === color.name
                        ? "ring-2 ring-black ring-offset-2 scale-110"
                        : "hover:scale-105 border-zinc-300"
                    }`}
                    aria-label={`Select ${color.name} color`}
                  >
                    {selectedColor === color.name && (
                      <Check
                        className={`w-4 h-4 ${
                          color.name === "white" || color.name === "peach"
                            ? "text-black"
                            : "text-white"
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Size */}
            <div className="mb-8 pb-6 border-b border-zinc-100">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                Choose Size
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full border transition-all ${
                      selectedSize === size
                        ? "bg-black text-white border-black shadow-sm"
                        : "bg-[#F0F0F0] text-zinc-700 border-transparent hover:bg-zinc-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-2 border border-zinc-200 shadow-inner">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 text-zinc-600 hover:text-black hover:scale-110 active:scale-90 transition rounded-full hover:bg-zinc-200"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1.5 text-zinc-600 hover:text-black hover:scale-110 active:scale-90 transition rounded-full hover:bg-zinc-200"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-animated flex-1 py-4 px-8 bg-black text-white font-bold text-sm sm:text-base rounded-full hover:bg-zinc-800 active:scale-95 transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                Add to Cart
              </button>
            </div>

            {/* Perks Strip */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-xs text-zinc-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-black flex-shrink-0" />
                <span>Free shipping over $250</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-black flex-shrink-0" />
                <span>30-day easy returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-black flex-shrink-0" />
                <span>100% genuine guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section: Details, Reviews, FAQs */}
        <div className="mb-16">
          {/* Tab Headers with interactive pill styling and smooth indicator */}
          <div className="flex border-b border-zinc-200 mb-8 relative">
            <button
              onClick={() => setActiveTab("details")}
              className={`relative flex-1 pb-4 text-sm sm:text-base font-bold text-center transition-all duration-300 ${
                activeTab === "details"
                  ? "text-black"
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
            >
              <span>Product Details</span>
              {activeTab === "details" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full animate-in fade-in zoom-in-95 duration-200" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`relative flex-1 pb-4 text-sm sm:text-base font-bold text-center transition-all duration-300 ${
                activeTab === "reviews"
                  ? "text-black"
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
            >
              <span>Rating &amp; Reviews ({reviewsList.length})</span>
              {activeTab === "reviews" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full animate-in fade-in zoom-in-95 duration-200" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("faqs")}
              className={`relative flex-1 pb-4 text-sm sm:text-base font-bold text-center transition-all duration-300 ${
                activeTab === "faqs"
                  ? "text-black"
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
            >
              <span>FAQs</span>
              {activeTab === "faqs" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full animate-in fade-in zoom-in-95 duration-200" />
              )}
            </button>
          </div>

          {/* Tab Content: Details */}
          {activeTab === "details" && (
            <div key="details" className="bg-white rounded-3xl border border-zinc-100 p-6 sm:p-8 space-y-6 animate-section">
              <h3 className="text-xl font-bold font-bold-1 text-black">Product Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100/80 hover:border-zinc-300 transition duration-200">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    Material Composition
                  </span>
                  <span className="font-semibold text-black">{product.details.material}</span>
                </div>
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100/80 hover:border-zinc-300 transition duration-200">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    Silhouette &amp; Fit
                  </span>
                  <span className="font-semibold text-black">{product.details.fit}</span>
                </div>
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100/80 hover:border-zinc-300 transition duration-200">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    Garment Care
                  </span>
                  <span className="font-semibold text-black">{product.details.care}</span>
                </div>
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100/80 hover:border-zinc-300 transition duration-200">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    Country of Origin
                  </span>
                  <span className="font-semibold text-black">{product.details.origin}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Reviews */}
          {activeTab === "reviews" && (
            <div key="reviews" className="space-y-8 animate-section">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-bold-1 text-black">
                    All Reviews ({reviewsList.length})
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Verified customer feedback and styling impressions
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="btn-animated py-2.5 px-6 bg-black text-white font-bold text-xs sm:text-sm rounded-full hover:bg-zinc-800 transition shadow-md"
                  >
                    Write a Review
                  </button>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {reviewsList.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              review.rating >= s
                                ? "fill-amber-400 text-amber-400"
                                : "text-zinc-200 fill-zinc-100"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-black">{review.name}</span>
                      {review.verified && (
                        <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                      )}
                    </div>

                    <p className="text-sm text-zinc-600 leading-relaxed">
                      &ldquo;{review.review}&rdquo;
                    </p>

                    <div className="text-xs text-zinc-400 font-medium pt-2">
                      Posted {review.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: FAQs */}
          {activeTab === "faqs" && (
            <div key="faqs" className="bg-white rounded-3xl border border-zinc-100 p-6 sm:p-8 space-y-4 animate-section">
              <h3 className="text-xl font-bold font-bold-1 text-black mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                <details className="group border border-zinc-100 hover:border-zinc-200 rounded-2xl p-4 cursor-pointer transition-colors bg-zinc-50/40">
                  <summary className="font-bold text-sm sm:text-base text-zinc-900 flex items-center justify-between list-none">
                    How long does shipping take?
                    <ChevronDown className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform duration-300" />
                  </summary>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed animate-in fade-in duration-200">
                    Standard shipping takes 3-5 business days within the continental US. Express shipping arrives within 1-2 business days. International delivery takes 7-12 days depending on location.
                  </p>
                </details>
                <details className="group border border-zinc-100 hover:border-zinc-200 rounded-2xl p-4 cursor-pointer transition-colors bg-zinc-50/40">
                  <summary className="font-bold text-sm sm:text-base text-zinc-900 flex items-center justify-between list-none">
                    What is your return policy?
                    <ChevronDown className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform duration-300" />
                  </summary>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed animate-in fade-in duration-200">
                    We offer a 30-day hassle-free return window for all unwashed and unworn items with tags attached. Pre-paid return labels are provided through our customer support portal.
                  </p>
                </details>
                <details className="group border border-zinc-100 hover:border-zinc-200 rounded-2xl p-4 cursor-pointer transition-colors bg-zinc-50/40">
                  <summary className="font-bold text-sm sm:text-base text-zinc-900 flex items-center justify-between list-none">
                    How do I choose the correct size?
                    <ChevronDown className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform duration-300" />
                  </summary>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed animate-in fade-in duration-200">
                    Our garments fit true to standard US sizing. For an oversized streetwear aesthetic, we recommend sizing up one size. Refer to our size guide on the catalog page for exact chest and waist measurements.
                  </p>
                </details>
              </div>
            </div>
          )}
        </div>

        {/* You Might Also Like Section */}
        <section className="pt-8 border-t border-zinc-100">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-bold-1 text-center text-black uppercase tracking-tight mb-8 sm:mb-12">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Write a Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsReviewModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 animate-in zoom-in-95">
            <h3 className="text-xl font-bold font-bold-1 text-black mb-1">
              Write a Review
            </h3>
            <p className="text-xs text-zinc-500 mb-6">
              Share your thoughts on {product.name}
            </p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Michael S."
                  required
                  className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewerRating(star)}
                      className="p-1"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          reviewerRating >= star
                            ? "fill-amber-400 text-amber-400"
                            : "text-zinc-200"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-sm font-bold ml-2">{reviewerRating} / 5</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Your Review
                </label>
                <textarea
                  value={reviewerText}
                  onChange={(e) => setReviewerText(e.target.value)}
                  placeholder="What did you like or dislike about this item?"
                  rows={4}
                  required
                  className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="py-2.5 px-5 bg-zinc-100 text-zinc-700 font-bold text-xs rounded-full hover:bg-zinc-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-black text-white font-bold text-xs rounded-full hover:bg-zinc-800 transition"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
