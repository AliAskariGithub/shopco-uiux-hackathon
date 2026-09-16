import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/Toast";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://e-commerce-shopco.vercel.app"),
  title: {
    default: "SHOP.CO | Find Clothes That Match Your Style — Modern Fashion & Apparel",
    template: "%s | SHOP.CO",
  },
  description:
    "Explore SHOP.CO's curated collection of 40+ high-quality apparel items across Casual, Formal, Party, and Gym styles. Modern e-commerce platform developed by Syed Ali Askari with Next.js 14, React 18, and Tailwind CSS.",
  applicationName: "SHOP.CO",
  keywords: [
    "SHOP.CO",
    "modern e-commerce UI",
    "fashion e-commerce",
    "UI/UX development",
    "React Next.js e-commerce",
    "frontend development",
    "streetwear clothing",
    "casual fashion",
    "formal suits and shirts",
    "party wear outfits",
    "gym athletic activewear",
    "online clothing store",
    "Syed Ali Askari",
  ],
  authors: [{ name: "Syed Ali Askari", url: "https://www.aliaskari.xyz/" }],
  creator: "Syed Ali Askari",
  publisher: "Syed Ali Askari",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "r2WPUKMX4DZtyfc_JaPMa1b8Skk5M1OdUwGDWxDZ1to",
  },
  openGraph: {
    title: "SHOP.CO | Find Clothes That Match Your Style",
    description:
      "Explore 40+ curated products across Casual, Formal, Party, and Gym styles. Features live search, persistent cart, faceted filters, and an interactive account dashboard.",
    url: "https://e-commerce-shopco.vercel.app",
    siteName: "SHOP.CO",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero-preview.png",
        width: 1200,
        height: 630,
        alt: "SHOP.CO Modern E-Commerce Platform by Syed Ali Askari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHOP.CO | Find Clothes That Match Your Style",
    description:
      "Modern fashion e-commerce platform built with Next.js 14, React, and Tailwind CSS by Syed Ali Askari.",
    site: "@Syed_Ali_Askari",
    creator: "@Syed_Ali_Askari",
    images: ["/hero-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: "SHOP.CO",
    url: "https://e-commerce-shopco.vercel.app",
    logo: "https://e-commerce-shopco.vercel.app/hero-preview.png",
    description:
      "Contemporary fashion and lifestyle e-commerce web platform featuring 40+ apparel items across Casual, Formal, Party, and Gym dress styles.",
    founder: {
      "@type": "Person",
      name: "Syed Ali Askari",
      url: "https://www.aliaskari.xyz/",
      jobTitle: "Lead Full-Stack / Frontend UI/UX Developer",
      sameAs: [
        "https://www.aliaskari.xyz/",
        "https://www.linkedin.com/in/ali-askari-dev",
        "https://github.com/AliAskariGithub",
        "https://x.com/Syed_Ali_Askari",
        "https://www.facebook.com/profile.php?id=61564881342854",
        "https://www.instagram.com/syedaliaskarizaidi__/",
      ],
    },
    sameAs: [
      "https://github.com/AliAskariGithub/shopco-uiux-hackathon",
      "https://www.aliaskari.xyz/",
      "https://www.linkedin.com/in/ali-askari-dev",
      "https://x.com/Syed_Ali_Askari",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SHOP.CO",
    url: "https://e-commerce-shopco.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://e-commerce-shopco.vercel.app/Product?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`${jakarta.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background font-sans text-foreground antialiased selection:bg-black selection:text-white">
        <ToastProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
