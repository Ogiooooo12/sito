'use client';

import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  description: string;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Electronics', description: 'Prodotti elettronici' },
    { id: '2', name: 'Fashion', description: 'Abbigliamento e accessori' },
    { id: '3', name: 'Home & Garden', description: 'Casa e giardino' },
    { id: '4', name: 'Books', description: 'Libri' },
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const addCategory = () => {
    if (!newCategory.trim()) {
      alert('Per favore inserisci il nome della categoria');
      return;
    }

    const category: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCategory,
      description: newDescription,
    };

    setCategories([...categories, category]);
    setNewCategory('');
    setNewDescription('');
  };

  const deleteCategory = (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questa categoria?')) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Gestisci Categorie</h1>

      {/* Form Nuova Categoria */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">➕ Nuova Categoria</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Nome</label>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Es. Sportswear"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Descrizione</label>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Descrizione breve..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={addCategory}
          className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-8 py-2 rounded-lg font-semibold hover:shadow-lg transition"
        >
          ✅ Aggiungi
        </button>
      </div>

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <button
              onClick={() => deleteCategory(category.id)}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              🗑️ Elimina
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
