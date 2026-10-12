'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, MessageCircle } from 'lucide-react';
import { DoctorInfo } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';

export default function FloatingCta({ doctor }: { doctor: DoctorInfo }) {
  const { lang, t } = useLanguage();
  const primaryPhone = doctor.phones[0] || '01201134051';
  const docName = lang === 'en' ? doctor.nameEn || 'Prof. Dr. Basim Zaki' : doctor.name;
  const whatsappUrl = `https://wa.me/${doctor.whatsapp}?text=${encodeURIComponent(
    lang === 'en'
      ? 'Hello Prof. Dr. Basim Zaki, I would like to book a consultation'
      : 'مرحباً د. باسم زكي، أود حجز موعد استشارة تجميلية'
  )}`;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-2.5 glass-panel border-t border-brand-500/30 md:hidden bg-navy-950/95 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* Doctor Avatar Thumbnail */}
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-brand-400 shrink-0 gold-border-glow">
          <Image
            src="/Photos/1.jpeg"
            alt={docName}
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-2 flex-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{lang === 'en' ? 'WhatsApp' : 'واتساب د. باسم'}</span>
          </a>

          <a
            href={`tel:${primaryPhone}`}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-slate-950 font-bold text-xs shadow-lg"
          >
            <Phone className="w-4 h-4" />
            <span>{lang === 'en' ? 'Call Now' : 'اتصال مباشر'}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
