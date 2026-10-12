'use client';

import React from 'react';
import { MedicalCenterItem } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { Building2, Crown, GraduationCap, MapPin } from 'lucide-react';

export default function MedicalCentersSection({
  centers,
}: {
  centers: MedicalCenterItem[];
}) {
  const { lang } = useLanguage();

  return (
    <section className="py-16 bg-navy-900 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Medical Leadership & Academic Affiliations' : 'المناصب والمراكز والاعتمادات الطبية'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === 'en' ? 'Medical Centers Chaired & Affiliated with' : 'المراكز التي'}{' '}
            <span className="gold-gradient-text">
              {lang === 'en' ? 'Prof. Dr. Basim Zaki' : 'يترأسها وينتمي إليها د. باسم زكي'}
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            {lang === 'en'
              ? 'Premier medical and academic institutions ensuring the highest international standards of safety and care.'
              : 'صروح طبية وأكاديمية متخصصة تضمن أعلى معايير الأمان والرعاية الطبية في مصر والوطن العربي.'}
          </p>
        </div>

        {/* Centers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {centers.map((center) => {
            const name = lang === 'en' ? center.nameEn || center.name : center.name;
            const role = lang === 'en' ? center.roleEn || center.role : center.role;
            const type = lang === 'en' ? center.typeEn || center.type : center.type;
            const desc = lang === 'en' ? center.descriptionEn || center.description : center.description;
            const loc = lang === 'en' ? center.locationEn || center.location : center.location;

            return (
              <div
                key={center.id}
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between space-y-4 border border-brand-500/20"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
                      {center.type === 'رئاسة وإدارة' ? (
                        <Crown className="w-5 h-5 text-amber-400" />
                      ) : center.type === 'صرح أكاديمي' ? (
                        <GraduationCap className="w-5 h-5 text-blue-400" />
                      ) : (
                        <Building2 className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-brand-300 font-semibold">
                      {type}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug">{name}</h3>

                  <div className="inline-block px-3 py-1 rounded-lg bg-brand-500/10 text-brand-300 text-xs font-bold">
                    {role}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  <span>{loc}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
