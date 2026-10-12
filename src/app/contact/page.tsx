'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const { lang, t } = useLanguage();

  usePageTitle(
    'اتصل بنا وحجز الاستشارة | أ.د. باسم زكي',
    'Contact Us & Book Consultation | Prof. Dr. Basim Zaki'
  );

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: lang === 'en' ? 'VASER 4D Liposuction & Body Sculpting' : 'شفط الدهون بالفيزر ونحت الجسم',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to Admin Backend
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          notes: formData.notes,
          source: 'موقع إلكتروني',
          type: 'booking',
        }),
      });
    } catch (err) {
      console.error('Error submitting booking:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      const message = lang === 'en'
        ? `Hello Prof. Dr. Basim Zaki, I would like to book a consultation for Name: ${formData.name} - Phone: ${formData.phone} - Service: ${formData.service} - Notes: ${formData.notes}`
        : `مرحباً د. باسم زكي، أود حجز استشارة باسم: ${formData.name} - هاتف: ${formData.phone} - الخدمة المطلوبة: ${formData.service} - ملاحظات: ${formData.notes}`;
      const waUrl = `https://wa.me/201201134051?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="bg-navy-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-4 border border-brand-500/30">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
            <Phone className="w-4 h-4" />
            <span>{lang === 'en' ? 'Consultation & Contact' : 'حجز الاستشارة والتواصل'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white">
            {lang === 'en' ? (
              <>Contact Us & <span className="gold-gradient-text">Book Your Consultation</span></>
            ) : (
              <>تواصل معنا <span className="gold-gradient-text">واحجز استشارتك الآن</span></>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {lang === 'en'
              ? 'We are delighted to receive your inquiries and arrange your appointment at the most suitable branch with Prof. Dr. Basim Zaki.'
              : 'نسعد بالتواصل معك والإجابة على كافة تساؤلاتك وتنسيق الموعد والفرع الأنسب لك مع أ.د. باسم زكي.'}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Booking Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-400" />
              {lang === 'en' ? 'Quick Consultation Form' : 'نموذج حجز استشارة سريعة'}
            </h2>

            {submitted ? (
              <div className="bg-emerald-600/20 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-white text-lg">
                  {lang === 'en' ? 'Your Request Has Been Successfully Registered!' : 'تم تسجيل طلبك بنجاح في نظام العيادة!'}
                </h3>
                <p className="text-xs text-slate-300">
                  {lang === 'en'
                    ? 'Your details have been forwarded to the medical team and a direct WhatsApp chat opened.'
                    : 'تم توجيه بياناتك للفريق الطبي وفتح محادثة الواتساب المباشرة للرد عليك فوراً.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {lang === 'en' ? 'Full Name' : 'الاسم بالكامل'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'en' ? 'Enter your full name' : 'اكتب اسمك هنا'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-brand-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {lang === 'en' ? 'Phone / WhatsApp Number' : 'رقم الهاتف / الواتساب'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="012XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-brand-500 outline-none dir-ltr"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {lang === 'en' ? 'Requested Procedure / Service' : 'الخدمة المطلوبة'}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-brand-500 outline-none"
                  >
                    <option>{lang === 'en' ? 'VASER 4D Liposuction & Body Sculpting' : 'شفط الدهون بالفيزر ونحت الجسم'}</option>
                    <option>{lang === 'en' ? 'Tummy Tuck & Abdominal Repair' : 'شد البطن وإصلاح العضلات (Tummy Tuck)'}</option>
                    <option>{lang === 'en' ? 'Breast Augmentation & Lift' : 'تجميل وتكبير الثدي'}</option>
                    <option>{lang === 'en' ? 'Gynecomastia Treatment for Men' : 'علاج التثدي عند الرجال (Gynecomastia)'}</option>
                    <option>{lang === 'en' ? 'Rhinoplasty & Nose Reshaping' : 'تجميل ونحت الأنف (Rhinoplasty)'}</option>
                    <option>{lang === 'en' ? 'Surgical Face & Neck Lift' : 'شد الوجه والرقبة الجراحي'}</option>
                    <option>{lang === 'en' ? 'Other Cosmetic Consultation' : 'خدمة تجميلية أخرى'}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {lang === 'en' ? 'Additional Notes or Inquiries' : 'تفاصيل أو استفسارات إضافية'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={lang === 'en' ? 'Write any question or note here...' : 'اكتب أي استفسار آخر ترغب بإفادتنا به...'}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-brand-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:brightness-110 text-slate-950 font-black text-sm transition-all shadow-lg shadow-brand-500/20 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {loading
                    ? (lang === 'en' ? 'Registering Request...' : 'جاري تسجيل الطلب...')
                    : (lang === 'en' ? 'Send & Book Direct Consultation' : 'إرسال الطلب وحجز الاستشارة المباشرة')}
                </button>
              </form>
            )}
          </div>

          {/* Quick Info Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-3xl space-y-4 border border-brand-500/20">
              <h3 className="font-bold text-white text-lg">
                {lang === 'en' ? 'Direct Contact Numbers' : 'أرقام التواصل المباشرة'}
              </h3>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">
                      {lang === 'en' ? 'Clinic Numbers' : 'أرقام العيادة'}
                    </p>
                    <a href="tel:01201134051" className="font-bold text-white dir-ltr block">01201134051</a>
                    <a href="tel:01012710004" className="font-bold text-white dir-ltr block">01012710004</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">
                      {lang === 'en' ? 'Direct WhatsApp' : 'واتساب مباشر'}
                    </p>
                    <a
                      href="https://wa.me/201201134051"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-400 hover:underline"
                    >
                      {lang === 'en' ? 'Chat via WhatsApp Now' : 'تواصل عبر الواتساب فوراً'}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-3 border border-slate-800">
              <div className="flex items-center gap-2 text-brand-400 font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>{lang === 'en' ? 'Main Headquarters' : 'المقر الرئيسي'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'en'
                  ? '39 Shams El-Din Al-Dahabi St, Golf Area, Nasr City, Cairo'
                  : '39 شارع شمس الدين الذهبي - أرض الجولف - مدينة نصر - القاهرة'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
