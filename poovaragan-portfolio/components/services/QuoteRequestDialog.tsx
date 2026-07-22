"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Service } from "@/lib/data/services";

export default function QuoteRequestDialog({
  service,
  onClose,
}: {
  service: Service | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", company: "", projectDetails: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (service) {
      setStatus("idle");
      setForm({ name: "", email: "", company: "", projectDetails: "" });
    }
  }, [service]);

  useEffect(() => {
    document.body.style.overflow = service ? "hidden" : "";
  }, [service]);

  if (!service) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "quote_request",
          serviceInterest: service!.title,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Request a quote for ${service.title}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-2xl w-full max-w-md p-7 relative"
        >
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-5 right-5 text-fg-muted hover:text-fg-primary transition-colors"
          >
            <X size={18} />
          </button>

          {status === "success" ? (
            <div className="text-center py-6">
              <CheckCircle2 className="mx-auto text-success mb-4" size={40} />
              <h3 className="font-display text-xl font-semibold mb-2">Request sent</h3>
              <p className="text-fg-muted text-sm">
                Thanks — I'll get back to you shortly about {service.title.toLowerCase()}.
              </p>
            </div>
          ) : (
            <>
              <p className="eyebrow mb-2">Request a Quote</p>
              <h3 className="font-display text-xl font-semibold mb-6">{service.title}</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none transition-colors"
                />
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none transition-colors"
                />
                <input
                  placeholder="Company (optional)"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none transition-colors"
                />
                <textarea
                  required
                  placeholder="Tell me about your project..."
                  rows={4}
                  value={form.projectDetails}
                  onChange={(e) => setForm({ ...form, projectDetails: e.target.value })}
                  className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none transition-colors resize-none"
                />

                {status === "error" && (
                  <p className="text-sm text-red-400" aria-live="polite">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-full bg-accent py-3 text-sm font-medium disabled:opacity-60 transition-opacity"
                >
                  {status === "submitting" ? "Sending..." : "Send Request"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
