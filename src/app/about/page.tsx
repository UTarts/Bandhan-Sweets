'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  GlobalBandhanClips,
  BandhanKolamLogo,
  BandhanScrollThread,
  CleanAngledSlope,
} from '@/components/SvgMasksAndMotifs';

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-parallax-img',
        { yPercent: -12, scale: 1.1 },
        {
          yPercent: 12,
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#about-bridge',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );
    }, pageRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={pageRef} className="relative bg-[#FAF7F2] text-[#1A1412] overflow-x-hidden">
      <GlobalBandhanClips />
      <Navbar />

      <div className="relative pt-36 pb-24">
        <BandhanScrollThread />

        {/* Section 1: Clean Editorial Introduction */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 flex justify-center">
              <div className="lotus-portal-mask w-[290px] h-[290px] sm:w-[360px] sm:h-[360px] overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=1000&q=85"
                  alt="Artisanal Mithai Craft"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-7">
              <h1 className="font-serif-editorial text-4xl sm:text-6xl uppercase leading-[1.08] tracking-wide">
                ROOTED IN TRADITION,
                <br />
                CRAFTED FOR EVERY
                <br />
                <span className="text-[#C87D28]">CELEBRATION</span>
              </h1>
              <p className="mt-6 text-sm sm:text-base text-[#6E6259] max-w-lg leading-relaxed">
                Driven by values of simplicity, authenticity, and excellence at S.K. Heights,
                Bhangwa Chungi — Bandhan Sweets &amp; Restaurant brings together traditional halwai
                craftsmanship and contemporary family dining under one roof.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Section 2: Full-Bleed Golden Atmospheric Bridge */}
      <section id="about-bridge" className="relative w-full h-[520px] md:h-[620px] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-20 rotate-180">
          <CleanAngledSlope fill="#FAF7F2" />
        </div>

        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85"
          alt="Bandhan Dining Ambience"
          className="about-parallax-img w-full h-[125%] object-cover brightness-[0.65] sepia-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-transparent to-transparent" />

        <div className="absolute inset-0 z-20 max-w-6xl mx-auto px-6 flex items-end justify-end pb-28 md:pb-36">
          <p className="font-serif-editorial text-2xl sm:text-3xl md:text-[34px] leading-[1.3] text-[#FAF7F2] max-w-xl">
            With culture at our core and care in every detail, each sweet box we pack and each
            thali we serve carries dedication, purity, and soul.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <CleanAngledSlope fill="#120E0C" />
        </div>
      </section>

      {/* Section 3: Dark Vision Stage */}
      <section className="relative bg-[#120E0C] text-[#FAF7F2] py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.08]">
              GUIDED BY VISION,
              <br />
              GROUNDED IN
              <br />
              <span className="text-[#C87D28]">HOSPITALITY</span>
            </h2>
            <p className="mt-6 text-sm sm:text-base text-white/65 max-w-lg leading-relaxed">
              Alongside our sister brand Caketown Cafe at S.K. Heights, our journey began with a
              clear promise — to offer unadulterated pure ghee sweets, 56-Bhog festive hampers, and
              a warm, modern-royal vegetarian dining hall where every guest feels at home.
            </p>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-[360px] aspect-[4/4.5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=85"
                alt="Culinary Craft"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}