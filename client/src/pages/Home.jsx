import { useEffect } from 'react';
import Hero from '../components/Hero.jsx';
import DeviceSelector from '../components/DeviceSelector.jsx';
import RepairServices from '../components/RepairServices.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Workshop from '../components/Workshop.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Testimonials from '../components/Testimonials.jsx';
import FAQ from '../components/FAQ.jsx';
export default function Home() {
  useEffect(() => { document.title = 'iFix365 – Phone, laptop and tablet repair'; }, []);
  return <><Hero /><DeviceSelector /><RepairServices limit={6} /><HowItWorks /><Workshop /><WhyChooseUs /><Testimonials /><FAQ /><ContactSection /></>;
}
