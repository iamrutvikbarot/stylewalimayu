'use client';

import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Package,
  Sparkles,
  RotateCcw,
  Copy,
} from 'lucide-react';
import { Product } from '@/data/products';
import Image from 'next/image';

interface ProductManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onLoadSamples: () => void;
  onClearAll: () => void;
  onShowToast: (msg: string) => void;
}

export function ProductManagerModal({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onDeleteProduct,
  onLoadSamples,
  onClearAll,
  onShowToast,
}: ProductManagerModalProps) {
  const [activeTab, setActiveTab] = useState<'add' | 'list'>('add');

  // Form State
  const [title, setTitle] = useState('');
  const [store, setStore] = useState<Product['store']>('Myntra');
  const [category, setCategory] = useState('ethnic');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [badge, setBadge] = useState('');
  const [stylingTip, setStylingTip] = useState('');
  const [isTrending, setIsTrending] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price || !originalPrice || !affiliateUrl.trim()) {
      alert('Please fill in Title, Price, Original Price, and Affiliate Link.');
      return;
    }

    const fallbackImg =
      imageUrl.trim() ||
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title: title.trim(),
      store,
      category,
      price: Number(price),
      originalPrice: Number(originalPrice),
      imageUrl: fallbackImg,
      affiliateUrl: affiliateUrl.trim(),
      badge: badge.trim() || undefined,
      stylingTip: stylingTip.trim() || undefined,
      isTrending,
      rating: 4.8,
      reviewCount: Math.floor(Math.random() * 500) + 120,
    };

    onAddProduct(newProd);
    onShowToast(`Added "${newProd.title.slice(0, 20)}..." to store! ✨`);

    // Reset form
    setTitle('');
    setPrice('');
    setOriginalPrice('');
    setImageUrl('');
    setAffiliateUrl('');
    setBadge('');
    setStylingTip('');
    setActiveTab('list');
  };

  const handleCopyCode = () => {
    const jsonStr = JSON.stringify(products, null, 2);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(jsonStr);
      onShowToast('Products data copied to clipboard! ✨');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#EAE8E3] animate-slide-up flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE8E3] bg-[#FAFAF8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center shadow-sm">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1F2937]">
                Product Manager
              </h2>
              <p className="text-xs text-gray-500">
                Manage Mayu&apos;s live storefront items ({products.length} active)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#EAE8E3] bg-white px-5 pt-3 gap-6">
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'add'
                ? 'border-[#E07A5F] text-[#E07A5F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Product</span>
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'list'
                ? 'border-[#E07A5F] text-[#E07A5F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Active Products ({products.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-5">
          {activeTab === 'add' ? (
            /* Add Product Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Product Title */}
              <div>
                <label className="block font-semibold text-[#1F2937] mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Floral Printed Pure Cotton Anarkali Kurta"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E3] focus:ring-2 focus:ring-[#E07A5F]/30 focus:border-[#E07A5F] outline-none"
                />
              </div>

              {/* Store & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1F2937] mb-1">
                    Store *
                  </label>
                  <select
                    value={store}
                    onChange={(e) => setStore(e.target.value as Product['store'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E3] bg-white focus:ring-2 focus:ring-[#E07A5F]/30 focus:border-[#E07A5F] outline-none"
                  >
                    <option value="Myntra">Myntra</option>
                    <option value="Ajio">Ajio</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Meesho">Meesho</option>
                    <option value="Flipkart">Flipkart</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#1F2937] mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E3] bg-white focus:ring-2 focus:ring-[#E07A5F]/30 focus:border-[#E07A5F] outline-none"
                  >
                    <option value="ethnic">👗 Ethnic &amp; Kurtas</option>
                    <option value="western">✨ Western &amp; Tops</option>
                    <option value="accessories">👜 Bags &amp; Accessories</option>
                    <option value="home">🏠 Aesthetic Home</option>
                  </select>
                </div>
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1F2937] mb-1">
                    Offer Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="499"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E3] focus:ring-2 focus:ring-[#E07A5F]/30 focus:border-[#E07A5F] outline-none"
                  >
                  </input>
                </div>
                <div>
                  <label className="block font-semibold text-[#1F2937] mb-1">
                    MRP / Original Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="1299"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E3] focus:ring-2 focus:ring-[#E07A5F]/30 focus:border-[#E07A5F] outline-none"
                  />
                </div>
              </div>

              {/* Affiliate Link */}
              <div>
                <label className="block font-semibold text-[#1F2937] mb-1">
                  Affiliate / Product URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://myntra.com/product-link?aff=stylewalimayu"
                  value={affiliateUrl}
                  onChange={(e) => setAffiliateUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E3] focus:ring-2 focus:ring-[#E07A5F]/30 focus:border-[#E07A5F] outline-none"
                />
              </div>

              {/* Image URL with preview */}
              <div>
                <label className="block font-semibold text-[#1F2937] mb-1">
                  Product Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or paste image link"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#EAE8E3] focus:ring-2 focus:ring-[#E07A5F]/30 focus:border-[#E07A5F] outline-none"
                  />
                  {imageUrl && (
                    <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                      <Image
                        src={imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Tip: Copy image link from Myntra, Ajio, Amazon, or Unsplash.
                </p>
              </div>

              {/* Badge & Styling Tip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1F2937] mb-1">
                    Badge Pill (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Viral on Reels 🌸, Under ₹499"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E3] focus:ring-2 focus:ring-[#E07A5F]/30 focus:border-[#E07A5F] outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isTrending"
                    checked={isTrending}
                    onChange={(e) => setIsTrending(e.target.checked)}
                    className="w-4 h-4 text-[#E07A5F] rounded border-gray-300 focus:ring-[#E07A5F]"
                  />
                  <label htmlFor="isTrending" className="text-xs font-semibold text-[#1F2937]">
                    Mark as Trending Deal 🔥
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1F2937] mb-1">
                  Mayu&apos;s Styling / Sizing Tip (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Pair with silver jhumkas and kolhapuri flats for college or casual brunch!"
                  value={stylingTip}
                  onChange={(e) => setStylingTip(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E3] focus:ring-2 focus:ring-[#E07A5F]/30 focus:border-[#E07A5F] outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#E07A5F] hover:bg-[#C85A3F] text-white font-bold rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product to Storefront</span>
              </button>
            </form>
          ) : (
            /* Active Products List */
            <div className="space-y-3">
              {products.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                    <Package className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">No products added yet</p>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    You haven&apos;t added any items to the storefront yet. You can add one manually using the form or load 12 curated samples to preview.
                  </p>
                </div>
              ) : (
                products.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-[#EAE8E3] bg-[#FAFAF8]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-[#E07A5F]">
                          {item.store} • {item.category}
                        </span>
                        <p className="text-xs font-semibold text-[#1F2937] truncate">
                          {item.title}
                        </p>
                        <p className="text-xs font-black text-[#1F2937]">
                          ₹{item.price}{' '}
                          <span className="text-gray-400 line-through font-normal text-[10px]">
                            ₹{item.originalPrice}
                          </span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteProduct(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with Quick Actions */}
        <div className="p-4 border-t border-[#EAE8E3] bg-[#FAFAF8] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onLoadSamples}
              className="px-3 py-1.5 rounded-xl border border-[#EAE8E3] bg-white hover:border-[#E07A5F] text-[#1F2937] font-semibold transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Load 12 Samples (Preview)</span>
            </button>
            {products.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-semibold transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Remove All</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {products.length > 0 && (
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-xl border border-[#EAE8E3] bg-white hover:bg-gray-50 text-gray-700 font-semibold transition-colors flex items-center gap-1"
                title="Copy products JSON"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy JSON</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1F2937] text-white font-bold rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
