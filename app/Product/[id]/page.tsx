import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductById } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return products.flatMap((product) => [
    { id: product.id },
    { id: `Product${product.id}` },
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductById(params.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found in our catalog.",
    };
  }

  const title = `${product.name} — ${product.style} Style`;
  const description = `${product.description} Material: ${product.details.material}. Fit: ${product.details.fit}. Available at SHOP.CO for $${product.price}. Fast shipping & 30-day returns.`;
  const canonicalUrl = `https://e-commerce-shopco.vercel.app/Product/Product${product.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | SHOP.CO`,
      description,
      url: canonicalUrl,
      siteName: "SHOP.CO",
      type: "website",
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: `${product.name} - SHOP.CO`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | SHOP.CO`,
      description,
      images: [product.image],
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://e-commerce-shopco.vercel.app${product.image}`,
    description: product.description,
    sku: `SHOPCO-${product.id}`,
    mpn: `SKU-${product.id}`,
    brand: {
      "@type": "Brand",
      name: "SHOP.CO",
    },
    offers: {
      "@type": "Offer",
      url: `https://e-commerce-shopco.vercel.app/Product/Product${product.id}`,
      priceCurrency: "USD",
      price: product.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "SHOP.CO",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount || product.reviews.length || 1,
      bestRating: "5",
      worstRating: "1",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://e-commerce-shopco.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: "https://e-commerce-shopco.vercel.app/Product",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.style,
        item: `https://e-commerce-shopco.vercel.app/Product?style=${product.style}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `https://e-commerce-shopco.vercel.app/Product/Product${product.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
