'use client';

import { useState, useMemo, useEffect } from 'react';
import { ProductCard } from '@/components';
import Link from 'next/link';
import { ArrowLeft, Filter, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  slug?: string;
  price: number;
  discount?: number;
  image: string;
  rating: number;
  reviews?: number;
  inStock?: boolean;
  category: string;
}

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Carica i prodotti dal localStorage (dalla sezione admin)
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        const products = JSON.parse(savedProducts);
        const productsWithDefaults = products
          .map((p: Product) => ({
          ...p,
          slug: p.slug || p.name.toLowerCase().replace(/\s+/g, '-'),
          discount: p.discount || 0,
          reviews: p.reviews || 0,
          inStock: p.inStock !== undefined ? p.inStock : true,
          rating: p.rating || 4.5,
          }))
          .filter((p: Product) => !(p.category && p.category.toLowerCase() === 'electronics'));

        setAllProducts(productsWithDefaults);
      } catch (error) {
        console.log('Error loading products from localStorage');
        setAllProducts([]);
      }
    } else {
      setAllProducts([]);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const ratingMatch = product.rating >= minRating;
      return priceMatch && ratingMatch;
    });

    // Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
    }

    return filtered;
  }, [allProducts, sortBy, priceRange, minRating]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 transition font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-3">Shop Products</h1>
          <p className="text-slate-300 text-lg">Discover our curated collection of premium products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="w-full flex items-center justify-between bg-white border-2 border-slate-900 text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </span>
            <ChevronDown className={`w-5 h-5 transition ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-slate-200 sticky top-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Filter className="w-6 h-6 text-amber-500" />
                Filters
              </h2>

              {/* Price Range Filter */}
              <div className="mb-8 pb-8 border-b-2 border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full h-2 bg-gradient-to-r from-slate-300 to-amber-400 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-lg">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Minimum Rating Filter */}
              <div className="mb-8 pb-8 border-b-2 border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Minimum Rating</h3>
                <div className="space-y-3">
                  {[0, 3, 3.5, 4, 4.5, 4.8].map((rating) => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={minRating === rating}
                        onChange={(e) => setMinRating(Number(e.target.value))}
                        className="w-4 h-4 text-amber-500 cursor-pointer"
                      />
                      <span className="text-slate-700 group-hover:text-amber-600 transition font-semibold">
                        {rating === 0 ? 'All Ratings' : `${rating}+ ⭐`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-slate-900 font-semibold hover:border-amber-400 transition"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSortBy('newest');
                  setPriceRange([0, 1000]);
                  setMinRating(0);
                  setMobileFiltersOpen(false);
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg hover:from-amber-600 hover:to-amber-700 transition shadow-md"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-block p-8 bg-white rounded-2xl shadow-lg border-2 border-slate-200">
                  <p className="text-slate-900 text-xl font-bold mb-2">No products found</p>
                  <p className="text-slate-600 mb-6">Try adjusting your filters</p>
                  <button
                    onClick={() => {
                      setSortBy('newest');
                      setPriceRange([0, 1000]);
                      setMinRating(0);
                    }}
                    className="text-amber-600 hover:text-amber-700 font-bold transition"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-xl shadow-md border border-slate-200">
                  <p className="text-slate-700 font-semibold">
                    Showing <span className="text-amber-600 font-bold text-lg">{filteredProducts.length}</span> products
                  </p>
                </div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
