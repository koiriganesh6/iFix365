import { Link } from 'react-router-dom';
import Img from './Img.jsx';
export default function Workshop() {
  return (
    <section className="section container workshop">
      <div className="workshop-photo"><Img className="shot" src="/img/workbench.jpg" alt="Technician repairing an opened laptop motherboard with a screwdriver" /><span className="workshop-caption">Attention to every detail</span></div>
      <div>
        <p className="section-eyebrow">THE CARE BEHIND THE REPAIR</p>
        <h2>Careful work, done on a clean bench</h2>
        <p>Every device is opened, inspected and tested with the right tools. You see the fault and the quote before we start.</p>
        <Link className="btn btn-primary" to="/book">Get a quote</Link>
      </div>
    </section>
  );
}
