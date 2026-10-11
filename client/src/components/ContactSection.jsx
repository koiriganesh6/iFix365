import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { BUSINESS, ready, mapLink } from '../config.js';
import { submitContact } from '../services/api.js';

const Missing = () => <span className="missing">Add in src/config.js</span>;

export default function ContactSection() {
  const [f, setF] = useState({ name: '', phone: '', email: '', message: '' });
  const [err, setErr] = useState({});
  const [status, setStatus] = useState('idle');
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErr({ ...err, [k]: undefined }); };
  const send = async (e) => {
    e.preventDefault();
    const x = {};
    if (f.name.trim().length < 2 || f.name.trim().length > 80) x.name = 'Enter a name between 2 and 80 characters';
    if (!/^[+]?[\d\s-]{10,14}$/.test(f.phone.trim())) x.phone = 'Enter a valid phone number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) x.email = 'Enter a valid email address';
    if (f.message.trim().length < 5 || f.message.trim().length > 1000) x.message = 'Write a message between 5 and 1000 characters';
    setErr(x);
    if (Object.keys(x).length) return;
    setStatus('sending');
    try {
      await submitContact(f);
      setStatus('sent');
      setF({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      setStatus(error.errors ? 'idle' : 'error');
      if (error.errors) setErr(error.errors);
    }
  };

  if (status === 'sent') {
    return <section className="section container contact" id="contact"><div className="form-card" role="status"><h2>Message sent</h2><p>Your message has been emailed to our team. We’ll get back to you soon.</p></div></section>;
  }

  return (
    <section className="section container contact" id="contact">
      <div className="contact-info">
        <h2>Talk to us</h2>
        <p>Ask about a repair, a price or a booking. Send us a message and our team will reply by email.</p>
        <ul>
          <li><Mail /><div><strong>Email</strong><a href="#contact-form">Send us a message</a></div></li>
          <li><Phone /><div><strong>Phone</strong>{ready('phone') ? <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a> : <Missing />}</div></li>
          <li><MessageCircle /><div><strong>WhatsApp</strong>{ready('phone') ? <a href={`https://wa.me/${BUSINESS.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">Chat with us</a> : <Missing />}</div></li>
          <li><MapPin /><div><strong>Address</strong>{ready('address') ? <a href={mapLink()} target="_blank" rel="noopener noreferrer">{BUSINESS.address}</a> : <Missing />}</div></li>
          <li><Clock /><div><strong>Hours</strong>{ready('hours') ? <span>{BUSINESS.hours}</span> : <Missing />}</div></li>
        </ul>
      </div>
      <form className="form-card" id="contact-form" onSubmit={send} noValidate>
        <h3>Send us an email</h3>
        {[['name', 'Your name', 'text'], ['phone', 'Phone number', 'tel']].map(([k, l, t]) => (
          <label className="field" key={k}>{l}<input type={t} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} />{err[k] && <span className="err" role="alert">{err[k]}</span>}</label>))}
        <label className="field">Email address<input type="email" autoComplete="email" value={f.email} onChange={set('email')} aria-invalid={!!err.email} />{err.email && <span className="err" role="alert">{err.email}</span>}</label>
        <label className="field">Your question<textarea rows="4" value={f.message} onChange={set('message')} aria-invalid={!!err.message} />{err.message && <span className="err" role="alert">{err.message}</span>}</label>
        {status === 'error' && <p className="err banner" role="alert">We couldn’t send your message. Please try again later.</p>}
        <button className="btn btn-primary" type="submit" disabled={status === 'sending'}><Send size={18} /> {status === 'sending' ? 'Sending…' : 'Send message'}</button>
        <small>Your message is sent securely to our team; we’ll reply to your email address.</small>
      </form>
    </section>
  );
}
