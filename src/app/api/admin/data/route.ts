import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSiteData, updateSiteData } from '@/lib/dataStore';

export const dynamic = 'force-static';
import { verifySignedToken, AUTH_COOKIE_NAME } from '@/lib/adminAuth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!verifySignedToken(token)) {
      return NextResponse.json(
        { error: 'غير مصرح لك بالوصول لبيانات لوحة التحكم (يرجى تسجيل الدخول)' },
        { status: 401 }
      );
    }

    const data = getSiteData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch site data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!verifySignedToken(token)) {
      return NextResponse.json(
        { error: 'غير مصرح لك بتعديل بيانات الموقع (جلسة غير صالحة أو منتهية)' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const success = updateSiteData(body);
    if (success) {
      return NextResponse.json({ message: 'Site data updated successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to update site data' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }
}
