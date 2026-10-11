import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { services, devices } from '../data/content.js';
export default function RepairServices({ limit }) {
  const [f, setF] = useState('all');
  const list = services.filter((s) => f === 'all' || s.for.includes(f)).slice(0, limit || 99);
  return (
    <section className="section container">
      <h2>Repairs we offer</h2>
      {!limit && <div className="chips" role="group" aria-label="Filter by device">
        {[{ id: 'all', name: 'All devices' }, ...devices].map((d) => <button key={d.id} className={`chip ${f === d.id ? 'on' : ''}`} aria-pressed={f === d.id} onClick={() => setF(d.id)}>{d.name}</button>)}
      </div>}
      <ul className="services">
        {list.map((s) => { const I = Icons[s.icon]; return (
          <li key={s.id} className="service">
            <I size={22} />
            <div><h3>{s.name}</h3><p>{s.desc}</p>{s.time && <small>Typical time: {s.time}. </small>}{s.warranty && <small>Warranty: {s.warranty}</small>}</div>
            <Link to="/book" state={{ issue: s.name }} className="link">{s.price ? `From ${s.price}` : 'Request a quote'}</Link>
          </li>); })}
      </ul>
    </section>
  );
}
