"use client";

import * as React from "react";

export type Lang = "pt" | "en";

export const LANG_STORAGE_KEY = "portfolio-lang";

export type Dictionary = {
  nav: {
    home: string;
    about: string;
    skills: string;
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
    viewProjects: string;
    contact: string;
    scrollAbout: string;
  };
  about: {
    title: string;
    body: string;
  };
  skills: {
    title: string;
    description: string;
    projectManagement: string;
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
  };
  contact: {
    title: string;
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
  projectContent: Record<
    string,
    { title: string; shortDescription: string }
  >;
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
    shortDescription:
      "Classic tic-tac-toe with win detection and match reset.",
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
      skills: "Competências",
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
      headline: "Programação, processos e projetos.",
      viewProjects: "Ver projetos",
      contact: "Contato",
      scrollAbout: "Rolar para sobre",
    },
    about: {
      title: "Sobre",
      body: "Sou estudante de Sistemas de Informação na Universidade Federal do Espírito Santo (UFES) – Campus Alegre. Tenho grande interesse em Desenvolvimento Full Stack e na criação de softwares que sejam modernos, eficientes e capazes de solucionar problemas reais.",
    },
    skills: {
      title: "Stack",
      description: "Linguagens, ferramentas e práticas que uso no dia a dia.",
      projectManagement: "Gestão de projetos",
    },
    projects: {
      title: "Projetos",
      description:
        "Trabalhos selecionados — landing pages, UIs e exercícios de front-end. Clique para abrir no GitHub.",
      showAll: "Ver todos",
      showLess: "Ver menos",
      empty: "Projetos em breve.",
      viewOnGithub: "Ver no GitHub",
      view: "Ver",
      openOnGithub: (title) => `Abrir ${title} no GitHub`,
      technologies: "Tecnologias",
    },
    contact: {
      title: "Contato",
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
      phrase: "Programação, processos e projetos.",
    },
    projectContent: projectContentPt,
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
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
      headline: "Programming, processes, and projects.",
      viewProjects: "View projects",
      contact: "Contact",
      scrollAbout: "Scroll to about",
    },
    about: {
      title: "About",
      body: "I'm an Information Systems student at the Federal University of Espírito Santo (UFES) – Alegre Campus. I'm passionate about Full Stack development and building modern, efficient software that solves real problems.",
    },
    skills: {
      title: "Stack",
      description: "Languages, tools, and practices I use day to day.",
      projectManagement: "Project management",
    },
    projects: {
      title: "Projects",
      description:
        "Selected work — landing pages, UIs, and front-end exercises. Click to open on GitHub.",
      showAll: "Show all",
      showLess: "Show less",
      empty: "Projects coming soon.",
      viewOnGithub: "View on GitHub",
      view: "View",
      openOnGithub: (title) => `Open ${title} on GitHub`,
      technologies: "Technologies",
    },
    contact: {
      title: "Contact",
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
      phrase: "Programming, processes, and projects.",
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
