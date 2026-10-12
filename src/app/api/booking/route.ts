import { NextResponse } from 'next/server';
import { getSiteData, updateSiteData, BookingRequestItem, CustomerMessageItem } from '@/lib/dataStore';

export const dynamic = 'force-static';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const siteData = getSiteData();

    if (body.type === 'message') {
      const newMsg: CustomerMessageItem = {
        id: `msg-${Date.now()}`,
        senderName: body.name || 'زائر',
        phone: body.phone || '',
        email: body.email || '',
        subject: body.subject || 'استفسار تجميلي',
        message: body.message || '',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        isRead: false,
        repliedViaWhatsapp: false,
      };

      siteData.customerMessages = [newMsg, ...(siteData.customerMessages || [])];
    } else {
      const newBooking: BookingRequestItem = {
        id: `bk-${Date.now()}`,
        patientName: body.name || 'حجز جديد',
        phone: body.phone || '',
        service: body.service || 'شفط الدهون ونحت الجسم',
        clinicBranch: body.clinicBranch || 'مدينة نصر',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'جديد',
        notes: body.notes || 'طلب حجز من الموقع',
        source: body.source || 'موقع إلكتروني',
      };

      siteData.bookingRequests = [newBooking, ...(siteData.bookingRequests || [])];
      siteData.analytics.totalBookingsMonth = (siteData.analytics.totalBookingsMonth || 0) + 1;
    }

    updateSiteData(siteData);
    return NextResponse.json({ success: true, message: 'تم استلام الطلب وتوجيهه للأدمن بنجاح' });
  } catch (error) {
    console.error('Error saving booking request:', error);
    return NextResponse.json({ error: 'حدث خطأ في معالجة الطلب' }, { status: 500 });
  }
}
