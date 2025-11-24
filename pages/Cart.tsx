import React from 'react';
import { useStore } from '../store';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + (item.product.selling_price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 29.90;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-brand-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sepetiniz Boş</h2>
          <p className="text-gray-500 mb-8">Henüz hayalinizdeki ürünü tasarlamadınız mı?</p>
          <button 
            onClick={() => window.location.hash = '#/'}
            className="w-full py-3 px-4 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors"
          >
            Alışverişe Başla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Alışveriş Sepeti</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Cart Items List */}
          <section className="lg:col-span-7">
            <ul className="bg-white rounded-lg shadow-sm divide-y divide-gray-100 overflow-hidden">
              {cart.map((item) => (
                <li key={item.id} className="p-6 flex sm:flex-row flex-col">
                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden bg-gray-100 mb-4 sm:mb-0">
                    <img
                      src={item.product.final_mockup_url}
                      alt={item.product.title}
                      className="w-full h-full object-center object-contain"
                    />
                  </div>

                  <div className="ml-0 sm:ml-6 flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.product.title}
                      </h3>
                      <p className="ml-4 text-lg font-medium text-gray-900">
                        ₺{item.product.selling_price.toFixed(2)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Baz Ürün: {item.product.catalog.title}
                    </p>
                    
                    <div className="flex-1 flex items-end justify-between text-sm mt-4">
                      <p className="text-gray-500">Adet: <span className="font-semibold text-gray-900">{item.quantity}</span></p>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-red-500 hover:text-red-600 flex items-center"
                      >
                        <Trash2 size={16} className="mr-1" /> Sil
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order Summary */}
          <section className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Sipariş Özeti</h2>
              
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Ara Toplam</dt>
                  <dd className="text-sm font-medium text-gray-900">₺{subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <dt className="text-sm text-gray-600">Kargo</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {shipping === 0 ? <span className="text-green-600">Ücretsiz</span> : `₺${shipping.toFixed(2)}`}
                  </dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="text-base font-bold text-gray-900">Toplam</dt>
                  <dd className="text-base font-bold text-brand-600">₺{total.toFixed(2)}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  onClick={() => window.location.hash = '#/checkout'}
                  className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
                >
                  Ödemeye Geç <ArrowRight size={20} className="ml-2" />
                </button>
                <p className="mt-4 text-center text-xs text-gray-500">
                  Güvenli ödeme altyapısı ile korunmaktadır.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cart;