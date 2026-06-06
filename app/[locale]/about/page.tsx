import type { Metadata } from "next";
import { translate } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Locale } from "@/lib/i18n";

interface Props { params: Promise<{ locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: translate(locale, "aboutTitle"),
    description: translate(locale, "aboutDesc"),
    openGraph: {
      title: translate(locale, "aboutTitle"),
      description: translate(locale, "aboutDesc"),
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = (key: string) => translate(locale, key);

  return (
    <div className="container mx-auto px-4 max-w-3xl py-8">
      <Breadcrumbs items={[
        { label: t("breadcrumbHome"), href: locale === "en" ? "/en" : `/${locale}` },
        { label: t("about"), href: `/${locale}/about` },
      ]} />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("aboutTitle")}</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-600 mb-4">{t("aboutContent")}</p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{t("aboutMission")}</h2>
        <p className="text-gray-600 mb-4">
          {t("aboutMission")}
        </p>
      </div>
    </div>
  );
}
