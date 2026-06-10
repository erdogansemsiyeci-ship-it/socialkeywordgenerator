"use client";

import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import type { Locale } from "@/lib/i18n";
import { localeNames, countryFlags, countryNames } from "@/lib/i18n";

const localeOrder: Locale[] = ["en","zh","de","ja","hi","fr","pt","it","ru","ko","es","id","nl","tr","ar","pl","sv","uk","ro","cs","el","hu","da","fi","nb","bg","hr","sk","lt","sl","sr","lv","et"];

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const cleanPath = pathname.replace(/^\/(en|zh|de|ja|hi|fr|pt|it|ru|ko|es|id|nl|tr|ar|pl|sv|uk|ro|cs|el|hu|da|fi|nb|bg|hr|sk|lt|sl|sr|lv|et)(?=\/|$)/, "").replace(/\/$/, "") || "/";

  const switchTo = useCallback((newLocale: Locale) => {
    const target = newLocale === "en" ? cleanPath : `/${newLocale}${cleanPath === "/" ? "" : cleanPath}`;
    setOpen(false);
    window.location.href = target;
  }, [cleanPath]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="text-sm">{countryFlags[locale]}</span>
        <span>{localeNames[locale]}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-52 max-h-72 overflow-y-auto rounded-lg border bg-white shadow-lg z-50 py-1" onClick={(e) => e.stopPropagation()}>
          {localeOrder.map((l) => (
            <button
              key={l}
              onMouseDown={(e) => {
                e.preventDefault();
                switchTo(l);
              }}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${l === locale ? "font-semibold bg-blue-50 text-blue-700" : "text-gray-700"}`}
            >
              <span className="text-base">{countryFlags[l]}</span>
              <span className="flex-1">{countryNames[l]}</span>
              <span className="text-xs text-gray-400">{localeNames[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
