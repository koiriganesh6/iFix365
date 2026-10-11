import ContactSection from '../components/ContactSection.jsx';
import { Link } from 'react-router-dom';
const T = { about: ['About us', 'TODO(verify): who you are, your experience and repair standards.'],
  contact: ['Contact', 'TODO(verify): phone, email, address, business hours and service area.'], 404: ['Page not found', 'That page does not exist.'] };
export default function Info({ kind }) {
  if (kind === 'contact') return <ContactSection />;
  const [h, p] = T[kind];
  return <section className="section container narrow"><h1>{h}</h1><p>{p}</p><Link className="btn btn-primary" to="/book">Book a repair</Link></section>;
}
