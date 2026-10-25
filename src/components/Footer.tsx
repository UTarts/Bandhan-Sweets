'use client';
import React from 'react';
import Link from 'next/link';
import { SarvaniGoldenBorder, GoldenFiligreeDivider } from './SvgMasksAndMotifs';
import { MapPin, Phone, Clock, ArrowUpRight, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#1E1410] text-[#FAF5EC] overflow-hidden">
      {/* Top Ornamental Golden Trim */}
      <div className="bg-[#FAF5EC]">
        <SarvaniGoldenBorder />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        {/* Top Centered Brand Seal */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="bg-white/95 p-3 rounded-2xl shadow-lg mb-4">
            <img
              src="/bandhanlogo.png"
              alt="Bandhan Sweets & Restaurant"
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="font-serif-editorial italic text-2xl sm:text-3xl text-[#E5B869]">
            “Crafted With Purity, Served With Love”
          </p>
          <div className="mt-3">
            <GoldenFiligreeDivider className="w-56" />
          </div>
        </div>

        {/* 4-Column Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Col 1: About Bandhan */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#E5B869] font-bold">
              BANDHAN SWEETS &amp; RESTAURANT
            </h4>
            <p className="text-sm text-white/75 leading-relaxed">
              Pratapgarh’s premier destination at S.K. Heights for 100% pure desi ghee Indian
              mithai, Rajasthani Malai Ghevar, 56-Bhog Peacock Gift Trunks, and fine vegetarian
              family dining.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="px-3.5 py-1 rounded-md bg-[#E23744] text-white text-xs font-bold">
                Zomato
              </span>
              <span className="px-3.5 py-1 rounded-md bg-[#FC8019] text-white text-xs font-bold">
                Swiggy
              </span>
              <span className="px-3.5 py-1 rounded-md bg-[#164A35] text-white text-xs font-semibold">
                100% Pure Veg
              </span>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#E5B869] font-bold mb-3">
              EXPLORE
            </h4>
            {[
              { label: 'Home', href: '/' },
              { label: 'Sweets & Menu', href: '/menu' },
              { label: 'Our Story', href: '/about' },
              { label: 'Contact & Bulk Orders', href: '/contact' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block text-sm text-white/75 hover:text-[#E5B869] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 3: S.K. Heights Address & Direct Numbers */}
          <div className="md:col-span-3 space-y-3 text-sm text-white/80">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#E5B869] font-bold mb-3">
              VISIT US
            </h4>
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#E5B869] shrink-0 mt-1" />
              <span>S.K. Heights, Bhangwa Chungi, Pratapgarh, Uttar Pradesh</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#E5B869] shrink-0" />
              <span>+91 9918100055 / +91 9918100066</span>
            </p>
            <p className="flex items-center gap-2.5 text-white/60 text-xs">
              <Clock className="w-4 h-4 text-[#E5B869] shrink-0" />
              <span>Open Every Day: 8:00 AM – 10:30 PM</span>
            </p>
          </div>

          {/* Col 4: Official Caketown Cafe Sister Brand Spotlight Card */}
          <div className="md:col-span-3 bg-[#2B1D17] border border-[#C6923A]/35 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#E5B869] font-bold block mb-2">
                SISTER BRAND AT S.K. HEIGHTS
              </span>
              <div className="rounded-xl p-2.5 inline-block mb-3">
                <img
                  src="/logo2.webp"
                  alt="Caketown Cafe"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Craving celebration cakes, fresh pastries, shakes, or specialty coffee? Step right
                next door into Caketown Cafe.
              </p>
            </div>

            <a
              href="https://caketowncafe.com"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#C6923A] hover:bg-[#d8a348] text-[#1E1410] text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Visit Caketown Cafe</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/45">
          <span>
            © {new Date().getFullYear()} Bandhan Sweets &amp; Restaurant. All Rights Reserved.
          </span>

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-[#E5B869] transition-colors"
          >
            <Lock className="w-3.5 h-3.5" /> Staff Stock &amp; Menu Admin
          </Link>
        </div>

        {/* UT Arts Branding */}
        <div className="flex items-center gap-3">
            <span className="text-xs text-white/40">Powered by</span>
            <a href="https://www.utarts.in" target="_blank" rel="noopener noreferrer" className="font-bold text-orange-500 hover:text-orange-700 transition-colors flex items-center gap-1.5">
              <img alt="UT Arts Logo" className="h-6 w-6 rounded-full object-cover border border-gray-200" src="https://www.utarts.in/images/UTArt_Logo.webp" />
              UT Arts
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link" aria-hidden="true">
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </a>
          </div>
      </div>
    </footer>
  );
}