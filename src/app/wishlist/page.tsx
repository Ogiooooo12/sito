'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductCard } from '@/components';

export default function WishlistPage() {
  // Mock wishlist data
  const wishlistItems = [
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
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
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
        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Continue Shopping
      </Link>
    </div>
  );
}
