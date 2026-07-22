"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import MessageBubble, { ChatRole } from "./MessageBubble";
import SuggestedPrompts from "./SuggestedPrompts";
import LeadCaptureForm from "./LeadCaptureForm";

type Message = { role: ChatRole; content: string };

const HIRING_INTENT_PATTERNS = [
  /\bhire\b/i,
  /\bquote\b/i,
  /\bbudget\b/i,
  /work with (you|him|poovaragan)/i,
  /let'?s work together/i,
  /available for (freelance|work|hire|internship)/i,
  /\bfreelance\b/i,
  /\binternship\b/i,
  /interested in (working|hiring)/i,
];

function detectHiringIntent(text: string) {
  return HIRING_INTENT_PATTERNS.some((p) => p.test(text));
}

export default function ChatWindow({ sessionId }: { sessionId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Poovaragan's AI assistant. Ask me about his projects, services, AI Lab experiments, or writing — or ask if he's available for freelance work.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, showLeadForm]);

  async function sendMessage(text: string) {
    if (!text.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsStreaming(true);

    if (detectHiringIntent(text)) {
      setShowLeadForm(true);
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: text,
          history: nextMessages.slice(-10),
        }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantContent += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantContent };
          return updated;
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again or reach out via the contact form.",
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        {showLeadForm && (
          <LeadCaptureForm sessionId={sessionId} onComplete={() => setShowLeadForm(false)} />
        )}
      </div>

      {messages.length <= 1 && <SuggestedPrompts onSelect={sendMessage} />}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-center gap-2 p-3 border-t border-border"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about projects, services, availability..."
          className="flex-1 bg-white/5 border border-border rounded-full px-4 py-2.5 text-sm focus:border-accent outline-none transition-colors"
          disabled={isStreaming}
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          aria-label="Send message"
          className="h-10 w-10 shrink-0 rounded-full bg-accent flex items-center justify-center disabled:opacity-50 transition-opacity"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
