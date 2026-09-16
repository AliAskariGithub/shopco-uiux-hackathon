"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products, Product } from "@/data/products";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);

  const { totalCount } = useCart();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle live search
  useEffect(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (trimmed.length >= 2) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.style.toLowerCase().includes(trimmed)
      );
      setSearchResults(filtered.slice(0, 5));
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsShopDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setMobileSearchVisible(false);
      setIsOpen(false);
      router.push(`/Product?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setMobileSearchVisible(false);
    setIsOpen(false);
    router.push(`/Product/Product${productId}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-100 transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-zinc-700 hover:text-black rounded-lg hover:bg-zinc-100 transition"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link
              href="/"
              className="text-2xl sm:text-3xl font-black font-bold-1 tracking-tight text-black flex items-center gap-1"
            >
              SHOP.CO
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-zinc-700">
            {/* Shop Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setIsShopDropdownOpen(true)}
              onMouseLeave={() => setIsShopDropdownOpen(false)}
            >
              <button
                onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                className="flex items-center gap-1 hover:text-black transition py-2"
                aria-expanded={isShopDropdownOpen}
              >
                <span>Shop</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isShopDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isShopDropdownOpen && (
                <div className="absolute top-full left-0 w-[580px] bg-white rounded-3xl shadow-2xl border border-zinc-100 p-6 animate-in fade-in slide-in-from-top-2 duration-200 z-50 grid grid-cols-2 gap-6">
                  {/* Column 1: Dress Styles */}
                  <div>
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                      Dress Styles
                    </div>
                    <div className="space-y-1">
                      <Link
                        href="/Product?style=Casual"
                        onClick={() => setIsShopDropdownOpen(false)}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-50 transition"
                      >
                        <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs mt-0.5">
                          CS
                        </span>
                        <div>
                          <div className="text-sm font-bold text-zinc-800 group-hover:text-black flex items-center gap-1">
                            Casual
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-400" />
                          </div>
                          <p className="text-xs text-zinc-400">Relaxed tees, denim & everyday</p>
                        </div>
                      </Link>

                      <Link
                        href="/Product?style=Formal"
                        onClick={() => setIsShopDropdownOpen(false)}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-50 transition"
                      >
                        <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs mt-0.5">
                          FM
                        </span>
                        <div>
                          <div className="text-sm font-bold text-zinc-800 group-hover:text-black flex items-center gap-1">
                            Formal
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-400" />
                          </div>
                          <p className="text-xs text-zinc-400">Tailored shirts, trousers & suits</p>
                        </div>
                      </Link>

                      <Link
                        href="/Product?style=Party"
                        onClick={() => setIsShopDropdownOpen(false)}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-50 transition"
                      >
                        <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs mt-0.5">
                          PT
                        </span>
                        <div>
                          <div className="text-sm font-bold text-zinc-800 group-hover:text-black flex items-center gap-1">
                            Party
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-400" />
                          </div>
                          <p className="text-xs text-zinc-400">Metallic shimmer & evening wear</p>
                        </div>
                      </Link>

                      <Link
                        href="/Product?style=Gym"
                        onClick={() => setIsShopDropdownOpen(false)}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-50 transition"
                      >
                        <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs mt-0.5">
                          GY
                        </span>
                        <div>
                          <div className="text-sm font-bold text-zinc-800 group-hover:text-black flex items-center gap-1">
                            Gym & Athletic
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-400" />
                          </div>
                          <p className="text-xs text-zinc-400">Cooling tops & compression</p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Column 2: Categories & Special Collections */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                        Categories
                      </div>
                      <div className="grid grid-cols-2 gap-1 mb-4">
                        <Link
                          href="/Product?category=T-shirts"
                          onClick={() => setIsShopDropdownOpen(false)}
                          className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-lg transition"
                        >
                          T-Shirts
                        </Link>
                        <Link
                          href="/Product?category=Shirts"
                          onClick={() => setIsShopDropdownOpen(false)}
                          className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-lg transition"
                        >
                          Shirts
                        </Link>
                        <Link
                          href="/Product?category=Jeans"
                          onClick={() => setIsShopDropdownOpen(false)}
                          className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-lg transition"
                        >
                          Jeans & Denim
                        </Link>
                        <Link
                          href="/Product?category=Shorts"
                          onClick={() => setIsShopDropdownOpen(false)}
                          className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-lg transition"
                        >
                          Shorts
                        </Link>
                        <Link
                          href="/Product?category=Hoodie"
                          onClick={() => setIsShopDropdownOpen(false)}
                          className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-lg transition col-span-2"
                        >
                          Hoodies & Sweatshirts
                        </Link>
                      </div>

                      <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                        Special Curations
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <Link
                          href="/Product?filter=on-sale"
                          onClick={() => setIsShopDropdownOpen(false)}
                          className="px-2.5 py-1 text-xs font-bold bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition flex items-center gap-1"
                        >
                          🔥 On Sale
                        </Link>
                        <Link
                          href="/Product?filter=new-arrivals"
                          onClick={() => setIsShopDropdownOpen(false)}
                          className="px-2.5 py-1 text-xs font-bold bg-zinc-100 text-zinc-800 rounded-full hover:bg-zinc-200 transition flex items-center gap-1"
                        >
                          ✨ New Arrivals
                        </Link>
                        <Link
                          href="/Product?filter=top-selling"
                          onClick={() => setIsShopDropdownOpen(false)}
                          className="px-2.5 py-1 text-xs font-bold bg-zinc-100 text-zinc-800 rounded-full hover:bg-zinc-200 transition flex items-center gap-1"
                        >
                          ⭐ Top Selling
                        </Link>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 mt-4">
                      <Link
                        href="/Product"
                        onClick={() => setIsShopDropdownOpen(false)}
                        className="block w-full py-2.5 text-xs font-bold text-center bg-black text-white rounded-xl hover:bg-zinc-800 transition"
                      >
                        Explore Full Catalog (40 Items) →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/#onsale" className="hover:text-black underline-hover transition">
              On Sale
            </Link>
            <Link href="/#newarrivals" className="hover:text-black underline-hover transition">
              New Arrivals
            </Link>
            <Link href="/#brand" className="hover:text-black underline-hover transition">
              Brands
            </Link>
          </nav>

          {/* Desktop Search Bar with Live Suggestions */}
          <div ref={searchRef} className="relative hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setIsSearchOpen(true);
                }}
                placeholder="Search for products, categories..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-[#F0F0F0] border-transparent rounded-full focus:bg-white focus:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black/10 transition"
                aria-label="Search for products"
              />
            </form>

            {/* Live Search Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-zinc-100 p-2 z-50">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-3 py-1.5">
                  Products matching &ldquo;{searchQuery}&rdquo;
                </div>
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="w-full flex items-center gap-3 p-2 hover:bg-zinc-50 rounded-xl transition text-left"
                  >
                    <div className="relative w-11 h-11 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-zinc-900 truncate">
                        {product.name}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {product.category} • <span className="font-bold text-black">${product.price}</span>
                      </div>
                    </div>
                  </button>
                ))}
                <div className="border-t border-zinc-100 mt-1 pt-1">
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full py-2 text-xs font-semibold text-center text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-lg transition"
                  >
                    View all results for &ldquo;{searchQuery}&rdquo;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons (Cart & Profile) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
              className="md:hidden p-2 text-zinc-700 hover:text-black rounded-lg hover:bg-zinc-100 transition"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Link with Live Badge */}
            <Link
              href="/Cart"
              className="relative p-2 text-zinc-700 hover:text-black rounded-full hover:bg-zinc-100 transition"
              aria-label={`Shopping cart with ${totalCount} items`}
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-black text-white bg-black rounded-full shadow-sm animate-in zoom-in-75">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* Account Link / Avatar */}
            <Link
              href="/account"
              className="p-2 text-zinc-700 hover:text-black rounded-full hover:bg-zinc-100 hover:scale-110 active:scale-95 transition-all"
              aria-label="My Account"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {mobileSearchVisible && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F0F0F0] border-transparent rounded-full focus:bg-white focus:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black/10 transition"
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <div
          className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-100">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-2xl font-black font-bold-1 tracking-tight text-black"
            >
              SHOP.CO
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-zinc-500 hover:text-black rounded-lg hover:bg-zinc-100 transition"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-4">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Menu
              </div>
              <Link
                href="/Product"
                onClick={() => setIsOpen(false)}
                className="block text-lg font-bold text-zinc-900 hover:text-black transition"
              >
                All Products
              </Link>
              <Link
                href="/#onsale"
                onClick={() => setIsOpen(false)}
                className="block text-lg font-semibold text-zinc-700 hover:text-black transition"
              >
                On Sale
              </Link>
              <Link
                href="/#newarrivals"
                onClick={() => setIsOpen(false)}
                className="block text-lg font-semibold text-zinc-700 hover:text-black transition"
              >
                New Arrivals
              </Link>
              <Link
                href="/#brand"
                onClick={() => setIsOpen(false)}
                className="block text-lg font-semibold text-zinc-700 hover:text-black transition"
              >
                Brands
              </Link>
              <Link
                href="/Cart"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between text-lg font-semibold text-zinc-700 hover:text-black transition"
              >
                <span>Shopping Cart</span>
                {totalCount > 0 && (
                  <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {totalCount}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between text-lg font-semibold text-zinc-700 hover:text-black transition"
              >
                <span>My Account</span>
                <span className="text-xs bg-zinc-100 text-zinc-800 font-bold px-2 py-0.5 rounded-full">
                  Profile
                </span>
              </Link>
            </div>

            <div className="border-t border-zinc-100 pt-6 space-y-3">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Dress Styles
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/Product?style=Casual"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-xs font-semibold bg-zinc-50 hover:bg-zinc-100 text-zinc-800 rounded-xl transition flex items-center justify-between"
                >
                  <span>Casual</span>
                  <span className="text-[10px] text-zinc-400 font-normal">10</span>
                </Link>
                <Link
                  href="/Product?style=Formal"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-xs font-semibold bg-zinc-50 hover:bg-zinc-100 text-zinc-800 rounded-xl transition flex items-center justify-between"
                >
                  <span>Formal</span>
                  <span className="text-[10px] text-zinc-400 font-normal">10</span>
                </Link>
                <Link
                  href="/Product?style=Party"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-xs font-semibold bg-zinc-50 hover:bg-zinc-100 text-zinc-800 rounded-xl transition flex items-center justify-between"
                >
                  <span>Party</span>
                  <span className="text-[10px] text-zinc-400 font-normal">10</span>
                </Link>
                <Link
                  href="/Product?style=Gym"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-xs font-semibold bg-zinc-50 hover:bg-zinc-100 text-zinc-800 rounded-xl transition flex items-center justify-between"
                >
                  <span>Gym</span>
                  <span className="text-[10px] text-zinc-400 font-normal">10</span>
                </Link>
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-6 space-y-3">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Categories
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <Link
                  href="/Product?category=T-shirts"
                  onClick={() => setIsOpen(false)}
                  className="block px-2 py-1.5 text-sm text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-lg transition"
                >
                  T-Shirts
                </Link>
                <Link
                  href="/Product?category=Shirts"
                  onClick={() => setIsOpen(false)}
                  className="block px-2 py-1.5 text-sm text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-lg transition"
                >
                  Shirts
                </Link>
                <Link
                  href="/Product?category=Jeans"
                  onClick={() => setIsOpen(false)}
                  className="block px-2 py-1.5 text-sm text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-lg transition"
                >
                  Jeans & Denim
                </Link>
                <Link
                  href="/Product?category=Shorts"
                  onClick={() => setIsOpen(false)}
                  className="block px-2 py-1.5 text-sm text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-lg transition"
                >
                  Shorts
                </Link>
                <Link
                  href="/Product?category=Hoodie"
                  onClick={() => setIsOpen(false)}
                  className="block px-2 py-1.5 text-sm text-zinc-600 hover:text-black hover:bg-zinc-50 rounded-lg transition col-span-2"
                >
                  Hoodies & Sweatshirts
                </Link>
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-6 space-y-3">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Featured
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/Product?filter=on-sale"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 text-xs font-bold bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition"
                >
                  🔥 On Sale
                </Link>
                <Link
                  href="/Product?filter=new-arrivals"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 text-xs font-bold bg-zinc-100 text-zinc-800 rounded-full hover:bg-zinc-200 transition"
                >
                  ✨ New Arrivals
                </Link>
                <Link
                  href="/Product?filter=top-selling"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 text-xs font-bold bg-zinc-100 text-zinc-800 rounded-full hover:bg-zinc-200 transition"
                >
                  ⭐ Top Selling
                </Link>
              </div>
            </div>
          </div>

          {/* Footer of Drawer */}
          <div className="p-6 border-t border-zinc-100 bg-zinc-50">
            <Link
              href="/Product"
              onClick={() => setIsOpen(false)}
              className="block w-full py-3 bg-black text-white text-center font-bold rounded-xl hover:bg-zinc-800 transition"
            >
              Shop Catalog
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
