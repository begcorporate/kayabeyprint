import React from 'react';
import { useStore } from '../store';
import { Settings, ShoppingCart, BarChart2, Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { catalog } = useStore();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Satıcı Paneli</h1>
        <p className="text-gray-500 mt-1">Mağazanızı ve ürünlerinizi buradan yönetin.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {['Toplam Satış', 'Aktif Siparişler', 'Mağaza Geliri', 'Ürün Sayısı'].map((stat, i) => (
          <div key={i} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart2 className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat}</dt>
                    <dd className="text-lg font-medium text-gray-900">{Math.floor(Math.random() * 1000)}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Catalog / Quick Start */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Yeni Ürün Oluştur</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalog.map(product => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center hover:border-brand-300 transition-colors">
            <img src={product.mockup_template_url} alt={product.title} className="h-32 w-auto object-contain mb-4" />
            <h3 className="font-semibold text-gray-900">{product.title}</h3>
            <p className="text-sm text-gray-500 mb-4">Başlangıç: ₺{product.base_price}</p>
            <a 
              href={`#/product/${product.id}`}
              className="mt-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-brand-700 bg-brand-100 hover:bg-brand-200 w-full justify-center"
            >
              <Plus size={16} className="mr-2" /> Tasarla
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;