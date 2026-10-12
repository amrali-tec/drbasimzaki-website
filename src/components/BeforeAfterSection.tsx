'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BeforeAfterItem } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Eye, X, MessageCircle } from 'lucide-react';

export default function BeforeAfterSection({
  cases,
  whatsappNumber,
}: {
  cases: BeforeAfterItem[];
  whatsappNumber: string;
}) {
  const [selectedCase, setSelectedCase] = useState<BeforeAfterItem | null>(null);
  const { lang } = useLanguage();

  return (
    <section id="before-after" className="py-20 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Real Patient Transformations' : 'معرض الحالات والنتائج الحقيقية'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === 'en' ? 'Before & After' : 'نتائج'}{' '}
            <span className="gold-gradient-text">{lang === 'en' ? 'Gallery' : 'قبل وبعد العمليات'}</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'en'
              ? 'Documented real patient results performed by Prof. Dr. Basim Zaki with high success rates and natural contours.'
              : 'نماذج واقعية وموثقة لعمليات التجميل ونحت القوام التي أجرها أ.د. باسم زكي بنسب نجاح عالية ونتائج طبيعية.'}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((item) => {
            const title = lang === 'en' ? item.titleEn || item.title : item.title;
            const desc = lang === 'en' ? item.descriptionEn || item.description : item.description;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedCase(item)}
                className="glass-panel glass-panel-hover p-3 rounded-2xl cursor-pointer group space-y-3"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 grid grid-cols-2 gap-0.5 p-0.5 border border-slate-800">
                  
                  {/* Before Image */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={item.beforeImage}
                      alt={`${title} - Before`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-amber-300 text-[10px] font-bold">
                      {lang === 'en' ? 'Before' : 'قبل'}
                    </span>
                  </div>

                  {/* After Image */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={item.afterImage}
                      alt={`${title} - After`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-600/80 text-white text-[10px] font-bold">
                      {lang === 'en' ? 'After' : 'بعد'}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-3 rounded-full bg-brand-500 text-slate-950 shadow-lg">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-1 space-y-1">
                  <h3 className="font-bold text-white text-sm group-hover:text-brand-300 transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal Popup Viewer */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl glass-panel p-6 rounded-3xl space-y-6 border border-brand-500/30">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 left-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-white text-center">
              {lang === 'en' ? selectedCase.titleEn || selectedCase.title : selectedCase.title}
            </h3>

            <div className="grid grid-cols-2 gap-4 aspect-[16/9] relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-1">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={selectedCase.beforeImage}
                  alt="Before Surgery"
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded bg-black/80 text-amber-300 text-xs font-bold">
                  {lang === 'en' ? 'Before Surgery' : 'قبل العملية'}
                </span>
              </div>
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={selectedCase.afterImage}
                  alt="After Surgery"
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded bg-emerald-600 text-white text-xs font-bold">
                  {lang === 'en' ? 'After Surgery' : 'بعد العملية'}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm text-center">
              {lang === 'en' ? selectedCase.descriptionEn || selectedCase.description : selectedCase.description}
            </p>

            <div className="flex justify-center pt-2">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  lang === 'en'
                    ? `Hello Prof. Dr. Basim Zaki, I would like to inquire about a similar case to (${selectedCase.titleEn || selectedCase.title})`
                    : `مرحباً د. باسم زكي، أود الاستفسار عن حالة مشابها لـ (${selectedCase.title})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                {lang === 'en' ? 'Inquire About a Similar Case via WhatsApp' : 'استفسر عن حالة مشابهة عبر الواتساب'}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
