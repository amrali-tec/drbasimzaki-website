import crypto from 'crypto';

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
export const SERVER_SECRET = process.env.ADMIN_SECRET || 'change-me-in-production-env';
export const AUTH_COOKIE_NAME = 'admin_session_token';

// Rate Limiting Map for Brute-Force Protection
// IP/Client Key -> { attempts: number, lockUntil: number }
export const loginAttempts = new Map<string, { attempts: number; lockUntil: number }>();

export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;
  return '127.0.0.1';
}

export function generateSignedToken(username: string): string {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const payload = `${username}:${timestamp}`;
  const hmac = crypto.createHmac('sha256', SERVER_SECRET).update(payload).digest('hex');
  return `${payload}:${hmac}`;
}

export function verifySignedToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(':');
  if (parts.length !== 3) return false;

  const [username, timestampStr, hmac] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Token valid for 24 hours (86400 seconds)
  const now = Math.floor(Date.now() / 1000);
  if (now - timestamp > 86400 || timestamp > now + 300) return false;

  // Re-compute expected HMAC
  const expectedHmac = crypto
    .createHmac('sha256', SERVER_SECRET)
    .update(`${username}:${timestampStr}`)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac));
  } catch (err) {
    return false;
  }
}
