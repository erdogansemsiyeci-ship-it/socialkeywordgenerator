import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { translate } from "@/lib/i18n";

interface ToolCardProps {
  locale: Locale;
  href: string;
  icon: string;
  titleKey: string;
  descKey: string;
}

export function ToolCard({ locale, href, icon, titleKey, descKey }: ToolCardProps) {
  const t = (key: string) => translate(locale, key);
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <Link
      href={`${prefix}${href}`}
      className="group block p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
        {t(titleKey)}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{t(descKey)}</p>
    </Link>
  );
}
