import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "@/lib/catalog";
import { ProductCard } from "@/components/shop/ProductCard";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { z } from "zod";

const search = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: (s) => search.parse(s),
  head: () => ({ meta: [
    { title: "Shop — Cocoa, Coffee, Nuts and more | LunadiGroup" },
    { name: "description", content: "Browse our full catalog of export-grade cocoa beans, coffee, cashew kernels, and more. Wholesale and container loads." },
    { property: "og:title", content: "Shop — LunadiGroup" },
    { property: "og:description", content: "Export-grade agricultural commodities." },
  ] }),
  component: Shop,
});

function Shop() {
  const { category, q } = Route.useSearch();
  const nav = Route.useNavigate();
  const [term, setTerm] = useState(q ?? "");
  const products = useQuery({ queryKey: ["products", category, q], queryFn: () => fetchProducts({ category, search: q }) });
  const cats = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  // Keep local search input in sync with URL when route changes
  useEffect(() => { setTerm(q ?? ""); }, [q]);

  return (
    <div className="container-luxe py-10 md:py-12">
      <div className="mb-8 text-center md:mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">The Catalog</p>
        <h1 className="mt-3 font-display text-4xl md:text-6xl">
          {category ? cats.data?.find(c => c.slug === category)?.name ?? "Shop" : "All Products"}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
          Every product below is available for wholesale export. Click a product to review specifications and request a quote.
        </p>
      </div>

      {/* Filters — search + category dropdown in one row */}
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
        <form
          onSubmit={(e) => { e.preventDefault(); nav({ search: (s: Record<string, unknown>) => ({ ...s, q: term || undefined }) }); }}
          className="relative flex-1 sm:max-w-sm"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </form>
        <select
          value={category ?? ""}
          onChange={(e) => {
            const value = e.target.value || undefined;
            nav({ search: (s: Record<string, unknown>) => ({ ...s, category: value }) });
          }}
          className="rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring sm:w-56"
        >
          <option value="">All Categories</option>
          {(cats.data ?? []).map((c) => (
            <option key={c.id} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      {(products.data ?? []).length === 0 ? (
        <div className="py-24 text-center text-muted-foreground">
          <p>No products match your filters.</p>
          <Link to="/shop" search={{}} className="mt-4 inline-block underline underline-offset-4">Reset filters</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {(products.data ?? []).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
