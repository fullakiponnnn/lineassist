export default function BlogStructuredData({
  headline,
  description,
  datePublished,
  url,
}: {
  headline: string
  description: string
  datePublished: string
  url: string
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    datePublished,
    author: {
      '@type': 'Organization',
      name: 'SnapKarte',
      url: 'https://www.snapkarte.jp',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SnapKarte',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.snapkarte.jp/favicon.ico',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
