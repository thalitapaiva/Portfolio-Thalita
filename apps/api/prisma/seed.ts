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
    description:
      "Planejo cada projeto em etapas claras, uso boards e checklists para acompanhar o progresso e mantenho o repositório com histórico limpo e commits descritivos.",
  },
  {
    title: "Comunicação",
    description:
      "Escrevo READMEs e comentários objetivos, documento decisões e busco alinhamento com colegas de curso antes de encerrar cada entrega.",
  },
  {
    title: "Execução",
    description:
      "Priorizo entregar versões funcionais o quanto antes, itero com base em feedback e sempre reservo tempo para revisão e refino visual.",
  },
];

const linkedIn: LinkedInSeed = {
  name: "Thalita Paiva",
  headline:
    "UFES Information Systems student focused on continuous learning",
  summary:
    "Estudante de Sistemas de Informação na UFES apaixonada por construir interfaces limpas e código de qualidade. Aprendo em público através de projetos práticos de front-end, algoritmos e ferramentas do dia a dia de uma pessoa desenvolvedora.",
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "C",
    "Git & GitHub",
    "Responsive Design",
    "UI Prototyping",
  ],
  profileUrl: "https://www.linkedin.com/in/thalita-paiva-1301a122b/",
};

const technologies: TechnologySeed[] = [
  { name: "HTML5", slug: "html", icon: "html5" },
  { name: "CSS3", slug: "css", icon: "css3" },
  { name: "JavaScript", slug: "javascript", icon: "javascript" },
  { name: "TypeScript", slug: "typescript", icon: "typescript" },
  { name: "C", slug: "c", icon: "c" },
  { name: "Git", slug: "git", icon: "git" },
  { name: "GitHub Pages", slug: "github-pages", icon: "github" },
  { name: "Responsive Design", slug: "responsive-design", icon: "layout" },
  { name: "DOM API", slug: "dom-api", icon: "dom" },
];

const skills: SkillSeed[] = [
  // Frontend
  { name: "HTML5", category: SkillCategory.FRONTEND, icon: "html5", level: SkillLevel.WORKING, displayOrder: 1 },
  { name: "CSS3", category: SkillCategory.FRONTEND, icon: "css3", level: SkillLevel.WORKING, displayOrder: 2 },
  { name: "JavaScript", category: SkillCategory.FRONTEND, icon: "javascript", level: SkillLevel.WORKING, displayOrder: 3 },
  { name: "TypeScript", category: SkillCategory.FRONTEND, icon: "typescript", level: SkillLevel.FAMILIAR, displayOrder: 4 },
  { name: "Responsive Design", category: SkillCategory.FRONTEND, icon: "layout", level: SkillLevel.WORKING, displayOrder: 5 },
  { name: "DOM API", category: SkillCategory.FRONTEND, icon: "dom", level: SkillLevel.WORKING, displayOrder: 6 },

  // Backend / Programming
  { name: "C", category: SkillCategory.BACKEND, icon: "c", level: SkillLevel.FAMILIAR, displayOrder: 1 },
  { name: "Node.js (aprendendo)", category: SkillCategory.BACKEND, icon: "nodejs", level: SkillLevel.FAMILIAR, displayOrder: 2 },
  { name: "Fundamentos de POO", category: SkillCategory.BACKEND, icon: "code", level: SkillLevel.FAMILIAR, displayOrder: 3 },

  // Database
  { name: "SQL (fundamentos)", category: SkillCategory.DATABASE, icon: "database", level: SkillLevel.FAMILIAR, displayOrder: 1 },
  { name: "Modelagem de dados", category: SkillCategory.DATABASE, icon: "schema", level: SkillLevel.FAMILIAR, displayOrder: 2 },

  // DevOps / Tooling
  { name: "Git", category: SkillCategory.DEVOPS, icon: "git", level: SkillLevel.WORKING, displayOrder: 1 },
  { name: "GitHub", category: SkillCategory.DEVOPS, icon: "github", level: SkillLevel.WORKING, displayOrder: 2 },
  { name: "GitHub Pages", category: SkillCategory.DEVOPS, icon: "github", level: SkillLevel.FAMILIAR, displayOrder: 3 },
  { name: "VS Code", category: SkillCategory.DEVOPS, icon: "vscode", level: SkillLevel.WORKING, displayOrder: 4 },

  // Product / Soft skills
  { name: "Organização", category: SkillCategory.PRODUCT, icon: "check", level: SkillLevel.PROFICIENT, displayOrder: 1 },
  { name: "Comunicação", category: SkillCategory.PRODUCT, icon: "chat", level: SkillLevel.PROFICIENT, displayOrder: 2 },
  { name: "Trabalho em equipe", category: SkillCategory.PRODUCT, icon: "users", level: SkillLevel.PROFICIENT, displayOrder: 3 },
  { name: "Aprendizado contínuo", category: SkillCategory.PRODUCT, icon: "book", level: SkillLevel.PROFICIENT, displayOrder: 4 },
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
      { slug: "responsive-design" },
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
      { slug: "dom-api" },
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
      { slug: "dom-api" },
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
      { slug: "responsive-design" },
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
    heroLabel: "Estudante de Sistemas de Informação",
    headline:
      "Aprendendo continuamente para construir software com propósito.",
    shortBio:
      "Information Systems Student na UFES apaixonada por front-end, boas práticas de código e projetos que resolvem problemas reais.",
    aboutContent:
      "Sou estudante de Sistemas de Informação na Universidade Federal do Espírito Santo (UFES). Uso meu tempo fora da sala de aula para construir projetos práticos de front-end e aprofundar meus conhecimentos em desenvolvimento web, sempre buscando aprender ferramentas e conceitos novos. Acredito que aprender em público — publicando o que faço no GitHub e compartilhando meu progresso — é a forma mais honesta e efetiva de evoluir como desenvolvedora.",
    education:
      "Bacharelado em Sistemas de Informação — Universidade Federal do Espírito Santo (UFES)",
    interests:
      "Front-end, design de interfaces, boas práticas de código, algoritmos e ferramentas do dia a dia de uma pessoa desenvolvedora.",
    workStyle:
      "Organizada, comunicativa e focada em execução. Prefiro entregar cedo, iterar com base em feedback e manter o código legível e bem documentado.",
    goals:
      "Consolidar minha base em desenvolvimento web full-stack, contribuir com projetos open source e me preparar para minha primeira experiência profissional na área.",
    email: "[PLACEHOLDER] contact@example.com",
    location: "[PLACEHOLDER] Vitória — ES, Brasil",
    workPrinciples,
    linkedIn,
    seoTitle: "Thalita Paiva — Portfólio",
    seoDescription:
      "Portfólio de Thalita Paiva, estudante de Sistemas de Informação na UFES. Projetos de front-end, algoritmos e ferramentas construídas em público.",
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

    for (const t of project.technologies) {
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
