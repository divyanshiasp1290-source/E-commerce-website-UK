import { useState } from "react";
import { toast } from "sonner";
import { getWeb3FormsAccessKey } from "@/lib/web3forms";

export function InquiryForm({ productName, compact = false }: { productName?: string; compact?: boolean }) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    // Explicit required-field validation (native `required` is also present).
    if (!name) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!message) {
      toast.error("Please add a message.");
      return;
    }

    const accessKey = getWeb3FormsAccessKey();
    if (!accessKey) {
      toast.error("Email service is not configured. Please try again later.");
      return;
    }

    setLoading(true);

    try {
      // Web3Forms expects fields as FormData.
      // Endpoint: https://api.web3forms.com/submit
      const payload = new FormData();
      payload.append("access_key", accessKey);

      for (const [key, value] of formData.entries()) {
        payload.append(String(key), String(value));
      }

      // Include product context if present.
      if (productName) payload.append("productName", productName);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });

      // Web3Forms returns JSON.
      const data: unknown = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error("Unable to send your inquiry. Please try again.");
        return;
      }

      const ok = typeof data === "object" && data !== null && (data as any).success === true;
      if (!ok) {
        const messageFromApi =
          typeof data === "object" && data !== null && typeof (data as any).message === "string"
            ? (data as any).message
            : "Unable to send your inquiry.";
        toast.error(messageFromApi);
        return;
      }

      toast.success("Inquiry received — our trade desk will reply within one business day.");
      formEl.reset();
    } catch {
      toast.error("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {productName && (
        <div className="rounded-md border border-border/60 bg-secondary/50 px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">
          Inquiry for: <span className="text-foreground">{productName}</span>
        </div>
      )}
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field name="name" label="Full name" required />
        <Field name="email" label="Email" type="email" required />
      </div>
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field name="company" label="Company" />
        <Field name="country" label="Destination country" />
      </div>
      <Field name="quantity" label="Quantity / container size" placeholder="e.g. 20FT container, 5 MT, 1x40HC…" />
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Message</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Specifications, delivery terms (FOB / CIF / DAP), target port…"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </label>
      <button
        disabled={loading}
        className="rounded-md bg-primary py-3 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        {...rest}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

