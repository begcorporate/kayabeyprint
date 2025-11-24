import React, { useState } from 'react';
import { useStore } from '../store';
import { ArrowLeft, Upload, Type, Layers, Save } from 'lucide-react';

interface Props {
  catalogId: string;
  onBack: () => void;
}

const ProductDesigner: React.FC<Props> = ({ catalogId, onBack }) => {
  const { catalog, addToCart } = useStore();
  const product = catalog.find(p => p.id === catalogId);
  const [sellingPrice, setSellingPrice] = useState(product ? product.base_price * 1.5 : 0);
  const [designTitle, setDesignTitle] = useState('');

  if (!product) return <div>Ürün bulunamadı</div>;

  const handleSave = () => {
    // Mock saving the product
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      catalog_product_id: product.id,
      seller_id: 'current_user',
      design_file_url: 'mock_url',
      final_mockup_url: product.mockup_template_url,
      selling_price: sellingPrice,
      title: designTitle || product.title,
      is_published: true
    };
    
    addToCart(newProduct, product);
    alert('Ürün sepete eklendi!');
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Designer Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-16 z-40">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{product.title} Tasarla</h1>
            <p className="text-xs text-gray-500">Taban Fiyat: ₺{product.base_price}</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm"
        >
          <Save size={18} className="mr-2" />
          Kaydet & Ekle
        </button>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Tools Sidebar */}
        <div className="w-full lg:w-80 bg-white border-r border-gray-200 p-6 space-y-8 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ürün Başlığı</label>
            <input 
              type="text" 
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 p-2 border" 
              placeholder="Örn: Yaz Tatili T-Shirt"
              value={designTitle}
              onChange={(e) => setDesignTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Satış Fiyatı (₺)</label>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">₺</span>
              <input 
                type="number" 
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 p-2 border"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
              />
            </div>
            <p className="text-xs text-brand-600 mt-1">
              Kârınız: ₺{(sellingPrice - product.base_price).toFixed(2)}
            </p>
          </div>

          <div className="space-y-3">
             <h3 className="text-sm font-medium text-gray-900 border-b pb-2">Katmanlar</h3>
             <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-brand-500 hover:text-brand-500 transition-colors">
               <Upload size={20} className="mr-2" />
               Görsel Yükle
             </button>
             <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
               <Type size={20} className="mr-2" />
               Yazı Ekle
             </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center p-8 relative overflow-hidden">
          <div className="relative bg-white shadow-2xl rounded-lg overflow-hidden max-w-lg w-full">
            <img 
              src={product.mockup_template_url} 
              alt="Template" 
              className="w-full h-auto"
            />
            {/* Simulation of Print Area */}
            <div className="absolute top-[25%] left-[30%] w-[40%] h-[50%] border-2 border-dashed border-brand-400 bg-brand-50/20 flex items-center justify-center">
               <span className="text-brand-600 text-xs font-bold uppercase tracking-widest opacity-50 pointer-events-none">
                 Baskı Alanı
               </span>
               {/* Simulated Design Layer */}
               <div className="absolute text-center">
                  <p className="text-4xl font-black text-gray-800 rotate-[-5deg]">
                    {designTitle || 'DESIGN HERE'}
                  </p>
               </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg shadow-lg">
             <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center"><Layers size={16} className="mr-1"/> Ön</div>
                <div className="flex items-center"><Layers size={16} className="mr-1"/> Arka</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDesigner;