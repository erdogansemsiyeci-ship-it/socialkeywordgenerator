import type { Metadata } from "next";
import { translate } from "@/lib/i18n";
import { ToolCard } from "@/components/ToolCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import type { Locale } from "@/lib/i18n";

const tools = [
  { href: "/tools/instagram", icon: "📸", titleKey: "instagramTitle", descKey: "instagramDesc" },
  { href: "/tools/tiktok", icon: "🎵", titleKey: "tiktokTitle", descKey: "tiktokDesc" },
  { href: "/tools/youtube", icon: "▶️", titleKey: "youtubeTitle", descKey: "youtubeDesc" },
  { href: "/tools/yt-tags", icon: "🏷️", titleKey: "ytTagsTitle", descKey: "ytTagsDesc" },
  { href: "/tools/seo", icon: "🔍", titleKey: "seoTitle", descKey: "seoDesc" },
  { href: "/tools/free-tool", icon: "#️⃣", titleKey: "freeToolTitle", descKey: "freeToolDesc" },
];

interface Props { params: Promise<{ locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = (key: string) => translate(locale, key);
  return {
    title: t("allTools"),
    description: t("siteDescription"),
    openGraph: {
      title: t("allTools"),
      description: t("siteDescription"),
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
  };
}

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params;
  const t = (key: string) => translate(locale, key);

  return (
    <div className="container mx-auto px-4 max-w-6xl py-8">
      <Breadcrumbs items={[
        { label: t("breadcrumbHome"), href: locale === "en" ? "/en" : `/${locale}` },
        { label: t("tools"), href: locale === "en" ? "/en/tools" : `/${locale}/tools` },
      ]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("allTools")}</h1>
      <p className="text-gray-500 mb-8">{t("siteDescription")}</p>

      <AdSlot slot="tools-top" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {tools.map((tool) => (
          <ToolCard key={tool.href} locale={locale} {...tool} />
        ))}
      </div>

      <AdSlot slot="tools-bottom" />
    </div>
  );
}
