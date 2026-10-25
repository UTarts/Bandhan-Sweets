'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GoldenFiligreeDivider } from '@/components/SvgMasksAndMotifs';

interface CleanMenuCourse {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  align: 'left' | 'right';
  image: string; // Put your transparent PNG/WebP path here (e.g. '/chaat.png')
  items: {
    name: string;
    detail: string;
    tag?: string;
  }[];
}

// ============================================================================
// CLEAN, MODERN RESTAURANT MENU COURSES (Frameless images for your PNGs/WebPs)
// ============================================================================
const DINING_COURSES: CleanMenuCourse[] = [
  {
    id: 'course-starters',
    number: '01',
    title: 'STARTERS & CHAAT',
    subtitle: 'Crisp, Tangy & Live Street Craft',
    align: 'right',
    image: '/chat.webp', // Swap with your background-free PNG (e.g. '/starters.png')
    items: [
      {
        name: 'Banarasi Raj Kachori',
        detail: 'Crisp semolina shell, soft bhallas, churned sweet curd & pomegranate',
        tag: 'Signature',
      },
      {
        name: 'Crispy Palak Patta Chaat',
        detail: 'Tempura spinach leaves, mint glaze, sweet dahi & roasted cumin',
        tag: 'Must Try',
      },
      {
        name: 'Shahi Dahi Bhalla Papdi',
        detail: 'Velvety lentil dumplings drenched in chilled hung curd & imli chutney',
      },
      {
        name: 'Dahi Ke Sholay',
        detail: 'Golden crisp roll filled with spiced hung curd, raisins & coriander',
      },
      {
        name: 'Hara Bhara Banjara Kabab',
        detail: 'Pan-seared spinach, green pea & chana dal medallions with whole cashew',
      },
      {
        name: 'Paneer Salt & Pepper',
        detail: 'Crisp malai cottage cheese tossed with cracked black pepper & scallions',
      },
    ],
  },
  {
    id: 'course-tandoor',
    number: '02',
    title: 'CLAY TANDOOR',
    subtitle: 'Char-Grilled Over Glowing Charcoal',
    align: 'left',
    image: '/tandoor.webp', // Swap with your background-free PNG (e.g. '/tandoor.png')
    items: [
      {
        name: 'Malai Paneer Tikka Shashlik',
        detail: 'Cottage cheese marinated in cashew cream, cardamom & white pepper',
        tag: 'Bestseller',
      },
      {
        name: 'Angara Lehsuni Paneer Tikka',
        detail: 'Smoky garlic & Kashmiri red chilli marinade roasted in clay oven',
      },
      {
        name: 'Tandoori Stuffed Mushroom',
        detail: 'Button mushrooms filled with spiced paneer, herbs & molten cheese',
      },
      {
        name: 'Afghani Soya Malai Chaap',
        detail: 'Tender soya chaap basted with rich cream, butter & kasuri methi',
      },
      {
        name: 'The Grand Bandhan Seekh Platter',
        detail: 'Assorted family platter of Paneer Tikka, Veg Seekh, Chaap & Mushroom',
        tag: 'Chef Special',
      },
    ],
  },
  {
    id: 'course-wok',
    number: '03',
    title: 'INDO-CHINESE WOK',
    subtitle: 'High-Flame Tossed Oriental Classics',
    align: 'right',
    image: '/chinese.webp', // Swap with your background-free PNG (e.g. '/wok.png')
    items: [
      {
        name: 'Crispy Veg Manchurian',
        detail: 'Garden vegetable dumplings tossed in smoky garlic, ginger & soy glaze',
        tag: 'Crowd Favourite',
      },
      {
        name: 'Cottage Cheese Chilli Paneer',
        detail: 'Batter-crisped malai paneer wok-seared with bell peppers & green chilli',
      },
      {
        name: 'Honey Chilli Lotus Stem & Potato',
        detail: 'Crisp lotus stem & potato fingers glazed with honey & toasted sesame',
      },
      {
        name: 'Burnt Garlic Hakka Noodles',
        detail: 'Wok-tossed noodles with julienne vegetables & golden roasted garlic',
      },
      {
        name: 'Szechwan Fried Rice & Manchurian Bowl',
        detail: 'Aromatic wok fried rice paired with hot garlic Manchurian gravy',
      },
    ],
  },
  {
    id: 'course-main',
    number: '04',
    title: 'MAIN COURSE HANDI',
    subtitle: 'Slow-Simmered in Copper Handis',
    align: 'left',
    image: '/kadai.webp', // Swap with your background-free PNG (e.g. '/handi.png')
    items: [
      {
        name: 'Paneer Tikka Lababdar',
        detail: 'Char-grilled paneer tikka in velvety tomato, cashew & melon-seed gravy',
        tag: 'House Pride',
      },
      {
        name: 'Dal Bandhan Bukhara',
        detail: 'Whole black urad dal slow-simmered for 12 hours with white butter & cream',
        tag: 'Signature',
      },
      {
        name: 'Kesar Malai Kofta',
        detail: 'Khoya & nut-stuffed dumplings in a silky saffron-cardamom cashew curry',
      },
      {
        name: 'Kadhai Paneer Peshawari',
        detail: 'Cottage cheese & peppers tossed with freshly pounded coriander & chillies',
      },
      {
        name: 'Kaju Khoya Butter Masala',
        detail: 'Roasted whole Goan cashews simmered in rich mawa-tomato masala',
      },
      {
        name: 'Amritsari Pindi Chole',
        detail: 'Tempered with pure desi ghee, ginger juliennes & roasted anardana',
      },
    ],
  },
  {
    id: 'course-thali',
    number: '05',
    title: 'ROYAL THALI, BREADS & DRINKS',
    subtitle: 'Complete Feasts, Flaky Naans & Refreshers',
    align: 'right',
    image: '/maharaja.webp', // Swap with your background-free PNG (e.g. '/thali.png')
    items: [
      {
        name: 'The 12-Item Maharaja Feast Thali',
        detail: 'Paneer Lababdar, Dal Makhani, Subz, Dahi Bhalla, Biryani, Raita, 2 Breads & Sweet',
        tag: 'Royal Feast',
      },
      {
        name: 'Amritsari Stuffed Chur-Chur Naan',
        detail: 'Flaky multi-layered tandoori bread crushed generously with pure desi ghee',
      },
      {
        name: 'Nizami Subz Dum Handi Biryani',
        detail: 'Parda-sealed basmati rice layered with saffron milk, mint & spiced vegetables',
        tag: 'Dum Sealed',
      },
      {
        name: 'Kesar Badam Patiala Kulhad Lassi',
        detail: 'Thick churned yogurt crowned with fresh malai, saffron & slivered nuts',
      },
      {
        name: 'Virgin Mint Mojito & Fruit Shakes',
        detail: 'Chilled muddled mint-lime coolers and thick artisanal milkshakes',
      },
    ],
  },
];

