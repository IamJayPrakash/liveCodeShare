// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://livecodeshare.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
    additionalSitemaps: [
      'https://livecodeshare.vercel.app/sitemap.xml',
      'https://livecodeshare.vercel.app/server-sitemap.xml',
    ],
  },
  exclude: ['/server-sitemap.xml'],
  outDir: './public',
  changefreq: 'weekly',
  priority: 0.7,
};

export default config;
