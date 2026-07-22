export type Service = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  price?: string; // intentionally left undefined — slot ready for future use
};

export const services: Service[] = [
  {
    id: "ai-chatbot-development",
    title: "AI Chatbot Development",
    description:
      "Custom AI chatbots for support, sales, or internal use — trained on your content and connected to your tools.",
    deliverables: ["Custom conversation design", "Knowledge base integration", "Multi-channel deployment"],
  },
  {
    id: "ai-automation-workflows",
    title: "AI Automation Workflows",
    description:
      "End-to-end automation pipelines that connect your tools and remove manual, repetitive work.",
    deliverables: ["Workflow mapping & design", "n8n / API-based automation", "Monitoring & handoff docs"],
  },
  {
    id: "backend-development",
    title: "Backend Development",
    description:
      "Robust REST APIs and backend systems designed for correctness, security, and scale.",
    deliverables: ["API design & implementation", "Database architecture", "Auth & security hardening"],
  },
  {
    id: "technical-content-writing",
    title: "Technical Content Writing",
    description:
      "Clear, credible technical writing — blogs, documentation, and LinkedIn content that builds authority.",
    deliverables: ["Technical blog posts", "Product documentation", "LinkedIn ghostwriting"],
  },
  {
    id: "custom-ai-solutions",
    title: "Custom AI Solutions",
    description:
      "Tailored AI-powered tools — from RAG systems to internal copilots — built around your specific workflow.",
    deliverables: ["Solution scoping", "RAG / LLM integration", "Production deployment"],
  },
];
