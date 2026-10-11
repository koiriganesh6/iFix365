import { useEffect } from 'react';
import QuoteForm from '../components/QuoteForm.jsx';
export default function Book() {
  useEffect(() => { document.title = 'Book a repair – iFix365'; }, []);
  return <section className="booking-page"><div className="container booking-container"><header className="booking-intro"><p className="booking-eyebrow">LET’S GET IT WORKING AGAIN</p><h1>Book a repair<span>.</span></h1><p>Your device deserves a fresh start. Tell us a little about it.</p></header><QuoteForm /></div></section>;
}
