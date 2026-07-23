import type {
  PortfolioProfileDto,
  ProjectSummaryDto,
  SkillDto,
  SocialLinkDto,
} from "@portfolio/types";

export const FALLBACK_PROFILE: PortfolioProfileDto = {
  id: "fallback-profile",
  fullName: "Thalita Paiva",
  monogram: "TP",
  heroLabel: "SI · SOFTWARE · PROCESSOS",
  headline: "Programação, processos e projetos.",
  shortBio:
    "Sou estudante de Sistemas de Informação na Universidade Federal do Espírito Santo (UFES) – Campus Alegre. Tenho grande interesse em Desenvolvimento Full Stack e na criação de softwares que sejam modernos, eficientes e capazes de solucionar problemas reais.",
  aboutContent:
    "Sou estudante de Sistemas de Informação na Universidade Federal do Espírito Santo (UFES) – Campus Alegre. Tenho grande interesse em Desenvolvimento Full Stack e na criação de softwares que sejam modernos, eficientes e capazes de solucionar problemas reais.",
  education: "Sistemas de Informação — UFES (Campus Alegre)",
  interests: "Desenvolvimento Full Stack, organização de entregas e produtos digitais.",
  workStyle: "Escopos claros, comunicação objetiva e entrega iterativa.",
  goals: "Construir softwares modernos que resolvam problemas reais.",
  email: "thfonp@gmail.com",
  location: "Espírito Santo, Brasil",
  workPrinciples: [
    {
      title: "Organização",
      description: "Escopos claros e histórico limpo no Git.",
    },
    {
      title: "Comunicação",
      description: "Documentação objetiva e alinhamento constante.",
    },
    {
      title: "Execução",
      description: "Entregar cedo, iterar e fechar com qualidade.",
    },
  ],
  seoTitle: "Thalita Paiva — Portfólio",
  seoDescription:
    "Portfólio de Thalita Paiva — estudante de Sistemas de Informação com foco em programação, processos e projetos.",
  linkedIn: {
    name: "Thalita Paiva",
    headline: "SI · UFES | Programação, processos e projetos",
    summary:
      "Estudante de Sistemas de Informação com foco em software e organização de entregas.",
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Git"],
    profileUrl: "https://www.linkedin.com/in/thalita-paiva-1301a122b/",
  },
  updatedAt: new Date().toISOString(),
};

export const FALLBACK_SKILLS: SkillDto[] = [
  {
    id: "1",
    name: "JavaScript",
    category: "FRONTEND",
    icon: "javascript",
    level: "WORKING",
    displayOrder: 1,
  },
  {
    id: "2",
    name: "TypeScript",
    category: "FRONTEND",
    icon: "typescript",
    level: "FAMILIAR",
    displayOrder: 2,
  },
  {
    id: "3",
    name: "React",
    category: "FRONTEND",
    icon: "react",
    level: "FAMILIAR",
    displayOrder: 3,
  },
  {
    id: "4",
    name: "HTML/CSS",
    category: "FRONTEND",
    icon: "html5",
    level: "WORKING",
    displayOrder: 4,
  },
  {
    id: "5",
    name: "Node.js",
    category: "BACKEND",
    icon: "nodejs",
    level: "FAMILIAR",
    displayOrder: 5,
  },
  {
    id: "6",
    name: "C",
    category: "BACKEND",
    icon: "c",
    level: "WORKING",
    displayOrder: 6,
  },
  {
    id: "7",
    name: "PostgreSQL",
    category: "DATABASE",
    icon: "postgresql",
    level: "FAMILIAR",
    displayOrder: 7,
  },
  {
    id: "8",
    name: "Git",
    category: "DEVOPS",
    icon: "git",
    level: "WORKING",
    displayOrder: 8,
  },
  {
    id: "9",
    name: "Figma",
    category: "DEVOPS",
    icon: "figma",
    level: "FAMILIAR",
    displayOrder: 9,
  },
  {
    id: "10",
    name: "Gestão de projetos",
    category: "PRODUCT",
    icon: "projectmgmt",
    level: "WORKING",
    displayOrder: 10,
  },
];

export const FALLBACK_SOCIAL: SocialLinkDto[] = [
  {
    id: "gh",
    platform: "github",
    label: "GitHub",
    url: "https://github.com/thalitapaiva",
    displayOrder: 1,
  },
  {
    id: "li",
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/thalita-paiva-1301a122b/",
    displayOrder: 2,
  },
];

export const FALLBACK_PROJECTS: ProjectSummaryDto[] = [
  {
    id: "p1",
    title: "Página do Batman",
    slug: "page-batman",
    shortDescription:
      "Landing page temática do Batman construída com HTML e CSS como exercício de layout e identidade visual.",
    year: 2023,
    coverUrl: null,
    repositoryUrl: "https://github.com/thalitapaiva",
    liveUrl: null,
    featured: true,
    displayOrder: 1,
    technologies: [],
  },
  {
    id: "p2",
    title: "Clocks",
    slug: "clocks",
    shortDescription:
      "Relógio digital em JavaScript puro que atualiza horas, minutos e segundos em tempo real.",
    year: 2023,
    coverUrl: null,
    repositoryUrl: "https://github.com/thalitapaiva",
    liveUrl: null,
    featured: true,
    displayOrder: 2,
    technologies: [],
  },
  {
    id: "p3",
    title: "Weather",
    slug: "weather",
    shortDescription:
      "Interface de previsão do tempo construída como exercício de consumo de API e design de UI.",
    year: 2023,
    coverUrl: null,
    repositoryUrl: "https://github.com/thalitapaiva",
    liveUrl: null,
    featured: true,
    displayOrder: 3,
    technologies: [],
  },
];
