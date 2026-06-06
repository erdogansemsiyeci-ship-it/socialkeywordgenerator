import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Social Keyword Generator - Free Social Media Keyword & Hashtag Tools",
    template: "%s | Social Keyword Generator",
  },
  description:
    "Free AI-powered social media keyword and hashtag generator for Instagram, TikTok, YouTube, and SEO. Boost your social media reach with smart keyword suggestions.",
  metadataBase: new URL("https://socialkeywordgenerator.com"),
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Social Keyword Generator",
    title: "Social Keyword Generator - Free Social Media Keyword & Hashtag Tools",
    description:
      "Free AI-powered social media keyword and hashtag generator for Instagram, TikTok, YouTube, and SEO.",
    url: "https://socialkeywordgenerator.com",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Social Keyword Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Keyword Generator",
    description: "Free AI-powered social media keyword and hashtag generator.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://socialkeywordgenerator.com",
    languages: {
      en: "https://socialkeywordgenerator.com/en",
      zh: "https://socialkeywordgenerator.com/zh",
      de: "https://socialkeywordgenerator.com/de",
      ja: "https://socialkeywordgenerator.com/ja",
      hi: "https://socialkeywordgenerator.com/hi",
      fr: "https://socialkeywordgenerator.com/fr",
      pt: "https://socialkeywordgenerator.com/pt",
      it: "https://socialkeywordgenerator.com/it",
      ru: "https://socialkeywordgenerator.com/ru",
      ko: "https://socialkeywordgenerator.com/ko",
      es: "https://socialkeywordgenerator.com/es",
      id: "https://socialkeywordgenerator.com/id",
      nl: "https://socialkeywordgenerator.com/nl",
      tr: "https://socialkeywordgenerator.com/tr",
      ar: "https://socialkeywordgenerator.com/ar",
      pl: "https://socialkeywordgenerator.com/pl",
      sv: "https://socialkeywordgenerator.com/sv",
      uk: "https://socialkeywordgenerator.com/uk",
      ro: "https://socialkeywordgenerator.com/ro",
      cs: "https://socialkeywordgenerator.com/cs",
      el: "https://socialkeywordgenerator.com/el",
      hu: "https://socialkeywordgenerator.com/hu",
      da: "https://socialkeywordgenerator.com/da",
      fi: "https://socialkeywordgenerator.com/fi",
      nb: "https://socialkeywordgenerator.com/nb",
      bg: "https://socialkeywordgenerator.com/bg",
      hr: "https://socialkeywordgenerator.com/hr",
      sk: "https://socialkeywordgenerator.com/sk",
      lt: "https://socialkeywordgenerator.com/lt",
      sl: "https://socialkeywordgenerator.com/sl",
      sr: "https://socialkeywordgenerator.com/sr",
      lv: "https://socialkeywordgenerator.com/lv",
      et: "https://socialkeywordgenerator.com/et",
      "x-default": "https://socialkeywordgenerator.com/en",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Social Keyword Generator",
              url: "https://socialkeywordgenerator.com",
              description: "Free AI-powered social media keyword and hashtag generator tools.",
              logo: "https://socialkeywordgenerator.com/og-image.svg",
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Social Keyword Generator",
              url: "https://socialkeywordgenerator.com",
              description:
                "Free AI-powered social media keyword and hashtag generator tools.",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://socialkeywordgenerator.com/en/tools/seo?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
