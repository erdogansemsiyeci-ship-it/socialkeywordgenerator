import type { Metadata } from "next";
import { translate } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogCard } from "@/components/BlogCard";
import { AdSlot } from "@/components/AdSlot";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n";

async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); }, setAll(cookiesToSet) { try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {} } } }
  );
}

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Blog - Social Media & SEO Tips" : "Blog - Sosyal Medya & SEO İpuçları",
    description: translate(locale, "blogDesc"),
    openGraph: {
      title: locale === "en" ? "Blog - Social Media & SEO Tips" : "Blog - Sosyal Medya & SEO İpuçları",
      description: translate(locale, "blogDesc"),
      url: locale === "en" ? "https://socialkeywordgenerator.com/blog" : "https://socialkeywordgenerator.com/tr/blog",
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
    alternates: {
      languages: { en: "https://socialkeywordgenerator.com/blog", tr: "https://socialkeywordgenerator.com/tr/blog" },
    },
  };
}

async function getPosts(locale: Locale) {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, title, description, published_at, read_time, locale")
      .eq("locale", locale === "tr" ? "tr" : "en")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(20);
    return data || [];
  } catch {
    return [];
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = (key: string) => translate(locale, key);
  const posts = await getPosts(locale);

  return (
    <div className="container mx-auto px-4 max-w-6xl py-8">
      <Breadcrumbs items={[
        { label: t("breadcrumbHome"), href: locale === "en" ? "/en" : "/tr" },
        { label: t("blog"), href: locale === "en" ? "/en/blog" : "/tr/blog" },
      ]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("blogTitle")}</h1>
      <p className="text-gray-500 mb-8">{t("blogDesc")}</p>

      <AdSlot slot="blog-top" />

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post: any) => (
            <BlogCard
              key={post.slug}
              locale={locale}
              slug={post.slug}
              title={post.title}
              description={post.description}
              publishedAt={post.published_at}
              readTime={post.read_time || "5 min read"}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100 mb-12">
          <p className="text-gray-400 text-lg">
            {locale === "en"
              ? "Blog posts coming soon! We're working on expert articles about keyword strategy and SEO."
              : "Blog yazıları çok yakında! Anahtar kelime stratejisi ve SEO hakkında uzman makaleler üzerinde çalışıyoruz."}
          </p>
        </div>
      )}

      <AdSlot slot="blog-bottom" />
    </div>
  );
}
