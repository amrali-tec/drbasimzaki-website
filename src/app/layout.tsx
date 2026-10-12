import type { Metadata } from 'next';
import './globals.css';
import { getSiteData } from '@/lib/dataStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';
import { LanguageProvider } from '@/context/LanguageContext';

export async function generateMetadata(): Promise<Metadata> {
  const siteData = getSiteData();
  const doc = siteData.doctor;

  return {
    metadataBase: new URL('https://drbasimzaki.com'),
    title: `${doc.name} | أستاذ جراحة التجميل ونحت القوام - جامعة عين شمس`,
    description: doc.bio,
    keywords: [
      'دكتور باسم زكي',
      'دكتور باسم زكي تجميل',
      'أستاذ جراحة التجميل عين شمس',
      'أفضل دكتور شفط دهون بالفيزر في مصر',
      'نحت القوام 4D بالفيزر والجي بلازما',
      'شد البطن مدينة نصر والدقي',
      'تجميل الثدي وتكبير الثدي',
      'علاج التثدي عند الرجال في مصر',
      'تجميل الأنف القاهرة',
      'كايرو كوزمو سنتر Cairo Cosmo Center',
      'تكلفة عملية شد البطن 2026',
      '4D Vaser Liposuction Cairo',
      'Plastic surgeon Ain Shams University'
    ],
    alternates: {
      canonical: 'https://drbasimzaki.com',
    },
    openGraph: {
      title: `${doc.name} | أستاذ جراحة التجميل ونحت القوام`,
      description: doc.bio,
      url: 'https://drbasimzaki.com',
      siteName: 'عيادة أ.د. باسم زكي لجراحة التجميل',
      images: [
        {
          url: '/Photos/1.jpeg',
          width: 800,
          height: 800,
          alt: 'أ.د. باسم زكي',
        },
      ],
      locale: 'ar_EG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${doc.name} | أستاذ جراحة التجميل ونحت القوام`,
      description: doc.bio,
      images: ['/Photos/1.jpeg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteData = getSiteData();

  const physicianSchema = {
    '@context': 'https://schema.org',
    '@type': ['Physician', 'MedicalClinic'],
    '@id': 'https://drbasimzaki.com/#clinic',
    name: 'عيادة أ.د. باسم محمد زكي - جراحة التجميل ونحت القوام',
    alternateName: 'Prof. Dr. Basim Zaki Clinic & Cairo Cosmo Center',
    url: 'https://drbasimzaki.com',
    logo: 'https://drbasimzaki.com/Photos/1.jpeg',
    image: 'https://drbasimzaki.com/Photos/1.jpeg',
    telephone: ['+201201134051', '+201012710004'],
    priceRange: '$$$',
    medicalSpecialty: ['PlasticSurgery'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '39 شارع شمس الدين الذهبي - أرض الجولف',
      addressLocality: 'مدينة نصر',
      addressRegion: 'القاهرة',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.0715,
      longitude: 31.3361,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '12:00',
        closes: '21:00',
      },
    ],
    founder: {
      '@type': 'Person',
      name: 'أ.د. باسم محمد زكي',
      alternateName: 'Prof. Dr. Basim Mohamed Zaki',
      jobTitle: 'أستاذ جراحة التجميل ورئيس مجلس إدارة كايرو كوزمو سنتر',
      worksFor: [
        {
          '@type': 'EducationalOrganization',
          name: 'كلية الطب جامعة عين شمس - Ain Shams University',
        },
        {
          '@type': 'MedicalOrganization',
          name: 'كايرو كوزمو سنتر - Cairo Cosmo Center',
        },
      ],
    },
  };

  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
        />
      </head>
      <body className="antialiased bg-navy-950 text-slate-100 font-tajawal">
        <LanguageProvider>
          <Header doctor={siteData.doctor} />
          <main>{children}</main>
          <Footer doctor={siteData.doctor} />
          <FloatingCta doctor={siteData.doctor} />
        </LanguageProvider>
      </body>
    </html>
  );
}
