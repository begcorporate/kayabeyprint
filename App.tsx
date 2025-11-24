import React, { useEffect, useState } from 'react';
import { useStore } from './store';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ProductDesigner from './pages/ProductDesigner';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  const { fetchInitialData, isLoading, user } = useStore();
  
  // Simple Hash Router Implementation for the Demo
  const [route, setRoute] = useState(window.location.hash || '#/');
  
  useEffect(() => {
    fetchInitialData();

    const handleHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [fetchInitialData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto"></div>
          <p className="mt-4 text-gray-500 font-medium animate-pulse">Kayabey Print Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Basic Router Switch
  const renderContent = () => {
    // --- Public Routes ---
    if (route === '#/login') return <Login />;
    if (route === '#/register') return <Register />;
    
    // --- Protected Routes ---
    if (route === '#/dashboard') {
        if (!user) {
            // Redirect to login if not authenticated
            window.location.hash = '#/login';
            return null;
        }
        return <Dashboard />;
    }

    if (route.startsWith('#/product/')) {
      const id = route.split('/')[2];
      return <ProductDesigner catalogId={id} onBack={() => window.location.hash = '#/'} />;
    }

    if (route === '#/cart') return <Cart />;
    if (route === '#/checkout') return <Checkout />;
    if (route === '#/order-success') return <OrderSuccess />;
    
    // Default to Home
    return <Home />;
  };

  const isDesigner = route.startsWith('#/product/');
  const isCheckout = route === '#/checkout';
  const isSuccess = route === '#/order-success';
  const isAuthPage = route === '#/login' || route === '#/register';
  
  const hideNav = isDesigner || isCheckout || isSuccess || isAuthPage;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-brand-100 selection:text-brand-900">
      {!hideNav && <Navigation />}
      <main>
        {renderContent()}
      </main>
      
      {!hideNav && (
        <footer className="bg-gray-50 border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
             <div className="mb-4 md:mb-0">
               <span className="text-xl font-bold text-gray-400">Kayabey Print</span>
               <p className="text-sm text-gray-500 mt-1">© 2024 Tüm hakları saklıdır.</p>
             </div>
             <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500">Gizlilik</a>
                <a href="#" className="text-gray-400 hover:text-gray-500">Şartlar</a>
                <a href="#" className="text-gray-400 hover:text-gray-500">İletişim</a>
             </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;