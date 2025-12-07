'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Account</h1>
        <p className="text-lg text-gray-600">Account features coming soon!</p>
      </div>
    </div>
  );
}
