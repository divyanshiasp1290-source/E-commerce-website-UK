import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/catalog";
import banner from "@/assets/banners/blog-banner.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [
    { title: "Blog — LunadiGroup" },
    { name: "description", content: "Market insights, sourcing guides, and industry updates on cocoa, coffee, nuts, grains and seeds." },
    { property: "og:title", content: "Blog — LunadiGroup" },
    { property: "og:description", content: "Market insights and sourcing guides." },
    { property: "og:image", content: banner },
  ] }),
  component: Blog,
});

function Blog() {
  const posts = useQuery({ queryKey: ["posts"], queryFn: () => fetchPosts() });

  return (
    <div>
      {/* Hero banner */}
      <section className="relative h-[38vh] min-h-[280px] w-full overflow-hidden md:h-[50vh]">
        <img src={banner} alt="Coffee beans, cocoa pods and cashews on ivory linen" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="container-luxe relative z-10 flex h-full flex-col items-center justify-end pb-10 text-center md:pb-14">
          <p className="text-[15px] uppercase tracking-[0.45em] text-accent">Blog</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Market insights & sourcing guides</h1>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">
            Field notes, buyer's guides, and industry perspectives from our trade desk.
          </p>
        </div>
      </section>

      <div className="container-luxe py-16">
        {(posts.data ?? []).length === 0 ? (
          <p className="py-24 text-center text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-10">
            {(posts.data ?? []).map((p) => (
              <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-md bg-muted">
                  {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-[12px] uppercase tracking-widest text-accent">
                  {p.tags.map((t) => <span key={t}>#{t}</span>)}
                </div>
                <h2 className="mt-2 font-display text-3xl">{p.title}</h2>
                <p className="mt-1 text-base text-muted-foreground">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
