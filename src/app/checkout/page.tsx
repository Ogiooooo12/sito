'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, MapPin, CreditCard, Truck } from 'lucide-react';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [loading, setLoading] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + tax + shipping;

  // Form states
  const [shipping_info, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
  });

  const [payment_info, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !shipping_info.firstName ||
      !shipping_info.email ||
      !shipping_info.address ||
      !shipping_info.city ||
      !shipping_info.zip
    ) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payment_info.cardName || !payment_info.cardNumber || !payment_info.cvc) {
      toast.error('Please fill in all card details');
      return;
    }
    setStep('review');
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success('Order placed successfully!');
      clearCart();

      // Redirect to order confirmation
      setTimeout(() => {
        window.location.href = '/order-confirmation';
      }, 1500);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <Link href="/cart" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </Link>

      <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Progress Steps */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setStep('shipping')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                step === 'shipping'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Shipping
            </button>
            <button
              onClick={() => setStep('payment')}
              disabled={step === 'shipping'}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                step === 'payment'
                  ? 'bg-blue-600 text-white'
                  : step === 'shipping'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Payment
            </button>
            <button
              onClick={() => setStep('review')}
              disabled={step !== 'review'}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                step === 'review'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Review
            </button>
          </div>

          {/* Shipping Information */}
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="bg-white rounded-lg p-6 border border-blue-200">
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={shipping_info.firstName}
                    onChange={(e) =>
                      setShippingInfo({ ...shipping_info, firstName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={shipping_info.lastName}
                    onChange={(e) =>
                      setShippingInfo({ ...shipping_info, lastName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={shipping_info.email}
                  onChange={(e) =>
                    setShippingInfo({ ...shipping_info, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={shipping_info.address}
                  onChange={(e) =>
                    setShippingInfo({ ...shipping_info, address: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={shipping_info.city}
                    onChange={(e) =>
                      setShippingInfo({ ...shipping_info, city: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    value={shipping_info.state}
                    onChange={(e) =>
                      setShippingInfo({ ...shipping_info, state: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    value={shipping_info.zip}
                    onChange={(e) =>
                      setShippingInfo({ ...shipping_info, zip: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {/* Payment Information */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="bg-white rounded-lg p-6 border border-blue-200">
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  value={payment_info.cardName}
                  onChange={(e) =>
                    setPaymentInfo({ ...payment_info, cardName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={payment_info.cardNumber}
                  onChange={(e) =>
                    setPaymentInfo({
                      ...payment_info,
                      cardNumber: e.target.value.replace(/\s/g, ''),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={payment_info.expiry}
                    onChange={(e) =>
                      setPaymentInfo({ ...payment_info, expiry: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CVC *
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={payment_info.cvc}
                    onChange={(e) =>
                      setPaymentInfo({ ...payment_info, cvc: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition"
                >
                  Review Order
                </button>
              </div>
            </form>
          )}

          {/* Review Order */}
          {step === 'review' && (
            <div className="bg-white rounded-lg p-6 border border-blue-200">
              <h2 className="text-2xl font-bold mb-6">Order Review</h2>

              {/* Shipping Summary */}
              <div className="mb-6 pb-6 border-b border-blue-200">
                <h3 className="font-bold text-gray-900 mb-3">Shipping To:</h3>
                <p className="text-gray-700">
                  {shipping_info.firstName} {shipping_info.lastName}
                </p>
                <p className="text-gray-700">{shipping_info.address}</p>
                <p className="text-gray-700">
                  {shipping_info.city}, {shipping_info.state} {shipping_info.zip}
                </p>
                <p className="text-gray-700">{shipping_info.email}</p>
              </div>

              {/* Payment Summary */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Payment Method:</h3>
                <p className="text-gray-700">Card ending in {payment_info.cardNumber.slice(-4)}</p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg p-6 border border-blue-200 sticky top-4">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h3>

            {/* Items */}
            <div className="space-y-3 mb-6 pb-6 border-b border-blue-200">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Shipping:
                </span>
                <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'FREE'}</span>
              </div>
              <div className="pt-4 border-t-2 border-gray-300">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total:</span>
                  <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Free Shipping Info */}
            {shipping > 0 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                ℹ️ Free shipping on orders over $50
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
