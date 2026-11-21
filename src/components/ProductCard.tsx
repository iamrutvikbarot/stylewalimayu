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
    <article className="group relative flex flex-col bg-white rounded-2xl border border-[#EAE8E3] overflow-hidden shadow-card hover:shadow-cardHover transition-all duration-300 hover:-translate-y-1">
      {/* Media Carousel Container (3:4 aspect ratio matches native fashion photo proportions) */}
      <div className="relative w-full aspect-[3/4] bg-[#F5F5F3] overflow-hidden">
        <MediaCarousel
          media={mediaItems}
          title={product.title}
          code={product.code}
          store={product.store}
          aspectRatio="aspect-[3/4]"
          onSlideClick={(index) => onQuickView(product, index)}
          autoPlayInterval={3200}
        />

        {/* Top-Left: Store Badge, Product Code, and Discount Tag */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 flex-wrap pointer-events-none">
          <span className="text-[10px] md:text-xs font-black tracking-wider uppercase px-2 py-0.5 rounded-md bg-[#1F2937] text-white shadow-md">
            {product.code}
          </span>
          <span
            className={`text-[10px] md:text-xs font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md shadow-sm border backdrop-blur-md bg-white/95 ${storeInfo.textClass} ${storeInfo.borderClass}`}
          >
            {storeInfo.tagLabel}
          </span>
          {discountPercent > 0 && (
            <span className="text-[10px] md:text-xs font-bold text-white bg-[#10B981] px-1.5 py-0.5 rounded-md shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Heart / Wishlist Button Overlay */}
        <button
          onClick={handleSaveClick}
          className="absolute bottom-2.5 right-2.5 z-20 p-2 rounded-full bg-white/90 backdrop-blur-md text-[#1F2937] hover:text-[#E07A5F] shadow-sm hover:scale-110 active:scale-90 transition-all pointer-events-auto"
          aria-label={isSaved ? "Remove from saved" : "Save this deal"}
          title={isSaved ? "Saved" : "Save for later"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'fill-[#E07A5F] text-[#E07A5F]' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-3 md:p-3.5 justify-between">
        <div className="space-y-1.5">
          {/* Product Code & Company Subtitle */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-extrabold text-[#E07A5F] bg-[#E07A5F]/10 px-2 py-0.5 rounded-md border border-[#E07A5F]/20">
              Code: {product.code}
            </span>
            {product.company && (
              <span className="text-[11px] font-semibold text-gray-500 truncate">
                by {product.company}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h2
            onClick={() => onQuickView(product)}
            className="text-xs md:text-sm font-semibold text-[#1F2937] line-clamp-2 leading-snug cursor-pointer hover:text-[#E07A5F] transition-colors"
            title={product.title}
          >
            {product.title}
          </h2>

          {/* Price Display */}
          <div className="pt-1">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base md:text-lg font-black text-[#1F2937]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <span className="text-xs text-[#9CA3AF] line-through font-medium">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {savingsAmount > 0 && (
              <p className="text-[11px] font-semibold text-[#059669]">
                Save ₹{savingsAmount.toLocaleString('en-IN')} today
              </p>
            )}
          </div>
        </div>

        {/* Actions Bar: Direct Shop Deal Button & Copy Link */}
        <div className="pt-3 mt-2 border-t border-[#F3F4F6] flex items-center gap-1.5">
          {hasValidLink ? (
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#E07A5F] hover:bg-[#C85A3F] text-white text-xs md:text-sm font-bold rounded-xl shadow-sm hover:shadow-md active:scale-98 transition-all"
              aria-label={`View deal for ${product.title} on ${product.store}`}
            >
              <span>Shop Deal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={() => onQuickView(product)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm font-bold rounded-xl transition-all"
            >
              <span>View Details</span>
            </button>
          )}

          {/* Copy Link Button */}
          <button
            onClick={handleShareClick}
            className="p-2 rounded-xl border border-[#EAE8E3] bg-[#FAFAF8] hover:bg-white text-gray-500 hover:text-[#E07A5F] hover:border-[#E07A5F] transition-colors active:scale-95"
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
    </article>
  );
}
