'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  Share2,
  Heart,
  Check,
} from 'lucide-react';
import { Product, STORE_CONFIG } from '@/data/products';
import { MediaCarousel } from './MediaCarousel';
import { getProductMedia } from '@/lib/sheets';

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onCopyLink: (product: Product) => void;
  onQuickView: (product: Product, initialSlide?: number) => void;
}

export function ProductCard({
  product,
  isSaved,
  onToggleSave,
  onCopyLink,
  onQuickView,
}: ProductCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const storeInfo = STORE_CONFIG[product.store] || {
    name: product.store,
    bgClass: 'bg-gray-100 text-gray-800',
    textClass: 'text-gray-800',
    borderClass: 'border-gray-200',
    hex: '#6B7280',
    tagLabel: (product.store || 'STORE').toUpperCase(),
  };

  const hasDiscount = product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const savingsAmount = product.originalPrice - product.price;
  const hasValidLink = product.affiliateUrl && product.affiliateUrl !== '#';

  // Extract all images + videos for the carousel
  const mediaItems = getProductMedia(product);

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyLink(product);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(product.id);
  };

  return (
    <article className="group relative flex flex-col sm:flex-row items-stretch bg-white rounded-2xl md:rounded-3xl border border-[#EAE8E3] overflow-hidden shadow-card hover:shadow-cardHover transition-all duration-300 hover:-translate-y-0.5">
      {/* LEFT SIDE: Information about the product */}
      <div className="flex-1 p-4 sm:p-5 md:p-6 flex flex-col justify-between order-2 sm:order-1 min-w-0">
        <div className="space-y-2 sm:space-y-3">
          {/* Top row: Product Code, Store Badge, and Discount */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-xs sm:text-sm font-black tracking-wider uppercase px-2.5 py-1 rounded-lg bg-[#1F2937] text-white shadow-sm">
              {product.code}
            </span>
            <span
              className={`text-xs sm:text-sm font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg shadow-sm border bg-white ${storeInfo.textClass} ${storeInfo.borderClass}`}
            >
              {storeInfo.tagLabel}
            </span>
            {discountPercent > 0 && (
              <span className="text-xs sm:text-sm font-bold text-white bg-[#10B981] px-2 py-1 rounded-lg shadow-sm">
                {discountPercent}% OFF
              </span>
            )}
            {product.company && (
              <span className="text-xs font-semibold text-gray-500 truncate">
                by {product.company}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h2
            onClick={() => onQuickView(product)}
            className="text-sm sm:text-base md:text-lg font-bold text-[#1F2937] line-clamp-2 leading-snug cursor-pointer hover:text-[#E07A5F] transition-colors"
            title={product.title}
          >
            {product.title}
          </h2>

          {/* Pricing Display */}
          <div className="pt-0.5">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#1F2937]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <span className="text-xs sm:text-sm text-[#9CA3AF] line-through font-medium">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {savingsAmount > 0 && (
              <p className="text-xs font-bold text-[#059669] mt-0.5">
                Save ₹{savingsAmount.toLocaleString('en-IN')} today
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons: Direct Shop Deal, Wishlist, Share */}
        <div className="pt-3 sm:pt-4 mt-3 border-t border-[#F3F4F6] flex items-center gap-2">
          {hasValidLink ? (
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#E07A5F] hover:bg-[#C85A3F] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm hover:shadow-md active:scale-98 transition-all"
              aria-label={`View deal for ${product.title} on ${product.store}`}
            >
              <span>Shop Deal on {product.store}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={() => onQuickView(product)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-bold rounded-xl transition-all"
            >
              <span>View Details</span>
            </button>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleSaveClick}
            className="p-2.5 rounded-xl border border-[#EAE8E3] bg-[#FAFAF8] hover:bg-white text-gray-500 hover:text-[#E07A5F] transition-all active:scale-95"
            aria-label={isSaved ? "Remove from saved" : "Save this deal"}
            title={isSaved ? "Saved" : "Save for later"}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isSaved ? 'fill-[#E07A5F] text-[#E07A5F]' : 'text-gray-600'
              }`}
            />
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleShareClick}
            className="p-2.5 rounded-xl border border-[#EAE8E3] bg-[#FAFAF8] hover:bg-white text-gray-500 hover:text-[#E07A5F] transition-all active:scale-95"
            aria-label={`Copy link for ${product.code}`}
            title={`Copy ${product.code} link`}
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-[#10B981]" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: Photos and Reels in YouTube Full Video Ratio (16:9) */}
      <div className="w-full sm:w-[50%] md:w-[48%] flex-shrink-0 bg-[#0F172A] flex items-center justify-center relative overflow-hidden order-1 sm:order-2">
        <div className="w-full relative aspect-video overflow-hidden">
          <MediaCarousel
            media={mediaItems}
            title={product.title}
            code={product.code}
            store={product.store}
            aspectRatio="aspect-video"
            onSlideClick={(index) => onQuickView(product, index)}
            autoPlayInterval={3200}
          />
        </div>
      </div>
    </article>
  );
}
