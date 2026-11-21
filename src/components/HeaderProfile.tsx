'use client';

import React from 'react';
import Image from 'next/image';
import {
  Share2,
  Sparkles,
  Heart,
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon, WhatsAppIcon } from './BrandIcons';
import { BlueVerifiedTick } from './BlueVerifiedTick';
import { CREATOR_CONFIG } from '@/config/creator';

interface HeaderProfileProps {
  onShare: () => void;
  savedCount: number;
  onOpenWishlist: () => void;
}

export function HeaderProfile({
  onShare,
  savedCount,
  onOpenWishlist,
}: HeaderProfileProps) {
  return (
    <header className="relative pt-8 pb-6 px-4 md:px-6 max-w-4xl mx-auto text-center">
      {/* Decorative Warm Ambient Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-48 bg-gradient-to-b from-[#E07A5F]/20 via-[#F4A261]/10 to-transparent blur-3xl pointer-events-none -z-10" 
      />

      {/* Top action bar: Live status indicator, Saved wishlist & Share storefront */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#E07A5F] bg-[#E07A5F]/10 px-3 py-1.5 rounded-full border border-[#E07A5F]/20 flex items-center gap-1.5 shadow-subtle">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E07A5F] animate-ping" />
          Live Curations
        </span>

        <div className="flex items-center gap-2">
          {/* Wishlist button */}
          <button
            onClick={onOpenWishlist}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-[#EAE8E3] text-[#1F2937] text-xs font-medium hover:border-[#E07A5F] hover:text-[#E07A5F] shadow-subtle transition-all active:scale-95"
            aria-label="View saved items"
          >
            <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-[#E07A5F] text-[#E07A5F]' : 'text-gray-500'}`} />
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#E07A5F] text-white text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Share storefront */}
          <button
            onClick={onShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-[#EAE8E3] text-[#1F2937] text-xs font-medium hover:border-[#E07A5F] hover:text-[#E07A5F] shadow-subtle transition-all active:scale-95"
            aria-label="Share Storefront link"
            title="Share storefront"
          >
            <Share2 className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Profile Avatar with Aesthetic Gradient Ring & Real Photo */}
      <div className="relative inline-block mb-3.5">
        <div className="p-1 rounded-full bg-gradient-to-tr from-[#E07A5F] via-[#F4A261] to-[#E76F51] shadow-card">
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-3 border-white bg-[#F3F4F6] shadow-inner">
            {/* Real photo of Mayu */}
            <Image
              src={CREATOR_CONFIG.avatarUrl}
              alt={CREATOR_CONFIG.name}
              fill
              sizes="(max-width: 768px) 112px, 128px"
              priority
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Blue Verified Badge on bottom-right of avatar */}
        <div 
          className="absolute bottom-0.5 right-0.5 p-0.5 bg-white rounded-full shadow-md border border-white" 
          title="Verified Creator"
        >
          <BlueVerifiedTick className="w-6 h-6" />
        </div>
      </div>

      {/* Creator Name with Blue Tick */}
      <div className="flex items-center justify-center gap-1.5 mb-0.5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] tracking-tight">
          {CREATOR_CONFIG.name}
        </h1>
        <BlueVerifiedTick className="w-6 h-6 flex-shrink-0" />
      </div>

      {/* Handle */}
      <p className="text-sm font-semibold text-[#E07A5F] mb-2.5">
        {CREATOR_CONFIG.handle}
      </p>

      {/* Bio */}
      <p className="text-sm md:text-base text-[#4B5563] max-w-md mx-auto leading-relaxed mb-4">
        {CREATOR_CONFIG.bio}
      </p>

      {/* Social Proof Tags / Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#4B5563] bg-white px-3 py-1 rounded-full border border-[#EAE8E3] shadow-subtle">
          <Sparkles className="w-3 h-3 text-[#E07A5F]" />
          120k+ Besties
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#4B5563] bg-white px-3 py-1 rounded-full border border-[#EAE8E3] shadow-subtle">
          👗 Handpicked Quality
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#4B5563] bg-white px-3 py-1 rounded-full border border-[#EAE8E3] shadow-subtle">
          ⚡ Daily Price Drops
        </span>
      </div>

      {/* Social Media Link Buttons */}
      <div className="flex items-center justify-center gap-2.5 flex-wrap">
        {/* Instagram */}
        <a
          href={CREATOR_CONFIG.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE8E3] text-xs font-semibold text-[#1F2937] hover:border-[#E1306C] hover:text-[#E1306C] hover:shadow-sm transition-all"
          aria-label={`${CREATOR_CONFIG.name} on Instagram`}
        >
          <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
          <span>Instagram</span>
        </a>

        {/* WhatsApp Channel / Group */}
        <a
          href={CREATOR_CONFIG.whatsapp.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE8E3] text-xs font-semibold text-[#1F2937] hover:border-[#25D366] hover:text-[#25D366] hover:shadow-sm transition-all"
          aria-label={`${CREATOR_CONFIG.name} WhatsApp Channel`}
        >
          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
          <span>WhatsApp Channel</span>
        </a>

        {/* YouTube */}
        <a
          href={CREATOR_CONFIG.socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE8E3] text-xs font-semibold text-[#1F2937] hover:border-[#FF0000] hover:text-[#FF0000] hover:shadow-sm transition-all"
          aria-label={`${CREATOR_CONFIG.name} on YouTube`}
        >
          <YoutubeIcon className="w-4 h-4 text-[#FF0000]" />
          <span>YouTube</span>
        </a>
      </div>
    </header>
  );
}
