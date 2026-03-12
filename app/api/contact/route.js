import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RATE_LIMIT_HOURS = 24;
const RATE_LIMIT_SECONDS = RATE_LIMIT_HOURS * 60 * 60;

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIp) return realIp;
  return 'unknown';
}

async function isRateLimited(email, ip) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) return { limited: false };

  const { Redis } = await import('@upstash/redis');
  const redis = new Redis({ url: redisUrl, token: redisToken });
  const normalizedEmail = String(email).toLowerCase().trim();
  const keyEmail = `contact:email:${normalizedEmail}`;
  const keyIp = `contact:ip:${ip}`;

  const [existsEmail, existsIp] = await Promise.all([
    redis.get(keyEmail),
    redis.get(keyIp),
  ]);

  if (existsEmail) return { limited: true, reason: 'email' };
  if (existsIp) return { limited: true, reason: 'ip' };
  return { limited: false };
}

async function setRateLimit(email, ip) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) return;

  const { Redis } = await import('@upstash/redis');
  const redis = new Redis({ url: redisUrl, token: redisToken });
  const normalizedEmail = String(email).toLowerCase().trim();
  const keyEmail = `contact:email:${normalizedEmail}`;
  const keyIp = `contact:ip:${ip}`;

  await Promise.all([
    redis.set(keyEmail, Date.now(), { ex: RATE_LIMIT_SECONDS }),
    redis.set(keyIp, Date.now(), { ex: RATE_LIMIT_SECONDS }),
  ]);
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email is not configured. Set RESEND_API_KEY and CONTACT_EMAIL in Vercel.' },
      { status: 503 }
    );
  }

  const toEmail = process.env.CONTACT_EMAIL || process.env.RESEND_FROM_EMAIL;
  if (!toEmail) {
    return NextResponse.json(
      { error: 'CONTACT_EMAIL is not set in environment.' },
      { status: 503 }
    );
  }

  const ip = getClientIp(request);

  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const { limited, reason } = await isRateLimited(email, ip);
    if (limited) {
      return NextResponse.json(
        {
          error: reason === 'email'
            ? 'This email has already been used to contact us. Please wait 24 hours before sending again.'
            : 'Too many contact attempts from your network. Please try again in 24 hours.',
        },
        { status: 429 }
      );
    }

    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM_EMAIL || 'WEBARRAYS Contact <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: from,
      to: [toEmail],
      replyTo: email,
      subject: `WEBARRAYS Contact: ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <pre>${escapeHtml(message)}</pre>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
    }

    await setRateLimit(email, ip);

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}

function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
