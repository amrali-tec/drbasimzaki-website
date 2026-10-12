import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'siteData.json');

export interface ClinicBranch {
  id: string;
  name: string;
  nameEn?: string;
  address: string;
  addressEn?: string;
  workHours: string;
  workHoursEn?: string;
  phone: string;
  mapLink: string;
}

export interface DoctorInfo {
  name: string;
  nameEn?: string;
  title: string;
  titleEn?: string;
  subTitle: string;
  subTitleEn?: string;
  bio: string;
  bioEn?: string;
  experienceYears: number;
  surgeriesCount: number;
  satisfactionRate: number;
  phones: string[];
  whatsapp: string;
  email: string;
  facebook: string;
  instagram: string;
  youtube: string;
  clinics: ClinicBranch[];
}

export interface ServiceFaq {
  question: string;
  questionEn?: string;
  answer: string;
  answerEn?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  categorySlug: string;
  title: string;
  titleEn?: string;
  shortDescription: string;
  shortDescriptionEn?: string;
  fullDescription: string;
  fullDescriptionEn?: string;
  image?: string;
  benefits: string[];
  benefitsEn?: string[];
  metaTitle: string;
  metaDescription: string;
  focusKeywords: string;
  faqs: ServiceFaq[];
}

export interface CategoryItem {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  icon: string;
}

export interface LandingPageItem {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  heroHeadline: string;
  heroHeadlineEn?: string;
  heroSubheadline: string;
  heroSubheadlineEn?: string;
  ctaText: string;
  ctaTextEn?: string;
  ctaPhone: string;
  discountBadge: string;
  discountBadgeEn?: string;
  features: string[];
  featuresEn?: string[];
  targetKeywords: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  descriptionEn?: string;
}

export interface BookingRequestItem {
  id: string;
  patientName: string;
  phone: string;
  service: string;
  clinicBranch: string;
  createdAt: string;
  status: 'جديد' | 'تم التواصل' | 'مؤكد' | 'ملغي';
  notes?: string;
  source: 'موقع إلكتروني' | 'إعلانات جوجل' | 'واتساب مباشر';
}

export interface CustomerMessageItem {
  id: string;
  senderName: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  repliedViaWhatsapp: boolean;
}

export interface MedicalCenterItem {
  id: string;
  name: string;
  nameEn?: string;
  role: string;
  roleEn?: string;
  type: 'رئاسة وإدارة' | 'صرح أكاديمي' | 'مركز تخصصي';
  typeEn?: string;
  description: string;
  descriptionEn?: string;
  location: string;
  locationEn?: string;
}

export interface AnalyticsSummary {
  totalVisitsMonth: number;
  totalBookingsMonth: number;
  googleAdsConversions: number;
  organicSeoConversions: number;
  whatsappInquiries: number;
  topServices: Array<{ name: string; count: number }>;
}

export interface SiteData {
  doctor: DoctorInfo;
  categories: CategoryItem[];
  services: ServiceItem[];
  landingPages: LandingPageItem[];
  beforeAfterCases: BeforeAfterItem[];
  bookingRequests: BookingRequestItem[];
  customerMessages: CustomerMessageItem[];
  medicalCenters: MedicalCenterItem[];
  analytics: AnalyticsSummary;
}

export function getSiteData(): SiteData {
  try {
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading siteData.json:', error);
    throw new Error('Failed to read site data');
  }
}

export function updateSiteData(newData: SiteData): boolean {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing siteData.json:', error);
    return false;
  }
}
