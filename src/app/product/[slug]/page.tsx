'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { useState, use } from 'react';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // Mock product data - in real app would fetch from API
  const product = {
    id: '1',
    name: 'Premium Wireless Headphones Pro Max',
    slug: slug,
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    rating: 4.8,
    reviews: 245,
    inStock: true,
    description: `Experience premium sound quality with our advanced wireless headphones. 
      Features active noise cancellation, 30-hour battery life, and premium comfort padding 
      for all-day wear.`,
    features: [
      'Active Noise Cancellation (ANC)',
      '30-hour battery life',
      'Premium comfort padding',
      'Bluetooth 5.3 connectivity',
      'Foldable design with carrying case',
      'Multi-device pairing',
      'Built-in microphone for calls',
      'Touch controls',
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32 Ohm',
      'Weight': '250g',
      'Bluetooth': '5.3',
      'Colors': 'Black, Silver, Navy Blue',
    },
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
    toast.success('Added to cart!');
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Shopping
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Product Image */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-square bg-gradient-to-br from-blue-100 via-blue-100 to-blue-100 rounded-2xl overflow-hidden flex items-center justify-center group cursor-pointer">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.discount > 0 && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                -{product.discount}%
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-gray-700">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            </div>
            <p className="text-blue-600 font-semibold">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </p>
          </div>

          {/* In Stock */}
          <div className="mb-6">
            <p className={`text-lg font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? '✓ In Stock' : 'Out of Stock'}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

          {/* Quantity and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-blue-50 transition"
              >
                −
              </button>
              <span className="px-6 py-2 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-blue-50 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className={`px-6 py-3 rounded-lg border-2 font-bold transition ${
                isWishlisted
                  ? 'bg-blue-50 border-blue-600 text-blue-600'
                  : 'border-gray-300 text-gray-700 hover:border-blue-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-blue-600' : ''}`} />
            </button>
          </div>

          {/* Shipping Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">🚚 Free shipping</span> on orders over $50
            </p>
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-semibold">✓ 30-day returns</span> for full refund
            </p>
          </div>
        </div>
      </div>

      {/* Features and Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-y border-blue-200">
        {/* Features */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Key Features</h2>
          <ul className="space-y-3">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specifications */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Specifications</h2>
          <div className="space-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-blue-100 pb-3">
                <span className="font-semibold text-gray-700">{key}</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Customer Reviews</h2>
        <div className="space-y-6">
          {[1, 2, 3].map((review) => (
            <div key={review} className="border-l-4 border-blue-600 pl-6 py-4">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="font-semibold text-gray-900 mb-2">Excellent product!</p>
              <p className="text-gray-600 mb-3">
                Great quality and delivered quickly. Very satisfied with this purchase.
              </p>
              <p className="text-sm text-gray-500">by Customer • 2 days ago</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
