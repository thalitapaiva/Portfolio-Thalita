"use client";

import * as React from "react";

export type Lang = "pt" | "en";

export const LANG_STORAGE_KEY = "portfolio-lang";

export type FocusAreaId = "operations" | "scrum" | "technology";
export type SkillGroupId = "technology" | "operations" | "agility";
export type ExperienceCaseId =
  | "planning"
  | "agile"
  | "reports"
  | "standardization";

export type Dictionary = {
  nav: {
    home: string;
    about: string;
    focus: string;
    skills: string;
    experience: string;
    projects: string;
    contact: string;
    mainAria: string;
    headerAria: string;
    backHome: string;
    openMenu: string;
    menu: string;
  };
  hero: {
    portfolioSr: string;
    headline: string;
    intro: string;
    viewProjects: string;
    viewExperience: string;
    contact: string;
    scrollAbout: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    education: {
      title: string;
      items: { period: string; label: string }[];
    };
  };
  focus: {
    title: string;
    description: string;
    areas: Record<
      FocusAreaId,
      { title: string; description: string; skills: string[] }
    >;
  };
  skills: {
    title: string;
    description: string;
    groups: Record<SkillGroupId, { title: string; items: string[] }>;
    tools: {
      title: string;
      technology: { title: string; items: string[] };
      management: { title: string; items: string[] };
    };
  };
  experience: {
    title: string;
    description: string;
    cases: Record<
      ExperienceCaseId,
      { title: string; description: string; activities: string[] }
    >;
  };
  results: {
    title: string;
    description: string;
    items: {
      projectsTracked: string;
      processesStructured: string;
      reworkReduction: string;
      sprintsFacilitated: string;
      peopleSupported: string;
      deadlineImprovement: string;
    };
  };
  projects: {
    title: string;
    description: string;
    showAll: string;
    showLess: string;
    empty: string;
    viewOnGithub: string;
    view: string;
    openOnGithub: (title: string) => string;
    technologies: string;
    filterAll: string;
    filterTechnology: string;
    filterOperations: string;
  };
  contact: {
    title: string;
    intro: string;
    name: string;
    namePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sending: string;
    send: string;
    antiSpam: string;
    successHoneypot: string;
    successDefault: string;
    errorDefault: string;
    errorConnection: string;
    validation: {
      nameMin: string;
      nameMax: string;
      messageMin: string;
      messageMax: string;
      website: string;
    };
  };
  theme: {
    light: string;
    dark: string;
  };
  language: {
    label: string;
    pt: string;
    en: string;
  };
  footer: {
    phrase: string;
  };
  projectContent: Record<string, { title: string; shortDescription: string }>;
};

const projectContentPt: Dictionary["projectContent"] = {
  "page-batman": {
    title: "Página do Batman",
    shortDescription: "Landing temática com HTML e CSS — layout e identidade visual.",
  },
  clocks: {
    title: "Clocks",
    shortDescription: "Relógio digital em JavaScript com atualização em tempo real.",
  },
  weather: {
    title: "Weather",
    shortDescription: "UI de previsão do tempo — API e design de interface.",
  },
  "sorteador-amigosecreto": {
    title: "Sorteador de Amigo Secreto",
    shortDescription: "Sorteio de amigo secreto sem repetições.",
  },
  "jogo-da-velha": {
    title: "Jogo da Velha",
    shortDescription: "Clássico com detecção de vitória e reinício.",
  },
  projectgram: {
    title: "Projectgram",
    shortDescription: "Protótipo de feed social para estudo de layout CSS.",
  },
};

const projectContentEn: Dictionary["projectContent"] = {
  "page-batman": {
    title: "Batman Page",
    shortDescription: "Themed landing with HTML and CSS — layout and visual identity.",
  },
  clocks: {
    title: "Clocks",
    shortDescription: "Digital clock in plain JavaScript, updating in real time.",
  },
  weather: {
    title: "Weather",
    shortDescription: "Weather forecast UI — API consumption and interface design.",
  },
  "sorteador-amigosecreto": {
    title: "Secret Santa Draw",
    shortDescription: "Secret Santa draw with no repeats.",
  },
  "jogo-da-velha": {
    title: "Tic-Tac-Toe",
    shortDescription: "Classic game with win detection and reset.",
  },
  projectgram: {
    title: "Projectgram",
    shortDescription: "Social feed prototype for CSS layout practice.",
  },
};

