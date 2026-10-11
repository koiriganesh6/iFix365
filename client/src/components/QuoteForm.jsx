import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { devices, services } from '../data/content.js';
import { submitRepair } from '../services/api.js';

const STEPS = ['Device', 'Issue', 'Your details', 'Review'];
const rules = [
  { category: (v) => !v && 'Choose a device type', brand: (v) => !v.trim() && 'Enter the brand', model: (v) => !v.trim() && 'Enter the model' },
  { issue: (v) => !v && 'Choose an issue' },
  { name: (v) => v.trim().length < 2 && 'Enter your name', phone: (v) => !/^[+]?[\d\s-]{10,14}$/.test(v) && 'Enter a valid phone number',
    email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && 'Enter a valid email', location: (v) => !v.trim() && 'Enter your address or area' },
  {},
];

function Field({ k, label, v, err, set, type = 'text', ...p }) {
  return (
    <label className="field">{label}
      <input type={type} value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k] ? `${k}-e` : undefined} {...p} />
      {err[k] && <span id={`${k}-e`} className="err" role="alert">{err[k]}</span>}
    </label>
  );
}

export default function QuoteForm() {
  const { state } = useLocation();
  const [step, setStep] = useState(0);
  const [v, setV] = useState({ category: state?.category || '', brand: '', model: state?.model || '', issue: state?.issue || '', name: '', phone: '', email: '', location: '', date: '', time: '', details: '' });
  const [err, setErr] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [msg, setMsg] = useState('');
  const set = (k) => (e) => { setV({ ...v, [k]: e.target.value }); setErr({ ...err, [k]: undefined }); };
  const fp = { v, err, set };

  const next = () => {
    const e = {};
    for (const [k, fn] of Object.entries(rules[step])) { const m = fn(v[k]); if (m) e[k] = m; }
    setErr(e);
    if (!Object.keys(e).length) setStep(step + 1);
  };
  const submit = async () => {
    setStatus('loading'); setMsg('');
    try { await submitRepair(v); setStatus('success'); }
    catch (e) { setStatus('error'); setMsg(e.message); if (e.errors) { setErr(e.errors); setStep(2); } }
  };

  if (status === 'success') return <div className="form-card" role="status"><h2>Request received</h2><p>We saved your request and will contact you on {v.phone} or {v.email}.</p></div>;

  return (
    <form className="form-card" onSubmit={(e) => e.preventDefault()} noValidate>
      <ol className="progress" aria-label="Progress">{STEPS.map((s, i) => <li key={s} aria-current={i === step ? 'step' : undefined} className={i <= step ? 'done' : ''}>{s}</li>)}</ol>
      <div key={step} className="step-pane">
        {step === 0 && <>
          <label className="field">Device type
            <select value={v.category} onChange={set('category')} aria-invalid={!!err.category}><option value="">Select…</option>{devices.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select>
            {err.category && <span className="err" role="alert">{err.category}</span>}</label>
          <Field k="brand" label="Brand" {...fp} /><Field k="model" label="Model" {...fp} />
        </>}
        {step === 1 && <>
          <label className="field">Issue
            <select value={v.issue} onChange={set('issue')} aria-invalid={!!err.issue}><option value="">Select…</option>
              {services.filter((s) => !v.category || s.for.includes(v.category)).map((s) => <option key={s.id}>{s.name}</option>)}</select>
            {err.issue && <span className="err" role="alert">{err.issue}</span>}</label>
          <label className="field">Details (optional)<textarea rows="4" maxLength="1000" value={v.details} onChange={set('details')} /></label>
        </>}
        {step === 2 && <>
          <Field k="name" label="Full name" autoComplete="name" {...fp} /><Field k="phone" label="Phone" type="tel" autoComplete="tel" {...fp} />
          <Field k="email" label="Email" type="email" autoComplete="email" {...fp} /><Field k="location" label="Service location" autoComplete="street-address" {...fp} />
          <div className="two"><Field k="date" label="Preferred date (optional)" type="date" {...fp} /><Field k="time" label="Preferred time (optional)" type="time" {...fp} /></div>
        </>}
        {step === 3 && <dl className="review">{Object.entries(v).filter(([, x]) => x).map(([k, x]) => <div key={k}><dt>{k}</dt><dd>{x}</dd></div>)}</dl>}
      </div>
      {status === 'error' && <p className="err banner" role="alert">{msg}</p>}
      <div className="row between">
        <button type="button" className="btn btn-ghost" disabled={!step || status === 'loading'} onClick={() => setStep(step - 1)}>Back</button>
        {step < 3 ? <button type="button" className="btn btn-primary" onClick={next}>Continue</button>
          : <button type="button" className="btn btn-primary" disabled={status === 'loading'} onClick={submit}>{status === 'loading' ? 'Sending…' : 'Send request'}</button>}
      </div>
    </form>
  );
}
