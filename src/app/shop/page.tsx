'use client';

import { useState, useMemo, useEffect } from 'react';
import { ProductCard } from '@/components';
import Link from 'next/link';
import { ArrowLeft, Filter, X } from 'lucide-react';
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

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);

  // Carica i prodotti dal localStorage (dalla sezione admin)
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        const products = JSON.parse(savedProducts);
        const productsWithDefaults = products.map((p: Product) => ({
          ...p,
          slug: p.slug || p.name.toLowerCase().replace(/\s+/g, '-'),
          discount: p.discount || 0,
          reviews: p.reviews || 0,
          inStock: p.inStock !== undefined ? p.inStock : true,
          rating: p.rating || 4.5,
        }));
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
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const ratingMatch = product.rating >= minRating;
      return categoryMatch && priceMatch && ratingMatch;
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
  }, [selectedCategory, sortBy, priceRange, minRating]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
        Shop All Products
      </h1>
      <p className="text-gray-600 mb-8">Discover {filteredProducts.length} amazing products</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-blue-50 rounded-lg p-6 border border-blue-200 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </h2>

            {/* Price Range Filter */}
            <div className="mb-6 pb-6 border-b border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">${priceRange[0]}</span>
                  <span className="text-gray-700">${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6 pb-6 border-b border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                {[0, 3, 3.5, 4, 4.5, 4.8].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={minRating === rating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="w-4 h-4 text-blue-600 cursor-pointer"
                    />
                    <span className="text-gray-700">
                      {rating === 0 ? 'All' : `${rating}+ ⭐`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
                setSelectedCategory('all');
                setSortBy('newest');
                setPriceRange([0, 1000]);
                setMinRating(0);
              }}
              className="w-full mt-6 px-4 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">No products found matching your filters</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSortBy('newest');
                  setPriceRange([0, 1000]);
                  setMinRating(0);
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProductCard 
                    {...product}
                    slug={product.slug || product.name.toLowerCase().replace(/\s+/g, '-')}
                    discount={product.discount || 0}
                    reviews={product.reviews || 0}
                    inStock={product.inStock !== undefined ? product.inStock : true}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Results Info */}
          <div className="mt-8 text-center text-gray-600">
            <p>
              Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> of{' '}
              <span className="font-bold text-gray-900">{allProducts.length}</span> products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
