'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    // Simulated stats - in production, fetch from API
    setStats({
      totalProducts: 15,
      totalOrders: 0,
      totalRevenue: 0,
      totalUsers: 0,
    });
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Card Prodotti */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">PRODOTTI</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </div>

        {/* Card Ordini */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">ORDINI</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </div>

        {/* Card Revenue */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-pink-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">RICAVI</p>
              <p className="text-3xl font-bold text-gray-800">${stats.totalRevenue}</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        {/* Card Utenti */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">UTENTI</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-2">Benvenuto nel Panel Amministrativo</h2>
        <p className="text-indigo-100">
          Gestisci i tuoi prodotti, categorie, ordini e visualizza statistiche in tempo reale.
        </p>
      </div>
    </div>
  );
}
