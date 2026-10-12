'use client';

import React from 'react';
import { DoctorInfo } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Clock, Phone, Navigation, MessageCircle } from 'lucide-react';

export default function ClinicsSection({ doctor }: { doctor: DoctorInfo }) {
  const { lang } = useLanguage();

  return (
    <section id="clinics" className="py-20 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Clinic Branches & Locations' : 'فروع العيادات والمراكز'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === 'en' ? 'Clinic Locations of' : 'مواقع عيادات'}{' '}
            <span className="gold-gradient-text">
              {lang === 'en' ? 'Prof. Dr. Basim Zaki' : 'د. باسم زكي'}
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'en'
              ? 'Conveniently located clinic branches across prime districts in Greater Cairo for easy access and consultation.'
              : 'تتواجد عيادتا ومراكزنا المعتمده في مناطق حيوية بالقاهرة الكبرى لسهولة الوصول والحصول على الاستشارة الطبية.'}
          </p>
        </div>

        {/* Clinics Cards Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {doctor.clinics.map((clinic) => {
            const name = lang === 'en' ? clinic.nameEn || clinic.name : clinic.name;
            const address = lang === 'en' ? clinic.addressEn || clinic.address : clinic.address;
            const hours = lang === 'en' ? clinic.workHoursEn || clinic.workHours : clinic.workHours;

            const waUrl = `https://wa.me/${doctor.whatsapp}?text=${encodeURIComponent(
              lang === 'en'
                ? `Hello Prof. Dr. Basim Zaki, I would like to book a consultation at (${name})`
                : `مرحباً د. باسم زكي، أود حجز موعد استشارة في (${name})`
            )}`;

            return (
              <div
                key={clinic.id}
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                    <MapPin className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white">{name}</h3>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <Navigation className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                      <span>{address}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-brand-400 shrink-0" />
                      <span>{hours}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                      <a href={`tel:${clinic.phone}`} className="hover:text-brand-300 font-semibold dir-ltr">
                        {clinic.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card CTAs */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    {lang === 'en' ? `Book ${name.split(' ')[0]} via WhatsApp` : `احجز فرع ${clinic.name.split(' ')[1] || ''} عبر الواتساب`}
                  </a>

                  <a
                    href={`tel:${clinic.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl glass-panel hover:bg-slate-800 text-white text-xs font-semibold transition-all border border-slate-700"
                  >
                    <Phone className="w-4 h-4 text-brand-400" />
                    {lang === 'en' ? 'Call Branch' : 'اتصال بالفرع'}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
