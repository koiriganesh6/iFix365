import { useState } from 'react';
import { Star } from 'lucide-react';
import { reviews } from '../data/reviews.js';
import { SAMPLE_REVIEWS } from '../config.js';
export default function Testimonials() {
  const [all, setAll] = useState(false);
  const list = all ? reviews : reviews.slice(0, 6);
  return (
    <section className="section container">
      <h2>What customers say</h2>
      {SAMPLE_REVIEWS && <p className="note">Sample reviews for design preview. Replace with real customer reviews before launch.</p>}
      <ul className="reviews">
        {list.map(([name, device, rating, text]) => (
          <li key={name} className="review-card">
            <div className="stars" role="img" aria-label={`${rating} out of 5 stars`}>{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill={i <= rating ? 'currentColor' : 'none'} />)}</div>
            <p>{text}</p>
            <footer><strong>{name}</strong><span>{device}</span></footer>
          </li>))}
      </ul>
      <div className="row"><button className="btn btn-ghost" onClick={() => setAll(!all)} aria-expanded={all}>{all ? 'Show fewer' : `Show all ${reviews.length} reviews`}</button></div>
    </section>
  );
}
