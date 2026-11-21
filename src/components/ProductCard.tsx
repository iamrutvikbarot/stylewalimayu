'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ExternalLink,
  Share2,
  Heart,
  Eye,
  Star,
  Check,
} from 'lucide-react';
import { Product, STORE_CONFIG } from '@/data/products';

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onCopyLink: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export function ProductCard({
  product,
  isSaved,
  onToggleSave,
  onCopyLink,
  onQuickView,
}: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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

  const savingsAmount = product.originalPrice - product.price;

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
      {/* Top Media Container (High Aspect Ratio: 4/5 for fashion) */}
      <div 
        className="relative w-full aspect-[4/5] bg-[#F5F5F3] overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {/* Placeholder skeleton while loading */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}

        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Top-Left: Store Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          <span
            className={`text-[10px] md:text-xs font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md shadow-sm border backdrop-blur-md bg-white/95 ${storeInfo.textClass} ${storeInfo.borderClass}`}
          >
            {storeInfo.tagLabel}
          </span>
          {product.isTrending && (
            <span className="text-[9px] md:text-[10px] font-bold text-white bg-gradient-to-r from-[#E07A5F] to-[#E76F51] px-1.5 py-0.5 rounded-md shadow-sm flex items-center gap-0.5">
              <span>🔥 HOT</span>
            </span>
          )}
        </div>

        {/* Top-Right: Discount Badge */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          <span className="text-[10px] md:text-xs font-bold text-white bg-[#10B981] px-2 py-0.5 rounded-md shadow-sm">
            {discountPercent}% OFF
          </span>
        </div>

        {/* Quick View Floating Trigger (Desktop Hover) */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-[#1F2937] text-xs font-bold rounded-full shadow-lg backdrop-blur-sm pointer-events-auto">
            <Eye className="w-3.5 h-3.5 text-[#E07A5F]" />
            Quick Look &amp; Tips
          </span>
        </div>

        {/* Heart / Wishlist Button Overlay */}
        <button
          onClick={handleSaveClick}
          className="absolute bottom-2.5 right-2.5 z-10 p-2 rounded-full bg-white/90 backdrop-blur-md text-[#1F2937] hover:text-[#E07A5F] shadow-sm hover:scale-110 active:scale-90 transition-all"
          aria-label={isSaved ? "Remove from saved" : "Save this deal"}
          title={isSaved ? "Saved" : "Save for later"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'fill-[#E07A5F] text-[#E07A5F]' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Mayu's curated mini pill if badge exists */}
        {product.badge && (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="text-[10px] font-semibold text-[#1F2937] bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm border border-white/40">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="flex flex-col flex-1 p-3 md:p-3.5 justify-between">
        <div className="space-y-1.5">
          {/* Star Rating & Review Count */}
          {product.rating && (
            <div className="flex items-center gap-1 text-[11px] text-[#6B7280]">
              <div className="flex items-center text-[#D97706]">
                <Star className="w-3 h-3 fill-[#D97706]" />
                <span className="ml-1 font-bold text-[#1F2937]">{product.rating}</span>
              </div>
              {product.reviewCount && (
                <span className="text-gray-400">({product.reviewCount})</span>
              )}
            </div>
          )}

          {/* Product Title (clamped to 2 lines) */}
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
              <span className="text-xs text-[#9CA3AF] line-through font-medium">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-[#059669]">
              Save ₹{savingsAmount.toLocaleString('en-IN')} today
            </p>
          </div>
        </div>

        {/* Actions Bar: Shop Now Button & Copy Link */}
        <div className="pt-3 mt-2 border-t border-[#F3F4F6] flex items-center gap-1.5">
          {/* Shop Now / View Deal (External affiliate link) */}
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#E07A5F] hover:bg-[#C85A3F] text-white text-xs md:text-sm font-bold rounded-xl shadow-sm hover:shadow-md active:scale-98 transition-all"
            aria-label={`View deal for ${product.title} on ${product.store}`}
          >
            <span>Shop Now</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Copy / Share Link button */}
          <button
            onClick={handleShareClick}
            className="p-2 rounded-xl border border-[#EAE8E3] bg-[#FAFAF8] hover:bg-white text-gray-500 hover:text-[#E07A5F] hover:border-[#E07A5F] transition-colors active:scale-95"
            aria-label="Copy affiliate product link"
            title="Copy product link"
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
