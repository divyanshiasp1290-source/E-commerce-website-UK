import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/services/types";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0]?.url;

  return (
    <Link to="/product/$slug" params={{ slug: product.slug }} className="group flex flex-col">
      <div className="relative overflow-hidden rounded-md bg-muted aspect-[4/5]">
        {image ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground text-sm">No image</div>

        )}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 rounded-md bg-primary/95 px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex items-center justify-between">
          View details <ArrowUpRight className="size-4" />
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm uppercase tracking-[0.25em] text-accent">{product.category?.name}</p>

        <div className="mt-1 font-display text-2xl leading-tight font-bold">{product.name}</div>
        {product.short_description ? (
          <p className="mt-2 line-clamp-2 text-base text-muted-foreground">{product.short_description}</p>
        ) : null}
      </div>

    </Link>
  );
}
