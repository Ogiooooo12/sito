'use client';

import { ProductCard } from '@/components';
import Link from 'next/link';
import { ArrowRight, Zap, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  // Mock products data

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
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl mb-8 text-slate-100">
              Shop the latest technology, fashion, and home essentials with exclusive deals and free shipping.
            </p>
            <div className="flex gap-4">
              <Link
                href="/categories/electronics"
                className="bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/sale"
                className="border-2 border-amber-400 bg-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-amber-400/10 transition"
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
                className="text-center p-6 rounded-lg bg-gradient-to-br from-slate-50 to-amber-50 hover:shadow-lg transition"
              >
                <Icon className="w-12 h-12 bg-slate-900 mx-auto mb-4" />
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

      {/* Promo Section */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-600 text-white my-16">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-6">Limited Time Offer</h2>
          <p className="text-xl text-slate-100 mb-8">
            Get up to 50% off on selected items. Use code <span className="font-bold text-yellow-300">SAVE50</span>
          </p>
          <Link
            href="/sale"
            className="inline-block bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 px-8 py-3 rounded-lg font-semibold transition"
          >
            Claim Your Discount
          </Link>
        </div>
      </section>



      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-slate-100 via-slate-50 to-amber-100 rounded-2xl p-12 text-center border-2 border-amber-400">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Browse our extensive collection of products and find exactly what you're looking for.
          </p>
          <Link
            href="/categories/electronics"
            className="inline-block bg-slate-900 hover:bg-slate-800 bg-blue-400 px-8 py-3 rounded-lg font-semibold transition"
          >
            Explore All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
