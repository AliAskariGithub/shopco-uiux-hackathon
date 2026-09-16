"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const TopBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="relative w-full bg-black text-white/90 text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="container flex items-center justify-center relative mx-auto">
        <p className="text-center font-normal pr-6 sm:pr-0">
          Sign up and get 20% off your first order. Use code{" "}
          <span className="font-bold text-amber-300 tracking-wider">SHOP20</span> at checkout.{" "}
          <Link
            href="/Product"
            className="underline underline-offset-4 font-semibold text-white hover:text-zinc-200 transition"
          >
            Shop Now
          </Link>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-0 text-white/70 hover:text-white p-1 rounded-full transition"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};

export default TopBar;
