'use client';

import React from 'react';
import Image from 'next/image';
import { Share2, Heart } from 'lucide-react';
import { BlueVerifiedTick } from './BlueVerifiedTick';
import { CREATOR_CONFIG } from '@/config/creator';

interface CompactHeaderProps {
  onShare: () => void;
  savedCount: number;
  onOpenWishlist: () => void;
}

export function CompactHeader({
  onShare,
  savedCount,
  onOpenWishlist,
}: CompactHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE8E3] py-2 px-3 sm:px-4 shadow-subtle">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Creator Brand Info (Left) */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-2 ring-[#E07A5F]/40 flex-shrink-0 bg-gray-100 shadow-sm">
            <Image
              src={CREATOR_CONFIG.avatarUrl}
              alt={CREATOR_CONFIG.name}
              fill
              sizes="36px"
              priority
              className="object-cover object-top"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm font-black text-[#1F2937] truncate">
                {CREATOR_CONFIG.name}
              </span>
              <BlueVerifiedTick className="w-3.5 h-3.5 flex-shrink-0" />
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#E07A5F] font-semibold truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              <span>Live Deals Under ₹999</span>
            </p>
          </div>
        </div>

        {/* Action Controls (Right) */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#FAFAF8] hover:bg-white rounded-full border border-[#EAE8E3] text-[#1F2937] text-xs font-semibold hover:border-[#E07A5F] hover:text-[#E07A5F] transition-all active:scale-95 shadow-subtle"
            aria-label="View saved deals"
          >
            <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-[#E07A5F] text-[#E07A5F]' : 'text-gray-500'}`} />
            <span className="hidden xs:inline text-[11px]">Saved</span>
            {savedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#E07A5F] text-white text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={onShare}
            className="flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 bg-[#FAFAF8] hover:bg-white rounded-full border border-[#EAE8E3] text-[#1F2937] text-xs font-semibold hover:border-[#E07A5F] hover:text-[#E07A5F] transition-all active:scale-95 shadow-subtle"
            aria-label="Share storefront link"
            title="Share storefront"
          >
            <Share2 className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden sm:inline text-[11px]">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
}
