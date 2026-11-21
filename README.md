# Style Wali Mayu (@stylewalimayu) — Affiliate Storefront

A mobile-first, ultra-fast, modern affiliate storefront built for Indian fashion & lifestyle creator **"Style Wali Mayu"** ([@stylewalimayu](https://instagram.com/stylewalimayu)).

Designed as a blend between high-end creator storefronts (Wishlink, LTK) and a clean boutique e-commerce app.

---

## ✨ Features & Architecture

### 1. Brand Aesthetics & Theme
- **Warm Minimalist Palette**:
  - Cream/off-white background (`#FAFAF8`)
  - Soft terracotta & warm amber accents (`#E07A5F`, `#D97706`, `#C85A3F`)
  - Charcoal typography (`#1F2937`) and subtle borders (`#EAE8E3`)
- **Typography**: Clean, contemporary sans-serif using **Plus Jakarta Sans** with fluid scaling.
- **Mobile-First Layout**:
  - **Mobile**: Sleek 2-column product grid with quick tap targets.
  - **Tablet & Desktop**: Responsive 3 and 4-column boutique grid (`max-w-5xl mx-auto`).

### 2. Key Components
1. **Creator Header Profile**:
   - Circular avatar with a terracotta-rose gradient ring and verified badge.
   - Creator name, handle (`@stylewalimayu`), and bio: *"Curating budget fashion, styling hacks & aesthetic finds under ₹999 ✨"*.
   - Proof tags (`120k+ Besties`, `100% Tested Quality`, `Daily Price Drops`).
   - Direct social channels: Instagram, YouTube, and WhatsApp Channel.
   - Integrated Saved Deals wishlist button and Storefront link sharing.

2. **Quick CTA Banner**:
   - Dismissible announcement card: *"🔔 Join our WhatsApp Deals Group for instant price drops & coupons"* with a `"Join Free"` button.
   - Saves dismissed state to `sessionStorage` for seamless browsing.

3. **Sticky Search & Category Filters**:
   - Real-time client-side search across titles, categories, and stores with instant results.
   - Horizontally scrollable category pills:
     - 🔥 **All Deals**
     - 👗 **Ethnic & Kurtas**
     - ✨ **Western & Tops**
     - 👜 **Bags & Accessories**
     - 🏠 **Aesthetic Home**
     - ⚡ **Under ₹499**
   - Store filter dropdown (**Myntra, Ajio, Amazon, Meesho, Flipkart**).
   - Dynamic sorting: *Trending Deals, Price: Low to High, Price: High to Low, Biggest Discount %*.

4. **Product Card Component**:
   - High-aspect 4:5 ratio image container with hover zoom and loading skeleton.
   - Color-coded store badges:
     - **Myntra** (Vibrant Pink `#FF3F6C`)
     - **Ajio** (Dark Navy `#1E293B`)
     - **Amazon** (Warm Amber `#D97706`)
     - **Meesho** (Magenta `#BE123C`)
     - **Flipkart** (Cobalt Blue `#1D4ED8`)
   - Discount tag (e.g. `68% OFF`), trending badges (`🔥 HOT`), and ratings.
   - Current price (`₹499`), original price (`₹1,299`), and calculated savings (`Save ₹800`).
   - Full-width **"Shop Now"** button opening `affiliateUrl` in a new tab (`rel="noopener noreferrer sponsored"`).
   - Wishlist toggle and **"Copy Link"** button with smooth toast feedback.

5. **Mayu's Quick View Modal**:
   - Full-screen / centered modal showing high-res photo, rating, store badge, and **Mayu's Styling & Sizing Tips** (e.g., pairing tips, jewelry matches, and fabric recommendations).

6. **Wishlist Drawer**:
   - Persistent wishlist backed by `localStorage` allowing visitors to shortlist favorite finds and view total combined savings.

7. **Indian ASCI & CCPA Compliance Footer**:
   - Prominent **Affiliate Disclosure**:
     > *"Affiliate Disclosure: Some of the links on this website are affiliate links. If you make a purchase through them, I may earn a small commission at zero additional cost to you. I only recommend products I genuinely curate."*
   - Advertising Standards Council of India (**ASCI**) & Consumer Protection Act 2019 (**CCPA**) compliance statement.
   - Copyright © Style Wali Mayu, Brand collaboration contact (`rutvikbarot11@gmail.com`), and back-to-top button.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React + Custom SVG Brand Icons
- **Optimization**: Zero layout shift, Next.js Image component, responsive SVG badges

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm start
```

---

## 📦 How to Add or Edit Products

All products are defined in `src/data/products.ts`:

```typescript
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
```

Simply append or edit objects in the `products` array to update the storefront in real-time.
