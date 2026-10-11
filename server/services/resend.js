const RESEND_URL = 'https://api.resend.com/emails';

export async function sendAdminEmail({ subject, text, html, replyTo }) {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, ADMIN_EMAIL } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !ADMIN_EMAIL) {
    const error = new Error('Email service is not configured.');
    error.status = 503;
    error.clientMessage = 'Email service is not available. Please try again later.';
    throw error;
  }

  const response = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject,
      text,
      ...(html ? { html } : {}),
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorName = typeof result?.name === 'string' ? result.name : 'unknown_error';
    const errorMessage = typeof result?.message === 'string' ? result.message : 'No error details returned.';
    const error = new Error(
      `Resend rejected an email request with status ${response.status} (${errorName}): ${errorMessage}`,
    );
    error.status = 502;
    error.clientMessage = 'We could not send your message. Please try again later.';
    throw error;
  }

  return result;
}
