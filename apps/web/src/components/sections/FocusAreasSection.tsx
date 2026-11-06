"use client";

import * as React from "react";
import {
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Code2,
  UsersRound,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLang, type FocusAreaId } from "@/lib/i18n";
import styles from "./FocusAreasSection.module.css";

const AREA_ORDER: FocusAreaId[] = ["operations", "scrum", "technology"];
const ICONS = {
  operations: BriefcaseBusiness,
  scrum: UsersRound,
  technology: Code2,
};

export function FocusAreasSection() {
  const { t, lang } = useLang();
  const [active, setActive] = React.useState<FocusAreaId>("operations");
  const reduced = useReducedMotion();
  const area = t.focus.areas[active];
  const Icon = ICONS[active];

  function navigate(
    event: React.KeyboardEvent<HTMLButtonElement>,
    id: FocusAreaId,
  ) {
    const index = AREA_ORDER.indexOf(id);
    const target =
      event.key === "ArrowRight"
        ? (index + 1) % AREA_ORDER.length
        : event.key === "ArrowLeft"
          ? (index + AREA_ORDER.length - 1) % AREA_ORDER.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? AREA_ORDER.length - 1
              : -1;
    const next = AREA_ORDER[target];
    if (!next) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`focus-tab-${next}`)?.focus();
  }

  return (
    <section
      id="atuacao"
      aria-labelledby="focus-title"
      className={styles.section}
    >
      <div className={styles.shell}>
        <div className={styles.heading}>
          <h2 id="focus-title">{t.focus.title}</h2>
          <p>{t.focus.description}</p>
        </div>
        <div className={styles.explorer}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label={t.focus.title}
          >
            {AREA_ORDER.map((id) => {
              const TabIcon = ICONS[id];
              const selected = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`focus-tab-${id}`}
                  aria-selected={selected}
                  aria-controls="focus-panel"
                  tabIndex={selected ? 0 : -1}
                  className={styles.tab}
                  onClick={() => setActive(id)}
                  onKeyDown={(event) => navigate(event, id)}
                >
                  <span className={styles.tabIcon}>
                    <TabIcon size={20} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span>{t.focus.areas[id].title}</span>
                  <span className={styles.selectionMark} aria-hidden="true">
                    {selected && <Check size={14} />}
                  </span>
                </button>
              );
            })}
          </div>
          <div
            id="focus-panel"
            role="tabpanel"
            aria-labelledby={`focus-tab-${active}`}
            tabIndex={0}
            className={styles.panel}
          >
            <motion.div
              key={active}
              initial={reduced ? false : { opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={styles.content}
            >
              <div className={styles.intro}>
                <span className={styles.largeIcon}>
                  <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <span className={styles.panelNote}>
                  {lang === "pt"
                    ? "Como atuo nesta área"
                    : "How I work in this area"}
                </span>
              </div>
              <div className={styles.practices}>
                <p className={styles.listLabel}>
                  {lang === "pt" ? "Na prática" : "In practice"}
                </p>
                <ul>
                  {area.skills.map((skill) => (
                    <li key={skill}>
                      <CheckCircle2
                        size={17}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
        <p className={styles.hint}>
          {lang === "pt"
            ? "Selecione uma área para conhecer minha atuação."
            : "Select an area to explore my work."}
        </p>
      </div>
    </section>
  );
}
