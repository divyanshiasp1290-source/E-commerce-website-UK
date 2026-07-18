import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock, Ship } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm.tsx";
import banner from "@/assets/banners/contact-banner.avif";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — LunadiGroup Trade Desk" },
{ name: "description", content: "Request a quote or spec sheet for cocoa, coffee, and cashew. Our trade desk replies within one business day." },
    { property: "og:title", content: "Contact — LunadiGroup" },
    { property: "og:description", content: "Request a quote for our export commodities." },
    { property: "og:image", content: banner },
  ] }),
  component: Contact,
});

function Contact() {
  return (
    <div>
      {/* Hero banner */}
      <section className="relative h-[38vh] min-h-[280px] w-full overflow-hidden md:h-[50vh]">
        <img src={banner} alt="Aerial view of a container ship at golden hour" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="container-luxe relative z-10 flex h-full flex-col items-center justify-end pb-10 text-center md:pb-14">
          <p className="text-[15px] uppercase tracking-[0.45em] text-accent">Contact</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">Request a quote</h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
            Pricing, spec sheets, or container-load quotes — our trade desk replies within one business day.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-luxe py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-12">
          {/* Info column */}
          <aside className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent">Direct channels</p>
              <h2 className="mt-3 font-display text-2xl md:text-3xl">Talk to our trade desk</h2>
              <p className="mt-3 text-base text-muted-foreground">
                We are located in a prime area ready to serve customers globally with our high-quality agro products for export.
              </p>
            </div>
            <div className="space-y-5">
              <Info Icon={Mail} title="Trade desk" value="info@lunadigroup.com" href="mailto:info@lunadigroup.com" />
              <Info Icon={Phone} title="Phone" value="+447467162472" href="tel:+447467162472" />
              <Info Icon={MapPin} title="Head office" value="123 Agro Lane, City" />
              <Info Icon={Clock} title="Hours" value="9 AM - 5 PM" />
            </div>

            <div className="rounded-md border border-border/60 bg-secondary/40 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-accent">Response time</p>
              <p className="mt-2 text-base text-muted-foreground">
                All inquiries answered within <span className="text-foreground font-medium">1 business day</span>. Sample requests typically ship within 3–5 days from origin.
              </p>
            </div>
          </aside>

          {/* Form */}
          <div className="rounded-md border border-border/60 bg-card p-6 sm:p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Inquiry form</p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl">Send us a message</h2>
            <p className="mt-2 text-base text-muted-foreground">
              Include the product, target volume, and destination port for the most accurate quote.
            </p>
            <div className="mt-8">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Info({ Icon, title, value, href }: { Icon: React.ComponentType<{ className?: string }>; title: string; value: string; href?: string }) {
  const content = (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-5 text-accent" />
      <div>
        <div className="text-sm uppercase tracking-widest text-muted-foreground">{title}</div>
        <div className="mt-0.5 text-base">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:text-foreground">{content}</a> : content;
}
