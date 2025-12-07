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
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Gestisci Ordini</h1>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Ordine ID</th>
              <th className="px-6 py-3 text-left">Cliente</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Totale</th>
              <th className="px-6 py-3 text-left">Data</th>
              <th className="px-6 py-3 text-left">Stato</th>
              <th className="px-6 py-3 text-left">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 font-bold text-indigo-600">{order.id}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">{order.customer}</td>
                <td className="px-6 py-4 text-gray-600">{order.email}</td>
                <td className="px-6 py-4 font-bold text-gray-800">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-600">{order.date}</td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)} cursor-pointer`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button className="text-indigo-600 hover:text-indigo-800 font-semibold">👁️ Dettagli</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Nessun ordine trovato</p>
        </div>
      )}
    </div>
  );
}
