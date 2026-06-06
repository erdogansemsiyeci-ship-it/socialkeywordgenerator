import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { translate } from "@/lib/i18n";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Navbar({ locale }: { locale: Locale }) {
  const t = (key: string) => translate(locale, key);
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-6xl">
        <Link href={prefix || "/"} className="flex items-center gap-2 font-bold text-xl text-gray-900">
          <span className="text-2xl">🔑</span>
          <span className="hidden sm:inline">SocialKeywordGenerator</span>
          <span className="sm:hidden">SKG</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href={`${prefix}/tools`} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            {t("tools")}
          </Link>
          <Link href={`${prefix}/blog`} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            {t("blog")}
          </Link>
          <Link href={`${prefix}/about`} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            {t("about")}
          </Link>
          <Link href={`${prefix}/contact`} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            {t("contact")}
          </Link>
        </nav>

        <LocaleSwitcher locale={locale} />
      </div>
    </header>
  );
}
