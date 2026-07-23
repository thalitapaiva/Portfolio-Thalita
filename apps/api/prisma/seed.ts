/**
 * Seed script for @portfolio/api.
 *
 * Populates the database with Thalita Paiva's real public information:
 *   - GitHub bio:            "Information Systems Student"
 *   - GitHub handle:         @thalitapaiva
 *   - LinkedIn URL:          https://www.linkedin.com/in/thalita-paiva-1301a122b/
 *   - Education (public):    Sistemas de Informação — UFES
 *   - Public repositories:   page-batman, clocks, weather,
 *                            sorteador-amigosecreto, jogo-da-velha, projectgram
 *
 * Anything the public profile does not disclose (personal email, exact
 * professional roles, locations, etc.) is marked with `[PLACEHOLDER]` so it can
 * be replaced without inventing facts.
 */

import {
  Prisma,
  PrismaClient,
  SkillCategory,
  SkillLevel,
} from "@prisma/client";

const prisma = new PrismaClient();

interface WorkPrincipleSeed {
  title: string;
  description: string;
}

interface LinkedInSeed {
  name: string;
  headline: string;
  summary: string;
  skills: string[];
  profileUrl: string;
}

interface TechnologySeed {
  name: string;
  slug: string;
  icon?: string;
}

interface ProjectSeed {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  contribution: string;
  year: number;
  repositoryUrl: string;
  liveUrl?: string;
  coverUrl?: string;
  featured: boolean;
  displayOrder: number;
  technologies: { slug: string; isPrimary?: boolean }[];
}

interface SkillSeed {
  name: string;
  category: SkillCategory;
  icon?: string;
  level?: SkillLevel | null;
  displayOrder: number;
}

interface SocialLinkSeed {
  label: string;
  url: string;
  platform: string;
  displayOrder: number;
}

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

const workPrinciples: WorkPrincipleSeed[] = [
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
];

const linkedIn: LinkedInSeed = {
  name: "Thalita Paiva",
  headline: "SI · UFES | Programação, processos e projetos",
  summary:
    "Estudante de Sistemas de Informação com foco em software e organização de entregas.",
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Git",
    "Gestão de projetos",
  ],
  profileUrl: "https://www.linkedin.com/in/thalita-paiva-1301a122b/",
};

const technologies: TechnologySeed[] = [
  { name: "HTML5", slug: "html", icon: "html5" },
  { name: "CSS3", slug: "css", icon: "css3" },
  { name: "JavaScript", slug: "javascript", icon: "javascript" },
  { name: "TypeScript", slug: "typescript", icon: "typescript" },
  { name: "React", slug: "react", icon: "react" },
  { name: "Next.js", slug: "nextjs", icon: "nextjs" },
  { name: "Node.js", slug: "nodejs", icon: "nodejs" },
  { name: "C", slug: "c", icon: "c" },
  { name: "PostgreSQL", slug: "postgresql", icon: "postgresql" },
  { name: "Git", slug: "git", icon: "git" },
  { name: "GitHub", slug: "github", icon: "github" },
  { name: "VS Code", slug: "vscode", icon: "vscode" },
  { name: "Figma", slug: "figma", icon: "figma" },
  { name: "Docker", slug: "docker", icon: "docker" },
];

const skills: SkillSeed[] = [
  { name: "JavaScript", category: SkillCategory.FRONTEND, icon: "javascript", level: SkillLevel.WORKING, displayOrder: 1 },
  { name: "TypeScript", category: SkillCategory.FRONTEND, icon: "typescript", level: SkillLevel.FAMILIAR, displayOrder: 2 },
  { name: "React", category: SkillCategory.FRONTEND, icon: "react", level: SkillLevel.FAMILIAR, displayOrder: 3 },
  { name: "HTML/CSS", category: SkillCategory.FRONTEND, icon: "html5", level: SkillLevel.WORKING, displayOrder: 4 },
  { name: "Node.js", category: SkillCategory.BACKEND, icon: "nodejs", level: SkillLevel.FAMILIAR, displayOrder: 5 },
  { name: "C", category: SkillCategory.BACKEND, icon: "c", level: SkillLevel.WORKING, displayOrder: 6 },
  { name: "PostgreSQL", category: SkillCategory.DATABASE, icon: "postgresql", level: SkillLevel.FAMILIAR, displayOrder: 7 },
  { name: "Git", category: SkillCategory.DEVOPS, icon: "git", level: SkillLevel.WORKING, displayOrder: 8 },
  { name: "Figma", category: SkillCategory.DEVOPS, icon: "figma", level: SkillLevel.FAMILIAR, displayOrder: 9 },
  { name: "Gestão de projetos", category: SkillCategory.PRODUCT, icon: "projectmgmt", level: SkillLevel.WORKING, displayOrder: 10 },
];

