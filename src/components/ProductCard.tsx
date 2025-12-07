'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  discount,
  image,
  rating,
  reviews,
  inStock,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inStock) {
      toast.error('Out of stock');
      return;
    }

    addItem({
      productId: id,
      quantity: 1,
      name,
      price: discountedPrice,
      image,
    });
    toast.success('Added to cart');
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <Link href={`/product/${slug}`}>
      <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative bg-gray-100 aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
              -{discount}%
            </div>
          )}

          {/* Stock Status */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent p-3 flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-pink-600 hover:shadow-lg text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
              disabled={!inStock}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">Add</span>
            </button>
            <button
              onClick={toggleWishlist}
              className={`bg-white/20 hover:bg-white/30 text-white py-2 px-3 rounded-lg transition ${
                isWishlisted ? 'bg-white/40' : ''
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition">
              {name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">({reviews})</span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(discountedPrice)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
