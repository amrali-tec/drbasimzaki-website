'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CategoryItem, ServiceItem } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { Activity, Heart, Sparkles, UserCheck, Smile, ArrowLeft, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-6 h-6 text-brand-400" />,
  Heart: <Heart className="w-6 h-6 text-brand-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-brand-400" />,
  UserCheck: <UserCheck className="w-6 h-6 text-brand-400" />,
  Smile: <Smile className="w-6 h-6 text-brand-400" />,
};

export default function ServicesSection({
  categories,
  services,
  whatsappNumber,
}: {
  categories: CategoryItem[];
  services: ServiceItem[];
  whatsappNumber: string;
}) {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>('all');
  const { lang } = useLanguage();

  const filteredServices =
    activeCategorySlug === 'all'
      ? services
      : services.filter((s) => s.categorySlug === activeCategorySlug);

  return (
    <section id="services" className="py-20 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Comprehensive Medical & Aesthetic Services' : 'خدمات طبية وتجميلية متكاملة'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === 'en' ? 'Plastic Surgery & Body Sculpting' : 'تخصصات وخدمات'}{' '}
            <span className="gold-gradient-text">{lang === 'en' ? 'Procedures' : 'جراحة التجميل'}</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'en'
              ? 'Explore our comprehensive surgical and non-surgical procedures tailored for 4D Vaser sculpting, breast aesthetics, rhinoplasty, and facial rejuvenation.'
              : 'تصفح قائمة التخصصات الشاملة المصممة خصيصاً لنحت القوام وتجميل الوجه والثدي بأحدث التقنيات العالمية الآمنة.'}
          </p>
        </div>

        {/* Categories Tabs Filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          <button
            onClick={() => setActiveCategorySlug('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeCategorySlug === 'all'
                ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-slate-950 shadow-md'
                : 'glass-panel text-slate-300 hover:text-white hover:border-brand-500/40'
            }`}
          >
            {lang === 'en' ? 'All Procedures' : 'جميع الخدمات'}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategorySlug(cat.slug)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeCategorySlug === cat.slug
                  ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-slate-950 shadow-md'
                  : 'glass-panel text-slate-300 hover:text-white hover:border-brand-500/40'
              }`}
            >
              {iconMap[cat.icon] || <Sparkles className="w-4 h-4" />}
              <span>{lang === 'en' ? cat.titleEn || cat.title : cat.title}</span>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const servTitle = lang === 'en' ? service.titleEn || service.title : service.title;
            const servDesc = lang === 'en' ? service.shortDescriptionEn || service.shortDescription : service.shortDescription;
            const servBenefits = lang === 'en' ? service.benefitsEn || service.benefits : service.benefits;

            const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              lang === 'en'
                ? `Hello Prof. Dr. Basim Zaki, I would like to inquire about (${servTitle})`
                : `مرحباً د. باسم زكي، أود الاستفسار عن تفاصيل (${servTitle})`
            )}`;

            return (
              <div
                key={service.id}
                className="glass-panel glass-panel-hover p-4 rounded-2xl flex flex-col justify-between overflow-hidden group"
              >
                <div className="space-y-4">
                  {/* Service Image Banner */}
                  {service.image && (
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                      <Image
                        src={service.image}
                        alt={servTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60" />
                      <span className="absolute bottom-2 right-2 text-[10px] px-2.5 py-0.5 rounded-full bg-black/70 text-brand-300 font-medium">
                        {lang === 'en' ? 'Advanced Surgery' : 'تجميل متطور'}
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white group-hover:text-brand-300 transition-colors">
                    {servTitle}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                    {servDesc}
                  </p>

                  {/* Key Benefits */}
                  {servBenefits && servBenefits.length > 0 && (
                    <ul className="space-y-1.5 pt-2 border-t border-slate-800">
                      {servBenefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Service Card Footer Buttons */}
                <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between gap-2">
                  <Link
                    href={`/services/${service.categorySlug}/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    <span>{lang === 'en' ? 'Procedure Details' : 'تفاصيل الخدمة'}</span>
                    {lang === 'en' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                  </Link>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white text-xs font-semibold transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>{lang === 'en' ? 'Quick Inquiry' : 'استفسار سريع'}</span>
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
