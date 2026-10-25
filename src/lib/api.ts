export interface MenuItem {
    id: number;
    section: 'sweets' | 'restaurant' | 'gifting';
    category: string;
    name: string;
    hindi_name?: string;
    description: string;
    price: string;
    unit: string;
    image_url: string;
    in_stock: number;
    is_featured_dial: number;
    dial_left_text: string;
    dial_right_text: string;
    badge?: string;
  }
  
  export interface GalleryItem {
    id: number;
    title: string;
    category: string;
    image_url: string;
  }
  
  export interface EnquiryItem {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    created_at: string;
  }
  
  export const INITIAL_MENU_ITEMS: MenuItem[] = [
    {
      id: 1,
      section: 'sweets',
      category: 'Rajasthani Heritage',
      name: 'Rajasthani Malai Ghevar',
      hindi_name: 'राजस्थानी मलाई घेवर',
      description:
        'Honeycomb disc fried in pure desi ghee, soaked in saffron syrup, topped with thick rabri, rose petals & slivered pistachios.',
      price: '₹580',
      unit: '1 Piece (Large)',
      image_url:
        'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=1000&q=85',
      in_stock: 1,
      is_featured_dial: 1,
      dial_left_text: 'Honeycomb, Rabri-Topped, Festive',
      dial_right_text: 'Fusion of Tradition & Taste',
      badge: 'Seasonal Crown',
    },
    {
      id: 2,
      section: 'sweets',
      category: 'Premium Kaju & Dryfruit',
      name: 'Royal Kesar Kaju Katli',
      hindi_name: 'केसर काजू कतली',
      description:
        'Silky stone-ground Goan cashew diamonds infused with pure saffron and finished with pure silver vark.',
      price: '₹640',
      unit: '500g Box',
      image_url:
        'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=1000&q=85',
      in_stock: 1,
      is_featured_dial: 1,
      dial_left_text: 'Silky, Stone-Ground, Pure Kaju',
      dial_right_text: 'Khushiyon Ka Bandhan',
      badge: 'Bestseller',
    },
    {
      id: 3,
      section: 'sweets',
      category: 'Dryfruit Bite Collection',
      name: 'Assorted Mewa, Choco & Orange Bites',
      hindi_name: 'मेवा बाइट्स कलेक्शन',
      description:
        'Handcrafted cube bites packed with roasted almonds, pistachios, cashews, Belgian cocoa and tangy orange zest.',
      price: '₹780',
      unit: '500g Gift Box',
      image_url:
        'https://images.unsplash.com/photo-1605197161470-5d2a9af0ac7e?auto=format&fit=crop&w=1000&q=85',
      in_stock: 1,
      is_featured_dial: 1,
      dial_left_text: 'Crunchy, Nut-Loaded, Modern',
      dial_right_text: 'For Relationships Worth Gifting',
      badge: 'Signature Box',
    },
    {
      id: 4,
      section: 'sweets',
      category: 'Bengali Chhena Craft',
      name: 'Kesar Pista Rasmalai & Chamcham',
      hindi_name: 'केसर रसमलाई और चमचम',
      description:
        'Feather-light cottage cheese delicacies steeped in chilled cardamom-saffron milk and garnished with Iranian pista.',
      price: '₹360',
      unit: '6 Pieces',
      image_url:
        'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1000&q=85',
      in_stock: 1,
      is_featured_dial: 1,
      dial_left_text: 'Soft, Chilled, Saffron Milk',
      dial_right_text: 'Kaunsi Pack Karwa Doon?',
      badge: 'Fresh Daily',
    },
    {
      id: 5,
      section: 'gifting',
      category: 'Grand Festive Hampers',
      name: 'Chhappan Bhog (56 Bhog) Peacock Trunk',
      hindi_name: 'छप्पन भोग शाही बॉक्स',
      description:
        'Our monumental 56-compartment royal peacock & lotus gift trunk featuring 56 distinct artisanal sweets, dry fruits & namkeen.',
      price: '₹2,850',
      unit: '56-Compartment Trunk',
      image_url:
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=85',
      in_stock: 1,
      is_featured_dial: 1,
      dial_left_text: '56 Delicacies, Peacock Art, Regal',
      dial_right_text: 'The Ultimate Festive Offering',
      badge: '56 Bhog Special',
    },
    {
      id: 6,
      section: 'restaurant',
      category: 'Indo-Chinese Wok',
      name: 'Crispy Veg Manchurian',
      hindi_name: 'वेज मंचूरियन',
      description:
        'Crispy golden garden-vegetable dumplings tossed in smoky garlic, spring onion, and tangy Indo-Chinese wok glaze.',
      price: '₹220',
      unit: 'Full Plate',
      image_url:
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85',
      in_stock: 1,
      is_featured_dial: 1,
      dial_left_text: 'Crispy, Tangy, Wok-Tossed',
      dial_right_text: 'Made With Love, Just Like Mom',
      badge: 'Crowd Favourite',
    },
    {
      id: 7,
      section: 'restaurant',
      category: 'Royal Dining & Thalis',
      name: 'Bandhan Royal Jaali Special Thali',
      hindi_name: 'बंधन शाही थाली',
      description:
        'Paneer Lababdar, Dal Makhani, Seasonal Veg, Veg Pulao, Raita, Salad, Papad, Butter Naan, Lachha Paratha & Warm Gulab Jamun.',
      price: '₹390',
      unit: 'Complete Royal Meal',
      image_url:
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=85',
      in_stock: 1,
      is_featured_dial: 1,
      dial_left_text: 'Royal, Modern, Wholesome',
      dial_right_text: 'Fine Dining at S.K. Heights',
      badge: '100% Pure Veg',
    },
    {
      id: 8,
      section: 'gifting',
      category: 'Rakhi & Diwali Boxes',
      name: 'Khushiyon Ka Bandhan Lotus Hamper',
      hindi_name: 'खुशियों का बंधन हैम्पर',
      description:
        'Magenta & gold lotus-printed gift box filled with Kaju Roll, Pista Barfi, Mewa Laddoo, and roasted dryfruit jars.',
      price: '₹1,250',
      unit: '1 Kg Assorted Box',
      image_url:
        'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=85',
      in_stock: 1,
      is_featured_dial: 0,
      dial_left_text: 'Thoughtful, Handpicked, Pure',
      dial_right_text: 'Unbox Happiness',
      badge: 'Gift Bestseller',
    },
  ];
  
  export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
    {
      id: 1,
      title: 'Chhappan Bhog 56-Compartment Peacock Box',
      category: 'Shagun Gifting',
      image_url:
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=85',
    },
    {
      id: 2,
      title: 'Rajasthani Malai & Kesar Ghevar',
      category: 'Royal Mithai',
      image_url:
        'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=1000&q=85',
    },
    {
      id: 3,
      title: 'Royal Backlit Jaali Family Dining Hall',
      category: 'Bandhan Restaurant',
      image_url:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85',
    },
    {
      id: 4,
      title: 'Assorted Mewa Bites & Kaju Royales',
      category: 'Dryfruit Craft',
      image_url:
        'https://images.unsplash.com/photo-1605197161470-5d2a9af0ac7e?auto=format&fit=crop&w=1000&q=85',
    },
  ];
  
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api/api.php';
  
  export async function fetchSiteData(): Promise<{
    menu_items: MenuItem[];
    gallery_items: GalleryItem[];
  }> {
    try {
      const res = await fetch(`${API_BASE}?action=get_all`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && data.menu_items?.length > 0) {
          return {
            menu_items: data.menu_items,
            gallery_items: data.gallery_items,
          };
        }
      }
    } catch {}
  
    if (typeof window !== 'undefined') {
      const savedMenu = localStorage.getItem('bandhan_menu_items_v2');
      const savedGallery = localStorage.getItem('bandhan_gallery_items_v2');
      return {
        menu_items: savedMenu ? JSON.parse(savedMenu) : INITIAL_MENU_ITEMS,
        gallery_items: savedGallery ? JSON.parse(savedGallery) : INITIAL_GALLERY_ITEMS,
      };
    }
  
    return { menu_items: INITIAL_MENU_ITEMS, gallery_items: INITIAL_GALLERY_ITEMS };
  }
  
  export async function submitCustomerEnquiry(payload: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}?action=submit_enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return true;
    } catch {}
  
    if (typeof window !== 'undefined') {
      const existing: EnquiryItem[] = JSON.parse(localStorage.getItem('bandhan_enquiries') || '[]');
      existing.unshift({
        id: Date.now(),
        ...payload,
        created_at: new Date().toLocaleString(),
      });
      localStorage.setItem('bandhan_enquiries', JSON.stringify(existing));
    }
    return true;
  }