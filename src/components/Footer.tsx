'use client';

import React from 'react';
import Link from 'next/link';
import { DoctorInfo } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { Phone, MapPin, Facebook, Instagram, Youtube, ArrowUpRight } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Footer({ doctor }: { doctor: DoctorInfo }) {
  const { lang } = useLanguage();
  const currentYear = new Date().getFullYear();
  const docName = lang === 'en' ? doctor.nameEn || 'Prof. Dr. Basim Mohamed Zaki' : doctor.name;

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Doctor Bio & Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold">
                {lang === 'en' ? 'BZ' : 'بـز'}
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{docName}</h3>
                <p className="text-xs text-brand-400 font-medium">
                  {lang === 'en' ? 'Ain Shams University' : 'جامعة عين شمس'}
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              {lang === 'en'
                ? 'Professor of Plastic Surgery at Ain Shams University Faculty of Medicine, specializing in 4D body sculpting, facial aesthetics, and breast surgery.'
                : 'أستاذ جراحة التجميل بكلية الطب جامعة عين شمس، متخصص في جراحات ونحت وتنسيق القوام وتجميل الوجه والثدي.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {doctor.facebook && (
                <a
                  href={doctor.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full glass-panel hover:text-brand-400 hover:border-brand-500/50 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {doctor.instagram && (
                <a
                  href={doctor.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full glass-panel hover:text-brand-400 hover:border-brand-500/50 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {doctor.youtube && (
                <a
                  href={doctor.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full glass-panel hover:text-brand-400 hover:border-brand-500/50 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2 inline-block">
              {lang === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services" className="hover:text-brand-400 transition-colors">
                  {lang === 'en' ? 'Body Sculpting & Lipo' : 'جراحات وتنسيق القوام'}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-400 transition-colors">
                  {lang === 'en' ? 'Breast Augmentation & Lift' : 'تجميل وتكبير الثدي'}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-400 transition-colors">
                  {lang === 'en' ? 'Rhinoplasty & Facelift' : 'تجميل الأنف وشد الوجه'}
                </Link>
              </li>
              <li>
                <Link href="/cases" className="hover:text-brand-400 transition-colors">
                  {lang === 'en' ? 'Before & After Gallery' : 'معرض نتائج قبل وبعد'}
                </Link>
              </li>
              <li>
                <Link href="/clinics" className="hover:text-brand-400 transition-colors">
                  {lang === 'en' ? 'Clinic Branches & Contact' : 'مواقع وتليفونات العيادات'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinics Contact Numbers */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2 inline-block">
              {lang === 'en' ? 'Clinics & Contact Numbers' : 'أرقام العيادات والتواصل'}
            </h4>
            <ul className="space-y-2 text-xs">
              {doctor.phones.map((phone, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  <a href={`tel:${phone}`} className="hover:text-brand-300 font-semibold dir-ltr">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="pt-2 text-[11px] text-slate-400">
                {lang === 'en' ? 'Official Contact Email:' : 'بريد التواصل الرسمي:'} <br />
                <span className="text-white font-mono">{doctor.email}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Main Location */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2 inline-block">
              {lang === 'en' ? 'Main Headquarters' : 'المقر الرئيسي'}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>
                  {lang === 'en'
                    ? '39 Shams El-Din Al-Dahabi St, Golf Area, Nasr City, Cairo'
                    : '39 شارع شمس الدين الذهبي - أرض الجولف - مدينة نصر - القاهرة'}
                </span>
              </div>
              <div className="pt-2">
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-[11px]"
                >
                  <span>{lang === 'en' ? 'Admin Dashboard Login' : 'دخول لوحة التحكم (الأدمن)'}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-slate-800/80 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} {docName}. {lang === 'en' ? 'All Rights Reserved.' : 'جميع الحقوق محفوظة.'}</p>
          <LanguageSwitcher />
          <p className="text-[11px]">
            {lang === 'en'
              ? 'Website optimized for top Google Search & Ads standards.'
              : 'موقع مهيأ ومطور بأعلى معايير السيو (SEO) وإعلانات جوجل.'}
          </p>
        </div>

      </div>
    </footer>
  );
}
