'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState(''); // 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name?.value?.trim();
    const email = form.email?.value?.trim();
    const message = form.message?.value?.trim();

    if (!name || !email || !message) {
      setStatus('error');
      setErrorMessage('Please fill in name, email, and message.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 429) {
        setStatus('error');
        setErrorMessage(data.error || 'You can only send one message per 24 hours. Please try again later.');
        return;
      }
      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send. Try again or email us directly.');
        return;
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Try again or email us directly.');
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="w-full px-5 py-4 text-base text-gray-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-70"
          required
          disabled={status === 'sending' || status === 'success'}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="w-full px-5 py-4 text-base text-gray-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-70"
          required
          disabled={status === 'sending' || status === 'success'}
        />
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Your message"
          className="w-full min-h-[140px] px-5 py-4 text-base text-gray-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-y disabled:opacity-70"
          rows={5}
          required
          disabled={status === 'sending' || status === 'success'}
        />
      </div>
      <button
        type="submit"
        className="self-start px-9 py-4 text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary-hover hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        disabled={status === 'sending' || status === 'success'}
      >
        {status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent' : 'Send message'}
      </button>
      {status === 'success' && (
        <p className="text-sm text-teal-600">Message sent. We&apos;ll get back to you soon. You can send another message in 24 hours.</p>
      )}
      {status === 'error' && errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}
    </form>
  );
}
