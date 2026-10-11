import { Link } from 'react-router-dom';
import { ShieldCheck, ClipboardCheck } from 'lucide-react';
import Img from './Img.jsx';
export default function Hero() {
  return (
    <div className="hero-wrap"><section className="hero container">
      <div>
        <h1>Expert repairs. Exceptional care.</h1>
        <p>Phones, laptops, tablets and watches, repaired by people who test everything before it goes back to you.</p>
        <div className="row">
          <Link className="btn btn-primary" to="/book">Book a repair</Link>
          <Link className="btn btn-light" to="/repairs">Explore services</Link>
        </div>
        <ul className="trust">
          <li><ClipboardCheck size={18} /> Quote confirmed before any work starts</li>
          <li><ShieldCheck size={18} /> Warranty terms: TODO(verify)</li>
        </ul>
      </div>
      <Img eager className="hero-img" src="/img/hero.jpg" alt="Technician using a screwdriver on the opened logic board of a smartphone" />
    </section></div>
  );
}
