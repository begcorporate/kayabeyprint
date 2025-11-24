import React, { useState } from 'react';
import { useStore } from '../store';
import { Lock, Mail, User, Store } from 'lucide-react';

const Register: React.FC = () => {
  const { register } = useStore();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'seller' | 'admin'>('seller'); // Simplification: defaulting user to seller for POD platform context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await register(email, fullName, role);
    setLoading(false);
    window.location.hash = '#/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Kayabey Print'e Katılın
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Zaten hesabınız var mı?{' '}
          <a href="#/login" className="font-medium text-brand-600 hover:text-brand-500">
            Giriş Yapın
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Role Selection Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg mb-6">
                <button
                    type="button"
                    onClick={() => setRole('seller')}
                    className={`flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        role === 'seller' ? 'bg-white shadow text-brand-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <Store size={16} className="mr-2" />
                    Satıcı Ol
                </button>
                <button
                    type="button"
                    onClick={() => setRole('admin')} // In real app, Admin registration is restricted
                    className={`flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        role === 'admin' ? 'bg-white shadow text-brand-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <User size={16} className="mr-2" />
                    Müşteri Ol
                </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border"
                  placeholder="Adınız Soyadınız"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">E-posta Adresi</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Şifre</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  required
                  className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border"
                  placeholder="En az 6 karakter"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Hesap Oluşturuluyor...' : 'Kayıt Ol'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;