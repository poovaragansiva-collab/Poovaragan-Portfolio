export type WritingType = "article" | "linkedin" | "documentation";

export type WritingSample = {
  slug: string;
  title: string;
  type: WritingType;
  excerpt: string;
  externalUrl?: string;
  placeholder?: boolean; // true until real content is added
};

export const writingSamples: WritingSample[] = [
  {
    slug: "building-rag-systems-from-scratch",
    title: "Building RAG Systems From Scratch",
    type: "article",
    excerpt: "A practical walkthrough of retrieval-augmented generation — from chunking strategy to production deployment.",
    placeholder: true,
  },
  {
    slug: "why-most-ai-agents-fail-in-production",
    title: "Why Most AI Agents Fail in Production",
    type: "linkedin",
    excerpt: "The gap between an impressive demo and a reliable, monitored automation — and how to close it.",
    placeholder: true,
  },
  {
    slug: "designing-rest-apis-that-scale",
    title: "Designing REST APIs That Scale",
    type: "article",
    excerpt: "Practical patterns for API design that hold up as traffic and team size grow.",
    placeholder: true,
  },
  {
    slug: "documentation-sample-api-reference",
    title: "Sample: Internal API Reference",
    type: "documentation",
    excerpt: "A sample of clear, structured product documentation written for a developer audience.",
    placeholder: true,
  },
];
