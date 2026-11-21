'use client';

import React from 'react';
import Image from 'next/image';
import {
  X,
  ExternalLink,
  Share2,
  Heart,
  Sparkles,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { Product, STORE_CONFIG } from '@/data/products';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onCopyLink: (product: Product) => void;
}

export function QuickViewModal({
  product,
  onClose,
  isSaved,
  onToggleSave,
  onCopyLink,
}: QuickViewModalProps) {
  if (!product) return null;

  const storeInfo = STORE_CONFIG[product.store] || {
    name: product.store,
    bgClass: 'bg-gray-100 text-gray-800',
    textClass: 'text-gray-800',
    borderClass: 'border-gray-200',
    hex: '#6B7280',
    tagLabel: product.store.toUpperCase(),
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const savings = product.originalPrice - product.price;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#EAE8E3] animate-slide-up flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md transition-all hover:scale-105 active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable container for modal content */}
        <div className="overflow-y-auto no-scrollbar flex-1">
          {/* Product Image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#F5F5F3]">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, 500px"
              className="object-cover object-center"
              priority
            />
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span
                className={`text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow-sm border bg-white/95 ${storeInfo.textClass} ${storeInfo.borderClass}`}
              >
                {storeInfo.tagLabel}
              </span>
              <span className="text-xs font-bold text-white bg-[#10B981] px-2 py-1 rounded-lg shadow-sm">
                {discountPercent}% OFF
              </span>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-5 md:p-6 space-y-4">
            {/* Rating & Badge */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              {product.badge && (
                <span className="text-xs font-semibold text-[#E07A5F] bg-[#E07A5F]/10 px-3 py-1 rounded-full border border-[#E07A5F]/20">
                  {product.badge}
                </span>
              )}
              {product.rating && (
                <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                  <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                  <span className="font-bold text-[#1F2937]">{product.rating}</span>
                  <span>({product.reviewCount} customer reviews)</span>
                </div>
              )}
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
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-bold border border-[#A7F3D0]">
                  You save ₹{savings.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Mayu's Personal Styling Tips Card */}
            {product.stylingTip && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FEF2F2] border border-[#FDE68A]/60 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#D97706]">
                  <Sparkles className="w-4 h-4" />
                  <span>Mayu&apos;s Styling &amp; Sizing Tip</span>
                </div>
                <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
                  &ldquo;{product.stylingTip}&rdquo;
                </p>
              </div>
            )}

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#10B981] flex-shrink-0" />
              <span>
                Verified genuine link from {product.store}. Opens official store app/site.
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
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-1 py-3 px-4 rounded-2xl bg-[#E07A5F] hover:bg-[#C85A3F] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98"
          >
            <span>Shop Now on {product.store}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
