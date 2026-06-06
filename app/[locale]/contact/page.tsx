import type { Metadata } from "next";
import { translate } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Locale } from "@/lib/i18n";

interface Props { params: Promise<{ locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: translate(locale, "contactTitle"),
    description: translate(locale, "contactDesc"),
    openGraph: {
      title: translate(locale, "contactTitle"),
      description: translate(locale, "contactDesc"),
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = (key: string) => translate(locale, key);

  return (
    <div className="container mx-auto px-4 max-w-3xl py-8">
      <Breadcrumbs items={[
        { label: t("breadcrumbHome"), href: locale === "en" ? "/en" : "/tr" },
        { label: t("contact"), href: `/${locale}/contact` },
      ]} />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("contactTitle")}</h1>
      <div className="prose prose-gray max-w-none">
        {locale === "en" ? (
          <>
            <p className="text-lg text-gray-600 mb-6">
              Have questions, suggestions, or need support? We&apos;d love to hear from you.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Email Us</h2>
            <p className="text-gray-600 mb-4">
              For general inquiries: <a href="mailto:hello@socialkeywordgenerator.com" className="text-blue-600 hover:underline">hello@socialkeywordgenerator.com</a>
            </p>
            <p className="text-gray-600 mb-4">
              For support: <a href="mailto:support@socialkeywordgenerator.com" className="text-blue-600 hover:underline">support@socialkeywordgenerator.com</a>
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Response Time</h2>
            <p className="text-gray-600 mb-4">
              We typically respond within 24-48 hours during business days.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Feature Requests</h2>
            <p className="text-gray-600 mb-4">
              We&apos;re always improving our tools. If you have an idea for a new feature or tool, let us know! We prioritize requests based on user demand.
            </p>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-600 mb-6">
              Sorularınız, önerileriniz veya desteğe mi ihtiyacınız var? Sizden haber almayı çok isteriz.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">E-posta</h2>
            <p className="text-gray-600 mb-4">
              Genel sorular: <a href="mailto:hello@socialkeywordgenerator.com" className="text-blue-600 hover:underline">hello@socialkeywordgenerator.com</a>
            </p>
            <p className="text-gray-600 mb-4">
              Destek: <a href="mailto:support@socialkeywordgenerator.com" className="text-blue-600 hover:underline">support@socialkeywordgenerator.com</a>
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Yanıt Süresi</h2>
            <p className="text-gray-600 mb-4">
              Genellikle iş günlerinde 24-48 saat içinde yanıt veriyoruz.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Özellik Talepleri</h2>
            <p className="text-gray-600 mb-4">
              Araçlarımızı sürekli geliştiriyoruz. Yeni bir özellik veya araç fikriniz varsa bize bildirin! Talepleri kullanıcı talebine göre önceliklendiriyoruz.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
