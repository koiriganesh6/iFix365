// Edit these once. Digits only for whatsapp, with country code (India: 91XXXXXXXXXX).
export const BUSINESS = { name: 'iFix365', whatsapp: '917880973121', phone: '+917880973121', email: 'lifemom118@gmai.com', address: 'Bangalore', hours: 'Monday 10:00 AM – 6:00 PM to  Monday, 10:00 AM – 6:00 PM.' };
// Set false only after replacing src/data/reviews.js with real customer reviews.
export const SAMPLE_REVIEWS = true;
export const ready = (k) => Boolean(BUSINESS[k]);
export const waLink = (text = '') => `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;
export const mapLink = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`;
