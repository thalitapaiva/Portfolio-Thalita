import { describe, expect, it } from "vitest";

import { resolveDevIcon } from "@/components/shared/DevIcon";
import {
  AGILITY_SKILLS,
  OPERATIONS_SKILLS,
  TECHNOLOGY_SKILLS,
  TOOL_MANAGEMENT,
  TOOL_TECHNOLOGY,
} from "@/lib/skills-catalog";

describe("skills-catalog icons", () => {
  it("maps Miro to miro, not figma", () => {
    const miro = TOOL_MANAGEMENT.find((i) => i.label.pt === "Miro");
    const figma = TOOL_TECHNOLOGY.find((i) => i.label.pt === "Figma");
    expect(miro?.icon).toBe("miro");
    expect(figma?.icon).toBe("figma");
    expect(miro?.icon).not.toBe(figma?.icon);
  });

  it("gives Notion and Trello distinct brand icons", () => {
    expect(TOOL_MANAGEMENT.find((i) => i.label.pt === "Notion")?.icon).toBe("notion");
    expect(TOOL_MANAGEMENT.find((i) => i.label.pt === "Trello")?.icon).toBe("trello");
  });

  it("gives ops/agility process icons (not brand logos)", () => {
    expect(OPERATIONS_SKILLS.find((i) => i.label.pt === "Documentação")?.icon).toBe(
      "documentation",
    );
    expect(OPERATIONS_SKILLS.find((i) => i.label.pt === "Gestão de projetos")?.icon).toBe(
      "projectmgmt",
    );
    expect(AGILITY_SKILLS.find((i) => i.label.pt === "Scrum")?.icon).toBe("scrum");
    expect(AGILITY_SKILLS.find((i) => i.label.pt === "Kanban")?.icon).toBe("kanban");
  });

  it("keeps unique icons within each tools row", () => {
    const tools = [...TOOL_TECHNOLOGY, ...TOOL_MANAGEMENT];
    const labels = tools.map((t) => t.label.pt);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it("covers the technology stack chips", () => {
    expect(TECHNOLOGY_SKILLS.map((s) => s.icon)).toContain("github");
    expect(TECHNOLOGY_SKILLS.map((s) => s.icon)).toContain("docker");
  });
});

describe("resolveDevIcon", () => {
  it("never maps Miro → Figma or Notion → Markdown", () => {
    expect(resolveDevIcon("Miro")).toBe("miro");
    expect(resolveDevIcon("Figma")).toBe("figma");
    expect(resolveDevIcon("Notion")).toBe("notion");
    expect(resolveDevIcon("Trello")).toBe("trello");
    expect(resolveDevIcon("layout")).toBeNull();
  });

  it("resolves PT process labels to lucide process icons", () => {
    expect(resolveDevIcon("Gestão de projetos")).toBe("projectmgmt");
    expect(resolveDevIcon("Documentação")).toBe("documentation");
    expect(resolveDevIcon("Melhoria contínua")).toBe("continuousimprovement");
  });
});
