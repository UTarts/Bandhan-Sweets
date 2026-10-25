'use client';
import React, { useState, useMemo } from 'react';
import { MenuItem } from '@/lib/api';
import { BandhanKolamLogo } from './SvgMasksAndMotifs';
import { X, Search, Sparkles, ShoppingBag, Check, PhoneCall } from 'lucide-react';

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  initialSection?: 'sweets' | 'restaurant' | 'gifting';
}

export default function FullMenuModal({
  isOpen,
  onClose,
  items,
  initialSection = 'sweets',
}: FullMenuModalProps) {
  const [activeSection, setActiveSection] = useState<'sweets' | 'restaurant' | 'gifting'>(initialSection);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [shortlist, setShortlist] = useState<number[]>([]);

  React.useEffect(() => {
    setActiveSection(initialSection);
    setSelectedCategory('All');
  }, [initialSection, isOpen]);

  const sectionItems = useMemo(() => {
    return items.filter((item) => item.section === activeSection);
  }, [items, activeSection]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(sectionItems.map((i) => i.category)));
    return ['All', ...unique];
  }, [sectionItems]);

  const filteredItems = useMemo(() => {
    return sectionItems.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.hindi_name && item.hindi_name.includes(searchQuery));
      return matchesCat && matchesSearch;
    });
  }, [sectionItems, selectedCategory, searchQuery]);

  const toggleShortlist = (id: number) => {
    setShortlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const shortlistedObjects = useMemo(() => {
    return items.filter((i) => shortlist.includes(i.id));
  }, [items, shortlist]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-[#0E0A0C]/90 backdrop-blur-xl flex flex-col overflow-hidden animate-fadeIn"
      data-lenis-prevent
    >
      {/* Top Modal Header */}
      <div className="border-b border-[#D9822B]/20 bg-[#FDF9F3] px-5 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BandhanKolamLogo className="w-10 h-10" />
          <div>
            <h2 className="font-serif-editorial text-2xl md:text-3xl font-semibold text-[#1E1418] leading-none">
              Bandhan Live Menu
            </h2>
            <p className="text-xs text-[#654E53] mt-0.5">
              100% Pure Vegetarian • Crafted in Pure Desi Ghee • Live Kitchen Stock
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1E1418]/20 text-sm font-medium text-[#1E1418] hover:bg-[#1E1418] hover:text-white transition-colors"
        >
          <span>Close</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Scrollable Body */}
      <div className="flex-1 overflow-y-auto bg-[#FDF9F3] px-5 md:px-10 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Primary Section Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D9822B]/20">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'sweets', label: 'Sweets & Mithai' },
                { id: 'restaurant', label: 'Restaurant & Dining' },
                { id: 'gifting', label: 'Shagun & Festive Gifting' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSection(tab.id as 'sweets' | 'restaurant' | 'gifting');
                    setSelectedCategory('All');
                  }}
                  className={`px-6 py-2.5 rounded-full font-serif-editorial text-lg md:text-xl transition-all ${
                    activeSection === tab.id
                      ? 'bg-[#B82925] text-white shadow-md'
                      : 'bg-[#F4EAD8] text-[#1E1418] hover:bg-[#D9822B]/20'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#654E53] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mithai, thali, chaat..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#D9822B]/30 text-sm text-[#1E1418] focus:outline-none focus:border-[#B82925]"
              />
            </div>
          </div>

          {/* Sub-Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1E1418] text-[#FDF9F3] font-semibold'
                    : 'bg-white border border-[#D9822B]/30 text-[#654E53] hover:border-[#1E1418]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 pb-24">
            {filteredItems.map((item) => {
              const isSelected = shortlist.includes(item.id);
              const inStock = Number(item.in_stock) === 1;

              return (
                <div
                  key={item.id}
                  className={`group bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                    inStock
                      ? 'border-[#D9822B]/25 hover:border-[#D9822B] hover:shadow-xl'
                      : 'border-gray-200 opacity-70'
                  }`}
                >
                  <div>
                    <div className="relative h-56 overflow-hidden bg-[#F4EAD8]">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {item.badge && (
                          <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-[#0E0A0C]/85 text-[#D9822B] backdrop-blur-md">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                            inStock
                              ? 'bg-[#2E5A36] text-white'
                              : 'bg-red-900/90 text-red-100'
                          }`}
                        >
                          {inStock ? '● In Stock' : 'Sold Out Today'}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-[#D9822B] font-semibold">
                          {item.category}
                        </span>
                        {item.hindi_name && (
                          <span className="text-xs text-[#654E53]">{item.hindi_name}</span>
                        )}
                      </div>

                      <h3 className="font-serif-editorial text-2xl font-semibold text-[#1E1418] mt-1">
                        {item.name}
                      </h3>

                      <p className="text-xs text-[#654E53] leading-relaxed mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-[#F4EAD8] flex items-center justify-between">
                    <div>
                      <span className="font-serif-editorial text-2xl font-bold text-[#1E1418]">
                        {item.price}
                      </span>
                      <span className="text-xs text-[#654E53] ml-1">/ {item.unit}</span>
                    </div>

                    <button
                      disabled={!inStock}
                      onClick={() => toggleShortlist(item.id)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all ${
                        !inStock
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : isSelected
                          ? 'bg-[#2E5A36] text-white'
                          : 'bg-[#F4EAD8] text-[#1E1418] hover:bg-[#D9822B] hover:text-white'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Shortlisted
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" /> Add to Shortlist
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Bottom Shortlist Bar */}
      {shortlistedObjects.length > 0 && (
        <div className="bg-[#0E0A0C] text-[#FDF9F3] px-6 py-4 border-t border-[#D9822B]/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#D9822B]" />
            <div>
              <span className="text-sm font-semibold">
                {shortlistedObjects.length} Item(s) in Your Bandhan Shortlist
              </span>
              <p className="text-xs text-white/60 truncate max-w-md">
                {shortlistedObjects.map((i) => i.name).join(', ')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                const contactEl = document.getElementById('contact-stage');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-full bg-[#D9822B] text-[#0E0A0C] font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 hover:bg-[#e5923d]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Enquire About These Items
            </button>
          </div>
        </div>
      )}
    </div>
  );
}