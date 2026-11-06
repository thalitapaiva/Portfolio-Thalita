"use client";

import {
  ArrowUpRight,
  ClipboardList,
  MessagesSquare,
  Workflow,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const practices = [
    {
      icon: ClipboardList,
      title: en ? "Planning and delivery" : "Planejamento e entregas",
      text: en
        ? "Clear priorities, owners, and next steps."
        : "Prioridades, responsáveis e próximos passos visíveis.",
    },
    {
      icon: MessagesSquare,
      title: en ? "Team alignment" : "Alinhamento entre equipes",
      text: en
        ? "Direct communication and day-to-day collaboration."
        : "Comunicação objetiva e colaboração no dia a dia.",
    },
    {
      icon: Workflow,
      title: en ? "Process improvement" : "Melhoria de processos",
      text: en
        ? "Visible workflows, documentation, and continuous improvement."
        : "Fluxos acompanhados, documentação e melhoria contínua.",
    },
  ];
  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className={styles.section}
    >
      <div className={styles.shell}>
        <div className={styles.layout}>
          <div className={styles.story}>
            <span className={styles.eyebrow}>
              {en
                ? "PEOPLE · PROCESSES · TECHNOLOGY"
                : "PESSOAS · PROCESSOS · TECNOLOGIA"}
            </span>
            <h2 id="about-title">{en ? "About me" : "Sobre mim"}</h2>
            <p className={styles.lead}>
              {en
                ? "I work across operations, projects, and technology, organizing demands and supporting teams through clear processes and agile practices."
                : "Atuo na conexão entre operações, projetos e tecnologia, organizando demandas e apoiando equipes com processos claros e métodos ágeis."}
            </p>
            <p className={styles.support}>
              {en
                ? "My work includes planning, tracking delivery, documentation, and communication across teams."
                : "Meu trabalho passa por planejamento, acompanhamento de entregas, documentação e comunicação entre áreas."}
            </p>
            <a
              className={styles.profileLink}
              href="https://www.linkedin.com/in/thalita-paiva-1301a122b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {en
                ? "My background on LinkedIn"
                : "Minha trajetória no LinkedIn"}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className={styles.practices}>
            <h3>{en ? "How I work" : "Como eu trabalho"}</h3>
            {practices.map(({ icon: Icon, title, text }) => (
              <div className={styles.practice} key={title}>
                <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.education}>
          <h3>{en ? "Education & courses" : "Formação e cursos"}</h3>
          <ul>
            {t.about.education.items.map((item) => (
              <li key={item.label}>
                <span>{item.period}</span>
                <p>{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
