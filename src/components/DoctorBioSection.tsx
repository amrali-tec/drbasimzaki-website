'use client';

import React from 'react';
import Image from 'next/image';
import { DoctorInfo } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { Award, GraduationCap, CheckCircle2, Stethoscope, ShieldCheck } from 'lucide-react';

export default function DoctorBioSection({ doctor }: { doctor: DoctorInfo }) {
  const { lang } = useLanguage();

  const name = lang === 'en' ? doctor.nameEn || 'Prof. Dr. Basim Mohamed Zaki' : doctor.name;
  const bio = lang === 'en' ? doctor.bioEn || doctor.bio : doctor.bio;

  return (
    <section id="about" className="py-20 bg-navy-950 relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden glass-panel p-2 gold-border-glow">
              <div className="w-full h-full relative rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src="/Photos/2.jpeg"
                  alt={name}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-70" />
              </div>
            </div>

            {/* Floating University Badge */}
            <div className="absolute -bottom-5 left-4 glass-panel p-4 rounded-2xl flex items-center gap-3 border border-brand-500/40 shadow-xl bg-navy-900/90">
              <div className="p-3 rounded-xl bg-brand-500/20 text-brand-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {lang === 'en' ? 'Faculty of Medicine - Ain Shams Univ.' : 'كلية الطب - جامعة عين شمس'}
                </h4>
                <p className="text-xs text-brand-300">
                  {lang === 'en' ? 'Professor of Plastic & Reconstructive Surgery' : 'أستاذ جراحة التجميل والإصلاح'}
                </p>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
              <Award className="w-4 h-4" />
              <span>{lang === 'en' ? 'Academic Biography & Mastery' : 'السيرة الذاتية والخبرة الأكاديمية'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {lang === 'en' ? 'About' : 'عن'} <span className="gold-gradient-text">{name}</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              {bio}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="glass-panel p-4 rounded-xl space-y-2 border border-slate-800">
                <div className="flex items-center gap-2 text-brand-400 font-bold text-sm">
                  <Stethoscope className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Academic Status' : 'الدرجة الأكاديمية'}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {lang === 'en'
                    ? 'Professor of Plastic & Reconstructive Surgery at Ain Shams University Faculty of Medicine.'
                    : 'أستاذ جراحة التجميل والإصلاح في واحدة من أعرق الكليات الطبية بالمشرق العربي (جامعة عين شمس).'}
                </p>
              </div>

              <div className="glass-panel p-4 rounded-xl space-y-2 border border-slate-800">
                <div className="flex items-center gap-2 text-brand-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Surgical Philosophy' : 'الفلسفة الجراحية'}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {lang === 'en'
                    ? 'Blending medical precision and absolute safety with natural, unexaggerated aesthetic beauty.'
                    : 'الدمج الدقيق بين الأمان الطبي المطلق وتحقيق النتائج التجميلية الطبيعية للغاية دون مبالغة.'}
                </p>
              </div>
            </div>

            <ul className="space-y-2.5 pt-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Member of the Egyptian Society of Plastic & Reconstructive Surgeons (ESPRS).'
                    : 'عضو الجمعية المصرية لجراحي التجميل والإصلاح (ESPRS).'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Specialized in 4D Vaser High-Definition Muscle Sculpting.'
                    : 'متخصص في تقنيات الفيزر 4D ونحت العضلات عالي الدقة.'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Over 8,500+ successful plastic surgeries with high patient satisfaction.'
                    : 'أجرى أكثر من 8500 عملية جراحية ناجحة بنسب أمان وتفاعل فائقة.'}
                </span>
              </li>
            </ul>

          </div>

        </div>
      </div>
    </section>
  );
}
