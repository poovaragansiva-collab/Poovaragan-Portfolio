export type Experiment = {
  id: string;
  title: string;
  status: "live" | "prototype" | "research";
  description: string;
  tags: string[];
};

export const experiments: Experiment[] = [
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    status: "live",
    description: "LLM-powered resume scoring and improvement engine, matched against real job descriptions.",
    tags: ["LLM", "NLP", "Python"],
  },
  {
    id: "portfolio-ai-assistant",
    title: "Portfolio AI Assistant",
    status: "live",
    description: "The assistant on this site — trained on my projects, services, and writing to answer visitor questions in real time.",
    tags: ["RAG", "OpenRouter", "Next.js"],
  },
  {
    id: "document-qa-bot",
    title: "Document Q&A Bot",
    status: "prototype",
    description: "A retrieval-augmented chatbot that answers questions directly from uploaded documents.",
    tags: ["RAG", "Vector Search", "LLM"],
  },
  {
    id: "automation-workflows",
    title: "Automation Workflow Library",
    status: "live",
    description: "A growing set of n8n and API-based automations for common backend and content workflows.",
    tags: ["n8n", "Automation", "APIs"],
  },
  {
    id: "ai-research-experiments",
    title: "AI Research Experiments",
    status: "research",
    description: "Ongoing exploration into agentic workflows, prompt architectures, and LLM orchestration patterns.",
    tags: ["AI Agents", "Research"],
  },
];
