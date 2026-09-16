import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Shopping Cart",
  description:
    "Review your selected apparel items, apply promotional discount codes, and proceed to secure checkout on SHOP.CO.",
  alternates: {
    canonical: "/Cart",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
