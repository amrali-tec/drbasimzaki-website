'use client';

import React from 'react';
import { SiteData } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import ServicesSection from '@/components/ServicesSection';
import { Sparkles } from 'lucide-react';

export default function ServicesClient({ siteData }: { siteData: SiteData }) {
  const { lang, t } = useLanguage();

  usePageTitle(
    'خدمات وجراحات التجميل | أ.د. باسم زكي',
    'Plastic Surgery & Body Sculpting Services | Prof. Dr. Basim Zaki'
  );

  return (
    <div className="bg-navy-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-4 border border-brand-500/30">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>
              {lang === 'en' ? 'Comprehensive Aesthetic & Plastic Procedures' : 'تخصصات وجراحات تجميلية متكاملة'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white">
            {lang === 'en' ? (
              <>All <span className="gold-gradient-text">Services & Procedures</span></>
            ) : (
              <>جميع <span className="gold-gradient-text">خدمات وعمليات التجميل</span></>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {lang === 'en'
              ? 'Select your preferred specialty to view full medical details, surgical methods, expected outcomes, and procedure FAQs.'
              : 'اختر التخصص المطلوب للاطلاع على كافة التفاصيل الطبية، طريقة الإجراء، نتائج العمليات، والأسئلة الشائعة الخاصة بكل خدمة.'}
          </p>
        </div>

        {/* Services List with Filter */}
        <ServicesSection
          categories={siteData.categories}
          services={siteData.services}
          whatsappNumber={siteData.doctor.whatsapp}
        />

      </div>
    </div>
  );
}
