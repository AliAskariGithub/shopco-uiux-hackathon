"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  Tag,
  ShoppingBag,
  CheckCircle,
  X,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";

const CartPage = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    discountPercent,
    discountAmount,
    deliveryFee,
    total,
    promoCode,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const { showToast } = useToast();
  const [promoInput, setPromoInput] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Checkout form state
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [checkoutCity, setCheckoutCity] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoInput("");
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `SHOPCO-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setIsOrderPlaced(true);
    clearCart();
    showToast("Order Placed Successfully!", `Order ${generatedOrderNum}`, "success");
  };

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
                <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-bold-1 text-black uppercase tracking-tight mb-8">
          Your Cart
        </h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/80 p-4 sm:p-6 shadow-sm divide-y divide-zinc-100">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4 sm:py-6 first:pt-0 last:pb-0"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/Product/Product${item.productId}`}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#F0EEED] rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2 hover:opacity-90 transition"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/Product/Product${item.productId}`}
                        className="font-bold text-sm sm:text-base text-black hover:text-zinc-600 transition truncate block"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-400 hover:text-red-500 p-1 rounded transition flex-shrink-0"
                        title="Remove item"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                      </button>
                    </div>

                    <div className="text-xs text-zinc-500 space-y-0.5 mt-1">
                      <div>
                        Size: <span className="text-black font-medium">{item.size}</span>
                      </div>
                      <div>
                        Color: <span className="text-black font-medium capitalize">{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2">
                      <span className="text-base sm:text-lg font-black text-black">
                        ${item.price}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-[#F0F0F0] rounded-full px-3 py-1 border border-zinc-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-zinc-600 hover:text-black transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs sm:text-sm font-bold text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-zinc-600 hover:text-black transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-sm space-y-6 sticky top-24">
              <h2 className="text-xl sm:text-2xl font-bold font-bold-1 text-black">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-zinc-500">
                    <span>Discount ({discountPercent.toFixed(0)}%)</span>
                    <span className="font-bold text-red-500">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-500">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-black">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                {subtotal < 250 && (
                  <p className="text-xs text-zinc-400">
                    Add ${(250 - subtotal).toFixed(2)} more for free delivery!
                  </p>
                )}

                <div className="border-t border-zinc-200 pt-4 flex justify-between text-base sm:text-lg">
                  <span className="font-bold text-black">Total</span>
                  <span className="font-black text-black">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code Form */}
              <div className="space-y-2 pt-2">
                {promoCode ? (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-800">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>Code &ldquo;{promoCode}&rdquo; applied ({discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-zinc-500 hover:text-black p-1"
                      aria-label="Remove promo code"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Add promo code (SHOP20)"
                        className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-[#F0F0F0] border border-transparent rounded-full focus:bg-white focus:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black/10 transition"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-black text-white text-xs sm:text-sm font-bold rounded-full hover:bg-zinc-800 transition flex-shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="btn-animated w-full py-4 bg-black text-white font-bold text-sm sm:text-base rounded-full hover:bg-zinc-800 active:scale-98 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>Go to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Secure SSL encrypted 256-bit checkout</span>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="py-20 text-center bg-white rounded-3xl border border-zinc-200/80 p-8 max-w-2xl mx-auto shadow-sm">
            <div className="w-20 h-20 bg-[#F0EEED] rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-400">
              <ShoppingBag className="w-10 h-10 text-zinc-600" />
            </div>
            <h2 className="text-2xl font-bold font-bold-1 text-black mb-2">
              Your cart is currently empty
            </h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto mb-8">
              Looks like you haven&apos;t added any clothes to your bag yet. Explore our latest arrivals and on-sale streetwear.
            </p>
            <Link
              href="/Product"
              className="btn-animated inline-flex items-center justify-center px-8 py-4 bg-black text-white font-bold text-sm rounded-full hover:bg-zinc-800 transition shadow-lg cursor-pointer"
            >
              Explore Products
            </Link>
          </div>
        )}
      </div>

      {/* Checkout Modal Dialog */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              if (!isOrderPlaced) setIsCheckoutOpen(false);
            }}
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            {isOrderPlaced ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black font-bold-1 text-black">
                  Order Confirmed!
                </h3>
                <p className="text-sm text-zinc-600">
                  Thank you for shopping with SHOP.CO. We&apos;ve sent an order confirmation email to{" "}
                  <span className="font-bold text-black">{checkoutEmail || "your email"}</span>.
                </p>
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-xs font-mono font-bold text-zinc-800">
                  Order ID: {orderNumber}
                </div>
                <div className="pt-4">
                  <Link
                    href="/Product"
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsOrderPlaced(false);
                    }}
                    className="inline-block w-full py-3.5 bg-black text-white font-bold text-sm rounded-full hover:bg-zinc-800 transition"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
                  <div>
                    <h3 className="text-xl font-bold font-bold-1 text-black">
                      Checkout
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Order total: ${total.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="text-zinc-400 hover:text-black p-1"
                    aria-label="Close checkout"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={checkoutEmail}
                      onChange={(e) => setCheckoutEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                      Shipping Address
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                      placeholder="123 Fashion Blvd, Apt 4B"
                      className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutCity}
                        onChange={(e) => setCheckoutCity(e.target.value)}
                        placeholder="New York"
                        className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                        Payment Method
                      </label>
                      <div className="px-3 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl text-xs font-semibold flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-black" />
                        <span>Demo Card (4242)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-50 rounded-2xl text-xs text-zinc-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Items count:</span>
                      <span className="font-bold text-black">{items.length} items</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Grand Total:</span>
                      <span className="font-bold text-black">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-animated w-full py-4 bg-black text-white font-bold text-sm rounded-full hover:bg-zinc-800 transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Place Order (${total.toFixed(2)})</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
