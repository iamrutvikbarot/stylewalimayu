'use client';

import React, { useRef } from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { CATEGORIES, CategoryOption } from '@/data/products';

interface SearchBarAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  selectedStore: string;
  onStoreChange: (store: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
}

const STORES = ['All', 'Myntra', 'Ajio', 'Amazon', 'Meesho', 'Flipkart'];

export function SearchBarAndFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStore,
  onStoreChange,
  sortBy,
  onSortChange,
  totalResults,
}: SearchBarAndFiltersProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky top-0 z-30 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#EAE8E3]/80 py-3 px-4 shadow-subtle transition-all">
      <div className="max-w-5xl mx-auto space-y-2.5">
        
        {/* Search Bar & Quick Controls */}
        <div className="flex items-center gap-2">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search product code..."
              className="w-full pl-9 pr-9 py-2 bg-white rounded-xl border border-[#EAE8E3] text-sm text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/30 focus:border-[#E07A5F] transition-all shadow-subtle"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Store Filter Selector */}
          <div className="relative flex-shrink-0">
            <select
              value={selectedStore}
              onChange={(e) => onStoreChange(e.target.value)}
              className="appearance-none bg-white border border-[#EAE8E3] rounded-xl text-xs md:text-sm font-medium text-[#1F2937] py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/30 focus:border-[#E07A5F] shadow-subtle cursor-pointer transition-all"
              aria-label="Filter by store"
            >
              {STORES.map((store) => (
                <option key={store} value={store}>
                  {store === 'All' ? 'All Stores' : store}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <SlidersHorizontal className="w-3 h-3" />
            </div>
          </div>

          {/* Sort Selector */}
          <div className="relative flex-shrink-0">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-[#EAE8E3] rounded-xl text-xs md:text-sm font-medium text-[#1F2937] py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/30 focus:border-[#E07A5F] shadow-subtle cursor-pointer transition-all"
              aria-label="Sort products"
            >
              <option value="featured">✨ Trending Deals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Biggest Discount %</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <ArrowUpDown className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Horizontally Scrollable Category Pills */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5"
          role="tablist"
          aria-label="Product categories"
        >
          {CATEGORIES.map((cat: CategoryOption) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 active:scale-95 flex items-center gap-1.5 flex-shrink-0 ${
                  isActive
                    ? 'bg-[#E07A5F] text-white shadow-md shadow-[#E07A5F]/20 border border-[#E07A5F]'
                    : 'bg-white text-[#4B5563] border border-[#EAE8E3] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results summary bar if searching or filtered */}
        {(searchQuery || selectedStore !== 'All' || selectedCategory !== 'all') && (
          <div className="flex items-center justify-between text-xs text-[#6B7280] pt-1">
            <span>
              Found <strong className="text-[#1F2937]">{totalResults}</strong> {totalResults === 1 ? 'deal' : 'deals'}
              {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
              {selectedStore !== 'All' && <span> on {selectedStore}</span>}
            </span>
            <button
              onClick={() => {
                onSearchChange('');
                onCategoryChange('all');
                onStoreChange('All');
              }}
              className="text-[#E07A5F] hover:underline font-medium"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
