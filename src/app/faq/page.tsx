import React from 'react';
import { Metadata } from 'next';
import FaqSection from '@/components/FaqSection';
import { HelpCircle } from 'lucide-react';

import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: 'الأسئلة الشائعة حول جراحات التجميل | أ.د. باسم زكي',
  description: 'إجابات طبية موثوقة حول أسئلة شفط الدهون، تجميل الأنف، شد البطن، فترة التعافي، ونسب النجاح مع أ.د. باسم زكي.',
};

export default function FaqPage() {
  return <FaqClient />;
}
