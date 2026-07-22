export type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function streamOpenRouterCompletion(messages: ChatMessage[]) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://poovaragan.dev",
      "X-Title": "Poovaragan S Portfolio Assistant",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "anthropic/claude-3.5-haiku",
      messages,
      stream: true,
      temperature: 0.4,
      max_tokens: 600,
    }),
  });

  if (!response.ok || !response.body) {
    const errText = await response.text().catch(() => "");
    throw new Error(`OpenRouter request failed: ${response.status} ${errText}`);
  }

  return response.body;
}
