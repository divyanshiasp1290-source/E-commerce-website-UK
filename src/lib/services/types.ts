export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
  is_primary: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  category_id: string | null;
  price_cents: number;
  compare_at_price_cents: number | null;
  currency: string;
  sku: string | null;
  stock: number;
  is_active: boolean;
  is_featured: boolean;
  metadata: Record<string, unknown>;
  images?: ProductImage[];
  category?: Category | null;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  author_id: string | null;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  created_at: string;
};

export type Testimonial = {
  id: string;
  author_name: string;
  author_title: string | null;
  author_avatar_url: string | null;
  quote: string;
  rating: number | null;
  sort_order: number;
};

export type Address = {
  id: string;
  user_id: string;
  label: string | null;
  full_name: string;
  phone: string | null;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  postal_code: string;
  country: string;
  is_default_shipping: boolean;
  is_default_billing: boolean;
};

export type CartItem = {
  id: string;
  cart_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  unit_price_cents: number;
  product?: Product;
};

export type Order = {
  id: string;
  order_number: string;
  user_id: string | null;
  email: string;
  status:
    | "pending"
    | "paid"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  payment_status: "unpaid" | "paid" | "refunded" | "failed";
  currency: string;
  subtotal_cents: number;
  discount_cents: number;
  shipping_cents: number;
  tax_cents: number;
  total_cents: number;
  coupon_code: string | null;
  shipping_address: Record<string, unknown> | null;
  billing_address: Record<string, unknown> | null;
  notes: string | null;
  created_at: string;
};
