'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DoctorInfo } from '@/lib/dataStore';
import { useLanguage } from '@/context/LanguageContext';
import { Award, GraduationCap, ShieldCheck, Star, Video, BookOpen, Crown, CheckCircle2, Quote } from 'lucide-react';

export default function DoctorPhilosophyAndMedia({ doctor }: { doctor: DoctorInfo }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const { t, lang } = useLanguage();

  const doctorPhotos = [
    {
      src: '/Photos/1.jpeg',
      title: lang === 'en' ? 'Prof. Basim Zaki at Cairo Cosmo Center' : 'أ.د. باسم زكي في المركز الطبي',
      desc: lang === 'en' ? 'Consultations & Vaser 4D Body Sculpting' : 'استشارات ونحت القوام بالفيزر',
      tag: lang === 'en' ? 'Cairo Cosmo Center' : 'مركز كايرو كوزمو',
    },
    {
      src: '/Photos/2.jpeg',
      title: lang === 'en' ? 'Aesthetic Examination Session' : 'جلسة كشف واستشارة تجميلية',
      desc: lang === 'en' ? 'Customized Surgical Treatment Planning' : 'تحديد خطة العلاج والتجميل',
      tag: lang === 'en' ? 'Cosmetic Clinic' : 'عيادات التجميل',
    },
    {
      src: '/Photos/3.jpeg',
      title: lang === 'en' ? 'Chairing Medical Congresses' : 'رئاسة المؤتمرات الطبية',
      desc: lang === 'en' ? 'Keynote Lecturer on Advanced Surgery' : 'مُحاضر في أحدث تقنيات التجميل',
      tag: lang === 'en' ? 'International Congresses' : 'المؤتمرات الدولية',
    },
    {
      src: '/Photos/4.jpeg',
      title: lang === 'en' ? 'Ain Shams University Faculty of Medicine' : 'كلية الطب جامعة عين شمس',
      desc: lang === 'en' ? 'Supervising Master & Doctoral Research' : 'الإشراف على الأبحاث الأكاديمية',
      tag: lang === 'en' ? 'Ain Shams Univ.' : 'جامعة عين شمس',
    },
  ];

  const mediaHighlights = [
    {
      title: lang === 'en' ? 'TV Interview: 4D Vaser Liposuction & Sculpting' : 'لقاء تلفزيوني: أحدث تقنيات الفيزر 4D ونحت القوام',
      tag: lang === 'en' ? 'Media Coverage' : 'ميديا ومؤتمرات',
      duration: lang === 'en' ? 'Watch Coverage' : 'شاهد التغطية',
      icon: Video,
    },
    {
      title: lang === 'en' ? 'Research Paper: Safety in Rhinoplasty & Body Contouring' : 'بحث علمي: الأمان في جراحات التجميل وتجميل الأنف',
      tag: lang === 'en' ? 'Ain Shams Univ.' : 'جامعة عين شمس',
      duration: lang === 'en' ? 'Published Internationally' : 'نُشر دولياً',
      icon: BookOpen,
    },
    {
      title: lang === 'en' ? 'Keynote Lecture at International Surgery Congress (ESPRS)' : 'محاضرة المؤتمر الدولي لجراحي التجميل (ESPRS)',
      tag: lang === 'en' ? 'Medical Congress' : 'مؤتمر طبي',
      duration: lang === 'en' ? 'Keynote Speaker' : 'مُحاضر رئيسي',
      icon: Crown,
    },
  ];

  const docName = lang === 'en' ? doctor.nameEn || 'Prof. Dr. Basim Mohamed Zaki' : doctor.name;

  return (
    <section className="py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden border-t border-brand-500/20">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs sm:text-sm font-bold shadow-md">
            <Crown className="w-4 h-4 text-brand-400" />
            <span>{t('philosophyTag')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {t('philosophyTitlePrefix')} <span className="gold-gradient-text">{docName}</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('philosophyDesc')}
          </p>
        </div>

        {/* Doctor Photo Showcase & Philosophy split */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Photo Gallery Switcher (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Featured Photo Frame */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden glass-panel p-2 gold-border-glow shadow-2xl">
              <div className="w-full h-full relative rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src={doctorPhotos[activePhoto].src}
                  alt={docName}
                  fill
                  className="object-cover object-top transition-all duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                
                {/* Photo Caption Overlay */}
                <div className="absolute bottom-4 inset-x-4 glass-panel p-4 rounded-xl space-y-1 border border-brand-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-400">{doctorPhotos[activePhoto].tag}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-semibold">
                      {lang === 'en' ? 'Verified Photo' : 'صورة موثقة'}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base">{doctorPhotos[activePhoto].title}</h3>
                  <p className="text-xs text-slate-300">{doctorPhotos[activePhoto].desc}</p>
                </div>
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-4 gap-3">
              {doctorPhotos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activePhoto === idx
                      ? 'border-brand-500 scale-105 shadow-lg shadow-brand-500/30 ring-2 ring-brand-400/40'
                      : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                  }`}
                >
                  <Image src={photo.src} alt={photo.title} fill className="object-cover object-top" />
                </button>
              ))}
            </div>

          </div>

          {/* Detailed Pillars & Philosophy Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Academic Credential Header Box */}
            <div className="glass-panel p-6 rounded-2xl border border-brand-500/40 space-y-4 bg-navy-900/80">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-brand-500/20 text-brand-400 shrink-0">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs text-brand-400 font-bold">
                    {lang === 'en' ? 'Faculty of Medicine - Ain Shams University' : 'كلية الطب - جامعة عين شمس'}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'en' ? 'Professor of Plastic & Reconstructive Surgery' : 'أستاذ جراحة التجميل والإصلاح'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {lang === 'en'
                      ? 'Leading academic generations and supervising doctoral dissertations at one of the oldest medical faculties in the Middle East.'
                      : 'يقود الأستاذ الدكتور باسم زكي الأجيال الطبية في واحدة من أقدم وأعرق كليات الطب بالمشرق العربي.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Box */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3 relative">
              <Quote className="w-10 h-10 text-brand-500/20 absolute top-4 left-4 rotate-180" />
              <h4 className="text-xs font-bold text-brand-400">
                {lang === 'en' ? "Prof. Basim Zaki's Pledge to Patients:" : 'عهد أ.د. باسم زكي لمرضاه:'}
              </h4>
              <p className="text-slate-200 text-sm sm:text-base font-semibold leading-relaxed italic">
                {t('doctorQuote')}
              </p>
            </div>

            {/* Key Advantages Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              
              <div className="glass-panel p-4 rounded-xl space-y-2 border border-slate-800 hover:border-brand-500/30 transition-colors">
                <div className="flex items-center gap-2 text-brand-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>{lang === 'en' ? '4D Precision Body Sculpting' : 'دقة نحت القوام 4D'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en'
                    ? 'Utilizing latest 4D Vaser and J-Plasma energy for athletic muscle definition and skin tightening.'
                    : 'تطبيق أحدث تقنيات الفيزر عالي الدقة والجي بلازما لشد الجلد ورسم العضلات بدون ترهل.'}
                </p>
              </div>

              <div className="glass-panel p-4 rounded-xl space-y-2 border border-slate-800 hover:border-brand-500/30 transition-colors">
                <div className="flex items-center gap-2 text-brand-400 font-bold text-sm">
                  <Star className="w-5 h-5 shrink-0 text-amber-400 fill-amber-400" />
                  <span>{lang === 'en' ? 'Highest Medical Safety' : 'أعلى معدلات الأمان'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en'
                    ? 'Performing all surgeries in top accredited hospitals under consultant anesthesia care.'
                    : 'إجراء كل العمليات داخل أرقى المستشفيات واللمستشفيات المعتمدة وتحت إشراف استشاريي التخدير.'}
                </p>
              </div>

              <div className="glass-panel p-4 rounded-xl space-y-2 border border-slate-800 hover:border-brand-500/30 transition-colors">
                <div className="flex items-center gap-2 text-brand-400 font-bold text-sm">
                  <Award className="w-5 h-5 shrink-0" />
                  <span>{lang === 'en' ? 'Cairo Cosmo Chairmanship' : 'رئاسة كايرو كوزمو'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en'
                    ? 'Full clinical direction of Cairo Cosmo Center, equipped with state-of-the-art medical technology.'
                    : 'إشراف ورئاسة مجلس إدارة صرح كايرو كوزمو المجهز بكافة الأجهزة والأجنحة الفاخرة.'}
                </p>
              </div>

              <div className="glass-panel p-4 rounded-xl space-y-2 border border-slate-800 hover:border-brand-500/30 transition-colors">
                <div className="flex items-center gap-2 text-brand-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{lang === 'en' ? 'Personal Post-Op Follow-up' : 'متابعة شخصية مستمرة'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en'
                    ? 'Dedicated medical team and direct personal follow-up by Prof. Basim Zaki throughout recovery.'
                    : 'فريق طبي متخصص ومتابعة شخصية من الدكتور باسم زكي خطوة بخطوة خلال رحلة الاستشفاء.'}
                </p>
              </div>

            </div>

            {/* Media Highlights Row */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-400 mb-3">
                {lang === 'en' ? 'Media & Academic Presence:' : 'حضور إعلامي وأكاديمي موثق:'}
              </h4>
              <div className="grid sm:grid-cols-3 gap-3">
                {mediaHighlights.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={idx} className="glass-panel p-3 rounded-xl border border-slate-800 space-y-1.5 bg-navy-950/70">
                      <div className="flex items-center justify-between text-brand-400">
                        <ItemIcon className="w-4 h-4" />
                        <span className="text-[10px] bg-brand-500/10 px-2 py-0.5 rounded-full font-bold">{item.tag}</span>
                      </div>
                      <p className="text-xs font-bold text-white line-clamp-2">{item.title}</p>
                      <span className="text-[10px] text-slate-400 block">{item.duration}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
