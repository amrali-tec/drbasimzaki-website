'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import FaqSection from '@/components/FaqSection';
import { HelpCircle } from 'lucide-react';

export default function FaqClient() {
  const { lang, t } = useLanguage();

  usePageTitle(
    'الأسئلة الشائعة | أ.د. باسم زكي',
    'Frequently Asked Questions | Prof. Dr. Basim Zaki'
  );

  return (
    <div className="bg-navy-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-4 border border-brand-500/30">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>{lang === 'en' ? 'Medical Answers & Inquiries' : 'إجابات واستفسارات طبية'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white">
            {lang === 'en' ? (
              <>Frequently Asked <span className="gold-gradient-text">Questions</span></>
            ) : (
              <>الأسئلة الشائعة <span className="gold-gradient-text">والدليل الطبي</span></>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {lang === 'en'
              ? 'Explore comprehensive medical answers to top questions regarding preoperative preparations, surgical procedures, and recovery.'
              : 'استكشف الإجابات الشاملة على أشهر الاستفسارات قبل وبعد العمليات الجراحية والتجميلية.'}
          </p>
        </div>

        <FaqSection />

      </div>
    </div>
  );
}
