'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUp, ShieldCheck, Heart, Mail, Sparkles, Bell, ArrowRight } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, WhatsAppIcon } from './BrandIcons';
import { BlueVerifiedTick } from './BlueVerifiedTick';
import { CREATOR_CONFIG } from '@/config/creator';

export function ComplianceFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-12 border-t border-[#EAE8E3] bg-white text-[#4B5563]">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-10">
        
        {/* CREATOR PROFILE SECTION (Moved to bottom so products open directly above the fold) */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#FAFAF8] via-white to-[#FFF7ED] border border-[#EAE8E3] shadow-card space-y-6 text-center">
          
          {/* Avatar with Gradient Ring & Real Photo */}
          <div className="relative inline-block">
            <div className="p-1 rounded-full bg-gradient-to-tr from-[#E07A5F] via-[#F4A261] to-[#E76F51] shadow-card">
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-3 border-white bg-[#F3F4F6] shadow-inner">
                <Image
                  src={CREATOR_CONFIG.avatarUrl}
                  alt={CREATOR_CONFIG.name}
                  fill
                  sizes="112px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Blue Verified Badge */}
            <div
              className="absolute bottom-0 right-0 p-0.5 bg-white rounded-full shadow-md border border-white"
              title="Verified Creator"
            >
              <BlueVerifiedTick className="w-5 h-5" />
            </div>
          </div>

          {/* Name & Handle */}
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="text-xl md:text-2xl font-black text-[#1F2937] tracking-tight">
                {CREATOR_CONFIG.name}
              </h2>
              <BlueVerifiedTick className="w-5 h-5 flex-shrink-0" />
            </div>
            <p className="text-xs md:text-sm font-semibold text-[#E07A5F]">
              {CREATOR_CONFIG.handle}
            </p>
            <p className="text-xs md:text-sm text-[#6B7280] max-w-md mx-auto pt-1 leading-relaxed">
              {CREATOR_CONFIG.bio}
            </p>
          </div>

          {/* Social Proof Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#EAE8E3] text-[#1F2937] shadow-subtle flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E07A5F]" />
              <span>120k+ Besties</span>
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#EAE8E3] text-[#1F2937] shadow-subtle">
              👗 Handpicked Quality
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#EAE8E3] text-[#1F2937] shadow-subtle">
              ⚡ Daily Price Drops
            </span>
          </div>

          {/* Social Channel Links */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <a
              href={CREATOR_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 border border-[#EAE8E3] text-xs font-bold text-[#1F2937] hover:text-[#E1306C] shadow-subtle transition-all active:scale-95"
            >
              <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
              <span>Instagram</span>
            </a>

            <a
              href={CREATOR_CONFIG.whatsapp.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 border border-[#EAE8E3] text-xs font-bold text-[#1F2937] hover:text-[#25D366] shadow-subtle transition-all active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Channel</span>
            </a>

            <a
              href={CREATOR_CONFIG.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 border border-[#EAE8E3] text-xs font-bold text-[#1F2937] hover:text-[#FF0000] shadow-subtle transition-all active:scale-95"
            >
              <YoutubeIcon className="w-4 h-4 text-[#FF0000]" />
              <span>YouTube</span>
            </a>
          </div>

          {/* WhatsApp Deals Announcement Banner */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#FFF7ED] via-[#FEF2F2] to-[#FFFBEB] border border-[#FDE68A] text-left flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-white shadow-sm border border-[#FDE68A] flex items-center justify-center text-[#D97706] flex-shrink-0">
                <Bell className="w-4 h-4 text-[#D97706] animate-bounce" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-bold text-[#1F2937]">
                  Join our WhatsApp Deals Group
                </p>
                <p className="text-[11px] text-[#6B7280]">
                  Get instant price drop alerts &amp; limited loot deals directly on WhatsApp.
                </p>
              </div>
            </div>

            <a
              href={CREATOR_CONFIG.whatsapp.groupInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 flex-shrink-0"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
              <span>Join Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Creator Brand Summary & Collab CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-[#F3F4F6]">
          <div className="space-y-1">
            <p className="text-sm font-black text-[#1F2937]">Style Wali Mayu</p>
            <p className="text-xs text-[#6B7280]">
              Handpicked fashion &amp; lifestyle budget finds under ₹999.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${CREATOR_CONFIG.collabEmail}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#EAE8E3] text-xs font-semibold text-[#1F2937] hover:border-[#E07A5F] hover:text-[#E07A5F] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Brand Collabs / PR</span>
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl border border-[#EAE8E3] text-gray-500 hover:text-[#E07A5F] hover:border-[#E07A5F] transition-colors"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Affiliate & Legal Disclosures Box (ASCI & CCPA Compliant) */}
        <div className="rounded-2xl bg-[#FAFAF8] border border-[#EAE8E3] p-5 md:p-6 space-y-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1F2937] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>Transparency &amp; Affiliate Disclosure</span>
          </div>

          <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
            <strong>Affiliate Disclosure:</strong> Some of the links on this website are affiliate links. If you make a purchase through them, I may earn a small commission at zero additional cost to you. I only recommend products I genuinely curate.
          </p>

          <div className="pt-2 border-t border-[#EAE8E3]/60 text-[11px] md:text-xs text-[#6B7280] leading-relaxed space-y-2">
            <p>
              <strong>Indian Regulatory Compliance (ASCI &amp; CCPA):</strong> In accordance with the Advertising Standards Council of India (ASCI) Guidelines for Influencer Advertising in Digital Media and the Consumer Protection Act, 2019 (CCPA), all sponsored and affiliate partnerships are transparently declared. Links labeled &ldquo;Shop Now&rdquo; or &ldquo;Shop Deal&rdquo; may redirect you to external partner platforms (Myntra, Ajio, Amazon India, Meesho, Flipkart, etc.).
            </p>
            <p>
              Product prices, lightning deals, bank discounts, and stock availability fluctuate in real-time on merchant platforms and are subject to change. Please verify final costs directly on the seller&apos;s page prior to finalizing your checkout.
            </p>
          </div>
        </div>

        {/* Footer Bottom Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF] pt-2">
          <p>
            &copy; {new Date().getFullYear()} Style Wali Mayu. All rights reserved.
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="hover:text-gray-600 cursor-pointer">ASCI Guidelines</span>
            <span>•</span>
            <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-600 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-gray-600 cursor-pointer">Disclaimers</span>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center text-[11px] text-[#9CA3AF] pt-1 flex items-center justify-center gap-1">
          <span>Curated with</span>
          <Heart className="w-3 h-3 fill-[#E07A5F] text-[#E07A5F]" />
          <span>for budget-conscious fashion lovers across India</span>
        </div>
      </div>
    </footer>
  );
}
