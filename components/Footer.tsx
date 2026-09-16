"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Check, Globe } from "lucide-react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { useToast } from "@/components/Toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      showToast("Please enter a valid email", "e.g. name@example.com", "error");
      return;
    }
    setIsSubscribed(true);
    showToast("Subscribed successfully!", "Check your inbox for 20% off code.", "success");
    setEmail("");
  };

  return (
    <footer className="bg-[#F0F0F0] mt-24 pt-0 text-zinc-700">
      {/* Newsletter Card Banner */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -translate-y-16 sm:-translate-y-20">
        <div className="bg-black text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-black font-bold-1 leading-tight tracking-tight text-white">
              STAY UP TO DATE ABOUT OUR LATEST OFFERS
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-2">
              Subscribe to get special discounts, VIP sales previews, and style recommendations.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 max-w-md flex-shrink-0"
          >
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-5 h-5 text-zinc-400" />
              <input
                type="email"
                id="footer-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full sm:w-80 pl-12 pr-4 py-3 text-sm text-black bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-zinc-400 transition"
                aria-label="Email address for newsletter"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto lg:w-80 py-3 px-6 bg-white text-black font-bold text-sm rounded-full hover:bg-zinc-200 active:scale-98 transition flex items-center justify-center gap-2"
            >
              {isSubscribed ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" /> Subscribed!
                </>
              ) : (
                "Subscribe to Newsletter"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="text-2xl font-black font-bold-1 tracking-tight text-black">
              SHOP.CO
            </Link>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              We have clothes that suit your style and which you&apos;re proud to wear. From modern streetwear to tailored luxury essentials.
            </p>
            {/* Social Icons */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href="https://www.aliaskari.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portfolio - Syed Ali Askari"
                title="Portfolio"
                className="w-9 h-9 flex items-center justify-center bg-white border border-zinc-200 rounded-full hover:bg-black hover:text-white hover:border-black hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/ali-askari-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-9 h-9 flex items-center justify-center bg-white border border-zinc-200 rounded-full hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/AliAskariGithub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="w-9 h-9 flex items-center justify-center bg-white border border-zinc-200 rounded-full hover:bg-black hover:text-white hover:border-black hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/Syed_Ali_Askari"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                title="X"
                className="w-9 h-9 flex items-center justify-center bg-white border border-zinc-200 rounded-full hover:bg-black hover:text-white hover:border-black hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61564881342854"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="w-9 h-9 flex items-center justify-center bg-white border border-zinc-200 rounded-full hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/syedaliaskarizaidi__/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="w-9 h-9 flex items-center justify-center bg-white border border-zinc-200 rounded-full hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links: Company */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li>
                <Link href="/Product" className="hover:text-black transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/Product" className="hover:text-black transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/Product" className="hover:text-black transition">
                  Works
                </Link>
              </li>
              <li>
                <Link href="/Product" className="hover:text-black transition">
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Help */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider">Help</h3>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li>
                <Link href="/Cart" className="hover:text-black transition">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link href="/Cart" className="hover:text-black transition">
                  Delivery Details
                </Link>
              </li>
              <li>
                <Link href="/Cart" className="hover:text-black transition">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/Cart" className="hover:text-black transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: FAQ */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider">FAQ</h3>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li>
                <Link href="/Cart" className="hover:text-black transition">
                  Account
                </Link>
              </li>
              <li>
                <Link href="/Cart" className="hover:text-black transition">
                  Manage Deliveries
                </Link>
              </li>
              <li>
                <Link href="/Cart" className="hover:text-black transition">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/Cart" className="hover:text-black transition">
                  Payments
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Resources */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2.5 text-sm text-zinc-500">
              <li>
                <Link href="/Product" className="hover:text-black transition">
                  Free eBooks
                </Link>
              </li>
              <li>
                <Link href="/Product" className="hover:text-black transition">
                  Development Tutorial
                </Link>
              </li>
              <li>
                <Link href="/Product" className="hover:text-black transition">
                  How-to Blog
                </Link>
              </li>
              <li>
                <Link href="/Product" className="hover:text-black transition">
                  YouTube Playlist
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="border-t border-zinc-200/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>Shop.co © 2000-2026, All Rights Reserved</p>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-white px-2 py-1 rounded border border-zinc-200">
              <Image src="/card01.png" alt="Visa" width={38} height={24} className="h-4 w-auto object-contain" />
            </div>
            <div className="bg-white px-2 py-1 rounded border border-zinc-200">
              <Image src="/card02.png" alt="PayPal" width={38} height={24} className="h-4 w-auto object-contain" />
            </div>
            <div className="bg-white px-2 py-1 rounded border border-zinc-200">
              <Image src="/card03.png" alt="MasterCard" width={38} height={24} className="h-4 w-auto object-contain" />
            </div>
            <div className="bg-white px-2 py-1 rounded border border-zinc-200">
              <Image src="/card04.png" alt="Apple Pay" width={38} height={24} className="h-4 w-auto object-contain" />
            </div>
            <div className="bg-white px-2 py-1 rounded border border-zinc-200">
              <Image src="/card05.png" alt="Google Pay" width={38} height={24} className="h-4 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
