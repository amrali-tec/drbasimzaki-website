'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
  SiteData,
  ServiceItem,
  LandingPageItem,
  BookingRequestItem,
  CustomerMessageItem,
  MedicalCenterItem,
  DoctorInfo
} from '@/lib/dataStore';
import {
  Shield,
  User,
  Activity,
  Megaphone,
  Image as ImageIcon,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Phone,
  MapPin,
  Globe,
  BarChart3,
  CalendarCheck,
  MessageSquare,
  TrendingUp,
  Search,
  ExternalLink,
  MessageCircle,
  Building2,
  Crown,
  GraduationCap,
  LogOut
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  // Active Tab: analytics | bookings | messages | centers | doctor | services | landing | gallery
  const [activeTab, setActiveTab] = useState<
    'analytics' | 'bookings' | 'messages' | 'centers' | 'doctor' | 'services' | 'landing' | 'gallery'
  >('analytics');

  // Booking status filter
  const [bookingFilter, setBookingFilter] = useState<string>('الكل');
  const [bookingSearch, setBookingSearch] = useState<string>('');

  // Selected item for editing
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [editingLpIndex, setEditingLpIndex] = useState<number | null>(null);

  useEffect(() => {
    // Check authentication first
    fetch('/api/admin/auth')
      .then((res) => res.json())
      .then((resData) => {
        if (!resData.authenticated) {
          router.replace('/admin/login');
          return;
        }

        // Fetch site data if authenticated
        return fetch('/api/admin/data')
          .then((res) => res.json())
          .then((data: SiteData) => {
            setData(data);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error('Failed to load admin data or verify auth:', err);
        router.replace('/admin/login');
      });
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
    } catch (err) {}
    router.push('/admin/login');
  };

  const handleSaveAll = async () => {
    if (!data) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage(lang === 'en' ? 'Changes saved and published successfully!' : 'تم حفظ التغييرات والبيانات والمراكز بنجاح وتحديث النظام فوراً!');
      } else {
        setMessage(lang === 'en' ? 'Error saving changes' : 'حدث خطأ أثناء حفظ التغييرات');
      }
    } catch (err) {
      setMessage(lang === 'en' ? 'Failed to connect to server' : 'تعذر الاتصال بالسيرفر أثناء الحفظ');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-300">
            {lang === 'en' ? 'Loading admin dashboard & data...' : 'جاري تحميل لوحة التحكم وإدارة المراكز والعملاء...'}
          </p>
        </div>
      </div>
    );
  }

  const bookingRequests = data.bookingRequests || [];
  const customerMessages = data.customerMessages || [];
  const medicalCenters = data.medicalCenters || [];
  const analytics = data.analytics || {
    totalVisitsMonth: 14250,
    totalBookingsMonth: bookingRequests.length,
    googleAdsConversions: 112,
    organicSeoConversions: 48,
    whatsappInquiries: 340,
    topServices: [],
  };

  const filteredBookings = bookingRequests.filter((req) => {
    const matchesFilter = bookingFilter === 'الكل' || req.status === bookingFilter;
    const matchesSearch =
      req.patientName.includes(bookingSearch) ||
      req.phone.includes(bookingSearch) ||
      req.service.includes(bookingSearch);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Top Header Navigation */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg">{t('adminTitle')}</h1>
            <p className="text-xs text-slate-400">{t('adminSubTitle')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
          >
            <Globe className="w-4 h-4" />
            {t('previewSite')}
          </Link>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:brightness-110 text-slate-950 font-black text-xs transition-all shadow-lg shadow-brand-500/20 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? t('saving') : t('saveChangesPublish')}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold border border-red-500/40 transition-colors"
            title={t('logout')}
          >
            <LogOut className="w-4 h-4" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </header>

      {/* Alert Banner Message */}
      {message && (
        <div className="bg-emerald-600/20 border-b border-emerald-500/40 text-emerald-300 text-xs py-3 px-6 text-center font-bold">
          {message}
        </div>
      )}

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar Nav Tabs */}
        <aside className="w-full md:w-64 bg-slate-900/60 border-l border-slate-800 p-4 space-y-2 shrink-0">
          <div className="text-[11px] font-bold text-slate-500 px-3 pb-1">
            {lang === 'en' ? 'Analytics & CRM' : 'إدارة العملاء والإحصائيات'}
          </div>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'analytics'
                ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4" />
              <span>{t('adminTabAnalytics')}</span>
            </div>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'bookings'
                ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <CalendarCheck className="w-4 h-4" />
              <span>{t('adminTabBookings')}</span>
            </div>
            {bookingRequests.filter((b) => b.status === 'جديد').length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                {bookingRequests.filter((b) => b.status === 'جديد').length} {lang === 'en' ? 'New' : 'جديد'}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'messages'
                ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4" />
              <span>{t('adminTabMessages')}</span>
            </div>
            {customerMessages.filter((m) => !m.isRead).length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black">
                {customerMessages.filter((m) => !m.isRead).length}
              </span>
            )}
          </button>

          <div className="text-[11px] font-bold text-slate-500 px-3 pt-4 pb-1">
            {lang === 'en' ? 'Affiliations & Content Management' : 'المناصب والمراكز ومحتوى الموقع'}
          </div>

          <button
            onClick={() => setActiveTab('centers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'centers'
                ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{t('adminTabCenters')}</span>
          </button>

          <button
            onClick={() => setActiveTab('doctor')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'doctor'
                ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t('adminTabDoctor')}</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'services'
                ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>{t('adminTabServices')}</span>
          </button>

          <button
            onClick={() => setActiveTab('landing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'landing'
                ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>{t('adminTabLanding')}</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'gallery'
                ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>{t('adminTabGallery')}</span>
          </button>
        </aside>

        {/* Tab Panels */}
        <main className="flex-1 p-6 max-w-5xl mx-auto space-y-8">

          {/* TAB: Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-400" />
                  {lang === 'en' ? 'Customer Analytics & Campaign Performance' : 'لوحة تحليلات العملاء وأداء الحملات الإعلانية'}
                </h2>
                <p className="text-xs text-slate-400">
                  {lang === 'en'
                    ? 'Summary of visits, conversions, booking sources, and top requested services this month.'
                    : 'ملخص الزيارات، التحويلات، مصادر الحجوزات، وأكثر الخدمات طلبًا هذا الشهر.'}
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                  <span className="text-xs text-slate-400">
                    {lang === 'en' ? 'Website Visits This Month' : 'زيارات الموقع هذا الشهر'}
                  </span>
                  <p className="text-2xl sm:text-3xl font-black text-white">{analytics.totalVisitsMonth.toLocaleString()}</p>
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    {lang === 'en' ? '📈 +18% vs previous month' : '📈 +18% مقارنة بالشهر السابق'}
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                  <span className="text-xs text-slate-400">
                    {lang === 'en' ? 'Total Booking Requests' : 'إجمالي طلبات الحجز'}
                  </span>
                  <p className="text-2xl sm:text-3xl font-black text-brand-400">{analytics.totalBookingsMonth}</p>
                  <span className="text-[11px] text-brand-300 font-semibold">
                    {lang === 'en' ? 'Excellent Conversion Rate' : 'معدل تحويل ممتاز'}
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                  <span className="text-xs text-slate-400">
                    {lang === 'en' ? 'Google Ads Conversions' : 'حجوزات إعلانات جوجل'}
                  </span>
                  <p className="text-2xl sm:text-3xl font-black text-blue-400">{analytics.googleAdsConversions}</p>
                  <span className="text-[11px] text-slate-400">Google Ads PPC</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                  <span className="text-xs text-slate-400">
                    {lang === 'en' ? 'Direct WhatsApp Inquiries' : 'استفسارات الواتساب المباشرة'}
                  </span>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-400">{analytics.whatsappInquiries}</p>
                  <span className="text-[11px] text-emerald-400">
                    {lang === 'en' ? 'Instant Chats' : 'محادثات فورية'}
                  </span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brand-400" />
                  {lang === 'en' ? 'Top Requested Plastic Surgery Services' : 'أكثر خدمات جراحة التجميل طلباً واستفساراً'}
                </h3>

                <div className="space-y-3">
                  {analytics.topServices.map((serv, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-200">
                        <span>{serv.name}</span>
                        <span className="text-brand-400">
                          {serv.count} {lang === 'en' ? 'Bookings' : 'طلب حجز'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-brand-600 to-brand-400 h-full rounded-full"
                          style={{ width: `${Math.min(100, (serv.count / 70) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB: Medical Centers & Affiliations Manager */}
          {activeTab === 'centers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-brand-400" />
                    {lang === 'en' ? 'Medical Centers & Leadership Affiliations' : 'إدارة المراكز الطبية والمناصب (Medical Centers & Affiliations)'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {lang === 'en'
                      ? 'Add and manage medical centers chaired by Prof. Basim Zaki and affiliated universities.'
                      : 'إضافة وتعديل المراكز الطبية التي يترأسها الدكتور باسم زكي والجامعات المنتسب إليها.'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newCenter: MedicalCenterItem = {
                      id: `mc-${Date.now()}`,
                      name: lang === 'en' ? 'New Medical Center Name' : 'اسم المركز الطبي الجديد',
                      role: lang === 'en' ? 'Chairman or Senior Consultant' : 'رئيس مجلس الإدارة أو استشاري',
                      type: 'رئاسة وإدارة',
                      description: lang === 'en' ? 'Short description of medical scope...' : 'وصف مختصر لخدمات ونشاط المركز الطبية...',
                      location: lang === 'en' ? 'Cairo' : 'القاهرة'
                    };
                    setData({ ...data, medicalCenters: [...(data.medicalCenters || []), newCenter] });
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/40 text-xs font-bold hover:bg-brand-500 hover:text-slate-950 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  {lang === 'en' ? 'Add New Center' : 'إضافة مركز جديد'}
                </button>
              </div>

              <div className="space-y-4">
                {medicalCenters.map((center, idx) => (
                  <div key={center.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {center.type === 'رئاسة وإدارة' ? (
                          <Crown className="w-5 h-5 text-amber-400 shrink-0" />
                        ) : center.type === 'صرح أكاديمي' ? (
                          <GraduationCap className="w-5 h-5 text-blue-400 shrink-0" />
                        ) : (
                          <Building2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        <h3 className="font-bold text-white text-base">
                          {lang === 'en' ? center.nameEn || center.name : center.name}
                        </h3>
                      </div>

                      <button
                        onClick={() => {
                          const updated = medicalCenters.filter((_, i) => i !== idx);
                          setData({ ...data, medicalCenters: updated });
                        }}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900"
                        title={lang === 'en' ? 'Delete Center' : 'حذف المركز'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-400">
                          {lang === 'en' ? 'Center / Institution Name' : 'اسم المركز / المؤسسة'}
                        </label>
                        <input
                          type="text"
                          value={center.name}
                          onChange={(e) => {
                            const updated = [...medicalCenters];
                            updated[idx].name = e.target.value;
                            setData({ ...data, medicalCenters: updated });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-slate-400">
                          {lang === 'en' ? 'Doctor Role / Position' : 'منصب / دور الدكتور بالمركز'}
                        </label>
                        <input
                          type="text"
                          value={center.role}
                          onChange={(e) => {
                            const updated = [...medicalCenters];
                            updated[idx].role = e.target.value;
                            setData({ ...data, medicalCenters: updated });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-slate-400">
                          {lang === 'en' ? 'Classification Type' : 'تصنيف المنصب'}
                        </label>
                        <select
                          value={center.type}
                          onChange={(e) => {
                            const updated = [...medicalCenters];
                            updated[idx].type = e.target.value as any;
                            setData({ ...data, medicalCenters: updated });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="رئاسة وإدارة">{lang === 'en' ? 'Leadership & Chairmanship' : 'رئاسة وإدارة'}</option>
                          <option value="صرح أكاديمي">{lang === 'en' ? 'Academic Institution' : 'صرح أكاديمي'}</option>
                          <option value="مركز تخصصي">{lang === 'en' ? 'Specialized Center' : 'مركز تخصصي'}</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-slate-400">
                          {lang === 'en' ? 'Location / City' : 'الموقع / النطاق الجغرافي'}
                        </label>
                        <input
                          type="text"
                          value={center.location}
                          onChange={(e) => {
                            const updated = [...medicalCenters];
                            updated[idx].location = e.target.value;
                            setData({ ...data, medicalCenters: updated });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs text-slate-400">
                          {lang === 'en' ? 'Description & Medical Scope' : 'وصف المركز والخدمات التي يقدمها'}
                        </label>
                        <textarea
                          rows={2}
                          value={center.description}
                          onChange={(e) => {
                            const updated = [...medicalCenters];
                            updated[idx].description = e.target.value;
                            setData({ ...data, medicalCenters: updated });
                          }}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB: Bookings */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-brand-400" />
                    {lang === 'en' ? 'Patient Booking Requests Manager' : 'جدول وإدارة طلبات الحجز (Booking Requests)'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {lang === 'en'
                      ? 'Track and process patient appointment requests across clinic branches.'
                      : 'متابعة طلبات الكشف والحجز المسجلة من قِبل المرضى في فروع العيادة.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  <input
                    type="text"
                    placeholder={lang === 'en' ? 'Search by patient name, phone, or service...' : 'البحث باسم المريض، رقم الهاتف، أو الخدمة...'}
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white outline-none focus:border-brand-500"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {['الكل', 'جديد', 'تم التواصل', 'مؤكد', 'ملغي'].map((st) => {
                    const stLabel = lang === 'en'
                      ? st === 'الكل' ? 'All' : st === 'جديد' ? 'New' : st === 'تم التواصل' ? 'Contacted' : st === 'مؤكد' ? 'Confirmed' : 'Cancelled'
                      : st;

                    return (
                      <button
                        key={st}
                        onClick={() => setBookingFilter(st)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                          bookingFilter === st
                            ? 'bg-brand-500 text-slate-950'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {stLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center text-slate-400 text-xs">
                    {lang === 'en' ? 'No booking requests match the current filter.' : 'لا توجد طلبات حجز مطابقة للفلتر الحالي.'}
                  </div>
                ) : (
                  filteredBookings.map((req) => {
                    const waUrl = `https://wa.me/20${req.phone.replace(/^0/, '')}?text=${encodeURIComponent(
                      lang === 'en'
                        ? `Hello ${req.patientName}, this is Prof. Dr. Basim Zaki Clinic regarding your booking for (${req.service})`
                        : `مرحباً ${req.patientName}، معك عيادة أ.د. باسم زكي بخصوص طلب حجزك لخدمة (${req.service})`
                    )}`;

                    return (
                      <div
                        key={req.id}
                        className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-white text-base">{req.patientName}</h3>
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono dir-ltr">
                              {req.phone}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 font-semibold">
                              {lang === 'en' ? 'Source:' : 'مصدر:'} {req.source}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={req.status}
                              onChange={(e) => {
                                const newStatus = e.target.value as any;
                                const updatedReqs = bookingRequests.map((b) =>
                                  b.id === req.id ? { ...b, status: newStatus } : b
                                );
                                setData({ ...data, bookingRequests: updatedReqs });
                              }}
                              className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${
                                req.status === 'جديد'
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : req.status === 'مؤكد'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : req.status === 'تم التواصل'
                                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                  : 'bg-red-500/20 text-red-300 border-red-500/40'
                              }`}
                            >
                              <option value="جديد">{lang === 'en' ? 'New' : 'جديد'}</option>
                              <option value="تم التواصل">{lang === 'en' ? 'Contacted' : 'تم التواصل'}</option>
                              <option value="مؤكد">{lang === 'en' ? 'Confirmed' : 'مؤكد'}</option>
                              <option value="ملغي">{lang === 'en' ? 'Cancelled' : 'ملغي'}</option>
                            </select>

                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-current" />
                              {lang === 'en' ? 'WhatsApp Contact' : 'تواصل واتساب'}
                            </a>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-2 text-xs text-slate-300">
                          <div>
                            <span className="text-slate-500 block">{lang === 'en' ? 'Requested Service:' : 'الخدمة المطلوبة:'}</span>
                            <span className="font-semibold text-brand-300">{req.service}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{lang === 'en' ? 'Preferred Branch:' : 'الفرع المفضل:'}</span>
                            <span>{req.clinicBranch}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{lang === 'en' ? 'Request Date:' : 'تاريخ الطلب:'}</span>
                            <span className="font-mono text-slate-400">{req.createdAt}</span>
                          </div>
                        </div>

                        {req.notes && (
                          <div className="bg-slate-950 p-2.5 rounded-xl text-xs text-slate-300 border border-slate-800/60">
                            <span className="font-bold text-slate-400">{lang === 'en' ? 'Patient Notes: ' : 'ملاحظات المريض: '}</span>
                            {req.notes}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}

          {/* TAB: Messages */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-brand-400" />
                  {lang === 'en' ? 'Patient Messages & Inquiries Inbox' : 'مراسلات واستفسارات المرضى والعملاء'}
                </h2>
                <p className="text-xs text-slate-400">
                  {lang === 'en'
                    ? 'Inbox for incoming inquiries from contact form and website.'
                    : 'صندوق الوارد للاستفسارات الواردة من نموذج الاتصال والموقع.'}
                </p>
              </div>

              <div className="space-y-4">
                {customerMessages.length === 0 ? (
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center text-slate-400 text-xs">
                    {lang === 'en' ? 'No messages in inbox.' : 'لا توجد رسائل جديدة في صندوق الوارد.'}
                  </div>
                ) : (
                  customerMessages.map((msg, idx) => {
                    const waUrl = `https://wa.me/20${msg.phone.replace(/^0/, '')}?text=${encodeURIComponent(
                      lang === 'en'
                        ? `Hello ${msg.senderName}, this is Prof. Dr. Basim Zaki Clinic replying to your inquiry about (${msg.subject})`
                        : `مرحباً ${msg.senderName}، معك عيادة أ.د. باسم زكي رداً على استفسارك حول (${msg.subject})`
                    )}`;

                    return (
                      <div
                        key={msg.id}
                        className={`bg-slate-900 border p-5 rounded-2xl space-y-3 transition-colors ${
                          msg.isRead ? 'border-slate-800' : 'border-emerald-500/40 bg-slate-900/90'
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white text-base">{msg.senderName}</h3>
                              {!msg.isRead && (
                                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[10px]">
                                  {lang === 'en' ? 'New Message' : 'رسالة جديدة'}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 dir-ltr font-mono">{msg.phone} {msg.email && `| ${msg.email}`}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                const updated = customerMessages.map((m) =>
                                  m.id === msg.id ? { ...m, isRead: true, repliedViaWhatsapp: true } : m
                                );
                                setData({ ...data, customerMessages: updated });
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-current" />
                              {lang === 'en' ? 'Reply via WhatsApp Instantly' : 'رد عبر الواتساب فوراً'}
                            </a>

                            <button
                              onClick={() => {
                                const updated = customerMessages.map((m) =>
                                  m.id === msg.id ? { ...m, isRead: !m.isRead } : m
                                );
                                setData({ ...data, customerMessages: updated });
                              }}
                              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
                            >
                              {msg.isRead
                                ? (lang === 'en' ? 'Mark as Unread' : 'تعليم كغير مقروء')
                                : (lang === 'en' ? 'Mark as Read' : 'تم القراءة')}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-bold text-brand-300 text-xs">{msg.subject}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB: Doctor Info */}
          {activeTab === 'doctor' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-brand-400" />
                  {lang === 'en' ? 'Doctor Profile & Direct Contact Numbers' : 'بيانات الطبيب الرئيسية وأرقام التواصل'}
                </h2>
                <p className="text-xs text-slate-400">
                  {lang === 'en'
                    ? 'Edit doctor name, title, biography, and direct clinic phone numbers.'
                    : 'تعديل الاسم واللقب العلمي والخبرات وأرقام تواصل العيادات المباشرة.'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    {lang === 'en' ? 'Doctor Name' : 'اسم الطبيب'}
                  </label>
                  <input
                    type="text"
                    value={data.doctor.name}
                    onChange={(e) =>
                      setData({ ...data, doctor: { ...data.doctor, name: e.target.value } })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-brand-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    {lang === 'en' ? 'Academic Title' : 'اللقب والمسمى العلمي'}
                  </label>
                  <input
                    type="text"
                    value={data.doctor.title}
                    onChange={(e) =>
                      setData({ ...data, doctor: { ...data.doctor, title: e.target.value } })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-brand-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300">
                    {lang === 'en' ? 'Biography (Bio)' : 'السيرة الذاتية (Bio)'}
                  </label>
                  <textarea
                    rows={3}
                    value={data.doctor.bio}
                    onChange={(e) =>
                      setData({ ...data, doctor: { ...data.doctor, bio: e.target.value } })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-brand-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    {lang === 'en' ? 'Official WhatsApp Number (without +)' : 'رقم الواتساب الرسمي (بدون +)'}
                  </label>
                  <input
                    type="text"
                    value={data.doctor.whatsapp}
                    onChange={(e) =>
                      setData({ ...data, doctor: { ...data.doctor, whatsapp: e.target.value } })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-brand-500 outline-none dir-ltr"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    {lang === 'en' ? 'Official Email' : 'البريد الإلكتروني الرسمي'}
                  </label>
                  <input
                    type="email"
                    value={data.doctor.email}
                    onChange={(e) =>
                      setData({ ...data, doctor: { ...data.doctor, email: e.target.value } })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-brand-500 outline-none dir-ltr"
                  />
                </div>
              </div>

              {/* Clinics List Manager */}
              <div className="pt-6 border-t border-slate-800 space-y-4">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-400" />
                  {lang === 'en' ? 'Clinic Branches & Locations' : 'فروع ومراكز العيادات'}
                </h3>

                <div className="space-y-4">
                  {data.doctor.clinics.map((clinic, index) => (
                    <div key={clinic.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder={lang === 'en' ? 'Branch Name' : 'اسم الفرع'}
                          value={clinic.name}
                          onChange={(e) => {
                            const updated = [...data.doctor.clinics];
                            updated[index].name = e.target.value;
                            setData({ ...data, doctor: { ...data.doctor, clinics: updated } });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder={lang === 'en' ? 'Detailed Address' : 'العنوان التفصيلي'}
                          value={clinic.address}
                          onChange={(e) => {
                            const updated = [...data.doctor.clinics];
                            updated[index].address = e.target.value;
                            setData({ ...data, doctor: { ...data.doctor, clinics: updated } });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder={lang === 'en' ? 'Working Hours' : 'مواعيد العمل'}
                          value={clinic.workHours}
                          onChange={(e) => {
                            const updated = [...data.doctor.clinics];
                            updated[index].workHours = e.target.value;
                            setData({ ...data, doctor: { ...data.doctor, clinics: updated } });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder={lang === 'en' ? 'Branch Phone' : 'هاتف الفرع'}
                          value={clinic.phone}
                          onChange={(e) => {
                            const updated = [...data.doctor.clinics];
                            updated[index].phone = e.target.value;
                            setData({ ...data, doctor: { ...data.doctor, clinics: updated } });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white dir-ltr"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB: Services Manager */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-brand-400" />
                    {lang === 'en' ? 'Services & Google SEO Manager' : 'إدارة خدمات التجميل والسيو (Services Manager)'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {lang === 'en'
                      ? 'Add & edit services, descriptions, medical details, and SEO settings.'
                      : 'إضافة وتعديل الخدمات والعناوين والوصف وإعدادات السيو لكل خدمة.'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newServ: ServiceItem = {
                      id: `service-${Date.now()}`,
                      slug: `new-service-${Date.now()}`,
                      categorySlug: 'body-sculpting',
                      title: 'خدمة تجميل جديدة',
                      shortDescription: 'وصف مختصر للخدمة الجديدة',
                      fullDescription: 'وصف تفصيلي طبي شامل للخدمة الجديدة...',
                      benefits: ['فائدة أولى', 'فائدة ثانية'],
                      metaTitle: 'عنوان السيو للخدمة الجديدة',
                      metaDescription: 'وصف السيو للخدمة الجديدة',
                      focusKeywords: 'كلمة مفتاحية 1, كلمة مفتاحية 2',
                      faqs: []
                    };
                    setData({ ...data, services: [newServ, ...data.services] });
                    setEditingServiceIndex(0);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/40 text-xs font-bold hover:bg-brand-500 hover:text-slate-950 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  {lang === 'en' ? 'Add New Service' : 'إضافة خدمة جديدة'}
                </button>
              </div>

              <div className="space-y-4">
                {data.services.map((service, index) => {
                  const isEditing = editingServiceIndex === index;
                  return (
                    <div
                      key={service.id}
                      className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-white text-base">
                            {lang === 'en' ? service.titleEn || service.title : service.title}
                          </h3>
                          <p className="text-xs text-brand-400 font-mono">/services/{service.categorySlug}/{service.slug}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingServiceIndex(isEditing ? null : index)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                          >
                            {isEditing
                              ? (lang === 'en' ? 'Close Editor' : 'إغلاق التعديل')
                              : (lang === 'en' ? 'Edit Service & SEO' : 'تعديل الخدمة والسيو')}
                          </button>

                          <button
                            onClick={() => {
                              const filtered = data.services.filter((_, i) => i !== index);
                              setData({ ...data, services: filtered });
                              if (editingServiceIndex === index) setEditingServiceIndex(null);
                            }}
                            className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="pt-4 border-t border-slate-800 space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs text-slate-400">
                                {lang === 'en' ? 'Main Service Title' : 'عنوان الخدمة الرئيسي'}
                              </label>
                              <input
                                type="text"
                                value={service.title}
                                onChange={(e) => {
                                  const updated = [...data.services];
                                  updated[index].title = e.target.value;
                                  setData({ ...data, services: updated });
                                }}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs text-slate-400">
                                {lang === 'en' ? 'Permalink (Slug)' : 'الرابط الدائم (Slug)'}
                              </label>
                              <input
                                type="text"
                                value={service.slug}
                                onChange={(e) => {
                                  const updated = [...data.services];
                                  updated[index].slug = e.target.value;
                                  setData({ ...data, services: updated });
                                }}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono dir-ltr"
                              />
                            </div>

                            <div className="space-y-1 sm:col-span-2">
                              <label className="text-xs text-slate-400">
                                {lang === 'en' ? 'Short Description' : 'الوصف المختصر'}
                              </label>
                              <input
                                type="text"
                                value={service.shortDescription}
                                onChange={(e) => {
                                  const updated = [...data.services];
                                  updated[index].shortDescription = e.target.value;
                                  setData({ ...data, services: updated });
                                }}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                              />
                            </div>

                            <div className="space-y-1 sm:col-span-2">
                              <label className="text-xs text-slate-400">
                                {lang === 'en' ? 'Detailed Medical Description' : 'الشرح الطبي التفصيلي'}
                              </label>
                              <textarea
                                rows={4}
                                value={service.fullDescription}
                                onChange={(e) => {
                                  const updated = [...data.services];
                                  updated[index].fullDescription = e.target.value;
                                  setData({ ...data, services: updated });
                                }}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="bg-slate-950 p-4 rounded-xl border border-brand-500/20 space-y-3">
                            <h4 className="font-bold text-brand-400 text-xs flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              {lang === 'en' ? 'Google SEO Settings' : 'إعدادات سيو جوجل (Google SEO Settings)'}
                            </h4>

                            <div className="space-y-2">
                              <input
                                type="text"
                                placeholder={lang === 'en' ? 'Meta Title' : 'عنوان السيو (Meta Title)'}
                                value={service.metaTitle}
                                onChange={(e) => {
                                  const updated = [...data.services];
                                  updated[index].metaTitle = e.target.value;
                                  setData({ ...data, services: updated });
                                }}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                              />
                              <input
                                type="text"
                                placeholder={lang === 'en' ? 'Meta Description' : 'وصف السيو (Meta Description)'}
                                value={service.metaDescription}
                                onChange={(e) => {
                                  const updated = [...data.services];
                                  updated[index].metaDescription = e.target.value;
                                  setData({ ...data, services: updated });
                                }}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                              />
                              <input
                                type="text"
                                placeholder={lang === 'en' ? 'Target Keywords (comma separated)' : 'الكلمات المفتاحية المستهدفة (فاصلة بين كل كلمة)'}
                                value={service.focusKeywords}
                                onChange={(e) => {
                                  const updated = [...data.services];
                                  updated[index].focusKeywords = e.target.value;
                                  setData({ ...data, services: updated });
                                }}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                              />
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB: Landing Pages */}
          {activeTab === 'landing' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-brand-400" />
                    {lang === 'en' ? 'Google Ads Landing Pages Manager' : 'صفحات هبوط إعلانات جوجل (Google Ads Landing Pages)'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {lang === 'en'
                      ? 'Create specialized high-conversion landing pages for Google Ads.'
                      : 'إنشاء صفحات هبوط مميزة للحملات الإعلانية مع أزرار اتصال وخصومات.'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newLp: LandingPageItem = {
                      id: `lp-${Date.now()}`,
                      slug: `offer-${Date.now()}`,
                      title: 'عنوان الحملة الإعلانية الجديدة',
                      heroHeadline: 'العنوان الرئيسي الذي يظهر للزائر من الإعلان',
                      heroSubheadline: 'تفاصيل العرض والمميزات الطبية السريعة',
                      ctaText: 'احجز عبر الواتساب فوراً',
                      ctaPhone: data.doctor.phones[0] || '',
                      discountBadge: 'خصم خاص لفترة محدودة',
                      features: ['ميزة 1', 'ميزة 2'],
                      targetKeywords: 'إعلانات جوجل, خصم تجميل'
                    };
                    setData({ ...data, landingPages: [newLp, ...data.landingPages] });
                    setEditingLpIndex(0);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/40 text-xs font-bold hover:bg-brand-500 hover:text-slate-950 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  {lang === 'en' ? 'Create New Landing Page' : 'إنشاء صفحة هبوط جديدة'}
                </button>
              </div>

              <div className="space-y-4">
                {data.landingPages.map((lp, index) => {
                  const isEditing = editingLpIndex === index;
                  return (
                    <div key={lp.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-white text-base">
                            {lang === 'en' ? lp.titleEn || lp.title : lp.title}
                          </h3>
                          <p className="text-xs text-emerald-400 font-mono">/landing/{lp.slug}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/landing/${lp.slug}`}
                            target="_blank"
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                          >
                            {lang === 'en' ? 'Preview Page' : 'معاينة الصفحة'}
                          </Link>

                          <button
                            onClick={() => setEditingLpIndex(isEditing ? null : index)}
                            className="px-3 py-1.5 rounded-lg bg-brand-500/20 text-brand-400 text-xs font-bold"
                          >
                            {isEditing ? (lang === 'en' ? 'Close' : 'إغلاق') : (lang === 'en' ? 'Edit Page' : 'تعديل الصفحة')}
                          </button>

                          <button
                            onClick={() => {
                              const filtered = data.landingPages.filter((_, i) => i !== index);
                              setData({ ...data, landingPages: filtered });
                              if (editingLpIndex === index) setEditingLpIndex(null);
                            }}
                            className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="pt-4 border-t border-slate-800 space-y-3">
                          <div className="grid sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder={lang === 'en' ? 'Internal Campaign Title' : 'عنوان الحملة الداخلي'}
                              value={lp.title}
                              onChange={(e) => {
                                const updated = [...data.landingPages];
                                updated[index].title = e.target.value;
                                setData({ ...data, landingPages: updated });
                              }}
                              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                            />
                            <input
                              type="text"
                              placeholder={lang === 'en' ? 'Page URL Slug' : 'رابط الصفحة (Slug)'}
                              value={lp.slug}
                              onChange={(e) => {
                                const updated = [...data.landingPages];
                                updated[index].slug = e.target.value;
                                setData({ ...data, landingPages: updated });
                              }}
                              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono dir-ltr"
                            />
                            <input
                              type="text"
                              placeholder={lang === 'en' ? 'User Facing Headline' : 'العنوان الرئيسي للمستخدم (Headline)'}
                              value={lp.heroHeadline}
                              onChange={(e) => {
                                const updated = [...data.landingPages];
                                updated[index].heroHeadline = e.target.value;
                                setData({ ...data, landingPages: updated });
                              }}
                              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white sm:col-span-2"
                            />
                            <input
                              type="text"
                              placeholder={lang === 'en' ? 'Discount Badge' : 'شارة العرض (Discount Badge)'}
                              value={lp.discountBadge}
                              onChange={(e) => {
                                const updated = [...data.landingPages];
                                updated[index].discountBadge = e.target.value;
                                setData({ ...data, landingPages: updated });
                              }}
                              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                            />
                            <input
                              type="text"
                              placeholder={lang === 'en' ? 'CTA Button Text' : 'نص زر التواصل (CTA Text)'}
                              value={lp.ctaText}
                              onChange={(e) => {
                                const updated = [...data.landingPages];
                                updated[index].ctaText = e.target.value;
                                setData({ ...data, landingPages: updated });
                              }}
                              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB: Gallery Cases */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-brand-400" />
                  {lang === 'en' ? 'Before & After Cases Gallery' : 'معرض نتائج الحالات (Before & After Cases)'}
                </h2>
                <p className="text-xs text-slate-400">
                  {lang === 'en' ? 'Manage case titles, descriptions, and image paths.' : 'إدارة صور الحالات والعناوين ومسارات الصور الحقيقية.'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {data.beforeAfterCases.map((item, idx) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={lang === 'en' ? item.titleEn || item.title : item.title}
                        onChange={(e) => {
                          const updated = [...data.beforeAfterCases];
                          updated[idx].title = e.target.value;
                          setData({ ...data, beforeAfterCases: updated });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white"
                      />
                      <input
                        type="text"
                        placeholder={lang === 'en' ? 'Before Image Path' : 'مسار صورة قبل'}
                        value={item.beforeImage}
                        onChange={(e) => {
                          const updated = [...data.beforeAfterCases];
                          updated[idx].beforeImage = e.target.value;
                          setData({ ...data, beforeAfterCases: updated });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono dir-ltr"
                      />
                      <input
                        type="text"
                        placeholder={lang === 'en' ? 'After Image Path' : 'مسار صورة بعد'}
                        value={item.afterImage}
                        onChange={(e) => {
                          const updated = [...data.beforeAfterCases];
                          updated[idx].afterImage = e.target.value;
                          setData({ ...data, beforeAfterCases: updated });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono dir-ltr"
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}
