'use client';

import React, { useState, useEffect } from 'react';
import { Bell, ArrowRight, X } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';

export function QuickCtaBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dismissed = sessionStorage.getItem('swm_whatsapp_banner_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('swm_whatsapp_banner_dismissed', 'true');
    }
  };

  if (!mounted || isDismissed) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 mb-4">
      <aside 
        aria-label="WhatsApp Deals Announcement"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FFF7ED] via-[#FEF2F2] to-[#FFFBEB] border border-[#FDE68A]/60 p-3.5 md:p-4 shadow-card hover:shadow-cardHover transition-all duration-300"
      >
        {/* Subtle decorative glow */}
        <div 
          aria-hidden="true" 
          className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#E07A5F]/15 rounded-full blur-2xl pointer-events-none" 
        />

        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3 min-w-0">
            {/* Bell Icon with live alert dot */}
            <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-white shadow-sm border border-[#FDE68A] flex items-center justify-center text-[#D97706]">
              <Bell className="w-5 h-5 text-[#D97706] animate-bounce" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full ring-2 ring-white" />
            </div>

            {/* Text description */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs md:text-sm font-bold text-[#1F2937] truncate">
                  Join our WhatsApp Deals Group
                </p>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                  Free &amp; Verified
                </span>
              </div>
              <p className="text-xs text-[#6B7280] line-clamp-1">
                Instant price drop alerts, hidden coupons &amp; limited loot deals!
              </p>
            </div>
          </div>

          {/* Action Button & Dismiss */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="https://chat.whatsapp.com/invite/stylewalimayu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs md:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
              <span>Join Free</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
            </a>

            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-black/5 transition-colors"
              aria-label="Dismiss banner"
              title="Dismiss announcement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
