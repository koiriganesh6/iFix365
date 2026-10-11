import { Link } from 'react-router-dom';
import Img from './Img.jsx';
export default function Workshop() {
  return (
    <section className="section container workshop">
      <Img className="shot" src="/img/workbench.svg" alt="Laptop opened on a repair bench with screwdriver and spare parts" />
      <div>
        <h2>Careful work, done on a clean bench</h2>
        <p>Every device is opened, inspected and tested with the right tools. You see the fault and the quote before we start.</p>
        <Link className="btn btn-primary" to="/book">Get a quote</Link>
      </div>
    </section>
  );
}
