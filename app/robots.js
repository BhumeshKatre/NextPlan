export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://govjobsblog.com/sitemap.xml', // Update with your actual domain
  }
}

