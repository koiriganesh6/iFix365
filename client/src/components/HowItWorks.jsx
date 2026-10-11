const steps = ['Select your device', 'Describe the issue', 'Choose an available repair option', 'Get updates and your repaired device'];
export default function HowItWorks() {
  return (
    <section id="how" className="section container">
      <p className="section-eyebrow">FROM PROBLEM TO SOLUTION</p>
      <h2>How it works</h2>
      <ol className="steps">{steps.map((s, i) => <li key={s}><span>{i + 1}</span>{s}</li>)}</ol>
    </section>
  );
}
