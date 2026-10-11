export const devices = [
  { id: 'iphone', name: 'iPhone', desc: 'Recent models', icon: 'Smartphone', models: ['iPhone 15 series','iPhone 14 series','iPhone 13 series','iPhone 12 series','Other iPhone'] },
  { id: 'android', name: 'Android phones', desc: 'Major brands', icon: 'TabletSmartphone', models: ['Samsung Galaxy','OnePlus','Xiaomi / Redmi','Google Pixel','Other Android'] }, // TODO(verify) supported brands
  { id: 'macbook', name: 'MacBook', desc: 'Air and Pro', icon: 'Laptop', models: ['MacBook Air (M-series)','MacBook Pro (M-series)','MacBook (Intel)','Other MacBook'] },
  { id: 'windows', name: 'Windows laptops', desc: 'Dell, HP, Lenovo, Asus', icon: 'Monitor', models: ['Dell','HP','Lenovo','Asus','Acer','Other'] },
  { id: 'tablet', name: 'iPad and tablets', desc: 'iPad and Android', icon: 'Tablet', models: ['iPad','iPad Air / Pro','Samsung Galaxy Tab','Other tablet'] },
  { id: 'watch', name: 'Smartwatches', desc: 'Apple and others', icon: 'Watch', models: ['Apple Watch','Samsung Galaxy Watch','Other smartwatch'] },
];
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
