export const SITE = {
  name: "Thalita Paiva",
  shortName: "TP",
  role: "Software & Product",
  locale: "pt-BR",
  defaultTitle: "Thalita Paiva — Portfólio",
  defaultDescription:
    "Portfólio de Thalita Paiva — desenvolvimento de software e produto, com foco em interfaces claras, backends confiáveis e experiência do usuário.",
  themeColor: "#2181BD",
  keywords: [
    "Thalita Paiva",
    "portfólio",
    "desenvolvedora",
    "software",
    "produto",
    "frontend",
    "backend",
    "Next.js",
    "TypeScript",
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
  projects: 60 * 15,
  skills: 60 * 60,
  github: 60 * 30,
  social: 60 * 60,
} as const;
