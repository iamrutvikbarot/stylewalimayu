'use client';

import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up flex items-center gap-3 bg-[#1F2937] text-white px-4 py-3 rounded-full shadow-2xl border border-white/10 max-w-[90vw] text-sm font-medium">
      <div className="w-6 h-6 rounded-full bg-[#E07A5F] flex items-center justify-center flex-shrink-0 text-white">
        <Sparkles className="w-3.5 h-3.5" />
      </div>
      <span className="truncate">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-white transition-colors p-1"
        aria-label="Dismiss toast"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
