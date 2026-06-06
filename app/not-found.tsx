import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - Social Keyword Generator",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/en/tools"
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
