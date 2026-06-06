"use client";

import { useState } from "react";
import { Search, Copy, Check, Loader2, Sparkles, TrendingUp } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { translate } from "@/lib/i18n";
import { AdSlot } from "./AdSlot";

interface KeywordToolProps {
  locale: Locale;
  toolType: string;
  toolTitle: string;
  examples: string[];
}

export function KeywordTool({ locale, toolType, toolTitle, examples }: KeywordToolProps) {
  const t = (key: string) => translate(locale, key);
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), toolType, locale }),
      });

      if (!res.ok) throw new Error("Generation failed");

      const data = await res.json();
      setResults(data.keywords || []);
    } catch (err) {
      setError(t("errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  const copyKeyword = async (keyword: string, index: number) => {
    await navigator.clipboard.writeText(keyword);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(results.join("\n"));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder={t("enterTopic")}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base whitespace-nowrap"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            {loading ? t("generating") : t("generateKeywords")}
          </button>
        </div>

        {examples.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs text-gray-400 mt-1">{t("tryExample")}:</span>
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => setTopic(ex)}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <p className="text-sm text-gray-500">{t("generating")}</p>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              {t("results")} ({results.length})
            </h2>
            <button
              onClick={copyAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {copiedIndex === -1 ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copiedIndex === -1 ? t("copied") : t("copyAll")}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {results.map((keyword, i) => (
              <button
                key={i}
                onClick={() => copyKeyword(keyword, i)}
                className="group flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 text-left"
              >
                <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium break-all">
                  {keyword}
                </span>
                <span className="flex-shrink-0 ml-2">
                  {copiedIndex === i ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {!loading && results.length === 0 && !error && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400">{t("noResults")}</p>
        </div>
      )}

      <AdSlot slot="tool-content" />
    </div>
  );
}
