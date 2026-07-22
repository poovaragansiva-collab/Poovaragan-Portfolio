export type ExpertiseCategory = {
  id: string;
  title: string;
  description: string;
  skills: string[];
};

export const expertiseCategories: ExpertiseCategory[] = [
  {
    id: "backend",
    title: "Backend Development",
    description: "Designing APIs and data systems built to hold up under real traffic.",
    skills: ["Python", "REST APIs", "Database Design", "Backend Architecture"],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    description: "Turning manual, repetitive workflows into autonomous systems.",
    skills: ["AI Agents", "AI Chatbots", "n8n", "Workflow Automation", "RAG Systems", "LLM Integration"],
  },
  {
    id: "technical-writing",
    title: "Technical Writing",
    description: "Explaining complex systems clearly, for engineers and non-engineers alike.",
    skills: ["LinkedIn Ghostwriting", "Technical Blogs", "Product Documentation", "Educational Content"],
  },
  {
    id: "tools",
    title: "Tools",
    description: "The everyday toolkit behind every build and deployment.",
    skills: ["Git", "Docker", "Linux", "MongoDB"],
  },
];
