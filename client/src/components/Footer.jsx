import { Link } from 'react-router-dom';
import { BUSINESS, ready } from '../config.js';
export default function Footer() {
  return (
    <footer className="footer"><div className="container foot-grid">
      <div><img className="foot-logo" src="/img/logo.png" alt={BUSINESS.name} /><p>Device repair you can trust.</p></div>
      <div><p>{ready('phone') ? BUSINESS.phone : 'Phone: add in config.js'}</p><p>{ready('address') ? BUSINESS.address : 'Address: add in config.js'}</p></div>
      <div><p><Link to="/contact">Contact</Link></p><p><Link to="/about">Terms and privacy: TODO(verify)</Link></p></div>
    </div></footer>
  );
}
