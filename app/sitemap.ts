import type { MetadataRoute } from "next";

const BASE_URL = "https://socialkeywordgenerator.com";
const locales = ["en","zh","de","ja","hi","fr","pt","it","ru","ko","es","id","nl","tr","ar","pl","sv","uk","ro","cs","el","hu","da","fi","nb","bg","hr","sk","lt","sl","sr","lv","et"];
const tools = ["instagram","tiktok","youtube","yt-tags","seo","free-tool"];
const staticPages = ["about","contact","privacy","terms","faq","sitemap"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    });

    entries.push({
      url: `${BASE_URL}/${locale}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    });

    for (const tool of tools) {
      entries.push({
        url: `${BASE_URL}/${locale}/tools/${tool}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      });
    }

    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      });
    }

    entries.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    });
  }

  return entries;
}
