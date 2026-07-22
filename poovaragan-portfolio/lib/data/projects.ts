export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "password-manager",
    title: "Password Manager",
    summary: "A secure, encrypted local password vault with a clean CLI/GUI interface.",
    problem:
      "Most people reuse weak passwords because managing unique, strong credentials for every service is tedious and existing tools feel bloated.",
    solution:
      "Built a lightweight password manager with strong local encryption, master-password authentication, and fast retrieval — no cloud dependency required.",
    features: [
      "AES-based encryption for stored credentials",
      "Master password with secure hashing",
      "Password strength generator",
      "Local-first storage, zero third-party data exposure",
    ],
    stack: ["Python", "SQLite", "Cryptography"],
    githubUrl: "https://github.com/poovaragan-s/password-manager",
    featured: true,
  },
  {
    slug: "network-scanner",
    title: "Network Scanner",
    summary: "A Python-based tool for discovering and auditing devices on a local network.",
    problem:
      "Understanding what's actually connected to a network — and whether it's exposed — usually requires heavyweight, unfriendly enterprise tools.",
    solution:
      "Built a fast, script-based scanner that maps live hosts, open ports, and basic service fingerprints across a subnet in seconds.",
    features: [
      "ARP-based host discovery",
      "Port scanning with service identification",
      "Exportable scan reports",
      "Lightweight, no GUI overhead",
    ],
    stack: ["Python", "Scapy", "Socket Programming"],
    githubUrl: "https://github.com/poovaragan-s/network-scanner",
  },
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    summary: "A full-stack expense tracking app with categorized analytics.",
    problem:
      "Manually tracking spending across categories is easy to abandon without fast entry and clear, immediate feedback on habits.",
    solution:
      "Built a full-stack tracker with quick entry, category breakdowns, and visual analytics so spending patterns are obvious at a glance.",
    features: [
      "Category-based expense logging",
      "Monthly analytics dashboard",
      "REST API backend",
      "Persistent storage with MongoDB",
    ],
    stack: ["Python", "Flask", "MongoDB", "REST APIs"],
    githubUrl: "https://github.com/poovaragan-s/expense-tracker",
  },
  {
    slug: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    summary: "An LLM-powered tool that scores and improves resumes against job descriptions.",
    problem:
      "Job seekers rarely get specific, actionable feedback on how their resume matches a target role before they hit submit.",
    solution:
      "Built an AI-powered analyzer that compares a resume against a job description, scores alignment, and generates targeted improvement suggestions.",
    features: [
      "Resume-to-job-description match scoring",
      "AI-generated improvement suggestions",
      "Keyword gap analysis",
      "PDF resume parsing",
    ],
    stack: ["Python", "LLM Integration", "REST APIs", "PDF Parsing"],
    githubUrl: "https://github.com/poovaragan-s/ai-resume-analyzer",
    featured: true,
  },
  {
    slug: "college-timetable-automation",
    title: "College Timetable Automation",
    summary: "An automation system that generates conflict-free academic timetables.",
    problem:
      "Manually building class timetables across multiple sections and faculty constraints is slow and error-prone.",
    solution:
      "Built a constraint-based automation system that generates optimized, conflict-free timetables from faculty, room, and section inputs.",
    features: [
      "Constraint-based scheduling engine",
      "Conflict detection across faculty & rooms",
      "Exportable timetable views",
      "Configurable rules per department",
    ],
    stack: ["Python", "Automation", "Algorithms"],
    githubUrl: "https://github.com/poovaragan-s/timetable-automation",
  },
];
