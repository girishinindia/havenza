'use client';

import { AUDIENCE_LABEL, CATEGORIES, COURSES, COURSE_FORMATS, COURSE_TRACKS, INDUSTRIES, OCCASIONS, SERVICES, TOTAL, TOTAL_B2B, catById, pad, type Segment } from '@/lib/data';
import Photo from '@/components/ui/Photo';
import { COLLECTION_IMG, COURSE_IMG, OCCASION_IMG, SERVICE_IMG } from '@/lib/images';
import Icon from '@/components/ui/Icon';
import { useUI } from '@/components/ui/UIProvider';

export type MegaSeg = 'b2c' | 'b2b' | 'learn' | 'occ';

const DarkCard = ({ children }: { children: React.ReactNode }) => (
  <div className="on-dark relative rounded-[20px] overflow-hidden p-6 flex flex-col text-pearl" style={{ background: 'linear-gradient(160deg, #4A2E1F, #22150E)', boxShadow: '0 0 0 1px rgba(226,190,159,.25) inset, 0 24px 40px -24px rgba(34,21,14,.7)' }}>
    <div aria-hidden="true" className="absolute -right-20 -top-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(226,190,159,.35), transparent 65%)' }} />
    {children}
  </div>
);

const ForTags = ({ list }: { list: Segment[] }) => (
  <span className="inline-flex gap-1.5 align-middle">
    {list.map((x) => (
      <span key={x} className={`text-[9.5px] tracking-[.16em] uppercase px-2 py-0.5 rounded-full ${x === 'b2c' ? 'bg-blush-100 text-rose-700' : 'bg-cocoa-800 text-rose-200'}`}>{AUDIENCE_LABEL[x]}</span>
    ))}
  </span>
);

/** Wide photo banner across the middle column: badge bottom-left, action button bottom-right. */
const Banner = ({ k, alt, badge, action }: { k: string; alt: string; badge: string; action: React.ReactNode }) => (
  <div key={k} className="photo mega-banner relative h-[150px] rounded-[18px]"
    style={{ animation: 'fadeUp .45s both', boxShadow: '0 0 0 1px rgba(192,138,102,.22), 0 18px 34px -22px rgba(67,42,29,.55)' }}>
    <Photo k={k} alt={alt} />
    <span className="photo-over left-4 bottom-4 max-w-[60%] truncate text-[10.5px] tracking-[.22em] uppercase text-cocoa-800 rounded-full px-3.5 py-2"
      style={{ background: 'rgba(252,249,245,.88)', backdropFilter: 'blur(8px)' }}>{badge}</span>
    <div className="photo-over right-4 bottom-4">{action}</div>
  </div>
);

const Row = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button type="button" onClick={onClick} className="flex w-full items-center justify-between hover:text-white">{label} <Icon name="arrow-up-right" className="w-4 h-4 text-rose-300" /></button>
);

interface Props {
  seg: MegaSeg;
  open: boolean;
  activeCat: number;
  activeOcc: string;
  activeLearn: string; // 'c:<courseId>' or 's:<serviceId>'
  onHoverCat: (id: number) => void;
  onHoverOcc: (id: string) => void;
  onHoverLearn: (key: string) => void;
  onClose: () => void;
}

