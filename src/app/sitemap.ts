import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // 배포 후 실제 도메인으로 변경
  const baseUrl = 'https://example.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
