import type { Product, Category, BlogPost, Testimonial } from "@/lib/services/types";

// Category cover images
import IMG_COCOA from "@/assets/p1.avif";
import IMG_COFFEE from "@/assets/p2.jpeg";
import IMG_CASHEW from "@/assets/cashew.jpeg";

// Distinct per-product images (placeholders — replace with real photography later)
import P1 from "@/assets/products/p1.avif";
import P2 from "@/assets/products/p2.jpeg";
import P3 from "@/assets/products/p3.avif";
import P4 from "@/assets/products/p4.avif";
import P5 from "@/assets/products/p5.avif";
import P6 from "@/assets/products/p6.avif";
import P7 from "@/assets/products/p7.avif";
import P8 from "@/assets/products/p8.avif";
import P9 from "@/assets/products/p9.jpg";
import P10 from "@/assets/products/p10.jpg";
import P11 from "@/assets/products/p11.jpg";
import P12 from "@/assets/products/p12.jpg";

export const sampleCategories: Category[] = [
  { id: "c1", slug: "cocoa", name: "Cocoa", description: "Premium fermented cocoa beans, nibs, and butter.", image_url: null, parent_id: null, sort_order: 1, is_active: true },
  { id: "c2", slug: "coffee", name: "Coffee Beans", description: "Single-origin arabica and robusta green & roasted beans.", image_url: null, parent_id: null, sort_order: 2, is_active: true },
  { id: "c3", slug: "nuts-for-cashew", name: "Nuts", description: "Grade-A raw and processed cashew kernels.", image_url: null, parent_id: null, sort_order: 3, is_active: true },
  { id: "c4", slug: "grains-for-pearl-barley", name: "Grains", description: "Pearl barley grains for wholesale supply.", image_url: null, parent_id: null, sort_order: 4, is_active: true },
  { id: "c5", slug: "legumes-for-soybeans", name: "Legumes", description: "Soybeans for meal, oil, and industrial applications.", image_url: null, parent_id: null, sort_order: 5, is_active: true },
  { id: "c6", slug: "seeds-for-mixed-seeds-blend", name: "Seeds", description: "Mixed seeds blend for healthy snacking and baking.", image_url: null, parent_id: null, sort_order: 6, is_active: true },
];

export const categoryImage = (slug: string) => {
  switch (slug) {
    case "cocoa":
      return IMG_COCOA;
    case "coffee":
      return IMG_COFFEE;
    case "nuts-for-cashew":
      return IMG_CASHEW;
    case "grains-for-pearl-barley":
      return P3;
    case "legumes-for-soybeans":
      return P4;
    case "seeds-for-mixed-seeds-blend":
      return P5;
    default:
      return IMG_COCOA;
  }
};

const P = (
  id: string,
  slug: string,
  name: string,
  short: string,
  cat: string,
  imageUrl: string,
  featured = false,
  // optional inline specs (plain text)
  specs: string[] = [],
  // optional long plain-text description (your content)
  detail: string | null = null,
): Product => {
  const inlineFromSpecs = specs.length ? ` ${specs.join(" · ")}.` : "";

  return {
    id,
    slug,
    name,
    short_description: short,

    // Product page me short bhi show ho aur neeche aapka long content bhi.
    // Auto “Where it shines…” remove hai.
    description: detail ? `${short}${inlineFromSpecs}\n\n${detail}` : `${short}${inlineFromSpecs}`,

    category_id: cat,
    price_cents: 0,
    compare_at_price_cents: null,
    currency: "USD",
    sku: `LG-${id.toUpperCase()}`,
    stock: 0,
    is_active: true,
    is_featured: featured,
    metadata: {},
    images: [{ id: `${id}-i`, product_id: id, url: imageUrl, alt: name, sort_order: 0, is_primary: true }],
    category: sampleCategories.find((c) => c.id === cat) ?? null,
  };
};

