'use client';

import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, CONTACT, COURSES } from '@/lib/data';
import Photo from '@/components/ui/Photo';
import Icon from '@/components/ui/Icon';
import LuxCanvas from '@/components/gl/LuxCanvas';
import { useUI, type EnquirySegment } from '@/components/ui/UIProvider';

const label = 'text-[11px] tracking-[.2em] uppercase text-cocoa-400';
const errStyle = { boxShadow: '0 0 0 1px #C0564B inset, 0 0 0 4px rgba(192,86,75,.15)' };

export default function Enquiry() {
  const { enquiry, showToast, addToBag } = useUI();
  const [segment, setSegment] = useState<EnquirySegment>('personal');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Prefill from anywhere on the page (drawer "Enquire now", trade buttons, mega menu…)
  useEffect(() => {
    if (!enquiry.nonce) return;
    setSegment(enquiry.segment);
    setCategory(enquiry.category);
  }, [enquiry]);

  const biz = segment === 'business';

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '').trim(), email = String(fd.get('email') || '').trim();
    const errs = { name: !name, email: !/\S+@\S+\.\S+/.test(email) };
    setErrors(errs);
    if (errs.name || errs.email) { showToast('Please add your name and a valid email.'); return; }

    setSending(true);
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...Object.fromEntries(fd), segment }) });
      if (!res.ok) throw new Error();
      formRef.current?.reset(); setSegment('personal'); setCategory(''); addToBag();
      showToast(`Thank you, ${name} — our team will be in touch shortly.`);
    } catch {
      showToast(`Sorry, something went wrong. Please email us at ${CONTACT.email}.`);
    } finally { setSending(false); }
  };

  return (
    <section id="enquire" className="relative py-20 lg:py-28 scroll-mt-20">
      <div className="max-w-site mx-auto px-5 lg:px-10">
        <div className="relative rounded-[32px] p-px reveal" style={{ background: 'linear-gradient(135deg, rgba(226,190,159,.9), rgba(192,138,102,.12) 35%, rgba(192,138,102,.08) 65%, rgba(211,164,130,.8))' }}>
          <div className="rounded-[31px] grid lg:grid-cols-12 overflow-hidden" style={{ background: 'linear-gradient(160deg, rgba(255,252,249,.94), rgba(250,238,231,.9))', boxShadow: '0 60px 120px -60px rgba(138,90,59,.5)' }}>
            {/* Left */}
            <div className="on-dark lg:col-span-5 relative p-8 sm:p-12 overflow-hidden" style={{ background: 'linear-gradient(165deg, #3B2418, #22150E)' }}>
              <div className="noir-photo" aria-hidden="true"><Photo k="misc-enquiry" /></div>
              <LuxCanvas className="opacity-80" />
              <div className="relative">
                <p className="eyebrow !text-rose-300">Enquiries &amp; quotations</p>
                <h2 className="font-display text-4xl sm:text-5xl text-ivory leading-[1.05] mt-5">Let’s create your <span className="gold-text-lt italic">beautiful space</span></h2>
                <p className="mt-5 text-pearl/90 font-light leading-relaxed">Tell us what you’re planning — a gift, a room, a property or a product line. We’ll respond with ideas, samples and a clear quotation.</p>
                <ol className="mt-10 space-y-5 text-pearl">
                  {[['01', 'Share your brief', 'Space, occasion, quantity & timeline'], ['02', 'Receive a curated proposal', 'Options, finishes & pricing'], ['03', 'Approve & we craft', 'Sampling, production & delivery']].map(([n, t, s]) => (
                    <li key={n} className="flex gap-4"><span className="font-display text-2xl text-rose-300 w-8">{n}</span><span><span className="block text-ivory">{t}</span><span className="text-sm text-pearl/80">{s}</span></span></li>
                  ))}
                </ol>
                <div className="mt-10 pt-8 border-t border-rose-300/20 space-y-3 text-[15px]">
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-pearl hover:text-white"><Icon name="mail" className="w-4 h-4 text-rose-300" />{CONTACT.email}</a>
                  <a href={`tel:${CONTACT.tel}`} className="flex items-center gap-3 text-pearl hover:text-white"><Icon name="phone" className="w-4 h-4 text-rose-300" />{CONTACT.phone}</a>
                  <p className="flex items-center gap-3 text-pearl"><Icon name="map-pin" className="w-4 h-4 text-rose-300" />{CONTACT.location}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={submit} className="lg:col-span-7 p-8 sm:p-12" noValidate>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-display text-3xl text-cocoa-800">Request a quote</h3>
                <div className="seg" role="tablist" aria-label="Enquiry type">
                  {(['personal', 'business'] as const).map((s) => (
                    <button key={s} type="button" role="tab" aria-selected={segment === s} className={segment === s ? 'active' : ''} onClick={() => setSegment(s)}>{s === 'personal' ? 'Personal' : 'Business'}</button>
                  ))}
                </div>
              </div>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div><label className={label} htmlFor="f-name">Full name *</label><input id="f-name" name="name" required className="field mt-2" placeholder="Your name" style={errors.name ? errStyle : undefined} /></div>
                <div><label className={label} htmlFor="f-email">Email *</label><input id="f-email" name="email" type="email" required className="field mt-2" placeholder="you@example.com" style={errors.email ? errStyle : undefined} /></div>
                <div><label className={label} htmlFor="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" className="field mt-2" placeholder="+91" /></div>
                {biz ? (
                  <div><label className={label} htmlFor="f-company">Company / property</label><input id="f-company" name="company" className="field mt-2" placeholder="Hotel, café, office, agency…" /></div>
                ) : (
                  <div><label className={label} htmlFor="f-occasion">Occasion</label>
                    <select id="f-occasion" name="occasion" className="field mt-2">{['Home styling', 'Gift', 'Wedding / event', 'Festival', 'Course / workshop', 'Something custom'].map((o) => <option key={o}>{o}</option>)}</select></div>
                )}
                <div className={biz ? '' : 'sm:col-span-2'}><label className={label} htmlFor="f-cat">Collection of interest</label>
                  <select id="f-cat" name="collection" className="field mt-2" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Not sure yet</option>
                    <optgroup label="Collections">{CATEGORIES.map((c) => <option key={c.id} value={c.title}>{c.title}</option>)}</optgroup>
                    <optgroup label="Courses & workshops">{COURSES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}</optgroup>
                  </select>
                </div>
                {biz && (
                  <div><label className={label} htmlFor="f-qty">Estimated quantity</label>
                    <select id="f-qty" name="quantity" className="field mt-2">{['Samples / under 25 units', '25 – 100 units', '100 – 500 units', '500 – 2,000 units', '2,000+ units', 'Project / installation'].map((o) => <option key={o}>{o}</option>)}</select></div>
                )}
                <div className="sm:col-span-2"><label className={label} htmlFor="f-msg">Tell us about your project</label><textarea id="f-msg" name="message" rows={4} className="field mt-2 resize-none" placeholder="Colours, sizes, fragrances, branding, timelines…" /></div>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-cocoa-400 max-w-xs">Our team will get back to you shortly. Your details are used only to respond to this enquiry.</p>
                <button type="submit" disabled={sending} className="btn btn-primary disabled:opacity-60">{sending ? 'Sending…' : 'Send enquiry'} <Icon name="send" className="w-4 h-4" /></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
