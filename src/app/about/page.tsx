import React from 'react';
import { Metadata } from 'next';
import { getSiteData } from '@/lib/dataStore';
import DoctorShowcaseSection from '@/components/DoctorShowcaseSection';
import DoctorPhilosophyAndMedia from '@/components/DoctorPhilosophyAndMedia';
import DoctorBioSection from '@/components/DoctorBioSection';
import MedicalCentersSection from '@/components/MedicalCentersSection';
import { GraduationCap, Award, Crown } from 'lucide-react';

import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'عن أ.د. باسم زكي | أستاذ جراحة التجميل جامعة عين شمس ورئيس كايرو كوزمو',
  description: 'تعرف على السيرة الذاتية والخبرات الأكاديمية والعملية للأستاذ الدكتور باسم محمد زكي، أستاذ جراحة التجميل بكلية الطب جامعة عين شمس ورئيس مجلس إدارة مركز كايرو كوزمو.',
};

export default function AboutDoctorPage() {
  const siteData = getSiteData();
  return <AboutClient siteData={siteData} />;
}
