'use client';

import React from 'react';
import Image from 'next/image';
import { DoctorInfo } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { Award, GraduationCap, ShieldCheck, Star, Stethoscope, CheckCircle2, Quote, Crown, Sparkles } from 'lucide-react';

export default function DoctorShowcaseSection({ doctor }: { doctor: DoctorInfo }) {
  const { lang, t } = useLanguage();
  
  const doctorPhotos = [
    '/Photos/1.jpeg',
    '/Photos/2.jpeg',
    '/Photos/3.jpeg',
    '/Photos/4.jpeg',
  ];

  const docName = lang === 'en' ? doctor.nameEn || 'Prof. Dr. Basim Mohamed Zaki' : doctor.name;
  const docTitle = lang === 'en' ? doctor.titleEn || doctor.title : doctor.title;

  return (
    <section className="py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 relative border-y border-brand-500/20">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Top Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs sm:text-sm font-bold shadow-md">
            <Award className="w-4 h-4" />
            <span>{docName}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {lang === 'en' ? (
              <>Leading Authority in <span className="gold-gradient-text">Plastic Surgery & Body Sculpting</span></>
            ) : (
              <>قامة طبية وأكاديمية في <span className="gold-gradient-text">جراحة التجميل ونحت القوام</span></>
            )}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'en'
              ? 'Over 22 years of surgical excellence in high-definition body sculpting, rhinoplasty, and plastic surgery at Ain Shams University Faculty of Medicine and Cairo Cosmo Center.'
              : 'خبرة أكثر من 22 عاماً في إجراء أعقد عمليات التجميل وتدريس جراحة التجميل بكلية الطب جامعة عين شمس، ورئيس مجلس إدارة مركز كايرو كوزمو.'}
          </p>
        </div>

        {/* Highlight Grid: Doctor Photos & Credentials */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Doctor Photo Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-panel p-1 border border-brand-500/30 gold-border-glow">
                <Image
                  src={doctorPhotos[0]}
                  alt={docName}
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden glass-panel p-1 border border-slate-800">
                <Image
                  src={doctorPhotos[1]}
                  alt={docName}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="relative aspect-square rounded-2xl overflow-hidden glass-panel p-1 border border-slate-800">
                <Image
                  src={doctorPhotos[2]}
                  alt={docName}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-panel p-1 border border-brand-500/30 gold-border-glow">
                <Image
                  src={doctorPhotos[3]}
                  alt={docName}
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Badge overlay center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="glass-panel p-4 rounded-2xl border border-brand-500/50 shadow-2xl bg-navy-950/90 text-center space-y-1 backdrop-blur-xl">
                <div className="flex justify-center text-amber-400">
                  <Crown className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-white">
                  {lang === 'en' ? 'Chairman & Founder' : 'رئيس مجلس الإدارة'}
                </p>
                <p className="text-[11px] text-brand-300">
                  {lang === 'en' ? 'Cairo Cosmo Center' : 'كايرو كوزمو سنتر'}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Academic Milestones & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quote Card */}
            <div className="glass-panel p-6 rounded-2xl border border-brand-500/30 space-y-3 relative">
              <Quote className="w-8 h-8 text-brand-500/30 absolute top-4 left-4 rotate-180" />
              <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed italic">
                {lang === 'en'
                  ? '"Our goal in every procedure is not merely dynamic aesthetic enhancement, but achieving absolute natural harmony while upholding the highest international medical safety standards."'
                  : '"هدفنا في كل جراحة ليس مجرد إجراء التجميل، بل تحقيق التناغم الطبيعي الكامل للجسم والوجه مع الالتزام المطلق بقمة الأمان الطبي."'}
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-brand-400 font-bold">
                <span>{docName}</span>
                <span>{lang === 'en' ? 'Prof. Ain Shams Univ.' : 'أستاذ طب عين شمس'}</span>
              </div>
            </div>

            {/* Credential Cards */}
            <div className="space-y-3">
              <div className="glass-panel p-4 rounded-xl flex items-start gap-3 border border-slate-800 hover:border-brand-500/40 transition-colors">
                <div className="p-2.5 rounded-xl bg-brand-500/20 text-brand-400 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {lang === 'en' ? 'Professor of Plastic Surgery - Ain Shams University' : 'أستاذ جراحة التجميل - عين شمس'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {lang === 'en'
                      ? 'Professor & Department Supervisor at Ain Shams University Faculty of Medicine, directing PhD research on VASER 4D Lipo and Rhinoplasty.'
                      : 'أستاذ ورئيس وحدة بكلية الطب جامعة عين شمس، المشرف على أبحاث الدكتوراة في نحت القوام بالفيزر وتجميل الأنف.'}
                  </p>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl flex items-start gap-3 border border-slate-800 hover:border-brand-500/40 transition-colors">
                <div className="p-2.5 rounded-xl bg-brand-500/20 text-brand-400 shrink-0">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {lang === 'en' ? 'Chairman of Cairo Cosmo Center' : 'رئيس مجلس إدارة كايرو كوزمو سنتر'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {lang === 'en'
                      ? 'Leading Cairo Cosmo Center equipped with state-of-the-art VASER 4D & J-Plasma technology in Egypt.'
                      : 'إدارة وإشراف على الصرح التجميلي الأحدث المجهز بالفيزر 4D والجي بلازما في مصر.'}
                  </p>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl flex items-start gap-3 border border-slate-800 hover:border-brand-500/40 transition-colors">
                <div className="p-2.5 rounded-xl bg-brand-500/20 text-brand-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {lang === 'en' ? 'Member of ESPRS & International Societies' : 'عضو الجمعية المصرية لجراحي التجميل (ESPRS)'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {lang === 'en'
                      ? 'Keynote speaker and instructor at international medical conferences on aesthetic and reconstructive surgery.'
                      : 'مشارك دائم ومُحاضر رئيسي بالمؤتمرات الطبية الدولية لجراحة التجميل ونحت الجسم.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Consultation Badge */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${doctor.whatsapp}?text=${encodeURIComponent(
                  lang === 'en'
                    ? 'Hello Prof. Dr. Basim Zaki, I would like to book a personal consultation with you'
                    : 'مرحباً د. باسم زكي، أود حجز موعد استشارة شخصية مع حضرتك'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-slate-950 font-black text-sm hover:brightness-110 transition-all shadow-lg shadow-brand-500/20"
              >
                <Sparkles className="w-4 h-4" />
                {lang === 'en' ? 'Book Personal Consultation with Dr. Basim' : 'احجز استشارتك الشخصية مع الدكتور مباشرة'}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
