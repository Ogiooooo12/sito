'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LogOut, Menu, X } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [password, setPassword] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const savedPassword = localStorage.getItem('adminPassword');
    if (savedPassword) {
      setIsLoggedIn(true);
      setAdminPassword(savedPassword);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">StoreLux</h1>
            <p className="text-gray-600">Admin Panel</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">Accedi al Pannello</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Accedi
            </button>
          </form>
          <p className="text-center text-gray-600 text-sm mt-6">Password: <span className="font-mono text-gray-800">admin123</span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-2xl font-bold text-blue-600">StoreLux Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-slate-900 text-white min-h-screen transition-all duration-300 overflow-hidden`}>
          <nav className="p-6 space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Menu</div>
            
            <Link
              href="/admin"
              className="block px-4 py-3 rounded-lg hover:bg-blue-600 transition font-semibold text-white"
            >
              📊 Dashboard
            </Link>
            
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-3">Gestione</div>
            
            <Link
              href="/admin/products"
              className="block px-4 py-3 rounded-lg hover:bg-blue-600 transition font-semibold text-white"
            >
              📦 Prodotti
            </Link>
            
            <Link
              href="/admin/products/new"
              className="block px-4 py-3 rounded-lg hover:bg-blue-600 transition font-semibold text-white"
            >
              ➕ Nuovo Prodotto
            </Link>
            
            <Link
              href="/admin/categories"
              className="block px-4 py-3 rounded-lg hover:bg-blue-600 transition font-semibold text-white"
            >
              🏷️ Categorie
            </Link>
            
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-3">Vendite</div>
            
            <Link
              href="/admin/orders"
              className="block px-4 py-3 rounded-lg hover:bg-blue-600 transition font-semibold text-white"
            >
              📋 Ordini
            </Link>
            
            <Link
              href="/admin/analytics"
              className="block px-4 py-3 rounded-lg hover:bg-blue-600 transition font-semibold text-white"
            >
              📈 Analytics
            </Link>

            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-3">Altro</div>
            
            <Link
              href="/"
              className="block px-4 py-3 rounded-lg hover:bg-blue-600 transition font-semibold text-white"
            >
              🛍️ Visita Sito
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  );
}
