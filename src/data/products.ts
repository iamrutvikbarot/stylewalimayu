export interface Product {
  id: string;
  title: string;
  category: string; // 'ethnic' | 'western' | 'accessories' | 'home'
  price: number;
  originalPrice: number;
  store: 'Myntra' | 'Ajio' | 'Amazon' | 'Meesho' | 'Flipkart';
  imageUrl: string;
  affiliateUrl: string;
  isTrending?: boolean;
  stylingTip?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
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
  Product['store'],
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
 * Live Storefront Products (Currently Empty as requested)
 */
export const products: Product[] = [];

/**
 * Sample Curations for Instant Demo / Preview
 */
export const sampleCurations: Product[] = [
  {
    id: 'sample-001',
    title: 'Floral Printed Pure Cotton Anarkali Kurta with Dupatta Set',
    category: 'ethnic',
    price: 899,
    originalPrice: 2499,
    store: 'Myntra',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    affiliateUrl: 'https://myntra.com/kurta-sets/anarkali-floral-cotton?aff=stylewalimayu',
    isTrending: true,
    badge: 'Viral on Reels 🌸',
    rating: 4.8,
    reviewCount: 1420,
    stylingTip: 'Pair with silver oxidized jhumkas, a beige clutch, and kolhapuri flats for an effortless college or festive brunch look.',
  },
  {
    id: 'sample-002',
    title: 'Handcrafted Chikankari Georgette Kurti in Pastel Lilac with Slip',
    category: 'ethnic',
    price: 449,
    originalPrice: 1299,
    store: 'Meesho',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    affiliateUrl: 'https://meesho.com/chikankari-georgette-kurti-lilac?aff=stylewalimayu',
    isTrending: true,
    badge: 'Under ₹499 Steal 🔥',
    rating: 4.6,
    reviewCount: 890,
    stylingTip: 'Throw over white cotton palazzos with open hair and subtle dewy makeup. The lilac shade is pure aesthetic!',
  },
  {
    id: 'sample-003',
    title: 'Oversized Linen Blend Drop-Shoulder Resort Shirt in Sage Green',
    category: 'western',
    price: 599,
    originalPrice: 1499,
    store: 'Ajio',
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    affiliateUrl: 'https://ajio.com/women-oversized-sage-shirt?aff=stylewalimayu',
    isTrending: true,
    badge: 'Clean Girl Vibe ✨',
    rating: 4.7,
    reviewCount: 654,
    stylingTip: 'Wear it unbuttoned over a white ribbed crop tank or french-tucked into high-waist trousers with small chunky gold hoops.',
  },
  {
    id: 'sample-004',
    title: 'Korean Style Ribbed Knit Cropped Button-Front Cardigan',
    category: 'western',
    price: 499,
    originalPrice: 1199,
    store: 'Myntra',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    affiliateUrl: 'https://myntra.com/western-wear/korean-knit-cardigan?aff=stylewalimayu',
    isTrending: false,
    badge: 'Best Seller 💖',
    rating: 4.9,
    reviewCount: 1120,
    stylingTip: 'Pairs seamlessly with pleated tennis skirts or straight-leg light wash mom jeans. Soft, breathable knit for Indian weather.',
  },
  {
    id: 'sample-005',
    title: 'Padded Quilted Croissant Cloud Shoulder Bag with Detachable Strap',
    category: 'accessories',
    price: 649,
    originalPrice: 1799,
    store: 'Ajio',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    affiliateUrl: 'https://ajio.com/bags/croissant-cloud-shoulder-bag?aff=stylewalimayu',
    isTrending: true,
    badge: 'Luxury Dupe 🥐',
    rating: 4.9,
    reviewCount: 780,
    stylingTip: 'Looks like a ₹5,000 designer purse! Fits your phone, lip gloss, keys, and airpods without feeling bulky.',
  },
  {
    id: 'sample-006',
    title: 'Antique Brass Chandbali Jhumka Earrings with Faux Pearl Drops',
    category: 'accessories',
    price: 299,
    originalPrice: 899,
    store: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    affiliateUrl: 'https://amazon.in/dp/B09X87KLM9?tag=stylewalimayu-21',
    isTrending: false,
    badge: 'Wedding Guest Pick ✨',
    rating: 4.5,
    reviewCount: 2310,
    stylingTip: 'Lightweight on the ears, doesn’t turn green or tarnish easily. Instant royal touch to any plain solid kurti.',
  },
  {
    id: 'sample-007',
    title: 'Minimalist Ultra-Slim Rose Gold Stainless Steel Mesh Watch',
    category: 'accessories',
    price: 799,
    originalPrice: 2495,
    store: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    affiliateUrl: 'https://amazon.in/dp/B08V5L9PQZ?tag=stylewalimayu-21',
    isTrending: true,
    badge: 'Quiet Luxury ⌚',
    rating: 4.7,
    reviewCount: 3100,
    stylingTip: 'The magnetic mesh clasp makes it fit any wrist size. Stack it with thin gold chain bracelets for an everyday elevated office look.',
  },
  {
    id: 'sample-008',
    title: 'High-Rise Relaxed Wide-Leg Tailored Trousers in Oat Beige',
    category: 'western',
    price: 699,
    originalPrice: 1699,
    store: 'Flipkart',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    affiliateUrl: 'https://flipkart.com/women-trousers/wide-leg-oat-beige?aff=stylewalimayu',
    isTrending: false,
    badge: 'Work & Travel 🤍',
    rating: 4.4,
    reviewCount: 520,
    stylingTip: 'The pleated front creates an elongating silhouette. Pair with white sneakers and a tucked-in tee for weekend errands.',
  },
  {
    id: 'sample-009',
    title: 'Nordic Ribbed Donut Ceramic Flower Vase in Warm Matte Sand',
    category: 'home',
    price: 399,
    originalPrice: 999,
    store: 'Amazon',
    imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    affiliateUrl: 'https://amazon.in/dp/B09Z123ABC?tag=stylewalimayu-21',
    isTrending: true,
    badge: 'Instagram Decor 🏺',
    rating: 4.8,
    reviewCount: 1840,
    stylingTip: 'Pop in 2-3 dried pampas grass stems and place on your bedside table or work desk for that Pinterest aesthetic!',
  },
  {
    id: 'sample-010',
    title: 'Hand-Poured Soy Wax Scented Bubble Cube Candle Duo (Vanilla & Rose)',
    category: 'home',
    price: 249,
    originalPrice: 699,
    store: 'Meesho',
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    affiliateUrl: 'https://meesho.com/bubble-cube-candle-set?aff=stylewalimayu',
    isTrending: false,
    badge: 'Under ₹299 🕯️',
    rating: 4.6,
    reviewCount: 940,
    stylingTip: 'Smells heavenly even without burning. Perfect cozy addition to coffee trays, bookshelves, and vanity tables.',
  },
  {
    id: 'sample-011',
    title: 'Jaipuri Block Print 100% Breathable Mulmul Cotton Straight Kurti',
    category: 'ethnic',
    price: 499,
    originalPrice: 1399,
    store: 'Myntra',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    affiliateUrl: 'https://myntra.com/kurtis/jaipuri-block-print-mulmul?aff=stylewalimayu',
    isTrending: false,
    badge: 'Summer Essential ☀️',
    rating: 4.7,
    reviewCount: 1650,
    stylingTip: 'The softest fabric you will ever touch. Zero shrinkage after wash. Style with oxidized silver studs and beige Kolhapuris.',
  },
  {
    id: 'sample-012',
    title: '18K Gold Plated Thick Teardrop Chunky Water-Drop Hoop Earrings',
    category: 'accessories',
    price: 349,
    originalPrice: 899,
    store: 'Ajio',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    affiliateUrl: 'https://ajio.com/jewellery/teardrop-chunky-hoops?aff=stylewalimayu',
    isTrending: true,
    badge: 'Bottega Dupe 💫',
    rating: 4.9,
    reviewCount: 2200,
    stylingTip: 'Hollow inside so they are super feather-light on the ears! Instantly elevates even the most basic white t-shirt and jeans.',
  },
];
