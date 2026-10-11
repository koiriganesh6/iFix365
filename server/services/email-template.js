const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const formatText = (value) => escapeHtml(value).replace(/\r\n|\r|\n/g, '<br>');

export function buildNotificationEmail({ title, fields, messageLabel, message, replyTo }) {
  const rows = fields.map(([label, value]) => `
    <tr>
      <th scope="row" align="left" valign="top" style="width:35%;padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;font-weight:600;">${escapeHtml(label)}</th>
      <td valign="top" style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;word-break:break-word;">${formatText(value)}</td>
    </tr>`).join('');

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9;">
    <tr><td align="center" style="padding:24px 12px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:16px;">
        <tr><td style="padding:28px 24px;background-color:#1d4ed8;border-radius:16px 16px 0 0;">
          <p style="margin:0 0 8px;color:#ffffff;font-size:24px;font-weight:700;">iFix365</p>
          <p style="margin:0;color:#dbeafe;font-size:13px;">Website notification</p>
        </td></tr>
        <tr><td style="padding:28px 24px;">
          <h1 style="margin:0 0 12px;color:#0f172a;font-size:24px;line-height:1.3;">${escapeHtml(title)}</h1>
          <p style="margin:0 0 24px;color:#64748b;font-size:14px;line-height:1.6;">A customer submitted the following details through your website.</p>
          <table width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-collapse:collapse;table-layout:fixed;">${rows}</table>
          <h2 style="margin:24px 0 12px;color:#0f172a;font-size:16px;">${escapeHtml(messageLabel)}</h2>
          <div style="padding:16px;background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;color:#334155;font-size:14px;line-height:1.7;word-break:break-word;">${formatText(message)}</div>
          <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:24px;"><tr><td bgcolor="#1d4ed8" style="border-radius:8px;">
            <a href="mailto:${escapeHtml(encodeURIComponent(replyTo))}" style="display:inline-block;padding:14px 22px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;">Reply to customer</a>
          </td></tr></table>
          <p style="margin:16px 0 0;color:#64748b;font-size:12px;line-height:1.6;">You can also use your email app’s Reply button to contact the customer.</p>
        </td></tr>
        <tr><td style="padding:18px 24px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;">iFix365 · Contact and repair requests</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
