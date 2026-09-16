import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Apparel Catalog | 40+ Styles — Casual, Formal, Party & Gym",
  description:
    "Explore SHOP.CO's complete 40-product clothing collection. Filter by Casual, Formal, Party, and Gym dress styles, category, size, color, and price.",
  alternates: {
    canonical: "/Product",
  },
  openGraph: {
    title: "Shop Apparel Catalog | SHOP.CO",
    description:
      "Explore SHOP.CO's complete 40-product clothing collection across Casual, Formal, Party, and Gym dress styles.",
    url: "https://e-commerce-shopco.vercel.app/Product",
    siteName: "SHOP.CO",
    images: [
      {
        url: "/hero-preview.png",
        width: 1200,
        height: 630,
        alt: "SHOP.CO Fashion Catalog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Apparel Catalog | SHOP.CO",
    description:
      "Explore SHOP.CO's complete 40-product clothing collection across Casual, Formal, Party, and Gym dress styles.",
    images: ["/hero-preview.png"],
  },
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
