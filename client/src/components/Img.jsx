import { useState } from 'react';
import { ImageOff } from 'lucide-react';
export default function Img({ src, alt, className = '', eager }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div className={`img-fallback ${className}`} role="img" aria-label={alt}><ImageOff size={28} /></div>;
  return <img src={src} alt={alt} className={className} loading={eager ? 'eager' : 'lazy'} onError={() => setBad(true)} />;
}
