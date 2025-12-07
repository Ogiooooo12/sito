'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [storageData, setStorageData] = useState<any>(null);

  useEffect(() => {
    const products = localStorage.getItem('products');
    setStorageData(products ? JSON.parse(products) : null);
  }, []);

  const clearStorage = () => {
    localStorage.clear();
    setStorageData(null);
    alert('✅ Storage cleared!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Debug Storage</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">localStorage Status</h2>
          <p className="text-gray-700 mb-4">
            Prodotti nel localStorage: <span className="font-bold text-blue-600">{storageData?.length || 0}</span>
          </p>
          <button
            onClick={clearStorage}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Clear All Storage
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Products Data</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm">
            {JSON.stringify(storageData, null, 2) || 'No data'}
          </pre>
        </div>

        <div className="mt-8">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
