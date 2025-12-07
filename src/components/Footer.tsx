'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-slate-900 to-amber-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Join Our Newsletter</h3>
              <p className="text-slate-100">Get exclusive deals and updates delivered to your inbox</p>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button className="px-6 py-3 bg-amber-400 text-gray-900 font-semibold rounded-lg hover:bg-amber-300 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">StoreLux</h4>
            <p className="text-sm text-gray-400 mb-4">
              Your ultimate destination for premium products and amazing deals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-amber-400 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-amber-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-amber-400 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-amber-400 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/electronics" className="hover:text-amber-400 transition">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/categories/fashion" className="hover:text-amber-400 transition">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/categories/home" className="hover:text-amber-400 transition">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link href="/categories/books" className="hover:text-amber-400 transition">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/sale" className="hover:text-amber-400 transition">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-amber-400 transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-amber-400 transition">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-amber-400 transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-400 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-amber-400 transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-amber-400 transition">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2025 StoreLux. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <span>🏠 Worldwide Shipping</span>
            <span>🔒 Secure Checkout</span>
            <span>✅ Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
