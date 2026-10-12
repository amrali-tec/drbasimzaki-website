import React from 'react';
import { Metadata } from 'next';
import { getSiteData } from '@/lib/dataStore';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

import CasesClient from './CasesClient';

export const metadata: Metadata = {
  title: 'معرض الحالات وقبل وبعد العمليات | أ.د. باسم زكي',
  description: 'معرض صور موثق لنتائج قبل وبعد عمليات شفط الدهون بالفيزر، شد البطن، علاج التثدي للرجال، وتجميل الأنف مع أ.د. باسم زكي.',
};

export default function CasesGalleryPage() {
  const siteData = getSiteData();

  return (
    <CasesClient
      cases={siteData.beforeAfterCases}
      whatsappNumber={siteData.doctor.whatsapp}
    />
  );
}
