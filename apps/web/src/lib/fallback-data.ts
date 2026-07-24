import type {
  PortfolioProfileDto,
  ProjectDetailDto,
  ProjectSummaryDto,
  SkillDto,
  SocialLinkDto,
} from "@portfolio/types";

export const FALLBACK_PROFILE: PortfolioProfileDto = {
  id: "fallback-profile",
  fullName: "Thalita Paiva",
  monogram: "TP",
  heroLabel: "SI · SOFTWARE · PROCESSOS",
  headline: "Tecnologia, operações e agilidade para transformar processos em resultados.",
  shortBio:
    "Sou estudante de Sistemas de Informação na Universidade Federal do Espírito Santo — UFES, com experiência em gestão de operações, organização de projetos, melhoria de processos e metodologias ágeis.",
  aboutContent:
    "Sou estudante de Sistemas de Informação na Universidade Federal do Espírito Santo — UFES, com experiência em gestão de operações, organização de projetos, melhoria de processos e metodologias ágeis.",
  education: "Sistemas de Informação — UFES (Campus Alegre)",
  interests: "Business Operations, Scrum, gestão de projetos e desenvolvimento Full Stack.",
  workStyle: "Escopos claros, comunicação objetiva e entrega iterativa.",
  goals: "Conectar estratégia, operação e tecnologia em processos e entregas acompanháveis.",
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
    "Portfólio de Thalita Paiva — Business Operations Manager, Scrum Master e profissional de tecnologia.",
  linkedIn: {
    name: "Thalita Paiva",
    headline: "Business Operations · Scrum Master · Tecnologia",
    summary:
      "Business Operations Manager, Scrum Master e profissional de tecnologia — processos, projetos e desenvolvimento.",
    skills: ["Business Operations", "Scrum", "Gestão de projetos", "JavaScript", "React"],
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

const htmlCss = [
  {
    isPrimary: true,
    technology: { id: "t-html", name: "HTML5", slug: "html", icon: "html5" },
  },
  {
    isPrimary: true,
    technology: { id: "t-css", name: "CSS3", slug: "css", icon: "css3" },
  },
] as const;

const jsStack = [
  {
    isPrimary: true,
    technology: { id: "t-js", name: "JavaScript", slug: "javascript", icon: "javascript" },
  },
  {
    isPrimary: false,
    technology: { id: "t-html2", name: "HTML5", slug: "html", icon: "html5" },
  },
  {
    isPrimary: false,
    technology: { id: "t-css2", name: "CSS3", slug: "css", icon: "css3" },
  },
] as const;

type ProjectSeed = Omit<ProjectDetailDto, "createdAt" | "updatedAt" | "published"> & {
  published?: boolean;
};

const PROJECT_SEEDS: ProjectSeed[] = [
  {
    id: "p1",
    title: "Página do Batman",
    slug: "page-batman",
    shortDescription:
      "Landing page temática do Batman construída com HTML e CSS como exercício de layout e identidade visual.",
    fullDescription:
      "Projeto acadêmico/prático de front-end no qual explorei composição de seções, tipografia, uso de imagens e efeitos com CSS puro para reproduzir uma landing page temática.",
    problem:
      "Praticar a criação de uma landing page com identidade visual forte usando apenas HTML e CSS, sem frameworks.",
    contribution:
      "Estruturei todo o HTML semântico, o design responsivo em CSS e o deploy da página como projeto pessoal.",
    year: 2023,
    coverUrl: null,
    repositoryUrl: "https://github.com/thalitapaiva/page-batman",
    liveUrl: null,
    featured: true,
    displayOrder: 1,
    technologies: [...htmlCss],
  },
  {
    id: "p2",
    title: "Clocks",
    slug: "clocks",
    shortDescription:
      "Relógio digital em JavaScript puro que atualiza horas, minutos e segundos em tempo real.",
    fullDescription:
      "Pequeno projeto de estudo com foco em manipulação do DOM e no uso de setInterval para atualizar a interface em tempo real.",
    problem:
      "Entender manipulação do DOM, atualização periódica de estado e formatação de datas/horas em JavaScript.",
    contribution:
      "Implementei do zero a lógica de atualização, formatação com zero-padding e o layout responsivo do relógio.",
    year: 2023,
    coverUrl: null,
    repositoryUrl: "https://github.com/thalitapaiva/clocks",
    liveUrl: null,
    featured: true,
    displayOrder: 2,
    technologies: [...jsStack],
  },
  {
    id: "p3",
    title: "Weather",
    slug: "weather",
    shortDescription:
      "Interface de previsão do tempo construída como exercício de consumo de API e design de UI.",
    fullDescription:
      "Projeto de front-end pensado para praticar consumo de dados externos, tratamento de estados e criação de uma UI limpa focada em legibilidade.",
    problem:
      "Aprender a consumir APIs assíncronas em JavaScript e exibir os dados de forma clara e acessível.",
    contribution:
      "Modelei os componentes visuais, integrei a chamada à API e cuidei dos estados de carregamento e erro.",
    year: 2023,
    coverUrl: null,
    repositoryUrl: "https://github.com/thalitapaiva/weather",
    liveUrl: null,
    featured: true,
    displayOrder: 3,
    technologies: [...jsStack],
  },
  {
    id: "p4",
    title: "Sorteador de Amigo Secreto",
    slug: "sorteador-amigosecreto",
    shortDescription:
      "Aplicativo web para sortear amigo secreto entre participantes, sem repetições.",
    fullDescription:
      "Ferramenta web construída para automatizar sorteios de amigo secreto, garantindo que ninguém tire o próprio nome.",
    problem: "Automatizar o sorteio de amigo secreto de forma justa e evitar erros manuais.",
    contribution:
      "Desenvolvi a lógica de sorteio, a validação dos participantes e a interface responsiva do sorteador.",
    year: 2023,
    coverUrl: null,
    repositoryUrl: "https://github.com/thalitapaiva/sorteador-amigosecreto",
    liveUrl: null,
    featured: true,
    displayOrder: 4,
    technologies: [...jsStack],
  },
  {
    id: "p5",
    title: "Jogo da Velha",
    slug: "jogo-da-velha",
    shortDescription:
      "Implementação do clássico jogo da velha com detecção de vitória e reinício de partida.",
    fullDescription:
      "Projeto voltado à prática de lógica de jogos simples: controle de turnos, detecção de combinações vencedoras, empate e reinício.",
    problem:
      "Praticar máquinas de estado simples, verificação de condições de vitória e organização de código orientado a eventos.",
    contribution:
      "Modelei o tabuleiro, o estado do jogo e a UI clicável totalmente em JavaScript puro.",
    year: 2023,
    coverUrl: null,
    repositoryUrl: "https://github.com/thalitapaiva/jogo-da-velha",
    liveUrl: null,
    featured: true,
    displayOrder: 5,
    technologies: [...jsStack],
  },
  {
    id: "p6",
    title: "Projectgram",
    slug: "projectgram",
    shortDescription:
      "Protótipo de rede social inspirado no Instagram para estudo de layout em CSS.",
    fullDescription:
      "Projeto prático desenvolvido para estudar a estruturação de feeds, cards e layouts inspirados em redes sociais.",
    problem:
      "Reproduzir um layout complexo estilo rede social praticando Flexbox, Grid e composição de componentes reutilizáveis.",
    contribution:
      "Estruturei o HTML semântico, escrevi o CSS responsivo e organizei os componentes visuais do feed.",
    year: 2023,
    coverUrl: null,
    repositoryUrl: "https://github.com/thalitapaiva/projectgram",
    liveUrl: null,
    featured: true,
    displayOrder: 6,
    technologies: [...htmlCss],
  },
];

const now = new Date().toISOString();

export const FALLBACK_PROJECT_DETAILS: ProjectDetailDto[] = PROJECT_SEEDS.map((p) => ({
  ...p,
  published: true,
  createdAt: now,
  updatedAt: now,
}));

export const FALLBACK_PROJECTS: ProjectSummaryDto[] = FALLBACK_PROJECT_DETAILS.map(
  ({
    fullDescription: _fullDescription,
    problem: _problem,
    contribution: _contribution,
    published: _published,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    ...summary
  }) => summary,
);

export function getFallbackProject(slug: string): ProjectDetailDto | null {
  return FALLBACK_PROJECT_DETAILS.find((p) => p.slug === slug) ?? null;
}
