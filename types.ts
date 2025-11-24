// Matching the requested Supabase Schema

export type Role = 'admin' | 'seller';

export interface Profile {
  id: string;
  role: Role;
  full_name: string;
  shop_name?: string;
}

export interface AppNavigation {
  id: string;
  label: string;
  path: string;
  parent_id: string | null;
  order_index: number;
  is_visible: boolean;
  children?: AppNavigation[]; // Helper for frontend recursion
}

export interface ContentBlock {
  type: 'hero' | 'features' | 'text' | 'cta';
  data: any; // Flexible JSONB structure
}

export interface DynamicPage {
  id: string;
  slug: string;
  title: string;
  content_blocks: ContentBlock[];
  is_published: boolean;
}

export interface ProductCatalog {
  id: string;
  title: string;
  category: string;
  base_price: number;
  mockup_template_url: string;
  is_active: boolean;
}

export interface SellerProduct {
  id: string;
  catalog_product_id: string;
  seller_id: string;
  design_file_url: string;
  final_mockup_url: string;
  selling_price: number;
  title: string;
  is_published: boolean;
}

export interface CartItem {
  id: string; // seller_product_id
  quantity: number;
  product: SellerProduct & { catalog: ProductCatalog };
}
