import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getSiteData } from '@/lib/dataStore';
import ServicesSection from '@/components/ServicesSection';
import { Sparkles, Activity, ShieldCheck, ArrowRight } from 'lucide-react';

import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'جميع خدمات وجراحات التجميل | أ.د. باسم زكي',
  description: 'قائمة خدمات جراحة التجميل الشاملة: نحت القوام بالفيزر، شد البطن، تجميل الثدي، تجميل الأنف، علاج التثدي، والتجميل غير الجراحي.',
};

export default function AllServicesPage() {
  const siteData = getSiteData();
  return <ServicesClient siteData={siteData} />;
}
