import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getSiteData } from '@/lib/dataStore';
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Sparkles, ShieldCheck, HelpCircle, GraduationCap, Award, Crown, Quote } from 'lucide-react';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const siteData = getSiteData();
  return siteData.services.map((service) => ({
    category: service.categorySlug,
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const siteData = getSiteData();
  const service = siteData.services.find((s) => s.slug === slug);

  if (!service) {
    return { title: 'الخدمة غير موجودة' };
  }

  return {
    title: service.metaTitle || `${service.title} | أ.د. باسم زكي`,
    description: service.metaDescription || service.shortDescription,
    keywords: service.focusKeywords ? service.focusKeywords.split(',') : [],
  };
}

import ServiceDetailClient from './ServiceDetailClient';

export default async function ServicePage({ params }: PageProps) {
  const { category, slug } = await params;
  const siteData = getSiteData();
  const service = siteData.services.find((s) => s.slug === slug);
  const cat = siteData.categories.find((c) => c.slug === category);

  if (!service) {
    notFound();
  }

  // Schema.org MedicalProcedure JSON-LD
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": service.title,
    "description": service.fullDescription,
    "bodyLocation": cat ? cat.title : "تجميل وتنسيق القوام",
    "procedureType": "Surgical/Non-Surgical Aesthetic Procedure",
    "howPerformed": service.fullDescription,
    "performer": {
      "@type": "Physician",
      "name": siteData.doctor.name,
      "medicalSpecialty": "Plastic Surgery"
    }
  };

  return (
    <div className="py-12 bg-navy-950 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <ServiceDetailClient service={service} cat={cat} doctor={siteData.doctor} />
    </div>
  );
}
