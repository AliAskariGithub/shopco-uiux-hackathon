"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  X,
  RotateCcw,
  Check,
  ChevronLeft,
  Sparkles,
  Tag,
  TrendingUp,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const CATEGORIES = ["All", "T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"] as const;
const STYLES = ["All", "Casual", "Formal", "Party", "Gym"] as const;
const SIZES = ["Small", "Medium", "Large", "X-Large", "XX-Large"];

interface ColorOption {
  name: string;
  label: string;
  bgColor: string;
  match?: string[];
}

const COLORS: ColorOption[] = [
  { name: "all", label: "All Colors", bgColor: "bg-zinc-200" },
  {
    name: "black",
    label: "Black & Onyx",
    bgColor: "bg-black",
    match: ["black", "onyx", "obsidian", "charcoal", "noir", "carbon", "pitch"],
  },
  {
    name: "white",
    label: "White & Cream",
    bgColor: "bg-white border-zinc-300",
    match: ["white", "cream", "ivory", "pearl"],
  },
  {
    name: "blue",
    label: "Blue & Navy",
    bgColor: "bg-blue-600",
    match: ["blue", "navy", "cyan", "sky", "indigo", "ocean", "cobalt", "arctic", "aero"],
  },
  {
    name: "green",
    label: "Green & Olive",
    bgColor: "bg-emerald-600",
    match: ["green", "emerald", "olive", "forest", "sage", "lime", "jade", "teal", "volt"],
  },
  {
    name: "red",
    label: "Red & Burgundy",
    bgColor: "bg-red-600",
    match: ["red", "ruby", "crimson", "wine", "burgundy", "terracotta", "rose"],
  },
  {
    name: "yellow",
    label: "Gold & Amber",
    bgColor: "bg-amber-400",
    match: ["yellow", "gold", "amber", "champagne", "optic"],
  },
  {
    name: "purple",
    label: "Purple & Plum",
    bgColor: "bg-purple-600",
    match: ["purple", "violet", "plum", "amethyst", "magenta", "berry", "ultraviolet"],
  },
  {
    name: "orange",
    label: "Orange & Earth",
    bgColor: "bg-orange-500",
    match: ["orange", "bronze", "caramel", "sand", "khaki", "stone", "peach", "brown", "solar"],
  },
  {
    name: "grey",
    label: "Grey & Slate",
    bgColor: "bg-slate-400",
    match: ["grey", "gray", "slate", "graphite", "steel", "silver", "platinum"],
  },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL query parameters
  const paramCategory = searchParams.get("category") || "All";
  const paramStyle = searchParams.get("style") || "All";
  const paramSearch = searchParams.get("search") || "";
  const paramFilter = searchParams.get("filter") || (searchParams.get("discount") === "true" ? "on-sale" : "all");
  const paramSort = searchParams.get("sort") || "popular";

  // State
  const [selectedCategory, setSelectedCategory] = useState<string>(paramCategory);
  const [selectedStyle, setSelectedStyle] = useState<string>(paramStyle);
  const [selectedCollection, setSelectedCollection] = useState<string>(paramFilter);
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [sortBy, setSortBy] = useState<string>(paramSort);
  const [searchQuery, setSearchQuery] = useState<string>(paramSearch);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sync state cleanly whenever URL params change
  useEffect(() => {
    const category = searchParams.get("category") || "All";
    const style = searchParams.get("style") || "All";
    const search = searchParams.get("search") || "";
    const filter =
      searchParams.get("filter") ||
      (searchParams.get("discount") === "true" ? "on-sale" : "all");
    const sort = searchParams.get("sort") || "popular";

    setSelectedCategory(category);
    setSelectedStyle(style);
    setSelectedCollection(filter);
    setSearchQuery(search);
    setSortBy(sort);
    setCurrentPage(1);
  }, [searchParams]);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedStyle("All");
    setSelectedCollection("all");
    setSelectedColor("all");
    setSelectedSize(null);
    setMaxPrice(300);
    setSearchQuery("");
    setCurrentPage(1);
    router.push("/Product");
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.style.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 2. Collection filter (On Sale, New Arrivals, Top Selling)
      if (selectedCollection === "on-sale" && !product.isOnSale) {
        return false;
      }
      if (selectedCollection === "new-arrivals" && !product.isNewArrival) {
        return false;
      }
      if (selectedCollection === "top-selling" && !product.isTopSelling) {
        return false;
      }

      // 3. Category
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      // 4. Style
      if (selectedStyle !== "All" && product.style !== selectedStyle) {
        return false;
      }

      // 5. Price
      if (product.price > maxPrice) {
        return false;
      }

      // 6. Color Matching
      if (selectedColor !== "all") {
        const colorOpt = COLORS.find((c) => c.name === selectedColor);
        if (colorOpt && colorOpt.match) {
          const hasMatchingColor = product.colors.some((productColor) => {
            const lowerName = productColor.name.toLowerCase();
            return colorOpt.match!.some((token) => lowerName.includes(token));
          });
          if (!hasMatchingColor) return false;
        } else {
          const hasColor = product.colors.some((c) =>
            c.name.toLowerCase().includes(selectedColor.toLowerCase())
          );
          if (!hasColor) return false;
        }
      }

      // 7. Size
      if (selectedSize && !product.sizes.includes(selectedSize)) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedCollection,
    selectedCategory,
    selectedStyle,
    maxPrice,
    selectedColor,
    selectedSize,
  ]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-low") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-high") {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === "newest") {
      return list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0) || Number(b.id) - Number(a.id));
    }
    // Default: popular
    return list.sort((a, b) => b.reviewCount - a.reviewCount);
  }, [filteredProducts, sortBy]);

  // Pagination (9 products per page)
  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedStyle !== "All" ? 1 : 0) +
    (selectedCollection !== "all" ? 1 : 0) +
    (selectedColor !== "all" ? 1 : 0) +
    (selectedSize ? 1 : 0) +
    (maxPrice < 300 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Dynamic Page Title
  const getPageTitle = () => {
    if (selectedCollection === "on-sale") return "On Sale Items";
    if (selectedCollection === "new-arrivals") return "New Arrivals";
    if (selectedCollection === "top-selling") return "Top Selling Items";
    if (selectedCategory !== "All") return `${selectedCategory} Collection`;
    if (selectedStyle !== "All") return `${selectedStyle} Style`;
    if (searchQuery) return `Search: "${searchQuery}"`;
    return "Explore Catalog";
  };

  // Filter Sidebar Component (Shared between desktop and mobile sheet)
  const FilterControls = () => (
    <div className="space-y-6">
      {/* Featured Collections Filter */}
      <div>
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
          Collection
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => {
              setSelectedCollection("all");
              setCurrentPage(1);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl font-medium transition ${
              selectedCollection === "all"
                ? "bg-black text-white"
                : "text-zinc-600 hover:text-black hover:bg-zinc-100"
            }`}
          >
            <span>All Products</span>
            <span className="text-xs opacity-60">40</span>
          </button>
          <button
            onClick={() => {
              setSelectedCollection(selectedCollection === "on-sale" ? "all" : "on-sale");
              setCurrentPage(1);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl font-medium transition ${
              selectedCollection === "on-sale"
                ? "bg-red-600 text-white font-bold"
                : "text-zinc-600 hover:text-black hover:bg-zinc-100"
            }`}
          >
            <span className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5" />
              On Sale
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCollection === "on-sale" ? "bg-white/20 text-white" : "bg-red-50 text-red-600 font-bold"}`}>
              {products.filter((p) => p.isOnSale).length}
            </span>
          </button>
          <button
            onClick={() => {
              setSelectedCollection(selectedCollection === "new-arrivals" ? "all" : "new-arrivals");
              setCurrentPage(1);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl font-medium transition ${
              selectedCollection === "new-arrivals"
                ? "bg-black text-white font-bold"
                : "text-zinc-600 hover:text-black hover:bg-zinc-100"
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              New Arrivals
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCollection === "new-arrivals" ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-700"}`}>
              {products.filter((p) => p.isNewArrival).length}
            </span>
          </button>
          <button
            onClick={() => {
              setSelectedCollection(selectedCollection === "top-selling" ? "all" : "top-selling");
              setCurrentPage(1);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl font-medium transition ${
              selectedCollection === "top-selling"
                ? "bg-black text-white font-bold"
                : "text-zinc-600 hover:text-black hover:bg-zinc-100"
            }`}
          >
            <span className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Top Selling
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCollection === "top-selling" ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-700"}`}>
              {products.filter((p) => p.isTopSelling).length}
            </span>
          </button>
        </div>
      </div>

      <div className="border-t border-zinc-200" />

      {/* Dress Style Filter */}
      <div>
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
          Dress Style
        </h3>
        <div className="space-y-1">
          {STYLES.map((st) => {
            const count = st === "All" ? products.length : products.filter((p) => p.style === st).length;
            const isSelected = selectedStyle === st;
            return (
              <button
                key={st}
                onClick={() => {
                  setSelectedStyle(st);
                  setCurrentPage(1);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl font-medium transition ${
                  isSelected
                    ? "bg-black text-white"
                    : "text-zinc-600 hover:text-black hover:bg-zinc-100"
                }`}
              >
                <span>{st}</span>
                <span className={`text-xs ${isSelected ? "text-white/70" : "text-zinc-400"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-zinc-200" />

      {/* Category Filter */}
      <div>
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
          Category
        </h3>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const count = cat === "All" ? products.length : products.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl font-medium transition ${
                  isSelected
                    ? "bg-black text-white"
                    : "text-zinc-600 hover:text-black hover:bg-zinc-100"
                }`}
              >
                <span>{cat}</span>
                <span className={`text-xs ${isSelected ? "text-white/70" : "text-zinc-400"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-zinc-200" />

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Price Range
          </h3>
          <span className="text-sm font-bold text-black">${maxPrice} max</span>
        </div>
        <input
          type="range"
          min="50"
          max="300"
          step="10"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="w-full accent-black cursor-pointer"
        />
        <div className="flex justify-between text-xs text-zinc-400 mt-1 font-medium">
          <span>$50</span>
          <span>$300</span>
        </div>
      </div>

      <div className="border-t border-zinc-200" />

      {/* Colors */}
      <div>
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
          Colors
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => {
                setSelectedColor(selectedColor === c.name ? "all" : c.name);
                setCurrentPage(1);
              }}
              title={c.label}
              className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                c.bgColor
              } ${
                selectedColor === c.name
                  ? "ring-2 ring-black ring-offset-2 scale-110"
                  : "border-zinc-300 hover:scale-105"
              }`}
              aria-label={`Filter by color: ${c.label}`}
            >
              {selectedColor === c.name && (
                <Check
                  className={`w-4 h-4 ${
                    c.name === "white" || c.name === "all" ? "text-black" : "text-white"
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-200" />

      {/* Sizes */}
      <div>
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(selectedSize === size ? null : size);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition ${
                selectedSize === size
                  ? "bg-black text-white border-black"
                  : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filters CTA */}
      {activeFilterCount > 0 && (
        <button
          onClick={handleResetFilters}
          className="w-full py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-black font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {selectedCollection !== "all"
                    ? selectedCollection === "on-sale"
                      ? "On Sale"
                      : selectedCollection === "new-arrivals"
                      ? "New Arrivals"
                      : "Top Selling"
                    : selectedCategory !== "All"
                    ? selectedCategory
                    : selectedStyle !== "All"
                    ? selectedStyle
                    : "All Products"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Main Grid: Filters Sidebar + Products Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Aside */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
                <h2 className="text-xl font-bold font-bold-1 text-black flex items-center gap-2">
                  Filters
                </h2>
                <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
              </div>
              <FilterControls />
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {/* Top Toolbar: Heading, Sorting, and Mobile Filter Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-100">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-bold-1 text-black tracking-tight">
                  {getPageTitle()}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Showing {sortedProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}–
                  {Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length)} of{" "}
                  {sortedProducts.length} Products
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-full text-sm font-semibold text-zinc-800 transition"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 bg-black text-white rounded-full text-[11px] flex items-center justify-center font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="hidden sm:inline">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-zinc-100 hover:bg-zinc-200/80 border-transparent text-black font-bold text-xs sm:text-sm py-2 pl-3 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-black cursor-pointer transition"
                      aria-label="Sort products by"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="newest">Newest Arrivals</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filter Pills */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-zinc-400 font-medium">Active:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs font-medium">
                    Search: &ldquo;{searchQuery}&rdquo;
                    <button
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search filter"
                    >
                      <X className="w-3 h-3 text-zinc-400 hover:text-black" />
                    </button>
                  </span>
                )}
                {selectedCollection !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 text-white rounded-full text-xs font-medium">
                    {selectedCollection === "on-sale"
                      ? "On Sale"
                      : selectedCollection === "new-arrivals"
                      ? "New Arrivals"
                      : "Top Selling"}
                    <button
                      onClick={() => setSelectedCollection("all")}
                      aria-label="Clear collection filter"
                    >
                      <X className="w-3 h-3 text-zinc-400 hover:text-white" />
                    </button>
                  </span>
                )}
                {selectedStyle !== "All" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs font-medium">
                    Style: {selectedStyle}
                    <button
                      onClick={() => setSelectedStyle("All")}
                      aria-label="Clear style filter"
                    >
                      <X className="w-3 h-3 text-zinc-400 hover:text-black" />
                    </button>
                  </span>
                )}
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs font-medium">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("All")}
                      aria-label="Clear category filter"
                    >
                      <X className="w-3 h-3 text-zinc-400 hover:text-black" />
                    </button>
                  </span>
                )}
                {selectedColor !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs font-medium">
                    Color: {COLORS.find((c) => c.name === selectedColor)?.label || selectedColor}
                    <button
                      onClick={() => setSelectedColor("all")}
                      aria-label="Clear color filter"
                    >
                      <X className="w-3 h-3 text-zinc-400 hover:text-black" />
                    </button>
                  </span>
                )}
                {selectedSize && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs font-medium">
                    Size: {selectedSize}
                    <button
                      onClick={() => setSelectedSize(null)}
                      aria-label="Clear size filter"
                    >
                      <X className="w-3 h-3 text-zinc-400 hover:text-black" />
                    </button>
                  </span>
                )}
                {maxPrice < 300 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs font-medium">
                    Max: ${maxPrice}
                    <button
                      onClick={() => setMaxPrice(300)}
                      aria-label="Clear max price filter"
                    >
                      <X className="w-3 h-3 text-zinc-400 hover:text-black" />
                    </button>
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-red-600 hover:underline font-semibold ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid or Empty State */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-3xl border border-zinc-100 p-8">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-xl font-bold text-black mb-2 font-bold-1">
                  No products found
                </h3>
                <p className="text-zinc-500 text-sm max-w-md mx-auto mb-6">
                  We couldn&apos;t find any items matching your selected criteria. Try adjusting your filters or search keywords.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-black text-white text-xs font-bold rounded-full hover:bg-zinc-800 transition"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Functional Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-zinc-200 mt-12 pt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-200 text-sm font-semibold text-zinc-700 rounded-xl hover:bg-zinc-100 disabled:opacity-40 disabled:pointer-events-none transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-1.5">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                          currentPage === pageNum
                            ? "bg-black text-white"
                            : "text-zinc-600 hover:bg-zinc-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-200 text-sm font-semibold text-zinc-700 rounded-xl hover:bg-zinc-100 disabled:opacity-40 disabled:pointer-events-none transition"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal Sheet */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                <h2 className="text-xl font-bold font-bold-1 text-black">
                  Filters ({activeFilterCount})
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 text-zinc-500 hover:text-black rounded-lg hover:bg-zinc-100 transition"
                  aria-label="Close filters"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <FilterControls />
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex gap-3">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-3 px-4 bg-white border border-zinc-200 text-zinc-800 font-bold text-sm rounded-full hover:bg-zinc-100 transition"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 py-3 px-4 bg-black text-white font-bold text-sm rounded-full hover:bg-zinc-800 transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center">Loading catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
