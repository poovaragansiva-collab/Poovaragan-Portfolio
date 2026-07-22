"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function LeadCaptureForm({
  sessionId,
  onComplete,
}: {
  sessionId: string;
  onComplete: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", company: "", projectDetails: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "chat_assistant" }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setTimeout(onComplete, 1800);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass rounded-2xl p-5 text-center">
        <CheckCircle2 className="mx-auto text-success mb-2" size={28} />
        <p className="text-sm">Thanks — Poovaragan will follow up soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-4 space-y-3">
      <p className="text-xs font-mono uppercase tracking-wider text-fg-faint">Let's connect</p>
      <input
        required
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none"
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none"
      />
      <input
        placeholder="Company (optional)"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none"
      />
      <textarea
        required
        placeholder="Project details"
        rows={3}
        value={form.projectDetails}
        onChange={(e) => setForm({ ...form, projectDetails: e.target.value })}
        className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm focus:border-accent outline-none resize-none"
      />
      {status === "error" && <p className="text-xs text-red-400">Something went wrong. Try again.</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-accent py-2 text-sm font-medium disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
