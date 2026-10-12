import React from 'react';
import { getSiteData } from '@/lib/dataStore';
import HeroSection from '@/components/HeroSection';
import DoctorShowcaseSection from '@/components/DoctorShowcaseSection';
import DoctorPhilosophyAndMedia from '@/components/DoctorPhilosophyAndMedia';
import MedicalCentersSection from '@/components/MedicalCentersSection';
import ServicesSection from '@/components/ServicesSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import DoctorBioSection from '@/components/DoctorBioSection';
import ClinicsSection from '@/components/ClinicsSection';
import FaqSection from '@/components/FaqSection';

export const dynamic = 'force-static';

export default function HomePage() {
  const siteData = getSiteData();

  return (
    <>
      <HeroSection doctor={siteData.doctor} />
      <DoctorShowcaseSection doctor={siteData.doctor} />
      <DoctorPhilosophyAndMedia doctor={siteData.doctor} />
      <MedicalCentersSection centers={siteData.medicalCenters || []} />
      <ServicesSection
        categories={siteData.categories}
        services={siteData.services}
        whatsappNumber={siteData.doctor.whatsapp}
      />
      <BeforeAfterSection
        cases={siteData.beforeAfterCases}
        whatsappNumber={siteData.doctor.whatsapp}
      />
      <DoctorBioSection doctor={siteData.doctor} />
      <ClinicsSection doctor={siteData.doctor} />
      <FaqSection />
    </>
  );
}
