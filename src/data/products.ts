export interface Product {
  id: string;
  code: string; // e.g. "#01", "#02"
  title: string;
  company?: string;
  category: string; // 'ethnic' | 'western' | 'accessories' | 'home'
  price: number;
  originalPrice: number;
  store: 'Myntra' | 'Ajio' | 'Amazon' | 'Meesho' | 'Flipkart' | string;
  imageUrl: string;
  affiliateUrl: string;
  images?: string[];
  videoUrl?: string;
  videoUrls?: string[];
  isTrending?: boolean;
  badge?: string;
  stylingTip?: string;
  rating?: number;
  reviewCount?: number;
}

export interface CategoryOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

export const CATEGORIES: CategoryOption[] = [
  { id: 'all', label: '🔥 All Deals', description: 'Curated trending finds under ₹999' },
  { id: 'ethnic', label: '👗 Ethnic & Kurtas', description: 'Anarkalis, kurtis & festive coords' },
  { id: 'western', label: '✨ Western & Tops', description: 'Oversized shirts, knits & chic trousers' },
  { id: 'accessories', label: '👜 Bags & Accessories', description: 'Totes, watches & viral jewelry' },
  { id: 'home', label: '🏠 Aesthetic Home', description: 'Cozy ceramic decor & scented candles' },
  { id: 'under499', label: '⚡ Under ₹499', description: 'Budget steal deals under ₹499' },
];

export const STORE_CONFIG: Record<
  string,
  {
    name: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
    hex: string;
    tagLabel: string;
  }
> = {
  Myntra: {
    name: 'Myntra',
    bgClass: 'bg-[#FF3F6C]/10 text-[#FF3F6C]',
    textClass: 'text-[#FF3F6C]',
    borderClass: 'border-[#FF3F6C]/20',
    hex: '#FF3F6C',
    tagLabel: 'MYNTRA',
  },
  Ajio: {
    name: 'Ajio',
    bgClass: 'bg-[#1E293B]/10 text-[#1E293B]',
    textClass: 'text-[#1E293B]',
    borderClass: 'border-[#1E293B]/20',
    hex: '#1E293B',
    tagLabel: 'AJIO',
  },
  Amazon: {
    name: 'Amazon',
    bgClass: 'bg-[#D97706]/15 text-[#B45309]',
    textClass: 'text-[#B45309]',
    borderClass: 'border-[#D97706]/30',
    hex: '#D97706',
    tagLabel: 'AMAZON',
  },
  Meesho: {
    name: 'Meesho',
    bgClass: 'bg-[#E11D48]/10 text-[#BE123C]',
    textClass: 'text-[#BE123C]',
    borderClass: 'border-[#E11D48]/20',
    hex: '#E11D48',
    tagLabel: 'MEESHO',
  },
  Flipkart: {
    name: 'Flipkart',
    bgClass: 'bg-[#2563EB]/10 text-[#1D4ED8]',
    textClass: 'text-[#1D4ED8]',
    borderClass: 'border-[#2563EB]/20',
    hex: '#2563EB',
    tagLabel: 'FLIPKART',
  },
};

/**
 * All product data is fetched dynamically from Google Sheets.
 * Initial state is empty array.
 */
export const products: Product[] = [];
