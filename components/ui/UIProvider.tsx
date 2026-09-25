'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import type { GroupKey, Segment } from '@/lib/data';

export type FilterKey = 'all' | GroupKey;
export type EnquirySegment = 'personal' | 'business';

interface DrawerState { open: boolean; catId: number; tab: Segment | null; highlight: string | null; nonce: number }
interface EnquiryState { segment: EnquirySegment; category: string; nonce: number }

interface UI {
  drawer: DrawerState;
  openDrawer: (catId: number, tab?: Segment | null, highlight?: string | null) => void;
  closeDrawer: () => void;
  filter: FilterKey;
  setFilter: (f: FilterKey) => void;
  jumpToFilter: (f: FilterKey) => void;
  enquiry: EnquiryState;
  prefillEnquiry: (category: string, segment?: EnquirySegment) => void;
  toast: { msg: string; show: boolean };
  showToast: (msg: string) => void;
  bagCount: number;
  addToBag: () => void;
}

const Ctx = createContext<UI | null>(null);

export function useUI() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useUI must be used inside <UIProvider>');
  return v;
}

export default function UIProvider({ children }: { children: ReactNode }) {
  const [drawer, setDrawer] = useState<DrawerState>({ open: false, catId: 1, tab: null, highlight: null, nonce: 0 });
  const [filter, setFilter] = useState<FilterKey>('all');
  const [enquiry, setEnquiry] = useState<EnquiryState>({ segment: 'personal', category: '', nonce: 0 });
  const [toast, setToast] = useState({ msg: '', show: false });
  const [bagCount, setBag] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDrawer = useCallback((catId: number, tab: Segment | null = null, highlight: string | null = null) => {
    setDrawer((d) => ({ open: true, catId, tab, highlight, nonce: d.nonce + 1 }));
  }, []);
  const closeDrawer = useCallback(() => setDrawer((d) => ({ ...d, open: false })), []);

  const jumpToFilter = useCallback((f: FilterKey) => {
    setFilter(f);
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const prefillEnquiry = useCallback((category: string, segment?: EnquirySegment) => {
    setEnquiry((e) => ({ segment: segment ?? e.segment, category, nonce: e.nonce + 1 }));
    setDrawer((d) => ({ ...d, open: false }));
    document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => (document.getElementById('f-name') as HTMLInputElement | null)?.focus({ preventScroll: true }), 800);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast({ msg, show: true });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 3800);
  }, []);

  const addToBag = useCallback(() => setBag((n) => n + 1), []);

  const value = useMemo<UI>(() => ({
    drawer, openDrawer, closeDrawer, filter, setFilter, jumpToFilter,
    enquiry, prefillEnquiry, toast, showToast, bagCount, addToBag,
  }), [drawer, openDrawer, closeDrawer, filter, jumpToFilter, enquiry, prefillEnquiry, toast, showToast, bagCount, addToBag]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
