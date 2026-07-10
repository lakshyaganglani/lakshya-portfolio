// Single source of truth for site content, derived from resume.
// Update here and it propagates across Home, About, Projects, Contact.

export const person = {
  name: "Lakshya Ganglani",
  role: "Data Engineer",
  tagline: "Data infrastructure that businesses can trust.",
  subTagline:
    "I design and operate ETL/ELT systems on Azure that keep data flowing at scale — built for uptime, built to grow.",
  location: "India",
  email: "lakshya.ganglani@gmail.com",
  phone: "+91 9669543892",
  github: "https://github.com/", // update with real handle
  linkedin: "https://www.linkedin.com/in/lakshya-ganglani",
  resumeSummary:
    "Data Engineer at TCS building ETL/ELT pipelines on Azure that process hundreds of millions of records a year. Focused on reliability, automation, and giving business teams data they can trust.",
};

export const approach = {
  eyebrow: "Approach",
  heading: "Infrastructure is a trust problem before it's a technical one.",
  paragraphs: [
    "Every dashboard, every forecast, every business decision downstream depends on one quiet assumption: that the data showed up, on time, correct. My job is to make that assumption safe to make.",
    "That means treating pipelines like production systems, not scripts — monitored, dependency-aware, and built to fail loudly and recover fast rather than fail silently. A 99.5% daily success rate across 100+ pipelines isn't an accident; it's what happens when orchestration and monitoring are first-class citizens, not afterthoughts.",
    "As data platforms move toward lakehouse architectures like Microsoft Fabric, the same principle holds: scale should never come at the cost of trust. I build for both.",
  ],
};

export const narrative = {
  eyebrow: "The story so far",
  acts: [
    {
      label: "01 — Origin",
      heading: "Where it started: a CS degree and a pull toward systems that scale.",
      body: "I graduated with a B.Tech in Computer Science from RGPV with an 8.9 GPA, but the real starting point was smaller than that — Microsoft's Introduction to Programming with Python course, and the realization that code could move real data, not just pass a test case. Cisco's networking and cybersecurity courses came next, and between the two I got interested in a specific question: not how to write a clever algorithm, but how to keep a system reliable when real volume and real stakes show up.",
    },
    {
      label: "02 — Evolution",
      heading: "Where it's been tested: TCS, production pipelines, and the gap between working and trustworthy.",
      body: "That question became my actual job at TCS. Building ETL/ELT workflows that move hundreds of millions of records a year taught me the difference between a pipeline that runs and a pipeline people can depend on. Getting from 'it works on my machine' to a 99.5% daily success rate across 100+ Azure Data Factory pipelines meant taking monitoring, orchestration, and failure recovery as seriously as the transformation logic itself — and automating the repetitive 60% of the work so the remaining effort could go toward the parts that actually needed judgment.",
    },
    {
      label: "03 — Vision",
      heading: "Where it's going: from operating the pipeline to shaping what gets built on top of it.",
      body: "Earning the Microsoft Fabric Data Engineer Associate certification and contributing to our team's migration to Fabric confirmed something for me: the infrastructure layer is where I want to keep growing, but I want to grow toward deciding what gets built on it, not just operating it. That's the deliberate move I'm making now — from data engineer to someone who understands both the pipeline and the product decisions built on top of it, with an eye on AI product management and, eventually, building something of my own.",
    },
  ],
};

export const vision = {
  eyebrow: "Looking ahead",
  heading: "Where I'm headed: from building the pipeline to shaping the product.",
  paragraphs: [
    "Reliable, well-governed data infrastructure is the layer every AI system eventually depends on — the unglamorous foundation underneath every model that ships. That foundation is where I've spent my career so far, and it's given me a grounded, first-hand view of what actually breaks when AI meets production.",
    "My next chapter is about moving from operating that foundation to shaping decisions on top of it — growing deliberately toward AI product management and technical leadership, where engineering judgment about scale, reliability, and data quality directly informs what gets built and why.",
    "Long-term, I want to lead from the front as AI reshapes how products get built — eventually building something of my own. I'm early in that journey and saying so plainly, not because the title exists yet, but because the direction is real and I'm building toward it deliberately, one system and one decision at a time.",
  ],
};

export type FieldNote = {
  title: string;
  source: string;
  author: string;
  type: "newsletter" | "paper";
  url: string;
  note: string;
};

