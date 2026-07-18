import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { fetchPost } from "@/lib/catalog";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await fetchPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.post.title} — LunadiGroup Blog` : "Blog" },
      { name: "description", content: loaderData?.post.excerpt ?? "" },
      { property: "og:title", content: loaderData?.post.title ?? "" },
      { property: "og:description", content: loaderData?.post.excerpt ?? "" },
      ...(loaderData?.post.cover_image_url ? [{ property: "og:image", content: loaderData.post.cover_image_url }] : []),
    ],
  }),
  notFoundComponent: () => <div className="container-luxe py-24 text-center"><h1 className="font-display text-3xl">Post not found</h1></div>,
  errorComponent: ({ error }) => <div className="container-luxe py-24 text-center text-destructive">{error.message}</div>,
  component: Post,
});

function Post() {
  const { post } = Route.useLoaderData();
  return (
    <article className="container-luxe py-16">
      <div className="mx-auto max-w-3xl">
        <Link to="/blog" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent">← Blog</Link>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">{post.title}</h1>
        {post.excerpt && <p className="mt-4 text-xl text-muted-foreground">{post.excerpt}</p>}

      </div>
      {post.cover_image_url && (
        <img src={post.cover_image_url} alt={post.title} className="mx-auto mt-10 max-h-[600px] w-full rounded-md object-cover" />
      )}
      <div className="mx-auto mt-10 max-w-2xl whitespace-pre-line text-base leading-relaxed text-foreground/90">
        {post.content}
      </div>
    </article>
  );
}
