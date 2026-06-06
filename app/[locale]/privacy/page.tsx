import type { Metadata } from "next";
import { translate } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Locale } from "@/lib/i18n";

interface Props { params: Promise<{ locale: Locale }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: translate(locale, "privacyTitle"), description: translate(locale, "privacyDesc"), openGraph: { title: translate(locale, "privacyTitle"), description: translate(locale, "privacyDesc"), images: [{ url: "/og-image.svg", width: 1200, height: 630 }] } };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = (key: string) => translate(locale, key);
  const date = "June 4, 2026";

  return (
    <div className="container mx-auto px-4 max-w-3xl py-8">
      <Breadcrumbs items={[
        { label: t("breadcrumbHome"), href: locale === "en" ? "/en" : "/tr" },
        { label: t("privacy"), href: `/${locale}/privacy` },
      ]} />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("privacyTitle")}</h1>
      <p className="text-sm text-gray-400 mb-8">
        {locale === "en" ? `Last updated: ${date}` : `Son güncelleme: ${date}`}
      </p>
      <div className="prose prose-gray max-w-none">
        {locale === "en" ? (
          <>
            <h2>1. Information We Collect</h2>
            <p>We collect minimal information to provide and improve our services:</p>
            <ul>
              <li><strong>Usage Data:</strong> Pages visited, tools used, time spent on site (via Google Analytics)</li>
              <li><strong>Keywords Entered:</strong> Topics you enter for keyword generation (processed anonymously)</li>
              <li><strong>Technical Data:</strong> Browser type, device type, IP address (for security and analytics)</li>
            </ul>
            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To provide and maintain our keyword generation tools</li>
              <li>To improve our services and user experience</li>
              <li>To display relevant advertisements (via Google AdSense)</li>
              <li>To analyze usage patterns and optimize performance</li>
            </ul>
            <h2>3. Cookies</h2>
            <p>We use cookies for:</p>
            <ul>
              <li><strong>Essential:</strong> Site functionality and security</li>
              <li><strong>Analytics:</strong> Google Analytics for usage insights</li>
              <li><strong>Advertising:</strong> Google AdSense for relevant ads</li>
            </ul>
            <p>You can disable cookies in your browser settings, though some features may not work properly.</p>
            <h2>4. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Google Analytics:</strong> Website analytics</li>
              <li><strong>Google AdSense:</strong> Advertisement delivery</li>
              <li><strong>OpenAI API:</strong> AI-powered keyword generation (queries processed anonymously)</li>
            </ul>
            <h2>5. Data Security</h2>
            <p>We implement appropriate security measures to protect your information. However, no method of electronic transmission is 100% secure.</p>
            <h2>6. Children&apos;s Privacy</h2>
            <p>Our service is not directed to children under 13. We do not knowingly collect data from children.</p>
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of cookies (browser settings)</li>
              <li>Opt-out of personalized ads (Google Ad Settings)</li>
            </ul>
            <h2>8. Contact</h2>
            <p>For privacy questions: <a href="mailto:privacy@socialkeywordgenerator.com" className="text-blue-600 hover:underline">privacy@socialkeywordgenerator.com</a></p>
          </>
        ) : (
          <>
            <h2>1. Topladığımız Bilgiler</h2>
            <p>Hizmetlerimizi sağlamak ve geliştirmek için minimum bilgi topluyoruz:</p>
            <ul>
              <li><strong>Kullanım Verileri:</strong> Ziyaret edilen sayfalar, kullanılan araçlar, sitede geçirilen süre (Google Analytics aracılığıyla)</li>
              <li><strong>Girilen Anahtar Kelimeler:</strong> Anahtar kelime oluşturma için girdiğiniz konular (anonim olarak işlenir)</li>
              <li><strong>Teknik Veriler:</strong> Tarayıcı türü, cihaz türü, IP adresi (güvenlik ve analitik için)</li>
            </ul>
            <h2>2. Bilgilerinizi Nasıl Kullanıyoruz</h2>
            <ul>
              <li>Anahtar kelime oluşturma araçlarımızı sağlamak ve sürdürmek</li>
              <li>Hizmetlerimizi ve kullanıcı deneyimini geliştirmek</li>
              <li>İlgili reklamları göstermek (Google AdSense aracılığıyla)</li>
              <li>Kullanım kalıplarını analiz etmek ve performansı optimize etmek</li>
            </ul>
            <h2>3. Çerezler</h2>
            <p>Çerezleri şunlar için kullanıyoruz:</p>
            <ul>
              <li><strong>Temel:</strong> Site işlevselliği ve güvenlik</li>
              <li><strong>Analitik:</strong> Kullanım içgörüleri için Google Analytics</li>
              <li><strong>Reklam:</strong> İlgili reklamlar için Google AdSense</li>
            </ul>
            <p>Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bazı özellikler düzgün çalışmayabilir.</p>
            <h2>4. Üçüncü Taraf Hizmetler</h2>
            <p>Aşağıdaki üçüncü taraf hizmetleri kullanıyoruz:</p>
            <ul>
              <li><strong>Google Analytics:</strong> Web sitesi analitiği</li>
              <li><strong>Google AdSense:</strong> Reklam gösterimi</li>
              <li><strong>OpenAI API:</strong> Yapay zeka destekli anahtar kelime oluşturma (sorgular anonim işlenir)</li>
            </ul>
            <h2>5. Veri Güvenliği</h2>
            <p>Bilgilerinizi korumak için uygun güvenlik önlemleri uyguluyoruz. Ancak hiçbir elektronik iletim yöntemi %100 güvenli değildir.</p>
            <h2>6. Çocukların Gizliliği</h2>
            <p>Hizmetimiz 13 yaşın altındaki çocuklara yönelik değildir. Bilerek çocuklardan veri toplamayız.</p>
            <h2>7. Haklarınız</h2>
            <p>Aşağıdaki haklara sahipsiniz:</p>
            <ul>
              <li>Kişisel verilerinize erişim</li>
              <li>Verilerinizin silinmesini talep etme</li>
              <li>Çerezlerden çıkma (tarayıcı ayarları)</li>
              <li>Kişiselleştirilmiş reklamlardan çıkma (Google Reklam Ayarları)</li>
            </ul>
            <h2>8. İletişim</h2>
            <p>Gizlilik soruları için: <a href="mailto:privacy@socialkeywordgenerator.com" className="text-blue-600 hover:underline">privacy@socialkeywordgenerator.com</a></p>
          </>
        )}
      </div>
    </div>
  );
}