const projects: ProjectSeed[] = [
  {
    title: "Página do Batman",
    slug: "page-batman",
    shortDescription:
      "Landing page temática do Batman construída com HTML e CSS como exercício de layout e identidade visual.",
    fullDescription:
      "Projeto acadêmico/prático de front-end no qual explorei composição de seções, tipografia, uso de imagens e efeitos com CSS puro para reproduzir uma landing page temática. Serviu para consolidar conceitos de HTML semântico e estilização responsiva.",
    problem:
      "Praticar a criação de uma landing page com identidade visual forte usando apenas HTML e CSS, sem frameworks.",
    contribution:
      "Estruturei todo o HTML semântico, o design responsivo em CSS e o deploy da página como projeto pessoal.",
    year: 2023,
    repositoryUrl: "https://github.com/thalitapaiva/page-batman",
    featured: true,
    displayOrder: 1,
    technologies: [
      { slug: "html", isPrimary: true },
      { slug: "css", isPrimary: true },
      { slug: "css" },
    ],
  },
  {
    title: "Clocks",
    slug: "clocks",
    shortDescription:
      "Relógio digital em JavaScript puro que atualiza horas, minutos e segundos em tempo real.",
    fullDescription:
      "Pequeno projeto de estudo com foco em manipulação do DOM e no uso de `setInterval` para atualizar a interface em tempo real. A UI foi construída com HTML/CSS e toda a lógica temporal fica isolada em JavaScript.",
    problem:
      "Entender manipulação do DOM, atualização periódica de estado e formatação de datas/horas em JavaScript.",
    contribution:
      "Implementei do zero a lógica de atualização, formatação com zero-padding e o layout responsivo do relógio.",
    year: 2023,
    repositoryUrl: "https://github.com/thalitapaiva/clocks",
    featured: true,
    displayOrder: 2,
    technologies: [
      { slug: "html" },
      { slug: "css" },
      { slug: "javascript", isPrimary: true },
      { slug: "javascript" },
    ],
  },
  {
    title: "Weather",
    slug: "weather",
    shortDescription:
      "Interface de previsão do tempo construída como exercício de consumo de API e design de UI.",
    fullDescription:
      "Projeto de front-end pensado para praticar consumo de dados externos, tratamento de estados (carregando, erro, sucesso) e criação de uma UI limpa focada em legibilidade das informações climáticas.",
    problem:
      "Aprender a consumir APIs assíncronas em JavaScript e exibir os dados de forma clara e acessível.",
    contribution:
      "Modelei os componentes visuais, integrei a chamada à API e cuidei dos estados de carregamento e erro.",
    year: 2023,
    repositoryUrl: "https://github.com/thalitapaiva/weather",
    featured: true,
    displayOrder: 3,
    technologies: [
      { slug: "html" },
      { slug: "css" },
      { slug: "javascript", isPrimary: true },
    ],
  },
  {
    title: "Sorteador de Amigo Secreto",
    slug: "sorteador-amigosecreto",
    shortDescription:
      "Aplicativo web para sortear amigo secreto entre participantes, sem repetições.",
    fullDescription:
      "Ferramenta web construída para automatizar sorteios de amigo secreto, garantindo que ninguém tire o próprio nome. Foca em usabilidade, feedback imediato ao usuário e um fluxo simples de cadastro dos participantes.",
    problem:
      "Automatizar o sorteio de amigo secreto de forma justa e evitar erros manuais.",
    contribution:
      "Desenvolvi a lógica de sorteio, a validação dos participantes e a interface responsiva do sorteador.",
    year: 2023,
    repositoryUrl: "https://github.com/thalitapaiva/sorteador-amigosecreto",
    featured: true,
    displayOrder: 4,
    technologies: [
      { slug: "html" },
      { slug: "css" },
      { slug: "javascript", isPrimary: true },
      { slug: "javascript" },
    ],
  },
  {
    title: "Jogo da Velha",
    slug: "jogo-da-velha",
    shortDescription:
      "Implementação do clássico jogo da velha com detecção de vitória e reinício de partida.",
    fullDescription:
      "Projeto voltado à prática de lógica de jogos simples: controle de turnos, detecção de combinações vencedoras, empate e reinício. Ótimo exercício para estruturar estado em JavaScript sem frameworks.",
    problem:
      "Praticar máquinas de estado simples, verificação de condições de vitória e organização de código orientado a eventos.",
    contribution:
      "Modelei o tabuleiro, o estado do jogo e a UI clicável totalmente em JavaScript puro.",
    year: 2023,
    repositoryUrl: "https://github.com/thalitapaiva/jogo-da-velha",
    featured: true,
    displayOrder: 5,
    technologies: [
      { slug: "html" },
      { slug: "css" },
      { slug: "javascript", isPrimary: true },
    ],
  },
  {
    title: "Projectgram",
    slug: "projectgram",
    shortDescription:
      "Protótipo de rede social inspirado no Instagram para estudo de layout em CSS.",
    fullDescription:
      "Projeto prático desenvolvido para estudar a estruturação de feeds, cards e layouts inspirados em redes sociais. Foco em CSS avançado, responsividade e boa hierarquia visual.",
    problem:
      "Reproduzir um layout complexo estilo rede social praticando Flexbox, Grid e composição de componentes reutilizáveis.",
    contribution:
      "Estruturei o HTML semântico, escrevi o CSS responsivo e organizei os componentes visuais do feed.",
    year: 2023,
    repositoryUrl: "https://github.com/thalitapaiva/projectgram",
    featured: true,
    displayOrder: 6,
    technologies: [
      { slug: "html", isPrimary: true },
      { slug: "css", isPrimary: true },
      { slug: "css" },
    ],
  },
];

