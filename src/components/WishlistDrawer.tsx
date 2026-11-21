'use client';

import React from 'react';
import Image from 'next/image';
import { X, Heart, ExternalLink, Trash2 } from 'lucide-react';
import { Product } from '@/data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProducts: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onQuickView: (product: Product) => void;
}

export function WishlistDrawer({
  isOpen,
  onClose,
  savedProducts,
  onRemove,
  onClear,
  onQuickView,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  const totalOriginal = savedProducts.reduce((sum, p) => sum + p.originalPrice, 0);
  const totalCurrent = savedProducts.reduce((sum, p) => sum + p.price, 0);
  const totalSavings = totalOriginal - totalCurrent;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-deals-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slide-up sm:animate-none border-l border-[#EAE8E3]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#EAE8E3] flex items-center justify-between bg-[#FAFAF8]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#E07A5F]/10 text-[#E07A5F]">
              <Heart className="w-5 h-5 fill-[#E07A5F]" />
            </div>
            <div>
              <h2 id="saved-deals-title" className="text-base font-bold text-[#1F2937]">
                Saved Deals ({savedProducts.length})
              </h2>
              <p className="text-xs text-gray-500">Your curated shortlist</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close saved deals"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400 space-y-3">
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300">
                <Heart className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-gray-600">No saved deals yet!</p>
              <p className="text-xs text-gray-400 max-w-xs">
                Tap the heart icon on any outfit, tote bag or home item to save it for later.
              </p>
            </div>
          ) : (
            savedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-2.5 rounded-2xl border border-[#EAE8E3] bg-[#FAFAF8] hover:bg-white transition-all shadow-subtle"
              >
                {/* Thumbnail */}
                <div
                  className="relative w-16 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onQuickView(product);
                  }}
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#E07A5F]">
                    {product.store}
                  </span>
                  <p
                    className="text-xs font-semibold text-[#1F2937] line-clamp-2 leading-snug cursor-pointer hover:text-[#E07A5F]"
                    onClick={() => {
                      onClose();
                      onQuickView(product);
                    }}
                  >
                    {product.title}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-[#1F2937]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1 items-end">
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="p-2 rounded-xl bg-[#E07A5F] text-white hover:bg-[#C85A3F] transition-all"
                    title={`Buy on ${product.store}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => onRemove(product.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {savedProducts.length > 0 && (
          <div className="p-4 border-t border-[#EAE8E3] bg-[#FAFAF8] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Total Price ({savedProducts.length} items):</span>
              <span className="font-bold text-base text-[#1F2937]">
                ₹{totalCurrent.toLocaleString('en-IN')}
              </span>
            </div>
            {totalSavings > 0 && (
              <div className="flex justify-between items-center text-xs text-[#059669] font-medium bg-[#ECFDF5] px-3 py-1.5 rounded-xl border border-[#A7F3D0]">
                <span>Total Savings:</span>
                <span className="font-bold">₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={onClear}
                className="px-3 py-2 text-xs text-gray-500 hover:text-gray-800 border border-[#EAE8E3] rounded-xl hover:bg-white transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-[#1F2937] hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
