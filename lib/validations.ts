import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Enter a valid email"),
  company: z.string().max(150).optional().or(z.literal("")),
  projectDetails: z.string().min(10, "Add a bit more detail").max(2000),
  source: z.enum(["chat_assistant", "contact_form", "quote_request"]).default("contact_form"),
  serviceInterest: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
});

export const chatRequestSchema = z.object({
  sessionId: z.string().uuid(),
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .max(20)
    .default([]),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ChatRequestInput = z.infer<typeof chatRequestSchema>;
