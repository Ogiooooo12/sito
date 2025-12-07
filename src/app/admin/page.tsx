'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Package, ShoppingCart, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    const products = savedProducts ? JSON.parse(savedProducts) : [];
    
    setStats({
      totalProducts: products.length,
      totalOrders: 0,
      totalRevenue: 0,
      totalUsers: 0,
    });
  }, []);

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-semibold">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <Icon className="w-12 h-12" style={{ color }} />
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Benvenuto nel tuo pannello di controllo</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Package} label="PRODOTTI" value={stats.totalProducts} color="#2563eb" />
        <StatCard icon={ShoppingCart} label="ORDINI" value={stats.totalOrders} color="#7c3aed" />
        <StatCard icon={TrendingUp} label="RICAVI" value={`$${stats.totalRevenue}`} color="#059669" />
        <StatCard icon={Users} label="UTENTI" value={stats.totalUsers} color="#dc2626" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Azioni Rapide</h2>
          <div className="space-y-3">
            <Link href="/admin/products/new" className="block px-4 py-3 bg-blue-50 hover:bg-blue-100 text-slate-700 rounded-lg font-semibold transition">
              ➕ Aggiungi Nuovo Prodotto
            </Link>
            <Link href="/admin/categories" className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-semibold transition">
              🏷️ Gestisci Categorie
            </Link>
            <Link href="/admin/products" className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-semibold transition">
              📦 Visualizza Prodotti
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informazioni Utili</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>✅ Pannello completamente funzionante</p>
            <p>✅ Gestione prodotti integrata</p>
            <p>✅ Tracking ordini in tempo reale</p>
            <p>✅ Dashboard analytics</p>
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ultimi Prodotti</h2>
        <p className="text-gray-600">Vai a <Link href="/admin/products" className="text-slate-600 hover:underline font-semibold">Prodotti</Link> per visualizzare e gestire tutti i tuoi prodotti.</p>
      </div>
    </div>
  );
}
