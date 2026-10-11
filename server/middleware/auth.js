import { createHmac, timingSafeEqual } from 'crypto';
const sig = (b) => createHmac('sha256', process.env.ADMIN_SECRET || '').update(b).digest('base64url');
const same = (a, b) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
export const configured = () => Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SECRET);
export const checkPassword = (p) => typeof p === 'string' && same(p, process.env.ADMIN_PASSWORD);
export function signToken() {
  const body = Buffer.from(JSON.stringify({ exp: Date.now() + 8 * 3600 * 1000 })).toString('base64url');
  return `${body}.${sig(body)}`;
}
export function requireAdmin(req, res, next) {
  if (!configured()) return res.status(503).json({ message: 'Admin is not configured on the server.' });
  const [body, s] = (req.headers.authorization || '').replace('Bearer ', '').split('.');
  try {
    if (body && s && same(s, sig(body)) && JSON.parse(Buffer.from(body, 'base64url')).exp > Date.now()) return next();
  } catch { /* fall through */ }
  res.status(401).json({ message: 'Please log in again.' });
}
