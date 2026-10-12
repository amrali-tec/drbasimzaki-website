import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export const dynamic = 'force-static';
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  AUTH_COOKIE_NAME,
  loginAttempts,
  getClientIdentifier,
  generateSignedToken,
  verifySignedToken,
} from '@/lib/adminAuth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (verifySignedToken(token)) {
      return NextResponse.json({ authenticated: true, username: ADMIN_USERNAME });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: 'Auth verification error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const clientKey = getClientIdentifier(request);
    const now = Date.now();
    const clientAttempt = loginAttempts.get(clientKey) || { attempts: 0, lockUntil: 0 };

    // Check if client is locked out due to brute-force attempts
    if (clientAttempt.lockUntil > now) {
      const remainingSeconds = Math.ceil((clientAttempt.lockUntil - now) / 1000);
      return NextResponse.json(
        {
          success: false,
          error: `تم حظر محاولات الدخول مؤقتاً لحماية الحساب من الهجمات. يرجى الانتظار ${remainingSeconds} ثانية.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { username, password, action } = body;

    // Handle logout action
    if (action === 'logout') {
      const cookieStore = await cookies();
      cookieStore.delete(AUTH_COOKIE_NAME);
      return NextResponse.json({ success: true, message: 'Logged out successfully' });
    }

    // Input sanitization & constant time validation
    const inputUser = (username || '').trim().toLowerCase();
    const inputPass = (password || '').trim();

    const expectedUser = ADMIN_USERNAME.toLowerCase();

    // Constant-time length & value check
    const isUserValid =
      inputUser.length === expectedUser.length &&
      crypto.timingSafeEqual(Buffer.from(inputUser), Buffer.from(expectedUser));

    const isPassValid =
      inputPass.length === ADMIN_PASSWORD.length &&
      crypto.timingSafeEqual(Buffer.from(inputPass), Buffer.from(ADMIN_PASSWORD));

    if (isUserValid && isPassValid) {
      // Clear failed attempts on success
      loginAttempts.delete(clientKey);

      const token = generateSignedToken(ADMIN_USERNAME);
      const cookieStore = await cookies();

      cookieStore.set(AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({ success: true, message: 'Login successful' });
    }

    // Increment failed attempts count on error
    clientAttempt.attempts += 1;
    if (clientAttempt.attempts >= 5) {
      clientAttempt.lockUntil = now + 15 * 60 * 1000; // 15 minutes lockout
    }
    loginAttempts.set(clientKey, clientAttempt);

    return NextResponse.json(
      {
        success: false,
        error: 'اسم المستخدم أو كلمة المرور غير صحيحة',
        attemptsLeft: Math.max(0, 5 - clientAttempt.attempts),
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid security payload' }, { status: 400 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }
}
