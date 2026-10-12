import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { getSiteData } from '@/lib/dataStore';
import { Phone, MessageCircle, ShieldCheck, Star, Award, CheckCircle2, Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const siteData = getSiteData();
  return siteData.landingPages.map((lp) => ({
    slug: lp.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const siteData = getSiteData();
  const lp = siteData.landingPages.find((p) => p.slug === slug);

  if (!lp) {
    return { title: 'عرض تجميلي خاص' };
  }

  return {
    title: `${lp.title} | أ.د. باسم زكي`,
    description: lp.heroSubheadline,
  };
}

import LandingClient from './LandingClient';

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const siteData = getSiteData();
  const lp = siteData.landingPages.find((p) => p.slug === slug);

  if (!lp) {
    notFound();
  }

  return <LandingClient lp={lp} doctor={siteData.doctor} />;
}
