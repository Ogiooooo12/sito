'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore, useUIStore, useAuthStore } from '@/store';

export function Header() {
  const cartCount = useCartStore((state) => state.getItemCount());
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore();
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 px-4 text-xs text-center">
        🚀 Free shipping on orders over $50 · <span className="font-semibold">Shop Now</span>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="text-3xl font-bold text-blue-600">StoreLux</span>
        </Link>

        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link href="/wishlist">
            <Heart className="w-6 h-6 text-gray-700 hover:text-red-500 transition" />
          </Link>

          {/* Account */}
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.avatar || 'https://via.placeholder.com/40'}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-gray-300"
              />
              <Link href="/account" className="text-sm font-medium hover:text-blue-600">
                {user.name}
              </Link>
            </div>
          ) : (
            <Link href="/login">
              <User className="w-6 h-6 text-gray-700 hover:text-blue-600 transition" />
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="hidden md:flex border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto w-full flex items-center px-4">
          <Link href="/shop" className="px-4 py-3 text-sm font-medium text-black hover:text-blue-600 transition font-bold">
            🛍️ Shop
          </Link>
          <Link href="/sale" className="px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 font-bold transition">
            🔥 Sale
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col">
            <Link href="/shop" className="px-4 py-3 border-b text-sm font-medium font-bold text-black">
              🛍️ Shop
            </Link>
            <Link href="/sale" className="px-4 py-3 text-sm font-medium text-red-600">
              🔥 Sale
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
