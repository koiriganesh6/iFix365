import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import Img from './Img.jsx';
import { devices } from '../data/content.js';
export default function DeviceSelector() {
  const [sel, setSel] = useState(null);
  const nav = useNavigate();
  const d = devices.find((x) => x.id === sel);
  return (
    <section id="devices" className="section container device-section">
      <div className="device-heading">
        <div><p className="device-eyebrow">YOUR DEVICE. A FRESH START.</p><h2>What needs fixing?</h2></div>
        <p>Pick your device to explore models<br className="device-heading-break" /> and find the right repair.</p>
      </div>
      <div className="devices" role="radiogroup" aria-label="Device type">
        {devices.map((x) => (
          <button key={x.id} type="button" role="radio" aria-checked={sel === x.id} aria-controls="device-models" className={`device ${sel === x.id ? 'on' : ''}`} onClick={() => setSel(x.id)}>
            <div className={`device-photo device-photo-${x.id}`}>
              <Img src={`/img/devices/${x.id}.jpg`} alt="" className="device-image" />
              <span className="device-indicator" aria-hidden="true">{sel === x.id ? <Check size={18} /> : <ArrowUpRight size={18} />}</span>
            </div>
            <div className="device-copy"><strong>{x.name}</strong><span>{x.desc}</span><span className="device-action">{sel === x.id ? 'Device selected' : 'Explore models'} <ArrowUpRight size={14} aria-hidden="true" /></span></div>
          </button>))}
      </div>
      {d && (
        <div id="device-models" className="models" aria-live="polite">
          <h3>Choose your {d.name} model</h3>
          <div className="chips">{d.models.map((m) => <button key={m} className="chip" onClick={() => nav('/book', { state: { category: d.id, model: m } })}>{m}</button>)}</div>
        </div>)}
    </section>
  );
}