const socialLinks: SocialLinkSeed[] = [
  {
    label: "GitHub",
    url: "https://github.com/thalitapaiva",
    platform: "github",
    displayOrder: 1,
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/thalita-paiva-1301a122b/",
    platform: "linkedin",
    displayOrder: 2,
  },
];

const githubSelections: {
  repoFullName: string;
  displayOrder: number;
  enabled: boolean;
}[] = [
  { repoFullName: "thalitapaiva/page-batman", displayOrder: 1, enabled: true },
  { repoFullName: "thalitapaiva/clocks", displayOrder: 2, enabled: true },
  { repoFullName: "thalitapaiva/weather", displayOrder: 3, enabled: true },
  {
    repoFullName: "thalitapaiva/sorteador-amigosecreto",
    displayOrder: 4,
    enabled: true,
  },
  {
    repoFullName: "thalitapaiva/jogo-da-velha",
    displayOrder: 5,
    enabled: true,
  },
  { repoFullName: "thalitapaiva/projectgram", displayOrder: 6, enabled: true },
];

// -----------------------------------------------------------------------------
// Seed logic
// -----------------------------------------------------------------------------

async function seedProfile() {
  const data = {
    fullName: "Thalita Paiva",
    monogram: "TP",
    heroLabel: "SI · SOFTWARE · PROCESSOS",
    headline: "Programação, processos e projetos.",
    shortBio:
      "Estudante de Sistemas de Informação na UFES – Campus Alegre, com foco em desenvolvimento Full Stack.",
    aboutContent:
      "Sou estudante de Sistemas de Informação na Universidade Federal do Espírito Santo (UFES) – Campus Alegre. Tenho grande interesse em Desenvolvimento Full Stack e na criação de softwares que sejam modernos, eficientes e capazes de solucionar problemas reais.",
    education:
      "Sistemas de Informação — UFES (Campus Alegre)",
    interests:
      "Desenvolvimento Full Stack, softwares modernos e soluções para problemas reais.",
    workStyle:
      "Organizada, direta e orientada a entrega.",
    goals:
      "Base full-stack + processos para atuar em times de tecnologia.",
    email: "thfonp@gmail.com",
    location: "Espírito Santo, Brasil",
    workPrinciples: workPrinciples as unknown as Prisma.InputJsonValue,
    linkedIn: linkedIn as unknown as Prisma.InputJsonValue,
    seoTitle: "Thalita Paiva — Programação, processos e projetos",
    seoDescription:
      "Portfólio de Thalita Paiva, estudante de Sistemas de Informação na UFES. Projetos de programação sincronizados com o GitHub, com interesse em processos e gestão de projetos.",
  };

  const existing = await prisma.portfolioProfile.findFirst();
  if (existing) {
    await prisma.portfolioProfile.update({
      where: { id: existing.id },
      data,
    });
    console.log("  ↻ portfolio profile updated");
  } else {
    await prisma.portfolioProfile.create({ data });
    console.log("  + portfolio profile created");
  }
}

