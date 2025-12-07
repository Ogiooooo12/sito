'use client';

import Link from 'next/link';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

export default function OrderConfirmationPage() {
  const orderNumber = `ORD-${Date.now()}`;
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Success Message */}
      <div className="text-center mb-12">
        <div className="inline-block mb-6">
          <CheckCircle className="w-20 h-20 text-green-500 animate-bounce" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Order Confirmed!</h1>
        <p className="text-xl text-gray-600">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-lg border border-blue-200 p-8 mb-8">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-sm text-gray-600 mb-1">Order Number</p>
            <p className="text-2xl font-bold text-gray-900">{orderNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
            <p className="text-2xl font-bold text-gray-900">{estimatedDelivery}</p>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 mb-6">Order Status</h3>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Order Confirmed</p>
              <p className="text-sm text-gray-600">Your order has been received</p>
            </div>
          </div>

          <div className="flex items-start gap-4 opacity-50">
            <div className="flex-shrink-0">
              <Package className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Preparing Order</p>
              <p className="text-sm text-gray-600">We're preparing your items for shipment</p>
            </div>
          </div>

          <div className="flex items-start gap-4 opacity-50">
            <div className="flex-shrink-0">
              <Truck className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">On the Way</p>
              <p className="text-sm text-gray-600">Your package is in transit</p>
            </div>
          </div>

          <div className="flex items-start gap-4 opacity-50">
            <div className="flex-shrink-0">
              <Home className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Delivered</p>
              <p className="text-sm text-gray-600">Your order has arrived</p>
            </div>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-8">
        <h3 className="font-bold text-gray-900 mb-4">What Happens Next?</h3>
        <ul className="space-y-2 text-gray-700">
          <li>✓ You'll receive an order confirmation email shortly</li>
          <li>✓ Your items will be prepared for shipment within 24-48 hours</li>
          <li>✓ You'll receive a shipping confirmation with tracking information</li>
          <li>✓ Expected delivery: {estimatedDelivery}</li>
          <li>✓ Questions? Contact our support team at support@storelux.com</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-bold hover:shadow-lg transition text-center"
        >
          Continue Shopping
        </Link>
        <Link
          href="/account"
          className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50 transition text-center"
        >
          View My Orders
        </Link>
      </div>

      {/* Additional Info */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">30</div>
            <p className="text-sm text-gray-600">Day Returns</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">✓</div>
            <p className="text-sm text-gray-600">100% Secure</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <p className="text-sm text-gray-600">Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
