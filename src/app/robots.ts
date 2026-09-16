import { MetadataRoute } from 'next';

const baseUrl = 'https://my-dev-portfolio-one-omega.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
