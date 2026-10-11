// Edit these once. Digits only for whatsapp, with country code (India: 91XXXXXXXXXX).
export const BUSINESS = { name: 'iFix365', whatsapp: '', phone: '', email: '', address: '', hours: '' };
// Set false only after replacing src/data/reviews.js with real customer reviews.
export const SAMPLE_REVIEWS = true;
export const ready = (k) => Boolean(BUSINESS[k]);
export const waLink = (text = '') => `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;
export const mapLink = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`;
