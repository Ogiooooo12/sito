'use client';

import { ProductCard } from '@/components';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SalePage() {
  const products = [
    // Sale list updated — product removed per request
    {
      id: '3',
      name: '4K Webcam Professional',
      slug: '4k-webcam-professional',
      price: 179.99,
      discount: 35,
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
      discount: 30,
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
      discount: 50,
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
      discount: 60,
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
        <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
          🔥 Mega Sale!
        </h1>
        <p className="text-lg text-gray-600">
          Incredible discounts on amazing products - Save up to 60%!
        </p>
      </div>

      {/* Sale Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white rounded-lg p-8 mb-12">
        <p className="text-xl font-bold">Limited time only! Use code <span className="text-2xl bg-white text-pink-600 px-3 py-1 rounded">SAVE50</span></p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
