'use client';
import React, { useEffect, useState, useMemo, useRef, Suspense } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  SarvaniGoldenBorder,
  OrnateMandalaWheel,
  HeroMehndiMandala,
  GoldenFiligreeDivider,
} from '@/components/SvgMasksAndMotifs';
import { fetchSiteData } from '@/lib/api';
import {
  Search,
  Check,
  Plus,
  Gift,
  Flame,
  ShieldCheck,
  Award,
  ShoppingBag,
  ArrowUpRight,
  X,
} from 'lucide-react';

interface SweetItem {
  id: number;
  category: string;
  name: string;
  image_url: string;
  pack_sizes: string;
  in_stock: number;
}

const BANDHAN_SWEETS_LIST: SweetItem[] = [
  // 1. KAJU & NUT ROYALES
  {
    id: 101,
    category: 'Kaju & Nut Royales',
    name: 'Royal Kesar Kaju Katli',
    image_url:
      'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '250g • 500g • 1Kg',
    in_stock: 1,
  },
  {
    id: 102,
    category: 'Kaju & Nut Royales',
    name: 'Iranian Pista Phool Roll',
    image_url:
      'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '250g • 500g • 1Kg',
    in_stock: 1,
  },
  {
    id: 103,
    category: 'Kaju & Nut Royales',
    name: 'Anjeer Badam Barfi',
    image_url:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '250g • 500g • 1Kg',
    in_stock: 1,
  },
  {
    id: 104,
    category: 'Kaju & Nut Royales',
    name: 'Kaju Gulkand Kalash',
    image_url:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '500g • 1Kg Box',
    in_stock: 1,
  },

  // 2. RAJASTHANI GHEVAR
  {
    id: 105,
    category: 'Rajasthani Ghevar',
    name: 'Rajasthani Malai Ghevar',
    image_url:
      'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=800&q=85',
    pack_sizes: 'Single • Twin Box',
    in_stock: 1,
  },
  {
    id: 106,
    category: 'Rajasthani Ghevar',
    name: 'Shahi Dryfruit Kesar Ghevar',
    image_url:
      'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=85',
    pack_sizes: 'Single • Gift Box',
    in_stock: 1,
  },
  {
    id: 107,
    category: 'Rajasthani Ghevar',
    name: 'Rose Petal & Pista Ghevar',
    image_url:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=85',
    pack_sizes: 'Single • Festive Box',
    in_stock: 1,
  },

  // 3. PURE GHEE LADDOOS
  {
    id: 108,
    category: 'Pure Ghee Laddoos',
    name: 'Shahi Motichoor Laddoo',
    image_url:
      'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '250g • 500g • 1Kg',
    in_stock: 1,
  },
  {
    id: 109,
    category: 'Pure Ghee Laddoos',
    name: 'Danedar Besan Laddoo',
    image_url:
      'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '250g • 500g • 1Kg',
    in_stock: 1,
  },
  {
    id: 110,
    category: 'Pure Ghee Laddoos',
    name: 'Jodhpuri Gond Mewa Laddoo',
    image_url:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '500g • 1Kg Box',
    in_stock: 1,
  },
  {
    id: 111,
    category: 'Pure Ghee Laddoos',
    name: 'Rose Gulkand Coconut Laddoo',
    image_url:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '250g • 500g • 1Kg',
    in_stock: 1,
  },

  // 4. BENGALI CHHENA CRAFT
  {
    id: 112,
    category: 'Bengali Chhena Craft',
    name: 'Kesar Malai Rasmalai',
    image_url:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '2 Pcs • 6 Pcs • 12 Pcs',
    in_stock: 1,
  },
  {
    id: 113,
    category: 'Bengali Chhena Craft',
    name: 'Shahi Malai Chamcham',
    image_url:
      'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '250g • 500g • 1Kg',
    in_stock: 1,
  },
  {
    id: 114,
    category: 'Bengali Chhena Craft',
    name: 'Kesar Dryfruit Rajbhog',
    image_url:
      'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '4 Pcs • 8 Pcs Pot',
    in_stock: 1,
  },

  // 5. KHOYA & PEDA HERITAGE
  {
    id: 115,
    category: 'Khoya & Peda Heritage',
    name: 'Mathura Lal Peda',
    image_url:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '250g • 500g • 1Kg',
    in_stock: 1,
  },
  {
    id: 116,
    category: 'Khoya & Peda Heritage',
    name: 'Alwar Danedar Milk Cake',
    image_url:
      'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '250g • 500g • 1Kg',
    in_stock: 1,
  },
  {
    id: 117,
    category: 'Khoya & Peda Heritage',
    name: 'Fresh Malai Kalakand',
    image_url:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '250g • 500g • 1Kg',
    in_stock: 1,
  },

  // 6. MEWA BITES & 56 BHOG
  {
    id: 118,
    category: 'Mewa Bites & 56 Bhog',
    name: 'Assorted Mewa & Choco Bites',
    image_url:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '500g • 1Kg Box',
    in_stock: 1,
  },
  {
    id: 119,
    category: 'Mewa Bites & 56 Bhog',
    name: 'Chhappan Bhog Peacock Trunk',
    image_url:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '56-Compartment Trunk',
    in_stock: 1,
  },
  {
    id: 120,
    category: 'Mewa Bites & 56 Bhog',
    name: 'Khushiyon Ka Bandhan Hamper',
    image_url:
      'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '800g • 1.2Kg • 2Kg',
    in_stock: 1,
  },

  // 7. HOT HALWA & CLASSICS
  {
    id: 121,
    category: 'Hot Halwa & Classics',
    name: 'Garma-Garam Khoya Gulab Jamun',
    image_url:
      'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '2 Pcs • 6 Pcs • 1Kg Tin',
    in_stock: 1,
  },
  {
    id: 122,
    category: 'Hot Halwa & Classics',
    name: 'Desi Ghee Moong Dal Halwa',
    image_url:
      'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '250g • 500g • 1Kg',
    in_stock: 1,
  },
  {
    id: 123,
    category: 'Hot Halwa & Classics',
    name: 'Crisp Kesar Jalebi & Rabri',
    image_url:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=85',
    pack_sizes: '250g • 500g • With Rabri',
    in_stock: 1,
  },
];

