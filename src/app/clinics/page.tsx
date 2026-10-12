import React from 'react';
import { Metadata } from 'next';
import { getSiteData } from '@/lib/dataStore';
import ClinicsSection from '@/components/ClinicsSection';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';

import ClinicsClient from './ClinicsClient';

export const metadata: Metadata = {
  title: 'عناوين وفروع عيادات أ.د. باسم زكي | مدينة نصر - الدقي - مصر الجديدة',
  description: 'عناوين وأرقام هواتف ومواعيد العمل في عيادات د. باسم زكي في مدينة نصر، مصر الجديدة، والدقي لحجز المواعيد والاستشارات.',
};

export default function ClinicsPage() {
  const siteData = getSiteData();
  return <ClinicsClient doctor={siteData.doctor} />;
}
