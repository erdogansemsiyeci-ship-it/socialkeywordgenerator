interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebAppSchema(name: string, url: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url,
    description,
    applicationCategory: "SocialMediaApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Social Keyword Generator",
    url: "https://socialkeywordgenerator.com",
    description: "Free AI-powered social media keyword and hashtag generator tools.",
    sameAs: [],
  };
}

export function generateBlogPostingSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `https://socialkeywordgenerator.com/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.authorName,
    },
    ...(post.imageUrl && { image: post.imageUrl }),
  };
}
