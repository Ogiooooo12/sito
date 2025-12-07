'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components';
import Link from 'next/link';
import { ArrowLeft, Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ShopPage() {
  const allProducts = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      slug: 'premium-wireless-headphones',
      price: 299.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 245,
      inStock: true,
      category: 'electronics',
    },
    {
      id: '2',
      name: 'Smart Watch Ultra Pro',
      slug: 'smart-watch-ultra-pro',
      price: 499.99,
      discount: 15,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 189,
      inStock: true,
      category: 'electronics',
    },
    {
      id: '3',
      name: '4K Webcam Professional',
      slug: '4k-webcam-professional',
      price: 179.99,
      discount: 10,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 152,
      inStock: true,
      category: 'electronics',
    },
    {
      id: '4',
      name: 'Mechanical Keyboard RGB',
      slug: 'mechanical-keyboard-rgb',
      price: 149.99,
      discount: 0,
      image: 'https://images.unsplash.com/photo-1587829191301-7c86dcb837c7?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 312,
      inStock: true,
      category: 'electronics',
    },
    {
      id: '5',
      name: 'Wireless Mouse Ergonomic',
      slug: 'wireless-mouse-ergonomic',
      price: 79.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
      rating: 4.5,
      reviews: 201,
      inStock: true,
      category: 'electronics',
    },
    {
      id: '6',
      name: 'USB-C Hub Multiport',
      slug: 'usb-c-hub-multiport',
      price: 59.99,
      discount: 30,
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
      rating: 4.4,
      reviews: 98,
      inStock: true,
      category: 'electronics',
    },
    {
      id: '7',
      name: 'Premium Designer Jacket',
      slug: 'premium-designer-jacket',
      price: 199.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 156,
      inStock: true,
      category: 'fashion',
    },
    {
      id: '8',
      name: 'Stylish Sneakers',
      slug: 'stylish-sneakers',
      price: 119.99,
      discount: 15,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 203,
      inStock: true,
      category: 'fashion',
    },
    {
      id: '9',
      name: 'Elegant Watch',
      slug: 'elegant-watch',
      price: 249.99,
      discount: 10,
      image: 'https://images.unsplash.com/photo-1523170335684-f042f1997f89?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 134,
      inStock: true,
      category: 'fashion',
    },
    {
      id: '10',
      name: 'Modern Lamp',
      slug: 'modern-lamp',
      price: 89.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop',
      rating: 4.5,
      reviews: 87,
      inStock: true,
      category: 'home',
    },
    {
      id: '11',
      name: 'Cozy Sofa',
      slug: 'cozy-sofa',
      price: 799.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 178,
      inStock: true,
      category: 'home',
    },
    {
      id: '12',
      name: 'Garden Chair Set',
      slug: 'garden-chair-set',
      price: 299.99,
      discount: 15,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 112,
      inStock: true,
      category: 'home',
    },
    {
      id: '13',
      name: 'Programming Guide',
      slug: 'programming-guide',
      price: 45.99,
      discount: 10,
      image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 234,
      inStock: true,
      category: 'books',
    },
    {
      id: '14',
      name: 'Design Masterclass',
      slug: 'design-masterclass',
      price: 39.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1543002588-d83cdf395142?w=500&h=500&fit=crop',
      rating: 4.4,
      reviews: 145,
      inStock: true,
      category: 'books',
    },
    {
      id: '15',
      name: 'Business Strategy',
      slug: 'business-strategy',
      price: 49.99,
      discount: 0,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3af564d9?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 198,
      inStock: true,
      category: 'books',
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);

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
      filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  }, [selectedCategory, sortBy, priceRange, minRating]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        Shop All Products
      </h1>
      <p className="text-gray-600 mb-8">Discover {filteredProducts.length} amazing products</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-lg p-6 border border-indigo-200 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </h2>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Products' },
                  { value: 'electronics', label: 'Electronics' },
                  { value: 'fashion', label: 'Fashion' },
                  { value: 'home', label: 'Home & Garden' },
                  { value: 'books', label: 'Books' },
                ].map((cat) => (
                  <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={selectedCategory === cat.value}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-4 h-4 text-indigo-600 cursor-pointer"
                    />
                    <span className="text-gray-700">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6 pb-6 border-b border-indigo-200">
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">${priceRange[0]}</span>
                  <span className="text-gray-700">${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6 pb-6 border-b border-indigo-200">
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
                      className="w-4 h-4 text-indigo-600 cursor-pointer"
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
                className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
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
              className="w-full mt-6 px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition"
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
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
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
                  <ProductCard {...product} />
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
