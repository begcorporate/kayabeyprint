import React from 'react';
import { useStore } from '../store';
import { ArrowRight, CheckCircle, Package } from 'lucide-react';

const Home: React.FC = () => {
  const { dynamicPages, catalog } = useStore();
  const homePage = dynamicPages.find(p => p.slug === 'home');

  if (!homePage) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {homePage.content_blocks.map((block, index) => {
        // --- HERO BLOCK ---
        if (block.type === 'hero') {
          return (
            <div key={index} className="relative bg-gray-900 overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="w-full h-full object-cover opacity-40"
                  src={block.data.bgImage}
                  alt="Hero Background"
                />
              </div>
              <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {block.data.heading}
                </h1>
                <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                  {block.data.subheading}
                </p>
                <div className="mt-10 max-w-sm sm:flex sm:max-w-none">
                  <button 
                    onClick={() => window.location.hash = '#/catalog'}
                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-brand-900 bg-brand-500 hover:bg-brand-400 md:py-4 md:text-lg md:px-10 transition-all shadow-lg shadow-brand-500/30"
                  >
                    {block.data.buttonText}
                    <ArrowRight className="ml-2" size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        }

        // --- FEATURES BLOCK ---
        if (block.type === 'features') {
          return (
            <div key={index} className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                  <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase">Avantajlar</h2>
                  <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    {block.data.title}
                  </p>
                </div>

                <div className="mt-10">
                  <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                    {block.data.items.map((item: any, i: number) => (
                      <div key={i} className="relative">
                        <dt>
                          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                            <CheckCircle size={24} />
                          </div>
                          <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{item.title}</p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500">
                          {item.desc}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}

      {/* Hardcoded Catalog Preview Section (Visualizing Phase 5) */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Popüler Ürünler</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {catalog.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 h-64 relative">
                  <img
                    src={product.mockup_template_url}
                    alt={product.title}
                    className="w-full h-full object-center object-cover"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        <a href={`#/product/${product.id}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.title}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 capitalize">{product.category}</p>
                    </div>
                    <p className="text-lg font-medium text-brand-600">₺{product.base_price}</p>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                     <Package size={16} className="mr-2" /> Stokta Mevcut
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;