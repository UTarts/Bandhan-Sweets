'use client';
import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  GalleryItem,
  EnquiryItem,
  INITIAL_MENU_ITEMS,
  INITIAL_GALLERY_ITEMS,
} from '@/lib/api';
import { BandhanKolamLogo } from '@/components/SvgMasksAndMotifs';
import {
  Lock,
  Plus,
  Trash2,
  Edit3,
  Upload,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  UtensilsCrossed,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api/api.php';

export default function BandhanAdminPage() {
  const [pin, setPin] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'menu' | 'gallery' | 'enquiries'>('menu');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Menu Item Form State
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);

  // Gallery Form State
  const [newGallery, setNewGallery] = useState({
    title: '',
    category: 'Mithaas',
    image_url: '',
  });

  const loadAllAdminData = async (adminPin: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}?action=get_all`, { cache: 'no-store' });
      const data = await res.json();
      if (data.status === 'success') {
        setMenuItems(data.menu_items || []);
        setGalleryItems(data.gallery_items || []);
      }

      const enqRes = await fetch(`${API_BASE}?action=get_enquiries`, {
        headers: { 'X-Admin-Key': adminPin },
      });
      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData.enquiries || []);
      }
    } catch {
      // Fallback to localStorage if XAMPP Apache is stopped
      const savedMenu = localStorage.getItem('bandhan_menu_items');
      const savedGallery = localStorage.getItem('bandhan_gallery_items');
      const savedEnq = localStorage.getItem('bandhan_enquiries');
      setMenuItems(savedMenu ? JSON.parse(savedMenu) : INITIAL_MENU_ITEMS);
      setGalleryItems(savedGallery ? JSON.parse(savedGallery) : INITIAL_GALLERY_ITEMS);
      setEnquiries(savedEnq ? JSON.parse(savedEnq) : []);
    }
    setLoading(false);
  };

  useEffect(() => {
    const savedPin = sessionStorage.getItem('bandhan_admin_pin');
    if (savedPin) {
      setPin(savedPin);
      setAuthenticated(true);
      loadAllAdminData(savedPin);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE}?action=verify_admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      if (res.ok) {
        sessionStorage.setItem('bandhan_admin_pin', pin);
        setAuthenticated(true);
        loadAllAdminData(pin);
        return;
      } else {
        setAuthError('Invalid Admin PIN. Default PIN is: bandhan2026');
        return;
      }
    } catch {
      if (pin === 'bandhan2026') {
        sessionStorage.setItem('bandhan_admin_pin', pin);
        setAuthenticated(true);
        loadAllAdminData(pin);
      } else {
        setAuthError('Invalid Admin PIN. Default PIN is: bandhan2026');
      }
    }
  };

  // Toggle Live Stock (In Stock <-> Sold Out)
  const handleToggleStock = async (item: MenuItem) => {
    const newStock = Number(item.in_stock) === 1 ? 0 : 1;
    const updated = menuItems.map((m) => (m.id === item.id ? { ...m, in_stock: newStock } : m));
    setMenuItems(updated);
    localStorage.setItem('bandhan_menu_items', JSON.stringify(updated));

    try {
      await fetch(`${API_BASE}?action=toggle_stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': pin,
        },
        body: JSON.stringify({ id: item.id, in_stock: newStock }),
      });
    } catch {
      // Saved in localStorage fallback
    }
  };

  // Upload Image File to XAMPP / Hostinger PHP `uploads/` folder
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'menu' | 'gallery'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${API_BASE}?action=upload_image`, {
        method: 'POST',
        headers: { 'X-Admin-Key': pin },
        body: formData,
      });
      const data = await res.json();
      if (data.status === 'success' && data.url) {
        if (target === 'menu' && editingItem) {
          setEditingItem({ ...editingItem, image_url: data.url });
        } else if (target === 'gallery') {
          setNewGallery({ ...newGallery, image_url: data.url });
        }
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch {
      alert('Make sure XAMPP Apache is running to upload files to /bandhan-api/uploads/');
    }
    setUploading(false);
  };

  // Save or Create Menu Item
  const handleSaveMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.name || !editingItem?.price) return;

    try {
      const res = await fetch(`${API_BASE}?action=save_menu_item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': pin,
        },
        body: JSON.stringify(editingItem),
      });
      if (res.ok) {
        await loadAllAdminData(pin);
        setEditingItem(null);
        return;
      }
    } catch {
      // Fallback to localStorage
    }

    const id = editingItem.id || Date.now();
    const itemToSave = { ...editingItem, id } as MenuItem;
    const exists = menuItems.some((m) => m.id === id);
    const updated = exists
      ? menuItems.map((m) => (m.id === id ? itemToSave : m))
      : [itemToSave, ...menuItems];
    setMenuItems(updated);
    localStorage.setItem('bandhan_menu_items', JSON.stringify(updated));
    setEditingItem(null);
  };

  const handleDeleteMenuItem = async (id: number) => {
    if (!confirm('Delete this item from the Bandhan menu?')) return;
    const updated = menuItems.filter((m) => m.id !== id);
    setMenuItems(updated);
    localStorage.setItem('bandhan_menu_items', JSON.stringify(updated));

    try {
      await fetch(`${API_BASE}?action=delete_menu_item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': pin,
        },
        body: JSON.stringify({ id }),
      });
    } catch {}
  };

  // Save Gallery Photo
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.image_url) return;

    try {
      const res = await fetch(`${API_BASE}?action=save_gallery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': pin,
        },
        body: JSON.stringify(newGallery),
      });
      if (res.ok) {
        setNewGallery({ title: '', category: 'Mithaas', image_url: '' });
        await loadAllAdminData(pin);
        return;
      }
    } catch {}

    const updated = [{ id: Date.now(), ...newGallery }, ...galleryItems];
    setGalleryItems(updated);
    localStorage.setItem('bandhan_gallery_items', JSON.stringify(updated));
    setNewGallery({ title: '', category: 'Mithaas', image_url: '' });
  };

  const handleDeleteGallery = async (id: number) => {
    const updated = galleryItems.filter((g) => g.id !== id);
    setGalleryItems(updated);
    localStorage.setItem('bandhan_gallery_items', JSON.stringify(updated));

    try {
      await fetch(`${API_BASE}?action=delete_gallery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': pin,
        },
        body: JSON.stringify({ id }),
      });
    } catch {}
  };

  // ============================================================================
  // LOGIN GATE
  // ============================================================================
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0E0A0C] text-[#FDF9F3] flex items-center justify-center p-5">
        <div className="w-full max-w-md bg-[#161114] border border-[#D9822B]/30 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <BandhanKolamLogo className="w-14 h-14 mb-3" />
            <h1 className="font-serif-editorial text-3xl text-white">Bandhan Sweets Admin</h1>
            <p className="text-xs text-white/60 mt-1">
              Live Stock, Menu, Lotus Dish Dial &amp; Gallery Manager
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#D9822B] mb-2">
                Enter Admin PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Default: bandhan2026"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:outline-none focus:border-[#D9822B]"
              />
            </div>

            {authError && <p className="text-xs text-red-400">{authError}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#D9822B] hover:bg-[#c07122] text-black font-semibold text-xs uppercase tracking-widest transition-all"
            >
              Unlock Admin Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // MAIN ADMIN PORTAL
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#1E1418]">
      {/* Top Bar */}
      <header className="bg-[#0E0A0C] text-[#FDF9F3] px-6 py-4 border-b border-[#D9822B]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BandhanKolamLogo className="w-9 h-9" />
          <div>
            <h1 className="font-serif-editorial text-2xl leading-none">
              Bandhan Live Inventory &amp; Content Studio
            </h1>
            <span className="text-[11px] text-[#D9822B]">
              Connected to PHP / MySQL Backend ({API_BASE})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadAllAdminData(pin)}
            className="px-3.5 py-2 rounded-full border border-white/15 text-xs inline-flex items-center gap-1.5 hover:bg-white/10"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Sync DB
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-full bg-[#D9822B] text-black font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> View Live Site
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D9822B]/25">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-all ${
                activeTab === 'menu'
                  ? 'bg-[#1E1418] text-white shadow'
                  : 'bg-white border border-[#D9822B]/30 text-[#1E1418]'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              Menu &amp; Live Stock ({menuItems.length})
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-all ${
                activeTab === 'gallery'
                  ? 'bg-[#1E1418] text-white shadow'
                  : 'bg-white border border-[#D9822B]/30 text-[#1E1418]'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Gallery Photos ({galleryItems.length})
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-all ${
                activeTab === 'enquiries'
                  ? 'bg-[#1E1418] text-white shadow'
                  : 'bg-white border border-[#D9822B]/30 text-[#1E1418]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Customer Enquiries ({enquiries.length})
            </button>
          </div>

          {activeTab === 'menu' && (
            <button
              onClick={() =>
                setEditingItem({
                  section: 'sweets',
                  category: 'Kaju & Nut Royales',
                  name: '',
                  hindi_name: '',
                  description: '',
                  price: '₹500',
                  unit: '500g Box',
                  image_url: '',
                  in_stock: 1,
                  is_featured_dial: 1,
                  dial_left_text: 'Royal, Pure, Artisanal',
                  dial_right_text: 'A Bandhan Signature',
                  badge: 'Fresh Batch',
                })
              }
              className="px-5 py-2.5 rounded-full bg-[#B82925] text-white text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 shadow hover:bg-[#961F1C]"
            >
              <Plus className="w-4 h-4" /> Add New Sweet / Dish
            </button>
          )}
        </div>

        {/* ====================================================================
            TAB 1: MENU & LIVE STOCK MANAGER
        ==================================================================== */}
        {activeTab === 'menu' && (
          <div className="mt-6">
            {/* Add / Edit Modal Drawer */}
            {editingItem && (
              <div className="mb-8 bg-white border-2 border-[#D9822B] rounded-3xl p-6 shadow-xl">
                <h2 className="font-serif-editorial text-2xl font-semibold mb-4">
                  {editingItem.id ? `Edit: ${editingItem.name}` : 'Add New Bandhan Menu Item'}
                </h2>

                <form onSubmit={handleSaveMenuItem} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">Section</label>
                    <select
                      value={editingItem.section || 'sweets'}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          section: e.target.value as 'sweets' | 'restaurant' | 'gifting',
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    >
                      <option value="sweets">Sweets &amp; Mithai</option>
                      <option value="restaurant">Restaurant &amp; Dining</option>
                      <option value="gifting">Shagun &amp; Festive Gifting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">Category</label>
                    <input
                      type="text"
                      required
                      value={editingItem.category || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      placeholder="e.g. Kaju & Nut Royales, Royal Thalis"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Item Name (English)
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.name || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      placeholder="e.g. Kesar Kaju Katli"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Hindi Subtitle (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingItem.hindi_name || ''}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, hindi_name: e.target.value })
                      }
                      placeholder="e.g. केसर काजू कतली"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">Price</label>
                    <input
                      type="text"
                      required
                      value={editingItem.price || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                      placeholder="e.g. ₹640"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Portion / Weight Unit
                    </label>
                    <input
                      type="text"
                      value={editingItem.unit || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, unit: e.target.value })}
                      placeholder="e.g. 500g Box / Single Plate"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Image URL or Upload File to XAMPP/Hostinger
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={editingItem.image_url || ''}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, image_url: e.target.value })
                        }
                        placeholder="Paste image URL or click Upload ->"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                      />
                      <label className="px-4 py-2.5 rounded-xl bg-[#F4EAD8] border border-[#D9822B] text-xs font-semibold uppercase cursor-pointer inline-flex items-center gap-1.5 shrink-0">
                        <Upload className="w-4 h-4" />
                        {uploading ? 'Uploading...' : 'Upload File'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'menu')}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={editingItem.badge || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                      placeholder="e.g. Bestseller, Pure Desi Ghee"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-semibold uppercase mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.description || ''}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, description: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>

                  {/* Lotus Mandala Dish Dial Settings */}
                  <div className="md:col-span-3 bg-[#FAF5EE] p-4 rounded-2xl border border-[#D9822B]/30 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <label className="flex items-center gap-2.5 text-sm font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Number(editingItem.is_featured_dial) === 1}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            is_featured_dial: e.target.checked ? 1 : 0,
                          })
                        }
                        className="w-4 h-4 accent-[#B82925]"
                      />
                      <Sparkles className="w-4 h-4 text-[#D9822B]" />
                      Feature in Homepage Lotus Dish Dial
                    </label>

                    <div>
                      <label className="block text-[11px] uppercase text-[#654E53] mb-1">
                        Left Poetic Text (3 comma words)
                      </label>
                      <input
                        type="text"
                        value={editingItem.dial_left_text || ''}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, dial_left_text: e.target.value })
                        }
                        placeholder="Crispy, Comforting, Classic"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase text-[#654E53] mb-1">
                        Right Callout Text
                      </label>
                      <input
                        type="text"
                        value={editingItem.dial_right_text || ''}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, dial_right_text: e.target.value })
                        }
                        placeholder="A Bandhan Favourite"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3 flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-semibold uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#1E1418] text-white text-xs font-semibold uppercase tracking-wider"
                    >
                      Save Item to Database
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Menu Items Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {menuItems.map((item) => {
                const inStock = Number(item.in_stock) === 1;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-[#D9822B]/25 overflow-hidden shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 bg-[#F4EAD8]">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-black/80 text-[#D9822B]">
                          {item.section} • {item.category}
                        </span>
                        {Number(item.is_featured_dial) === 1 && (
                          <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] bg-[#D9822B] text-black font-semibold">
                            ★ On Lotus Dial
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-serif-editorial text-2xl font-semibold">
                            {item.name}
                          </h3>
                          <span className="font-bold text-sm text-[#B82925]">
                            {item.price} / {item.unit}
                          </span>
                        </div>
                        <p className="text-xs text-[#654E53] mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-[#FAF5EE] border-t border-[#D9822B]/15 flex items-center justify-between gap-2">
                      {/* 1-Click Live Stock Toggle */}
                      <button
                        onClick={() => handleToggleStock(item)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                          inStock
                            ? 'bg-[#2E5A36] text-white'
                            : 'bg-red-800 text-white'
                        }`}
                      >
                        {inStock ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Sold Out
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-2 rounded-full bg-white border border-gray-200 hover:border-[#D9822B]"
                          title="Edit Item"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMenuItem(item.id)}
                          className="p-2 rounded-full bg-white border border-gray-200 text-red-700 hover:bg-red-50"
                          title="Delete Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 2: GALLERY MANAGER
        ==================================================================== */}
        {activeTab === 'gallery' && (
          <div className="mt-6 space-y-8">
            <form
              onSubmit={handleAddGallery}
              className="bg-white p-6 rounded-3xl border border-[#D9822B]/30 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            >
              <div>
                <label className="block text-xs font-semibold uppercase mb-1">Photo Title</label>
                <input
                  type="text"
                  required
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                  placeholder="e.g. Festive Gifting Trunk"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase mb-1">Category Tag</label>
                <input
                  type="text"
                  value={newGallery.category}
                  onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                  placeholder="Mithaas / Restaurant / Gifting"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase mb-1">
                  Image URL or Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={newGallery.image_url}
                    onChange={(e) => setNewGallery({ ...newGallery, image_url: e.target.value })}
                    placeholder="Image URL"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                  <label className="px-3 py-2.5 rounded-xl bg-[#F4EAD8] border border-[#D9822B] text-xs font-semibold cursor-pointer inline-flex items-center">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'gallery')}
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl bg-[#B82925] text-white text-xs font-semibold uppercase tracking-wider"
              >
                + Add to Gallery
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {galleryItems.map((g) => (
                <div
                  key={g.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm group relative"
                >
                  <img src={g.image_url} alt={g.title} className="w-full h-56 object-cover" />
                  <div className="p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#D9822B] font-bold">
                        {g.category}
                      </span>
                      <h4 className="font-serif-editorial text-lg">{g.title}</h4>
                    </div>
                    <button
                      onClick={() => handleDeleteGallery(g.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 3: CUSTOMER ENQUIRIES
        ==================================================================== */}
        {activeTab === 'enquiries' && (
          <div className="mt-6 space-y-4">
            {enquiries.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center text-sm text-[#654E53]">
                No customer enquiries received yet. Test the dark contact form at the bottom of the
                homepage!
              </div>
            ) : (
              enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white rounded-2xl p-5 border border-[#D9822B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-serif-editorial text-2xl font-semibold">
                        {enq.name}
                      </span>
                      <span className="text-xs px-3 py-0.5 rounded-full bg-[#F4EAD8] font-medium">
                        {enq.phone}
                      </span>
                      {enq.email && <span className="text-xs text-[#654E53]">{enq.email}</span>}
                    </div>
                    <p className="text-sm text-[#1E1418] mt-2">{enq.message}</p>
                  </div>
                  <span className="text-xs text-[#654E53] shrink-0">{enq.created_at}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}