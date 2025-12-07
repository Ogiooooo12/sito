'use client';

import { ProductCard } from '@/components';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { use } from 'react';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  // Products are loaded from central store/localStorage elsewhere.
  // For 'electronics' category we intentionally show no products per request.
  const products: Array<any> = category.toLowerCase() === 'electronics' ? [] : undefined as any;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <Link href="/" className="flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-amber-600 bg-clip-text text-transparent">
          {categoryName}
        </h1>
        <p className="text-lg text-gray-600">
          Discover amazing products in {categoryName.toLowerCase()}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 pb-6 border-b border-slate-200">
        <div className="flex-1">
          <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 text-gray-900">
            <option>All Products</option>
            <option>Best Sellers</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
            Grid
          </button>
          <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
            List
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(products) && products.length === 0 ? (
          <div className="col-span-3 text-center py-24">
            <p className="text-xl text-gray-600 mb-4">There are no products in this category.</p>
            <Link href="/shop" className="inline-block bg-slate-900 text-amber-400 px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition">Browse Shop</Link>
          </div>
        ) : (
          products && products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 border-2 border-slate-900 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition">
          Load More Products
        </button>
      </div>
    </div>
  );
}
