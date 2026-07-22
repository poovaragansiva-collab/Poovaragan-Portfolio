import { cn } from "@/lib/utils";

export type ChatRole = "user" | "assistant";

export default function MessageBubble({ role, content }: { role: ChatRole; content: string }) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "bg-accent text-white rounded-br-md"
            : "bg-white/5 border border-border text-fg-primary rounded-bl-md"
        )}
      >
        {content}
      </div>
    </div>
  );
}
