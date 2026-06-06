import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { translate } from "@/lib/i18n";

interface BlogCardProps {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
}

export function BlogCard({ locale, slug, title, description, publishedAt, readTime }: BlogCardProps) {
  const t = (key: string) => translate(locale, key);
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <Link
      href={`${prefix}/blog/${slug}`}
      className="group block p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
        <time dateTime={publishedAt}>{new Date(publishedAt).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
        <span>·</span>
        <span>{readTime}</span>
      </div>
      <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{description}</p>
      <span className="inline-block mt-3 text-sm font-medium text-blue-600 group-hover:underline">
        {t("blogReadMore")} →
      </span>
    </Link>
  );
}
