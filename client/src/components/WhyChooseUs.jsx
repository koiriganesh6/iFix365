import { SearchCheck, FileText, BadgeCheck } from 'lucide-react';
const items = [[SearchCheck, 'Diagnosis first', 'We confirm the fault before recommending a repair.'], [FileText, 'Clear quotes', 'You approve the price before work begins.'], [BadgeCheck, 'Tested before return', 'Every device is checked after repair. Warranty: TODO(verify).']];
export default function WhyChooseUs() {
  return (
    <section className="section container why">
      <p className="section-eyebrow">REPAIR WITH CONFIDENCE</p>
      <h2>Why customers choose us</h2>
      <div>{items.map(([I, t, d]) => <div key={t}><I size={22} /><h3>{t}</h3><p>{d}</p></div>)}</div>
    </section>
  );
}
