const prompts = [
  "Tell me about Poovaragan",
  "Show projects",
  "What services are available?",
  "Explain AI Resume Analyzer",
  "Show writing samples",
];

export default function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3">
      {prompts.map((p) => (
        <button
          key={p}
          onClick={() => onSelect(p)}
          className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-border text-fg-muted hover:text-accent hover:border-accent/40 transition-colors"
        >
          {p}
        </button>
      ))}
    </div>
  );
}
