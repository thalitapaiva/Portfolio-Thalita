"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Code2,
  Database,
  FolderKanban,
  GitBranch,
  Github,
  Globe2,
  Linkedin,
  Menu,
  Minus,
  Pause,
  Play,
  Plus,
  Workflow,
  X,
} from "lucide-react";
import type {
  PortfolioProfileDto,
  ProjectSummaryDto,
  SocialLinkDto,
} from "@portfolio/types";
import { useLang, type ExperienceCaseId } from "@/lib/i18n";
import {
  TECHNOLOGY_SKILLS,
  TOOL_MANAGEMENT,
  TOOL_TECHNOLOGY,
  OPERATIONS_SKILLS,
  AGILITY_SKILLS,
  type SkillChipDef,
} from "@/lib/skills-catalog";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import styles from "./BluePortfolio.module.css";

type Props = {
  profile: PortfolioProfileDto | null;
  projects: ProjectSummaryDto[];
  socialLinks: SocialLinkDto[];
};
const cases: ExperienceCaseId[] = [
  "planning",
  "agile",
  "reports",
  "standardization",
];
const caseIcons = [FolderKanban, Workflow, BarChart3, GitBranch];
const caseTools = [
  ["Jira", "Trello", "Azure DevOps"],
  ["Miro", "Slack", "Microsoft Teams"],
  ["Microsoft Excel", "Power BI"],
  ["Notion", "Google Workspace"],
];

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 12H20V34M13 6H34V20M6 27L27 6M15 34L34 15"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
    </svg>
  );
}

function SystemSculpture() {
  return (
    <svg
      className={styles.sculpture}
      viewBox="0 0 620 620"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="tp-metal"
          x1="100"
          y1="70"
          x2="530"
          y2="530"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e1f0ff" />
          <stop offset=".2" stopColor="#5788ff" />
          <stop offset=".43" stopColor="#1041c6" />
          <stop offset=".54" stopColor="#a8cdff" />
          <stop offset=".65" stopColor="#3271ff" />
          <stop offset="1" stopColor="#081b68" />
        </linearGradient>
        <linearGradient
          id="tp-panel"
          x1="240"
          y1="180"
          x2="430"
          y2="460"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#254dcb" />
          <stop offset="1" stopColor="#10266c" />
        </linearGradient>
        <pattern
          id="tp-grid"
          width="35"
          height="35"
          patternUnits="userSpaceOnUse"
        >
          <path d="M35 0H0V35" stroke="#8db4ff" strokeOpacity=".09" />
        </pattern>
      </defs>
      <rect width="620" height="620" fill="url(#tp-grid)" />
      <g stroke="#87aeff" strokeWidth="1" opacity=".35">
        <path d="M72 370L310 508L552 368V188L310 49L72 188V370Z" />
        <path d="M72 188L310 327L552 188M310 327V508M310 49V228L72 370M310 228L552 368" />
        <path
          d="M72 278L310 418L552 278M191 118L430 257V438M430 118L191 257V438"
          strokeDasharray="3 6"
        />
      </g>
      <g className={styles.sculptureBack}>
        <path
          d="M310 97L492 203L310 309L128 203L310 97Z"
          stroke="url(#tp-metal)"
          strokeWidth="29"
          strokeLinejoin="round"
        />
        <path
          d="M310 111L468 203L310 295L152 203L310 111Z"
          stroke="#c8e3ff"
          strokeOpacity=".6"
        />
        <path d="M310 182L347 203L310 224L273 203L310 182Z" fill="#8cb5ff" />
      </g>
      <g className={styles.sculptureFront}>
        <path
          d="M128 266L310 371L492 266V327L310 433L128 327V266Z"
          fill="#0b1d58"
        />
        <path
          d="M310 160L492 266L310 371L128 266L310 160Z"
          fill="url(#tp-panel)"
          stroke="#709cff"
          strokeWidth="1.5"
        />
        <path
          d="M310 179L460 266L310 352L160 266L310 179Z"
          stroke="#86b2ff"
          strokeOpacity=".4"
        />
        <path
          d="M260 245L228 263L260 281M360 245L392 263L360 281M333 226L287 301"
          stroke="#dceaff"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M128 327L310 433L492 327M310 371V433" stroke="#5183ff" />
        <path
          className={styles.signal}
          d="M128 327L310 433L492 327"
          stroke="#d3e9ff"
          strokeWidth="2"
          strokeDasharray="40 400"
        />
      </g>
      <g className={styles.sculptureLow}>
        <path
          d="M310 393L450 475L310 556L170 475L310 393Z"
          fill="#15368b"
          stroke="#517fff"
        />
        <path
          d="M250 473L270 461V486L250 498V473ZM293 448L313 436V511L293 523V448ZM336 451L356 439V486L336 498V451Z"
          fill="url(#tp-metal)"
        />
      </g>
      <g stroke="#98bfff" strokeWidth="1.5">
        <circle cx="72" cy="188" r="5" fill="#245cff" />
        <circle cx="552" cy="368" r="5" fill="#245cff" />
        <path d="M70 188H26M552 368H594M310 49V22" />
        <path d="M20 182V194M588 362V374M304 22H316" />
      </g>
      <g fill="#a9c3fa" fontFamily="monospace" fontSize="10" letterSpacing="2">
        <text x="30" y="153">
          PEOPLE
        </text>
        <text x="475" y="417">
          PROCESS
        </text>
        <text x="257" y="599">
          TECHNOLOGY
        </text>
      </g>
    </svg>
  );
}

