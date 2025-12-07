'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductCard } from '@/components';

export default function WishlistPage() {
  // Mock wishlist data
  const wishlistItems = [
    // wishlist is intentionally left empty per request
  ];

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <div className="text-6xl mb-4">❤️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
          <p className="text-lg text-gray-600 mb-8">
            Add items to your wishlist to save them for later!
          </p>
          <Link
            href="/categories/electronics"
            className="inline-block bg-slate-900 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            <ArrowLeft className="inline mr-2 w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <Link
        href="/categories/electronics"
        className="text-slate-600 hover:text-slate-700 font-semibold flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Continue Shopping
      </Link>
    </div>
  );
}
