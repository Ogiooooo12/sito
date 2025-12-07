'use client';

import { ProductCard } from '@/components';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { use } from 'react';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  // Mock products for each category
  const products = [
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
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          {categoryName}
        </h1>
        <p className="text-lg text-gray-600">
          Discover amazing products in {categoryName.toLowerCase()}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 pb-6 border-b border-blue-200">
        <div className="flex-1">
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-blue-50">
            <option>All Products</option>
            <option>Best Sellers</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 transition">
            Grid
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 transition">
            List
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 border-2 border-blue-600 text-slate-600 font-semibold rounded-lg hover:bg-blue-50 transition">
          Load More Products
        </button>
      </div>
    </div>
  );
}
