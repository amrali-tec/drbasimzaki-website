'use client';

import React from 'react';
import { SiteData } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import DoctorShowcaseSection from '@/components/DoctorShowcaseSection';
import DoctorPhilosophyAndMedia from '@/components/DoctorPhilosophyAndMedia';
import DoctorBioSection from '@/components/DoctorBioSection';
import MedicalCentersSection from '@/components/MedicalCentersSection';
import { Crown } from 'lucide-react';

export default function AboutClient({ siteData }: { siteData: SiteData }) {
  const { lang, t } = useLanguage();

  usePageTitle(
    'عن أ.د. باسم زكي | أستاذ جراحة التجميل - عين شمس',
    'About Prof. Dr. Basim Zaki | Professor of Plastic Surgery'
  );
  const doc = siteData.doctor;
  const docName = lang === 'en' ? doc.nameEn || 'Prof. Dr. Basim Mohamed Zaki' : doc.name;
  const docTitle = lang === 'en' ? doc.titleEn || doc.title : doc.title;

  return (
    <div className="bg-navy-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-4 border border-brand-500/30 gold-border-glow">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/15 text-brand-400 text-xs font-bold border border-brand-500/30">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>
              {lang === 'en' ? 'Over 22 Years of Academic & Surgical Excellence' : 'مسيرة أكاديمية وجراحية تفوق 22 عاماً'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white">
            {lang === 'en' ? (
              <>Prof. Dr. <span className="gold-gradient-text">Basim Mohamed Zaki</span></>
            ) : (
              <>الأستاذ الدكتور <span className="gold-gradient-text">باسم محمد زكي</span></>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-medium">
            {docTitle} - {lang === 'en'
              ? 'Chairman of Cairo Cosmo Center, directing PhD research on VASER 4D Lipo and Rhinoplasty at Ain Shams University Faculty of Medicine.'
              : 'رئيس مجلس إدارة صرح كايرو كوزمو سنتر، والمشرف على أبحاث الدكتوراة في نحت القوام بالفيزر وتجميل الأنف بكلية الطب جامعة عين شمس.'}
          </p>
        </div>

        {/* Highlight Showcase */}
        <DoctorShowcaseSection doctor={doc} />

        {/* Doctor Philosophy & Media Coverage */}
        <DoctorPhilosophyAndMedia doctor={doc} />

        {/* Medical Centers & Affiliations */}
        <MedicalCentersSection centers={siteData.medicalCenters || []} />

        {/* Doctor Bio Detailed Section */}
        <DoctorBioSection doctor={doc} />

      </div>
    </div>
  );
}
