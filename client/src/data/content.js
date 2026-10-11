export { devices } from '../../../shared/devices.mjs';

const all = ['iphone','android','tablet','macbook','windows','watch'];
// price/time/warranty null => hidden, CTA is "Request a quote". Fill only with confirmed values.
const S = (id, name, icon, desc, f = all) => ({ id, name, icon, desc, for: f, price: null, time: null, warranty: null });
export const services = [
  S('screen','Screen replacement','Smartphone','Cracked, unresponsive or discoloured displays.'),
  S('battery','Battery replacement','BatteryCharging','Fast draining, swelling or sudden shutdowns.'),
  S('port','Charging-port repair','Plug','Loose, dirty or non-charging ports.', ['iphone','android','tablet','macbook','windows']),
  S('camera','Camera and speaker repair','Camera','Blurry cameras, muffled or silent audio.', ['iphone','android','tablet']),
  S('water','Water-damage diagnostics','Droplets','Inspection to find what can be saved.'),
  S('laptop','Laptop hardware repair','Cpu','Keyboards, hinges, fans, storage and RAM.', ['macbook','windows']),
  S('software','Software troubleshooting','Wrench','Slow performance, crashes and update problems.'),
  S('other','Something else','CircleHelp','Describe it and we will tell you if we can help.'),
];
export const faqs = [
  ['How do I get a price?', 'Send a repair request. We confirm the price before any work starts.'],
  ['Is there a warranty?', 'TODO(verify): add your warranty terms.'],
  ['How long does a repair take?', 'TODO(verify): add turnaround times per repair.'],
  ['Which areas do you serve?', 'TODO(verify): add your service area.'],
];
