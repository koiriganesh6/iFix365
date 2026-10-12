import { sendAdminEmail } from '../services/resend.js';
import { buildNotificationEmail } from '../services/email-template.js';
import { normalizeIndianPhone, validateRepair } from '../../shared/repair-validation.mjs';

const FIELDS = ['name', 'product', 'phone', 'category', 'issue', 'email', 'issueDetails'];
const DEVICE_NAMES = { iphone: 'iPhone', android: 'Android phones', macbook: 'MacBook', windows: 'Windows laptops', tablet: 'iPad and tablets', watch: 'Smartwatches' };

export async function createRepair(req, res, next) {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const d = {};
  for (const key of FIELDS) d[key] = typeof body[key] === 'string' ? body[key].trim() : '';
  const errors = validateRepair(d);
  if (Object.keys(errors).length) return res.status(400).json({ message: 'Please fix the highlighted fields.', errors });
  d.phone = normalizeIndianPhone(d.phone);
  d.email = d.email.toLowerCase();
  const fields = [['Name', d.name], ['Product', d.product], ['Phone', d.phone], ['Device type', DEVICE_NAMES[d.category]], ['Email', d.email]];
  const issueMessage = d.issue === 'Something else' ? `${d.issue}\n\n${d.issueDetails}` : d.issue;
  try {
    await sendAdminEmail({
      subject: 'New repair booking request',
      replyTo: d.email,
      html: buildNotificationEmail({ title: 'New repair booking request', fields, messageLabel: 'Issue', message: issueMessage, replyTo: d.email }),
      text: ['New repair booking request', '', ...fields.map(([label, value]) => `${label}: ${value}`), '', 'Issue:', issueMessage].join('\n'),
    });
    return res.status(201).json({ ok: true });
  } catch (error) {
    return next(error);
  }
}