export default function RestaurantDiningPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sCurvePathRef = useRef<SVGPathElement>(null);

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
      // 1. PREMIUM HERO PARALLAX (Background zooms softly while typography floats)
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#restaurant-experience-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      heroTl
        .to('.hero-ambience-bg', { scale: 1.14, yPercent: 12, ease: 'none' }, 0)
        .to('.hero-experience-content', { yPercent: -28, opacity: 0.25, ease: 'none' }, 0)
        .to('.hero-floating-pillar', { yPercent: -45, ease: 'none' }, 0);

      // 2. CONTINUOUS S-CURVE GOLDEN LINE DRAWING DOWN THE MENU
      if (sCurvePathRef.current) {
        const pathLen = sCurvePathRef.current.getTotalLength();
        gsap.set(sCurvePathRef.current, {
          strokeDasharray: pathLen,
          strokeDashoffset: pathLen,
        });

        gsap.to(sCurvePathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#undivided-menu-flow',
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 0.5,
          },
        });
      }

      // 3. COURSE-BY-COURSE + DISH-BY-DISH SCROLL REVEAL
      gsap.utils.toArray<HTMLElement>('.course-station').forEach((station, idx) => {
        const plate = station.querySelector('.frameless-plate');
        const headerBlock = station.querySelector('.course-header-block');
        const dishRows = station.querySelectorAll('.dish-reveal-item');
        const isLeft = idx % 2 === 1;

        // Frameless Plate: Glides in + Rotates continuously with scroll
        if (plate) {
          gsap.fromTo(
            plate,
            {
              y: 90,
              rotation: isLeft ? -38 : 38,
              scale: 0.85,
              opacity: 0,
            },
            {
              y: -30,
              rotation: isLeft ? 22 : -22,
              scale: 1,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: station,
                start: 'top 88%',
                end: 'bottom 20%',
                scrub: 0.6,
              },
            }
          );
        }

        // Course Title Pill Reveal
        if (headerBlock) {
          gsap.fromTo(
            headerBlock,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: station,
                start: 'top 86%',
                end: 'top 55%',
                scrub: 0.4,
              },
            }
          );
        }

        // Individual Dish Rows: Staggered Scroll-Reveal one after another
        if (dishRows.length > 0) {
          gsap.fromTo(
            dishRows,
            {
              y: 28,
              x: isLeft ? 30 : -30,
              opacity: 0,
            },
            {
              y: 0,
              x: 0,
              opacity: 1,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: station,
                start: 'top 80%',
                end: 'top 32%',
                scrub: 0.5,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#14110F] text-[#FAF6F0] overflow-x-hidden selection:bg-[#E58A1F] selection:text-black"
    >
      <Navbar />

      {/* ====================================================================
          PART 1: PREMIUM BANDHAN RESTAURANT EXPERIENCE HERO
          Starts at top:0 behind the frosted navbar and melts seamlessly into
          the menu canvas below with ZERO horizontal dividing line!
      ==================================================================== */}
      <section
        id="restaurant-experience-hero"
        className="relative min-h-[96vh] w-full flex flex-col justify-between pt-28 pb-20 px-5 sm:px-12 overflow-hidden"
      >
        {/* Full-Bleed Parallax Restaurant Ambience Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=90"
            alt="Bandhan Restaurant Royal Dining Experience"
            className="hero-ambience-bg w-full h-full object-cover scale-105 brightness-[0.48] contrast-110"
          />
          {/* Seamless Multi-Stop Gradient Vignette — Melts into #14110F at bottom! */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#14110F]/65 via-[#14110F]/45 to-[#14110F]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#14110F_100%)] opacity-80" />
        </div>

        {/* Center Editorial Experience Statement (Nudge controls below) */}
        <div className="hero-experience-content relative z-10 max-w-4xl mx-auto my-auto text-center translate-x-[0px] translate-y-[0px] scale-[1]">
          <div className="flex justify-center mb-4">
            <GoldenFiligreeDivider className="w-56" />
          </div>

          <span className="text-[11px] sm:text-xs uppercase tracking-[0.38em] text-[#E59A38] font-bold block">
            S.K. HEIGHTS, BHANGWA CHUNGI • 100% PURE VEGETARIAN
          </span>

          <h1 className="font-serif-editorial text-5xl sm:text-7xl md:text-[88px] leading-[0.96] text-white font-normal mt-3 drop-shadow-[0_6px_28px_rgba(0,0,0,0.75)]">
            A Royal Yet Modern <br />
            <span className="font-cursive text-[#F3C878] text-6xl sm:text-8xl">
              Dining Experience.
            </span>
          </h1>

          <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#E59A38] mt-5">
            
          </p>

          <p className="text-xs sm:text-sm text-white/75 max-w-xl mx-auto mt-3 leading-relaxed">
            Gather beneath warm backlit Mughal Jaali arches on plush terracotta velvet seating —
            where live Banarasi street craft, glowing clay-oven kebabs, and slow-simmered copper
            handis turn every family meal into a celebration.
          </p>

          <div className="flex justify-center mt-5">
            <GoldenFiligreeDivider className="w-56" />
          </div>
        </div>

        {/* 3 Minimalist Floating Experience Pillars at Bottom of Hero */}
        <div className="hero-floating-pillar relative z-10 max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 text-center translate-x-[0px] translate-y-[0px] scale-[1]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#E59A38] font-bold block">
              01 • AMBIENCE
            </span>
            <p className="font-serif-editorial text-xl text-white mt-0.5">
              Backlit Mughal Jaali Hall
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#E59A38] font-bold block">
              02 • CULINARY CRAFT
            </span>
            <p className="font-serif-editorial text-xl text-white mt-0.5">
              Live Chaat, Wok &amp; Clay Tandoor
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#E59A38] font-bold block">
              03 • HOSPITALITY
            </span>
            <p className="font-serif-editorial text-xl text-white mt-0.5">
              100% Pure Vegetarian Kitchen
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PART 2: UNDIVIDED SCROLL-REVEAL MENU STREAM
          Flows directly out of the Hero without any border!
      ==================================================================== */}
      <div id="undivided-menu-flow" className="relative pb-32">
        {/* Continuous Two-Tone S-Curve SVG Ribbon Winding Down the Entire Menu */}
        <svg
          viewBox="0 0 1440 3400"
          fill="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="none"
        >
          {/* Soft Crimson/Terracotta S-Wave Backdrop */}
          <path
            d="M 760,0 C 1220,380 340,820 960,1320 C 1380,1720 380,2180 940,2680 C 1320,3020 580,3250 880,3400 L 1440,3400 L 1440,0 Z"
            fill="#6E1D14"
            fillOpacity="0.24"
          />

          {/* Scroll-Drawn Solid Golden Thread Following the S-Curve */}
          <path
            ref={sCurvePathRef}
            d="M 760,0 C 1220,380 340,820 960,1320 C 1380,1720 380,2180 940,2680 C 1320,3020 580,3250 880,3400"
            stroke="#E59A38"
            strokeWidth="2.8"
            strokeOpacity="0.55"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-10">
          {/* Clean Typographic Menu Title (Matches Reference Image 4) */}
          <div className="text-left pt-6 pb-20 sm:pb-28 translate-x-[0px] translate-y-[0px] scale-[1]">
            <span className="font-cursive text-4xl sm:text-5xl text-[#E59A38] block">
              Indian Style
            </span>
            <h2 className="font-sans-ui text-[68px] sm:text-[110px] md:text-[132px] font-black tracking-tight leading-[0.88] text-[#FAF6F0] uppercase select-none">
              MENU
            </h2>
            <div className="w-16 h-[2px] bg-[#E58A1F] mx-auto mt-5" />
          </div>

          {/* ================================================================
              ALTERNATING SCROLL-REVEAL COURSE STATIONS
              (Frameless Cutouts + Curved Accent Pocket + Staggered Dish Rows)
          ================================================================ */}
          <div className="space-y-28 sm:space-y-36">
            {DINING_COURSES.map((course) => {
              const isImageRight = course.align === 'right';

              return (
                <div
                  key={course.id}
                  className="course-station grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14 translate-x-[0px] translate-y-[0px] scale-[1]"
                >
                  {/* ========================================================
                      FRAMELESS DISH CUTOUT COLUMN (Zero frames/borders!)
                      Ready for your background-free PNGs / WebPs
                  ======================================================== */}
                  <div
                    className={`lg:col-span-5 relative flex items-center justify-center ${
                      isImageRight ? 'lg:order-2' : 'lg:order-1'
                    } translate-x-[0px] translate-y-[0px] scale-[1]`}
                  >
                    {/* Subtle Curved Saffron Backdrop Pocket Behind the Cutout (Inspired by Image 3) */}
                    <div
                      className={`absolute w-[230px] h-[230px] sm:w-[280px] sm:h-[280px] bg-gradient-to-br from-[#E58A1F]/20 via-[#8C2D19]/15 to-transparent blur-md pointer-events-none ${
                        isImageRight ? 'rounded-l-full right-0' : 'rounded-r-full left-0'
                      }`}
                    />

                    {/* Pure Frameless Image (Only 3D Drop Shadow) */}
                    <img
                      src={course.image}
                      alt={course.title}
                      className="frameless-plate relative z-10 w-[250px] sm:w-[310px] md:w-[340px] h-auto object-contain drop-shadow-[0_32px_55px_rgba(0,0,0,0.75)] select-none"
                    />
                  </div>

                  {/* ========================================================
                      CLEAN SCROLL-REVEAL MENU LIST COLUMN
                  ======================================================== */}
                  <div
                    className={`lg:col-span-7 ${
                      isImageRight ? 'lg:order-1 lg:pr-6' : 'lg:order-2 lg:pl-6'
                    } translate-x-[0px] translate-y-[0px] scale-[1]`}
                  >
                    {/* Course Header Pill (Inspired by Reference Image 3 & 4) */}
                    <div className="course-header-block mb-7">
                      <div className="inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-[#E58A1F] text-[#14110F] shadow-lg">
                        <span className="font-serif-editorial text-xl font-bold opacity-75">
                          {course.number}
                        </span>
                        <span className="w-[1px] h-4 bg-[#14110F]/25" />
                        <h3 className="font-sans-ui text-base sm:text-lg font-extrabold uppercase tracking-[0.15em]">
                          {course.title}
                        </h3>
                      </div>

                      <p className="text-[11px] uppercase tracking-[0.26em] text-[#E59A38] font-semibold mt-2.5 pl-1">
                        {course.subtitle}
                      </p>
                    </div>

                    {/* Staggered Scroll-Reveal Dish List */}
                    <ul className="space-y-4">
                      {course.items.map((item, i) => (
                        <li
                          key={i}
                          className="dish-reveal-item group pb-3.5 border-b border-white/[0.08] last:border-none"
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <h4 className="font-serif-editorial text-2xl sm:text-[27px] font-semibold text-[#FAF6F0] group-hover:text-[#E59A38] transition-colors">
                              {item.name}
                            </h4>

                            {item.tag && (
                              <span className="text-[9px] uppercase tracking-[0.22em] px-2.5 py-0.5 rounded-full bg-[#E58A1F]/15 border border-[#E58A1F]/35 text-[#F3C878] font-bold shrink-0">
                                {item.tag}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-white/55 mt-0.5 leading-relaxed">
                            {item.detail}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Minimalist Bottom Location & Direct Table Line */}
          <div className="mt-28 text-center translate-x-[0px] translate-y-[0px] scale-[1]">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 px-8 py-3.5 rounded-full bg-[#E58A1F] text-[#14110F] font-sans-ui text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] shadow-xl">
              <span>S.K. HEIGHTS, BHANGWA CHUNGI</span>
              <span>•</span>
              <span>+91 9918100055 / 66</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}