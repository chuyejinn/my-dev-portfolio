import { MetadataRoute } from 'next';

const baseUrl = 'https://my-dev-portfolio-one-omega.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