function ToolIcon({ tool }: { tool: SkillChipDef }) {
  // Local symbols keep the toolbox independent of third-party image CDNs.
  const key = tool.icon;
  const symbols: Record<string, string> = {
    javascript: "JS",
    typescript: "TS",
    c: "C",
    nextjs: "N",
    nodejs: "N",
    html5: "5",
    css3: "3",
    figma: "Fi",
    jira: "Ji",
    trello: "Tr",
    notion: "N",
    miro: "mi",
    excel: "X",
    powerbi: "BI",
    vscode: "</>",
    postman: "P",
    npm: "npm",
    slack: "#",
    teams: "T",
    azuredevops: "Az",
    chromedevtools: "Cr",
  };
  if (key === "react")
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.3">
          <ellipse cx="16" cy="16" rx="14" ry="5.5" />
          <ellipse
            cx="16"
            cy="16"
            rx="14"
            ry="5.5"
            transform="rotate(60 16 16)"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="14"
            ry="5.5"
            transform="rotate(120 16 16)"
          />
        </g>
        <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      </svg>
    );
  if (key === "github") return <Github aria-hidden="true" />;
  if (key === "git") return <GitBranch aria-hidden="true" />;
  if (key === "postgresql") return <Database aria-hidden="true" />;
  if (key === "vercel")
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 5L30 28H2Z" fill="currentColor" />
      </svg>
    );
  if (key === "googleworkspace") return <Globe2 aria-hidden="true" />;
  if (key === "docker")
    return (
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M3 17H26C26 25 20 28 12 28C6 28 3 24 3 17ZM5 11H10V16H5ZM11 11H16V16H11ZM17 11H22V16H17ZM11 5H16V10H11ZM17 5H22V10H17ZM23 12L27 8L30 13L26 17Z" />
      </svg>
    );
  if (symbols[key]) return <span aria-hidden="true">{symbols[key]}</span>;
  return <Workflow aria-hidden="true" />;
}

