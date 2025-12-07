'use client';

import Link from 'next/link';
import { useCartStore } from '@/store';
import { Trash2, ArrowLeft, Plus, Minus } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-lg text-gray-600 mb-8">
            Add some products to get started shopping!
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

  const handleRemove = (productId: string) => {
    removeItem(productId);
    toast.success('Item removed from cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 p-6 border-b border-gray-200 last:border-b-0"
              >
                {/* Product Image */}
                <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <Link href={`/product/${item.productId}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      item.quantity > 1 && updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <Link
            href="/categories/electronics"
            className="mt-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg shadow-sm p-6 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            {/* Breakdown */}
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(getTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">
                  {formatPrice(getTotal() * 0.1)}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between mb-8">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(getTotal() * 1.1)}
              </span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white font-semibold py-3 rounded-lg transition mb-3 text-center"
            >
              Proceed to Checkout
            </Link>

            {/* Clear Cart */}
            <button
              onClick={() => {
                clearCart();
                toast.success('Cart cleared');
              }}
              className="w-full text-gray-600 hover:text-gray-900 font-semibold py-3 border border-gray-300 rounded-lg transition"
            >
              Clear Cart
            </button>

            {/* Promo Code */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-semibold transition">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