export const sampleProducts: Product[] = [
  // Cocoa
  P(
    "p1",
    "Organic-Cocoa Beans",
    "Organic Cocoa Beans",
    "Premium quality cocoa beans for chocolate making",
    "c1",
    P1,
    true,
    [],
    "Experience the exceptional quality of our premium cocoa beans, meticulously handpicked at peak ripeness and sun-dried to preserve their rich, natural flavor. Ideal for artisanal chocolate making and elevating gourmet recipes, these cocoa beans boast a deep brown hue and are available in generous 1kg and 5kg packs. Unlock the essence of true chocolate craftsmanship and bring out the best in your culinary creations.",
  ),
  P(
    "p2",
    "Coffee Beans",
    "Coffee Beans",
    "Freshly roasted coffee beans for an authentic flavor",
    "c2",
    P2,
    true,
    [],
    "Indulge in the exquisite flavor and captivating aroma of our premium coffee beans, expertly selected for coffee lovers who appreciate quality in every cup. Perfect for brewing at home or serving in your café, these medium-roast beans deliver a bold, smooth taste with a rich, satisfying finish. Available in convenient 1 lb and 2 lb bags to suit any need. Experience the deep brown color and glossy sheen that promise freshness and exceptional quality in every brew.",
  ),

  // Grains
  P(
    "p3",
    "Pearl barley",
    "Pearl barley",
    "High-quality pearled barley grains",
    "c4",
    P3,
    false,
    [],
    "Discover our premium pearl barley, featuring meticulously selected, lustrous grains that deliver a naturally smooth texture and a subtly nutty flavor. Perfect for enriching soups, hearty stews, wholesome salads, and a variety of healthy dishes, this versatile grain is an excellent source of fiber and essential nutrients. Available in convenient 500g and 1kg packs, our pearl barley boasts a creamy, pale hue, ensuring every meal looks as good as it tastes. Elevate your everyday cooking with this kitchen staple.",
  ),

  // Legumes
  P(
    "p4",
    "Soybeans",
    "Soybeans",
    "High-quality whole soybeans for various uses",
    "c5",
    P4,
    true,
     [],
    "Discover our premium whole soybeans, meticulously selected for superior freshness, consistent quality, and exceptional nutritional value. Perfect for culinary use, food processing, or as high-grade animal feed, these soybeans offer versatility and reliability for every purpose. Each bean boasts a uniform size and a rich, golden hue, ensuring a visually appealing and nutrient-packed product you'll love.",
  ),

  // Seeds
  P(
    "p5",
    "Mixed Seeds Blend",
    "Mixed Seeds Blend",
    "A nutritious mix of seeds for healthy snacking or baking",
    "c6",
    P5,
    true,
     [],
    "Experience a nourishing crunch with our premium mixed seeds blend—featuring sunflower, pumpkin, sesame, and golden flax seeds. Perfect for elevating salads, yogurt, baked goods, and trail mixes, these nutrient-rich seeds bring a delightful texture and subtle, earthy flavor to any dish. Enjoy their natural color variations ranging from vibrant green and deep brown to warm golden hues. Packed conveniently in a resealable bag to maintain freshness, available in 250g and 500g sizes. Amp up your everyday meals with wholesome goodness you can taste.",
  ),
  P(
    "p6",
    "Hulled White Sesame Seeds",
    "Hulled White Sesame Seeds",
    "Premium quality hulled white sesame seeds for cooking and baking",
    "c6",
    P6,
    false,
     [],
    "Experience the premium quality of our hulled white sesame seeds, meticulously selected for superior purity and freshness. Each seed boasts a beautiful creamy-white color and delivers a robust, nutty flavor that elevates breads, salads, stir-fries, desserts, and countless other recipes. Packed with essential nutrients and offering a delicate crunch, these seeds are ideal for home kitchens and professional baking alike. Available in convenient packaging sizes to suit your culinary needs — add a wholesome touch to every dish with our versatile sesame seeds.",
  ),

  // Cashew nuts
  P(
    "p7",
    "Raw cashew nuts W320",
    "Raw cashew nuts W320",
    "Premium quality whole cashews",
    "c3",
    P7,
    true,
     [],
    "Discover the pure taste and delightful crunch of our premium raw cashew nuts, hand-selected for exceptional freshness and rich, natural flavor. Each batch features large, whole kernels in a creamy ivory hue—perfect for snacking, baking, or elevating your favorite recipes. Enjoy their versatile goodness as a nutritious treat or a gourmet ingredient in your kitchen.",
  ),
  P(
    "p8",
    "Raw Cashew Nuts with shell",
    "Raw Cashew Nuts with shell",
    "Premium quality unprocessed cashew nuts",
    "c3",
    P8,
    true,
     [],
    "Premium quality raw cashew nuts with shells intact, perfect for roasting, industrial processing, or customized use. Sourced for optimal freshness, each nut is carefully selected for uniform size and desirable natural color, ensuring excellent yield and superior taste. Ideal for wholesalers, food manufacturers, and bulk buyers seeking top-grade cashew nuts for their operations.",
  ),
];

