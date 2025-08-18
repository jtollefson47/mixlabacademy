import Head from 'next/head'

interface SeoProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
}

export function Seo({
  title,
  description = 'Learn audio engineering through interactive games and exercises. Master EQ, compression, mixing, and more with hands-on practice.',
  keywords = ['audio engineering', 'music production', 'eq training', 'mixing', 'mastering', 'game-based learning'],
  ogImage,
  noIndex = false,
}: SeoProps) {
  const fullTitle = title 
    ? `${title} | Audio Learning Platform`
    : 'Audio Learning Platform - Learn Audio Engineering Through Games'

  const keywordsString = keywords.join(', ')

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Audio Learning Platform" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* SEO */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      
      {/* Accessibility */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="color-scheme" content="light dark" />
    </Head>
  )
}
