export type Language = 'ar' | 'en';

export const translations: Record<string, { ar: string; en: string }> = {
  // Brand & Doctor
  doctorName: {
    ar: 'أ.د. باسم محمد زكي',
    en: 'Prof. Dr. Basim Mohamed Zaki',
  },
  doctorTitle: {
    ar: 'أستاذ جراحة التجميل بكلية الطب جامعة عين شمس ورئيس مجلس إدارة كايرو كوزمو سنتر',
    en: 'Professor of Plastic Surgery, Ain Shams University & Chairman of Cairo Cosmo Center',
  },
  doctorSubTitle: {
    ar: 'أستاذ جراحة التجميل - طب عين شمس',
    en: 'Professor of Plastic Surgery - Ain Shams University',
  },
  cairoCosmoTitle: {
    ar: 'رئيس مجلس إدارة كايرو كوزمو سنتر',
    en: 'Chairman of Cairo Cosmo Center',
  },

  // Header & Navigation
  navHome: { ar: 'الرئيسية', en: 'Home' },
  navServices: { ar: 'الخدمات والعمليات', en: 'Services & Operations' },
  navCases: { ar: 'معرض الحالات', en: 'Before & After' },
  navAbout: { ar: 'عن الدكتور', en: 'About Doctor' },
  navClinics: { ar: 'العيادات بالفروع', en: 'Clinics & Branches' },
  navFaq: { ar: 'الأسئلة الشائعة', en: 'FAQ' },
  navContact: { ar: 'اتصل بنا', en: 'Contact Us' },
  navAdmin: { ar: 'لوحة التحكم', en: 'Admin Panel' },

  // Header Top Bar
  topBarAcademic: {
    ar: 'أستاذ جراحة التجميل بكلية الطب جامعة عين شمس',
    en: 'Prof. of Plastic Surgery, Faculty of Medicine, Ain Shams Univ.',
  },
  topBarCenter: {
    ar: 'رئيس مجلس إدارة كايرو كوزمو سنتر',
    en: 'Chairman of Cairo Cosmo Center',
  },
  topBarExperience: {
    ar: 'خبرة جراحية +22 عاماً',
    en: '22+ Years Surgical Experience',
  },
  topBarBookConsultation: {
    ar: 'احجز استشارة مباشرة مع الدكتور',
    en: 'Book Direct Consultation',
  },

  // Buttons & CTAs
  whatsappBook: { ar: 'واتساب حجز د. باسم', en: 'WhatsApp Booking' },
  whatsappQuick: { ar: 'واتساب سريع', en: 'Quick WhatsApp' },
  directCall: { ar: 'اتصال مباشر', en: 'Direct Call' },
  bookConsultationDirect: {
    ar: 'احجز استشارتك الشخصية مع الدكتور مباشرة',
    en: 'Book Your Personal Consultation Directly',
  },
  saveChangesPublish: { ar: 'حفظ التغييرات والنشر فوراً', en: 'Save Changes & Publish' },
  saving: { ar: 'جاري الحفظ...', en: 'Saving...' },
  previewSite: { ar: 'معاينة الموقع العام', en: 'Preview Website' },
  logout: { ar: 'تسجيل الخروج', en: 'Logout' },

  // Hero Section
  heroTitlePrefix: { ar: 'أفضل النتائج الطبيعية في', en: 'Best Natural Results in' },
  heroTitleHighlight: { ar: 'جراحات التجميل ونحت القوام', en: 'Plastic Surgery & Body Sculpting' },
  heroBio: {
    ar: 'أستاذ ورئيس وحدة بكلية الطب جامعة عين شمس، ورئيس مجلس إدارة صرح كايرو كوزمو سنتر، متخصص في أحدث تقنيات نحت الجسم 4D بالفيزر والجي بلازما وتجميل الوجه والأنف.',
    en: 'Professor and Unit Head at Ain Shams University Faculty of Medicine, Chairman of Cairo Cosmo Center, specializing in 4D Vaser Body Sculpting, J-Plasma, and Facial Aesthetic Surgeries.',
  },
  doctorQuote: {
    ar: '"هدفنا تحقيق تناغم الجمال الطبيعي بأحدث تقنيات الفيزر 4D والجي بلازما وبأعلى نسب الأمان الطبي."',
    en: '"Our goal is achieving natural aesthetic harmony using 4D Vaser & J-Plasma with absolute medical safety."',
  },
  verifiedConsultation: {
    ar: '• استشارة وكشف شخصي مباشر مع الدكتور',
    en: '• Direct Personal Consultation & Examination',
  },

  // Stats Bar
  statYears: { ar: '22+', en: '22+' },
  statYearsLabel: { ar: 'عاماً من الخبرة الأكاديمية والجراحية', en: 'Years of Academic & Surgical Mastery' },
  statSurgeries: { ar: '8,500+', en: '8,500+' },
  statSurgeriesLabel: { ar: 'عملية تجميل ناجحة', en: 'Successful Plastic Surgeries' },
  statSatisfaction: { ar: '99%', en: '99%' },
  statSatisfactionLabel: { ar: 'نسبة رضا المرضى', en: 'Patient Satisfaction Rate' },
  statClinics: { ar: '3', en: '3' },
  statClinicsLabel: { ar: 'فروع عيادات رئيسية', en: 'Main Clinic Branches' },

  // Doctor Philosophy Section
  philosophyTag: { ar: 'الريادة الجراحية والأكاديمية', en: 'Surgical & Academic Excellence' },
  philosophyTitlePrefix: { ar: 'فلسفة وتفوق', en: 'Philosophy & Expertise of' },
  philosophyDesc: {
    ar: 'استعراض مسيرة تزيد عن 22 عاماً في القمة الأكاديمية والعملية، والجمع بين الابتكار الجراحي واللمسة الفنية الطبيعية.',
    en: 'A 22+ year journey of academic & surgical leadership, blending innovation with natural aesthetic artistry.',
  },

  // Admin Dashboard Tabs & Labels
  adminTitle: { ar: 'لوحة تحكم عيادة د. باسم زكي (الأدمن)', en: 'Dr. Basim Zaki Clinic Admin Panel' },
  adminSubTitle: {
    ar: 'إدارة المراكز والاعتمادات، التحليلات، الحجوزات، والمحتوى بالسيو',
    en: 'Manage Affiliations, Analytics, Bookings, Services & SEO',
  },

  adminTabAnalytics: { ar: 'تحليل العملاء والإحصائيات', en: 'Customer Analytics' },
  adminTabBookings: { ar: 'طلبات الحجز', en: 'Booking Requests' },
  adminTabMessages: { ar: 'مراسلات واستفسارات العملاء', en: 'Customer Messages' },
  adminTabCenters: { ar: 'المراكز والمناصب الطبية', en: 'Medical Centers & Positions' },
  adminTabDoctor: { ar: 'بيانات الطبيب والعيادات', en: 'Doctor Profile & Clinics' },
  adminTabServices: { ar: 'إدارة الخدمات والسيو', en: 'Services & SEO Manager' },
  adminTabLanding: { ar: 'صفحات إعلانات جوجل', en: 'Google Ads Landing Pages' },
  adminTabGallery: { ar: 'معرض قبل وبعد', en: 'Before & After Gallery' },

  // Admin Analytics Panel
  analyticsTitle: { ar: 'لوحة تحليلات العملاء وأداء الحملات الإعلانية', en: 'Customer Analytics & Campaign Performance' },
  analyticsVisits: { ar: 'زيارات الموقع هذا الشهر', en: 'Website Visits This Month' },
  analyticsBookings: { ar: 'إجمالي طلبات الحجز', en: 'Total Booking Requests' },
  analyticsAds: { ar: 'حجوزات إعلانات جوجل', en: 'Google Ads Conversions' },
  analyticsWhatsapp: { ar: 'استفسارات الواتساب المباشرة', en: 'Direct WhatsApp Inquiries' },
  analyticsTopServices: { ar: 'أكثر خدمات جراحة التجميل طلباً واستفساراً', en: 'Top Requested Plastic Surgery Services' },

  // Admin Medical Centers Panel
  centersTitle: { ar: 'إدارة المراكز الطبية والمناصب (Medical Centers & Affiliations)', en: 'Medical Centers & Leadership Affiliations' },
  addNewCenter: { ar: 'إضافة مركز جديد', en: 'Add New Center' },
  centerNameLabel: { ar: 'اسم المركز / المؤسسة', en: 'Center / Institution Name' },
  centerRoleLabel: { ar: 'منصب / دور الدكتور بالمركز', en: 'Doctor Role / Position' },
  centerTypeLabel: { ar: 'تصنيف المنصب', en: 'Classification Type' },
  centerLocationLabel: { ar: 'الموقع / النطاق الجغرافي', en: 'Location / City' },
  centerDescLabel: { ar: 'وصف المركز والخدمات التي يقدمها', en: 'Description & Medical Scope' },

  // Admin Bookings Panel
  bookingsTitle: { ar: 'جدول وإدارة طلبات الحجز (Booking Requests)', en: 'Patient Booking Requests Manager' },
  bookingSearchPlaceholder: { ar: 'البحث باسم المريض، رقم الهاتف، أو الخدمة...', en: 'Search by patient name, phone, or service...' },
  bookingAll: { ar: 'الكل', en: 'All' },
  bookingNew: { ar: 'جديد', en: 'New' },
  bookingContacted: { ar: 'تم التواصل', en: 'Contacted' },
  bookingConfirmed: { ar: 'مؤكد', en: 'Confirmed' },
  bookingCancelled: { ar: 'ملغي', en: 'Cancelled' },

  // Admin Messages Panel
  messagesTitle: { ar: 'مراسلات واستفسارات المرضى والعملاء', en: 'Patient Messages & Inquiries Inbox' },
  replyViaWhatsapp: { ar: 'رد عبر الواتساب فوراً', en: 'Reply via WhatsApp Instantly' },
  markUnread: { ar: 'تعليم كغير مقروء', en: 'Mark as Unread' },
  markRead: { ar: 'تم القراءة', en: 'Mark as Read' },

  // Language switch
  switchLangLabel: { ar: 'English 🇬🇧', en: 'العربية 🇪🇬' },
};

export function getTranslation(key: string, lang: Language): string {
  if (translations[key] && translations[key][lang]) {
    return translations[key][lang];
  }
  return key;
}
