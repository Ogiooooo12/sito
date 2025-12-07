'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  description?: string;
  stock?: number;
}

export default function ProductForm() {
  const router = useRouter();
  const params = useParams();
  const isEdit = params?.id && params.id !== 'new';

  const [product, setProduct] = useState<Product>({
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    price: 0,
    category: 'Electronics',
    rating: 5,
    image: '',
    description: '',
    stock: 10,
  });

  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      // Carica il prodotto per modificarlo
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        const products = JSON.parse(savedProducts);
        const found = products.find((p: Product) => p.id === params?.id);
        if (found) {
          setProduct(found);
        }
      }
      setLoading(false);
    }
  }, [isEdit, params?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'rating' || name === 'stock' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validazione
    if (!product.name || !product.price || !product.image) {
      alert('Per favore compila tutti i campi obbligatori');
      return;
    }

    // Salva nel localStorage
    const savedProducts = localStorage.getItem('products') || '[]';
    const products = JSON.parse(savedProducts);

    if (isEdit) {
      // Modifica prodotto esistente
      const index = products.findIndex((p: Product) => p.id === params?.id);
      if (index !== -1) {
        products[index] = product;
      }
    } else {
      // Aggiungi nuovo prodotto
      products.push(product);
    }

    localStorage.setItem('products', JSON.stringify(products));
    alert(isEdit ? 'Prodotto modificato con successo!' : 'Prodotto creato con successo!');
    router.push('/admin/products');
  };

  if (loading) {
    return <div className="text-center text-gray-500">Caricamento...</div>;
  }

  return (
    <div>
      <Link href="/admin/products" className="text-blue-600 hover:text-blue-800 font-semibold mb-6 inline-block">
        ← Torna ai Prodotti
      </Link>

      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        {isEdit ? 'Modifica Prodotto' : 'Nuovo Prodotto'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 max-w-2xl">
        {/* Nome */}
        <div className="mb-6">
          <label className="block text-gray-900 font-semibold mb-2">Nome Prodotto *</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Es. Sony WH-1000XM4 Headphones"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>

        {/* Categoria */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-900 font-semibold mb-2">Categoria *</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            >
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home & Garden</option>
              <option value="Books">Books</option>
            </select>
          </div>

          {/* Prezzo */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">Prezzo ($) *</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>
        </div>

        {/* Rating e Stock */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-900 font-semibold mb-2">Rating ⭐ (0-5)</label>
            <input
              type="number"
              name="rating"
              value={product.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-gray-900 font-semibold mb-2">Stock (pezzi)</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
        </div>

        {/* URL Immagine */}
        <div className="mb-6">
          <label className="block text-gray-900 font-semibold mb-2">URL Immagine *</label>
          <input
            type="url"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
          {product.image && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Anteprima:</p>
              <img src={product.image} alt="Preview" className="w-40 h-40 object-cover rounded-lg" />
            </div>
          )}
        </div>

        {/* Descrizione */}
        <div className="mb-6">
          <label className="block text-gray-900 font-semibold mb-2">Descrizione</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Descrizione dettagliata del prodotto..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {isEdit ? '✅ Salva Modifiche' : '✅ Crea Prodotto'}
          </button>
          <Link
            href="/admin/products"
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 rounded-lg transition text-center"
          >
            ✕ Annulla
          </Link>
        </div>
      </form>
    </div>
  );
}
