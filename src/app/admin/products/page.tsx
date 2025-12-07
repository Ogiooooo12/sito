'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';

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
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
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
    return <div className="text-center text-gray-500 py-12">Caricamento...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Prodotti</h1>
          <p className="text-gray-600 mt-2">{products.length} prodotto{products.length !== 1 ? 'i' : ''}</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-slate-900 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          <Plus className="w-4 h-4" />
          Nuovo Prodotto
        </Link>
      </div>

      {/* Products Table */}
      {products.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nome</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Categoria</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Prezzo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-600">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                        ⭐ {product.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-3">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-slate-600 hover:text-slate-800 font-semibold flex items-center gap-1"
                        >
                          <Edit2 className="w-4 h-4" /> Modifica
                        </Link>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" /> Elimina
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-lg text-gray-500 mb-4">Nessun prodotto trovato</p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 font-semibold"
          >
            <Plus className="w-4 h-4" />
            Crea il primo prodotto
          </Link>
        </div>
      )}
    </div>
  );
}
