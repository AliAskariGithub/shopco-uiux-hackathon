import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://e-commerce-shopco.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/Cart", "/account"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
