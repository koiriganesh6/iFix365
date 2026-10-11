import { faqs } from '../data/content.js';
export default function FAQ() {
  return (
    <section className="section container narrow">
      <h2>Questions</h2>
      {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
    </section>
  );
}