export default function MegaMenu({ seg, open, activeCat, activeOcc, activeLearn, onHoverCat, onHoverOcc, onHoverLearn, onClose }: Props) {
  const { openDrawer, prefillEnquiry } = useUI();

  const isOcc = seg === 'occ';
  const isLearn = seg === 'learn';
  const course = activeLearn.startsWith('c:') ? COURSES.find((c) => `c:${c.id}` === activeLearn) : undefined;
  const service = activeLearn.startsWith('s:') ? SERVICES.find((x) => `s:${x.id}` === activeLearn) : undefined;
  const enquire = (topic: string, segm: 'personal' | 'business') => { onClose(); prefillEnquiry(topic, segm); };
  const goto = (id: string) => { onClose(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const catSeg: Segment = seg === 'b2b' ? 'b2b' : 'b2c';
  const list = seg === 'b2c' ? CATEGORIES.filter((c) => c.b2c.length) : CATEGORIES;
  const cat = catById(activeCat);
  const occ = OCCASIONS.find((o) => o.id === activeOcc) ?? OCCASIONS[0];

  const searchAll = () => {
    onClose();
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => (document.getElementById('search') as HTMLInputElement | null)?.focus({ preventScroll: true }), 650);
  };

  const item = (id: number, tab: Segment, n: string, i: number, key: string) => (
    <button key={key} type="button" className="mega-item" style={{ animation: `fadeUp .4s ${i * 20}ms both` }} title={catById(id).title} onClick={() => openDrawer(id, tab, n)}>
      <span className="sparkle" />{n}
    </button>
  );

  return (
    <div className={`mega-wrap hidden lg:block ${open ? 'open' : ''}`}>
      <div id="mega" className="mega-panel max-w-site mx-auto" role="region" aria-label="Shop menu">
        <div className="grid grid-cols-[400px_minmax(0,1fr)] xl:grid-cols-[440px_minmax(0,1fr)_290px] 2xl:grid-cols-[460px_minmax(0,1fr)_300px]">
          {/* Left: collections / occasions */}
          <aside className="p-5 border-r border-rose-300/25" style={{ background: 'linear-gradient(180deg, rgba(246,227,220,.35), rgba(246,227,220,0))' }}>
            <p className="eyebrow px-3 pt-2">{seg === 'b2c' ? 'Shop for home · B2C' : seg === 'b2b' ? 'For business · B2B' : isLearn ? 'Learn & work with us' : 'Shop by occasion'}</p>
            <div className="mt-3 grid grid-cols-2 gap-x-1 gap-y-0.5" role="tablist">
              {isLearn ? (
                <>
                  <div className="col-span-2 seg !flex w-full mb-2" role="tablist" aria-label="Courses or services">
                    {([['c', `Courses · ${COURSES.length}`], ['s', `Services · ${SERVICES.length}`]] as const).map(([k, label]) => (
                      <button key={k} type="button" role="tab" aria-selected={activeLearn.startsWith(k + ':')}
                        className={`flex-1 ${activeLearn.startsWith(k + ':') ? 'active' : ''}`}
                        onClick={() => onHoverLearn(k === 'c' ? `c:${COURSES[0].id}` : `s:${SERVICES[0].id}`)}>{label}</button>
                    ))}
                  </div>
                  {activeLearn.startsWith('c:')
                    ? COURSE_TRACKS.map((t) => (
                        <FragmentWithHeading key={t.key} heading={t.label}>
                          {COURSES.filter((c) => c.track === t.key).map((c) => (
                            <button key={c.id} type="button" role="tab" aria-selected={activeLearn === `c:${c.id}`} className={`mega-cat ${activeLearn === `c:${c.id}` ? 'active' : ''}`}
                              onPointerEnter={() => onHoverLearn(`c:${c.id}`)} onFocus={() => onHoverLearn(`c:${c.id}`)} onClick={() => enquire(c.name, c.for.includes('b2c') ? 'personal' : 'business')}>
                              <span className="mi"><Icon name={c.icon} /></span><span className="min-w-0 truncate">{c.short}</span><Icon name="chevron-right" className="go" />
                            </button>
                          ))}
                        </FragmentWithHeading>
                      ))
                    : (['b2c', 'b2b'] as const).map((segm) => (
                        <FragmentWithHeading key={segm} heading={segm === 'b2c' ? 'For home & makers' : 'For business only'}>
                          {SERVICES.filter((x) => (segm === 'b2c' ? x.for.includes('b2c') : !x.for.includes('b2c'))).map((x) => (
                            <button key={x.id} type="button" role="tab" aria-selected={activeLearn === `s:${x.id}`} className={`mega-cat ${activeLearn === `s:${x.id}` ? 'active' : ''}`}
                              onPointerEnter={() => onHoverLearn(`s:${x.id}`)} onFocus={() => onHoverLearn(`s:${x.id}`)} onClick={() => openDrawer(x.related[0], 'b2b')}>
                              <span className="mi"><Icon name={x.icon} /></span><span className="min-w-0 truncate">{x.short}</span><Icon name="chevron-right" className="go" />
                            </button>
                          ))}
                        </FragmentWithHeading>
                      ))}
                </>
              ) : isOcc
                ? OCCASIONS.map((o, i) => (
                    <FragmentWithHeading key={o.id} heading={i === 0 || OCCASIONS[i - 1].group !== o.group ? o.group : null}>
                      <button type="button" role="tab" aria-selected={o.id === occ.id} className={`mega-cat ${o.id === occ.id ? 'active' : ''}`}
                        onPointerEnter={() => onHoverOcc(o.id)} onFocus={() => onHoverOcc(o.id)}
                        onClick={() => { const f = o.home[0] || o.biz[0]; openDrawer(f[0], o.home[0] ? 'b2c' : 'b2b', f[1]); }}>
                        <span className="mi"><Icon name={o.icon} /></span><span className="min-w-0 truncate">{o.name}</span><Icon name="chevron-right" className="go" />
                      </button>
                    </FragmentWithHeading>
                  ))
                : list.map((c) => (
                    <button key={c.id} type="button" role="tab" aria-selected={c.id === activeCat} className={`mega-cat ${c.id === activeCat ? 'active' : ''}`}
                      onPointerEnter={() => onHoverCat(c.id)} onFocus={() => onHoverCat(c.id)} onClick={() => openDrawer(c.id, catSeg)}>
                      <span className="mi"><Icon name={c.icon} /></span><span className="min-w-0 truncate">{c.short}</span><Icon name="chevron-right" className="go" />
                    </button>
                  ))
              }
            </div>
          </aside>

          {/* Middle: wide photo banner + full-width content */}
          <section className="p-7 min-w-0 relative">
            {isLearn && course && (
              <>
                <Banner k={COURSE_IMG(course.id)} alt={course.name} badge={course.track === 'mega' ? 'Mega course · Certificate' : COURSE_TRACKS.find((t) => t.key === course.track)?.label ?? 'Course'}
                  action={<button type="button" className="btn btn-primary !py-2.5 !px-5 !text-[11px]" onClick={() => enquire(course.name, course.for.includes('b2c') ? 'personal' : 'business')}>Enrol <Icon name="arrow-right" className="w-3.5 h-3.5" /></button>} />
                <h3 className="font-display text-[1.85rem] text-cocoa-800 leading-tight mt-5">{course.name}</h3>
                <p className="text-[14.5px] text-cocoa-500 font-light mt-2 leading-relaxed">{course.blurb}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="chip"><Icon name="graduation-cap" className="w-3.5 h-3.5 text-rose-600" />{course.level}</span>
                  <span className="chip"><Icon name="clock" className="w-3.5 h-3.5 text-rose-600" />{course.duration}</span>
                  {COURSE_FORMATS.filter((f) => course.formats.includes(f.key)).map((f) => (
                    <span key={f.key} className="chip"><Icon name={f.icon} className="w-3.5 h-3.5 text-rose-600" />{f.short}</span>
                  ))}
                  <ForTags list={course.for} />
                </div>
                <div className="hairline my-5" />
                <p className="mega-sub"><Icon name="check" className="w-3.5 h-3.5" />What you’ll learn</p>
                <ul key={course.id} className="relative grid grid-cols-2 gap-x-4">
                  {course.modules.map((m, i) => (
                    <li key={m}><button type="button" className="mega-item" style={{ animation: `fadeUp .4s ${i * 20}ms both` }} onClick={() => enquire(course.name, 'personal')}><span className="sparkle" />{m}</button></li>
                  ))}
                </ul>
              </>
            )}
            {isLearn && service && (
              <>
                <Banner k={SERVICE_IMG(service.id)} alt={service.name} badge={`Service · ${service.audience}`}
                  action={<button type="button" className="btn btn-primary !py-2.5 !px-5 !text-[11px]" onClick={() => enquire(catById(service.related[0]).title, service.for.includes('b2b') ? 'business' : 'personal')}>Enquire <Icon name="arrow-right" className="w-3.5 h-3.5" /></button>} />
                <h3 className="font-display text-[1.85rem] text-cocoa-800 leading-tight mt-5">{service.name}</h3>
                <p className="text-[14.5px] text-cocoa-500 font-light mt-2 leading-relaxed">{service.blurb}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2"><ForTags list={service.for} /></div>
                <div className="hairline my-5" />
                <p className="mega-sub"><Icon name="check" className="w-3.5 h-3.5" />What’s included</p>
                <ul key={service.id} className="relative grid grid-cols-2 gap-x-4">
                  {service.includes.map((m, i) => (
                    <li key={m}><button type="button" className="mega-item" style={{ animation: `fadeUp .4s ${i * 20}ms both` }} onClick={() => openDrawer(service.related[0], 'b2b')}><span className="sparkle" />{m}</button></li>
                  ))}
                </ul>
                <p className="mega-sub mt-4"><Icon name="layers" className="w-3.5 h-3.5" />Related collections</p>
                <div className="flex flex-wrap gap-2 px-1">
                  {service.related.map((id) => (
                    <button key={id} type="button" className="mega-chip" onClick={() => openDrawer(id, 'b2b')}><Icon name={catById(id).icon} className="w-3.5 h-3.5" />{catById(id).short}</button>
                  ))}
                </div>
              </>
            )}
            {!isLearn && (
              <>
                <Banner k={isOcc ? (OCCASION_IMG[occ.id] ?? COLLECTION_IMG[occ.open[0]]) : COLLECTION_IMG[cat.id]} alt={isOcc ? occ.name : cat.title}
                  badge={isOcc ? `${occ.group} · ${occ.home.length + occ.biz.length} ideas` : `${pad(cat.id)} · ${cat[catSeg].length} ${catSeg === 'b2c' ? 'for home' : 'for business'}`}
                  action={<button type="button" className="btn btn-primary !py-2.5 !px-5 !text-[11px]" onClick={() => (isOcc ? openDrawer(occ.open[0], occ.open[1]) : openDrawer(cat.id, catSeg))}>View all <Icon name="arrow-right" className="w-3.5 h-3.5" /></button>} />
                <h3 className="font-display text-[1.85rem] text-cocoa-800 leading-tight mt-5">{isOcc ? occ.name : cat.title}</h3>
                <p className="text-[14.5px] text-cocoa-500 font-light mt-2 leading-relaxed">{isOcc ? occ.blurb : cat.blurb}</p>
                <div className="hairline my-5" />
                <ul key={isOcc ? occ.id : `${seg}-${cat.id}`} className="relative grid grid-cols-2 gap-x-4">
                  {isOcc ? (
                    <>
                      {occ.home.length > 0 && (
                        <li>
                          <p className="mega-sub"><Icon name="sofa" className="w-3.5 h-3.5" />For home</p>
                          <div className="grid">{occ.home.map(([id, n], i) => item(id, 'b2c', n, i, `h${i}`))}</div>
                        </li>
                      )}
                      <li className={occ.home.length ? '' : 'col-span-2'}>
                        <p className="mega-sub"><Icon name="building-2" className="w-3.5 h-3.5" />For business</p>
                        <div className={`grid ${occ.home.length ? '' : 'grid-cols-2 gap-x-4'}`}>{occ.biz.map(([id, n], i) => item(id, 'b2b', n, i, `b${i}`))}</div>
                      </li>
                    </>
                  ) : (
                    cat[catSeg].map((n, i) => <li key={n}>{item(cat.id, catSeg, n, i, n)}</li>)
                  )}
                </ul>
              </>
            )}
          </section>

          {/* Right: feature card */}
          <aside className="p-5 hidden xl:block">
            {seg === 'b2c' && (
              <DarkCard>
                <p className="relative eyebrow !text-rose-300">The festive edit</p>
                <h4 className="relative font-display text-[1.7rem] leading-tight text-ivory mt-3">Gifts &amp; décor for <em className="gold-text-lt">every celebration</em></h4>
                <p className="relative text-[13.5px] text-pearl/90 font-light mt-2 leading-relaxed">Diwali, Navratri, Christmas, weddings and birthdays — candles, florals and personalised pieces.</p>
                <button type="button" onClick={() => openDrawer(10, 'b2c')} className="relative btn btn-gold !py-2.5 !px-4 !text-[11px] mt-5 self-start">Explore festive <Icon name="arrow-right" className="w-3.5 h-3.5" /></button>
                <div className="relative mt-6 pt-5 border-t border-rose-300/15 space-y-2 text-[13.5px]">
                  <Row label="Personalised gifts" onClick={() => openDrawer(8, 'b2c')} />
                  <Row label="Home styling packages" onClick={() => openDrawer(13, 'b2c')} />
                  <Row label="Custom & bespoke" onClick={() => openDrawer(14, 'b2c')} />
                </div>
              </DarkCard>
            )}
            {seg === 'b2b' && (
              <DarkCard>
                <p className="relative eyebrow !text-rose-300">Trade programme</p>
                <h4 className="relative font-display text-[1.7rem] leading-tight text-ivory mt-3">Private label, <em className="gold-text-lt">OEM &amp; bulk</em></h4>
                <p className="relative text-[13.5px] text-pearl/90 font-light mt-2 leading-relaxed">Your logo, fragrance and packaging — sampled, approved and produced at the quantities you need.</p>
                <button type="button" onClick={() => { onClose(); prefillEnquiry('', 'business'); }} className="relative btn btn-gold !py-2.5 !px-4 !text-[11px] mt-5 self-start">Get a trade quote <Icon name="arrow-right" className="w-3.5 h-3.5" /></button>
                <div className="relative mt-6 pt-5 border-t border-rose-300/15 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl py-3" style={{ boxShadow: '0 0 0 1px rgba(226,190,159,.2) inset' }}><p className="font-display text-2xl text-ivory">{TOTAL_B2B}</p><p className="text-[10px] tracking-[.2em] uppercase text-rose-200">Solutions</p></div>
                  <div className="rounded-xl py-3" style={{ boxShadow: '0 0 0 1px rgba(226,190,159,.2) inset' }}><p className="font-display text-2xl text-ivory">{INDUSTRIES.length}</p><p className="text-[10px] tracking-[.2em] uppercase text-rose-200">Industries</p></div>
                </div>
                <a href="#business" onClick={onClose} className="relative mt-4 inline-flex items-center gap-2 text-[11.5px] tracking-[.18em] uppercase text-rose-300 hover:text-white">All business solutions <Icon name="arrow-right" className="w-4 h-4" /></a>
              </DarkCard>
            )}
            {isLearn && (
              <DarkCard>
                <p className="relative eyebrow !text-rose-300">Havenza Studio</p>
                <h4 className="relative font-display text-[1.7rem] leading-tight text-ivory mt-3">Learn the craft, <em className="gold-text-lt">build a business</em></h4>
                <p className="relative text-[13.5px] text-pearl/90 font-light mt-2 leading-relaxed">Studio workshops, online courses, kids’ classes and certificate programmes — taught by our makers.</p>
                <button type="button" onClick={() => goto('learn')} className="relative btn btn-gold !py-2.5 !px-4 !text-[11px] mt-5 self-start">All courses <Icon name="arrow-right" className="w-3.5 h-3.5" /></button>
                <div className="relative mt-6 pt-5 border-t border-rose-300/15 space-y-2 text-[13.5px]">
                  <Row label="Mega courses with certificate" onClick={() => goto('learn')} />
                  <Row label="Handmade business & selling" onClick={() => enquire('Handmade Business & Online Selling Course', 'personal')} />
                  <Row label="Book a team workshop" onClick={() => enquire('Corporate Team Workshops', 'business')} />
                  <Row label="All services" onClick={() => goto('services')} />
                </div>
              </DarkCard>
            )}
            {seg === 'occ' && (
              <DarkCard>
                <p className="relative eyebrow !text-rose-300">Décor rental · B2B</p>
                <h4 className="relative font-display text-[1.7rem] leading-tight text-ivory mt-3">Rent the look, <em className="gold-text-lt">not the storage</em></h4>
                <p className="relative text-[13.5px] text-pearl/90 font-light mt-2 leading-relaxed">Candle, floral, table and backdrop décor on rental — delivered, installed and collected.</p>
                <button type="button" onClick={() => openDrawer(15, 'b2b')} className="relative btn btn-gold !py-2.5 !px-4 !text-[11px] mt-5 self-start">Explore rental <Icon name="arrow-right" className="w-3.5 h-3.5" /></button>
                <div className="relative mt-6 pt-5 border-t border-rose-300/15 space-y-2 text-[13.5px]">
                  <Row label="Plan an event with us" onClick={() => { onClose(); prefillEnquiry('Wedding & Event Décor', 'business'); }} />
                  <Row label="Full festive collection" onClick={() => openDrawer(10, 'b2c')} />
                  <Row label="Wedding & event services" onClick={() => openDrawer(9, 'b2b')} />
                </div>
              </DarkCard>
            )}
          </aside>
        </div>

        {/* Footer strip */}
        <div className="border-t border-rose-300/30 px-7 py-4 flex flex-wrap items-center gap-x-3 gap-y-2.5" style={{ background: 'rgba(246,227,220,.28)' }}>
          {seg === 'b2c' && (
            <>
              <span className="text-[11px] tracking-[.24em] uppercase text-cocoa-400 mr-1">Popular</span>
              {([[1, 'Scented Candles'], [16, 'Handmade Soaps'], [8, 'Personalized Gifts'], [3, 'Resin Coasters'], [17, 'Concrete Planters'], [10, 'Designer Diyas'], [18, 'Candle Making Kits']] as [number, string][]).map(([id, n]) => (
                <button key={n} type="button" className="mega-chip" onClick={() => openDrawer(id, 'b2c', n)}>{n}</button>
              ))}
              <button type="button" onClick={searchAll} className="ml-auto inline-flex items-center gap-2 text-[12px] tracking-[.18em] uppercase text-rose-700 hover:text-cocoa-800"><Icon name="search" className="w-4 h-4" />Search all {TOTAL}+ items</button>
            </>
          )}
          {seg === 'b2b' && (
            <>
              <span className="text-[11px] tracking-[.24em] uppercase text-cocoa-400 mr-1">Industries</span>
              {INDUSTRIES.map((x) => (
                <button key={x.name} type="button" className="mega-chip !px-3" title={x.name} onClick={() => openDrawer(x.open, 'b2b')}><Icon name={x.icon} className="w-3.5 h-3.5" />{x.short}</button>
              ))}
            </>
          )}
          {isLearn && (
            <>
              <span className="text-[11px] tracking-[.24em] uppercase text-cocoa-400 mr-1">Learn your way</span>
              {COURSE_FORMATS.map((f) => (
                <button key={f.key} type="button" className="mega-chip !px-3" title={f.line} onClick={() => { onClose(); window.dispatchEvent(new CustomEvent('havenza:course-format', { detail: f.key })); document.getElementById('learn')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <Icon name={f.icon} className="w-3.5 h-3.5" />{f.label}
                </button>
              ))}
              <a href="#bespoke" onClick={onClose} className="ml-auto inline-flex items-center gap-2 text-[12px] tracking-[.18em] uppercase text-rose-700 hover:text-cocoa-800">How we work <Icon name="arrow-right" className="w-4 h-4" /></a>
            </>
          )}
          {seg === 'occ' && (
            <>
              <span className="text-[11px] tracking-[.24em] uppercase text-cocoa-400 mr-1">Quick picks</span>
              {([[9, 'b2c', 'Wedding Favors'], [9, 'b2c', 'Return Gifts'], [1, 'b2c', 'Festival & Seasonal Candles'], [8, 'b2b', 'Festival Corporate Hampers'], [9, 'b2b', 'Stage Décor'], [15, 'b2b', 'Backdrop Rental']] as [number, Segment, string][]).map(([id, tab, n]) => (
                <button key={n} type="button" className="mega-chip" onClick={() => openDrawer(id, tab, n)}>{n}</button>
              ))}
              <a href="#occasions" onClick={onClose} className="ml-auto inline-flex items-center gap-2 text-[12px] tracking-[.18em] uppercase text-rose-700 hover:text-cocoa-800">Festive calendar <Icon name="arrow-right" className="w-4 h-4" /></a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FragmentWithHeading({ heading, children }: { heading: string | null; children: React.ReactNode }) {
  return (
    <>
      {heading && <p className="mega-group">{heading}</p>}
      {children}
    </>
  );
}
