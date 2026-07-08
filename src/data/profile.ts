// Single source of truth for site content, derived from resume.
// Update here and it propagates across Home, About, Projects, Contact.

export const person = {
  name: "Lakshya Ganglani",
  role: "Data Engineer",
  tagline: "I build the pipelines that move data others depend on.",
  location: "India",
  email: "lakshya.ganglani@gmail.com",
  phone: "+91 9669543892",
  github: "https://github.com/", // update with real handle
  linkedin: "https://www.linkedin.com/in/lakshya-ganglani",
  resumeSummary:
    "Data Engineer at TCS building ETL/ELT pipelines on Azure that process hundreds of millions of records a year. Focused on reliability, automation, and giving business teams data they can trust.",
};

export type FilterKey = "all" | "pipelines" | "cloud" | "analytics" | "automation";

export const filters: { key: FilterKey; label: string; description: string }[] = [
  { key: "all", label: "All Systems", description: "Everything in the stack." },
  {
    key: "pipelines",
    label: "Pipelines & ETL",
    description: "Ingestion, transformation, and orchestration at scale.",
  },
  {
    key: "cloud",
    label: "Cloud & Azure",
    description: "Azure Data Factory, Synapse, Fabric, Delta Lake.",
  },
  {
    key: "analytics",
    label: "Analytics & BI",
    description: "Power BI, DAX, dashboards stakeholders actually use.",
  },
  {
    key: "automation",
    label: "Automation",
    description: "Cutting manual effort out of recurring data work.",
  },
];

export const stats = [
  { value: "100+", label: "ADF pipelines monitored", mono: "pipelines.active" },
  { value: "99.5%", label: "daily pipeline success rate", mono: "sla.uptime" },
  { value: "60%", label: "manual effort reduced", mono: "ops.automation" },
  { value: "100+", label: "stakeholders served", mono: "consumers.count" },
];

export const pipelineNodes = [
  { id: "ingest", label: "Ingest", detail: "Source systems → Azure Data Lake" },
  { id: "transform", label: "Transform", detail: "ETL/ELT logic, Synapse & Fabric" },
  { id: "orchestrate", label: "Orchestrate", detail: "ADF dependency & schedule mgmt" },
  { id: "deliver", label: "Deliver", detail: "Trusted datasets to 100+ stakeholders" },
];

export type TimelineItem = {
  id: string;
  period: string;
  title: string;
  org: string;
  summary: string;
  bullets: string[];
  tech: string[];
  filters: FilterKey[];
};

export const timeline: TimelineItem[] = [
  {
    id: "tcs",
    period: "March 2024 — Present",
    title: "Data Engineer",
    org: "Tata Consultancy Services",
    summary:
      "Own end-to-end ETL/ELT workflows on Azure, from ingestion through delivery, for datasets used across operations, finance, and business teams.",
    bullets: [
      "Engineered scalable ETL/ELT workflows processing hundreds of millions of records annually.",
      "Automated ingestion, transformation, and orchestration, cutting manual operational effort by 60%.",
      "Monitored and maintained 100+ Azure Data Factory pipelines at a 99.5% daily success rate.",
      "Optimized pipeline orchestration and dependency management, improving execution efficiency by 30%.",
      "Contributed to migrating enterprise data workloads from Azure to Microsoft Fabric.",
      "Delivered trusted datasets consumed by 100+ business stakeholders.",
    ],
    tech: ["Python", "SQL", "Azure Data Factory", "Azure Synapse", "Microsoft Fabric", "SSMS"],
    filters: ["pipelines", "cloud", "automation"],
  },
  {
    id: "education",
    period: "2019 — 2023",
    title: "B.Tech, Computer Science Engineering",
    org: "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
    summary: "GPA: 8.9 / 10.0",
    bullets: [
      "Foundation in data structures, algorithms, and systems programming.",
      "Graduated with distinction, GPA 8.9/10.0.",
    ],
    tech: ["C++", "Python", "SQL"],
    filters: ["all" as FilterKey],
  },
];

