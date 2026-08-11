export const site = {
  name: "Poovaragan S",
  role: "AI & Full-Stack Developer",
  eyebrow: "COMPUTER SCIENCE • AI • FULL-STACK",
  headline: ["Building Intelligent", "Digital Experiences."],
  description:
    "I build AI-powered applications, automation systems, and modern full-stack products — turning ideas into practical software.",
  availability: "Open to Internship & Freelance Opportunities",
  location: "Coimbatore, Tamil Nadu, India",
  email: "poovaragansiva@gmail.com",
  github: "https://github.com/poovaragansiva-collab",
  githubHandle: "poovaragansiva-collab",
  linkedin: "https://www.linkedin.com/in/poovaragans",
  linkedinHandle: "in/poovaragans",
  /** Drop your photo at public/profile.jpg — nothing else to change. */
  photo: "/profile.jpg",
} as const;

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export const about = {
  heading: "About Me",
  paragraphs: [
    "I'm a Computer Science and Engineering undergraduate at Nehru Institute of Engineering and Technology, Coimbatore. Most of what I know comes from building — shipping small products end to end, breaking them, and rebuilding them properly.",
    "My focus sits at the intersection of applied AI and full-stack engineering: wiring language models into real workflows, running models locally with Ollama, and automating the repetitive parts of a system with n8n. On the product side I work with React, Next.js, TypeScript and PostgreSQL to turn those experiments into applications people can actually use.",
    "I'm still early in the journey and I treat it that way — reading source code, studying fundamentals, and picking projects that force me to learn something I don't already know.",
  ],
  facts: [
    { label: "Education", value: "B.E. Computer Science & Engineering" },
    { label: "Institute", value: "Nehru Institute of Engineering & Technology" },
    { label: "Location", value: "Coimbatore, Tamil Nadu" },
    { label: "Graduation", value: "Expected 2029" },
  ],
} as const;

export const focusAreas = [
  {
    no: "01",
    title: "AI Agents",
    body: "Building practical AI-powered workflows and intelligent applications.",
  },
  {
    no: "02",
    title: "Local AI",
    body: "Experimenting with local LLMs and Ollama.",
  },
  {
    no: "03",
    title: "Automation",
    body: "Building workflow automation using n8n.",
  },
  {
    no: "04",
    title: "Full-Stack Engineering",
    body: "Building complete applications with modern frontend, backend and database technologies.",
  },
  {
    no: "05",
    title: "Cybersecurity",
    body: "Developing foundational cybersecurity knowledge and security-oriented projects.",
  },
] as const;

export const journey = [
  {
    year: "2026",
    title: "Building AI, automation and full-stack projects",
    body: "Shipping self-directed projects that combine intelligent workflows with real product interfaces.",
  },
  {
    year: "2026",
    title: "Exploring local LLMs, Ollama and AI agents",
    body: "Running models locally, testing retrieval patterns and designing agent-style task flows.",
  },
  {
    year: "2026",
    title: "Strengthening software engineering fundamentals",
    body: "Developing real-world applications while improving data structures, systems thinking and clean architecture.",
  },
] as const;

export const education = {
  degree: "B.E. Computer Science and Engineering",
  school: "Nehru Institute of Engineering and Technology",
  place: "Coimbatore, Tamil Nadu",
  period: "Expected Graduation: 2029",
} as const;

export const highlights = [
  {
    value: "Real-world",
    label: "Full-stack projects",
    note: "Applications modelled on actual business workflows.",
  },
  {
    value: "AI + Automation",
    label: "Hands-on experimentation",
    note: "Local LLMs, RAG patterns, agent workflows and n8n pipelines.",
  },
  {
    value: "Open source",
    label: "Public GitHub repositories",
    note: "Work is visible, versioned and readable.",
  },
  {
    value: "Deployed",
    label: "Live web applications",
    note: "Projects shipped publicly, not left on localhost.",
  },
  {
    value: "Continuous",
    label: "Project-based learning",
    note: "Every project targets a technology I haven't used before.",
  },
] as const;
