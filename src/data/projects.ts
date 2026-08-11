export type ProjectCategory =
  | "AI"
  | "Full-Stack"
  | "Automation"
  | "Web"
  | "Tools";

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  status: "Live" | "In Development" | "Prototype";
  year: string;
  categories: ProjectCategory[];
  tech: string[];
  features: string[];
  problem: string;
  solution: string;
  learned: string;
  github?: string;
  demo?: string;
  /** Visual identity for the generated CSS mockup — no image files required. */
  mockup: "map" | "dashboard" | "terminal" | "vision";
}

/**
 * Local project data. No database, no CMS.
 * Edit this file to add, remove or reorder projects.
 */
export const projects: Project[] = [
  {
    id: "bioshield",
    index: "01",
    title: "BioShield",
    subtitle: "Ocean Biodiversity Monitoring & Anti-Poaching System",
    summary:
      "An AI-oriented ocean monitoring concept designed around biodiversity protection, threat monitoring, geospatial visualization and intelligent response workflows.",
    status: "Live",
    year: "2026",
    categories: ["AI", "Web", "Automation"],
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Leaflet", "n8n", "LLM concepts"],
    features: [
      "Interactive geospatial map layer built with Leaflet",
      "Monitoring views for biodiversity and threat signals",
      "Workflow-driven response concept wired around n8n automation",
      "Component-driven React + TypeScript frontend",
      "Deployed publicly on Vercel",
    ],
    problem:
      "Marine biodiversity data and illegal-activity signals are scattered across sources, which makes it hard to see what is happening in a region and to react in a structured way.",
    solution:
      "BioShield brings monitoring signals onto a single geospatial interface and pairs it with automation-driven response workflows, so an alert can move from detection to a defined action path instead of sitting in a spreadsheet.",
    learned:
      "Working with mapping libraries and coordinate data, structuring a TypeScript React codebase for a data-heavy interface, and designing automation flows that connect an interface to real actions.",
    github: "https://github.com/poovaragansiva-collab/Bioshield",
    demo: "https://bioshield-two.vercel.app/",
    mockup: "map",
  },
  {
    id: "sj-tailoros",
    index: "02",
    title: "SJ TailorOS",
    subtitle: "Real-World Tailoring Business Management Platform",
    summary:
      "A full-stack business management platform designed around a real-world tailoring workflow, including customer management, order tracking, delivery scheduling, loyalty features and administrative workflows.",
    status: "In Development",
    year: "2026",
    categories: ["Full-Stack", "Web"],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Clerk", "Tailwind CSS"],
    features: [
      "Customer records and order lifecycle tracking",
      "Delivery scheduling around real shop workflows",
      "Loyalty features for returning customers",
      "Administrative views for day-to-day operations",
      "Type-safe database access with Drizzle ORM over PostgreSQL",
      "Authentication handled through Clerk",
    ],
    problem:
      "Small tailoring businesses still run on paper notes and memory — measurements, order status and delivery dates get lost, and there is no reliable record of a returning customer.",
    solution:
      "SJ TailorOS models the actual shop workflow as software: every order has a customer, a state and a delivery date, and the admin surface is built around how the business already works rather than around a generic CRUD dashboard.",
    learned:
      "Designing a relational schema for a real domain, using Drizzle ORM for type-safe queries, integrating third-party auth, and the difference between building features and building a workflow.",
    // TODO: replace with the exact SJ TailorOS repository URL once published.
    github: "https://github.com/poovaragansiva-collab?tab=repositories",
    mockup: "dashboard",
  },
  {
    id: "smart-file-organizer",
    index: "03",
    title: "Smart File Organizer",
    subtitle: "Automation Utility for Developer Workspaces",
    summary:
      "A practical automation tool that sorts cluttered directories into a predictable structure using rule-based classification.",
    status: "Prototype",
    year: "2026",
    categories: ["Automation", "Tools"],
    tech: ["Python", "Automation", "CLI"],
    features: [
      "Rule-based file classification by type and extension",
      "Automatic folder structure creation",
      "Safe handling of duplicate and conflicting names",
      "Runs locally as a simple command-line utility",
    ],
    problem:
      "Download and working folders collapse into hundreds of unsorted files, and manual clean-up never survives more than a week.",
    solution:
      "A small, dependency-light script that applies deterministic rules to organise a directory, so the clean-up step becomes a single command instead of an afternoon.",
    learned:
      "Filesystem APIs, defensive handling of edge cases like duplicates and locked files, and how much value a genuinely small tool can deliver.",
    github: "https://github.com/poovaragansiva-collab",
    mockup: "terminal",
  },
  {
    id: "leaf-disease-prediction",
    index: "04",
    title: "Leaf Disease Prediction",
    subtitle: "Image-Based Machine Learning Experiment",
    summary:
      "A machine learning experiment that classifies plant leaf images to identify likely disease categories.",
    status: "Prototype",
    year: "2026",
    categories: ["AI", "Tools"],
    tech: ["Python", "Machine Learning", "Image Classification", "Flask"],
    features: [
      "Image pre-processing pipeline for leaf samples",
      "Trained classification model over labelled disease categories",
      "Simple interface for uploading a sample and viewing a prediction",
    ],
    problem:
      "Early identification of crop disease usually needs an expert on site, which is not realistic for most small growers.",
    solution:
      "A lightweight image classifier that gives an indicative reading from a single photograph — intended as an assistive signal, not a diagnosis.",
    learned:
      "Dataset preparation and augmentation, evaluating a model beyond raw accuracy, and serving a trained model behind a simple web interface.",
    github: "https://github.com/poovaragansiva-collab",
    mockup: "vision",
  },
];

export const projectFilters = [
  "All",
  "AI",
  "Full-Stack",
  "Automation",
  "Web",
  "Tools",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];
