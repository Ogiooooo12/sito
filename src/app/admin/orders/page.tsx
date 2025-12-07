'use client';

import { useState } from 'react';

interface Order {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  date: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customer: 'Mario Rossi',
      email: 'mario@example.com',
      total: 299.99,
      status: 'Delivered',
      date: '2025-12-05',
    },
    {
      id: 'ORD-002',
      customer: 'Luigi Verdi',
      email: 'luigi@example.com',
      total: 450.00,
      status: 'Shipped',
      date: '2025-12-06',
    },
  ]);

  const updateOrderStatus = (id: string, newStatus: Order['status']) => {
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
    );
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return '#fbbf24';
      case 'Processing':
        return '#3b82f6';
      case 'Shipped':
        return '#a855f7';
      case 'Delivered':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getStatusBg = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-slate-800';
      case 'Shipped':
        return 'bg-blue-100 text-slate-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Ordini</h1>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID Ordine</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cliente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Totale</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Data</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-bold text-slate-600">{order.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.email}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBg(order.status)} cursor-pointer border-0`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg">
          <p className="text-lg">Nessun ordine trovato</p>
        </div>
      )}
    </div>
  );
}
