import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import banner from "@/assets/banners/faq-banner.jpg";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [
    { title: "FAQ — LunadiGroup" },
    { name: "description", content: "Frequently asked questions about sourcing, shipping, pricing, quality control, and payment terms for LunadiGroup commodities." },
    { property: "og:title", content: "FAQ — LunadiGroup" },
    { property: "og:description", content: "Answers on sourcing, shipping, pricing, and quality control." },
    { property: "og:image", content: banner },
  ] }),
  component: Faq,
});

const GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "General",
    items: [
      { q: "What does Lunadi Consulting Ltd specialize in?", a: "Lunadi Consulting Ltd is a leading supplier and exporter of agricultural commodities, specializing in cocoa beans, coffee beans, and cashew nuts. We serve clients across international markets with reliable supply and consistent quality." },
      { q: "Why choose Lunadi Consulting Ltd as your supplier?", a: "Clients choose us for our: Consistent product quality, Competitive pricing, Reliable supply chain, Professional customer support, Long-term partnership approach" },
       ],
  },
  {
    title: "Ordering & Pricing",
    items: [
      { q: "What quantities can Lunadi Consulting Ltd supply?", a: "We offer flexible order quantities, from small trial orders to large bulk shipments. Our logistics network allows us to scale supply according to customer demand." },
      { q: "Can Lunadi Consulting Ltd customize orders?", a: "Absolutely. We provide customized packaging, grading, and shipment options to meet specific customer needs and market requirements." },
      { q: "How can I place an order or request a quotation?", a: "You can contact Lunadi Consulting Ltd directly through our website, email, or phone. Our team will respond promptly with product details, pricing, and shipping options." },
        ],
  },
  {
    title: "Sourcing & Quality",
    items: [
      { q: "Where are your products sourced from?", a: "Our products are sourced from trusted producers and farming cooperatives in key agricultural regions. We work closely with our partners to ensure ethical sourcing, quality control, and compliance with international standards." },
      { q: "What quality standards do your products meet?", a: "All our products are carefully selected, processed, and packaged to meet international export and quality standards. We conduct inspections to ensure freshness, proper grading, and consistency before shipment." },
      { q: "Do you supply both raw and processed products?", a: "Yes. Depending on customer requirements, we supply raw or processed cocoa, coffee beans, and cashew nuts, as well as high-quality charcoal suitable for domestic, commercial, and industrial use." },
      { q: "Is your charcoal sustainably produced?", a: "Yes. Our charcoal is sourced from responsible producers who follow sustainable and environmentally conscious practices, ensuring efficiency, low emissions, and long-lasting burn quality." },
    ],
  },
  {
    title: "Shipping & Logistics",
    items: [
      { q: "Which countries do you export to?", a: "We export to multiple international markets across Europe, Asia, the Middle East, and Africa, and we are continuously expanding our global reach." },
      { q: "How do you ensure reliable delivery?", a: "We work with experienced logistics partners and use secure packaging methods to ensure timely and safe delivery. Customers are kept informed throughout the shipping process." },
      ],
  },
];

function Faq() {
  return (
    <div>
      <section className="relative h-[38vh] min-h-[280px] w-full overflow-hidden md:h-[50vh]">
        <img src={banner} alt="Warehouse of stacked jute burlap sacks in warm light" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="container-luxe relative z-10 flex h-full flex-col items-center justify-end pb-10 text-center md:pb-14">
          <p className="text-[15px] uppercase tracking-[0.45em] text-accent">Support</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Frequently asked questions</h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
            Everything you need to know about sourcing, shipping, pricing, and quality control.
          </p>
        </div>
      </section>

      <section className="container-luxe py-20">
        <div className="mx-auto max-w-2xl space-y-14">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="mb-6 font-display text-3xl">{g.title}</h2>
              <div className="divide-y divide-border/60 rounded-md border border-border/60 bg-card">
                {g.items.map((it, i) => <Item key={i} q={it.q} a={it.a} />)}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-4xl rounded-md border border-border/60 bg-primary p-10 text-center text-primary-foreground">
          <h3 className="font-display text-5xl">Still have questions?</h3>
          <p className="mx-auto mt-5 max-w-md opacity-80 text-lg">
            Our trade desk answers every inquiry within one business day — no bots, no runaround.
          </p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] text-foreground hover:bg-background/90">
            Contact us <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-medium text-base">{q}</span>
        <ChevronDown className={`size-4 shrink-0 text-accent transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-6 pb-5 text-base text-muted-foreground">{a}</div>}
    </div>
  );
}