export const certifications = [
  { name: "Microsoft Certified: Fabric Data Engineer Associate", issuer: "Microsoft" },
  { name: "Introduction to Programming with Python", issuer: "Microsoft" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco" },
  { name: "Introduction to Packet Tracer", issuer: "Cisco" },
];

export const skillGroups: { group: string; skills: string[]; filters: FilterKey[] }[] = [
  {
    group: "Cloud & Storage",
    skills: ["Microsoft Azure", "Azure Data Lake Storage", "Delta Lake", "OneLake Explorer"],
    filters: ["cloud"],
  },
  {
    group: "Programming & Scripting",
    skills: ["Python", "SQL", "C++"],
    filters: ["pipelines", "automation"],
  },
  {
    group: "Integration & Orchestration",
    skills: ["Azure Data Factory", "ETL/ELT Pipelines"],
    filters: ["pipelines", "automation"],
  },
  {
    group: "Analytics & Visualization",
    skills: ["Azure Synapse Analytics", "Power BI", "Power Query", "Data Modeling", "DAX"],
    filters: ["analytics"],
  },
];

export type Project = {
  id: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  impact: { metric: string; label: string }[];
  tech: string[];
  filters: FilterKey[];
  link?: string;
  status: "shipped" | "personal";
};

export const projects: Project[] = [
  {
    id: "adf-pipeline-platform",
    title: "Enterprise ETL/ELT Pipeline Platform",
    summary:
      "The production data backbone at TCS — ingestion through delivery for hundreds of millions of records a year.",
    problem:
      "Business teams needed timely, trustworthy data across operations, finance, and reporting, but manual pipeline work was slow and error-prone, threatening SLA commitments.",
    solution:
      "Built and automated end-to-end ETL/ELT workflows on Azure Data Factory and Synapse, with dependency-aware orchestration and monitoring across 100+ pipelines, then contributed to migrating the platform to Microsoft Fabric for future scale.",
    impact: [
      { metric: "60%", label: "less manual operational effort" },
      { metric: "99.5%", label: "daily pipeline success rate" },
      { metric: "30%", label: "faster execution efficiency" },
      { metric: "100+", label: "stakeholders served" },
    ],
    tech: ["Python", "SQL", "Azure Data Factory", "Azure Synapse", "Microsoft Fabric"],
    filters: ["pipelines", "cloud", "automation"],
    status: "shipped",
  },
  {
    id: "recommendation-engine",
    title: "Content-Based Movie Recommendation Engine",
    summary: "An NLP-driven recommendation system built from movie metadata.",
    problem:
      "Generic recommendation lists don't reflect what a specific piece of content is actually about — titles need to be matched on substance, not just popularity.",
    solution:
      "Applied NLP techniques (Bag of Words, TF-IDF) with Pandas and scikit-learn to vectorize movie metadata and score similarity, surfacing personalized, content-based recommendations.",
    impact: [{ metric: "TF-IDF", label: "similarity scoring approach" }],
    tech: ["Python", "Pandas", "Scikit-Learn", "NLTK", "NLP"],
    filters: ["pipelines"],
    status: "personal",
  },
  {
    id: "customer-analytics-dashboard",
    title: "Customer Analytics Dashboard",
    summary: "A Power BI dashboard tracking customer behavior and sales trends over time.",
    problem:
      "Sales and behavior data lived across multiple disconnected sources, making trend analysis manual and slow.",
    solution:
      "Connected multiple data sources in Power BI, modeled relationships between tables, and used DAX to calculate year-over-year growth and running totals.",
    impact: [{ metric: "DAX", label: "YoY growth & running totals" }],
    tech: ["Power BI", "Power Query", "MySQL", "DAX"],
    filters: ["analytics"],
    status: "personal",
  },
];
