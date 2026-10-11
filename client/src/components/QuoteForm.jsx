import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Wrench } from 'lucide-react';
import { devices } from '../data/content.js';
import { submitRepair } from '../services/api.js';
import { normalizeIndianPhone, validateRepair } from '../../../shared/repair-validation.mjs';
import { issuesForDevice } from '../../../shared/repair-issues.mjs';
import { productsForDevice } from '../../../shared/devices.mjs';

export default function QuoteForm() {
  const { state } = useLocation();
  const [values, setValues] = useState(() => ({ name: '', product: productsForDevice(state?.category).includes(state?.model) ? state.model : '', phone: '', category: state?.category || '', issue: issuesForDevice(state?.category).some((issue) => issue.name === state?.issue) ? state.issue : '', email: '' }));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const change = (key) => (event) => {
    const value = event.target.value;
    setValues((previous) => ({
      ...previous, [key]: value,
      ...(key === 'category' && !issuesForDevice(value).some((issue) => issue.name === previous.issue) ? { issue: '' } : {}),
      ...(key === 'category' && !productsForDevice(value).includes(previous.product) ? { product: '' } : {}),
    }));
    setErrors((previous) => ({ ...previous, [key]: undefined, ...(key === 'category' ? { issue: undefined, product: undefined } : {}) }));
  };
  const submit = async (event) => {
    event.preventDefault();
    if (status === 'loading') return;
    const nextErrors = validateRepair(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      event.currentTarget.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    setStatus('loading'); setMessage('');
    try {
      await submitRepair({ ...values, phone: normalizeIndianPhone(values.phone) });
      setStatus('success');
    } catch (error) {
      setStatus('error'); setMessage(error.message || 'Unable to send your request. Please try again.');
      if (error.errors) setErrors(error.errors);
    }
  };
  const inputProps = (key) => ({ name: key, value: values[key], onChange: change(key), required: true, 'aria-invalid': !!errors[key], 'aria-describedby': errors[key] ? `booking-${key}-error` : key === 'phone' ? 'booking-phone-hint' : undefined });
  const error = (key) => errors[key] && <span id={`booking-${key}-error`} className="err" role="alert">{errors[key]}</span>;

  if (status === 'success') return <div className="booking-glass booking-success" role="status"><CheckCircle2 size={46} /><h2>Request sent!</h2><p>Your repair request has been emailed to our team. We’ll contact you on {values.phone} or {values.email}.</p></div>;

  return <form className="booking-glass" onSubmit={submit} noValidate>
    <div className="booking-form-heading"><span className="booking-icon"><Wrench size={22} /></span><div><h2>Tell us what needs fixing</h2><p>Six details, one simple request.</p></div></div>
    <fieldset disabled={status === 'loading'} className="booking-fields">
      <div className="booking-grid">
        <label className="field">Full name<input {...inputProps('name')} autoComplete="name" maxLength={80} placeholder="Your full name" />{error('name')}</label>
        <label className="field">Device type<select {...inputProps('category')}><option value="">Choose your device</option>{devices.map((device) => <option key={device.id} value={device.id}>{device.name}</option>)}</select>{error('category')}</label>
        <label className="field">Product<select {...inputProps('product')} disabled={!values.category}><option value="">{values.category ? 'Choose your product' : 'Choose a device type first'}</option>{productsForDevice(values.category).map((product) => <option key={product} value={product}>{product}</option>)}</select>{error('product')}</label>
        <label className="field">Phone number<input {...inputProps('phone')} type="tel" autoComplete="tel" maxLength={24} placeholder="98765 43210" /><span className="booking-hint" id="booking-phone-hint">Indian mobile number · +91 is optional</span>{error('phone')}</label>
        <label className="field booking-full">Email address<input {...inputProps('email')} type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" />{error('email')}</label>
        <label className="field booking-full">Issue<select {...inputProps('issue')}><option value="">Choose an issue</option>{issuesForDevice(values.category).map((issue) => <option key={issue.name} value={issue.name}>{issue.label || issue.name}</option>)}</select>{error('issue')}</label>
      </div>
    </fieldset>
    {status === 'error' && <p className="err banner" role="alert">{message}</p>}
    <div className="booking-submit"><p>We’ll contact you to discuss your repair.</p><button type="submit" className="btn booking-button" disabled={status === 'loading'}>{status === 'loading' ? 'Sending…' : 'Book repair'}<ArrowUpRight size={18} aria-hidden="true" /></button></div>
  </form>;
}
