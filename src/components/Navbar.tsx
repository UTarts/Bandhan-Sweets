'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { fetchSiteData, INITIAL_MENU_ITEMS, MenuItem } from '@/lib/api';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Pop-Open Search State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    fetchSiteData().then((data) => {
      if (data.menu_items?.length) setMenuItems(data.menu_items);
    });
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Sweets', href: '/menu' },
    { label: 'Restaurant Dining', href: '/restaurant' }, 
    { label: 'Our Story', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href.split('?')[0]);
  };

  const filteredSearchItems = searchQuery.trim()
    ? menuItems
        .filter(
          (i) =>
            i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (i.hindi_name && i.hindi_name.includes(searchQuery))
        )
        .slice(0, 5)
    : [];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF6F0]/90 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.08)] border-b border-black/5 py-[8px]'
            : 'bg-[#FAF6F0]/85 backdrop-blur-md border-b border-white/20 py-[10px]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 flex items-center justify-between">
          {/* ==============================================================
              1. LEFT: BANDHAN LOGO ONLY (Nudge controls below)
          ============================================================== */}
          <Link
            href="/"
            className="shrink-0 flex items-center translate-x-[0px] translate-y-[0px] scale-[1] transition-transform duration-300 hover:scale-[1.03]"
          >
            <img
              src="/bandhanlogo.png"
              alt="Bandhan Sweets & Restaurant"
              className="h-[42px] sm:h-[46px] w-auto object-contain"
            />
          </Link>

          {/* ==============================================================
              2. CENTER: NAV LINKS + DIVIDER + FRAMELESS CAKETOWN LOGO
          ============================================================== */}
          <div className="hidden lg:flex items-center gap-[28px] translate-x-[0px] translate-y-[0px] scale-[1]">
            <nav className="flex items-center gap-[26px]">
              {navLinks.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-[13px] font-semibold tracking-[0.02em] transition-colors ${
                      active
                        ? 'text-[#D97706]'
                        : 'text-[#2B1B12]/85 hover:text-[#D97706]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Thin Vertical Divider Line (Matches Caketown Screenshot) */}
            <span className="h-[24px] w-[1px] bg-[#2B1B12]/15" />

            {/* Frameless Caketown Cafe Logo */}
            <a
              href="https://caketown-cafe-official-website.pages.dev/"
              target="_blank"
              rel="noreferrer"
              title="Visit Sister Brand: Caketown Cafe"
              className="shrink-0 flex items-center translate-x-[0px] translate-y-[0px] scale-[1] opacity-90 hover:opacity-100 transition-transform duration-300 hover:scale-[1.05]"
            >
              <img
                src="/caketown.webp"
                onError={(e) => {
                  e.currentTarget.src = '/caketown.webp';
                }}
                alt="Caketown Cafe"
                className="h-[26px] w-auto object-contain"
              />
            </a>
          </div>

          {/* ==============================================================
              3. RIGHT: POP-OPEN SEARCH ICON + SLEEK "LIVE MENU" PILL
          ============================================================== */}
          <div className="hidden md:flex items-center gap-[14px] translate-x-[0px] translate-y-[0px] scale-[1]">
            {/* Expandable Inline Search Bar */}
            <div className="relative flex items-center">
              <div
                className={`flex items-center overflow-hidden transition-all duration-300 rounded-full ${
                  searchOpen
                    ? 'w-[240px] sm:w-[270px] bg-white/90 border border-[#2B1B12]/15 px-3.5 py-1.5 shadow-sm'
                    : 'w-9 h-9 justify-center hover:bg-black/5'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="text-[#2B1B12] hover:text-[#D97706] transition-colors shrink-0"
                  aria-label="Toggle Search"
                >
                  <Search className="w-[17px] h-[17px]" />
                </button>

                {searchOpen && (
                  <>
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setSearchOpen(false);
                          router.push('/menu');
                        }
                      }}
                      placeholder="Search Kaju Katli, Thali..."
                      className="w-full bg-transparent text-xs text-[#2B1B12] placeholder:text-[#2B1B12]/45 pl-2.5 pr-1 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="text-[#2B1B12]/50 hover:text-[#2B1B12]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>

              {/* Instant Live Search Results Dropdown */}
              {searchOpen && searchQuery.trim().length > 0 && (
                <div className="absolute right-0 top-12 w-[310px] bg-white/95 backdrop-blur-xl border border-[#E5DEC9] rounded-2xl shadow-2xl p-2 z-50">
                  {filteredSearchItems.length === 0 ? (
                    <p className="text-xs text-[#7D6B5D] p-3 text-center">
                      No matching dish found. Try &ldquo;Kaju&rdquo; or &ldquo;Thali&rdquo;.
                    </p>
                  ) : (
                    filteredSearchItems.map((item) => (
                      <Link
                        key={item.id}
                        href={`/menu?tab=${item.section}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF5EC] transition-colors"
                      >
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#E5DEC9]"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#22150E] truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-[#7D6B5D] block">
                            {item.price} / {item.unit}
                          </span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Sleek Pill Button (Matches "START ORDER" in Caketown Screenshot) */}
            <Link
              href="/menu"
              className="px-5 py-[9px] rounded-full bg-[#161413] hover:bg-[#7A1C1C] text-white text-[11px] uppercase tracking-[0.14em] font-bold transition-all shadow-sm"
            >
              LIVE MENU
            </Link>
          </div>

          {/* ==============================================================
              MOBILE CONTROLS
          ============================================================== */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="https://caketowncafe.com"
              target="_blank"
              rel="noreferrer"
              className="shrink-0"
            >
              <img
                src="/caketown.webp"
                onError={(e) => {
                  e.currentTarget.src = '/caketown.webp';
                }}
                alt="Caketown Cafe"
                className="h-[24px] w-auto object-contain"
              />
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg text-[#2B1B12]"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-xl text-[#2B1B12] pt-20 pb-10 px-6 flex flex-col justify-between lg:hidden">
          <div className="space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 border-b border-[#2B1B12]/10 font-serif-editorial text-2xl font-semibold text-[#2B1B12] hover:text-[#D97706]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[#2B1B12]/10">
            <a
              href="https://caketowncafe.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <img
                src="/caketown.webp"
                onError={(e) => {
                  e.currentTarget.src = '/caketown.webp';
                }}
                alt="Caketown Cafe"
                className="h-8 w-auto object-contain"
              />
            </a>

            <Link
              href="/menu"
              onClick={() => setMobileOpen(false)}
              className="px-6 py-2.5 rounded-full bg-[#161413] text-white text-xs uppercase tracking-widest font-bold"
            >
              LIVE MENU
            </Link>
          </div>
        </div>
      )}
    </>
  );
}