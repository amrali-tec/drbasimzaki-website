'use client';

import React from 'react';
import { DoctorInfo } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import ClinicsSection from '@/components/ClinicsSection';
import { MapPin } from 'lucide-react';

export default function ClinicsClient({ doctor }: { doctor: DoctorInfo }) {
  const { lang, t } = useLanguage();

  usePageTitle(
    'عناوين العيادات والفروع | أ.د. باسم زكي',
    'Clinics & Branch Locations | Prof. Dr. Basim Zaki'
  );

  return (
    <div className="bg-navy-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-4 border border-brand-500/30">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
            <MapPin className="w-4 h-4" />
            <span>{lang === 'en' ? 'Convenient Locations & Schedules' : 'سهولة الوصول والمواعيد'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white">
            {lang === 'en' ? (
              <>Clinics & <span className="gold-gradient-text">Medical Centers</span></>
            ) : (
              <>فروع ومواقع <span className="gold-gradient-text">العيادات والمراكز</span></>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {lang === 'en'
              ? 'Visit your nearest branch in Nasr City, Heliopolis, or Dokki, or contact us immediately via WhatsApp to confirm your appointment.'
              : 'تفضل بزيارة أقرب فرع لك في مدينة نصر، مصر الجديدة، أو الدقي، أو تواصل فورياً عبر الواتساب لتأكيد الموعد المناسب.'}
          </p>
        </div>

        <ClinicsSection doctor={doctor} />

      </div>
    </div>
  );
}
