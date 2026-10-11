import { MessageCircle } from 'lucide-react';
import { ready, waLink } from '../config.js';
export default function WhatsAppFab() {
  if (!ready('whatsapp')) return null;
  return <a className="fab" href={waLink('Hi, I need help with a repair.')} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><MessageCircle /></a>;
}
