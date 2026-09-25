'use client';

import Image from 'next/image';
import { CATEGORIES, INDUSTRIES } from '@/lib/data';
import LuxCanvas from '@/components/gl/LuxCanvas';
import { useUI } from '@/components/ui/UIProvider';

const ring = { boxShadow: '0 0 0 1px rgba(226,190,159,.3) inset' };
const SOCIAL: { label: string; path: React.ReactNode }[] = [
  { label: 'Instagram', path: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></> },
  { label: 'Facebook', path: <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6.5v3.5H9V21h3.5v-8.5H15l.5-3.5h-3V6.8c0-.5.4-.8.8-.8H15z" /> },
  { label: 'Pinterest', path: <><circle cx="12" cy="12" r="9" /><path d="M10.5 20l1.6-7m0 0c-.7-1.9.2-4 2-4 1.5 0 2.4 1.2 2.1 3-.3 1.9-1.6 3.4-3 3.2-1-.1-1.4-.9-1.1-2.2" /></> },
  { label: 'LinkedIn', path: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10.5V17M8 7.2v.1M12 17v-3.8c0-1.5 1-2.7 2.3-2.7s2 1 2 2.5V17M12 10.5V17" /></> },
];

export default function Footer() {
  const { openDrawer, showToast } = useUI();
  const link = (c: (typeof CATEGORIES)[number]) => (
    <li key={c.id}><button type="button" onClick={() => openDrawer(c.id)} className="text-left hover:text-white transition">{c.title}</button></li>
  );

  return (
    <footer className="on-dark relative overflow-hidden text-pearl/90" style={{ background: 'linear-gradient(180deg, #2F1D14, #1E120C)' }}>
      <LuxCanvas className="opacity-50" />
      <div className="relative max-w-site mx-auto px-5 lg:px-10 pt-20 pb-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Image src="/images/havenza-logo-dark.jpg" alt="Havenza" width={659} height={255} className="feather w-[300px] h-auto -ml-6 -mt-6" />
            <p className="mt-2 font-light leading-relaxed max-w-sm">Home Décor · Handmade Art · Hospitality Décor · Corporate Gifts · Custom Manufacturing.</p>
            <form className="mt-7 flex max-w-sm rounded-full p-1" style={{ ...ring, background: 'rgba(255,255,255,.04)' }}
              onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); showToast('Welcome to Havenza — you’re on the list.'); }}>
              <label htmlFor="nl" className="sr-only">Email for newsletter</label>
              <input id="nl" type="email" required placeholder="Join for new collections" className="flex-1 bg-transparent px-5 text-sm text-ivory placeholder:text-pearl/60 outline-none min-w-0" />
              <button className="btn btn-gold !py-2.5 !px-5 !text-[11px]">Subscribe</button>
            </form>
            <div className="mt-7 flex gap-3" aria-label="Social media">
              {SOCIAL.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="w-10 h-10 rounded-full grid place-items-center text-rose-200 hover:text-white transition" style={ring}>
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5}>{s.path}</svg>
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div><h4 className="eyebrow !text-rose-300">Collections</h4><ul className="mt-5 space-y-2.5 text-[14.5px]">{CATEGORIES.slice(0, 7).map(link)}</ul></div>
            <div><h4 className="eyebrow !text-rose-300">More</h4><ul className="mt-5 space-y-2.5 text-[14.5px]">{CATEGORIES.slice(7).map(link)}</ul></div>
            <div><h4 className="eyebrow !text-rose-300">For business</h4>
              <ul className="mt-5 space-y-2.5 text-[14.5px]">{INDUSTRIES.map((x) => <li key={x.name}><a href="#business" className="hover:text-white transition">{x.name}</a></li>)}</ul></div>
            <div><h4 className="eyebrow !text-rose-300">Company</h4>
              <ul className="mt-5 space-y-2.5 text-[14.5px]">
                <li><a href="#why" className="hover:text-white transition">About Havenza</a></li>
                <li><a href="#bespoke" className="hover:text-white transition">Bespoke &amp; OEM</a></li>
                <li><a href="#learn" className="hover:text-white transition">Courses &amp; workshops</a></li>
                <li><a href="#occasions" className="hover:text-white transition">Décor rental</a></li>
                <li><a href="#enquire" className="hover:text-white transition">Request a catalogue</a></li>
                <li><a href="#enquire" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-rose-300/15 flex flex-wrap gap-4 items-center justify-between text-[12.5px] tracking-[.08em] text-pearl/70">
          <p>© {new Date().getFullYear()} Havenza. All rights reserved.</p>
          <p className="flex items-center gap-2 uppercase tracking-[.3em] text-[11px]"><span className="sparkle text-rose-300" />Create your beautiful space</p>
          <div className="flex gap-6"><a href="#" className="hover:text-white">Privacy</a><a href="#" className="hover:text-white">Terms</a><a href="#" className="hover:text-white">Shipping</a></div>
        </div>
      </div>
    </footer>
  );
}
