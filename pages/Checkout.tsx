import React, { useState } from 'react';
import { useStore } from '../store';
import { ArrowLeft, Lock, CreditCard } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useStore();
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.selling_price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 29.90;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      clearCart();
      window.location.hash = '#/order-success';
    }, 1500);
  };

  if (cart.length === 0) {
    window.location.hash = '#/';
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center mb-8">
            <button onClick={() => window.location.hash = '#/cart'} className="text-gray-500 hover:text-gray-900 mr-4">
                <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Güvenli Ödeme</h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-6">
            <form id="checkout-form" onSubmit={handleSubmit}>
                
                {/* Contact Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">İletişim Bilgileri</h2>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">E-posta Adresi</label>
                            <input type="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-brand-500 focus:border-brand-500" />
                        </div>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Teslimat Adresi</h2>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ad</label>
                            <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-brand-500 focus:border-brand-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Soyad</label>
                            <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-brand-500 focus:border-brand-500" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Adres</label>
                            <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-brand-500 focus:border-brand-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Şehir</label>
                            <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-brand-500 focus:border-brand-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Posta Kodu</label>
                            <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-brand-500 focus:border-brand-500" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Telefon</label>
                            <input type="tel" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-brand-500 focus:border-brand-500" />
                        </div>
                    </div>
                </div>

                {/* Payment (Visual only for mock) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Ödeme Yöntemi</h2>
                    <div className="border border-brand-500 bg-brand-50 p-4 rounded-lg flex items-center mb-4 cursor-pointer">
                        <CreditCard className="text-brand-600 mr-3" />
                        <span className="font-medium text-brand-900">Kredi / Banka Kartı</span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Kart Numarası</label>
                            <input type="text" placeholder="0000 0000 0000 0000" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-brand-500 focus:border-brand-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Son Kullanma (Ay/Yıl)</label>
                            <input type="text" placeholder="MM/YY" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-brand-500 focus:border-brand-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">CVC</label>
                            <input type="text" placeholder="123" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-brand-500 focus:border-brand-500" />
                        </div>
                    </div>
                </div>

            </form>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Siparişiniz</h2>
              
              <ul className="divide-y divide-gray-100 mb-6 max-h-60 overflow-y-auto">
                  {cart.map(item => (
                      <li key={item.id} className="py-3 flex">
                          <img src={item.product.final_mockup_url} className="h-12 w-12 rounded border border-gray-200 object-contain" alt="" />
                          <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-gray-900">{item.product.title}</p>
                              <p className="text-xs text-gray-500">Adet: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">₺{(item.product.selling_price * item.quantity).toFixed(2)}</p>
                      </li>
                  ))}
              </ul>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Ara Toplam</span>
                  <span>₺{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Kargo</span>
                  <span>{shipping === 0 ? 'Ücretsiz' : `₺${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2">
                  <span>Toplam Tutar</span>
                  <span>₺{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full mt-6 bg-brand-600 text-white py-4 rounded-full font-bold hover:bg-brand-700 transition-colors flex justify-center items-center disabled:opacity-50"
              >
                {loading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                    <>
                        <Lock size={18} className="mr-2" />
                        {total.toFixed(2)}₺ Öde
                    </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;