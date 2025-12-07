'use client';

import { ProductCard } from '@/components';
import Link from 'next/link';
import { ArrowRight, Zap, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  // Mock products data
  const featuredProducts = [
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

  const features = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Get your products in 1-2 business days',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your payment is safe and encrypted',
    },
    {
      icon: RotateCcw,
      title: '30-Day Returns',
      description: 'Not satisfied? Return for a full refund',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Shop the latest technology, fashion, and home essentials with exclusive deals and free shipping.
            </p>
            <div className="flex gap-4">
              <Link
                href="/categories/electronics"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/sale"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                View Deals
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-96"
          >
            <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🛍️</div>
                <p className="text-lg font-semibold">Premium Shopping Experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition"
              >
                <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600">
            Check out our best-selling items handpicked just for you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/categories/all"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Promo Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white my-16">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-6">Limited Time Offer</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get up to 50% off on selected items. Use code <span className="font-bold text-yellow-300">SAVE50</span>
          </p>
          <Link
            href="/sale"
            className="inline-block bg-gradient-to-r from-indigo-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Claim Your Discount
          </Link>
        </div>
      </section>



      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-12 text-center border-2 border-indigo-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Browse our extensive collection of products and find exactly what you're looking for.
          </p>
          <Link
            href="/categories/electronics"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Explore All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
