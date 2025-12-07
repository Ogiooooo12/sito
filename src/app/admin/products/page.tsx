'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carica i prodotti dal localStorage o da una API
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Prodotti di default
      setProducts([
        {
          id: '1',
          name: 'Sony WH-1000XM4 Headphones',
          price: 349.99,
          category: 'Electronics',
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        },
        {
          id: '2',
          name: 'Apple Watch Series 7',
          price: 399.99,
          category: 'Electronics',
          rating: 4.7,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        },
        {
          id: '3',
          name: 'Leather Jacket',
          price: 199.99,
          category: 'Fashion',
          rating: 4.5,
          image: 'https://images.unsplash.com/photo-1597044054444-981c0216b5ea?w=500',
        },
      ]);
    }
    setLoading(false);
  }, []);

  const deleteProduct = (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Caricamento...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Gestisci Prodotti</h1>
        <Link
          href="/admin/products/new"
          className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          ➕ Nuovo Prodotto
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">Categoria</th>
              <th className="px-6 py-3 text-left">Prezzo</th>
              <th className="px-6 py-3 text-left">Rating</th>
              <th className="px-6 py-3 text-left">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 font-semibold text-gray-800">{product.name}</td>
                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                <td className="px-6 py-4 font-bold text-indigo-600">${product.price}</td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ {product.rating}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold mr-4"
                  >
                    ✏️ Modifica
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    🗑️ Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-4">Nessun prodotto trovato</p>
          <Link
            href="/admin/products/new"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Crea il primo prodotto
          </Link>
        </div>
      )}
    </div>
  );
}
