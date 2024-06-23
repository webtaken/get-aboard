import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL = "https://get-aboard.co";
  return [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/demo/`,
      lastModified: new Date(),
    },
  ];
}
