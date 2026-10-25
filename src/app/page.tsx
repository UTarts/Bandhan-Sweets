'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  SarvaniGoldenBorder,
  OrnateMandalaWheel,
  GoldenFiligreeDivider,
  HeroMehndiMandala,
  RameshwaramLotusFrame,
  HandDrawnLoopedArrow,
} from '@/components/SvgMasksAndMotifs';
import { fetchSiteData, INITIAL_MENU_ITEMS, MenuItem } from '@/lib/api';
import {
  Search,
  Sparkles,
  Flame,
  Gift,
  ShieldCheck,
  Clock,
  ArrowUpRight,
} from 'lucide-react';

export default function BandhanMasterHomePage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const collageThreadRef = useRef<SVGPathElement>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);

  useEffect(() => {
    fetchSiteData().then((data) => {
      if (data.menu_items?.length) setMenuItems(data.menu_items);
    });
  }, []);

  // ============================================================================
  // LENIS SMOOTH SCROLL + EVERY-FRAME GSAP SCROLLTRIGGER CHOREOGRAPHY
  // ============================================================================
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // 1. HERO PEDESTAL: Kept 100% identical to your page_3.tsx
      gsap.to('.hero-mandala-spin', {
        rotation: 90,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero-pedestal',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      gsap.to('.hero-platter-spin', {
        rotation: -35,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero-pedestal',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero-pedestal',
          start: 'top top',
          end: '+=400',
          pin: true,
          scrub: 0.5,
        },
      });

      gsap.to('.hero-float-left', {
        yPercent: -45,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero-pedestal',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7,
        },
      });

      gsap.to('.hero-float-right', {
        yPercent: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero-pedestal',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // 2. SLOWLY ROTATING MANDALAS IN SECTIONS 2 & 3 (Images do NOT rotate)
      gsap.to('.slow-mandala-wheel', {
        rotation: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: '#favorites-and-story-wrapper',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // 3. BANARASI-STYLE VERTICAL SWEET TRAIL: Staggered Cup & Arrow Drift
      gsap.utils.toArray<HTMLElement>('.trail-sweet-row').forEach((row, idx) => {
        const speed = idx % 2 === 0 ? -24 : -38;
        gsap.fromTo(
          row,
          { y: 35 },
          {
            y: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: '#sweet-trail-section',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      });

      gsap.to('.trail-cup-spin', {
        rotation: 45,
        ease: 'none',
        scrollTrigger: {
          trigger: '#sweet-trail-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // 4. OUR STORY ATMOSPHERIC BRIDGE (Replaces Kaju Katli Section)
      gsap.fromTo(
        '.story-bridge-img',
        { yPercent: -12, scale: 1.08 },
        {
          yPercent: 12,
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#story-bridge-stage',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        }
      );

      gsap.fromTo(
        '.story-bridge-text',
        { y: 35 },
        {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: '#story-bridge-stage',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );

      // 5. TWIN VERTICAL RIBBON PEDESTALS: Pure Concentric Rotation (Never shifts off-center!)
      gsap.fromTo(
        '.pedestal-mandala-wing',
        { rotation: -60, scale: 0.92 },
        {
          rotation: 60,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: '#twin-pedestals',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        }
      );

      gsap.fromTo(
        '.pedestal-bowl',
        { rotation: 28 },
        {
          rotation: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: '#twin-pedestals',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );

      // 6. LIVING TRADITIONAL FRAMES COLLAGE: Multi-Velocity Planes + Scroll-Drawn Golden Thread
      if (collageThreadRef.current) {
        const len = collageThreadRef.current.getTotalLength();
        gsap.set(collageThreadRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.to(collageThreadRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#living-collage-stage',
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 0.5,
          },
        });
      }

      gsap.fromTo(
        '.collage-speed-center',
        { y: 25 },
        {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: '#living-collage-stage',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        }
      );

      gsap.fromTo(
        '.collage-speed-fast-left',
        { y: 70, rotation: -4 },
        {
          y: -70,
          rotation: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: '#living-collage-stage',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        '.collage-speed-fast-right',
        { y: 85, rotation: 6 },
        {
          y: -85,
          rotation: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: '#living-collage-stage',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        '.collage-speed-med-left',
        { y: 45 },
        {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: '#living-collage-stage',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        '.collage-speed-med-right',
        { y: 55 },
        {
          y: -55,
          ease: 'none',
          scrollTrigger: {
            trigger: '#living-collage-stage',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );

      gsap.to('.collage-bg-mandala', {
        rotation: 110,
        ease: 'none',
        scrollTrigger: {
          trigger: '#tactile-bento',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // 7. GOOGLE SEARCH CURIOSITY STAGE: Floating Laddoo Bowl
      gsap.fromTo(
        '.google-laddoo-bowl',
        { y: 35, scale: 0.94 },
        {
          y: -20,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: '#google-stage',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    }, mainRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // Category Cards for Chapter 2 ("Find Your Favorites" - Sarvani Style)
  const favoriteCategories = [
    {
      title: 'PURE GHEE SWEETS',
      count: '48 Varieties',
      image:
        'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=700&q=85',
      href: '/menu?tab=sweets',
    },
    {
      title: 'DRY FRUIT ROYALES',
      count: '18 Varieties',
      image:
        'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=700&q=85',
      href: '/menu?tab=sweets',
    },
    {
      title: '56 BHOG & GIFTING',
      count: '12 Royal Boxes',
      image:
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=85',
      href: '/menu?tab=gifting',
    },
    {
      title: 'ROYAL RESTAURANT',
      count: '65+ Pure Veg Dishes',
      image:
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=85',
      href: '/menu?tab=restaurant',
    },
  ];

  // Vertical Sweet Trail Data for Chapter 3 (Banarasi Misthan Bhandar Style)
  const verticalSweetTrail = [
    {
      title: 'BESAN',
      sub: 'Laddu',
      note: 'Slow-roasted gram flour in pure A2 cow ghee with melon seeds',
      color: '#D97736',
      side: 'left' as const,
      image:
        'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=600&q=85',
    },
    {
      title: 'PISTA',
      sub: 'Phool Roll',
      note: 'Roasted Iranian green pistachios rolled in silky cashew paste',
      color: '#2E6B3E',
      side: 'right' as const,
      image:
        'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=600&q=85',
    },
    {
      title: 'MALAI',
      sub: 'Ghevar',
      note: 'Crispy Rajasthani honeycomb disc crowned with saffron rabri',
      color: '#9C5A2E',
      side: 'left' as const,
      image:
        'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=600&q=85',
    },
    {
      title: 'KESAR',
      sub: 'Rasmalai',
      note: 'Feather-soft chhena poached in chilled Pampore saffron milk',
      color: '#D45B7A',
      side: 'right' as const,
      image:
        'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=85',
    },
  ];

  return (
    <div ref={mainRef} className="relative bg-[#FDFBF7] text-[#2B1B12] overflow-x-hidden">
      {/* Custom Traditional Indian SVG Frame ClipPaths for the Living Collage */}
      <svg width="0" height="0" className="fixed pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          {/* 1. Royal Cusped Jharokha Palace Arch */}
          <clipPath id="bandhan-jharokha-frame" clipPathUnits="objectBoundingBox">
            <path d="M 0.50,0.01 C 0.57,0.06 0.62,0.10 0.68,0.12 C 0.76,0.11 0.83,0.16 0.86,0.24 C 0.93,0.26 0.98,0.33 0.99,0.42 L 0.99,0.96 C 0.99,0.98 0.97,1.00 0.94,1.00 L 0.06,1.00 C 0.03,1.00 0.01,0.98 0.01,0.96 L 0.01,0.42 C 0.02,0.33 0.07,0.26 0.14,0.24 C 0.17,0.16 0.24,0.11 0.32,0.12 C 0.38,0.10 0.43,0.06 0.50,0.01 Z" />
          </clipPath>
          {/* 2. 12-Petal Scalloped Royal Seal Medallion */}
          <clipPath id="bandhan-scallop-seal" clipPathUnits="objectBoundingBox">
            <path d="M 0.50,0.01 C 0.56,0.01 0.60,0.06 0.65,0.04 C 0.71,0.03 0.76,0.08 0.80,0.09 C 0.86,0.11 0.88,0.17 0.91,0.21 C 0.96,0.25 0.95,0.32 0.97,0.37 C 1.00,0.43 0.97,0.49 0.99,0.55 C 0.97,0.61 1.00,0.67 0.97,0.73 C 0.95,0.78 0.96,0.85 0.91,0.89 C 0.88,0.93 0.86,0.99 0.80,0.96 C 0.76,0.98 0.71,1.00 0.65,0.96 C 0.60,0.98 0.56,1.00 0.50,0.99 C 0.44,1.00 0.40,0.98 0.35,0.96 C 0.29,1.00 0.24,0.98 0.20,0.96 C 0.14,0.99 0.12,0.93 0.09,0.89 C 0.04,0.85 0.05,0.78 0.03,0.73 C 0.00,0.67 0.03,0.61 0.01,0.55 C 0.03,0.49 0.00,0.43 0.03,0.37 C 0.05,0.32 0.04,0.25 0.09,0.21 C 0.12,0.17 0.14,0.11 0.20,0.09 C 0.24,0.08 0.29,0.03 0.35,0.04 C 0.40,0.06 0.44,0.01 0.50,0.01 Z" />
          </clipPath>
          {/* 3. Royal Navratna Octagonal Mirror Frame */}
          <clipPath id="bandhan-octagon-frame" clipPathUnits="objectBoundingBox">
            <polygon points="0.28,0.01 0.72,0.01 0.99,0.28 0.99,0.72 0.72,0.99 0.28,0.99 0.01,0.72 0.01,0.28" />
          </clipPath>
        </defs>
      </svg>

      <Navbar />

      {/* ====================================================================
          CHAPTER 1: THE ROYAL VERTICAL RIBBON PEDESTAL HERO
          (Kept 100% identical to your page_3.tsx)
      ==================================================================== */}
      <section
        id="hero-pedestal"
        className="relative min-h-screen w-full bg-[#4A180D] text-[#FAF5EC] overflow-hidden flex items-center justify-center px-5 pt-24 pb-16"
      >
        {/* Subtle Warm Radial Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,132,44,0.22)_0%,transparent_70%)] pointer-events-none" />

        {/* Central Vertical Illuminated Ribbon Pillar Running Top-to-Bottom */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[370px] md:w-[430px] bg-gradient-to-b from-[#7C2D12] via-[#9A3B18] to-[#591C0B] shadow-[0_0_90px_rgba(0,0,0,0.75)] border-x border-[#C6923A]/30 z-10" />

        {/* Giant Golden Mandala Expanding Behind the Vertical Ribbon */}
        <div className="hero-mandala-spin absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] sm:w-[640px] sm:h-[640px] md:w-[740px] md:h-[740px] z-0 pointer-events-none">
          <HeroMehndiMandala className="w-full h-full" />
        </div>

        {/* Main 3-Column Hero Content Grid */}
        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Floating Narrative Wing */}
          <div className="hero-float-left lg:col-span-4 text-center lg:text-left space-y-4 order-2 lg:order-1">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#C6923A]/20 border border-[#C6923A]/50 text-[#F3C878] text-[10px] uppercase tracking-[0.28em] font-bold"></span>
            <h1 className="font-serif-editorial text-4xl sm:text-4xl xl:text-4xl leading-[1.05] text-white">
              Sweeten Your Day <br />
              <span className="italic text-[#F3C878] font-cursive">The Desi Way.</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-sm mx-auto lg:mx-0">
              From 100% pure desi ghee Kesar Laddoos <br /> and Rajasthani Malai Ghevar to 56-Bhog{' '}
              <br />
              Peacock Trunks and fine vegetarian dining.
            </p>
            <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-3">
              <Link
                href="/menu"
                className="px-6 py-3 rounded-full bg-[#C6923A] hover:bg-[#d8a348] text-[#1E1410] text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-lg"
              >
                Explore Sweets &amp; Menu
              </Link>
            </div>
          </div>

          {/* Center Vertical Ribbon Stage: Filigree + Royal Title + Rotating Overhead Platter */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center order-1 lg:order-2 py-2">
            <GoldenFiligreeDivider className="w-52 mb-2" />

            <span className="text-[10px] uppercase tracking-[0.36em] text-[#F3C878] font-bold">
              ESTD. 1984
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl tracking-[0.14em] uppercase text-white mb-5 mt-0.5">
              BANDHAN SWEETS
            </h2>

            {/* 3D Overhead Platter Sitting Across the Ribbon Edges */}
            <div className="hero-platter-spin relative w-[270px] h-[270px] sm:w-[340px] sm:h-[340px] md:w-[370px] md:h-[370px] rounded-full p-3 bg-gradient-to-br from-[#E5B869] via-[#B87D28] to-[#6E4411] shadow-[0_30px_70px_rgba(0,0,0,0.75)]">
              <div className="w-full h-full rounded-full border-2 border-dashed border-[#FFFDF7]/60 overflow-hidden">
                <img
                  src="/mithaaii.jpg"
                  alt="Bandhan Pure Ghee Laddoo & Mithai Platter"
                  className="w-full h-full object-cover scale-105"
                />
              </div>
            </div>

            <p className="font-serif-editorial text-xl sm:text-2xl tracking-[0.18em] uppercase text-[#FAF5EC] mt-6">
              KHUSHIYON KA BANDHAN
            </p>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#F3C878] mt-1">
              PURE GHEE MITHAI • FINE DINING
            </span>

            <GoldenFiligreeDivider className="w-52 mt-3" />
          </div>
        </div>
      </section>

      {/* Top Sarvani Ornamental Lotus Border Trim */}
      <SarvaniGoldenBorder />

      {/* ====================================================================
          UNIFIED WRAPPER FOR CHAPTER 2 & CHAPTER 3
          (Kept identical to page_3.tsx, with enlarged arrows in Chapter 3)
      ==================================================================== */}
      <div id="favorites-and-story-wrapper" className="relative bg-[#F8F1E3] overflow-hidden">
        {/* 1. TOP-RIGHT SLOWLY ROTATING MANDALA (Section 2) */}
        <div className="slow-mandala-wheel absolute -right-44 top-8 w-[390px] h-[390px] opacity-40 pointer-events-none z-0">
          <OrnateMandalaWheel className="w-full h-full" />
        </div>

        {/* 2. LEFT-SIDE SLOWLY ROTATING MANDALA (Positioned right BETWEEN Section 2 & Section 3) */}
        <div className="slow-mandala-wheel absolute -left-44 top-[540px] sm:top-[500px] w-[420px] h-[420px] opacity-40 pointer-events-none z-0">
          <OrnateMandalaWheel className="w-full h-full" />
        </div>

        {/* ==================================================================
            CHAPTER 2: "FIND YOUR FAVORITES" (Rameshwaram Lotus Image Frames)
        ================================================================== */}
        <section
          id="favorites-section"
          className="relative pt-24 pb-20 md:pt-28 md:pb-24 px-5 md:px-12 z-10"
        >
          <div className="max-w-6xl mx-auto">
            {/* Centered Heading with Flanking Gold Lines */}
            <div className="flex items-center justify-center gap-4 mb-24">
              <span className="w-12 sm:w-20 h-[1.5px] bg-[#9E742B]" />
              <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-[40px] font-bold tracking-wider uppercase text-[#7A1C1C] text-center">
                FIND YOUR FAVORITES
              </h2>
              <span className="w-12 sm:w-20 h-[1.5px] bg-[#9E742B]" />
            </div>

            {/* 4 Protruding Rameshwaram-Style Lotus Cards (Non-Rotating) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-24 pt-6">
              {favoriteCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="group bg-[#FFFDF9] rounded-2xl pt-28 pb-6 px-5 text-center shadow-[0_15px_45px_rgba(58,38,24,0.07)] border border-[#E8DEC8] relative flex flex-col justify-between transition-transform duration-500 hover:-translate-y-2"
                >
                  {/* Protruding Rameshwaram 8-Petal Lotus Frame (Stays upright, no circle!) */}
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2">
                    <RameshwaramLotusFrame src={cat.image} alt={cat.title} className="w-40 h-40" />
                  </div>

                  <div>
                    <h3 className="font-serif-editorial text-2xl font-bold tracking-wide text-[#22150E] mt-2">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#7D6B5D] mt-1 font-medium">{cat.count}</p>
                  </div>

                  <Link
                    href={cat.href}
                    className="mt-5 block w-full py-2.5 rounded-md bg-[#A98438] hover:bg-[#8A6926] text-white text-xs uppercase tracking-[0.18em] font-bold transition-colors shadow-sm"
                  >
                    EXPLORE NOW
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            CHAPTER 3: "EVERY SWEET TELLS A STORY"
            Unseparated #F8F1E3 background + Enlarged Scroll-Drawn Looped Arrows
        ================================================================== */}
        <section
          id="sweet-trail-section"
          className="relative pt-8 pb-24 md:pb-32 px-4 sm:px-10 z-10"
        >
          <div className="max-w-5xl mx-auto relative p-4 sm:p-12">
            {/* Top Perimeter Brand Text */}
            <div className="text-center text-[10px] sm:text-xs uppercase tracking-[0.38em] text-[#9E8C76] font-medium mb-12 select-none">
              • BANDHAN MISTHAN &amp; RESTAURANT • S.K. HEIGHTS PRATAPGARH •
            </div>

            {/* Left & Right Vertical Perimeter Text */}
            <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.38em] text-[#9E8C76] [writing-mode:vertical-rl] rotate-180 select-none">
              • BANDHAN SWEETS &amp; RESTAURANT • KHUSHIYON KA BANDHAN •
            </div>
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.38em] text-[#9E8C76] [writing-mode:vertical-rl] select-none">
              • BANDHAN SWEETS &amp; RESTAURANT • KHUSHIYON KA BANDHAN •
            </div>

            {/* Section Intro */}
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.28em] text-[#C6923A] font-bold">
                HANDCRAFTED IN SMALL BATCHES
              </span>
              <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[#2B1B12] mt-1">
                Every Sweet Tells a Story
              </h2>
            </div>

            {/* Center Vertical Sweet Cups + Enlarged Scroll-Drawing Looped Arrows */}
            <div className="space-y-14 sm:space-y-10 max-w-3xl mx-auto relative">
              {verticalSweetTrail.map((sweet, idx) => (
                <div
                  key={idx}
                  className="trail-sweet-row grid grid-cols-1 sm:grid-cols-12 items-center gap-4 sm:gap-6"
                >
                  {/* Left Column */}
                  <div
                    className={`sm:col-span-4 flex flex-col ${
                      sweet.side === 'left'
                        ? 'items-center sm:items-end text-center sm:text-right'
                        : 'hidden sm:flex'
                    }`}
                  >
                    {sweet.side === 'left' && (
                      <>
                        <h3
                          style={{ color: sweet.color }}
                          className="font-sans-ui text-2xl sm:text-3xl font-extrabold tracking-wide leading-none"
                        >
                          {sweet.title}
                        </h3>
                        <span
                          style={{ color: sweet.color }}
                          className="font-serif-editorial italic text-2xl sm:text-3xl leading-none mt-0.5"
                        >
                          {sweet.sub}
                        </span>
                        <p className="text-xs text-[#7D6B5D] mt-1.5 max-w-[200px]">{sweet.note}</p>
                        {/* Enlarged Arrow: w-36 sm:w-40 h-16 */}
                        <HandDrawnLoopedArrow
                          color={sweet.color}
                          className="w-36 sm:w-40 h-16 mt-1.5"
                        />
                      </>
                    )}
                  </div>

                  {/* Center Paper-Cup Sweet Medallion */}
                  <div className="sm:col-span-4 flex justify-center">
                    <div className="trail-cup-spin relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2.5 bg-[#FFFDF9] border-2 border-dashed border-[#D8CBB8] shadow-[0_18px_38px_rgba(43,27,18,0.14)]">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          src={sweet.image}
                          alt={`${sweet.title} ${sweet.sub}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div
                    className={`sm:col-span-4 flex flex-col ${
                      sweet.side === 'right'
                        ? 'items-center sm:items-start text-center sm:text-left'
                        : 'hidden sm:flex'
                    }`}
                  >
                    {sweet.side === 'right' && (
                      <>
                        <h3
                          style={{ color: sweet.color }}
                          className="font-sans-ui text-2xl sm:text-3xl font-extrabold tracking-wide leading-none"
                        >
                          {sweet.title}
                        </h3>
                        <span
                          style={{ color: sweet.color }}
                          className="font-serif-editorial italic text-2xl sm:text-3xl leading-none mt-0.5"
                        >
                          {sweet.sub}
                        </span>
                        <p className="text-xs text-[#7D6B5D] mt-1.5 max-w-[200px]">{sweet.note}</p>
                        {/* Enlarged Arrow: w-36 sm:w-40 h-16 */}
                        <HandDrawnLoopedArrow
                          color={sweet.color}
                          flip
                          className="w-36 sm:w-40 h-16 mt-1.5"
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-[10px] sm:text-xs uppercase tracking-[0.38em] text-[#9E8C76] font-medium mt-14 select-none">
              • PURE DESI GHEE • ZERO PRESERVATIVES • FRESH DAILY •
            </div>
          </div>
        </section>
      </div>

      {/* ====================================================================
          CHAPTER 4: OUR STORY ATMOSPHERIC PARALLAX BRIDGE
          (Replaces Kaju Katli — Matches your Our Story Screenshot #2)
      ==================================================================== */}
      <section
        id="story-bridge-stage"
        className="relative w-full h-[520px] sm:h-[600px] md:h-[640px] bg-[#0E0A08] overflow-hidden"
      >
        {/* Top Hanging Golden Lotus Border */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <SarvaniGoldenBorder flip />
        </div>

        {/* Full-Bleed Parallax Restaurant Ambience Photo */}
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1900&q=85"
          alt="Bandhan Hospitality & Dining Ambience"
          className="story-bridge-img w-full h-[125%] object-cover brightness-[0.55] contrast-110"
        />

        {/* Subtle Dark Gradient Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/55 pointer-events-none" />

        {/* Right-Aligned Poetic Editorial Quote (Exact match to Screenshot #2) */}
        <div className="story-bridge-text absolute inset-0 z-20 max-w-6xl mx-auto px-6 md:px-12 flex items-end justify-end pb-24 sm:pb-28 md:pb-32 translate-x-[0px] translate-y-[0px] scale-[1]">
          <p className="font-serif-editorial text-2xl sm:text-3xl md:text-[36px] leading-[1.3] text-[#FAF7F2] max-w-xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
            With culture at our core and care in every detail, each sweet box we pack and each
            thali we serve carries dedication, purity, and soul.
          </p>
        </div>

        {/* Bottom Standing Golden Lotus Border */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <SarvaniGoldenBorder />
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 5: TWIN VERTICAL RIBBON PEDESTALS
          FIXED: Mandala (z-0) & Bowl (z-20) share the exact same center box
          and heading font sizes are reduced to text-xl sm:text-2xl!
      ==================================================================== */}
      <section
        id="twin-pedestals"
        className="relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
      >
        {/* LEFT PEDESTAL: Deep Emerald Green Restaurant Handi */}
        <div className="relative bg-[#134632] text-white py-20 px-6 flex flex-col items-center justify-center overflow-hidden min-h-[660px]">
          {/* Vertical Center Ribbon (z-10 sits between z-0 Mandala and z-20 Bowl) */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[250px] sm:w-[310px] bg-gradient-to-r from-[#17523B] via-[#34693F] to-[#17523B] shadow-[0_0_50px_rgba(0,0,0,0.6)] z-10 pointer-events-none" />

          {/* Top Eyebrow & Filigree */}
          <div className="relative z-20 flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#E5B869] font-bold mb-2">
              BANDHAN PURE VEG RESTAURANT
            </span>
            <GoldenFiligreeDivider className="w-44 mb-5" />
          </div>

          {/* SHARED CONCENTRIC CENTER BOX FOR MANDALA (z-0) + BOWL (z-20) */}
          <div className="relative flex items-center justify-center my-2">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="pedestal-mandala-wing w-[410px] h-[410px] sm:w-[480px] sm:h-[480px] shrink-0">
                <OrnateMandalaWheel className="w-full h-full" />
              </div>
            </div>

            <div className="pedestal-bowl relative z-20 w-56 h-56 sm:w-64 sm:h-64 md:w-[265px] md:h-[265px] rounded-full p-2.5 bg-[#C85A28] shadow-[0_25px_55px_rgba(0,0,0,0.65)] border-4 border-[#E5B869]/60 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=85"
                alt="Royal Paneer Lababdar & Handi"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Smaller Heading (text-xl sm:text-2xl) + Subtitle + CTA */}
          <div className="relative z-20 flex flex-col items-center text-center max-w-xs mt-5">
            <h3 className="font-serif-editorial text-xl sm:text-2xl tracking-[0.12em] uppercase text-white leading-snug">
              ROYAL HANDI &amp; WOK
            </h3>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#E5B869] mt-1">
              MADE WITH LOVE, JUST LIKE MOM
            </p>

            <GoldenFiligreeDivider className="w-44 mt-4" />

            <Link
              href="/menu?tab=restaurant"
              className="mt-5 px-6 py-2.5 rounded-full border border-[#E5B869] text-[#E5B869] hover:bg-[#E5B869] hover:text-[#134632] text-[11px] font-bold uppercase tracking-widest transition-all"
            >
              Explore Dining Menu
            </Link>
          </div>
        </div>

        {/* RIGHT PEDESTAL: Roasted Cinnamon Brown 56-Bhog & Gifting */}
        <div className="relative bg-[#521E0B] text-white py-20 px-6 flex flex-col items-center justify-center overflow-hidden min-h-[660px]">
          {/* Vertical Center Ribbon (z-10) */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[250px] sm:w-[310px] bg-gradient-to-r from-[#6E2B12] via-[#9C4722] to-[#6E2B12] shadow-[0_0_50px_rgba(0,0,0,0.6)] z-10 pointer-events-none" />

          {/* Top Eyebrow & Filigree */}
          <div className="relative z-20 flex flex-col items-center text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#F3C878] font-bold mb-2">
              CHHAPPAN BHOG &amp; SHAGUN TRUNKS
            </span>
            <GoldenFiligreeDivider className="w-44 mb-5" />
          </div>

          {/* SHARED CONCENTRIC CENTER BOX FOR MANDALA (z-0) + BOWL (z-20) */}
          <div className="relative flex items-center justify-center my-2">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="pedestal-mandala-wing w-[410px] h-[410px] sm:w-[480px] sm:h-[480px] shrink-0">
                <OrnateMandalaWheel className="w-full h-full" />
              </div>
            </div>

            <div className="pedestal-bowl relative z-20 w-56 h-56 sm:w-64 sm:h-64 md:w-[265px] md:h-[265px] rounded-full p-2.5 bg-[#D49B4B] shadow-[0_25px_55px_rgba(0,0,0,0.65)] border-4 border-[#FFFDF7]/60 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=85"
                alt="56 Bhog Peacock Gift Box"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Smaller Heading (text-xl sm:text-2xl) + Subtitle + CTA */}
          <div className="relative z-20 flex flex-col items-center text-center max-w-xs mt-5">
            <h3 className="font-serif-editorial text-xl sm:text-2xl tracking-[0.12em] uppercase text-white leading-snug">
              56 BHOG ROYAL TRUNK
            </h3>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#F3C878] mt-1">
              FOR RELATIONSHIPS WORTH GIFTING
            </p>

            <GoldenFiligreeDivider className="w-44 mt-4" />

            <Link
              href="/menu?tab=gifting"
              className="mt-5 px-6 py-2.5 rounded-full border border-[#F3C878] text-[#F3C878] hover:bg-[#F3C878] hover:text-[#521E0B] text-[11px] font-bold uppercase tracking-widest transition-all"
            >
              Explore Gift Boxes
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 6: THE BANDHAN PROMISE + LIVING TRADITIONAL FRAMES COLLAGE
      ==================================================================== */}
      <section
        id="tactile-bento"
        className="relative py-24 md:py-32 px-5 md:px-12 bg-[#17392A] text-[#FAF5EC] overflow-hidden"
      >
        {/* Slowly Rotating Ambient Mandalas */}
        <div className="collage-bg-mandala absolute -left-44 top-16 w-[420px] h-[420px] opacity-15 pointer-events-none">
          <OrnateMandalaWheel className="w-full h-full" />
        </div>
        <div className="collage-bg-mandala absolute -right-44 bottom-12 w-[420px] h-[420px] opacity-15 pointer-events-none">
          <OrnateMandalaWheel className="w-full h-full" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* PART A: Frosted Emerald 4-Pillar Bar (Clean & Uncluttered) */}
          <div className="bg-[#112C20]/90 backdrop-blur-lg border border-[#E5B869]/25 rounded-3xl p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.35)] mb-24">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#D8B074] font-bold">
                THE BANDHAN PROMISE
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-white mt-1">
                Why Families Trust Our Kitchen
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                {
                  icon: Flame,
                  title: '100% Pure Desi Ghee',
                  desc: 'Every traditional sweet is slow-cooked in pure aromatic cow ghee with zero vanaspati.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Hygienic Daily Batches',
                  desc: 'Crafted fresh every morning at S.K. Heights under strict quality supervision.',
                },
                {
                  icon: Gift,
                  title: 'Bespoke 56-Bhog Trunks',
                  desc: 'Custom peacock, lotus, and zardosi hampers for weddings, Rakhi, and Diwali.',
                },
                {
                  icon: Clock,
                  title: 'Warm Family Hospitality',
                  desc: 'From quick sweet box packing to leisurely family dinners beneath Jaali arches.',
                },
              ].map((pillar, i) => (
                <div key={i} className="space-y-3 px-2">
                  <div className="w-14 h-14 rounded-full border border-[#D8B074]/50 flex items-center justify-center mx-auto text-[#D8B074]">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-editorial text-2xl text-white">{pillar.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PART B: RESPONSIVE BENTO GRID OF BANDHAN MOMENTS */}
          <div
            id="living-collage-stage"
            className="relative pt-4 pb-8 translate-x-[0px] translate-y-[0px] scale-[1]"
          >
            {/* Bento Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 translate-x-[0px] translate-y-[0px] scale-[1]">
              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#E5B869] font-bold block">
                  GLIMPSES OF CELEBRATION
                </span>
                <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl text-white mt-1">
                  Moments at <span className="italic text-[#F3C878] font-cursive">Bandhan</span>
                </h2>
              </div>

              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C6923A] hover:bg-[#d8a348] text-[#1E1410] text-xs font-bold uppercase tracking-[0.18em] shadow-lg transition-all self-start md:self-auto"
              >
                <span>Explore Full Menu</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 12-Column Responsive Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[240px] sm:auto-rows-[260px] gap-5">
              {/* Tile 1: Large Flagship Feature (Spans 7 cols, 2 rows on desktop) */}
              <div className="md:col-span-7 md:row-span-2 group relative rounded-3xl overflow-hidden border border-[#E5B869]/30 bg-[#0E241A] shadow-[0_20px_50px_rgba(0,0,0,0.4)] translate-x-[0px] translate-y-[0px] scale-[1]">
                <img
                  src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=85"
                  alt="Chhappan Bhog 56-Compartment Peacock Trunk"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07140E]/95 via-[#07140E]/25 to-transparent flex flex-col justify-end p-6 sm:p-8">
                  <span className="inline-block w-fit px-3 py-1 rounded-full bg-[#C6923A]/25 border border-[#E5B869]/50 text-[#F3C878] text-[10px] uppercase tracking-[0.24em] font-bold mb-2">
                    ROYAL SHAGUN GIFTING
                  </span>
                  <h3 className="font-serif-editorial text-2xl sm:text-4xl text-white leading-tight">
                    Chhappan Bhog (56 Bhog) Peacock Trunks
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 mt-1.5 max-w-lg">
                    Handcrafted festive, wedding, and corporate gift hampers filled with pure desi
                    ghee sweets and roasted dry fruits.
                  </p>
                </div>
              </div>

              {/* Tile 2: Top-Right Wide Card (Spans 5 cols, 1 row) */}
              <div className="md:col-span-5 md:row-span-1 group relative rounded-3xl overflow-hidden border border-[#E5B869]/30 bg-[#0E241A] shadow-[0_20px_50px_rgba(0,0,0,0.4)] translate-x-[0px] translate-y-[0px] scale-[1]">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85"
                  alt="Backlit Mughal Jaali Family Dining Hall"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07140E]/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#E5B869] font-bold">
                    S.K. HEIGHTS AMBIENCE
                  </span>
                  <h3 className="font-serif-editorial text-2xl text-white mt-0.5">
                    Backlit Mughal Jaali Family Hall
                  </h3>
                </div>
              </div>

              {/* Tile 3: Middle-Right Wide Card (Spans 5 cols, 1 row) */}
              <div className="md:col-span-5 md:row-span-1 group relative rounded-3xl overflow-hidden border border-[#E5B869]/30 bg-[#0E241A] shadow-[0_20px_50px_rgba(0,0,0,0.4)] translate-x-[0px] translate-y-[0px] scale-[1]">
                <img
                  src="https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=900&q=85"
                  alt="Honeycomb Rajasthani Malai Ghevar"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07140E]/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#E5B869] font-bold">
                    SEASONAL HERITAGE CROWN
                  </span>
                  <h3 className="font-serif-editorial text-2xl text-white mt-0.5">
                    Rajasthani Malai &amp; Kesar Ghevar
                  </h3>
                </div>
              </div>

              {/* Tile 4: Bottom-Left Card (Spans 4 cols, 1 row) */}
              <div className="md:col-span-4 md:row-span-1 group relative rounded-3xl overflow-hidden border border-[#E5B869]/30 bg-[#0E241A] shadow-[0_20px_50px_rgba(0,0,0,0.4)] translate-x-[0px] translate-y-[0px] scale-[1]">
                <img
                  src="https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=85"
                  alt="Stone-Ground Kesar Kaju Katli"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07140E]/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#E5B869] font-bold">
                    PURE KAJU &amp; DRYFRUIT
                  </span>
                  <h3 className="font-serif-editorial text-2xl text-white mt-0.5">
                    Kesar Kaju Katli &amp; Pista Roll
                  </h3>
                </div>
              </div>

              {/* Tile 5: Bottom-Center Card (Spans 4 cols, 1 row) */}
              <div className="md:col-span-4 md:row-span-1 group relative rounded-3xl overflow-hidden border border-[#E5B869]/30 bg-[#0E241A] shadow-[0_20px_50px_rgba(0,0,0,0.4)] translate-x-[0px] translate-y-[0px] scale-[1]">
                <img
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=85"
                  alt="The 12-Item Maharaja Vegetarian Thali"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07140E]/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#E5B869] font-bold">
                    FINE VEGETARIAN DINING
                  </span>
                  <h3 className="font-serif-editorial text-2xl text-white mt-0.5">
                    The Royal Maharaja Thali
                  </h3>
                </div>
              </div>

              {/* Tile 6: Bottom-Right Card (Spans 4 cols, 1 row) */}
              <div className="md:col-span-4 md:row-span-1 group relative rounded-3xl overflow-hidden border border-[#E5B869]/30 bg-[#0E241A] shadow-[0_20px_50px_rgba(0,0,0,0.4)] translate-x-[0px] translate-y-[0px] scale-[1]">
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85"
                  alt="Banarasi Chaat & Indo-Chinese Wok"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07140E]/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#E5B869] font-bold">
                    LIVE STREET THEATRE
                  </span>
                  <h3 className="font-serif-editorial text-2xl text-white mt-0.5">
                    Banarasi Chaat &amp; Crispy Wok
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 7: THE GOOGLE SEARCH CURIOSITY SPOTLIGHT
          (Kept 100% identical to your page_3.tsx)
      ==================================================================== */}
      <section
        id="google-stage"
        className="relative py-24 md:py-32 px-5 bg-[#262322] text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,130,43,0.16)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#E5B869] font-bold">
            EVERY CRAVING HAS ONE ANSWER
          </span>

          <h2 className="font-sans-ui text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-white mt-3">
            Google
          </h2>

          {/* Search Box Card */}
          <div className="mt-8 bg-white text-[#22150E] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden text-left max-w-xl mx-auto border border-white/20">
            <div className="px-5 py-3.5 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  Best Indian Sweets &amp; Pure Veg Restaurant in Pratapgarh
                </span>
              </div>
            </div>

            <Link
              href="/menu"
              className="px-5 py-3.5 bg-[#EDF2FA] hover:bg-[#E2ECF9] flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-[#7A1C1C] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#1A1412]">
                  Bandhan Sweets &amp; Restaurant — S.K. Heights, Bhangwa Chungi
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#7A1C1C]" />
            </Link>
          </div>

          {/* Brass Bowl of Motichoor Laddoos on Banana Leaf Below the Search Bar */}
          <div className="google-laddoo-bowl relative mt-10 mx-auto w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2.5 bg-gradient-to-b from-[#E5B869] to-[#6E4916] shadow-[0_30px_70px_rgba(0,0,0,0.75)]">
            <img
              src="/motichoor.webp"
              alt="Shahi Motichoor Laddoo Bowl"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#22150E] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#E5B869] transition-all shadow-xl"
            >
              Plan Your Visit or Order Bulk Boxes →
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 8: "AVAILABLE ACROSS THESE PLATFORMS" MANDALA BANNER
          (Kept 100% identical to your page_3.tsx)
      ==================================================================== */}
      <section className="relative bg-[#FDF2D0] py-20 px-5 overflow-hidden border-t border-[#E6D29E]">
        <div className="absolute -left-36 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 opacity-45 pointer-events-none">
          <OrnateMandalaWheel className="w-full h-full" />
        </div>
        <div className="absolute -right-36 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 opacity-45 pointer-events-none">
          <OrnateMandalaWheel className="w-full h-full" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-[#231811]">
            Available across these platforms
          </h2>
          <p className="text-xs sm:text-sm text-[#4A3728] mt-2 font-medium">
            Pratapgarh: Express Local Delivery | Bulk Festive Gifting: Pan-UP Dispatch
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
            <div className="w-44 h-24 bg-white rounded-2xl shadow-[0_10px_30px_rgba(180,140,60,0.15)] flex flex-col items-center justify-center px-6 border border-[#F2E4B8] hover:-translate-y-1 transition-transform">
              <span className="font-sans-ui text-3xl font-black italic tracking-tight text-[#E23744]">
                zomato
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">
                Order Online
              </span>
            </div>

            <div className="w-44 h-24 bg-white rounded-2xl shadow-[0_10px_30px_rgba(180,140,60,0.15)] flex flex-col items-center justify-center px-6 border border-[#F2E4B8] hover:-translate-y-1 transition-transform">
              <span className="font-sans-ui text-2xl font-extrabold tracking-tight text-[#FC8019]">
                SWIGGY
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#7A1C1C] font-bold mt-0.5">
                Fast Delivery
              </span>
            </div>

            <a
              href="https://caketowncafe.com"
              target="_blank"
              rel="noreferrer"
              className="w-44 h-24 bg-white rounded-2xl shadow-[0_10px_30px_rgba(180,140,60,0.15)] flex flex-col items-center justify-center px-4 border border-[#F2E4B8] hover:-translate-y-1 transition-transform"
            >
              <img
                src="/caketown.webp"
                alt="Caketown Cafe"
                className="h-10 w-auto object-contain"
              />
              <span className="text-[10px] uppercase tracking-widest text-[#8C692B] font-bold mt-1">
                Sister Brand ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}