// Curated, real, verifiable sources — not a live feed. Update periodically
// by hand, or wire to a real API/RSS source later if a live feed is wanted.
export const fieldNotes: FieldNote[] = [
  {
    title: "Import AI",
    source: "Substack",
    author: "Jack Clark",
    type: "newsletter",
    url: "https://importai.substack.com/",
    note: "Weekly research analysis plus AI policy and compute-trend commentary, running since 2016.",
  },
  {
    title: "The Batch",
    source: "DeepLearning.AI",
    author: "Andrew Ng",
    type: "newsletter",
    url: "https://www.deeplearning.ai/the-batch/",
    note: "Weekly, measured framing on what the week's AI research and releases actually mean.",
  },
  {
    title: "Latent Space",
    source: "Substack",
    author: "Swyx & Alessio Fanelli",
    type: "newsletter",
    url: "https://www.latent.space/",
    note: "AI engineering as a discipline — evals, inference, and the production tradeoffs of building on LLMs.",
  },
  {
    title: "Attention Is All You Need",
    source: "arXiv, 2017",
    author: "Vaswani et al.",
    type: "paper",
    url: "https://arxiv.org/abs/1706.03762",
    note: "The Transformer paper — the architecture underpinning essentially every modern LLM.",
  },
];

export type TechMatrixRow = {
  category: string;
  tools: { name: string; level: "core" | "working" | "learning" }[];
};

export const techMatrix: TechMatrixRow[] = [
  {
    category: "Cloud & Platform",
    tools: [
      { name: "Microsoft Azure", level: "core" },
      { name: "Azure Data Factory", level: "core" },
      { name: "Azure Synapse Analytics", level: "core" },
      { name: "Microsoft Fabric", level: "core" },
      { name: "Azure Data Lake Storage", level: "core" },
      { name: "Delta Lake", level: "working" },
    ],
  },
  {
    category: "Languages & Query",
    tools: [
      { name: "Python", level: "core" },
      { name: "SQL", level: "core" },
      { name: "C++", level: "working" },
      { name: "DAX", level: "working" },
    ],
  },
  {
    category: "Analytics & BI",
    tools: [
      { name: "Power BI", level: "core" },
      { name: "Power Query", level: "core" },
      { name: "Data Modeling", level: "working" },
    ],
  },
  {
    category: "ML / AI foundations",
    tools: [
      { name: "Pandas", level: "working" },
      { name: "Scikit-Learn", level: "working" },
      { name: "NLTK / NLP", level: "learning" },
    ],
  },
];

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

export type RecommenderPriority = {
  key: string;
  label: string;
  description: string;
  // Weighted match per project id — simple, transparent rule-based scoring,
  // not a model. Higher score = stronger fit for this priority.
  weights: Record<string, number>;
};

export const recommenderPriorities: RecommenderPriority[] = [
  {
    key: "reliability",
    label: "Reliability at scale",
    description: "Systems that stay up and recover gracefully under real load.",
    weights: {
      "adf-pipeline-platform": 3,
      "recommendation-engine": 0,
      "customer-analytics-dashboard": 0,
    },
  },
  {
    key: "cost-efficiency",
    label: "Cost & effort reduction",
    description: "Automating away manual, repetitive operational work.",
    weights: {
      "adf-pipeline-platform": 3,
      "recommendation-engine": 0,
      "customer-analytics-dashboard": 1,
    },
  },
  {
    key: "insight",
    label: "Reporting & business insight",
    description: "Turning raw data into decisions stakeholders can act on.",
    weights: {
      "adf-pipeline-platform": 1,
      "recommendation-engine": 0,
      "customer-analytics-dashboard": 3,
    },
  },
  {
    key: "ml-personalization",
    label: "ML & personalization",
    description: "Applying modeling techniques to surface relevant results.",
    weights: {
      "adf-pipeline-platform": 0,
      "recommendation-engine": 3,
      "customer-analytics-dashboard": 0,
    },
  },
  {
    key: "cloud-migration",
    label: "Cloud platform migration",
    description: "Moving workloads onto modern, scalable cloud architecture.",
    weights: {
      "adf-pipeline-platform": 3,
      "recommendation-engine": 0,
      "customer-analytics-dashboard": 0,
    },
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
