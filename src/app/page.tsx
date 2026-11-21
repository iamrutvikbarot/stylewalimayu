'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { products, Product } from '@/data/products';
import { HeaderProfile } from '@/components/HeaderProfile';
import { QuickCtaBanner } from '@/components/QuickCtaBanner';
import { SearchBarAndFilters } from '@/components/SearchBarAndFilters';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { ComplianceFooter } from '@/components/ComplianceFooter';
import { Toast } from '@/components/Toast';
import { SearchX, RotateCcw } from 'lucide-react';

export default function StorefrontPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStore, setSelectedStore] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  // Initialize saved items from localStorage
  useEffect(() => {
    setHasMounted(true);
    try {
      const stored = localStorage.getItem('swm_saved_products');
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage error in private mode
    }
  }, []);

  // Update localStorage when saved items change
  const updateSaved = useCallback((newIds: string[]) => {
    setSavedIds(newIds);
    try {
      localStorage.setItem('swm_saved_products', JSON.stringify(newIds));
    } catch {
      // Ignore
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
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
    return products
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
  }, [searchQuery, selectedCategory, selectedStore, sortBy]);

  const savedProductsList = useMemo(() => {
    return products.filter((p) => savedIds.includes(p.id));
  }, [savedIds]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1F2937] flex flex-col selection:bg-[#F7D3C9] selection:text-[#8B3724]">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Creator Header Profile */}
        <HeaderProfile
          onShare={handleShareStorefront}
          savedCount={hasMounted ? savedIds.length : 0}
          onOpenWishlist={() => setIsWishlistOpen(true)}
        />

        {/* Quick CTA Banner */}
        <QuickCtaBanner />

        {/* Search & Category Filter Section (Sticky) */}
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

        {/* Product Grid Area */}
        <main className="max-w-5xl mx-auto px-3.5 sm:px-4 py-6 md:py-8">
          {filteredProducts.length === 0 ? (
            /* Empty State */
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
          )}
        </main>
      </div>

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