export const sampleTestimonials: Testimonial[] = [
  { id: "t1", author_name: "Marcus L.", author_title: "Procurement Manager · Zurich", author_avatar_url: null, quote: "Consistent quality shipment after shipment. Documentation is always in order and lead times are honored — a reliable long-term partner.", rating: 5, sort_order: 1 },
  { id: "t2", author_name: "Aisha O.", author_title: "Roastery Owner · London", author_avatar_url: null, quote: "The green arabica is beautifully processed. Cup scores match the samples every time — that trust is rare in this industry.", rating: 5, sort_order: 2 },
];

export const samplePosts: BlogPost[] = [
  {
    id: "b1",
    slug: "understanding-cocoa-grades",
    title: "Understanding Cocoa Bean Grades",
    excerpt: "From Grade 1 fermented beans to industrial-grade lots — what buyers should know before signing a contract.",
    content:
      "Cocoa grading is standardized around bean count, defect rate, moisture, and fermentation index.\n\nGrade 1 beans have ≤ 3% mouldy, ≤ 3% slaty, and ≤ 3% otherwise defective beans per 300g sample.\n\nBuyers targeting fine chocolate applications should always request pre-shipment samples and third-party inspection at load port.",
    cover_image_url: IMG_COCOA,
    author_id: null,
    tags: ["cocoa", "sourcing"],
    is_published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: "b2",
    slug: "arabica-vs-robusta-buyers-guide",
    title: "Arabica vs Robusta — A Buyer's Guide",
    excerpt: "Cupping profiles, caffeine content, price cycles, and how to blend for a stable roastery menu.",
    content:
      "Arabica accounts for roughly 60% of global coffee production and commands a premium due to its more nuanced cup.\n\nRobusta brings body, crema, and caffeine — essential for espresso blends and instant coffee.\n\nSmart buyers hedge origin exposure by contracting from at least two producing regions each harvest cycle.",
    cover_image_url: IMG_COFFEE,
    author_id: null,
    tags: ["coffee", "guide"],
    is_published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: "b3",
    slug: "cashew-processing-explained",
    title: "Cashew Processing, Explained",
    excerpt: "From RCN to W240 kernels — the eight steps between the farm and your factory floor.",
    content:
      "Raw cashew nuts (RCN) go through calibration, steam conditioning, shelling, drying, peeling, grading, and vacuum packing before export.\n\nThe kernel grade (W180, W240, W320, W450) reflects nut count per pound — lower is larger and more valuable.\n\nMoisture must stay below 5% for shelf stability during ocean transit.",
    cover_image_url: IMG_CASHEW,
    author_id: null,
    tags: ["cashew", "processing"],
    is_published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
];

export async function fetchProducts(params?: { category?: string; search?: string; featured?: boolean }): Promise<Product[]> {
  return filter(sampleProducts, params);
}

function filter(list: Product[], params?: { category?: string; search?: string; featured?: boolean }) {
  let out = list;
  if (params?.category) out = out.filter((p) => p.category?.slug === params.category);
  if (params?.search) out = out.filter((p) => p.name.toLowerCase().includes(params.search!.toLowerCase()));
  if (params?.featured) out = out.filter((p) => p.is_featured);
  return out;
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  return sampleProducts.find((p) => p.slug === slug) ?? null;
}

export async function fetchCategories(): Promise<Category[]> {
  return sampleCategories;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  return sampleTestimonials;
}

export async function fetchPosts(): Promise<BlogPost[]> {
  return samplePosts;
}

export async function fetchPost(slug: string): Promise<BlogPost | null> {
  return samplePosts.find((p) => p.slug === slug) ?? null;
}

