import type { Metadata } from "next";
import Link from "next/link";
import { translate } from "@/lib/i18n";
import { ToolCard } from "@/components/ToolCard";
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

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: translate(locale, "heroTitle"),
    description: translate(locale, "siteDescription"),
    openGraph: {
      title: translate(locale, "heroTitle"),
      description: translate(locale, "siteDescription"),
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = (key: string) => translate(locale, key);
  const prefix = locale === "en" ? "" : `/${locale}`;

  const features = [
    { icon: "⚡", title: t("step1Title"), desc: t("step1Desc") },
    { icon: "🎯", title: t("step2Title"), desc: t("step2Desc") },
    { icon: "🆓", title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <section className="py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          {t("heroTitle")}
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          {t("heroDesc")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`${prefix}/tools/instagram`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            📸 {t("instagramTitle")} →
          </Link>
          <Link
            href={`${prefix}/tools`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:border-gray-300 transition-colors text-lg"
          >
            {t("allTools")}
          </Link>
        </div>
      </section>

      <AdSlot slot="home-top" />

      <section className="py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {t("popularTools")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.href} locale={locale} {...tool} />
          ))}
        </div>
      </section>

      <AdSlot slot="home-bottom" />

      <section className="py-12 bg-white rounded-2xl border border-gray-100 my-8 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t("featuresTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((item) => (
              <div key={item.title} className="text-center p-4">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
