import { MetadataRoute } from 'next';
import { getSiteData } from '@/lib/dataStore';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://drbasimzaki.com';
  const siteData = getSiteData();

  const mainPages = [
    '',
    '/services',
    '/cases',
    '/about',
    '/clinics',
    '/faq',
    '/contact',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: path === '' ? 1.0 : 0.9,
  }));

  const serviceUrls = siteData.services.map((service) => ({
    url: `${baseUrl}/services/${service.categorySlug}/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const landingUrls = siteData.landingPages.map((lp) => ({
    url: `${baseUrl}/landing/${lp.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...mainPages, ...serviceUrls, ...landingUrls];
}
