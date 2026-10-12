'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const globalFaqs = [
  {
    questionAr: "ما الفرق بين نحت الجسم وشفط الدهون بالفيزر؟",
    questionEn: "What is the difference between Vaser Liposuction and 4D Body Sculpting?",
    answerAr: "شفط الدهون يستهدف التخلص من كتل الدهون العميقة في منطقة معينة، بينما نحت الجسم (4D Body Sculpting) بالفيزر يدمج بين إذابة الدهون وإبراز التفاصيل والخطوط التشريحية للعضلات بدقة متناهية للحصول على مظهر ممشوق ورياضي.",
    answerEn: "Standard liposuction focuses on removing deep fat pockets. Vaser 4D Body Sculpting selectively melts fat while defining underlying anatomical muscle contours for an athletic, sculpted physique."
  },
  {
    questionAr: "ما هي فترة التعافي اللازمة بعد عمليات شفط وتنسيق القوام؟",
    questionEn: "How long is the recovery period after Vaser body contouring?",
    answerAr: "تختلف فترة التعافي بحسب كمية الدهون والمناطق المستهدفة، ولكن في أغلب الحالات يمكن العودة للأنشطة والعمل المكتبي الخفيف في غضون 5 إلى 7 أيام، مع الالتزام برداء المشد الطبي لمدة 4 إلى 6 أسابيع.",
    answerEn: "Most patients can resume light office work within 5 to 7 days post-procedure while wearing the medical compression garment for 4 to 6 weeks."
  },
  {
    questionAr: "هل تترك عملية تجميل الأنف أو شد الوجه ندبات ظاهرة؟",
    questionEn: "Do Rhinoplasty or Facelift surgeries leave visible scars?",
    answerAr: "يحرص أ.د. باسم زكي على استخدام أحدث الأساليب الجراحية المخفية؛ حيث يتم عمل فتحات تجميل الأنف داخلية أو صغيرة جداً عند أرنبة الأنف، بينما يتم إخفاء جروح شد الوجه في الثنايا الطبيعية خلف الأذن وفي خط الشعر.",
    answerEn: "Prof. Dr. Basim Zaki utilizes ultra-precise concealed incision techniques. Rhinoplasty scars are hidden internally, while facelift incisions are concealed in natural hair-line and ear creases."
  },
  {
    questionAr: "كيف يتم حجز موعد الاستشارة في عيادات د. باسم زكي؟",
    questionEn: "How can I book a consultation appointment with Prof. Basim Zaki?",
    answerAr: "يمكنك الحجز بسهولة عبر الاتصال المباشر بأرقام العيادة أو التواصل الفوري عبر الواتساب، حيث يقوم الفريق الطبي بتنسيق الموعد والفرع الأنسب لك (مدينة نصر، مصر الجديدة، أو الدقي).",
    answerEn: "You can easily schedule a consultation via direct phone call or instant WhatsApp chat. The medical team will coordinate your preferred branch (Nasr City, Heliopolis, or Dokki)."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { lang } = useLanguage();

  // Generate JSON-LD Schema.org for Google Search Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": globalFaqs.map(faq => ({
      "@type": "Question",
      "name": lang === 'en' ? faq.questionEn : faq.questionAr,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": lang === 'en' ? faq.answerEn : faq.answerAr
      }
    }))
  };

  return (
    <section id="faq" className="py-20 bg-navy-950 relative border-t border-slate-800/80">
      
      {/* Schema JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Frequently Asked Questions' : 'إجابات واستفسارات شائعة'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === 'en' ? 'FAQ on' : 'الأسئلة الشائعة حول'}{' '}
            <span className="gold-gradient-text">{lang === 'en' ? 'Plastic Surgery' : 'جراحات التجميل'}</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'en'
              ? 'Expert medical answers to common patient questions before undergoing surgical procedures.'
              : 'إجابات طبية وموثوقة على أشهر التساؤلات قبل اتخاذ قرار العملية.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-12 space-y-4">
          {globalFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const question = lang === 'en' ? faq.questionEn : faq.questionAr;
            const answer = lang === 'en' ? faq.answerEn : faq.answerAr;

            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl overflow-hidden border border-slate-800 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 flex items-center justify-between gap-4 font-bold text-white text-base hover:text-brand-300 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
                    {question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
