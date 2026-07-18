import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-[#3b2411]" style={{ backgroundColor: "#3b2411" }}>
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        <div className="text-white">
          <div className="font-display text-2xl tracking-tight">LUNADIGROUP</div>
          <p className="mt-3 text-base text-white/80 max-w-xs">
A global supplier of premium cocoa, coffee beans, cashew, grains, legumes, seeds, and more — sourced at origin, exported worldwide.

          </p>
          <div className="mt-4 flex gap-3 text-white/80">
            <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram className="size-4" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook className="size-4" /></a>
          </div>
        </div>

        <FooterCol title="Products">
          <Link to="/shop">All Products</Link>
          <Link to="/shop" search={{ category: "cocoa" } as never}>Cocoa</Link>
          <Link to="/shop" search={{ category: "coffee" } as never}>Coffee Beans</Link>
          <Link to="/shop" search={{ category: "cashew" } as never}>Cashew</Link>
          <Link to="/shop" search={{ category: "grains-for-pearl-barley" } as never}>Pearl Barley</Link>
          <Link to="/shop" search={{ category: "legumes-for-soybeans" } as never}>Soybeans</Link>
          <Link to="/shop" search={{ category: "seeds-for-mixed-seeds-blend" } as never}>Mixed Seeds Blend</Link>
          <Link to="/shop" search={{ category: "nuts-for-cashew" } as never}>Nuts</Link>
        </FooterCol>
        <FooterCol title="Company">
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </FooterCol>
        <div className="text-white">
          <div className="mb-3 text-sm uppercase tracking-[0.25em] text-white">Trade Desk</div>
          <div className="flex flex-col gap-3 text-base text-white/80">

            <a href="mailto:info@lunadigroup.com" className="flex items-center gap-2 hover:text-white"><Mail className="size-4" /> info@lunadigroup.com</a>
            <div className="flex items-start gap-2"><MapPin className="mt-0.5 size-4" /><span>123 Agro Lane, City</span></div>
          </div>
        </div>

      </div>
      <div className="border-t border-border/60" style={{ backgroundColor: "#3b2411" }}>
        <div className="container-luxe flex flex-col items-center justify-center gap-2 py-6 text-sm text-white sm:flex-row">
          <div className="text-white">© {new Date().getFullYear()} LunadiGroup. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="text-white">
      <div className="mb-3 text-xs uppercase tracking-[0.25em] text-white">{title}</div>
      <div className="flex flex-col gap-2 text-sm text-white/80 [&_a:hover]:text-white">
        {children}
      </div>
    </div>
  );
}

