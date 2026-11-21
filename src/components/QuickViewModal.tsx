'use client';

import React from 'react';
import {
  X,
  ExternalLink,
  Share2,
  Heart,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { Product, STORE_CONFIG } from '@/data/products';
import { MediaCarousel } from './MediaCarousel';
import { getProductMedia } from '@/lib/sheets';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onCopyLink: (product: Product) => void;
  initialSlide?: number;
}

export function QuickViewModal({
  product,
  onClose,
  isSaved,
  onToggleSave,
  onCopyLink,
  initialSlide = 0,
}: QuickViewModalProps) {
  if (!product) return null;

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
  const savings = product.originalPrice - product.price;
  const hasValidLink = product.affiliateUrl && product.affiliateUrl !== '#';

  const mediaItems = getProductMedia(product);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#EAE8E3] animate-slide-up flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/85 hover:bg-white text-gray-700 shadow-md transition-all hover:scale-105 active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable container for modal content */}
        <div className="overflow-y-auto no-scrollbar flex-1">
          {/* Media Carousel (Images + Video with immediate playback in proper fashion portrait aspect ratio) */}
          <div className="relative w-full aspect-[3/4] max-h-[58vh] bg-[#F5F5F3] overflow-hidden">
            <MediaCarousel
              media={mediaItems}
              title={product.title}
              code={product.code}
              store={product.store}
              aspectRatio="aspect-[3/4]"
              initialSlide={initialSlide}
              isModal={true}
              autoPlayInterval={3200}
            />

            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap pointer-events-none z-10">
              <span className="text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow-sm bg-[#1F2937] text-white">
                {product.code}
              </span>
              <span
                className={`text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow-sm border bg-white/95 ${storeInfo.textClass} ${storeInfo.borderClass}`}
              >
                {storeInfo.tagLabel}
              </span>
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-white bg-[#10B981] px-2 py-1 rounded-lg shadow-sm">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Details Body */}
          <div className="p-5 md:p-6 space-y-4">
            {/* Code & Brand */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-1 rounded-lg border border-[#E07A5F]/20">
                  Product Code: {product.code}
                </span>
                {product.company && (
                  <span className="text-xs font-bold text-[#4B5563] bg-gray-100 px-2.5 py-1 rounded-lg">
                    Brand: {product.company}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {product.store}
              </span>
            </div>

            {/* Title */}
            <h3
              id="modal-product-title"
              className="text-base md:text-lg font-bold text-[#1F2937] leading-snug"
            >
              {product.title}
            </h3>

            {/* Price Box */}
            <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#EAE8E3] flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Special Offer Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#1F2937]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
              {savings > 0 && (
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-bold border border-[#A7F3D0]">
                    Save ₹{savings.toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>

            {/* Direct Video Reel button if videoUrl exists */}
            {product.videoUrl && (
              <a
                href={product.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#FFF7ED] to-[#FEF3C7] border border-[#FDE68A] hover:border-[#F59E0B] shadow-sm transition-all group"
              >
                <div className="flex items-center gap-2.5 text-xs font-bold text-[#B45309]">
                  <div className="w-7 h-7 rounded-lg bg-[#D97706]/15 flex items-center justify-center text-[#D97706] group-hover:scale-105 transition-transform">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-[#92400E]">Watch Original 4K HD Video</p>
                    <p className="text-[10px] text-[#B45309]/80 font-medium">Open high-res reel directly in Google Drive</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#B45309] group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#10B981] flex-shrink-0" />
              <span>
                Verified direct deal link to {product.store}. Opens retailer site directly.
              </span>
            </div>
          </div>
        </div>

        {/* Sticky Modal Bottom Actions */}
        <div className="p-4 bg-white border-t border-[#EAE8E3] flex items-center gap-2">
          {/* Wishlist toggle */}
          <button
            onClick={() => onToggleSave(product.id)}
            className="p-3 rounded-2xl border border-[#EAE8E3] hover:border-[#E07A5F] text-[#1F2937] hover:text-[#E07A5F] transition-colors"
            aria-label="Save deal"
            title={isSaved ? "Saved" : "Save for later"}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#E07A5F] text-[#E07A5F]' : ''}`} />
          </button>

          {/* Share button */}
          <button
            onClick={() => onCopyLink(product)}
            className="p-3 rounded-2xl border border-[#EAE8E3] hover:border-[#E07A5F] text-[#1F2937] hover:text-[#E07A5F] transition-colors"
            aria-label="Copy deal link"
            title="Share link"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {/* Main Direct Affiliate Button */}
          {hasValidLink ? (
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-1 py-3 px-4 rounded-2xl bg-[#E07A5F] hover:bg-[#C85A3F] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98"
            >
              <span>Shop Deal on {product.store}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="flex-1 py-3 px-4 rounded-2xl bg-gray-100 text-gray-500 font-bold text-sm text-center">
              Link Coming Soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