async function seedTechnologies() {
  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { slug: tech.slug },
      update: { name: tech.name, icon: tech.icon ?? null },
      create: { name: tech.name, slug: tech.slug, icon: tech.icon ?? null },
    });
  }
  console.log(`  ✓ ${technologies.length} technologies upserted`);
}

async function seedProjects() {
  for (const project of projects) {
    const saved = await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        shortDescription: project.shortDescription,
        fullDescription: project.fullDescription,
        problem: project.problem,
        contribution: project.contribution,
        year: project.year,
        coverUrl: project.coverUrl ?? null,
        repositoryUrl: project.repositoryUrl,
        liveUrl: project.liveUrl ?? null,
        featured: project.featured,
        published: true,
        displayOrder: project.displayOrder,
      },
      create: {
        title: project.title,
        slug: project.slug,
        shortDescription: project.shortDescription,
        fullDescription: project.fullDescription,
        problem: project.problem,
        contribution: project.contribution,
        year: project.year,
        coverUrl: project.coverUrl ?? null,
        repositoryUrl: project.repositoryUrl,
        liveUrl: project.liveUrl ?? null,
        featured: project.featured,
        published: true,
        displayOrder: project.displayOrder,
      },
    });

    await prisma.projectTechnology.deleteMany({
      where: { projectId: saved.id },
    });

    const seenTech = new Set<string>();
    for (const t of project.technologies) {
      if (seenTech.has(t.slug)) continue;
      seenTech.add(t.slug);
      const technology = await prisma.technology.findUnique({
        where: { slug: t.slug },
      });
      if (!technology) continue;
      await prisma.projectTechnology.create({
        data: {
          projectId: saved.id,
          technologyId: technology.id,
          isPrimary: t.isPrimary ?? false,
        },
      });
    }
  }
  console.log(`  ✓ ${projects.length} projects upserted`);
}

async function seedSkills() {
  await prisma.skill.deleteMany({});
  for (const skill of skills) {
    await prisma.skill.create({
      data: {
        name: skill.name,
        category: skill.category,
        icon: skill.icon ?? null,
        level: skill.level ?? null,
        displayOrder: skill.displayOrder,
      },
    });
  }
  console.log(`  ✓ ${skills.length} skills seeded`);
}

async function seedSocialLinks() {
  await prisma.socialLink.deleteMany({});
  for (const link of socialLinks) {
    await prisma.socialLink.create({ data: link });
  }
  console.log(`  ✓ ${socialLinks.length} social links seeded`);
}

async function seedGitHubSelections() {
  for (const sel of githubSelections) {
    await prisma.gitHubRepositorySelection.upsert({
      where: { repoFullName: sel.repoFullName },
      update: { displayOrder: sel.displayOrder, enabled: sel.enabled },
      create: sel,
    });
  }
  console.log(`  ✓ ${githubSelections.length} GitHub selections upserted`);
}

async function main() {
  console.log("Seeding @portfolio/api database...");
  await seedProfile();
  await seedTechnologies();
  await seedProjects();
  await seedSkills();
  await seedSocialLinks();
  await seedGitHubSelections();
  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
