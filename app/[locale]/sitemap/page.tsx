import type { Metadata } from "next";
import Link from "next/link";
import { translate, type Locale } from "@/lib/i18n";

const tools = [
  { href: "/tools/instagram", titleKey: "instagramTitle", icon: "📸" },
  { href: "/tools/tiktok", titleKey: "tiktokTitle", icon: "🎵" },
  { href: "/tools/youtube", titleKey: "youtubeTitle", icon: "▶️" },
  { href: "/tools/yt-tags", titleKey: "ytTagsTitle", icon: "🏷️" },
  { href: "/tools/seo", titleKey: "seoTitle", icon: "🔍" },
  { href: "/tools/free-tool", titleKey: "freeToolTitle", icon: "#️⃣" },
];

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = (key: string) => translate(locale, key);
  return {
    title: t("sitemap"),
    description: `${t("sitemap")} - Social Keyword Generator`,
    robots: { index: true, follow: true },
    openGraph: {
      title: t("sitemap"),
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
  };
}

export default async function SitemapPage({ params }: Props) {
  const { locale } = await params;
  const t = (key: string) => translate(locale, key);
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="container mx-auto px-4 max-w-4xl py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t("sitemap")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t("tools")}
          </h2>
          <ul className="space-y-2">
            {tools.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={`${prefix}${tool.href}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {tool.icon} {t(tool.titleKey)}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pages</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href={prefix || "/"}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {t("breadcrumbHome")}
              </Link>
            </li>
            <li>
              <Link
                href={`${prefix}/blog`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {t("blog")}
              </Link>
            </li>
            <li>
              <Link
                href={`${prefix}/about`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {t("about")}
              </Link>
            </li>
            <li>
              <Link
                href={`${prefix}/faq`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href={`${prefix}/contact`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {t("contact")}
              </Link>
            </li>
            <li>
              <Link
                href={`${prefix}/privacy`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link
                href={`${prefix}/terms`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {t("terms")}
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
