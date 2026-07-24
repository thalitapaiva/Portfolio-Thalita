export const NAV_SECTIONS = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "atuacao", label: "Atuação" },
  { id: "competencias", label: "Competências" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
] as const;

export type NavSectionId = (typeof NAV_SECTIONS)[number]["id"];

export const SITE = {
  name: "Thalita Paiva",
  shortName: "TP",
  role: "Tecnologia, operações e agilidade",
  locale: "pt-BR",
  defaultTitle: "Thalita Paiva — Portfólio",
  defaultDescription:
    "Portfólio de Thalita Paiva — Business Operations Manager, Scrum Master e profissional de tecnologia. Processos, projetos, agilidade e desenvolvimento de software.",
  themeColor: "#0071E3",
  keywords: [
    "Thalita Paiva",
    "portfólio",
    "Business Operations",
    "Scrum Master",
    "gestão de projetos",
    "processos",
    "agilidade",
    "Sistemas de Informação",
    "UFES",
    "JavaScript",
    "TypeScript",
    "GitHub",
  ],
} as const;

export type NavSection = (typeof NAV_SECTIONS)[number];

export const REVALIDATE = {
  profile: 60 * 15,
  projects: 60 * 5,
  skills: 60 * 60,
  github: 60 * 15,
  social: 60 * 60,
} as const;

/** Fill real values to publish the results strip. Leave null to keep it hidden. */
export type ResultMetric = {
  id: string;
  value: number | string | null;
  /** i18n key suffix under results.items */
  labelKey:
    | "projectsTracked"
    | "processesStructured"
    | "reworkReduction"
    | "sprintsFacilitated"
    | "peopleSupported"
    | "deadlineImprovement";
};

export const RESULT_METRICS: ResultMetric[] = [
  { id: "projects", value: null, labelKey: "projectsTracked" },
  { id: "processes", value: null, labelKey: "processesStructured" },
  { id: "rework", value: null, labelKey: "reworkReduction" },
  { id: "sprints", value: null, labelKey: "sprintsFacilitated" },
  { id: "people", value: null, labelKey: "peopleSupported" },
  { id: "deadlines", value: null, labelKey: "deadlineImprovement" },
];

export type ProjectCategory = "technology" | "operations";

/** Optional overrides for curated/GitHub projects. Unlisted = technology. */
export const PROJECT_CATEGORY_BY_SLUG: Record<string, ProjectCategory> = {
  // Add ops/process projects here when available, e.g.:
  // "processo-onboarding": "operations",
};
