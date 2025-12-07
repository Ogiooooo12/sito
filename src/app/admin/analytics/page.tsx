'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const data = [
    { month: 'Gen', revenue: 4000, orders: 24 },
    { month: 'Feb', revenue: 3000, orders: 13 },
    { month: 'Mar', revenue: 2000, orders: 9 },
    { month: 'Apr', revenue: 2780, orders: 39 },
    { month: 'May', revenue: 1890, orders: 48 },
    { month: 'Jun', revenue: 2390, orders: 38 },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Analytics</h1>

      {/* Charts */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Vendite Ultimi 6 Mesi</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="orders" stroke="#7c3aed" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 font-semibold mb-2">Ricavi Totali</h3>
          <p className="text-3xl font-bold text-blue-600">$18,140</p>
          <p className="text-green-600 text-sm mt-2">↑ 12% rispetto al mese scorso</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 font-semibold mb-2">Ordini Totali</h3>
          <p className="text-3xl font-bold text-purple-600">171</p>
          <p className="text-green-600 text-sm mt-2">↑ 8% rispetto al mese scorso</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 font-semibold mb-2">Ticket Medio</h3>
          <p className="text-3xl font-bold text-green-600">$106</p>
          <p className="text-red-600 text-sm mt-2">↓ 2% rispetto al mese scorso</p>
        </div>
      </div>
    </div>
  );
}
