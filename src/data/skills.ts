export interface SkillGroup {
  id: string;
  title: string;
  hint: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    hint: "Core programming foundation",
    items: ["Python", "Java", "C", "JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
  },
  {
    id: "frontend",
    title: "Frontend",
    hint: "Interfaces & product surfaces",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: "Backend / Data",
    hint: "Services, persistence & APIs",
    items: ["Node.js", "Flask", "PostgreSQL", "MongoDB", "Drizzle ORM"],
  },
  {
    id: "ai",
    title: "AI / Automation",
    hint: "Applied intelligence & workflows",
    items: ["Ollama", "LLMs", "RAG", "AI Agents", "n8n"],
  },
  {
    id: "tools",
    title: "Tools",
    hint: "Build, ship & collaborate",
    items: ["Git", "GitHub", "Docker", "VS Code", "Vercel"],
  },
];
