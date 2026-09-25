import { CONTACT } from '@/lib/data';

export default function TopBar() {
  return (
    <div className="on-dark relative z-40 hidden md:block bg-cocoa-800 text-[11.5px] tracking-[.22em] uppercase text-rose-200">
      <div className="max-w-site mx-auto px-6 lg:px-10 h-9 flex items-center justify-between">
        <p className="flex items-center gap-3 whitespace-nowrap"><span className="sparkle text-rose-300" />Bulk, corporate &amp; private-label orders welcome</p>
        <div className="flex items-center gap-6">
          <a href="#enquire" className="hover:text-white transition hidden xl:inline">Request a Catalogue</a>
          <span className="w-px h-3 bg-rose-300/30 hidden xl:inline-block" />
          <a href="#business" className="hover:text-white transition">Trade &amp; Hospitality</a>
          <span className="w-px h-3 bg-rose-300/30" />
          <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition normal-case tracking-[.12em]">{CONTACT.email}</a>
        </div>
      </div>
    </div>
  );
}
