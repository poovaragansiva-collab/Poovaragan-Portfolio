import { NextRequest } from "next/server";
import { chatRequestSchema } from "@/lib/validations";
import { buildSystemPrompt } from "@/lib/ai/systemPrompt";
import { streamOpenRouterCompletion, ChatMessage } from "@/lib/ai/openrouter";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
    }

    const { sessionId, message, history } = parsed.data;

    const messages: ChatMessage[] = [
      { role: "system", content: buildSystemPrompt() },
      ...history.map((h) => ({ role: h.role, content: h.content } as ChatMessage)),
      { role: "user", content: message },
    ];

    const upstream = await streamOpenRouterCompletion(messages);

    // Fire-and-forget: persist the session/message to MongoDB.
    persistSession(sessionId, message).catch((err) =>
      console.error("Failed to persist chat session:", err)
    );

    // Pass through the OpenRouter SSE stream, extracting just the text deltas.
    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const data = trimmed.replace(/^data:\s*/, "");
              if (data === "[DONE]") {
                controller.close();
                return;
              }
              try {
                const json = JSON.parse(data);
                const delta = json?.choices?.[0]?.delta?.content;
                if (delta) {
                  controller.enqueue(encoder.encode(delta));
                }
              } catch {
                // ignore malformed SSE chunks
              }
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Chat route error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), {
      status: 500,
    });
  }
}

async function persistSession(sessionId: string, userMessage: string) {
  const db = await getDb();
  await db.collection("chat_sessions").updateOne(
    { sessionId },
    {
      $push: {
        messages: { role: "user", content: userMessage, ts: new Date() },
      } as any,
      $setOnInsert: { sessionId, leadCaptured: false, createdAt: new Date() },
    },
    { upsert: true }
  );
}
