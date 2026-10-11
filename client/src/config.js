// Edit these once with verified business details.
export const BUSINESS = { name: 'iFix365', phone: '+917880973121', address: 'Bangalore', hours: 'Monday 10:00 AM – 6:00 PM to  Monday, 10:00 AM – 6:00 PM.' };
// Set false only after replacing src/data/reviews.js with real customer reviews.
export const SAMPLE_REVIEWS = true;
export const ready = (k) => Boolean(BUSINESS[k]);
export const mapLink = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`;
