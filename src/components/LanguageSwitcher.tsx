'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel hover:bg-slate-800 text-slate-200 hover:text-brand-300 font-bold text-xs transition-all border border-brand-500/30 shrink-0 ${className}`}
      title={lang === 'ar' ? 'Switch to English' : 'التغيير إلى اللغة العربية'}
    >
      <Globe className="w-3.5 h-3.5 text-brand-400 shrink-0" />
      <span>{lang === 'ar' ? 'English 🇬🇧' : 'العربية 🇪🇬'}</span>
    </button>
  );
}
