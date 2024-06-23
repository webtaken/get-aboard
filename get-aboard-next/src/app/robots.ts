import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseURL = "https://get-aboard.co";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/demo/"],
      disallow: ["/dashboard/"],
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
