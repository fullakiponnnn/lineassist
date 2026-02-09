import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/settings/',
                    '/customers/',
                    '/visits/',
                    '/scan/',
                    '/onboarding/',
                ],
            },
        ],
        sitemap: 'https://www.snapkarte.jp/sitemap.xml',
    }
}
