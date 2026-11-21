'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { products, Product, sampleCurations } from '@/data/products';
import { CREATOR_CONFIG } from '@/config/creator';
import { HeaderProfile } from '@/components/HeaderProfile';
import { QuickCtaBanner } from '@/components/QuickCtaBanner';
import { SearchBarAndFilters } from '@/components/SearchBarAndFilters';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { ProductManagerModal } from '@/components/ProductManagerModal';
import { ComplianceFooter } from '@/components/ComplianceFooter';
import { FloatingWhatsAppButton } from '@/components/FloatingWhatsAppButton';
import { Toast } from '@/components/Toast';
import { InstagramIcon, WhatsAppIcon } from '@/components/BrandIcons';
import {
  SearchX,
  RotateCcw,
  Sparkles,
  Bell,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
} from 'lucide-react';

export default function StorefrontPage() {
  const [catalog, setCatalog] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStore, setSelectedStore] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    setHasMounted(true);
    try {
      // Saved Wishlist
      const storedWishlist = localStorage.getItem('swm_saved_products');
      if (storedWishlist) {
        setSavedIds(JSON.parse(storedWishlist));
      }

      // Custom Managed Catalog (if user added items)
      const storedCatalog = localStorage.getItem('swm_custom_catalog');
      if (storedCatalog) {
        setCatalog(JSON.parse(storedCatalog));
      }
    } catch {
      // Ignore in private mode
    }
  }, []);

  // Update localStorage when catalog changes
  const updateCatalog = useCallback((newList: Product[]) => {
    setCatalog(newList);
    try {
      localStorage.setItem('swm_custom_catalog', JSON.stringify(newList));
    } catch {
      // Ignore
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  // Add Product
  const handleAddProduct = useCallback(
    (newProd: Product) => {
      const updated = [newProd, ...catalog];
      updateCatalog(updated);
    },
    [catalog, updateCatalog]
  );

  // Delete Product
  const handleDeleteProduct = useCallback(
    (id: string) => {
      const updated = catalog.filter((p) => p.id !== id);
      updateCatalog(updated);
      showToast('Product removed from storefront');
    },
    [catalog, updateCatalog, showToast]
  );

  // Load 12 Samples for Preview
  const handleLoadSamples = useCallback(() => {
    updateCatalog(sampleCurations);
    showToast('Loaded 12 curated demo finds! ✨');
  }, [updateCatalog, showToast]);

  // Clear All
  const handleClearAll = useCallback(() => {
    updateCatalog([]);
    showToast('All products cleared');
  }, [updateCatalog, showToast]);

  // Wishlist toggle
  const updateSaved = useCallback((newIds: string[]) => {
    setSavedIds(newIds);
    try {
      localStorage.setItem('swm_saved_products', JSON.stringify(newIds));
    } catch {
      // Ignore
    }
  }, []);

  const handleToggleSave = useCallback(
    (id: string) => {
      if (savedIds.includes(id)) {
        updateSaved(savedIds.filter((item) => item !== id));
        showToast('Removed from saved items');
      } else {
        updateSaved([...savedIds, id]);
        showToast('Added to your saved wishlist! ❤️');
      }
    },
    [savedIds, updateSaved, showToast]
  );

  const handleCopyLink = useCallback(
    (product: Product) => {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(product.affiliateUrl).then(() => {
          showToast(`Link for "${product.title.slice(0, 24)}..." copied! ✨`);
        });
      } else {
        showToast('Deal link copied to clipboard! ✨');
      }
    },
    [showToast]
  );

  const handleShareStorefront = useCallback(() => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('✨ Storefront link copied to clipboard!');
      });
    } else {
      showToast('✨ Storefront link copied to clipboard!');
    }
  }, [showToast]);

  // Client-side filtering & sorting
  const filteredProducts = useMemo(() => {
    return catalog
      .filter((item) => {
        // Category filter
        if (selectedCategory === 'under499') {
          if (item.price > 499) return false;
        } else if (selectedCategory !== 'all') {
          if (item.category !== selectedCategory) return false;
        }

        // Store filter
        if (selectedStore !== 'All' && item.store !== selectedStore) {
          return false;
        }

        // Search filter
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchStore = item.store.toLowerCase().includes(q);
          const matchCategory = item.category.toLowerCase().includes(q);
          const matchBadge = item.badge ? item.badge.toLowerCase().includes(q) : false;
          if (!matchTitle && !matchStore && !matchCategory && !matchBadge) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        if (sortBy === 'discount') {
          const discA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
          const discB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
          return discB - discA;
        }
        // Default: 'featured' -> trending first, then rating
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return (b.rating || 0) - (a.rating || 0);
      });
  }, [catalog, searchQuery, selectedCategory, selectedStore, sortBy]);

  const savedProductsList = useMemo(() => {
    return catalog.filter((p) => savedIds.includes(p.id));
  }, [catalog, savedIds]);

  const hasCatalogItems = catalog.length > 0;

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1F2937] flex flex-col selection:bg-[#F7D3C9] selection:text-[#8B3724]">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsAppButton />

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Creator Header Profile with Real Photo & Blue Tick */}
        <HeaderProfile
          onShare={handleShareStorefront}
          savedCount={hasMounted ? savedIds.length : 0}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenProductManager={() => setIsManagerOpen(true)}
          productCount={hasMounted ? catalog.length : 0}
        />

        {/* Quick CTA WhatsApp Banner */}
        <QuickCtaBanner />

        {/* Search & Category Filter Section (Sticky on scroll) */}
        <SearchBarAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStore={selectedStore}
          onStoreChange={setSelectedStore}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredProducts.length}
        />

        {/* Product Grid Area or Launching Soon State */}
        <main className="max-w-5xl mx-auto px-3.5 sm:px-4 py-6 md:py-8">
          {!hasCatalogItems ? (
            /* First Drop Coming Soon Aesthetic Showcase */
            <section className="max-w-2xl mx-auto py-8 text-center space-y-6">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE8E3] shadow-card space-y-5">
                {/* Decorative Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E07A5F]/10 border border-[#E07A5F]/20 text-[#E07A5F] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curations In Progress</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-black text-[#1F2937] tracking-tight">
                    First Drop Coming Soon! ✨
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                    Mayu is currently testing, styling, and verifying budget fashion &amp; aesthetic lifestyle finds under ₹999 from Myntra, Ajio, Amazon, and Meesho.
                  </p>
                </div>

                {/* Categories Teaser Chips */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#FAFAF8] border border-[#EAE8E3] text-[#1F2937]">
                    👗 Ethnic Kurtas &amp; Anarkalis
                  </span>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#FAFAF8] border border-[#EAE8E3] text-[#1F2937]">
                    ✨ Chic Tops &amp; Knits
                  </span>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#FAFAF8] border border-[#EAE8E3] text-[#1F2937]">
                    👜 Viral Totes &amp; Jewelry
                  </span>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#FAFAF8] border border-[#EAE8E3] text-[#1F2937]">
                    ⚡ Budget Steals Under ₹499
                  </span>
                </div>

                {/* Action Card: Join WhatsApp for first alert */}
                <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FEF2F2] border border-[#FDE68A]/80 text-left space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#D97706]">
                    <Bell className="w-4 h-4 animate-bounce" />
                    <span>Get First Access Before Items Sell Out</span>
                  </div>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    Deals under ₹499 and viral reel pieces go out of stock within minutes! Join our exclusive WhatsApp group to receive direct loot links the moment they drop.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <a
                      href={CREATOR_CONFIG.whatsapp.groupInviteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>Join WhatsApp Channel / Group</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href={CREATOR_CONFIG.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-gray-50 border border-[#EAE8E3] text-[#1F2937] hover:text-[#E1306C] rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-98"
                    >
                      <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                      <span>Follow on Instagram</span>
                    </a>
                  </div>
                </div>

                {/* Creator Controls for adding first product */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setIsManagerOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F2937] hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>+ Add First Product</span>
                  </button>
                  <button
                    onClick={handleLoadSamples}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#EAE8E3] hover:border-[#E07A5F] text-[#E07A5F] text-xs font-bold rounded-xl shadow-subtle transition-all active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Load 12 Demo Curations (Preview)</span>
                  </button>
                </div>

                {/* Trust guarantee */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>100% Genuine, Honest &amp; Hand-Tested Reviews</span>
                </div>
              </div>
            </section>
          ) : filteredProducts.length === 0 ? (
            /* Empty Search Filter State */
            <div className="py-16 px-4 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E07A5F]/10 text-[#E07A5F] flex items-center justify-center mx-auto border border-[#E07A5F]/20">
                <SearchX className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#1F2937]">No matching deals found</h3>
                <p className="text-xs md:text-sm text-[#6B7280]">
                  We couldn&apos;t find any outfits or finds matching your current search or filters. Try adjusting keywords or clearing filters!
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedStore('All');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E07A5F] text-white text-xs md:text-sm font-bold shadow-md hover:bg-[#C85A3F] transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            /* Sleek 2-column on mobile, 3-4 column on desktop */
            <div>
              <div className="flex items-center justify-between pb-3 text-xs text-gray-500">
                <span>
                  Showing <strong className="text-[#1F2937]">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'deal' : 'deals'}
                </span>
                <button
                  onClick={() => setIsManagerOpen(true)}
                  className="text-[#E07A5F] font-bold hover:underline flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Manage Products</span>
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSaved={hasMounted && savedIds.includes(product.id)}
                    onToggleSave={handleToggleSave}
                    onCopyLink={handleCopyLink}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Product Manager Modal */}
      <ProductManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        products={catalog}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        onLoadSamples={handleLoadSamples}
        onClearAll={handleClearAll}
        onShowToast={showToast}
      />

      {/* Quick View Modal for Mayu's Personal Styling Tips */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isSaved={
          quickViewProduct
            ? hasMounted && savedIds.includes(quickViewProduct.id)
            : false
        }
        onToggleSave={handleToggleSave}
        onCopyLink={handleCopyLink}
      />

      {/* Wishlist / Saved Items Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedProducts={savedProductsList}
        onRemove={(id) => handleToggleSave(id)}
        onClear={() => updateSaved([])}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Mandatory Compliance Footer (ASCI & CCPA Compliant) */}
      <ComplianceFooter />
    </div>
  );
}
