'use client';

import React from 'react';
import { BeforeAfterItem } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import { Image as ImageIcon } from 'lucide-react';

export default function CasesClient({
  cases,
  whatsappNumber,
}: {
  cases: BeforeAfterItem[];
  whatsappNumber: string;
}) {
  const { lang, t } = useLanguage();

  usePageTitle(
    'معرض قبل وبعد العمليات | أ.د. باسم زكي',
    'Before & After Gallery | Prof. Dr. Basim Zaki'
  );

  return (
    <div className="bg-navy-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-4 border border-brand-500/30">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
            <ImageIcon className="w-4 h-4" />
            <span>{lang === 'en' ? 'Authentic & Verified Results' : 'نتائج حقيقية وموثقة'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white">
            {lang === 'en' ? (
              <>Before & After <span className="gold-gradient-text">Cases Gallery</span></>
            ) : (
              <>معرض <span className="gold-gradient-text">حالات قبل وبعد العمليات</span></>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {lang === 'en'
              ? 'Explore authentic surgical and aesthetic transformations with 100% natural aesthetics under the supervision of Prof. Dr. Basim Zaki.'
              : 'استعرض نتائج العمليات الجراحية والتجميلية الحقيقية بنسب نجاح عالية ومظهر طبيعي مئة بالمئة تحت إشراف أ.د. باسم زكي.'}
          </p>
        </div>

        <BeforeAfterSection
          cases={cases}
          whatsappNumber={whatsappNumber}
        />

      </div>
    </div>
  );
}
