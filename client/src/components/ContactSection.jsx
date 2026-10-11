import { useState } from 'react';
import { MessageCircle, Phone, MapPin, Clock, Send } from 'lucide-react';
import { BUSINESS, ready, waLink, mapLink } from '../config.js';

const Missing = () => <span className="missing">Add in src/config.js</span>;

export default function ContactSection() {
  const [f, setF] = useState({ name: '', phone: '', message: '' });
  const [err, setErr] = useState({});
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErr({ ...err, [k]: undefined }); };
  const send = (e) => {
    e.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = 'Enter your name';
    if (!/^[+]?[\d\s-]{10,14}$/.test(f.phone)) x.phone = 'Enter a valid phone number';
    if (f.message.trim().length < 5) x.message = 'Write your question';
    setErr(x);
    if (Object.keys(x).length || !ready('whatsapp')) return;
    window.open(waLink(`Hi ${BUSINESS.name}, I'm ${f.name.trim()} (${f.phone.trim()}).\n${f.message.trim()}`), '_blank', 'noopener');
  };
  return (
    <section className="section container contact">
      <div className="contact-info">
        <h2>Talk to us</h2>
        <p>Ask about a repair, a price or a booking. WhatsApp is the fastest way to reach us.</p>
        <ul>
          <li><MessageCircle /><div><strong>WhatsApp</strong>{ready('whatsapp') ? <a href={waLink('Hi, I need help with a repair.')} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a> : <Missing />}</div></li>
          <li><Phone /><div><strong>Phone</strong>{ready('phone') ? <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a> : <Missing />}</div></li>
          <li><MapPin /><div><strong>Address</strong>{ready('address') ? <a href={mapLink()} target="_blank" rel="noopener noreferrer">{BUSINESS.address}</a> : <Missing />}</div></li>
          <li><Clock /><div><strong>Hours</strong>{ready('hours') ? <span>{BUSINESS.hours}</span> : <Missing />}</div></li>
        </ul>
      </div>
      <form className="form-card" onSubmit={send} noValidate>
        <h3>Send a message on WhatsApp</h3>
        {[['name', 'Your name', 'text'], ['phone', 'Phone number', 'tel']].map(([k, l, t]) => (
          <label className="field" key={k}>{l}<input type={t} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} />{err[k] && <span className="err" role="alert">{err[k]}</span>}</label>))}
        <label className="field">Your question<textarea rows="4" value={f.message} onChange={set('message')} aria-invalid={!!err.message} />{err.message && <span className="err" role="alert">{err.message}</span>}</label>
        {!ready('whatsapp') && <p className="err banner">WhatsApp number is not set yet. Add it in src/config.js.</p>}
        <button className="btn btn-wa" type="submit"><Send size={18} /> Open WhatsApp</button>
        <small>This opens WhatsApp with your message ready to send.</small>
      </form>
    </section>
  );
}
