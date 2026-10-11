import { useEffect, useMemo, useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Trash2, LogOut, RefreshCw } from 'lucide-react';
import { adminLogin, adminLogout, adminLoggedIn, adminList, adminStatus, adminDelete } from '../services/api.js';

const STATUSES = ['new', 'contacted', 'in-progress', 'completed', 'cancelled'];
const waNumber = (p) => { const d = p.replace(/\D/g, ''); return d.length === 10 ? '91' + d : d; }; // assumes India for 10-digit numbers

function Login({ onDone }) {
  const [pw, setPw] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const go = async (e) => {
    e.preventDefault(); setBusy(true); setErr('');
    try { await adminLogin(pw); onDone(); } catch (x) { setErr(x.message); } finally { setBusy(false); }
  };
  return (
    <form className="form-card narrow-card" onSubmit={go}>
      <h1>Admin login</h1>
      <label className="field">Password<input type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" /></label>
      {err && <p className="err banner" role="alert">{err}</p>}
      <button className="btn btn-primary" disabled={busy || !pw}>{busy ? 'Checking…' : 'Log in'}</button>
    </form>
  );
}

function Dashboard({ onOut }) {
  const [rows, setRows] = useState([]); const [state, setState] = useState('loading'); const [err, setErr] = useState('');
  const [filter, setFilter] = useState('all'); const [q, setQ] = useState('');
  const load = async () => {
    setState('loading');
    try { setRows(await adminList()); setState('ok'); }
    catch (e) { if (e.status === 401) return onOut(); setErr(e.message); setState('error'); }
  };
  useEffect(() => { load(); }, []);
  const counts = useMemo(() => Object.fromEntries(STATUSES.map((s) => [s, rows.filter((r) => r.status === s).length])), [rows]);
  const shown = rows.filter((r) => (filter === 'all' || r.status === filter) && JSON.stringify(r).toLowerCase().includes(q.toLowerCase()));
  const change = async (id, status) => { try { const u = await adminStatus(id, status); setRows(rows.map((r) => (r._id === id ? u : r))); } catch (e) { setErr(e.message); } };
  const del = async (id) => { if (!confirm('Delete this request permanently?')) return; try { await adminDelete(id); setRows(rows.filter((r) => r._id !== id)); } catch (e) { setErr(e.message); } };

  return (
    <>
      <div className="row between adm-head">
        <h1>Repair requests</h1>
        <div className="row"><button className="btn btn-ghost" onClick={load}><RefreshCw size={16} /> Refresh</button><button className="btn btn-ghost" onClick={onOut}><LogOut size={16} /> Log out</button></div>
      </div>
      <div className="adm-stats">
        <button className={`stat ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}><b>{rows.length}</b>All</button>
        {STATUSES.map((s) => <button key={s} className={`stat ${filter === s ? 'on' : ''}`} onClick={() => setFilter(s)}><b>{counts[s]}</b>{s}</button>)}
      </div>
      <input className="adm-search" placeholder="Search name, phone, device, issue…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search requests" />
      {err && <p className="err banner" role="alert">{err}</p>}
      {state === 'loading' && <p>Loading…</p>}
      {state === 'ok' && !shown.length && <p>No requests found.</p>}
      <ul className="adm-list">
        {shown.map((r) => (
          <li key={r._id} className="adm-card">
            <div className="row between">
              <div><h3>{r.name}</h3><small>{new Date(r.createdAt).toLocaleString()}</small></div>
              <select value={r.status} onChange={(e) => change(r._id, e.target.value)} aria-label={`Status for ${r.name}`} className={`badge s-${r.status}`}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
            </div>
            <p><strong>{r.brand} {r.model}</strong> ({r.category}) · {r.issue}</p>
            {r.details && <p className="adm-note">{r.details}</p>}
            <p className="adm-meta"><MapPin size={14} /> {r.location}{r.date && <> · Preferred: {r.date} {r.time}</>}</p>
            <div className="row adm-actions">
              <a className="btn btn-ghost" href={`tel:${r.phone}`}><Phone size={15} /> {r.phone}</a>
              <a className="btn btn-ghost" href={`https://wa.me/${waNumber(r.phone)}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} /> WhatsApp</a>
              <a className="btn btn-ghost" href={`mailto:${r.email}`}><Mail size={15} /> Email</a>
              <button className="btn btn-ghost danger" onClick={() => del(r._id)} aria-label="Delete request"><Trash2 size={15} /></button>
            </div>
          </li>))}
      </ul>
    </>
  );
}

export default function Admin() {
  const [auth, setAuth] = useState(adminLoggedIn());
  useEffect(() => { document.title = 'Admin – iFix365'; }, []);
  const out = () => { adminLogout(); setAuth(false); };
  return <section className="section container">{auth ? <Dashboard onOut={out} /> : <Login onDone={() => setAuth(true)} />}</section>;
}
