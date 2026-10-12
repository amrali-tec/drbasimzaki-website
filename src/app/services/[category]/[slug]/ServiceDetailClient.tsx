'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ServiceItem, CategoryItem, DoctorInfo } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import { ArrowRight, ArrowLeft, CheckCircle2, MessageCircle, Phone, Sparkles, ShieldCheck, HelpCircle, Award, Crown } from 'lucide-react';

export default function ServiceDetailClient({
  service,
  cat,
  doctor,
}: {
  service: ServiceItem;
  cat?: CategoryItem;
  doctor: DoctorInfo;
}) {
  const { lang, t } = useLanguage();

  const title = lang === 'en' ? service.titleEn || service.title : service.title;
  usePageTitle(`${title} | أ.د. باسم زكي`, `${title} | Prof. Dr. Basim Zaki`);
  const shortDesc = lang === 'en' ? service.shortDescriptionEn || service.shortDescription : service.shortDescription;
  const fullDesc = lang === 'en' ? service.fullDescriptionEn || service.fullDescription : service.fullDescription;
  const benefits = lang === 'en' ? service.benefitsEn || service.benefits : service.benefits;
  const catTitle = lang === 'en' ? cat?.titleEn || cat?.title || 'Plastic Surgery' : cat?.title || 'جراحة تجميل متخصصة';
  const docName = lang === 'en' ? doctor.nameEn || 'Prof. Dr. Basim Mohamed Zaki' : doctor.name;
  const docTitle = lang === 'en' ? doctor.titleEn || doctor.title : doctor.title;

  const primaryPhone = doctor.phones[0] || '01201134051';
  const whatsappUrl = `https://wa.me/${doctor.whatsapp}?text=${encodeURIComponent(
    lang === 'en'
      ? `Hello Prof. Dr. Basim Zaki, I would like to book a consultation for (${title})`
      : `مرحباً د. باسم زكي، أود الاستفسار وحجز موعد استشارة لخدمة (${title})`
  )}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-brand-400">{t('navHome')}</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-brand-400">{catTitle}</Link>
        <span>/</span>
        <span className="text-brand-400 font-semibold">{title}</span>
      </nav>

      {/* Header Hero Banner */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl space-y-6 border border-brand-500/30 gold-border-glow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/15 text-brand-400 text-xs font-bold border border-brand-500/30">
            <Sparkles className="w-4 h-4" />
            <span>{catTitle}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold bg-navy-900/80 px-3 py-1 rounded-full border border-amber-500/30">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'en' ? `Supervised by: ${docName}` : `إشراف وتنفيذ: ${docName}`}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          {title}
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          {shortDesc}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl hover:shadow-emerald-600/30"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            {lang === 'en' ? 'Book Consultation via WhatsApp' : 'حجز موعد استشارة مع د. باسم زكي عبر الواتساب'}
          </a>

          <a
            href={`tel:${primaryPhone}`}
            className="flex items-center gap-2 px-6 py-4 rounded-full glass-panel hover:bg-slate-800 text-white font-bold text-sm border border-slate-700"
          >
            <Phone className="w-4 h-4 text-brand-400" />
            {t('directCall')}: {primaryPhone}
          </a>
        </div>
      </div>

      {/* Doctor Expertise Banner on Service Page */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-500/40 bg-gradient-to-r from-navy-900 via-navy-950 to-navy-900 space-y-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-brand-400 gold-border-glow shrink-0">
            <Image
              src="/Photos/1.jpeg"
              alt={docName}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-black text-white">{docName}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30">
                {lang === 'en' ? 'Ain Shams University' : 'جامعة عين شمس'}
              </span>
            </div>
            <p className="text-xs text-brand-300 font-bold">{docTitle}</p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              {lang === 'en'
                ? `"${title} procedure is performed using the latest FDA-approved international technologies to ensure ultimate natural aesthetic symmetry, medical safety, and rapid recovery."`
                : `"عملية (${title}) تتم باستخدام أحدث التقنيات الطبية المعتمدة عالمياً لضمان أعلى مستويات الدقة، التناسق الطبيعي، وأقصر فترة تعافٍ ممكنة."`}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Content Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-8">
          {/* Full Overview */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-400" />
              {lang === 'en' ? `Medical & Surgical Overview for ${title}` : `الشرح الطبي الدقيق لإجراء ${title}`}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {fullDesc}
            </p>
          </div>

          {/* Benefits */}
          {benefits && benefits.length > 0 && (
            <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                {lang === 'en' ? `Key Advantages of ${title} with Prof. Basim Zaki` : `مميزات إجراء ${title} مع أ.د. باسم زكي`}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-navy-900/60 p-3 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Service Specific FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-400" />
                {lang === 'en' ? `Frequently Asked Questions regarding ${title}` : `أسئلة شائعة حول ${title}`}
              </h2>
              <div className="space-y-4">
                {service.faqs.map((faq, idx) => {
                  const q = lang === 'en' ? faq.questionEn || faq.question : faq.question;
                  const a = lang === 'en' ? faq.answerEn || faq.answer : faq.answer;
                  return (
                    <div key={idx} className="bg-navy-900/80 p-4 rounded-xl space-y-2 border border-slate-800">
                      <h3 className="font-bold text-white text-sm">{q}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{a}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Doctor & Booking Card */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-4 border border-brand-500/30 gold-border-glow">
            <div className="text-center space-y-2">
              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-brand-400">
                <Image src="/Photos/1.jpeg" alt={docName} fill className="object-cover object-top" />
              </div>
              <h3 className="font-bold text-white text-base">
                {lang === 'en' ? 'Direct Personal Consultation' : 'استشارة شخصية مباشرة'}
              </h3>
              <p className="text-xs text-brand-300">
                {lang === 'en' ? 'Prof. Basim Zaki personally evaluates your case' : 'أ.د. باسم زكي يقيم حالتك بالكامل'}
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed text-center">
              {lang === 'en'
                ? 'Contact the center to schedule your private consultation at your preferred branch (Nasr City, Heliopolis, or Dokki).'
                : 'تواصل مع المركز لحجز استشارتك الخاصة في الفرع الأنسب لك (المهندسين، التجمع الخامس، أو مصر الجديدة).'}
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                {lang === 'en' ? 'Book via WhatsApp Directly' : 'حجز عبر الواتساب مباشر'}
              </a>
              <a
                href={`tel:${primaryPhone}`}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-slate-950 font-bold text-xs"
              >
                <Phone className="w-4 h-4" />
                {t('directCall')}: {primaryPhone}
              </a>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center space-y-2 border border-slate-800">
            <Crown className="w-6 h-6 text-amber-400 mx-auto" />
            <p className="text-xs text-slate-400">Cairo Cosmo Center</p>
            <h4 className="font-bold text-white text-xs">
              {lang === 'en' ? 'Under Direct Medical Leadership of Prof. Basim Zaki' : 'تحت الإدارة الفنية والأكاديمية لـ د. باسم زكي'}
            </h4>
          </div>
        </div>

      </div>

    </div>
  );
}
