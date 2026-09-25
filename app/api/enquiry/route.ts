import { NextResponse } from 'next/server';

/* Receives the "Request a quote" form.
   TODO: forward to your inbox or CRM — e.g. an email service (Resend, SendGrid), a Google Sheet,
   or your CRM's API — using credentials stored as Vercel environment variables. */

const clean = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 }); }

  const enquiry = {
    segment: clean(body.segment, 20) === 'business' ? 'business' : 'personal',
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    company: clean(body.company, 200),
    occasion: clean(body.occasion, 80),
    collection: clean(body.collection, 120),
    quantity: clean(body.quantity, 80),
    message: clean(body.message),
    receivedAt: new Date().toISOString(),
  };

  if (!enquiry.name || !/\S+@\S+\.\S+/.test(enquiry.email)) {
    return NextResponse.json({ ok: false, error: 'Name and a valid email are required' }, { status: 422 });
  }

  // Visible in Vercel → Project → Logs until a delivery channel is connected.
  console.log('[havenza] new enquiry', JSON.stringify(enquiry));

  return NextResponse.json({ ok: true });
}
