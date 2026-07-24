"use client";

import * as React from "react";

export type Lang = "pt" | "en";

export const LANG_STORAGE_KEY = "portfolio-lang";

export type FocusAreaId = "operations" | "scrum" | "technology";
export type SkillGroupId = "technology" | "operations" | "agility" | "tools";
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
    shortDescription:
      "Landing page temática do Batman construída com HTML e CSS como exercício de layout e identidade visual.",
  },
  clocks: {
    title: "Clocks",
    shortDescription:
      "Relógio digital em JavaScript puro que atualiza horas, minutos e segundos em tempo real.",
  },
  weather: {
    title: "Weather",
    shortDescription:
      "Interface de previsão do tempo construída como exercício de consumo de API e design de UI.",
  },
  "sorteador-amigosecreto": {
    title: "Sorteador de Amigo Secreto",
    shortDescription:
      "Aplicativo web para sortear amigo secreto entre participantes, sem repetições.",
  },
  "jogo-da-velha": {
    title: "Jogo da Velha",
    shortDescription:
      "Implementação do clássico jogo da velha com detecção de vitória e reinício de partida.",
  },
  projectgram: {
    title: "Projectgram",
    shortDescription:
      "Protótipo de rede social inspirado no Instagram para estudo de layout em CSS.",
  },
};

