import { MATERIALS } from '@/lib/data';

export default function Marquee() {
  const items = [...MATERIALS, ...MATERIALS]; // duplicated for a seamless loop
  return (
    <section aria-hidden="true" className="py-8 border-y border-rose-300/30 bg-white/30">
      <div className="marquee overflow-hidden">
        <div className="marquee-track font-display italic text-3xl sm:text-4xl text-cocoa-600/80">
          {items.map((x, i) => (
            <span key={i} className="px-8 flex items-center gap-8 whitespace-nowrap">{x}<span className="sparkle text-rose-400" style={{ width: 12, height: 12 }} /></span>
          ))}
        </div>
      </div>
    </section>
  );
}
