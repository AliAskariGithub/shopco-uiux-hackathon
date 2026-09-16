"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/components/Toast";

export interface CartItem {
  id: string; // generated from productId-size-color
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  deliveryFee: number;
  total: number;
  totalCount: number;
  promoCode: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "shopco_cart_v1";
const PROMO_STORAGE_KEY = "shopco_promo_v1";

const INITIAL_CART: CartItem[] = [
  {
    id: "10-Large-White",
    productId: "10",
    name: "Gradient Graphic T-shirt",
    image: "/images/shirt7.png",
    price: 145,
    size: "Large",
    color: "White",
    quantity: 1,
  },
  {
    id: "7-Medium-Red",
    productId: "7",
    name: "Checkered Shirt",
    image: "/images/shirt2.png",
    price: 180,
    size: "Medium",
    color: "Red",
    quantity: 1,
  },
  {
    id: "6-Large-Blue",
    productId: "6",
    name: "Skinny Fit Jeans",
    image: "/images/pent1.png",
    price: 240,
    size: "Large",
    color: "Blue",
    quantity: 1,
  },
];

const VALID_PROMOS: Record<string, number> = {
  SHOP20: 0.2, // 20% off
  WELCOME10: 0.1, // 10% off
  FASHION30: 0.3, // 30% off
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>("SHOP20"); // default demo promo 20%
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      const storedPromo = localStorage.getItem(PROMO_STORAGE_KEY);

      if (storedCart) {
        setItems(JSON.parse(storedCart));
      } else {
        // seed with default initial items so the user immediately sees a realistic cart
        setItems(INITIAL_CART);
      }

      if (storedPromo !== null) {
        setPromoCode(storedPromo || null);
      }
    } catch {
      setItems(INITIAL_CART);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      if (promoCode) {
        localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, [items, promoCode, isLoaded]);

  const addItem = (item: Omit<CartItem, "id">) => {
    const id = `${item.productId}-${item.size}-${item.color}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, id }];
    });
    showToast("Added to Cart", `${item.name} (${item.size}, ${item.color})`, "success");
  };

  const removeItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      showToast("Removed from Cart", `${item.name} was removed`, "info");
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.min(99, quantity) } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (VALID_PROMOS[upper]) {
      setPromoCode(upper);
      showToast(
        "Promo Code Applied",
        `Discount of ${(VALID_PROMOS[upper] * 100).toFixed(0)}% applied!`,
        "success"
      );
      return { success: true, message: "Promo applied successfully!" };
    }
    showToast("Invalid Promo Code", "Try using code SHOP20 for 20% off", "error");
    return { success: false, message: "Invalid promo code" };
  };

  const removePromoCode = () => {
    setPromoCode(null);
    showToast("Promo Code Removed", "Original pricing restored", "info");
  };

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountMultiplier = promoCode && VALID_PROMOS[promoCode] ? VALID_PROMOS[promoCode] : 0;
  const discountAmount = subtotal * discountMultiplier;
  const discountPercent = discountMultiplier * 100;
  const deliveryFee = items.length > 0 ? (subtotal > 250 ? 0 : 15) : 0;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        discountPercent,
        discountAmount,
        deliveryFee,
        total,
        totalCount,
        promoCode,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
