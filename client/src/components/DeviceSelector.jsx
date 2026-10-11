import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { devices } from '../data/content.js';
export default function DeviceSelector() {
  const [sel, setSel] = useState(null);
  const nav = useNavigate();
  const d = devices.find((x) => x.id === sel);
  return (
    <section id="devices" className="section container">
      <h2>What needs fixing?</h2>
      <div className="devices" role="radiogroup" aria-label="Device type">
        {devices.map((x) => { const I = Icons[x.icon]; return (
          <button key={x.id} role="radio" aria-checked={sel === x.id} className={`device ${sel === x.id ? 'on' : ''}`} onClick={() => setSel(x.id)}>
            <I size={26} /><strong>{x.name}</strong><span>{x.desc}</span>
          </button>); })}
      </div>
      {d && (
        <div className="models" aria-live="polite">
          <h3>Choose your {d.name} model</h3>
          <div className="chips">{d.models.map((m) => <button key={m} className="chip" onClick={() => nav('/book', { state: { category: d.id, model: m } })}>{m}</button>)}</div>
        </div>)}
    </section>
  );
}
