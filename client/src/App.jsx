import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Book from './pages/Book.jsx';
import WhatsAppFab from './components/WhatsAppFab.jsx';
import Admin from './pages/Admin.jsx';
import Info from './pages/Info.jsx';

export default function App() {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) window.scrollTo(0, 0); else document.querySelector(hash)?.scrollIntoView(); }, [pathname, hash]);
  return (<>
    <a className="skip" href="#main">Skip to content</a>
    <Navbar />
    <main id="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repairs" element={<Services />} />
        <Route path="/book" element={<Book />} />
        <Route path="/about" element={<Info kind="about" />} />
        <Route path="/contact" element={<Info kind="contact" />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Info kind="404" />} />
      </Routes>
    </main>
    <Footer /><WhatsAppFab />
  </>);
}
