import type { Metadata } from "next";
import { translate } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { KeywordTool } from "@/components/KeywordTool";
import { locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const BASE_URL = "https://socialkeywordgenerator.com";

interface ToolTips {
  tipsTitle: string;
  tips: string[];
  howTitle: string;
  how: string[];
}

const toolConfig: Record<string, { titleKey: string; descKey: string; icon: string; tips: ToolTips }> = {
  instagram: {
    titleKey: "instagramTitle",
    descKey: "instagramDesc",
    icon: "📸",
    tips: {
      tipsTitle: "instagramTipsTitle",
      tips: ["instagramTip1", "instagramTip2", "instagramTip3", "instagramTip4", "instagramTip5"],
      howTitle: "instagramHowTitle",
      how: ["instagramHow1", "instagramHow2", "instagramHow3"],
    },
  },
  tiktok: {
    titleKey: "tiktokTitle",
    descKey: "tiktokDesc",
    icon: "🎵",
    tips: {
      tipsTitle: "tiktokTipsTitle",
      tips: ["tiktokTip1", "tiktokTip2", "tiktokTip3", "tiktokTip4"],
      howTitle: "tiktokHowTitle",
      how: ["tiktokHow1", "tiktokHow2", "tiktokHow3"],
    },
  },
  youtube: {
    titleKey: "youtubeTitle",
    descKey: "youtubeDesc",
    icon: "▶️",
    tips: {
      tipsTitle: "youtubeTipsTitle",
      tips: ["youtubeTip1", "youtubeTip2", "youtubeTip3", "youtubeTip4"],
      howTitle: "youtubeHowTitle",
      how: ["youtubeHow1", "youtubeHow2", "youtubeHow3"],
    },
  },
  "yt-tags": {
    titleKey: "ytTagsTitle",
    descKey: "ytTagsDesc",
    icon: "🏷️",
    tips: {
      tipsTitle: "ytTagsTipsTitle",
      tips: ["ytTagsTip1", "ytTagsTip2", "ytTagsTip3", "ytTagsTip4"],
      howTitle: "ytTagsHowTitle",
      how: ["ytTagsHow1", "ytTagsHow2", "ytTagsHow3"],
    },
  },
  seo: {
    titleKey: "seoTitle",
    descKey: "seoDesc",
    icon: "🔍",
    tips: {
      tipsTitle: "seoTipsTitle",
      tips: ["seoTip1", "seoTip2", "seoTip3", "seoTip4", "seoTip5"],
      howTitle: "seoHowTitle",
      how: ["seoHow1", "seoHow2", "seoHow3"],
    },
  },
  "free-tool": {
    titleKey: "freeToolTitle",
    descKey: "freeToolDesc",
    icon: "#️⃣",
    tips: {
      tipsTitle: "freeToolTipsTitle",
      tips: ["freeToolTip1", "freeToolTip2", "freeToolTip3", "freeToolTip4"],
      howTitle: "freeToolHowTitle",
      how: ["freeToolHow1", "freeToolHow2", "freeToolHow3"],
    },
  },
};

interface Props { params: Promise<{ locale: Locale; tool: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tool } = await params;
  const config = toolConfig[tool];
  if (!config) return { title: "Tool Not Found" };
  const t = (key: string) => translate(locale, key);
  const canonicalPath = `/${locale}/tools/${tool}`;
  return {
    title: t(config.titleKey),
    description: t(config.descKey),
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}/tools/${tool}`])
      ),
    },
    openGraph: {
      title: t(config.titleKey),
      description: t(config.descKey),
      url: `${BASE_URL}${canonicalPath}`,
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t(config.titleKey),
      description: t(config.descKey),
      images: ["/og-image.svg"],
    },
  };
}

export async function generateStaticParams() {
  const tools = Object.keys(toolConfig);
  const params: { locale: string; tool: string }[] = [];
  for (const locale of locales) {
    for (const tool of tools) {
      params.push({ locale, tool });
    }
  }
  return params;
}

const exampleMap: Record<Locale, string[]> = {
  en: ["fitness motivation", "travel photography", "food recipe", "digital marketing", "tech review"],
  zh: ["健身动力", "旅行摄影", "美食食谱", "数字营销", "科技评测"],
  de: ["Fitness Motivation", "Reisefotografie", "Essensrezepte", "Digitales Marketing", "Tech Bewertung"],
  ja: ["フィットネス", "旅行写真", "料理レシピ", "デジタルマーケティング", "テックレビュー"],
  hi: ["फिटनेस मोटिवेशन", "यात्रा फोटोग्राफी", "खाना रेसिपी", "डिजिटल मार्केटिंग", "टेक रिव्यू"],
  fr: ["motivation fitness", "photographie voyage", "recette cuisine", "marketing digital", "test tech"],
  pt: ["motivação fitness", "fotografia viagem", "receita culinária", "marketing digital", "review tech"],
  it: ["motivazione fitness", "fotografia viaggio", "ricetta cucina", "marketing digitale", "recensione tech"],
  ru: ["фитнес мотивация", "фотография путешествий", "рецепт блюда", "цифровой маркетинг", "обзор техники"],
  ko: ["피트니스 동기부여", "여행 사진", "요리 레시피", "디지털 마케팅", "테크 리뷰"],
  es: ["motivación fitness", "fotografía viajes", "receta cocina", "marketing digital", "reseña tech"],
  id: ["motivasi fitness", "fotografi perjalanan", "resep masakan", "pemasaran digital", "ulasan tech"],
  nl: ["fitness motivatie", "reisfotografie", "kookrecept", "digitale marketing", "tech review"],
  tr: ["spor motivasyon", "seyahat fotoğrafçılığı", "yemek tarifi", "dijital pazarlama", "teknoloji inceleme"],
  ar: ["تحفيز اللياقة", "تصوير السفر", "وصفة طعام", "التسويق الرقمي", "مراجعة تقنية"],
  pl: ["motywacja fitness", "fotografia podróżnicza", "przepis kulinarny", "marketing cyfrowy", "recenzja tech"],
  sv: ["träningsmotivation", "resefotografi", "matrecept", "digital marknadsföring", "tech recension"],
  uk: ["фітнес мотивація", "фотографія подорожей", "рецепт страви", "цифровий маркетинг", "огляд техніки"],
  ro: ["motivație fitness", "fotografie călătorie", "rețetă culinară", "marketing digital", "review tech"],
  cs: ["fitness motivace", "cestovní fotografie", "recept na vaření", "digitální marketing", "tech recenze"],
  el: ["κίνητρο γυμναστικής", "ταξιδιωτική φωτογραφία", "συνταγή φαγητού", "ψηφιακό μάρκετινγκ", "αξιολόγηση τεχνολογίας"],
  hu: ["fitness motiváció", "utazási fotózás", "főzési recept", "digitális marketing", "tech értékelés"],
  da: ["træningsmotivation", "rejsefotografering", "madopskrift", "digital markedsføring", "tech anmeldelse"],
  fi: ["kuntomotivaatio", "matkavalokuvaus", "ruokaresepti", "digitaalinen markkinointi", "tekninen arvostelu"],
  nb: ["treningsmotivasjon", "reisefotografering", "matoppskrift", "digital markedsføring", "tech anmeldelse"],
  bg: ["фитнес мотивация", "пътуваща фотография", "рецепта за готвене", "дигитален маркетинг", "технологичен преглед"],
  hr: ["fitness motivacija", "putnička fotografija", "recept za kuhanje", "digitalni marketing", "tech recenzija"],
  sk: ["fitness motivácia", "cestovná fotografia", "recept na varenie", "digitálny marketing", "tech recenzia"],
  lt: ["fitneso motyvacija", "kelionių fotografija", "maisto receptas", "skaitmeninė rinkodara", "techninė apžvalga"],
  sl: ["fitnes motivacija", "potovalna fotografija", "kuharski recept", "digitalno trženje", "tehnični pregled"],
  sr: ["фитнес мотивација", "путничка фотографија", "рецепт за кување", "дигитални маркетинг", "технички преглед"],
  lv: ["fitnesa motivācija", "ceļojumu fotogrāfija", "ēdiena recepte", "digitālais mārketings", "tehnoloģiju apskats"],
  et: ["treeningmotivatsioon", "reisifotograafia", "toiduretsept", "digitaalne turundus", "tehnikaülevaade"],
};

export default async function ToolPage({ params }: Props) {
  const { locale, tool } = await params;
  const t = (key: string) => translate(locale, key);
  const config = toolConfig[tool];

  if (!config) {
    return (
      <div className="container mx-auto px-4 max-w-6xl py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Tool not found</h1>
      </div>
    );
  }

  const examples = exampleMap[locale] || exampleMap.en;
  const canonicalPath = `/${locale}/tools/${tool}`;

  // Build BreadcrumbList JSON-LD
  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumbHome"),
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("tools"),
        item: `${BASE_URL}/${locale}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t(config.titleKey),
        item: `${BASE_URL}${canonicalPath}`,
      },
    ],
  };

  // Build WebApplication JSON-LD
  const appLD = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t(config.titleKey),
    description: t(config.descKey),
    url: `${BASE_URL}${canonicalPath}`,
    applicationCategory: "SocialNetworkingApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appLD) }}
      />

      <div className="container mx-auto px-4 max-w-6xl py-8">
        <Breadcrumbs
          items={[
            { label: t("breadcrumbHome"), href: `/${locale}` },
            { label: t("tools"), href: `/${locale}/tools` },
            { label: t(config.titleKey), href: canonicalPath },
          ]}
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span>{config.icon}</span>
            {t(config.titleKey)}
          </h1>
          <p className="text-gray-500 text-lg">{t(config.descKey)}</p>
        </div>

        <KeywordTool
          locale={locale}
          toolType={tool}
          toolTitle={t(config.titleKey)}
          examples={examples}
        />

        {/* Tips Section - H2 + H3 content for P-SEO */}
        <section className="mt-12 bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t(config.tips.tipsTitle)}
          </h2>
          <ul className="space-y-4 text-gray-600 leading-relaxed">
            {config.tips.tips.map((tipKey: string, i: number) => (
              <li key={i} className="flex gap-3">
                <span className="text-blue-500 font-bold flex-shrink-0">{i + 1}.</span>
                <span>{t(tipKey)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t(config.tips.howTitle)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.tips.how.map((howKey: string, i: number) => (
              <div key={i} className="text-center p-4">
                <div className="text-4xl mb-3">
                  {["1️⃣", "2️⃣", "3️⃣"][i]}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t(`${howKey}Title`)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t(howKey)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
