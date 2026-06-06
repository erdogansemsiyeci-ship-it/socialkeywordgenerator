import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { translate } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { generateBlogPostingSchema, generateBreadcrumbSchema } from "@/lib/seo-schema";
import type { Locale } from "@/lib/i18n";
import { marked } from "marked";

async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); }, setAll(cookiesToSet) { try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {} } } }
  );
}

interface Props {
  params: Promise<{ locale: Locale; slug: string }>;
}

async function getPost(slug: string, locale: Locale) {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("locale", locale === "tr" ? "tr" : "en")
      .eq("published", true)
      .single();
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale);
  if (!post) return { title: "Post Not Found" };

  const postUrl = `https://socialkeywordgenerator.com/${locale === "en" ? "" : "tr/"}blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: postUrl,
      languages: {
        en: `https://socialkeywordgenerator.com/blog/${slug}`,
        tr: `https://socialkeywordgenerator.com/tr/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.published_at,
      url: postUrl,
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = (key: string) => translate(locale, key);
  const post = await getPost(slug, locale);

  if (!post) notFound();

  const schema = generateBlogPostingSchema({
    title: post.title,
    description: post.description,
    slug: post.slug,
    publishedAt: post.published_at,
    updatedAt: post.updated_at || post.published_at,
    authorName: post.author_name || "Social Keyword Generator",
    imageUrl: post.image_url,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t("breadcrumbHome"), url: `https://socialkeywordgenerator.com/${locale === "en" ? "" : "tr/"}` },
    { name: t("blog"), url: `https://socialkeywordgenerator.com/${locale === "en" ? "" : "tr/"}blog` },
    { name: post.title, url: `https://socialkeywordgenerator.com/${locale === "en" ? "" : "tr/"}blog/${slug}` },
  ]);

  return (
    <div className="container mx-auto px-4 max-w-4xl py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs items={[
        { label: t("breadcrumbHome"), href: locale === "en" ? "/en" : "/tr" },
        { label: t("blog"), href: locale === "en" ? "/en/blog" : "/tr/blog" },
        { label: post.title, href: `/${locale}/blog/${slug}` },
      ]} />

      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.read_time || "5 min read"}</span>
            <span>·</span>
            <span>{locale === "en" ? "by" : "yazar"}: {post.author_name || "SKG Team"}</span>
          </div>
        </header>

        <AdSlot slot="blog-content-top" />

        <div
          className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-strong:text-gray-900 prose-blockquote:border-l-blue-500"
          dangerouslySetInnerHTML={{ __html: marked.parse(post.content || post.description || "") }}
        />

        <AdSlot slot="blog-content-bottom" />
      </article>
    </div>
  );
}
