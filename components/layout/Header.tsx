'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CATEGORIES, COURSES, COURSE_TRACKS, OCCASIONS, SERVICES } from '@/lib/data';
import Icon from '@/components/ui/Icon';
import { useUI } from '@/components/ui/UIProvider';
import MegaMenu, { type MegaSeg } from './MegaMenu';

const SECTIONS = ['collections', 'business', 'bespoke', 'learn', 'services', 'occasions', 'why'];

export default function Header() {
  const { drawer, openDrawer, prefillEnquiry, bagCount } = useUI();
  const headerRef = useRef<HTMLElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mega, setMega] = useState<{ open: boolean; seg: MegaSeg }>({ open: false, seg: 'b2c' });
  const [activeCat, setActiveCat] = useState(1);
  const [activeOcc, setActiveOcc] = useState(OCCASIONS[0].id);
  const [activeLearn, setActiveLearn] = useState(`c:${COURSES[0].id}`);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openY = useRef(0);
  const megaRef = useRef(mega);
  megaRef.current = mega;

  const clear = () => { if (timer.current) clearTimeout(timer.current); };
  const closeMega = useCallback(() => { clear(); setMega((m) => (m.open ? { ...m, open: false } : m)); }, []);
  const openMega = useCallback((seg: MegaSeg) => {
    clear();
    if (!megaRef.current.open || megaRef.current.seg !== seg) {
      if (seg === 'b2c' || seg === 'b2b') setActiveCat(CATEGORIES[0].id);
      if (seg === 'occ') setActiveOcc(OCCASIONS[0].id);
      if (seg === 'learn') setActiveLearn(`c:${COURSES[0].id}`);
    }
    if (!megaRef.current.open) openY.current = window.scrollY;
    setMega({ open: true, seg });
  }, []);
  const scheduleClose = (ms: number) => { clear(); timer.current = setTimeout(closeMega, ms); };

  // Close menus whenever a collection panel opens
  useEffect(() => { if (drawer.open) { closeMega(); setMobileOpen(false); } }, [drawer.nonce, drawer.open, closeMega]);

  // Scroll: nav style, active section, close mega after scrolling away
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      let a = '';
      SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < innerHeight * 0.4) a = id; });
      setActive(a);
      if (megaRef.current.open && Math.abs(y - openY.current) > 140) closeMega();
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [closeMega]);

  // Outside click and Escape
  useEffect(() => {
    const down = (e: PointerEvent) => {
      if (megaRef.current.open && !(e.target as Element).closest?.('.nav-shell, #mega')) closeMega();
    };
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { closeMega(); setMobileOpen(false); } };
    document.addEventListener('pointerdown', down);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', down); document.removeEventListener('keydown', key); };
  }, [closeMega]);

  const trigger = (seg: MegaSeg, label: React.ReactNode, tag: string | null, section: string | string[]) => (
    <button type="button"
      className={`nav-link mega-trigger ${([] as string[]).concat(section).includes(active) ? 'active' : ''}`}
      aria-expanded={mega.open && mega.seg === seg} aria-controls="mega" aria-haspopup="true"
      onPointerEnter={(e) => { if (e.pointerType !== 'mouse') return; clear(); timer.current = setTimeout(() => openMega(seg), mega.open ? 0 : 110); }}
      onClick={() => (mega.open && mega.seg === seg ? closeMega() : openMega(seg))}
      onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); openMega(seg); } }}>
      {label}{tag && <span className="seg-tag">{tag}</span>}<Icon name="chevron-down" className="chev" />
    </button>
  );
  const plainHover = () => { if (megaRef.current.open) scheduleClose(120); };

  const focusSearch = () => {
    closeMega();
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => (document.getElementById('search') as HTMLInputElement | null)?.focus({ preventScroll: true }), 650);
  };

  const hoverDelay = (fn: () => void) => { if (hoverTimer.current) clearTimeout(hoverTimer.current); hoverTimer.current = setTimeout(fn, 60); };

  return (
    <>
      <header id="nav" ref={headerRef} className={`sticky top-0 z-40 px-3 sm:px-5 pt-3 ${scrolled ? 'scrolled' : ''}`}
        onPointerLeave={(e) => { if (e.pointerType === 'mouse' && megaRef.current.open) scheduleClose(260); }}
        onPointerEnter={() => { if (megaRef.current.open) clear(); }}>
        <div className="nav-shell max-w-site mx-auto rounded-[28px]">
          <nav className="px-4 sm:px-6 xl:px-8 h-[72px] flex items-center justify-between gap-4 xl:gap-6" aria-label="Primary">
            <a href="#home" className="flex items-center shrink-0" aria-label="Havenza home" onPointerEnter={plainHover}>
              <Image src="/images/havenza-logo-horizontal.png" alt="Havenza — Create Your Beautiful Space" width={625} height={202} priority
                className="logo-img h-[54px] xl:h-[64px] w-auto" />
            </a>
            <ul className="hidden lg:flex items-center gap-4 xl:gap-7">
              <li>{trigger('b2c', 'For Home', 'B2C', 'collections')}</li>
              <li>{trigger('b2b', 'For Business', 'B2B', 'business')}</li>
              <li>{trigger('learn', <><span className="hidden xl:inline">Courses &amp;</span>Services</>, null, ['bespoke', 'learn', 'services'])}</li>
              <li>{trigger('occ', 'Occasions', null, 'occasions')}</li>
            </ul>
            <div className="flex items-center gap-1 sm:gap-2" onPointerEnter={plainHover}>
              <button type="button" onClick={focusSearch} className="w-11 h-11 grid place-items-center rounded-full text-cocoa-600 hover:bg-blush-50 transition" aria-label="Search products">
                <Icon name="search" className="w-[19px] h-[19px]" />
              </button>
              <a href="#enquire" className="w-11 h-11 grid place-items-center rounded-full text-cocoa-600 hover:bg-blush-50 transition relative" aria-label="Enquiry list">
                <Icon name="shopping-bag" className="w-[19px] h-[19px]" />
                {bagCount > 0 && <span className="absolute top-1.5 right-1.5 min-w-[17px] h-[17px] px-1 rounded-full bg-rose-500 text-[10px] text-white grid place-items-center">{bagCount}</span>}
              </a>
              <a href="#enquire" className="btn btn-primary hidden md:inline-flex !py-3 !px-5 ml-2"><span><span className="hidden xl:inline">Request a </span>Quote</span></a>
              <button type="button" onClick={() => setMobileOpen((o) => !o)} className="lg:hidden w-11 h-11 grid place-items-center rounded-full text-cocoa-700 hover:bg-blush-50" aria-label="Open menu" aria-expanded={mobileOpen}>
                <Icon name={mobileOpen ? 'x' : 'menu'} className="w-6 h-6" />
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="lg:hidden border-t border-rose-300/30 max-h-[calc(100vh-110px)] overflow-y-auto" onClick={(e) => { if ((e.target as Element).closest('a')) setMobileOpen(false); }}>
              <ul className="px-6 py-5 space-y-1 font-display text-2xl text-cocoa-700">
                <li>
                  <details className="m-acc">
                    <summary>For Home <span className="flex items-center gap-2"><span className="seg-tag font-sans">B2C</span><Icon name="chevron-down" className="chev w-5 h-5 text-rose-600" /></span></summary>
                    <div className="pb-3 grid gap-0.5 font-sans">
                      {CATEGORIES.filter((c) => c.b2c.length).map((c) => (
                        <button key={c.id} type="button" onClick={() => openDrawer(c.id, 'b2c')} className="flex items-center gap-3 py-2 text-left text-[15px] text-cocoa-600">
                          <Icon name={c.icon} className="w-4 h-4 text-rose-600 shrink-0" />{c.short}<span className="ml-auto text-xs text-cocoa-300">{c.b2c.length}</span>
                        </button>
                      ))}
                    </div>
                  </details>
                </li>
                <li>
                  <details className="m-acc">
                    <summary>For Business <span className="flex items-center gap-2"><span className="seg-tag font-sans">B2B</span><Icon name="chevron-down" className="chev w-5 h-5 text-rose-600" /></span></summary>
                    <div className="pb-3 grid gap-0.5 font-sans">
                      {CATEGORIES.map((c) => (
                        <button key={c.id} type="button" onClick={() => openDrawer(c.id, 'b2b')} className="flex items-center gap-3 py-2 text-left text-[15px] text-cocoa-600">
                          <Icon name={c.icon} className="w-4 h-4 text-rose-600 shrink-0" />{c.short}<span className="ml-auto text-xs text-cocoa-300">{c.b2b.length}</span>
                        </button>
                      ))}
                      <a href="#business" className="flex items-center gap-2 pt-3 text-[12px] tracking-[.18em] uppercase text-rose-700">Industries we serve <Icon name="arrow-right" className="w-4 h-4" /></a>
                    </div>
                  </details>
                </li>
                <li><a href="#collections" className="block py-2">All Collections</a></li>
                <li>
                  <details className="m-acc">
                    <summary>Courses &amp; Services <Icon name="chevron-down" className="chev w-5 h-5 text-rose-600" /></summary>
                    <div className="pb-3 grid gap-0.5 font-sans">
                      {COURSE_TRACKS.map((t) => (
                        <div key={t.key} className="grid gap-0.5">
                          <p className="text-[10.5px] tracking-[.26em] uppercase text-cocoa-300 pt-3 pb-1">{t.label}</p>
                          {COURSES.filter((c) => c.track === t.key).map((c) => (
                            <button key={c.id} type="button" onClick={() => { setMobileOpen(false); prefillEnquiry(c.name, c.for.includes('b2c') ? 'personal' : 'business'); }} className="flex items-center gap-3 py-2 text-left text-[15px] text-cocoa-600">
                              <Icon name={c.icon} className="w-4 h-4 text-rose-600 shrink-0" />{c.name}
                            </button>
                          ))}
                        </div>
                      ))}
                      <p className="text-[10.5px] tracking-[.26em] uppercase text-cocoa-300 pt-3 pb-1">Services</p>
                      {SERVICES.map((x) => (
                        <button key={x.id} type="button" onClick={() => openDrawer(x.related[0], 'b2b')} className="flex items-center gap-3 py-2 text-left text-[15px] text-cocoa-600">
                          <Icon name={x.icon} className="w-4 h-4 text-rose-600 shrink-0" />{x.name}
                        </button>
                      ))}
                      <div className="flex gap-6 pt-3"><a href="#learn" className="flex items-center gap-2 text-[12px] tracking-[.18em] uppercase text-rose-700">All courses <Icon name="arrow-right" className="w-4 h-4" /></a><a href="#services" className="flex items-center gap-2 text-[12px] tracking-[.18em] uppercase text-rose-700">All services <Icon name="arrow-right" className="w-4 h-4" /></a></div>
                    </div>
                  </details>
                </li>
                <li>
                  <details className="m-acc">
                    <summary>Occasions <Icon name="chevron-down" className="chev w-5 h-5 text-rose-600" /></summary>
                    <div className="pb-3 grid gap-0.5 font-sans">
                      {(['Festivals', 'Celebrations', 'Corporate & venues'] as const).map((g) => (
                        <div key={g} className="grid gap-0.5">
                          <p className="text-[10.5px] tracking-[.26em] uppercase text-cocoa-300 pt-3 pb-1">{g}</p>
                          {OCCASIONS.filter((o) => o.group === g).map((o) => {
                            const f = o.home[0] || o.biz[0];
                            return (
                              <button key={o.id} type="button" onClick={() => openDrawer(f[0], o.home[0] ? 'b2c' : 'b2b', f[1])} className="flex items-center gap-3 py-2 text-left text-[15px] text-cocoa-600">
                                <Icon name={o.icon} className="w-4 h-4 text-rose-600 shrink-0" />{o.name}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                      <a href="#occasions" className="flex items-center gap-2 pt-3 text-[12px] tracking-[.18em] uppercase text-rose-700">Festive calendar &amp; rental <Icon name="arrow-right" className="w-4 h-4" /></a>
                    </div>
                  </details>
                </li>
                <li><a href="#why" className="block py-2">Why Havenza</a></li>
                <li className="pt-4 pb-2"><a href="#enquire" className="btn btn-primary w-full justify-center">Request a Quote</a></li>
              </ul>
            </div>
          )}
        </div>

        <MegaMenu seg={mega.seg} open={mega.open} activeCat={activeCat} activeOcc={activeOcc} activeLearn={activeLearn}
          onHoverCat={(id) => hoverDelay(() => setActiveCat(id))} onHoverOcc={(id) => hoverDelay(() => setActiveOcc(id))}
          onHoverLearn={(k) => hoverDelay(() => setActiveLearn(k))} onClose={closeMega} />
      </header>
      <div className={`mega-scrim ${mega.open ? 'show' : ''}`} aria-hidden="true" onClick={closeMega} />
    </>
  );
}
