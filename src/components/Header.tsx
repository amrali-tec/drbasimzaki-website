'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, Menu, X, ShieldAlert, Award, GraduationCap, Crown, Sparkles } from 'lucide-react';
import { DoctorInfo } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header({ doctor }: { doctor: DoctorInfo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, lang } = useLanguage();

  const primaryPhone = doctor.phones[0] || '01201134051';
  const whatsappUrl = `https://wa.me/${doctor.whatsapp}?text=${encodeURIComponent(
    lang === 'en'
      ? 'Hello Prof. Dr. Basim Zaki, I would like to book a consultation'
      : 'مرحباً أ.د. باسم زكي، أود الاستفسار وحجز موعد استشارة تجميلية'
  )}`;

  return (
    <header className="sticky top-0 z-50 shadow-2xl">
      
      {/* Top Academic & Trust Bar */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-b border-brand-500/20 py-1.5 px-4 sm:px-8 hidden sm:block">
        <div className="max-w-[1450px] mx-auto flex items-center justify-between text-xs text-slate-300">
          
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-brand-400 font-bold whitespace-nowrap">
              <GraduationCap className="w-3.5 h-3.5" />
              {t('topBarAcademic')}
            </span>
            <span className="text-slate-600">|</span>
            <span className="inline-flex items-center gap-1 text-amber-300 font-semibold whitespace-nowrap">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              {t('topBarCenter')}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] whitespace-nowrap">
            <span className="text-slate-400">{t('topBarExperience')}</span>
            <span className="text-slate-600">•</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1 font-bold">
              <Sparkles className="w-3 h-3" />
              {t('topBarBookConsultation')}
            </a>
            <span className="text-slate-600">•</span>
            <LanguageSwitcher />
          </div>

        </div>
      </div>

      {/* Main Glass Header */}
      <div className="glass-panel border-b border-brand-500/20 backdrop-blur-xl">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo & Doctor Portrait Avatar */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-brand-600 via-amber-300 to-brand-400 shadow-md group-hover:scale-105 transition-transform gold-border-glow shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900">
                  <Image
                    src="/Photos/1.jpeg"
                    alt={doctor.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-0.5 -left-0.5 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-navy-950" title="Available" />
              </div>

              <div className="whitespace-nowrap">
                <div className="font-black text-base sm:text-lg text-white group-hover:text-brand-400 transition-colors flex items-center gap-1.5">
                  {lang === 'en' ? 'Prof. Dr. Basim Zaki' : doctor.name}
                  <Award className="w-4 h-4 text-brand-400 shrink-0" />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Fully inline, no text breaking */}
            <nav className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-7 text-xs lg:text-sm font-bold text-slate-200">
              <Link href="/" className="hover:text-brand-400 transition-colors whitespace-nowrap py-1">
                {t('navHome')}
              </Link>
              <Link href="/services" className="hover:text-brand-400 transition-colors whitespace-nowrap py-1">
                {t('navServices')}
              </Link>
              <Link href="/cases" className="hover:text-brand-400 transition-colors whitespace-nowrap py-1">
                {t('navCases')}
              </Link>
              <Link href="/about" className="hover:text-brand-400 transition-colors whitespace-nowrap py-1">
                {t('navAbout')}
              </Link>
              <Link href="/clinics" className="hover:text-brand-400 transition-colors whitespace-nowrap py-1">
                {t('navClinics')}
              </Link>
              <Link href="/faq" className="hover:text-brand-400 transition-colors whitespace-nowrap py-1">
                {t('navFaq')}
              </Link>
              <Link href="/contact" className="hover:text-brand-400 transition-colors whitespace-nowrap py-1">
                {t('navContact')}
              </Link>
            </nav>

            {/* Desktop CTAs & Language Switcher */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md hover:shadow-emerald-600/30 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                {t('whatsappBook')}
              </a>

              <a
                href={`tel:${primaryPhone}`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-slate-950 font-black text-xs hover:brightness-110 transition-all shadow-md shadow-brand-500/20 whitespace-nowrap"
              >
                <Phone className="w-4 h-4 shrink-0" />
                {primaryPhone}
              </a>

              <LanguageSwitcher />

              <Link
                href="/admin/dashboard"
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
                title={t('navAdmin')}
              >
                <ShieldAlert className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Navigation Trigger */}
            <div className="flex md:hidden items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:bg-slate-800 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-brand-500/20 px-4 pt-3 pb-6 space-y-3 bg-navy-950/95 backdrop-blur-2xl">
            
            {/* Mobile Header Doctor Mini Card */}
            <div className="p-3 rounded-xl bg-navy-900 border border-brand-500/30 flex items-center gap-3 mb-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-500 shrink-0">
                <Image src="/Photos/1.jpeg" alt={doctor.name} fill className="object-cover object-top" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">{lang === 'en' ? 'Prof. Dr. Basim Zaki' : doctor.name}</h4>
              </div>
            </div>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-brand-400 font-medium text-sm"
            >
              {t('navHome')}
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-brand-400 font-medium text-sm"
            >
              {t('navServices')}
            </Link>
            <Link
              href="/cases"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-brand-400 font-medium text-sm"
            >
              {t('navCases')}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-brand-400 font-medium text-sm"
            >
              {t('navAbout')}
            </Link>
            <Link
              href="/clinics"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-brand-400 font-medium text-sm"
            >
              {t('navClinics')}
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-brand-400 font-medium text-sm"
            >
              {t('navFaq')}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-200 hover:text-brand-400 font-medium text-sm"
            >
              {t('navContact')}
            </Link>
            
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                {t('whatsappBook')}
              </a>
              <a
                href={`tel:${primaryPhone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-brand-500 text-slate-950 font-bold text-xs"
              >
                <Phone className="w-4 h-4" />
                {t('directCall')}: {primaryPhone}
              </a>
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-slate-900 text-slate-400 text-xs border border-slate-800"
              >
                <ShieldAlert className="w-4 h-4" />
                {t('navAdmin')}
              </Link>
            </div>
          </div>
        )}
      </div>

    </header>
  );
}
