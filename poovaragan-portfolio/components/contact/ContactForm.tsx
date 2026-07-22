"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-strong rounded-2xl p-10 text-center">
        <CheckCircle2 className="mx-auto text-success mb-4" size={40} />
        <h3 className="font-display text-xl font-semibold mb-2">Message sent</h3>
        <p className="text-fg-muted text-sm">Thanks for reaching out — I'll reply as soon as I can.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8 space-y-5">
      <div>
        <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-fg-faint mb-2 block">
          Name
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-fg-faint mb-2 block">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-fg-faint mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400" aria-live="polite">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-accent py-3.5 text-sm font-medium disabled:opacity-60 shadow-glow-sm hover:shadow-glow transition-all"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
