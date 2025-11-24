import React from 'react';
import { CheckCircle, ArrowRight, Printer } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600 w-12 h-12" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Siparişiniz Alındı!</h1>
        <p className="text-gray-500 mb-8">Teşekkürler! Siparişiniz hazırlanmaya başlandı.</p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-100">
            <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Sipariş Numarası</p>
            <p className="text-2xl font-mono text-gray-900">#{orderId}</p>
        </div>

        <div className="space-y-3">
            <button 
                onClick={() => window.location.hash = '#/dashboard'}
                className="w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
                <Printer size={18} className="mr-2" />
                Sipariş Takibi (Dashboard)
            </button>
            
            <button 
                onClick={() => window.location.hash = '#/'}
                className="w-full flex items-center justify-center py-3 px-4 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors"
            >
                Alışverişe Devam Et
                <ArrowRight size={18} className="ml-2" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;