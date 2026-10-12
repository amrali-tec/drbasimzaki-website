# 🩺 Dr. Basim Zaki - Consultant Plastic Surgeon Website
# الموقع الرسمي للدكتور باسم زكي - استشاري جراحة التجميل ونحت القوام

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Lucide](https://img.shields.io/badge/Lucide-Icons-orange)](https://lucide.dev/)

---

## 📖 نظرة عامة | Overview

**Dr. Basim Zaki Website** هو الموقع الرسمي والمنصة الطبية للدكتور **باسم زكي**، استشاري جراحة التجميل ونحت القوام والترميم. صُمم الموقع ليعكس أعلى معايير الفخامة والاحترافية الطبية العالمية، مع واجهة مستخدم تفاعلية ثنائية اللغة تدعم استعراض الحالات الجراحية (قبل وبعد)، دليل المراكز والعيادات المعتمدة، حجز الاستشارات الفورية، وتكامل مباشر مع قنوات التواصل والواتساب.

**Dr. Basim Zaki's Official Website** is a modern, high-performance medical portal built with Next.js 15 and React 19 for a leading consultant plastic surgeon. It features an interactive before-and-after gallery, clinic locator, comprehensive procedural guides, online consultation scheduling, and full bilingual (Arabic/English) support.

---

## ✨ المميزات الرئيسية | Core Features

### 🌟 تجربة المريض والزائر (Patient Experience)
- **تصميم طبي فخم (Luxury Medical Aesthetic)**: تصميم مريح للعين يدمج درجات الألوان الطبية الراقية مع خطوط عربية ولاتينية متناسقة.
- **استعراض الحالات التجميلية (Interactive Before & After Gallery)**: أداة بصرية تفاعلية لمقارنة نتائج جراحات نحت القوام وشد الترهلات وتجميل الوجه.
- **دليل العيادات والمراكز الطبية (Clinics & Hospital Locator)**: تفاصيل فروع العيادات، المستشفيات المعتمدة، الخرائط، وأوقات العمل.
- **فلسفة الجراح وسيرته المهنية (Doctor Philosophy & Media)**: استعراض الشهادات الأكاديمية، العضويات الدولية، واللقاءات الإعلامية والمؤتمرات.
- **دليل الإجراءات الجراحية (Services & Surgeries)**: شروحات طبية دقيقة ومبسطة لكل عملية وتوقعات التعافي والتحضيرات المطلوبة.
- **دعم ثنائي اللغة كامل (Bilingual AR / EN)**: دعم فوري للغتين العربية والإنجليزية مع مراعاة كاملة لاتجاهات الخطوط وواجهة المستخدم (RTL / LTR).
- **زر الحجز والتواصل العائم (Floating Quick CTA)**: وصول سريع للحجز المباشر ومحادثة واتساب مخصصة للمواعيد الطبية.

### 🛡️ الإدارة والبنية البرمجية (Admin & Infrastructure)
- **لوحة تحكم إدارية (Admin Dashboard)**: إدارة مواعيد المرضى، تحديث صور الحالات، ومتابعة استفسارات الاستشارات.
- **بنية Next.js 15 App Router**: تحميل فوري للصفحات وأداء عالي السرعة (Core Web Vitals).
- **أمان وتحكم بالمسارات (Middleware Security)**: طبقة وسيطة لحماية المسارات الإدارية والتحقق من الجلسات.
- **تحسين متقدم لمحركات البحث (Advanced Medical SEO)**:
  - توليد تلقائي لخريطة الموقع `sitemap.ts`
  - ملف التوجيه والزواحف `robots.ts`
  - وسوم OpenGraph و Schema.org لتحسين الظهور في نتائج Google.

---

## 🛠️ التقنيات المستخدمة | Tech Stack

- **إطار العمل (Framework)**: Next.js 15 (App Router)
- **مكتبة الواجهات (UI Library)**: React 19
- **لغة البرمجة (Language)**: TypeScript 5.7
- **التصميم والأنماط (Styling)**: Tailwind CSS 3.4 + PostCSS
- **الأيقونات والرموز (Icons)**: Lucide React
- **أدوات التنسيق (Utilities)**: `clsx`, `tailwind-merge`

---

## 📂 هيكل المجلدات | Directory Structure

```text
drbasimzaki/
├── .gitignore
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── public/                    # الصور الطبية، الشعارات، والأيقونات
└── src/
    ├── middleware.ts          # حماية المسارات والتحكم في الجلسات
    ├── app/                   # مسارات Next.js App Router
    │   ├── layout.tsx         # القالب العام وتضمين الخطوط
    │   ├── page.tsx           # الصفحة الرئيسية
    │   ├── about/             # صفحة السيرة الذاتية للجراح
    │   ├── services/          # صفحات العمليات والإجراءات
    │   ├── cases/             # معرض حالات قبل وبعد
    │   ├── clinics/           # خريطة ودليل الفروع والعيادات
    │   ├── contact/           # صفحة الحجز والاستشارات
    │   ├── faq/               # الأسئلة الشائعة
    │   ├── admin/             # لوحة تحكم الطبيب والعيادة
    │   ├── sitemap.ts         # خريطة الموقع لمحركات البحث
    │   └── robots.ts          # ملف إرشادات محركات البحث
    ├── components/            # مكونات الواجهة التفاعلية
    │   ├── BeforeAfterSection.tsx
    │   ├── ClinicsSection.tsx
    │   ├── DoctorBioSection.tsx
    │   ├── Header.tsx & Footer.tsx
    │   ├── HeroSection.tsx
    │   └── LanguageSwitcher.tsx
    ├── context/               # سياق إدارة اللغة والبيانات
    ├── data/                  # محتوى وبيانات الخدمات والحالات
    └── lib/                   # دوال مساعدة ومولدات العناوين
```

---

## 🚀 التشغيل والتطوير المحلي | Local Development

### 1. تثبيت الحزم:
```bash
npm install
```

### 2. تشغيل بيئة التطوير:
```bash
npm run dev
```
افتح المتصفح على: `http://localhost:3000`

### 3. الفحص البرمجي والبناء للإنتاج:
```bash
# فحص الكود
npm run lint

# بناء نسخة الإنتاج المحسنة
npm run build

# تشغيل خادم الإنتاج
npm run start
```

---

## 📄 الملكية والحقوق | Copyright
جميع الحقوق محفوظة © د. باسم زكي (Dr. Basim Zaki).
