import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { translate } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = (key: string) => translate(locale, key);
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href={prefix || "/"} className="flex items-center gap-2 font-bold text-lg text-gray-900 mb-3">
              <span className="text-2xl">🔑</span>
              SocialKeywordGenerator
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">{t("footerTagline")}</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-3">{t("tools")}</h4>
            <ul className="space-y-2">
              <li><Link href={`${prefix}/tools/instagram`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">📸 {t("instagramTitle")}</Link></li>
              <li><Link href={`${prefix}/tools/tiktok`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">🎵 {t("tiktokTitle")}</Link></li>
              <li><Link href={`${prefix}/tools/youtube`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">▶️ {t("youtubeTitle")}</Link></li>
              <li><Link href={`${prefix}/tools/seo`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">🔍 {t("seoTitle")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-3">Info</h4>
            <ul className="space-y-2">
              <li><Link href={`${prefix}/about`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{t("about")}</Link></li>
              <li><Link href={`${prefix}/contact`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{t("contact")}</Link></li>
              <li><Link href={`${prefix}/blog`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{t("blog")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link href={`${prefix}/privacy`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{t("privacy")}</Link></li>
              <li><Link href={`${prefix}/terms`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{t("terms")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} SocialKeywordGenerator.com. {t("footerRights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