function ProjectArtwork({
  project,
  index,
}: {
  project: ProjectSummaryDto;
  index: number;
}) {
  const kind = /clock/.test(project.slug)
    ? "clock"
    : /weather/.test(project.slug)
      ? "weather"
      : /batman/.test(project.slug)
        ? "batman"
        : "code";
  return (
    <div className={`${styles.projectArt} ${styles[kind]}`} aria-hidden="true">
      <div className={styles.artGrid} />
      <span className={styles.artIndex}>
        EXPERIMENT / {String(index + 1).padStart(2, "0")}
      </span>
      {kind === "clock" ? (
        <div className={styles.clockFace}>
          <span>12</span>
          <span>03</span>
          <span>06</span>
          <span>09</span>
          <i />
          <b />
          <em />
        </div>
      ) : kind === "weather" ? (
        <div className={styles.weatherArt}>
          <div className={styles.sun} />
          <div className={styles.cloud} />
          <span>
            24<sup>°</sup>
          </span>
          <small>WEATHER / API</small>
        </div>
      ) : kind === "batman" ? (
        <div className={styles.batArt}>
          <svg viewBox="0 0 300 180">
            <path
              d="M150 25L170 60L192 45L196 78L285 54L252 113L204 110L176 143L150 123L124 143L96 110L48 113L15 54L104 78L108 45L130 60Z"
              fill="currentColor"
            />
          </svg>
          <strong>GOTHAM</strong>
        </div>
      ) : (
        <div className={styles.codeArt}>
          <Code2 />
          <span>{project.technologies[0]?.technology.name ?? "CODE"}</span>
          <span>{project.title}</span>
        </div>
      )}
      <span className={styles.artCaption}>THALITA PAIVA — {project.year}</span>
    </div>
  );
}

