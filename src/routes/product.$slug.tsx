import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct, fetchProducts } from "@/lib/catalog";
import { useState } from "react";


export const Route = createFileRoute("/product/$slug")({
  loader: async ({ params }) => {
    const product = await fetchProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.name} — LunadiGroup` : "Product — LunadiGroup" },
      { name: "description", content: loaderData?.product.short_description ?? "" },
      { property: "og:title", content: loaderData?.product.name ?? "Product" },
      { property: "og:description", content: loaderData?.product.short_description ?? "" },
      ...(loaderData?.product.images?.[0]?.url ? [{ property: "og:image", content: loaderData.product.images[0].url }] : []),
    ],
  }),
  notFoundComponent: () => (
    <div className="container-luxe py-24 text-center">
      <h1 className="font-display text-3xl">Product not found</h1>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-luxe py-24 text-center text-destructive">{error.message}</div>
  ),

  component: Product,
});

function Product() {
  const { product } = Route.useLoaderData();
  const [imgIdx, setImgIdx] = useState(0);

  const related = useQuery({
    queryKey: ["related", product.id],
    queryFn: () => fetchProducts({ search: undefined }),
    enabled: true,
  });



  type Img = { id: string; url: string };
  const images: Img[] = (product.images ?? []) as Img[];

  return (
    <div className="container-luxe py-8 md:py-12">
      <nav className="mb-6 text-xs text-muted-foreground md:mb-8">
        <Link to="/">Home</Link> · <Link to="/shop">Shop</Link> · <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_1.1fr] md:gap-12 md:items-start">
        {/* Image column — reduced size */}
        <div className="mx-auto w-full max-w-md md:max-w-none">
          <div className="overflow-hidden rounded-md bg-muted aspect-square">
            {images[imgIdx]?.url && <img src={images[imgIdx].url} alt={product.name} className="h-full w-full object-cover" />}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {images.map((im, i) => (
                <button key={im.id} onClick={() => setImgIdx(i)} className={`h-16 w-16 overflow-hidden rounded ${i === imgIdx ? "ring-2 ring-accent" : ""}`}>
                  <img src={im.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">{product.category?.name}</p>
          <h1 className="mt-2 font-display text-3xl leading-tight sm:text-4xl md:text-5xl font-bold">{product.name}</h1>
          <p className="mt-5 whitespace-pre-line text-muted-foreground text-lg">{product.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
              aria-label={`Request quote for ${product.name}`}
            >
              Request Quote
            </a>
          </div>
        </div>

      </div>

      {/* Related products */}
      <section className="mt-16">
        <div className="mb-8">
          <h2 className="font-display text-3xl md:text-4xl">You may also like</h2>
        </div>

        {related.isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-72 rounded-md bg-muted" />
            ))}
          </div>
        ) : related.data && related.data.length ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-0">
            {related.data
              .filter((p) => p.id !== product.id)
              .slice(0, 5)
              .map((p) => (
                <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }} className="group flex flex-col">
                  <div className="relative overflow-hidden rounded-md bg-muted aspect-[4/5]">
                    {p.images?.[0]?.url ? (
                      <img
                        src={p.images[0].url}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-muted-foreground text-xs">No image</div>
                    )}
                    <div className="absolute inset-x-3 bottom-3 translate-y-2 rounded-md bg-primary/95 px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex items-center justify-between md:opacity-0">
                      View details
                    </div>
                    <div className="absolute inset-x-3 bottom-3 rounded-md bg-primary/95 px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground md:hidden flex items-center justify-between">
                      View details
                    </div>
                  </div>
                  <div className="mt-3 md:pb-4 pb-6">
                    <p className="text-[14px] uppercase tracking-[0.25em] text-accent">{p.category?.name}</p>
                    <div className="mt-1 font-display text-2xl leading-tight font-bold">{p.name}</div>
                    {p.short_description ? (
                      <p className="mt-2 line-clamp-2 whitespace-pre-line text-base text-muted-foreground">
                        {p.short_description}
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <div className="py-10 text-center text-muted-foreground">No related products found.</div>
        )}
      </section>

    </div>
  );
}

