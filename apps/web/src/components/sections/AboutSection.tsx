"use client";

import { ArrowUpRight, GraduationCap, Languages, School } from "lucide-react";
import { useLang } from "@/lib/i18n";
import styles from "./AboutSection.module.css";

const COURSE_ICONS = [GraduationCap, School, Languages] as const;

export function AboutSection() {
  const { t, lang } = useLang();
  const [degree, ...courses] = t.about.education.items;
  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className={styles.section}
    >
      <div className={styles.shell}>
        <div className={styles.sectionHeader}>
          <span>
            {lang === "pt" ? "UM POUCO SOBRE MIM" : "A LITTLE ABOUT ME"}
          </span>
          <span>THALITA PAIVA</span>
        </div>
        <div className={styles.layout}>
          <div className={styles.story}>
            <h2 id="about-title">
              {lang === "pt" ? (
                <>
                  Conectando pessoas,
                  <br />
                  processos e <em>tecnologia.</em>
                </>
              ) : (
                <>
                  Connecting people,
                  <br />
                  processes, and <em>technology.</em>
                </>
              )}
            </h2>
            {t.about.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={index === 0 ? styles.lead : styles.support}
              >
                {paragraph}
              </p>
            ))}
            <div className={styles.interests}>
              <span>Business Operations</span>
              <span>Scrum Master</span>
              <span>
                {lang === "pt" ? "Gestão de projetos" : "Project management"}
              </span>
            </div>
          </div>
          <div className={styles.education}>
            <h3>
              {t.about.education.title}
              <GraduationCap size={20} aria-hidden="true" />
            </h3>
            {degree && (
              <div className={styles.degree}>
                <div className={styles.degreeTop}>
                  <span className={styles.degreeIcon}>
                    <GraduationCap
                      size={25}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </span>
                  <span>{degree.period}</span>
                </div>
                <h4>{degree.label}</h4>
                <p>
                  {lang === "pt"
                    ? "Graduação em andamento"
                    : "Undergraduate studies in progress"}
                </p>
              </div>
            )}
            <div className={styles.courseList}>
              {courses.map((item, index) => {
                const Icon = COURSE_ICONS[index] ?? GraduationCap;
                return (
                  <div className={styles.course} key={item.label}>
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <span>{item.period}</span>
                      <h4>{item.label}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
            <a
              className={styles.profileLink}
              href="https://www.linkedin.com/in/thalita-paiva-1301a122b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang === "pt"
                ? "Conheça minha trajetória no LinkedIn"
                : "Explore my background on LinkedIn"}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
