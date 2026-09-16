"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  CheckCircle2,
  Clock,
  Truck,
  Edit3,
  Award,
  ShieldCheck,
  ChevronRight,
  Globe,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/components/Toast";

interface MockOrder {
  id: string;
  date: string;
  total: number;
  status: "Delivered" | "In Transit" | "Processing";
  items: {
    name: string;
    image: string;
    size: string;
    color: string;
    qty: number;
    price: number;
  }[];
}

const mockOrders: MockOrder[] = [
  {
    id: "SHOPCO-849201",
    date: "September 12, 2026",
    total: 280,
    status: "Delivered",
    items: [
      {
        name: "Gradient Graphic T-shirt",
        image: "/images/shirt7.png",
        size: "Large",
        color: "White",
        qty: 1,
        price: 145,
      },
      {
        name: "Sleeve Striped T-shirt",
        image: "/images/shirt3.png",
        size: "Medium",
        color: "Orange",
        qty: 1,
        price: 135,
      },
    ],
  },
  {
    id: "SHOPCO-712984",
    date: "August 28, 2026",
    total: 240,
    status: "In Transit",
    items: [
      {
        name: "Skinny Fit Jeans",
        image: "/images/pent1.png",
        size: "Large",
        color: "Blue",
        qty: 1,
        price: 240,
      },
    ],
  },
  {
    id: "SHOPCO-603129",
    date: "August 14, 2026",
    total: 392,
    status: "Delivered",
    items: [
      {
        name: "Polo with Contrast Trims",
        image: "/images/shirt6.png",
        size: "Medium",
        color: "Green",
        qty: 1,
        price: 212,
      },
      {
        name: "Checkered Shirt",
        image: "/images/shirt2.png",
        size: "Medium",
        color: "Red",
        qty: 1,
        price: 180,
      },
    ],
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "payments" | "settings">("orders");
  const [userName, setUserName] = useState("Syed Ali Askari");
  const [userEmail, setUserEmail] = useState("syedaliaskarizaidi@example.com");
  const [userPhone, setUserPhone] = useState("+92 300 1234567");
  const [isEditing, setIsEditing] = useState(false);
  const { showToast } = useToast();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    showToast("Profile Updated", "Your changes have been saved.", "success");
  };

  const handleSignOut = () => {
    showToast("Signed Out", "You have been signed out of your demo account.", "info");
  };

  return (
    <div className="py-6 sm:py-10 bg-[#f9fafb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>My Account</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Profile Card Banner */}
        <div className="bg-black text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl mb-8 relative overflow-hidden">
          {/* Background subtle glow */}
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-zinc-800/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-600 border-2 border-zinc-700 flex items-center justify-center text-2xl font-black text-white shadow-inner flex-shrink-0">
                SA
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-black rounded-full" title="Online" />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-black font-bold-1 text-white">
                    {userName}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold">
                    <Award className="w-3.5 h-3.5" /> VIP Platinum
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  {userEmail} • Member since 2024
                </p>

                {/* Social links pills */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <a
                    href="https://www.aliaskari.xyz/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full text-xs transition border border-zinc-800 hover:scale-105"
                  >
                    <Globe className="w-3 h-3" /> aliaskari.xyz
                  </a>
                  <a
                    href="https://github.com/AliAskariGithub"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full transition border border-zinc-800 hover:scale-105"
                    title="GitHub"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ali-askari-dev"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-zinc-900 hover:bg-[#0A66C2] text-zinc-300 hover:text-white rounded-full transition border border-zinc-800 hover:scale-105"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://x.com/Syed_Ali_Askari"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full transition border border-zinc-800 hover:scale-105"
                    title="X"
                  >
                    <FaTwitter className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61564881342854"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-zinc-900 hover:bg-[#1877F2] text-zinc-300 hover:text-white rounded-full transition border border-zinc-800 hover:scale-105"
                    title="Facebook"
                  >
                    <FaFacebook className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.instagram.com/syedaliaskarizaidi__/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-zinc-900 hover:bg-[#E4405F] text-zinc-300 hover:text-white rounded-full transition border border-zinc-800 hover:scale-105"
                    title="Instagram"
                  >
                    <FaInstagram className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 bg-white text-black font-bold text-xs sm:text-sm rounded-full hover:bg-zinc-200 transition flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-800 text-left">
            <div>
              <div className="text-xl sm:text-2xl font-black font-bold-1 text-white">
                14
              </div>
              <div className="text-xs text-zinc-400 font-medium">Orders Placed</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black font-bold-1 text-amber-300">
                2,450
              </div>
              <div className="text-xs text-zinc-400 font-medium">Rewards Points ($24.50)</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black font-bold-1 text-white">
                6
              </div>
              <div className="text-xs text-zinc-400 font-medium">Saved Items</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black font-bold-1 text-emerald-400 flex items-center gap-1">
                Active <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs text-zinc-400 font-medium">Prime Shipping</div>
            </div>
          </div>
        </div>

        {/* Account Tabs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Navigation Menu */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-4 sm:p-6 border border-zinc-200/80 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition ${
                activeTab === "orders"
                  ? "bg-black text-white shadow-md"
                  : "text-zinc-600 hover:text-black hover:bg-zinc-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5" />
                <span>My Orders</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === "orders" ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-600"}`}>
                {mockOrders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition ${
                activeTab === "addresses"
                  ? "bg-black text-white shadow-md"
                  : "text-zinc-600 hover:text-black hover:bg-zinc-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>Saved Addresses</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            <button
              onClick={() => setActiveTab("payments")}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition ${
                activeTab === "payments"
                  ? "bg-black text-white shadow-md"
                  : "text-zinc-600 hover:text-black hover:bg-zinc-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5" />
                <span>Payment Methods</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition ${
                activeTab === "settings"
                  ? "bg-black text-white shadow-md"
                  : "text-zinc-600 hover:text-black hover:bg-zinc-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                <span>Account Settings</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            <div className="border-t border-zinc-100 pt-3 mt-3">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 p-3.5 rounded-2xl font-bold text-sm text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Right: Active Tab Content */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-sm animate-section">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <h2 className="text-xl font-bold font-bold-1 text-black">
                    Order History
                  </h2>
                  <Link
                    href="/Product"
                    className="text-xs font-bold text-zinc-600 hover:text-black underline-hover"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-zinc-200 rounded-2xl p-5 hover:border-zinc-300 transition space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-black font-mono">{order.id}</span>
                          <span className="text-zinc-400">• {order.date}</span>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === "Delivered"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : order.status === "In Transit"
                              ? "bg-sky-50 text-sky-700 border border-sky-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {order.status === "Delivered" && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {order.status === "In Transit" && <Truck className="w-3.5 h-3.5" />}
                          {order.status === "Processing" && <Clock className="w-3.5 h-3.5" />}
                          {order.status}
                        </span>
                      </div>

                      {/* Items in order */}
                      <div className="divide-y divide-zinc-100 pt-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between py-2.5">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-zinc-900">{item.name}</div>
                                <div className="text-xs text-zinc-400">
                                  Size: {item.size} • Color: {item.color} • Qty: {item.qty}
                                </div>
                              </div>
                            </div>
                            <div className="text-sm font-bold text-black">${item.price}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 text-xs sm:text-sm">
                        <span className="font-bold text-zinc-700">Total: ${order.total}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => showToast("Tracking details sent", "Email sent with tracking link", "info")}
                            className="px-4 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full font-semibold text-xs transition"
                          >
                            Track Package
                          </button>
                          <Link
                            href="/Product"
                            className="px-4 py-1.5 bg-black hover:bg-zinc-800 text-white rounded-full font-semibold text-xs transition"
                          >
                            Buy Again
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <h2 className="text-xl font-bold font-bold-1 text-black">
                    Saved Addresses
                  </h2>
                  <button
                    onClick={() => showToast("Add Address", "Address form modal ready", "info")}
                    className="text-xs font-bold text-black hover:underline"
                  >
                    + Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-2 border-black rounded-2xl p-5 relative bg-zinc-50/50">
                    <span className="inline-block px-2.5 py-0.5 bg-black text-white text-[10px] font-bold rounded-full uppercase tracking-wider mb-2">
                      Default Delivery
                    </span>
                    <h3 className="font-bold text-black text-base">{userName}</h3>
                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                      124 Fashion Avenue, Suite 500<br />
                      New York, NY 10001<br />
                      United States<br />
                      Phone: {userPhone}
                    </p>
                    <div className="flex gap-3 mt-4 pt-3 border-t border-zinc-200 text-xs font-bold">
                      <button onClick={() => setIsEditing(true)} className="text-black hover:underline">Edit</button>
                    </div>
                  </div>

                  <div className="border border-zinc-200 rounded-2xl p-5 hover:border-zinc-300 transition">
                    <span className="inline-block px-2.5 py-0.5 bg-zinc-200 text-zinc-700 text-[10px] font-bold rounded-full uppercase tracking-wider mb-2">
                      Office / Work
                    </span>
                    <h3 className="font-bold text-black text-base">{userName}</h3>
                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                      789 Creative Studio Lane, Floor 3<br />
                      Brooklyn, NY 11201<br />
                      United States<br />
                      Phone: {userPhone}
                    </p>
                    <div className="flex gap-3 mt-4 pt-3 border-t border-zinc-200 text-xs font-bold">
                      <button onClick={() => showToast("Set as default", "Address updated", "success")} className="text-zinc-600 hover:text-black">Set as default</button>
                      <button onClick={() => setIsEditing(true)} className="text-black hover:underline">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payments" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <h2 className="text-xl font-bold font-bold-1 text-black">
                    Saved Payment Methods
                  </h2>
                  <button
                    onClick={() => showToast("Add Card", "Secure payment form ready", "info")}
                    className="text-xs font-bold text-black hover:underline"
                  >
                    + Add New Card
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-tr from-zinc-900 to-zinc-800 text-white rounded-2xl p-6 shadow-md relative">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-xs font-mono font-bold tracking-widest text-zinc-400">CREDIT CARD</span>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-lg font-mono tracking-widest mb-4">•••• •••• •••• 4242</div>
                    <div className="flex justify-between items-end text-xs">
                      <div>
                        <div className="text-[10px] text-zinc-400">CARD HOLDER</div>
                        <div className="font-bold">{userName}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-zinc-400">EXPIRES</div>
                        <div className="font-bold">12/28</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-tr from-zinc-800 to-zinc-700 text-white rounded-2xl p-6 shadow-md relative">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-xs font-mono font-bold tracking-widest text-zinc-400">DEBIT CARD</span>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-lg font-mono tracking-widest mb-4">•••• •••• •••• 8891</div>
                    <div className="flex justify-between items-end text-xs">
                      <div>
                        <div className="text-[10px] text-zinc-400">CARD HOLDER</div>
                        <div className="font-bold">{userName}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-zinc-400">EXPIRES</div>
                        <div className="font-bold">09/27</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-zinc-100">
                  <h2 className="text-xl font-bold font-bold-1 text-black">
                    Preferences &amp; Security
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Manage your account details, notifications, and security options.
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl">
                    <div>
                      <div className="font-bold text-black">Email Marketing &amp; VIP Offers</div>
                      <div className="text-xs text-zinc-500">Receive special coupons and product drop notices</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-black cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl">
                    <div>
                      <div className="font-bold text-black">SMS Delivery Updates</div>
                      <div className="text-xs text-zinc-500">Real-time text alerts when orders ship and arrive</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-black cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl">
                    <div>
                      <div className="font-bold text-black">Two-Factor Authentication (2FA)</div>
                      <div className="text-xs text-zinc-500">Add an extra layer of security to your profile</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">Enabled</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsEditing(false)}
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10 animate-in zoom-in-95">
            <h3 className="text-xl font-bold font-bold-1 text-black mb-1">
              Edit Account Profile
            </h3>
            <p className="text-xs text-zinc-500 mb-6">
              Update your personal details below
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="py-2.5 px-5 bg-zinc-100 text-zinc-700 font-bold text-xs rounded-full hover:bg-zinc-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-black text-white font-bold text-xs rounded-full hover:bg-zinc-800 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
