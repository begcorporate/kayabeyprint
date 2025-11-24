import { create } from 'zustand';
import { AppNavigation, DynamicPage, ProductCatalog, SellerProduct, CartItem, Profile } from './types';

// --- MOCK DATA (Simulating Supabase Tables) ---

const MOCK_NAVIGATION: AppNavigation[] = [
  { id: '1', label: 'Ana Sayfa', path: '/', parent_id: null, order_index: 0, is_visible: true },
  { id: '2', label: 'Erkek', path: '/kategori/erkek', parent_id: null, order_index: 1, is_visible: true },
  { id: '3', label: 'Kadın', path: '/kategori/kadin', parent_id: null, order_index: 2, is_visible: true },
  { id: '4', label: 'Çocuk', path: '/kategori/cocuk', parent_id: null, order_index: 3, is_visible: true },
  { id: '5', label: 'Hakkımızda', path: '/sayfa/hakkimizda', parent_id: null, order_index: 4, is_visible: true },
  { id: '6', label: 'Tasarla & Sat', path: '/dashboard', parent_id: null, order_index: 5, is_visible: true },
];

const MOCK_CATALOG: ProductCatalog[] = [
  { 
    id: 'c1', 
    title: 'Premium Pamuk T-Shirt', 
    category: 'erkek', 
    base_price: 120, 
    mockup_template_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800', 
    is_active: true 
  },
  { 
    id: 'c2', 
    title: 'Unisex Hoodie', 
    category: 'unisex', 
    base_price: 250, 
    mockup_template_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800', 
    is_active: true 
  },
  { 
    id: 'c3', 
    title: 'Bez Çanta (Tote Bag)', 
    category: 'aksesuar', 
    base_price: 80, 
    mockup_template_url: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?auto=format&fit=crop&q=80&w=800', 
    is_active: true 
  },
];

const MOCK_PAGES: DynamicPage[] = [
  {
    id: 'p1',
    slug: 'home',
    title: 'Ana Sayfa',
    is_published: true,
    content_blocks: [
      {
        type: 'hero',
        data: {
          heading: 'Hayalindeki Ürünü Tasarla ve Sat',
          subheading: 'Kayabey Print ile Türkiye\'nin en hızlı büyüyen Print-on-Demand platformunda risksiz e-ticarete başla.',
          buttonText: 'Hemen Başla',
          buttonLink: '/dashboard',
          bgImage: 'https://images.unsplash.com/photo-1570158495096-f949826d7f93?auto=format&fit=crop&q=80&w=1920'
        }
      },
      {
        type: 'features',
        data: {
          title: 'Neden Kayabey Print?',
          items: [
            { title: 'Yüksek Kalite', desc: 'En iyi kumaşlar ve baskı teknolojileri.' },
            { title: 'Hızlı Kargo', desc: 'Türkiye\'nin her yerine 3 günde teslimat.' },
            { title: 'Stok Tutma Yok', desc: 'Sadece satış yaptığında ödeme yaparsın.' }
          ]
        }
      }
    ]
  }
];

// --- ZUSTAND STORE ---

interface AppState {
  navigation: AppNavigation[];
  catalog: ProductCatalog[];
  dynamicPages: DynamicPage[];
  cart: CartItem[];
  user: Profile | null; // Auth state
  isLoading: boolean;
  
  // Actions
  fetchInitialData: () => Promise<void>;
  addToCart: (product: SellerProduct, catalog: ProductCatalog) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  login: (email: string) => Promise<void>;
  register: (email: string, fullName: string, role: 'seller' | 'admin') => Promise<void>;
  logout: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  navigation: [],
  catalog: [],
  dynamicPages: [],
  cart: [],
  user: null,
  isLoading: true,

  fetchInitialData: async () => {
    // Simulating API latency
    set({ isLoading: true });
    setTimeout(() => {
      set({
        navigation: MOCK_NAVIGATION.sort((a, b) => a.order_index - b.order_index),
        catalog: MOCK_CATALOG,
        dynamicPages: MOCK_PAGES,
        isLoading: false,
      });
    }, 800);
  },

  addToCart: (product, catalog) => {
    set((state) => {
      const existing = state.cart.find(item => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return {
        cart: [...state.cart, { id: product.id, quantity: 1, product: { ...product, catalog } }]
      };
    });
  },

  removeFromCart: (itemId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId)
    }));
  },

  clearCart: () => {
    set({ cart: [] });
  },

  login: async (email) => {
    // Mock Login
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            set({ 
                user: {
                    id: 'u1',
                    full_name: 'Demo Kullanıcı',
                    role: 'seller',
                    shop_name: 'Harika Tasarımlar'
                }
            });
            resolve();
        }, 1000);
    });
  },

  register: async (email, fullName, role) => {
    // Mock Register
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            set({ 
                user: {
                    id: 'u2',
                    full_name: fullName,
                    role: role,
                    shop_name: role === 'seller' ? 'Yeni Mağaza' : undefined
                }
            });
            resolve();
        }, 1000);
    });
  },

  logout: () => {
    set({ user: null });
    // Redirect to home handled in component or basic hash change
    window.location.hash = '#/';
  }
}));