import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.technodragon.co',
      priority: 1,
    },
    {
      url: 'https://www.technodragon.co/catalog',
      priority: 0.9,
    },
  ];
}
