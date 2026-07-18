import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchTestimonials, fetchCategories, fetchPosts, categoryImage } from "@/lib/catalog";
import { ProductCard } from "@/components/shop/ProductCard";
import heroImage from "@/assets/hero-new.jpg";
import { ArrowRight, Globe2, Ship, ShieldCheck, Sprout, Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LunadiGroup — Premium Cocoa, Coffee, Nuts, Grains and Seeds. Exporter" },
      { name: "description", content: "Global wholesale supplier of premium cocoa beans, coffee beans, and cashew kernels. Sourced at origin, exported worldwide." },
      { property: "og:title", content: "LunadiGroup — Premium Agricultural Commodity Exporter" },
      { property: "og:description", content: "Cocoa · Coffee · Cashew · Coffee · Nuts · Grains · Seeds — export-grade, quality-controlled at origin." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = useQuery({ queryKey: ["products", "featured"], queryFn: () => fetchProducts({ featured: true }) });
  const cats = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const testimonials = useQuery({ queryKey: ["testimonials"], queryFn: fetchTestimonials });
  const posts = useQuery({ queryKey: ["posts"], queryFn: () => fetchPosts() });

  return (
    <div>
      {/* Hero — luxurious full-bleed with editorial overlay */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[72vh] w-full md:min-h-[86vh]">
          <img
            src={heroImage}
            alt="Premium cocoa beans, green coffee, white cashew kernels, and many more— LunadiGroup's four export commodities"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          <div className="container-luxe relative z-10 flex min-h-[72vh] items-center py-16 md:min-h-[86vh] md:py-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-accent" />
                <p className="text-sm uppercase tracking-[0.45em] text-accent">Est. Global Commodity House</p>

              </div>
              <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98]">
                Natural resources.<br />
                <em className="not-italic text-accent">Global trust.</em>
              </h1>
              <p className="mt-8 max-w-lg text-base text-muted-foreground md:text-lg">
                LunadiGroup is a premium supplier of cocoa, coffee, nuts and more — sourced directly from farming cooperatives at origin and delivered to importers, roasteries, and manufacturers in over 10 countries.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/shop" className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground transition hover:bg-primary/90">
                  Explore products <ArrowRight className="size-4" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-background/60 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.25em] backdrop-blur transition hover:border-primary hover:bg-background">
                  Request a quote
                </Link>
              </div>

              <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border/60 pt-6">
                <Stat n="10+" l="Countries served" />
                <Stat n="3+" l="Years in trade" />
                <Stat n="100+" l="Container shipments" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value bar */}
      <section className="border-y border-border/60 bg-secondary/40">
        <div className="container-luxe grid gap-3 py-8 sm:grid-cols-2 md:grid-cols-4">
          {[
            { Icon: Sprout, title: "Sourced at origin", sub: "Direct farm & co-op partnerships." },
            { Icon: ShieldCheck, title: "Quality guaranteed", sub: "Pre-shipment sampling & SGS inspection." },
            { Icon: Ship, title: "Worldwide shipping", sub: "FOB, CIF, DAP incoterms available." },
            { Icon: Globe2, title: "10+ countries", sub: "Trusted by importers globally." },
          ].map(({ Icon, title, sub }) => (
            <div key={title} className="flex items-start gap-3">

              <Icon className="mt-0.5 size-7 text-accent" />
              <div>
                <div className="text-base font-medium">{title}</div>
                <div className="text-base text-muted-foreground">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-luxe py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent">Categories</p>

              <h2 className="mt-2 font-display text-4xl md:text-5xl">Our six commodities</h2>

            </div>
            <Link to="/shop" className="text-sm underline underline-offset-4 hover:text-accent">View all</Link>
          </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">

          {(cats.data ?? []).map((c) => (
            <Link key={c.id} to="/shop" search={{ category: c.slug } as never} className="group relative overflow-hidden rounded-md bg-muted">
              <div className="aspect-[3/4]">
                <img
                  src={categoryImage(c.slug)}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent p-5">
                <div className="font-display text-2xl">{c.name}</div>
                <div className="text-sm uppercase tracking-widest text-accent">Explore →</div>

              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container-luxe pb-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Featured</p>

            <h2 className="mt-2 font-display text-4xl">Popular exports</h2>

          </div>
          <Link to="/shop" className="text-sm underline underline-offset-4 hover:text-accent">See all</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-5">
          {(featured.data ?? []).slice(0, 5).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Editorial block */}
      <section className="mt-24 bg-primary text-primary-foreground">
        <div className="container-luxe grid gap-10 py-24 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] opacity-70">Our Approach</p>

            <h2 className="mt-2 font-display text-4xl md:text-6xl">From the farm gate<br />to your factory floor.</h2>
            <p className="mt-6 max-w-md opacity-80">
              We work directly with farming cooperatives across West Africa, Southeast Asia, and Latin America to guarantee traceability, fair pricing at origin, and consistent quality shipment after shipment.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 border-b border-primary-foreground pb-1 text-sm uppercase tracking-[0.25em]">

              Our story <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={categoryImage("cocoa")} alt="Cocoa" className="aspect-[3/4] rounded-md object-cover" loading="lazy" />
            <img src={categoryImage("coffee")} alt="Coffee" className="aspect-[3/4] translate-y-8 rounded-md object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-luxe py-24">
        <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Client voices</p>

          <h2 className="mt-2 font-display text-4xl md:text-5xl">Trusted by buyers worldwide</h2>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {(testimonials.data ?? []).map((t) => (
            <figure key={t.id} className="relative rounded-md border border-border/60 bg-card p-8">
              <Quote className="absolute right-6 top-6 size-6 text-accent/30" />
              <div className="text-accent">{"★".repeat(t.rating ?? 5)}</div>
              <blockquote className="mt-4 font-display text-2xl leading-snug">"{t.quote}"</blockquote>
              <figcaption className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">

                {t.author_name} · {t.author_title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>


      
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-foreground">{n}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">{l}</div>

    </div>
  );
}
