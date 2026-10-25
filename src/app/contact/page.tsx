'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { submitCustomerEnquiry } from '@/lib/api';
import { CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setSubmitting(true);
    await submitCustomerEnquiry(formState);
    setSubmitting(false);
    setSubmitted(true);
    setFormState({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#070506] text-[#FAF7F2] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto w-full px-6 md:px-12 pt-36 pb-24">
        <h1 className="font-serif-editorial text-4xl sm:text-6xl md:text-[64px] text-center font-normal tracking-tight mb-14">
          Just Drop Your Message Here
        </h1>

        {submitted ? (
          <div className="bg-[#141414] border border-[#C87D28]/40 rounded-2xl p-10 text-center max-w-xl mx-auto">
            <CheckCircle2 className="w-12 h-12 text-[#C87D28] mx-auto mb-3" />
            <h3 className="font-serif-editorial text-3xl text-white">
              Thank You! We Have Received Your Message.
            </h3>
            <p className="text-sm text-white/65 mt-2">
              Our team at S.K. Heights, Bhangwa Chungi will reach out to you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#C87D28] text-black text-xs font-semibold uppercase tracking-wider"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#141414] border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#C87D28] transition-colors">
                <label className="block text-xs font-semibold text-white mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                />
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#C87D28] transition-colors">
                <label className="block text-xs font-semibold text-white mb-2">Email</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                />
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#C87D28] transition-colors">
                <label className="block text-xs font-semibold text-white mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#C87D28] transition-colors">
              <label className="block text-xs font-semibold text-white mb-2">Message</label>
              <textarea
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Type something..."
                className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none resize-y"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold transition-all"
              >
                {submitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-xs sm:text-sm text-white/75 mt-14 leading-relaxed">
          Our team will get back to you within 24 hours, faster than warm Gulab Jamuns arrive at
          your table,
          <br />
          Coz’ there’s always <span className="text-[#C87D28]">“Khushiyon Ka Bandhan”</span> right?
        </p>
      </main>

      <Footer />
    </div>
  );
}