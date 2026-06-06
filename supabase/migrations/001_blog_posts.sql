-- Blog posts table for Social Keyword Generator
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  read_time TEXT DEFAULT '5 min read',
  author_name TEXT DEFAULT 'SKG Team',
  image_url TEXT,
  locale TEXT NOT NULL DEFAULT 'en',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(slug, locale)
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Public read published posts" ON blog_posts
  FOR SELECT USING (published = true);

-- Service role full access
CREATE POLICY "Service role full access" ON blog_posts
  FOR ALL USING (true)
  WITH CHECK (true);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_locale_published ON blog_posts(locale, published, published_at DESC);
