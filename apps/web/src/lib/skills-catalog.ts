import type { DevIconName } from "@/components/shared/DevIcon";
import type { Lang } from "@/lib/i18n";

/**
 * Stable skill/tool chips for Competências.
 * Icons are explicit keys — never derived from display labels (PT/EN/accents).
 */
export type SkillChipDef = {
  icon: DevIconName;
  label: Record<Lang, string>;
};

export const TECHNOLOGY_SKILLS: SkillChipDef[] = [
  { icon: "javascript", label: { pt: "JavaScript", en: "JavaScript" } },
  { icon: "typescript", label: { pt: "TypeScript", en: "TypeScript" } },
  { icon: "react", label: { pt: "React", en: "React" } },
  { icon: "nextjs", label: { pt: "Next.js", en: "Next.js" } },
  { icon: "nodejs", label: { pt: "Node.js", en: "Node.js" } },
  { icon: "html5", label: { pt: "HTML", en: "HTML" } },
  { icon: "css3", label: { pt: "CSS", en: "CSS" } },
  { icon: "postgresql", label: { pt: "PostgreSQL", en: "PostgreSQL" } },
  { icon: "git", label: { pt: "Git", en: "Git" } },
  { icon: "github", label: { pt: "GitHub", en: "GitHub" } },
  { icon: "docker", label: { pt: "Docker", en: "Docker" } },
];

export const OPERATIONS_SKILLS: SkillChipDef[] = [
  { icon: "businessops", label: { pt: "Business Operations", en: "Business Operations" } },
  { icon: "projectmgmt", label: { pt: "Gestão de projetos", en: "Project management" } },
  { icon: "processmapping", label: { pt: "Mapeamento de processos", en: "Process mapping" } },
  { icon: "kpis", label: { pt: "Gestão de indicadores", en: "KPI management" } },
  { icon: "documentation", label: { pt: "Documentação", en: "Documentation" } },
  { icon: "prioritization", label: { pt: "Priorização", en: "Prioritization" } },
  { icon: "riskmgmt", label: { pt: "Gestão de riscos", en: "Risk management" } },
  {
    icon: "continuousimprovement",
    label: { pt: "Melhoria contínua", en: "Continuous improvement" },
  },
];

export const AGILITY_SKILLS: SkillChipDef[] = [
  { icon: "scrum", label: { pt: "Scrum", en: "Scrum" } },
  { icon: "kanban", label: { pt: "Kanban", en: "Kanban" } },
  { icon: "backlog", label: { pt: "Gestão de backlog", en: "Backlog management" } },
  { icon: "sprintplanning", label: { pt: "Planejamento de sprints", en: "Sprint planning" } },
  { icon: "facilitation", label: { pt: "Facilitação de reuniões", en: "Meeting facilitation" } },
  {
    icon: "stakeholders",
    label: { pt: "Comunicação com stakeholders", en: "Stakeholder communication" },
  },
  {
    icon: "multidisciplinary",
    label: { pt: "Times multidisciplinares", en: "Multidisciplinary teams" },
  },
  {
    icon: "impediments",
    label: { pt: "Resolução de impedimentos", en: "Impediment resolution" },
  },
];

export const TOOL_TECHNOLOGY: SkillChipDef[] = [
  { icon: "vscode", label: { pt: "VS Code", en: "VS Code" } },
  { icon: "figma", label: { pt: "Figma", en: "Figma" } },
  { icon: "github", label: { pt: "GitHub", en: "GitHub" } },
  { icon: "docker", label: { pt: "Docker", en: "Docker" } },
  { icon: "postman", label: { pt: "Postman", en: "Postman" } },
  { icon: "npm", label: { pt: "npm / pnpm", en: "npm / pnpm" } },
  { icon: "vercel", label: { pt: "Vercel", en: "Vercel" } },
  { icon: "chromedevtools", label: { pt: "Chrome DevTools", en: "Chrome DevTools" } },
];

export const TOOL_MANAGEMENT: SkillChipDef[] = [
  { icon: "jira", label: { pt: "Jira", en: "Jira" } },
  { icon: "trello", label: { pt: "Trello", en: "Trello" } },
  { icon: "notion", label: { pt: "Notion", en: "Notion" } },
  { icon: "miro", label: { pt: "Miro", en: "Miro" } },
  { icon: "excel", label: { pt: "Microsoft Excel", en: "Microsoft Excel" } },
  { icon: "googleworkspace", label: { pt: "Google Workspace", en: "Google Workspace" } },
  { icon: "slack", label: { pt: "Slack", en: "Slack" } },
  { icon: "teams", label: { pt: "Microsoft Teams", en: "Microsoft Teams" } },
  { icon: "azuredevops", label: { pt: "Azure DevOps", en: "Azure DevOps" } },
  { icon: "powerbi", label: { pt: "Power BI", en: "Power BI" } },
];

export function chipLabel(def: SkillChipDef, lang: Lang): string {
  return def.label[lang];
}