export const dictionaries: Record<Lang, Dictionary> = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      focus: "Atuação",
      skills: "Competências",
      experience: "Experiência",
      projects: "Projetos",
      contact: "Contato",
      mainAria: "Navegação principal",
      headerAria: "Cabeçalho principal",
      backHome: "voltar ao início",
      openMenu: "Abrir menu de navegação",
      menu: "Menu",
    },
    hero: {
      portfolioSr: "Portfólio",
      headline: "Tecnologia, operações e agilidade.",
      intro:
        "Business Operations · Scrum Master · tecnologia — processos claros e entregas acompanháveis.",
      viewProjects: "Ver projetos",
      viewExperience: "Minha atuação",
      contact: "Contato",
      scrollAbout: "Rolar para sobre",
    },
    about: {
      title: "Sobre",
      paragraphs: [
        "Estudante de Sistemas de Informação na UFES, com atuação em operações, projetos e métodos ágeis.",
        "Conecto estratégia, pessoas e tecnologia para transformar objetivos em processos claros e entregas acompanháveis.",
      ],
      education: {
        title: "Formação",
        items: [
          {
            period: "2025",
            label: "Gestão de Projetos e Processos — FGV",
          },
          {
            period: "2018 — 2020",
            label: "Técnico em Agroindústria — IFES Campus Alegre",
          },
          {
            period: "2020 — 2022",
            label: "Inglês intermediário ao avançado — Easy School",
          },
        ],
      },
    },
    focus: {
      title: "Áreas de atuação",
      description: "Estratégia, operação, processos e tecnologia no dia a dia.",
      areas: {
        operations: {
          title: "Business Operations",
          description: "Processos internos e execução alinhada à estratégia.",
          skills: [
            "Estruturação de processos",
            "Gestão operacional",
            "Padronização de fluxos",
            "Identificação de gargalos",
            "Acompanhamento de indicadores",
            "Gestão de riscos",
            "Melhoria contínua",
            "Integração entre áreas",
          ],
        },
        scrum: {
          title: "Scrum Master",
          description: "Facilitação ágil com foco em entrega e colaboração.",
          skills: [
            "Sprint Planning",
            "Daily Scrum",
            "Sprint Review",
            "Sprint Retrospective",
            "Refinamento de backlog",
            "Remoção de impedimentos",
            "Facilitação de reuniões",
            "Acompanhamento de entregas",
            "Comunicação com stakeholders",
            "Apoio à evolução do time",
          ],
        },
        technology: {
          title: "Tecnologia e Projetos",
          description: "Ponte entre negócio e desenvolvimento.",
          skills: [
            "Gestão de projetos",
            "Levantamento de requisitos",
            "Organização de backlog",
            "Documentação de processos",
            "Priorização de demandas",
            "Comunicação entre negócio e tecnologia",
            "Desenvolvimento Full Stack",
            "Interfaces e protótipos",
          ],
        },
      },
    },
    skills: {
      title: "Competências",
      description: "Stack, métodos e práticas do dia a dia.",
      groups: {
        technology: {
          title: "Tecnologia",
          items: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "HTML e CSS",
            "PostgreSQL",
            "Git",
            "GitHub",
            "Docker",
          ],
        },
        operations: {
          title: "Operações e Projetos",
          items: [
            "Business Operations",
            "Gestão de projetos",
            "Mapeamento de processos",
            "Gestão de indicadores",
            "Documentação",
            "Priorização",
            "Gestão de riscos",
            "Melhoria contínua",
          ],
        },
        agility: {
          title: "Agilidade e Colaboração",
          items: [
            "Scrum",
            "Kanban",
            "Gestão de backlog",
            "Planejamento de sprints",
            "Facilitação de reuniões",
            "Comunicação com stakeholders",
            "Times multidisciplinares",
            "Resolução de impedimentos",
          ],
        },
      },
      tools: {
        title: "Ferramentas",
        technology: {
          title: "Tecnologia",
          items: [
            "VS Code",
            "Figma",
            "GitHub",
            "Docker",
            "Postman",
            "npm / pnpm",
            "Vercel",
            "Chrome DevTools",
          ],
        },
        management: {
          title: "Gestão",
          items: [
            "Jira",
            "Trello",
            "Notion",
            "Miro",
            "Microsoft Excel",
            "Google Workspace",
            "Slack",
            "Microsoft Teams",
            "Azure DevOps",
            "Power BI",
          ],
        },
      },
    },
    experience: {
      title: "Experiência na prática",
      description: "Como organizo o trabalho e apoio equipes.",
      cases: {
        planning: {
          title: "Planejamento e acompanhamento",
          description:
            "Projetos em épicos, histórias e tarefas — com donos, prazos e progresso visíveis.",
          activities: [
            "Organização de backlog",
            "Planejamento por sprint",
            "Definição de responsáveis",
            "Acompanhamento de progresso",
            "Registro de impedimentos",
            "Consolidação para decisão",
          ],
        },
        agile: {
          title: "Processos ágeis",
          description:
            "Cerimônias e rotinas que melhoram comunicação, previsibilidade e alinhamento.",
          activities: [
            "Planejamento de sprint",
            "Acompanhamento das entregas",
            "Retrospectivas",
            "Refinamentos",
            "Identificação de gargalos",
            "Melhoria contínua do fluxo",
          ],
        },
        reports: {
          title: "Relatórios e indicadores",
          description:
            "Visão de produtividade, horas, progresso, retrabalho e qualidade.",
          activities: [
            "Definição de indicadores",
            "Consolidação de dados",
            "Análise de desvios",
            "Acompanhamento de produtividade",
            "Identificação de riscos",
            "Comunicação de resultados",
          ],
        },
        standardization: {
          title: "Padronização de processos",
          description:
            "Fluxos documentados para menos dispersão e mais clareza operacional.",
          activities: [
            "Mapeamento de processos",
            "Documentação de fluxos",
            "Etapas e responsáveis",
            "Centralização de informações",
            "Redução de retrabalho",
            "Organização da operação",
          ],
        },
      },
    },
    results: {
      title: "Resultados",
      description: "Indicadores reais da minha atuação profissional.",
      items: {
        projectsTracked: "projetos acompanhados",
        processesStructured: "processos estruturados",
        reworkReduction: "de redução de retrabalho",
        sprintsFacilitated: "sprints facilitadas",
        peopleSupported: "integrantes apoiados",
        deadlineImprovement: "de melhoria no cumprimento de prazos",
      },
    },
    projects: {
      title: "Projetos",
      description: "Seleção de trabalhos em tecnologia e resolução de problemas.",
      showAll: "Ver todos",
      showLess: "Ver menos",
      empty: "Projetos em breve.",
      viewOnGithub: "Ver no GitHub",
      view: "Ver",
      openOnGithub: (title) => `Abrir ${title} no GitHub`,
      technologies: "Tecnologias",
      filterAll: "Todos",
      filterTechnology: "Tecnologia",
      filterOperations: "Operações e processos",
    },
    contact: {
      title: "Contato",
      intro:
        "Aberta a conexões em Operations, Scrum, projetos e tecnologia.",
      name: "Nome",
      namePlaceholder: "Nome",
      message: "Mensagem",
      messagePlaceholder: "Sua mensagem",
      sending: "Enviando…",
      send: "Enviar mensagem",
      antiSpam: "Verificação anti-spam",
      successHoneypot: "Mensagem recebida.",
      successDefault: "Recebi sua mensagem. Obrigada!",
      errorDefault: "Não foi possível enviar sua mensagem.",
      errorConnection: "Erro de conexão. Verifique sua internet e tente novamente.",
      validation: {
        nameMin: "Informe seu nome (mínimo 2 caracteres).",
        nameMax: "Nome muito longo.",
        messageMin: "Descreva sua mensagem (mínimo 10 caracteres).",
        messageMax: "Mensagem muito longa (máximo 4000 caracteres).",
        website: "Este campo deve ficar vazio.",
      },
    },
    theme: {
      light: "Ativar modo claro",
      dark: "Ativar modo escuro",
    },
    language: {
      label: "Idioma",
      pt: "PT",
      en: "EN",
    },
    footer: {
      phrase: "Tecnologia, operações e agilidade.",
    },
    projectContent: projectContentPt,
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      focus: "Focus",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      mainAria: "Main navigation",
      headerAria: "Main header",
      backHome: "back to top",
      openMenu: "Open navigation menu",
      menu: "Menu",
    },
    hero: {
      portfolioSr: "Portfolio",
      headline: "Technology, operations, and agility.",
      intro:
        "Business Operations · Scrum Master · technology — clear processes and trackable delivery.",
      viewProjects: "View projects",
      viewExperience: "My work",
      contact: "Contact",
      scrollAbout: "Scroll to about",
    },
    about: {
      title: "About",
      paragraphs: [
        "Information Systems student at UFES, working across operations, projects, and agile practices.",
        "I connect strategy, people, and technology to turn goals into clear processes and trackable delivery.",
      ],
      education: {
        title: "Education",
        items: [
          {
            period: "2025",
            label: "Project and Process Management — FGV",
          },
          {
            period: "2018 — 2020",
            label: "Technical Degree in Agroindustry — IFES Campus Alegre",
          },
          {
            period: "2020 — 2022",
            label: "English, intermediate to advanced — Easy School",
          },
        ],
      },
    },
    focus: {
      title: "Areas of focus",
      description: "Strategy, operations, processes, and technology day to day.",
      areas: {
        operations: {
          title: "Business Operations",
          description: "Internal processes and execution aligned to strategy.",
          skills: [
            "Process design",
            "Operational management",
            "Flow standardization",
            "Bottleneck identification",
            "KPI tracking",
            "Risk management",
            "Continuous improvement",
            "Cross-team integration",
          ],
        },
        scrum: {
          title: "Scrum Master",
          description: "Agile facilitation focused on delivery and collaboration.",
          skills: [
            "Sprint Planning",
            "Daily Scrum",
            "Sprint Review",
            "Sprint Retrospective",
            "Backlog refinement",
            "Impediment removal",
            "Meeting facilitation",
            "Delivery tracking",
            "Stakeholder communication",
            "Team growth support",
          ],
        },
        technology: {
          title: "Technology & Projects",
          description: "Bridging business and development.",
          skills: [
            "Project management",
            "Requirements gathering",
            "Backlog organization",
            "Process documentation",
            "Demand prioritization",
            "Business–tech communication",
            "Full Stack development",
            "Interfaces and prototypes",
          ],
        },
      },
    },
    skills: {
      title: "Skills",
      description: "Stack, methods, and day-to-day practices.",
      groups: {
        technology: {
          title: "Technology",
          items: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "HTML & CSS",
            "PostgreSQL",
            "Git",
            "GitHub",
            "Docker",
          ],
        },
        operations: {
          title: "Operations & Projects",
          items: [
            "Business Operations",
            "Project management",
            "Process mapping",
            "KPI management",
            "Documentation",
            "Prioritization",
            "Risk management",
            "Continuous improvement",
          ],
        },
        agility: {
          title: "Agility & Collaboration",
          items: [
            "Scrum",
            "Kanban",
            "Backlog management",
            "Sprint planning",
            "Meeting facilitation",
            "Stakeholder communication",
            "Multidisciplinary teams",
            "Impediment resolution",
          ],
        },
      },
      tools: {
        title: "Tools",
        technology: {
          title: "Technology",
          items: [
            "VS Code",
            "Figma",
            "GitHub",
            "Docker",
            "Postman",
            "npm / pnpm",
            "Vercel",
            "Chrome DevTools",
          ],
        },
        management: {
          title: "Management",
          items: [
            "Jira",
            "Trello",
            "Notion",
            "Miro",
            "Microsoft Excel",
            "Google Workspace",
            "Slack",
            "Microsoft Teams",
            "Azure DevOps",
            "Power BI",
          ],
        },
      },
    },
    experience: {
      title: "Experience in practice",
      description: "How I organize work and support teams.",
      cases: {
        planning: {
          title: "Planning and delivery tracking",
          description:
            "Projects broken into epics, stories, and tasks — with clear owners, deadlines, and progress.",
          activities: [
            "Backlog organization",
            "Sprint planning",
            "Owner assignment",
            "Progress tracking",
            "Impediment logging",
            "Decision-ready consolidation",
          ],
        },
        agile: {
          title: "Agile processes",
          description:
            "Ceremonies and routines that improve communication, predictability, and alignment.",
          activities: [
            "Sprint planning",
            "Delivery follow-up",
            "Retrospectives",
            "Refinement sessions",
            "Bottleneck identification",
            "Continuous workflow improvement",
          ],
        },
        reports: {
          title: "Reports and indicators",
          description:
            "Visibility into productivity, hours, progress, rework, and quality.",
          activities: [
            "Indicator definition",
            "Data consolidation",
            "Variance analysis",
            "Productivity tracking",
            "Risk identification",
            "Results communication",
          ],
        },
        standardization: {
          title: "Process standardization",
          description:
            "Documented flows for less scatter and clearer operations.",
          activities: [
            "Process mapping",
            "Flow documentation",
            "Stage and owner definition",
            "Information centralization",
            "Rework reduction",
            "Operations organization",
          ],
        },
      },
    },
    results: {
      title: "Results",
      description: "Real indicators from my professional work.",
      items: {
        projectsTracked: "projects tracked",
        processesStructured: "processes structured",
        reworkReduction: "rework reduction",
        sprintsFacilitated: "sprints facilitated",
        peopleSupported: "people supported",
        deadlineImprovement: "deadline adherence improvement",
      },
    },
    projects: {
      title: "Projects",
      description: "Selected work in technology and problem-solving.",
      showAll: "Show all",
      showLess: "Show less",
      empty: "Projects coming soon.",
      viewOnGithub: "View on GitHub",
      view: "View",
      openOnGithub: (title) => `Open ${title} on GitHub`,
      technologies: "Technologies",
      filterAll: "All",
      filterTechnology: "Technology",
      filterOperations: "Operations & processes",
    },
    contact: {
      title: "Contact",
      intro:
        "Open to connections in Operations, Scrum, projects, and technology.",
      name: "Name",
      namePlaceholder: "Name",
      message: "Message",
      messagePlaceholder: "Your message",
      sending: "Sending…",
      send: "Send message",
      antiSpam: "Anti-spam verification",
      successHoneypot: "Message received.",
      successDefault: "Got your message. Thank you!",
      errorDefault: "Could not send your message.",
      errorConnection: "Connection error. Check your internet and try again.",
      validation: {
        nameMin: "Enter your name (at least 2 characters).",
        nameMax: "Name is too long.",
        messageMin: "Write your message (at least 10 characters).",
        messageMax: "Message is too long (max 4000 characters).",
        website: "This field must stay empty.",
      },
    },
    theme: {
      light: "Switch to light mode",
      dark: "Switch to dark mode",
    },
    language: {
      label: "Language",
      pt: "PT",
      en: "EN",
    },
    footer: {
      phrase: "Technology, operations, and agility.",
    },
    projectContent: projectContentEn,
  },
};

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const LangContext = React.createContext<LangContextValue | null>(null);

function readStoredLang(): Lang {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
  return stored === "en" || stored === "pt" ? stored : "pt";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("pt");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const initial = readStoredLang();
    setLangState(initial);
    document.documentElement.lang = initial === "pt" ? "pt-BR" : "en";
    setMounted(true);
  }, []);

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(LANG_STORAGE_KEY, next);
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
  }, []);

  const value = React.useMemo<LangContextValue>(
    () => ({
      lang: mounted ? lang : "pt",
      setLang,
      t: dictionaries[mounted ? lang : "pt"],
    }),
    [lang, mounted, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = React.useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within LanguageProvider");
  }
  return ctx;
}
