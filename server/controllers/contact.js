import { sendAdminEmail } from '../services/resend.js';
import { buildNotificationEmail } from '../services/email-template.js';

export async function createContactMessage(req, res, next) {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const errors = {};

  if (name.length < 2 || name.length > 80) errors.name = 'Enter a name between 2 and 80 characters';
  if (!/^[+]?[\d\s-]{10,14}$/.test(phone)) errors.phone = 'Enter a valid phone number';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) errors.email = 'Enter a valid email address';
  if (message.length < 5 || message.length > 1000) errors.message = 'Write a message between 5 and 1000 characters';
  if (Object.keys(errors).length) return res.status(400).json({ message: 'Please fix the highlighted fields.', errors });

  try {
    await sendAdminEmail({
      subject: 'New website contact message',
      replyTo: email,
      html: buildNotificationEmail({
        title: 'New contact message',
        fields: [['Name', name], ['Phone', phone], ['Email', email]],
        messageLabel: 'Message',
        message,
        replyTo: email,
      }),
      text: [
        'New contact message',
        '',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    });
    return res.status(201).json({ ok: true });
  } catch (error) {
    return next(error);
  }
}
