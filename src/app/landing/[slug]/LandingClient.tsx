'use client';

import React from 'react';
import Image from 'next/image';
import { LandingPageItem, DoctorInfo } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Phone, MessageCircle, Star, CheckCircle2, Tag } from 'lucide-react';

export default function LandingClient({
  lp,
  doctor,
}: {
  lp: LandingPageItem;
  doctor: DoctorInfo;
}) {
  const { lang, t } = useLanguage();

  const phone = lp.ctaPhone || doctor.phones[0];
  const docName = lang === 'en' ? doctor.nameEn || 'Prof. Dr. Basim Zaki' : doctor.name;
  const docTitle = lang === 'en' ? doctor.titleEn || doctor.title : doctor.title;
  const title = lang === 'en' ? lp.titleEn || lp.title : lp.title;
  usePageTitle(`${title} | أ.د. باسم زكي`, `${title} | Prof. Dr. Basim Zaki`);
  const headline = lang === 'en' ? lp.heroHeadlineEn || lp.heroHeadline : lp.heroHeadline;
  const subheadline = lang === 'en' ? lp.heroSubheadlineEn || lp.heroSubheadline : lp.heroSubheadline;
  const badge = lang === 'en' ? lp.discountBadgeEn || lp.discountBadge : lp.discountBadge;
  const features = lang === 'en' ? lp.featuresEn || lp.features : lp.features;
  const ctaText = lang === 'en' ? lp.ctaTextEn || lp.ctaText : lp.ctaText;

  const whatsappUrl = `https://wa.me/${doctor.whatsapp}?text=${encodeURIComponent(
    lang === 'en'
      ? `Hello Prof. Dr. Basim Zaki, I would like to inquire about (${title})`
      : `مرحباً د. باسم زكي، أود الاستفسار والحصول على عرض (${title})`
  )}`;

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Special Offer Header Badge */}
        {badge && (
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-brand-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg animate-pulse">
              <Tag className="w-4 h-4" />
              <span>{badge}</span>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {headline}
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          {/* Large High Conversion CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base shadow-xl shadow-emerald-600/30 hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>{ctaText || (lang === 'en' ? 'Book via WhatsApp Now' : 'احجز عبر الواتساب فوراً')}</span>
            </a>

            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-slate-950 font-black text-base shadow-xl hover:scale-105 transition-all"
            >
              <Phone className="w-5 h-5" />
              <span>{lang === 'en' ? `Call Now: ${phone}` : `اتصل مباشرة: ${phone}`}</span>
            </a>
          </div>
        </div>

        {/* Features List */}
        {features && features.length > 0 && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 border border-brand-500/30">
            <h2 className="text-xl font-bold text-white text-center">
              {lang === 'en' ? 'Why Choose Dr. Basim Zaki Clinic?' : 'لماذا تختار عيادة د. باسم زكي؟'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-navy-900/80 p-4 rounded-2xl border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />
                  <span className="text-sm font-semibold text-slate-200">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Doctor Credential Box */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right border border-slate-800">
          <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-brand-500">
            <Image
              src="/Photos/1.jpeg"
              alt={docName}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <h3 className="font-bold text-white text-lg">{docName}</h3>
            <p className="text-xs text-brand-300 font-medium">{docTitle}</p>
            <p className="text-xs text-slate-400">
              {lang === 'en'
                ? 'Over 22 years of surgical excellence in body sculpting and facial aesthetics.'
                : 'أكثر من 22 عاماً خبرة في جراحات ونحت القوام وتجميل الوجه.'}
            </p>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="text-center space-y-3 pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            {lang === 'en'
              ? 'All consultations are conducted with complete privacy and strict medical follow-up.'
              : 'جميع الاستشارات تتم بسرية تامة ومتابعة طبية دقيقة.'}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm hover:underline"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            {lang === 'en' ? 'Chat with us on WhatsApp for instant assistance' : 'تحدث معنا على الواتساب للرد على استفسارك'}
          </a>
        </div>

      </div>
    </div>
  );
}