export function BluePortfolio({ profile, projects, socialLinks }: Props) {
  const { lang, setLang, t } = useLang();
  const en = lang === "en";
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [toolGroup, setToolGroup] = React.useState<
    "code" | "management" | "tools"
  >("management");
  const [stage, setStage] = React.useState(0);
  const [allProjects, setAllProjects] = React.useState(false);
  const reduced = useReducedMotion();
  const heroRef = React.useRef<HTMLElement>(null);
  const heroVisible = useInView(heroRef);
  const { scrollYProgress } = useScroll();
  const email = profile?.email || "thfonp@gmail.com";
  const links = socialLinks.length
    ? socialLinks
    : [
        {
          id: "gh",
          label: "GitHub",
          url: "https://github.com/thalitapaiva",
          platform: "github",
        },
        {
          id: "li",
          label: "LinkedIn",
          url: "https://www.linkedin.com/in/thalita-paiva-1301a122b/",
          platform: "linkedin",
        },
      ];
  const nav = [
    ["sobre", t.nav.about],
    ["experiencia", t.nav.experience],
    ["competencias", en ? "Toolbox" : "Ferramentas"],
    ["projetos", t.nav.projects],
  ];
  const tools =
    toolGroup === "code"
      ? [
          ...TECHNOLOGY_SKILLS,
          { icon: "c" as const, label: { pt: "C", en: "C" } },
        ]
      : toolGroup === "management"
        ? TOOL_MANAGEMENT
        : TOOL_TECHNOLOGY;
  const stages = en
    ? ["Understand", "Organize", "Build", "Deliver"]
    : ["Entender", "Organizar", "Construir", "Entregar"];
  const stageText = en
    ? [
        "Listen, map needs, and define the problem before choosing a solution.",
        "Turn priorities into a visible backlog, with clear owners and next steps.",
        "Connect business and development through short cycles and continuous alignment.",
        "Follow indicators, share results, and improve the next cycle.",
      ]
    : [
        "Ouvir, mapear necessidades e definir o problema antes de escolher a solução.",
        "Transformar prioridades em um backlog visível, com responsáveis e próximos passos.",
        "Conectar negócio e desenvolvimento com ciclos curtos e alinhamento contínuo.",
        "Acompanhar indicadores, comunicar resultados e melhorar o próximo ciclo.",
      ];
  React.useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  return (
    <MotionConfig reducedMotion={paused ? "always" : "user"}>
      <div
        className={styles.portfolio}
        data-motion={paused || reduced ? "paused" : "running"}
      >
        <motion.div
          className={styles.readingProgress}
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
        <header className={styles.header}>
          <a
            href="#inicio"
            className={styles.brand}
            aria-label="Thalita Paiva — início"
          >
            <Mark />
            <span>
              thalita<span className={styles.brandDot}>.</span>paiva
            </span>
          </a>
          <nav className={styles.desktopNav} aria-label={t.nav.mainAria}>
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className={styles.headerActions}>
            <button
              className={styles.langButton}
              onClick={() => setLang(en ? "pt" : "en")}
              aria-label={en ? "Mudar para português" : "Switch to English"}
            >
              {en ? "PT" : "EN"}
              <Globe2 size={13} aria-hidden="true" />
            </button>
            <ThemeToggle className={styles.themeButton} />
            <a className={styles.headerContact} href="#contato">
              {en ? "Let's talk" : "Vamos conversar"}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button
              className={styles.menuToggle}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={
                menuOpen ? (en ? "Close menu" : "Fechar menu") : t.nav.openMenu
              }
              aria-expanded={menuOpen}
              aria-controls="portfolio-navigation"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
          {menuOpen && (
            <nav
              id="portfolio-navigation"
              className={styles.mobileNav}
              aria-label={t.nav.mainAria}
            >
              {[...nav, ["contato", t.nav.contact]].map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                  {label}
                  <ArrowUpRight />
                </a>
              ))}
            </nav>
          )}
        </header>

        <main id="main">
          <section
            id="inicio"
            ref={heroRef}
            className={styles.hero}
            data-visible={heroVisible}
            aria-labelledby="portfolio-title"
          >
            <div className={styles.heroTop}>
              <span className={styles.eyebrow}>
                BUSINESS OPERATIONS · SCRUM · TECH
              </span>
              <span className={styles.heroLocation}>
                {profile?.location || "Espírito Santo, Brasil"}
                <span className={styles.liveDot} />
              </span>
            </div>
            <div className={styles.heroBody}>
              <div className={styles.heroCopy}>
                <p className={styles.heroName}>
                  {en
                    ? "Hello, I'm Thalita Paiva."
                    : "Olá, eu sou Thalita Paiva."}
                </p>
                <h1 id="portfolio-title">
                  <span>{en ? "People." : "Pessoas."}</span>
                  <span>{en ? "Processes." : "Processos."}</span>
                  <span className={styles.blueWord}>
                    {en ? "Technology." : "Tecnologia."}
                    <span className={styles.titleStar} aria-hidden="true">
                      <Mark />
                    </span>
                  </span>
                </h1>
                <p className={styles.heroDescription}>
                  {en
                    ? "I connect the three to organize complexity and turn ideas into delivery."
                    : "Conecto os três para organizar a complexidade e transformar ideias em entregas."}
                </p>
                <div className={styles.heroCtas}>
                  <a className={styles.primaryLink} href="#projetos">
                    {t.hero.viewProjects}
                    <ArrowDownRight size={20} aria-hidden="true" />
                  </a>
                  <a className={styles.textLink} href="#experiencia">
                    {en ? "Explore my work" : "Conheça minha atuação"}
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className={styles.heroVisual}>
                <span className={styles.visualLabel}>
                  01 / CONNECTED THINKING
                </span>
                <SystemSculpture />
                <div className={styles.visualNote}>
                  <span>↳</span>
                  <p>
                    {en ? (
                      <>
                        A business mindset.
                        <br />A technology perspective.
                      </>
                    ) : (
                      <>
                        Olhar de negócio.
                        <br />
                        Pensamento de tecnologia.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.heroBottom}>
              <a href="#sobre">
                <ArrowDown size={17} aria-hidden="true" />
                {en ? "Scroll to explore" : "Role para explorar"}
              </a>
              <span>PORTFOLIO / {new Date().getFullYear()}</span>
              <button
                onClick={() => setPaused(!paused)}
                aria-pressed={paused}
                aria-label={
                  paused
                    ? en
                      ? "Play animations"
                      : "Retomar animações"
                    : en
                      ? "Pause animations"
                      : "Pausar animações"
                }
              >
                {paused ? <Play size={14} /> : <Pause size={14} />}
                <span>{en ? "Motion" : "Animações"}</span>
              </button>
            </div>
          </section>

          <section
            id="sobre"
            className={`${styles.about} ${styles.section}`}
            aria-labelledby="about-title"
          >
            <div className={styles.sectionLabel}>
              <span>01 / {en ? "ABOUT" : "SOBRE"}</span>
              <ArrowDownRight />
            </div>
            <Reveal className={styles.aboutGrid}>
              <div>
                <h2 id="about-title">
                  {en ? (
                    <>
                      Between the idea
                      <br />
                      and the delivery,
                      <br />
                      <em>I build connections.</em>
                    </>
                  ) : (
                    <>
                      Entre a ideia
                      <br />e a entrega,
                      <br />
                      <em>eu faço a ponte.</em>
                    </>
                  )}
                </h2>
              </div>
              <div className={styles.aboutCopy}>
                <p>{t.about.paragraphs[0]}</p>
                <p>{t.about.paragraphs[1]}</p>
                <div className={styles.signature}>
                  <Mark />
                  <span>
                    Thalita Paiva<small>BUSINESS OPERATIONS & TECHNOLOGY</small>
                  </span>
                </div>
              </div>
            </Reveal>
            <div className={styles.disciplines}>
              {[
                {
                  n: "01",
                  icon: Workflow,
                  title: "Business Operations",
                  text: t.focus.areas.operations.description,
                },
                {
                  n: "02",
                  icon: FolderKanban,
                  title: "Scrum Master",
                  text: t.focus.areas.scrum.description,
                },
                {
                  n: "03",
                  icon: Code2,
                  title: en ? "Technology & Projects" : "Tecnologia & Projetos",
                  text: t.focus.areas.technology.description,
                },
              ].map((item) => (
                <Reveal key={item.n}>
                  <article>
                    <div>
                      <item.icon
                        size={30}
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                      <span>{item.n}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <div className={styles.marquee} aria-hidden="true">
            <div>
              {[0, 1].map((i) => (
                <span key={i}>
                  {" "}
                  {en ? "CLEAR PROCESSES" : "PROCESSOS CLAROS"} <Mark />{" "}
                  {en ? "CONNECTED TEAMS" : "TIMES CONECTADOS"} <Mark />{" "}
                  {en ? "CONTINUOUS DELIVERY" : "ENTREGAS CONTÍNUAS"}{" "}
                  <Mark />{" "}
                </span>
              ))}
            </div>
          </div>

          <section
            id="experiencia"
            className={`${styles.experience} ${styles.section}`}
            aria-labelledby="experience-title"
          >
            <div className={styles.sectionLabel}>
              <span>02 / {en ? "EXPERIENCE" : "EXPERIÊNCIA"}</span>
              <span>
                {en ? "FROM STRATEGY TO EXECUTION" : "DA ESTRATÉGIA À EXECUÇÃO"}
              </span>
            </div>
            <Reveal className={styles.sectionIntro}>
              <h2 id="experience-title">
                {en ? (
                  <>
                    How I make
                    <br />
                    <em>things happen.</em>
                  </>
                ) : (
                  <>
                    Como faço
                    <br />
                    <em>acontecer.</em>
                  </>
                )}
              </h2>
              <p>
                {en
                  ? "My experience lives in the day-to-day: organizing demands, supporting teams, and tracking each delivery."
                  : "Minha experiência está no dia a dia: organizar demandas, apoiar equipes e acompanhar cada entrega."}
              </p>
            </Reveal>
            <div className={styles.experienceGrid}>
              <div className={styles.processLab}>
                <div className={styles.labHeading}>
                  <span className={styles.liveDot} />
                  <span>{en ? "MY WORKFLOW" : "MEU FLUXO DE TRABALHO"}</span>
                  <GitBranch size={18} />
                </div>
                <div
                  className={styles.flowArt}
                  data-stage={stage}
                  aria-hidden="true"
                >
                  <div className={styles.flowOrbit} />
                  <div className={styles.flowCenter}>
                    {React.createElement(
                      [Workflow, FolderKanban, Code2, BarChart3][stage] ??
                        Workflow,
                      { size: 58, strokeWidth: 1.2 },
                    )}
                  </div>
                  {["01", "02", "03", "04"].map((n, i) => (
                    <span
                      key={n}
                      className={`${styles.flowNode} ${i === stage ? styles.currentNode : ""}`}
                    >
                      {i < stage ? <Check size={16} /> : n}
                    </span>
                  ))}
                  <svg viewBox="0 0 400 260">
                    <path
                      d="M60 55H340V205H60Z"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="3 7"
                    />
                  </svg>
                </div>
                <div
                  className={styles.stageControls}
                  aria-label={
                    en ? "Workflow steps" : "Etapas do fluxo de trabalho"
                  }
                >
                  {stages.map((s, i) => (
                    <button
                      key={s}
                      aria-pressed={stage === i}
                      aria-controls="workflow-description"
                      onClick={() => setStage(i)}
                    >
                      <span>0{i + 1}</span>
                      {s}
                    </button>
                  ))}
                </div>
                <p
                  id="workflow-description"
                  className={styles.stageDescription}
                  aria-live="polite"
                >
                  {stageText[stage]}
                </p>
              </div>
              <div className={styles.experienceRows}>
                {cases.map((id, i) => {
                  const item = t.experience.cases[id];
                  const Icon = caseIcons[i] ?? FolderKanban;
                  return (
                    <details
                      key={id}
                      className={styles.experienceRow}
                      open={i === 0 ? true : undefined}
                    >
                      <summary>
                        <span className={styles.rowNumber}>0{i + 1}</span>
                        <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
                        <h3>{item.title}</h3>
                        <Plus
                          className={styles.expandIcon}
                          size={19}
                          aria-hidden="true"
                        />
                        <Minus
                          className={styles.collapseIcon}
                          size={19}
                          aria-hidden="true"
                        />
                      </summary>
                      <div className={styles.rowBody}>
                        <p>{item.description}</p>
                        <ul>
                          {item.activities.map((a) => (
                            <li key={a}>
                              <ArrowRight size={12} aria-hidden="true" />
                              {a}
                            </li>
                          ))}
                        </ul>
                        <div className={styles.caseTools}>
                          {(caseTools[i] ?? []).map((tool) => (
                            <span key={tool}>{tool}</span>
                          ))}
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          </section>

          <section
            id="competencias"
            className={`${styles.toolbox} ${styles.section}`}
            aria-labelledby="toolbox-title"
          >
            <div className={styles.sectionLabel}>
              <span>03 / TOOLBOX</span>
              <Code2 size={20} />
            </div>
            <Reveal className={styles.sectionIntro}>
              <h2 id="toolbox-title">
                {en ? (
                  <>
                    The right tools.
                    <br />
                    <em>For each challenge.</em>
                  </>
                ) : (
                  <>
                    As ferramentas certas.
                    <br />
                    <em>Para cada desafio.</em>
                  </>
                )}
              </h2>
              <p>
                {en
                  ? "From a well-organized backlog to the next line of code. The tools I use to connect management and technology."
                  : "Do backlog bem organizado à próxima linha de código. As ferramentas que uso para conectar gestão e tecnologia."}
              </p>
            </Reveal>
            <div
              className={styles.toolTabs}
              role="tablist"
              aria-label={en ? "Tool categories" : "Categorias de ferramentas"}
            >
              {(
                [
                  ["management", en ? "Management" : "Gestão", FolderKanban],
                  [
                    "code",
                    en ? "Languages & stack" : "Linguagens & stack",
                    Code2,
                  ],
                  ["tools", en ? "Development" : "Desenvolvimento", GitBranch],
                ] as const
              ).map(([id, label, Icon]) => (
                <button
                  key={id}
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={toolGroup === id}
                  aria-controls={`panel-${id}`}
                  tabIndex={toolGroup === id ? 0 : -1}
                  onClick={() => setToolGroup(id)}
                  onKeyDown={(event) => {
                    const ids = ["management", "code", "tools"] as const;
                    const next =
                      event.key === "ArrowRight"
                        ? (ids.indexOf(id) + 1) % 3
                        : event.key === "ArrowLeft"
                          ? (ids.indexOf(id) + 2) % 3
                          : event.key === "Home"
                            ? 0
                            : event.key === "End"
                              ? 2
                              : -1;
                    if (next >= 0) {
                      event.preventDefault();
                      setToolGroup(ids[next] ?? "management");
                      document.getElementById(`tab-${ids[next]}`)?.focus();
                    }
                  }}
                >
                  <Icon size={17} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
            <div
              className={styles.toolGrid}
              role="tabpanel"
              id={`panel-${toolGroup}`}
              aria-labelledby={`tab-${toolGroup}`}
              key={toolGroup}
            >
              {tools.map((tool) => (
                <div className={styles.tool} key={tool.icon}>
                  <div className={styles.toolSymbol}>
                    <ToolIcon tool={tool} />
                  </div>
                  <span>{tool.label[lang]}</span>
                </div>
              ))}
            </div>
            <div className={styles.methods}>
              <span>{en ? "METHODS & PRACTICES" : "MÉTODOS & PRÁTICAS"}</span>
              <div>
                {[...OPERATIONS_SKILLS, ...AGILITY_SKILLS].map((tool) => (
                  <span key={tool.icon}>{tool.label[lang]}</span>
                ))}
              </div>
            </div>
          </section>

          <section
            id="projetos"
            className={`${styles.projects} ${styles.section}`}
            aria-labelledby="projects-title"
          >
            <div className={styles.sectionLabel}>
              <span>
                04 / {en ? "SELECTED PROJECTS" : "PROJETOS SELECIONADOS"}
              </span>
              <span>
                {String(projects.length).padStart(2, "0")}{" "}
                {en ? "PROJECTS" : "PROJETOS"}
              </span>
            </div>
            <Reveal className={styles.sectionIntro}>
              <h2 id="projects-title">
                {en ? (
                  <>
                    Ideas that
                    <br />
                    <em>became code.</em>
                  </>
                ) : (
                  <>
                    Ideias que
                    <br />
                    <em>viraram código.</em>
                  </>
                )}
              </h2>
              <p>
                {en
                  ? "Studies, experiments, and projects. A closer look at how I learn, build, and solve problems."
                  : "Estudos, experimentos e projetos. Um recorte de como aprendo, construo e resolvo problemas."}
              </p>
            </Reveal>
            <div className={styles.projectGrid}>
              {(allProjects ? projects : projects.slice(0, 4)).map((p, i) => {
                const translated = t.projectContent[p.slug];
                return (
                  <Reveal key={p.id} className={styles.projectItem}>
                    <article>
                      <Link
                        href={
                          p.slug.startsWith("gh-")
                            ? p.repositoryUrl ||
                              "https://github.com/thalitapaiva"
                            : `/projetos/${p.slug}`
                        }
                        className={styles.projectCover}
                        aria-label={`${t.projects.view}: ${translated?.title || p.title}`}
                        {...(p.slug.startsWith("gh-")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        <ProjectArtwork project={p} index={i} />
                        <span className={styles.projectOpen}>
                          <ArrowUpRight aria-hidden="true" />
                        </span>
                      </Link>
                      <div className={styles.projectMeta}>
                        {p.technologies.slice(0, 3).map(({ technology }) => (
                          <span key={technology.id}>{technology.name}</span>
                        ))}
                        <span>{p.year}</span>
                      </div>
                      <Link
                        href={
                          p.slug.startsWith("gh-")
                            ? p.repositoryUrl ||
                              "https://github.com/thalitapaiva"
                            : `/projetos/${p.slug}`
                        }
                        className={styles.projectTitle}
                      >
                        {translated?.title || p.title}
                        <ArrowUpRight size={22} aria-hidden="true" />
                      </Link>
                      <p>
                        {translated?.shortDescription || p.shortDescription}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
            {projects.length > 4 && (
              <button
                className={styles.moreProjects}
                onClick={() => setAllProjects(!allProjects)}
                aria-expanded={allProjects}
              >
                {allProjects
                  ? t.projects.showLess
                  : `${t.projects.showAll} (${projects.length})`}
                {allProjects ? <Minus size={18} /> : <Plus size={18} />}
              </button>
            )}
          </section>

          <section
            className={`${styles.education} ${styles.section}`}
            aria-labelledby="education-title"
          >
            <div className={styles.sectionLabel}>
              <span>
                05 / {en ? "ALWAYS LEARNING" : "SEMPRE EM CONSTRUÇÃO"}
              </span>
              <ArrowDownRight />
            </div>
            <div className={styles.educationGrid}>
              <h2 id="education-title">
                {en ? (
                  <>
                    Curiosity
                    <br />
                    <em>keeps me moving.</em>
                  </>
                ) : (
                  <>
                    A curiosidade
                    <br />
                    <em>me move.</em>
                  </>
                )}
              </h2>
              <div>
                <div className={styles.educationItem}>
                  <span>UFES</span>
                  <p>
                    {en ? "Information Systems" : "Sistemas de Informação"}
                    <small>
                      {en
                        ? "Undergraduate student · Campus Alegre"
                        : "Graduação em andamento · Campus Alegre"}
                    </small>
                    <ArrowUpRight size={20} />
                  </p>
                </div>
                {t.about.education.items.map((item) => (
                  <div key={item.label} className={styles.educationItem}>
                    <span>{item.period}</span>
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="contato"
            className={styles.contact}
            aria-labelledby="contact-title"
          >
            <div className={styles.sectionLabel}>
              <span>{en ? "NEXT CHAPTER" : "PRÓXIMO CAPÍTULO"}</span>
              <Mark />
            </div>
            <Reveal>
              <p>{t.contact.intro}</p>
              <h2 id="contact-title">
                {en ? (
                  <>
                    Let’s connect
                    <br />
                    the next <em>idea.</em>
                  </>
                ) : (
                  <>
                    Vamos conectar
                    <br />a próxima <em>ideia.</em>
                  </>
                )}
              </h2>
              <a href={`mailto:${email}`} className={styles.emailLink}>
                {email}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Reveal>
            <div className={styles.contactBottom}>
              <span>
                THALITA PAIVA
                <br />
                <small>
                  {en
                    ? "Technology with purpose. Delivery with clarity."
                    : "Tecnologia com propósito. Entregas com clareza."}
                </small>
              </span>
              <div>
                {links
                  .filter(
                    (link) =>
                      !["email", "mail"].includes(link.platform.toLowerCase()),
                  )
                  .map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.platform.toLowerCase() === "linkedin" ? (
                        <Linkedin size={17} aria-hidden="true" />
                      ) : (
                        <Github size={17} aria-hidden="true" />
                      )}
                      {link.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ))}
              </div>
            </div>
          </section>
        </main>
        <footer className={styles.footer}>
          <a href="#inicio" className={styles.footerBrand}>
            <Mark />
            thalita.paiva
          </a>
          <span>© {new Date().getFullYear()}</span>
          <Link href="/privacidade">{en ? "Privacy" : "Privacidade"}</Link>
          <a href="#inicio">
            {en ? "Back to top" : "Voltar ao topo"}
            <ArrowUpRight size={15} />
          </a>
        </footer>
      </div>
    </MotionConfig>
  );
}