const SWEETS_CATEGORY_BAR = [
  {
    id: 'All',
    label: 'All Mithai',
    sub: '23 Varieties',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'Kaju & Nut Royales',
    label: 'Kaju & Dryfruit',
    sub: 'Katli & Rolls',
    image:
      'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'Rajasthani Ghevar',
    label: 'Malai Ghevar',
    sub: 'Rajasthani Pride',
    image:
      'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'Pure Ghee Laddoos',
    label: 'Desi Ghee Laddoo',
    sub: 'Motichoor & Besan',
    image:
      'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'Bengali Chhena Craft',
    label: 'Bengali Chhena',
    sub: 'Rasmalai & Chamcham',
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'Khoya & Peda Heritage',
    label: 'Khoya & Peda',
    sub: 'Milk Cake & Kalakand',
    image:
      'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'Mewa Bites & 56 Bhog',
    label: '56 Bhog & Bites',
    sub: 'Royal Gift Trunks',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'Hot Halwa & Classics',
    label: 'Hot Halwa & Jalebi',
    sub: 'Garma-Garam',
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80',
  },
];

function SweetsPageContent() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customBoxShortlist, setCustomBoxShortlist] = useState<number[]>([]);
  const [catalog, setCatalog] = useState<SweetItem[]>(BANDHAN_SWEETS_LIST);

  useEffect(() => {
    fetchSiteData().then((data) => {
      if (data.menu_items?.length) {
        const extraSweets: SweetItem[] = data.menu_items
          .filter(
            (dbItem) =>
              dbItem.section !== 'restaurant' &&
              !BANDHAN_SWEETS_LIST.some((c) => c.name === dbItem.name)
          )
          .map((dbItem) => ({
            id: dbItem.id + 500,
            category: dbItem.category || 'Kaju & Nut Royales',
            name: dbItem.name,
            image_url: dbItem.image_url,
            pack_sizes: dbItem.unit || '250g • 500g • 1Kg',
            in_stock: Number(dbItem.in_stock),
          }));

        if (extraSweets.length > 0) {
          setCatalog([...extraSweets, ...BANDHAN_SWEETS_LIST]);
        }
      }
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    const ctx = gsap.context(() => {
      gsap.to('.sweets-hero-mandala', {
        rotation: 110,
        ease: 'none',
        scrollTrigger: {
          trigger: '#sweets-hero-stage',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7,
        },
      });

      gsap.to('.sweets-bg-mandala', {
        rotation: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: '#sweets-catalog-stage',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, pageRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  const filteredItems = useMemo(() => {
    return catalog.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [catalog, selectedCategory, searchQuery]);

  const toggleBoxItem = (id: number) => {
    setCustomBoxShortlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedBoxObjects = useMemo(
    () => catalog.filter((i) => customBoxShortlist.includes(i.id)),
    [catalog, customBoxShortlist]
  );

  return (
    <div ref={pageRef} className="relative bg-[#F8F1E3] text-[#2B1B12] overflow-x-hidden">
      {/* Two Distinct Traditional SVG Clip-Path Frames */}
      <svg width="0" height="0" className="fixed pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          {/* FRAME A (Top Category Thumbnails): 12-Petal Suryamukhi Star-Seal */}
          <clipPath id="bandhan-star-seal" clipPathUnits="objectBoundingBox">
            <path d="M 0.50,0.01 C 0.55,0.08 0.61,0.08 0.67,0.03 C 0.69,0.10 0.75,0.13 0.82,0.10 C 0.81,0.18 0.85,0.23 0.93,0.23 C 0.89,0.30 0.91,0.36 0.99,0.39 C 0.92,0.45 0.92,0.51 0.99,0.57 C 0.91,0.60 0.89,0.66 0.93,0.73 C 0.85,0.73 0.81,0.78 0.82,0.86 C 0.75,0.83 0.69,0.86 0.67,0.93 C 0.61,0.88 0.55,0.88 0.50,0.99 C 0.45,0.88 0.39,0.88 0.33,0.93 C 0.31,0.86 0.25,0.83 0.18,0.86 C 0.19,0.78 0.15,0.73 0.07,0.73 C 0.11,0.66 0.09,0.60 0.01,0.57 C 0.08,0.51 0.08,0.45 0.01,0.39 C 0.09,0.36 0.11,0.30 0.07,0.23 C 0.15,0.23 0.19,0.18 0.18,0.10 C 0.25,0.13 0.31,0.10 0.33,0.03 C 0.39,0.08 0.45,0.08 0.50,0.01 Z" />
          </clipPath>

          {/* FRAME B (Sweet Item Cards): Cusped Rajasthani Jharokha Arch */}
          <clipPath id="bandhan-jharokha-card" clipPathUnits="objectBoundingBox">
            <path d="M 0.50,0.01 C 0.56,0.07 0.62,0.11 0.69,0.12 C 0.76,0.12 0.83,0.17 0.86,0.25 C 0.93,0.27 0.98,0.34 0.99,0.43 L 0.99,0.95 C 0.99,0.98 0.97,1.00 0.93,1.00 L 0.07,1.00 C 0.03,1.00 0.01,0.98 0.01,0.95 L 0.01,0.43 C 0.02,0.34 0.07,0.27 0.14,0.25 C 0.17,0.17 0.24,0.12 0.31,0.12 C 0.38,0.11 0.44,0.07 0.50,0.01 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ====================================================================
          SECTION 1: ROYAL SWEETS DARBAR HERO
      ==================================================================== */}
      <section
        id="sweets-hero-stage"
        className="relative bg-[#4A180D] text-[#FAF5EC] pt-28 pb-16 px-5 sm:px-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,132,44,0.24)_0%,transparent_70%)] pointer-events-none" />

        <div className="sweets-hero-mandala absolute -left-48 top-1/2 -translate-y-1/2 w-[440px] h-[440px] opacity-35 pointer-events-none">
          <HeroMehndiMandala className="w-full h-full" />
        </div>
        <div className="sweets-hero-mandala absolute -right-48 top-1/2 -translate-y-1/2 w-[440px] h-[440px] opacity-35 pointer-events-none">
          <HeroMehndiMandala className="w-full h-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center translate-x-[0px] translate-y-[0px] scale-[1]">
          <div className="flex justify-center mb-3">
            <GoldenFiligreeDivider className="w-52" />
          </div>

          <span className="text-[11px] uppercase tracking-[0.34em] text-[#F3C878] font-bold block">
            100% PURE DESI GHEE • CRAFTED FRESH EVERY MORNING
          </span>

          <h1 className="font-serif-editorial text-4xl sm:text-6xl md:text-[68px] leading-[1.04] text-white mt-2">
            The Royal <span className="font-cursive text-[#F3C878] text-5xl sm:text-7xl">Mithaas</span>{' '}
            Collection
          </h1>

          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto mt-3 leading-relaxed">
            Explore our handcrafted Kaju Royales, Rajasthani Malai Ghevar, pure cow ghee Laddoos,
            Bengali Chhena delicacies, and 56-Bhog wedding trunks.
          </p>

          {/* Search Input */}
          <div className="mt-7 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-[#F3C878] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Kaju Katli, Malai Ghevar, Laddoo..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[#2E0E07]/90 border border-[#C6923A]/45 text-xs text-white placeholder:text-white/45 focus:outline-none focus:border-[#F3C878] shadow-inner"
              />
            </div>
          </div>
        </div>
      </section>

      <SarvaniGoldenBorder />

      {/* ====================================================================
          SECTION 2: TOP CATEGORY SELECTOR (Frame A: Star-Seal Thumbnails)
      ==================================================================== */}
      <section className="relative pt-12 pb-4 px-4 sm:px-8 max-w-7xl mx-auto z-20 translate-x-[0px] translate-y-[0px] scale-[1]">
        <div className="text-center mb-7">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A1C1C] font-bold">
            SELECT A MITHAI CATEGORY
          </span>
        </div>

        <div className="flex items-start justify-start lg:justify-center gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar">
          {SWEETS_CATEGORY_BAR.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="group flex flex-col items-center text-center shrink-0 w-[108px] sm:w-[122px] focus:outline-none"
              >
                <div
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 p-1 rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#7A1C1C] to-[#C6923A] scale-110 shadow-[0_12px_28px_rgba(122,28,28,0.28)]'
                      : 'bg-[#E5D7C1] group-hover:bg-[#C6923A] group-hover:scale-105'
                  }`}
                  style={{ clipPath: 'url(#bandhan-star-seal)' }}
                >
                  <div
                    className="w-full h-full overflow-hidden bg-[#FFFDF9]"
                    style={{ clipPath: 'url(#bandhan-star-seal)' }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                <span
                  className={`mt-2.5 font-serif-editorial text-base sm:text-lg font-bold leading-tight transition-colors ${
                    isSelected ? 'text-[#7A1C1C]' : 'text-[#2B1B12] group-hover:text-[#7A1C1C]'
                  }`}
                >
                  {cat.label}
                </span>
                <span className="text-[10px] text-[#7D6B5D] leading-tight mt-0.5">{cat.sub}</span>

                <span
                  className={`h-[2px] rounded-full bg-[#7A1C1C] transition-all duration-300 mt-1.5 ${
                    isSelected ? 'w-10' : 'w-0 group-hover:w-6'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: MINIMALIST UNCLUTTERED SWEET CARDS
          (Only Jharokha Image + Sweet Name + Available Packs + Short "+ Box" Pill)
      ==================================================================== */}
      <section
        id="sweets-catalog-stage"
        className="relative py-10 md:py-14 px-5 sm:px-10 max-w-7xl mx-auto"
      >
        <div className="sweets-bg-mandala absolute -left-48 top-24 w-[420px] h-[420px] opacity-30 pointer-events-none z-0">
          <OrnateMandalaWheel className="w-full h-full" />
        </div>
        <div className="sweets-bg-mandala absolute -right-48 bottom-32 w-[420px] h-[420px] opacity-30 pointer-events-none z-0">
          <OrnateMandalaWheel className="w-full h-full" />
        </div>

        <div className="relative z-10 flex items-center justify-between border-b border-[#DFD2BC] pb-4 mb-10">
          <div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#7A1C1C]">
              {selectedCategory === 'All' ? 'All Artisanal Sweets & Mithai' : selectedCategory}
            </h2>
            <p className="text-xs text-[#7D6B5D] mt-0.5">
              Showing {filteredItems.length} handcrafted varieties • Prepared fresh at S.K. Heights
            </p>
          </div>

          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs uppercase tracking-widest font-bold text-[#7A1C1C] hover:underline"
            >
              View All Categories →
            </button>
          )}
        </div>

        {/* Clean Minimalist 4-Column Sweet Cards */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const isShortlisted = customBoxShortlist.includes(item.id);
            const inStock = item.in_stock === 1;

            return (
              <div
                key={item.id}
                className="group bg-[#FFFDF9] rounded-3xl p-5 border border-[#E6DAC6] shadow-[0_10px_30px_rgba(58,38,24,0.05)] hover:shadow-[0_18px_45px_rgba(122,28,28,0.12)] hover:border-[#C6923A] transition-all duration-500 flex flex-col justify-between translate-x-[0px] translate-y-[0px] scale-[1]"
              >
                {/* 1. Jharokha Arch Image Frame */}
                <div className="relative mx-auto w-full max-w-[225px] h-[230px] flex items-center justify-center">
                  <div
                    className="w-full h-full p-[3.5px] bg-gradient-to-b from-[#D49B4B] via-[#C6923A] to-[#7A1C1C] shadow-md transition-transform duration-500 group-hover:-translate-y-1"
                    style={{ clipPath: 'url(#bandhan-jharokha-card)' }}
                  >
                    <div
                      className="w-full h-full overflow-hidden bg-[#F4EDE2]"
                      style={{ clipPath: 'url(#bandhan-jharokha-card)' }}
                    >
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Sweet Name Only */}
                <div className="text-center mt-4 mb-3">
                  <h3 className="font-serif-editorial text-[22px] font-bold text-[#22150E] leading-snug">
                    {item.name}
                  </h3>
                </div>

                {/* 3. Available Packs + Short Compact "+ Box" Pill on One Clean Row */}
                <div className="pt-3 border-t border-[#EFE6D5] flex items-center justify-between gap-2">
                  <div className="text-left">
                    <span className="block text-[9px] uppercase tracking-widest text-[#8C7A6B] font-semibold">
                      Available Packs
                    </span>
                    <span className="text-[11px] font-bold text-[#2B1B12]">{item.pack_sizes}</span>
                  </div>

                  <button
                    disabled={!inStock}
                    onClick={() => toggleBoxItem(item.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-1 shrink-0 transition-all ${
                      !inStock
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : isShortlisted
                        ? 'bg-[#134632] text-white shadow-sm'
                        : 'bg-[#7A1C1C] hover:bg-[#5A1212] text-white shadow-sm'
                    }`}
                  >
                    {!inStock ? (
                      'Sold Out'
                    ) : isShortlisted ? (
                      <>
                        <Check className="w-3 h-3" /> Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3 text-[#F3C878]" /> Shortlist
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          SECTION 4: BUILD YOUR CUSTOM SHAGUN & FESTIVE GIFT BOX
      ==================================================================== */}
      <section className="relative bg-[#134632] text-[#FAF5EC] py-20 md:py-28 px-5 sm:px-10 overflow-hidden mt-8">
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[450px] h-[450px] opacity-20 pointer-events-none">
          <OrnateMandalaWheel className="w-full h-full" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 translate-x-[0px] translate-y-[0px] scale-[1]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#E5B869] font-bold">
              FOR RELATIONSHIPS WORTH GIFTING WELL
            </span>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl text-white mt-2">
              Curate Your <span className="font-cursive text-[#F3C878]">Shagun</span> Gift Trunk
            </h2>
            <p className="text-xs sm:text-sm text-white/75 mt-2 leading-relaxed">
              Planning wedding bhaji boxes, baby announcements, Raksha Bandhan hampers, or corporate
              Diwali gifting? Customize every compartment with your favourite Bandhan sweets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                step: 'STEP 01',
                title: 'Choose Your Royal Box Style',
                desc: 'Select from 4-Line Golden Assortment Boxes, Velvet Zardosi Hampers, or our monumental 56-Compartment Peacock Trunk.',
              },
              {
                step: 'STEP 02',
                title: 'Handpick Your Mithai & Dryfruits',
                desc: 'Mix Kesar Kaju Katli, Pista Phool Roll, Mewa Bites, Motichoor Laddoo, and roasted salted nuts in any proportion.',
              },
              {
                step: 'STEP 03',
                title: 'Add Custom Family or Brand Card',
                desc: 'We include personalized wedding invitation inserts, brass diyas, and ribbon wrapping for pan-city bulk dispatch.',
              },
            ].map((boxStep, idx) => (
              <div
                key={idx}
                className="bg-[#0D3324]/90 border border-[#E5B869]/35 rounded-3xl p-7 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#E5B869]/20 text-[#F3C878] text-[10px] font-bold tracking-widest">
                    {boxStep.step}
                  </span>
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white mt-4">
                    {boxStep.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 mt-2.5 leading-relaxed">
                    {boxStep.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#E5B869]">
                  <span>100% Pure Desi Ghee</span>
                  <Gift className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C6923A] hover:bg-[#d8a348] text-[#1E1410] text-xs font-bold uppercase tracking-[0.2em] shadow-xl transition-all"
            >
              <span>Enquire for Wedding &amp; Bulk Gifting</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5: THE HALWAI'S SACRED CRAFT & PURITY PROMISE
      ==================================================================== */}
      <section className="bg-[#FDF2D0] py-16 px-5 sm:px-10 border-t border-[#E6D29E]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            {
              icon: Flame,
              title: '100% Pure A2 Cow Ghee',
              desc: 'Zero vanaspati or artificial essence — only pure, aromatic desi ghee in every karahi.',
            },
            {
              icon: Award,
              title: 'Stone-Ground Dry Fruits',
              desc: 'Hand-graded Goan cashews, Iranian pistachios, and Mamra almonds ground fresh daily.',
            },
            {
              icon: ShieldCheck,
              title: 'Pure Silver Vark & Saffron',
              desc: 'Certified 100% vegetarian silver leaf and grade-A Pampore Kashmiri kesar.',
            },
            {
              icon: Gift,
              title: 'Hygienic Counter Packing',
              desc: 'Tamper-evident festive boxes and moisture-sealed trays for lasting freshness.',
            },
          ].map((p, idx) => (
            <div
              key={idx}
              className="bg-white/80 rounded-2xl p-6 border border-[#E5D3A1] shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-[#7A1C1C] text-[#F3C878] flex items-center justify-center mx-auto mb-3">
                <p.icon className="w-5 h-5" />
              </div>
              <h4 className="font-serif-editorial text-2xl font-bold text-[#2B1B12]">{p.title}</h4>
              <p className="text-xs text-[#6E5A47] mt-1.5 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Bottom Custom Box Shortlist Bar */}
      {selectedBoxObjects.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-3xl bg-[#22110B]/95 backdrop-blur-xl text-[#FAF5EC] border border-[#C6923A] rounded-2xl px-5 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C6923A] text-[#1E1410] flex items-center justify-center font-bold shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#F3C878] font-bold block">
                Your Custom Box Shortlist ({selectedBoxObjects.length} Sweets)
              </span>
              <p className="text-xs text-white/80 truncate max-w-xs sm:max-w-md">
                {selectedBoxObjects.map((i) => i.name).join(' • ')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              onClick={() => setCustomBoxShortlist([])}
              className="p-2 rounded-full border border-white/15 text-white/60 hover:text-white"
              title="Clear Shortlist"
            >
              <X className="w-4 h-4" />
            </button>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-[#C6923A] hover:bg-[#d8a348] text-[#1E1410] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <span>Enquire for Box</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#F8F1E3] text-[#2B1B12]">
      <Navbar />
      <Suspense fallback={<div className="pt-40 text-center">Loading Bandhan Sweets...</div>}>
        <SweetsPageContent />
      </Suspense>
      <Footer />
    </div>
  );
}