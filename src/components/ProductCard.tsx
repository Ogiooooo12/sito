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
      <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border-2 border-slate-200 hover:border-amber-500">
        {/* Image Container */}
        <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
              -{discount}%
            </div>
          )}

          {/* Stock Status */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-transparent p-4 flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition font-bold shadow-lg"
              disabled={!inStock}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm">Add</span>
            </button>
            <button
              onClick={toggleWishlist}
              className={`bg-white/20 hover:bg-white/40 text-white py-2.5 px-4 rounded-lg transition font-semibold ${
                isWishlisted ? 'bg-red-500/40 hover:bg-red-500/60' : ''
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-amber-600 transition text-base">
              {name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-600 font-semibold">({reviews})</span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">
              {formatPrice(discountedPrice)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-slate-500 line-through font-semibold">
                {formatPrice(price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
