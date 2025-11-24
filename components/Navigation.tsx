import React, { useState } from 'react';
import { useStore } from '../store';
import { Menu, X, ShoppingBag, User, LogOut } from 'lucide-react';

const Navigation: React.FC = () => {
  const { navigation, cart, user, logout } = useStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.location.hash = '#/'}>
            <span className="text-2xl font-bold tracking-tight text-brand-500">
              Kayabey<span className="text-gray-900">Print</span>
            </span>
          </div>

          {/* Desktop Menu - Dynamically Rendered */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => window.location.hash = item.path} 
                className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => window.location.hash = '#/cart'}
              className="relative p-2 text-gray-600 hover:text-brand-600 transition-colors"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user ? (
               <div className="hidden md:flex items-center space-x-4">
                  <button 
                    onClick={() => window.location.hash = '#/dashboard'}
                    className="text-sm font-medium text-gray-700 hover:text-brand-600 flex items-center"
                  >
                    <User size={20} className="mr-2" />
                    {user.full_name}
                  </button>
                  <button 
                    onClick={logout}
                    className="text-gray-400 hover:text-red-600"
                    title="Çıkış Yap"
                  >
                    <LogOut size={20} />
                  </button>
               </div>
            ) : (
                <button 
                  onClick={() => window.location.hash = '#/login'}
                  className="hidden md:flex items-center text-sm font-medium text-gray-700 hover:text-brand-600"
                >
                  <User size={20} className="mr-2" />
                  Giriş
                </button>
            )}
            
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg h-screen">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                   window.location.hash = item.path;
                   setIsMobileOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50 w-full text-left"
              >
                {item.label}
              </button>
            ))}
            
            <div className="border-t border-gray-200 mt-4 pt-4">
                {user ? (
                    <>
                        <button 
                            onClick={() => { window.location.hash = '#/dashboard'; setIsMobileOpen(false); }}
                            className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <User size={20} className="mr-2" />
                            {user.full_name}
                        </button>
                        <button 
                            onClick={() => { logout(); setIsMobileOpen(false); }}
                            className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 mt-2"
                        >
                            <LogOut size={20} className="mr-2" />
                            Çıkış Yap
                        </button>
                    </>
                ) : (
                    <button 
                        onClick={() => { window.location.hash = '#/login'; setIsMobileOpen(false); }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-brand-600 bg-brand-50 mt-2"
                    >
                        Giriş Yap / Kayıt Ol
                    </button>
                )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;