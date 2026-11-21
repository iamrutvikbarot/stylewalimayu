'use client';

import React from 'react';
import { WhatsAppIcon } from './BrandIcons';
import { CREATOR_CONFIG } from '@/config/creator';

export function FloatingWhatsAppButton() {
  return (
    <div className="fixed bottom-5 right-5 z-40 animate-slide-up">
      <a
        href={CREATOR_CONFIG.whatsapp.groupInviteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-2xl hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white"
        aria-label="Join Style Wali Mayu WhatsApp Deals Group"
      >
        <span className="relative flex items-center justify-center">
          <WhatsAppIcon className="w-5 h-5 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#EF4444] rounded-full ring-2 ring-[#25D366] animate-pulse" />
        </span>
        <span className="text-xs font-black tracking-wide pr-1">
          Join WhatsApp Deals
        </span>
      </a>
    </div>
  );
}
