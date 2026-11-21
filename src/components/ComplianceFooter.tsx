'use client';

import React from 'react';
import { ArrowUp, ShieldCheck, Heart, Mail } from 'lucide-react';

export function ComplianceFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-[#EAE8E3] bg-white text-[#4B5563]">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-8">
        
        {/* Creator Brand Summary & Collab CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#F3F4F6]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-[#1F2937]">Style Wali Mayu</span>
              <span className="text-xs font-semibold text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full border border-[#E07A5F]/20">
                @stylewalimayu
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#6B7280] max-w-md">
              Your everyday fashion &amp; lifestyle companion. Handpicked budget finds, viral outfit styling hacks &amp; genuine reviews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:collabs@stylewalimayu.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#EAE8E3] text-xs font-semibold text-[#1F2937] hover:border-[#E07A5F] hover:text-[#E07A5F] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Brand Collabs / PR</span>
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl border border-[#EAE8E3] text-gray-500 hover:text-[#E07A5F] hover:border-[#E07A5F] transition-colors"
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

          {/* Exact required prompt statement */}
          <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
            <strong>Affiliate Disclosure:</strong> Some of the links on this website are affiliate links. If you make a purchase through them, I may earn a small commission at zero additional cost to you. I only recommend products I genuinely curate.
          </p>

          {/* Indian ASCI & CCPA Guidelines */}
          <div className="pt-2 border-t border-[#EAE8E3]/60 text-[11px] md:text-xs text-[#6B7280] leading-relaxed space-y-2">
            <p>
              <strong>Indian Regulatory Compliance (ASCI &amp; CCPA):</strong> In accordance with the Advertising Standards Council of India (ASCI) Guidelines for Influencer Advertising in Digital Media and the Consumer Protection Act, 2019 (CCPA), all sponsored and affiliate partnerships are transparently declared. Links labeled &ldquo;Shop Now&rdquo; or &ldquo;View Deal&rdquo; may redirect you to external partner platforms (Myntra, Ajio, Amazon India, Meesho, Flipkart, etc.).
            </p>
            <p>
              Product prices, lightning deals, bank discounts, and stock availability fluctuate in real-time on merchant platforms and are subject to change. Please verify final costs and product specifications directly on the seller&apos;s page prior to finalizing your checkout.
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

        {/* Made with love tagline */}
        <div className="text-center text-[11px] text-[#9CA3AF] pt-2 flex items-center justify-center gap-1">
          <span>Curated with</span>
          <Heart className="w-3 h-3 fill-[#E07A5F] text-[#E07A5F]" />
          <span>for budget-conscious fashion lovers across India</span>
        </div>
      </div>
    </footer>
  );
}
