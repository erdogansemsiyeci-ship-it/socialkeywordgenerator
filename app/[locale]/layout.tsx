import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { translate } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { locales, defaultLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const pathPrefix = validLocale === "en" ? "" : `/${validLocale}`;
  const t = (key: string) => translate(validLocale, key);

  return {
    metadataBase: new URL("https://socialkeywordgenerator.com"),
    alternates: {
      canonical: `https://socialkeywordgenerator.com/${validLocale}`,
      languages: Object.fromEntries(
        locales.map((l) => [
          l,
          `https://socialkeywordgenerator.com/${l}`,
        ])
      ),
    },
    openGraph: {
      title: t("heroTitle"),
      description: t("siteDescription"),
      url: `https://socialkeywordgenerator.com/${validLocale}`,
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("heroTitle"),
      description: t("siteDescription"),
      images: ["/og-image.svg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;

  return (
    <>
      <Navbar locale={validLocale} />
      <main className="min-h-[calc(100vh-200px)]">{children}</main>
      <Footer locale={validLocale} />
    </>
  );
}
