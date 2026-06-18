import type { MetadataRoute } from "next";

const BASE_URL = "https://socialkeywordgenerator.com";
const locales = ["en","zh","de","ja","hi","fr","pt","it","ru","ko","es","id","nl","tr","ar","pl","sv","uk","ro","cs","el","hu","da","fi","nb","bg","hr","sk","lt","sl","sr","lv","et"];
const blogLocales = ["en", "tr"]; // Only locales with actual blog content
const tools = ["instagram","tiktok","youtube","yt-tags","seo","free-tool"];
const staticPages = ["about","contact","privacy","terms","faq","sitemap"];

interface BlogPost {
  slug: string;
  locale?: string;
  updated_at: string | null;
  published_at: string;
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, published_at, locale")
      .eq("published", true)
      .in("locale", ["en", "tr"])
      .order("published_at", { ascending: false })
      .limit(200);
    return data || [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Tool and static pages — all locales
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
        priority: locale === "en" ? 0.9 : 0.7, // English gets higher priority (has guides)
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
  }

  // Blog listings — only locales with actual content
  for (const locale of blogLocales) {
    entries.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });
  }

  // Blog posts — canonical URLs + locale variants that exist
  const posts = await fetchBlogPosts();
  for (const post of posts) {
    const lastMod = post.updated_at ? new Date(post.updated_at) : new Date(post.published_at);
    const postLocale = post.locale || "en";

    // Canonical URL (no locale prefix for en, /tr/ prefix for tr)
    const canonicalPath = postLocale === "en"
      ? `${BASE_URL}/blog/${post.slug}`
      : `${BASE_URL}/${postLocale}/blog/${post.slug}`;

    entries.push({
      url: canonicalPath,
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    });

    // Add the other locale variant if it exists (en has tr, tr has en)
    const otherLocale = postLocale === "en" ? "tr" : "en";
    entries.push({
      url: `${BASE_URL}/${otherLocale}/blog/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  return entries;
}
