'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const savedPassword = localStorage.getItem('adminPassword');
    if (savedPassword) {
      setIsLoggedIn(true);
      setAdminPassword(savedPassword);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, use proper authentication)
    if (password === 'admin123') {
      setIsLoggedIn(true);
      setAdminPassword(password);
      localStorage.setItem('adminPassword', password);
    } else {
      alert('Password errata!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAdminPassword('');
    localStorage.removeItem('adminPassword');
    router.push('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Panel</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Password Admin</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Inserisci password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition"
            >
              Accedi
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">StoreLux Admin</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="flex">
        <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
          <nav className="space-y-4">
            <Link
              href="/admin"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              📊 Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              📦 Prodotti
            </Link>
            <Link
              href="/admin/products/new"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              ➕ Nuovo Prodotto
            </Link>
            <Link
              href="/admin/categories"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              🏷️ Categorie
            </Link>
            <Link
              href="/admin/orders"
              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              📋 Ordini
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  );
}
