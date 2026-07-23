export const SITE = {
  name: "Thalita Paiva",
  shortName: "TP",
  role: "Programação, processos e projetos",
  locale: "pt-BR",
  defaultTitle: "Thalita Paiva — Portfólio",
  defaultDescription:
    "Portfólio de Thalita Paiva — estudante de Sistemas de Informação com foco em programação, processos e projetos. Repositórios sincronizados com o GitHub.",
  themeColor: "#0071E3",
  keywords: [
    "Thalita Paiva",
    "portfólio",
    "programação",
    "processos",
    "projetos",
    "Sistemas de Informação",
    "UFES",
    "JavaScript",
    "TypeScript",
    "GitHub",
  ],
} as const;

export const NAV_SECTIONS = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "competencias", label: "Competências" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
] as const;

export type NavSection = (typeof NAV_SECTIONS)[number];

export const REVALIDATE = {
  profile: 60 * 15,
  projects: 60 * 5,
  skills: 60 * 60,
  github: 60 * 15,
  social: 60 * 60,
} as const;
