'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DoctorInfo } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Award, ShieldCheck, Star, MessageCircle, PhoneCall, Crown, CheckCircle2, Sparkles, Quote } from 'lucide-react';

export default function HeroSection({ doctor }: { doctor: DoctorInfo }) {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const { t, lang } = useLanguage();

  usePageTitle(
    'أ.د. باسم زكي | أستاذ جراحة التجميل ونحت القوام 4D',
    'Prof. Dr. Basim Zaki | 4D Vaser Body Sculpting & Plastic Surgery'
  );

  const doctorPhotos = [
    { src: '/Photos/1.jpeg', label: lang === 'en' ? 'Prof. Basim Zaki' : 'د. باسم زكي' },
    { src: '/Photos/2.jpeg', label: lang === 'en' ? 'Consultation' : 'الاستشارة' },
    { src: '/Photos/3.jpeg', label: lang === 'en' ? 'Congresses' : 'المؤتمرات' },
    { src: '/Photos/4.jpeg', label: lang === 'en' ? 'Ain Shams Univ' : 'عين شمس' },
  ];

  const primaryPhone = doctor.phones[0] || '01201134051';
  const whatsappUrl = `https://wa.me/${doctor.whatsapp}?text=${encodeURIComponent(
    lang === 'en'
      ? 'Hello Prof. Dr. Basim Zaki, I would like to book a personal consultation'
      : 'مرحباً أ.د. باسم زكي، أود حجز استشارة تجميلية شخصية مع حضرتك'
  )}`;

  const docName = lang === 'en' ? doctor.nameEn || 'Prof. Dr. Basim Mohamed Zaki' : doctor.name;
  const docTitle = lang === 'en' ? doctor.titleEn || doctor.title : doctor.title;
  const docBio = lang === 'en' ? doctor.bioEn || doctor.bio : doctor.bio;

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Academic Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/15 border border-brand-500/35 text-brand-400 text-xs sm:text-sm font-bold shadow-lg">
              <Award className="w-4 h-4 text-brand-400 shrink-0" />
              <span>{docTitle}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              {t('heroTitlePrefix')}{' '}
              <span className="gold-gradient-text">{t('heroTitleHighlight')}</span>
            </h1>

            {/* Doctor Authority Sub-heading */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400 shrink-0" />
                {lang === 'en'
                  ? 'Chairman of Cairo Cosmo Center & Professor of Plastic Surgery at Ain Shams Univ.'
                  : 'رئيس مجلس إدارة مركز "كايرو كوزمو" وأستاذ جراحة التجميل جامعة عين شمس'}
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                {docBio}
              </p>
            </div>

            {/* Doctor's Quote Card */}
            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-brand-500/25 space-y-2 bg-navy-950/70 relative">
              <Quote className="w-7 h-7 text-brand-500/20 absolute top-3 left-3 rotate-180" />
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed italic">
                {t('doctorQuote')}
              </p>
              <div className="flex items-center gap-2 text-xs text-brand-400 font-bold">
                <span>{docName}</span>
                <span>{t('verifiedConsultation')}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base transition-all shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                {lang === 'en' ? 'Book Consultation via WhatsApp' : 'حجز موعد استشارة مع أ.د. باسم'}
              </a>

              <a
                href={`tel:${primaryPhone}`}
                className="flex items-center gap-3 px-7 py-4 rounded-full glass-panel hover:bg-slate-800 text-white font-bold text-base transition-all border border-brand-500/30 hover:border-brand-500/60"
              >
                <PhoneCall className="w-5 h-5 text-brand-400" />
                {t('directCall')}: {primaryPhone}
              </a>
            </div>

            {/* Verification Checklist */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{lang === 'en' ? '4D Vaser & J-Plasma Tech' : 'تقنيات الفيزر 4D والجي بلازما'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{lang === 'en' ? 'Highest Medical Safety & Success' : 'أعلى نسبة نجاح وأمان طبي'}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{lang === 'en' ? 'Continuous Post-Op Follow-up' : 'متابعة دقيقة طوال فترة التعافي'}</span>
              </div>
            </div>

          </div>

          {/* Doctor Portrait Interactive Card */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Main Interactive Doctor Photo Frame */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden glass-panel p-2 gold-border-glow shadow-2xl">
              <div className="w-full h-full relative rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src={doctorPhotos[selectedPhoto].src}
                  alt={docName}
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-85" />
                
                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 inset-x-4 glass-panel p-4 rounded-xl text-center space-y-1.5 border border-brand-500/40">
                  <div className="flex items-center justify-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <h3 className="font-black text-white text-base sm:text-lg">{docName}</h3>
                  <p className="text-xs text-brand-300 font-bold">{t('doctorSubTitle')}</p>
                  <p className="text-[11px] text-slate-300">{t('cairoCosmoTitle')}</p>
                </div>
              </div>
            </div>

            {/* Interactive Photo Selector Thumbnails */}
            <div className="flex items-center justify-center gap-3 mt-4">
              {doctorPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPhoto(i)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedPhoto === i
                      ? 'border-brand-500 scale-110 shadow-lg shadow-brand-500/40 ring-2 ring-brand-400/50'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                  title={photo.label}
                >
                  <Image src={photo.src} alt={photo.label} fill className="object-cover object-top" />
                </button>
              ))}
            </div>

            {/* Floating Stats Badge */}
            <div className="absolute -bottom-6 -right-2 glass-panel p-3.5 rounded-2xl flex items-center gap-3 border border-brand-500/40 shadow-2xl bg-navy-900/95 backdrop-blur-xl">
              <div className="w-11 h-11 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400 font-black text-lg">
                22+
              </div>
              <div>
                <p className="text-[11px] text-slate-400">{lang === 'en' ? 'Years Experience' : 'عاماً من الخبرة'}</p>
                <p className="text-xs font-bold text-white">{lang === 'en' ? 'In Plastic & Sculpting Surgeries' : 'في جراحات التجميل ونحت الجسم'}</p>
              </div>
            </div>

          </div>

        </div>

        {/* Counter Stats Bar */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-panel p-6 rounded-2xl text-center border border-slate-800 hover:border-brand-500/40 transition-colors">
            <span className="block text-3xl sm:text-4xl font-extrabold text-brand-400">{t('statYears')}</span>
            <span className="text-xs sm:text-sm text-slate-300 mt-1 block">{t('statYearsLabel')}</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-center border border-slate-800 hover:border-brand-500/40 transition-colors">
            <span className="block text-3xl sm:text-4xl font-extrabold text-brand-400">{t('statSurgeries')}</span>
            <span className="text-xs sm:text-sm text-slate-300 mt-1 block">{t('statSurgeriesLabel')}</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-center border border-slate-800 hover:border-brand-500/40 transition-colors">
            <span className="block text-3xl sm:text-4xl font-extrabold text-brand-400">{t('statSatisfaction')}</span>
            <span className="text-xs sm:text-sm text-slate-300 mt-1 block">{t('statSatisfactionLabel')}</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-center border border-slate-800 hover:border-brand-500/40 transition-colors">
            <span className="block text-3xl sm:text-4xl font-extrabold text-brand-400">{t('statClinics')}</span>
            <span className="text-xs sm:text-sm text-slate-300 mt-1 block">{t('statClinicsLabel')}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
