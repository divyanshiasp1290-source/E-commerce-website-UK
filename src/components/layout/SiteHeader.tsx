import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV: { label: string; to: string }[] = [
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="hidden border-b border-border/60 bg-secondary/50 sm:block">
        <div className="container-luxe flex h-8 items-center justify-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Global export of premium cocoa · coffee · nuts · grains · seeds
        </div>
      </div>
      <div className="container-luxe grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 md:h-20">
        <button
          className="md:hidden -ml-2 rounded p-2 hover:bg-secondary"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link to="/" className="hidden md:block">
          <span className="font-display text-2xl tracking-tight">LUNADIGROUP</span>
        </Link>

        <nav className="hidden justify-center gap-8 text-sm md:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="text-foreground/75 transition hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="md:hidden justify-self-center">
          <span className="font-display text-xl tracking-tight">LUNADIGROUP</span>
        </Link>

        <div className="justify-self-end">
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center rounded-md bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:bg-primary/90"
          >
            Request Quote
          </Link>
        </div>
      </div>

      <div className={cn("md:hidden overflow-hidden border-t border-border/60 transition-[max-height]", open ? "max-h-96" : "max-h-0")}>
        <nav className="container-luxe flex flex-col divide-y divide-border/60">
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} onClick={() => setOpen(false)} className="py-3 text-sm">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
