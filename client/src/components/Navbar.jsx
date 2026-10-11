import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
const links = [['/', 'Home'], ['/#devices', 'Devices'], ['/repairs', 'Repairs'], ['/#how', 'How it works'], ['/about', 'About'], ['/contact', 'Contact']];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="nav">
      <div className="announce">Booking is open. TODO(verify): add hours or offer.</div>
      <div className="container nav-row">
        <Link to="/" className="brand" onClick={close}><img src="/img/logo.png" alt="iFix365" /></Link>
        <nav aria-label="Main" className={open ? 'menu open' : 'menu'}>
          {links.map(([to, label]) => <NavLink key={label} to={to} onClick={close} end>{label}</NavLink>)}
          <Link className="btn btn-primary menu-cta" to="/book" onClick={close}>Book a repair</Link>
        </nav>
        <Link className="btn btn-primary desk-cta" to="/book">Book a repair</Link>
        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}
