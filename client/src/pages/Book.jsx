import { useEffect } from 'react';
import QuoteForm from '../components/QuoteForm.jsx';
export default function Book() {
  useEffect(() => { document.title = 'Book a repair – iFix365'; }, []);
  return <section className="section container narrow"><h1>Book a repair</h1><QuoteForm /></section>;
}