const projectContentEn: Dictionary["projectContent"] = {
  "page-batman": {
    title: "Batman Page",
    shortDescription:
      "Batman-themed landing page built with HTML and CSS as a layout and visual identity exercise.",
  },
  clocks: {
    title: "Clocks",
    shortDescription:
      "Digital clock in plain JavaScript that updates hours, minutes, and seconds in real time.",
  },
  weather: {
    title: "Weather",
    shortDescription:
      "Weather forecast UI built as an exercise in API consumption and interface design.",
  },
  "sorteador-amigosecreto": {
    title: "Secret Santa Draw",
    shortDescription:
      "Web app to draw Secret Santa names among participants, with no repeats.",
  },
  "jogo-da-velha": {
    title: "Tic-Tac-Toe",
    shortDescription: "Classic tic-tac-toe with win detection and match reset.",
  },
  projectgram: {
    title: "Projectgram",
    shortDescription:
      "Instagram-inspired social feed prototype for practicing CSS layout.",
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
      headline:
        "Tecnologia, operações e agilidade para transformar processos em resultados.",
      intro:
        "Business Operations Manager, Scrum Master e profissional de tecnologia, atuando na estruturação de processos, organização de projetos e conexão entre estratégia, negócio e times de desenvolvimento.",
      viewProjects: "Ver projetos",
      viewExperience: "Conheça minha atuação",
      contact: "Contato",
      scrollAbout: "Rolar para sobre",
    },
    about: {
      title: "Sobre",
      paragraphs: [
        "Sou estudante de Sistemas de Informação na Universidade Federal do Espírito Santo — UFES, com experiência em gestão de operações, organização de projetos, melhoria de processos e metodologias ágeis.",
        "Atuo conectando estratégia, pessoas e tecnologia para transformar objetivos de negócio em processos claros, atividades priorizadas e entregas acompanháveis. Como Scrum Master, apoio times multidisciplinares na organização de sprints, remoção de impedimentos, melhoria da comunicação e evolução contínua da forma de trabalho.",
        "Minha formação técnica também me permite compreender o contexto dos times de desenvolvimento, contribuir com decisões mais consistentes e facilitar a comunicação entre áreas técnicas, operacionais e estratégicas.",
      ],
    },
    focus: {
      title: "Áreas de atuação",
      description:
        "Como conecto estratégia, operação, processos e tecnologia no dia a dia.",
      areas: {
        operations: {
          title: "Business Operations",
          description:
            "Estruturação da operação, organização de processos internos e acompanhamento das atividades necessárias para transformar objetivos estratégicos em execução.",
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
          description:
            "Facilitação do trabalho de times ágeis, promovendo organização, transparência, colaboração e evolução contínua das entregas.",
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
          description:
            "Uso da visão técnica para compreender necessidades, apoiar decisões, organizar demandas e facilitar a comunicação entre negócio e desenvolvimento.",
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
      description:
        "Tecnologias, métodos e práticas que fazem parte da minha atuação.",
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
        tools: {
          title: "Ferramentas",
          items: ["Figma", "VS Code"],
        },
      },
    },
    experience: {
      title: "Experiência na prática",
      description:
        "Iniciativas de operação, processos e agilidade que demonstram como organizo o trabalho e apoio equipes.",
      cases: {
        planning: {
          title: "Estruturação de planejamento e acompanhamento de projetos",
          description:
            "Organização de projetos em épicos, histórias, tarefas e subtarefas, criando maior visibilidade sobre responsáveis, prioridades, prazos e andamento das entregas.",
          activities: [
            "Organização de backlog",
            "Planejamento mensal e por sprint",
            "Definição de responsáveis",
            "Acompanhamento de progresso",
            "Registro de impedimentos",
            "Consolidação de informações para tomada de decisão",
          ],
        },
        agile: {
          title: "Implementação de processos ágeis",
          description:
            "Estruturação de cerimônias e rotinas de acompanhamento para melhorar a comunicação, a previsibilidade e o alinhamento entre os integrantes do time.",
          activities: [
            "Planejamento de sprint",
            "Acompanhamento das entregas",
            "Retrospectivas",
            "Refinamentos",
            "Identificação de gargalos",
            "Melhoria contínua do fluxo de trabalho",
          ],
        },
        reports: {
          title: "Relatórios operacionais e indicadores",
          description:
            "Criação de relatórios para acompanhar produtividade, horas planejadas e realizadas, andamento dos projetos, retrabalho, custos e qualidade das entregas.",
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
          title: "Padronização de processos internos",
          description:
            "Mapeamento e documentação de fluxos para reduzir informações dispersas, melhorar a organização e tornar os processos mais fáceis de acompanhar.",
          activities: [
            "Mapeamento de processos",
            "Documentação de fluxos",
            "Definição de etapas e responsáveis",
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
      description:
        "Projetos técnicos e iniciativas que representam minha evolução em tecnologia, organização de processos e resolução de problemas.",
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
        "Estou aberta a conexões, projetos e oportunidades relacionadas a Business Operations, Scrum, gestão de projetos, processos e tecnologia.",
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
      headline:
        "Technology, operations, and agility to turn processes into results.",
      intro:
        "Business Operations Manager, Scrum Master, and technology professional — structuring processes, organizing projects, and connecting strategy, business, and development teams.",
      viewProjects: "View projects",
      viewExperience: "Explore my work",
      contact: "Contact",
      scrollAbout: "Scroll to about",
    },
    about: {
      title: "About",
      paragraphs: [
        "I'm an Information Systems student at the Federal University of Espírito Santo — UFES, with experience in operations management, project organization, process improvement, and agile practices.",
        "I connect strategy, people, and technology to turn business goals into clear processes, prioritized work, and trackable delivery. As a Scrum Master, I support multidisciplinary teams with sprint organization, impediment removal, clearer communication, and continuous improvement of how work gets done.",
        "My technical background also helps me understand development contexts, contribute to more consistent decisions, and bridge technical, operational, and strategic areas.",
      ],
    },
    focus: {
      title: "Areas of focus",
      description:
        "How I connect strategy, operations, processes, and technology day to day.",
      areas: {
        operations: {
          title: "Business Operations",
          description:
            "Structuring operations, organizing internal processes, and tracking the work needed to turn strategic goals into execution.",
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
          description:
            "Facilitating agile teams with organization, transparency, collaboration, and continuous delivery improvement.",
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
          description:
            "Using a technical lens to understand needs, support decisions, organize demand, and bridge business and development.",
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
      description:
        "Technologies, methods, and practices that shape how I work.",
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
        tools: {
          title: "Tools",
          items: ["Figma", "VS Code"],
        },
      },
    },
    experience: {
      title: "Experience in practice",
      description:
        "Operations, process, and agility initiatives that show how I organize work and support teams.",
      cases: {
        planning: {
          title: "Project planning and delivery tracking",
          description:
            "Organizing projects into epics, stories, tasks, and subtasks to create clearer visibility of owners, priorities, deadlines, and delivery progress.",
          activities: [
            "Backlog organization",
            "Monthly and sprint planning",
            "Owner assignment",
            "Progress tracking",
            "Impediment logging",
            "Decision-ready information consolidation",
          ],
        },
        agile: {
          title: "Agile process implementation",
          description:
            "Structuring ceremonies and follow-up routines to improve communication, predictability, and alignment across the team.",
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
          title: "Operational reports and indicators",
          description:
            "Building reports to track productivity, planned vs. actual hours, project progress, rework, costs, and delivery quality.",
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
          title: "Internal process standardization",
          description:
            "Mapping and documenting flows to reduce scattered information, improve organization, and make processes easier to follow.",
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
      description:
        "Technical projects and initiatives that reflect my growth in technology, process organization, and problem-solving.",
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
        "I'm open to connections, projects, and opportunities related to Business Operations, Scrum, project management, processes, and technology.",
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
