import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Compass, Sprout, ShieldCheck, Handshake, Globe2, ArrowRight } from "lucide-react";
import banner from "@/assets/banners/about-banner.jpg";
import cocoa from "@/assets/about_1.jpeg";

import coffee from "@/assets/about_2.jpeg";
import cashew from "@/assets/cat-cashew.jpg";


export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — LunadiGroup Commodities" },
    { name: "description", content: "LunadiGroup is a global supplier of premium cocoa, coffee, nuts, and more — sourced directly at origin." },
    { property: "og:title", content: "About — LunadiGroup" },
    { property: "og:description", content: "Sourced at origin. Shipped worldwide." },
    { property: "og:image", content: banner },
  ] }),
  component: About,
});

function About() {
  return (
    <div>
      {/* Hero banner */}
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden md:h-[60vh]">
        <img src={banner} alt="Golden hour on a cocoa and coffee plantation" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-10 md:pb-16">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <p className="text-[15px] uppercase tracking-[0.45em] text-accent">Our Story</p>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
            Sourced at origin.<br /><em className="not-italic text-accent">Shipped worldwide.</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="container-luxe grid gap-10 py-16 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16 md:py-24">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Who we are</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">A trading house<br />built at origin.</h2>
          <p className="mt-6 text-muted-foreground text-lg">
            Lunadi Consulting Ltd is a supplier and exporter of high-quality agricultural commodities, specialising in cocoa beans, coffee beans, nuts, and more. We operate across the UK and Togo in West Africa, allowing us to source products directly and reliably from trusted producers.
We place our clients at the heart of everything we do. By listening carefully to their needs, we ensure that we deliver the right products to meet their exact requirements. We value our clients’ feedback and take their advice seriously, working closely with them to build strong partnerships and help both businesses achieve their goals.
          </p>
          <p className="mt-4 text-muted-foreground text-lg">
            From lot sampling to container loading, our team handles the details so buyers can focus on what they do best: making great chocolate, coffee, food, and heat.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <img src={cocoa} alt="Cocoa" className="aspect-[3/4] rounded-md object-cover" loading="lazy" />
          <img src={coffee} alt="Coffee" className="aspect-[3/4] translate-y-6 rounded-md object-cover md:translate-y-10" loading="lazy" />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-secondary/40 border-y border-border/60">
        <div className="container-luxe grid gap-6 py-16 md:grid-cols-2 md:gap-8 md:py-24 text-lg">
          <Card
            Icon={Target}
            title="Our Mission"
            body="Our mission at Lunadi Consulting Ltd is to supply and export high-quality agricultural commodities, including cocoa beans, coffee beans, cashew nuts, and more, sourced responsibly from West Africa. With operations in the UK and Togo, we are committed to understanding our clients’ needs and delivering products that meet their exact requirements. By valuing our clients’ advice and building strong partnerships, we aim to support mutual growth and help both businesses achieve their goals."
          />
          <Card
            Icon={Compass}
            title="Our Vision"
            body="Our vision at Lunadi Consulting Ltd is to become a leading global supplier of agricultural commodities. With operations in the UK and Togo, West Africa, we aim to deliver high-quality products such as cocoa beans, coffee beans, cashew nuts, and more to international markets. By listening to our clients, valuing their advice, and consistently meeting their expectations, we strive to build long-term partnerships and be recognised worldwide for reliability, quality, and excellence in agricultural supply."
          />
        </div>
      </section>

      {/* Values */}
      <section className="container-luxe py-16 md:py-24">
        <div className="mb-10 text-center md:mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">What we stand for</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">Values that shape every shipment</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Sprout, t: "Direct sourcing", d: "We buy directly from farming cooperatives — no unnecessary intermediaries between farmer and buyer." },
            { Icon: ShieldCheck, t: "Quality control", d: "Every lot is sampled, graded, and (when required) SGS-inspected before it leaves origin port." },
            { Icon: Handshake, t: "Fair partnerships", d: "We pay origin prices that keep farming communities profitable — season after season." },
            { Icon: Globe2, t: "Transparent trade", d: "Full documentation, honest pricing, and reliable lead times — the basics done properly." },
          ].map((v) => (
            <div key={v.t} className="rounded-md border border-border/60 bg-card p-6 transition hover:border-accent/60">
              <v.Icon className="size-6 text-accent" />
              <h3 className="mt-4 font-display text-xl md:text-2xl">{v.t}</h3>
              <p className="mt-2 text-base text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-luxe pb-16 md:pb-24">
        <div className="rounded-md border border-border/60 bg-primary px-6 py-14 text-center text-primary-foreground md:px-16 md:py-16">
          <h2 className="font-display text-3xl md:text-5xl">Let's build something together.</h2>
          <p className="mx-auto mt-4 max-w-lg opacity-80">
            Whether you're an importer, roastery, manufacturer, or distributor — we'd love to hear what you're sourcing.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-background px-7 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-foreground transition hover:bg-background/90"
          >
            Request a quote <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Card({
  Icon,
  title,
  body,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-md border border-border/60 bg-card p-8 md:p-10">
      <div className="flex items-center gap-3">
        <Icon className="size-6 text-accent" />
        <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
      </div>
      <p className="mt-5 text-muted-foreground">{body}</p>
    </div>
  );
}

