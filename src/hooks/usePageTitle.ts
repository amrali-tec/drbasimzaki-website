'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export function usePageTitle(arTitle: string, enTitle: string) {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = lang === 'en' ? enTitle : arTitle;
  }, [lang, arTitle, enTitle]);
}
