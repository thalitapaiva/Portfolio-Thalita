"use client";

import * as React from "react";
import {
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  Layers,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu-1";
import type { NavSectionId } from "@/lib/constants";
import { useLang, type FocusAreaId } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface NavigationMenuNavProps {
  activeSection: string;
  className?: string;
}

const TRIGGER_CLASS =
  "h-10 rounded-xl bg-transparent px-2.5 text-gray-500 shadow-none hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 data-[popup-open]:bg-blue-500/10 data-[popup-open]:text-blue-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:focus:bg-gray-800 dark:focus:text-gray-100 dark:data-[popup-open]:bg-blue-500/10 dark:data-[popup-open]:text-blue-500";

const ACTIVE_TRIGGER =
  "bg-blue-500/10 text-blue-500 hover:bg-blue-500/10 hover:text-blue-500 focus:bg-blue-500/10 focus:text-blue-500";

const FOCUS_AREAS: FocusAreaId[] = ["operations", "scrum", "technology"];

export function NavigationMenuNav({ activeSection, className }: NavigationMenuNavProps) {
  const { t } = useLang();

  const labels: Record<Exclude<NavSectionId, "inicio">, string> = {
    sobre: t.nav.about,
    atuacao: t.nav.focus,
    competencias: t.nav.skills,
    experiencia: t.nav.experience,
    projetos: t.nav.projects,
  };

  const isActive = (id: NavSectionId) => activeSection === id;

  return (
    <NavigationMenu className={cn("flex", className)} aria-label={t.nav.mainAria}>
      <NavigationMenuList className="gap-0.5">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(TRIGGER_CLASS, isActive("sobre") && ACTIVE_TRIGGER)}
          >
            <TriggerLabel icon={UserRound} label={labels.sobre} />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[420px] lg:w-[500px] lg:grid-cols-[0.85fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink
                  href="#sobre"
                  closeOnClick
                  active={isActive("sobre")}
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-5 no-underline outline-none focus:shadow-md"
                >
                  <UserRound className="mb-3 size-5 text-blue-500" aria-hidden="true" />
                  <div className="mb-1 text-lg font-medium text-foreground">{labels.sobre}</div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    {t.about.paragraphs[0]}
                  </p>
                </NavigationMenuLink>
              </li>
              <ListItem href="#sobre" title={t.about.education.title} active={isActive("sobre")}>
                {t.about.education.items.map((item) => item.label).join(" · ")}
              </ListItem>
              <ListItem href="#atuacao" title={labels.atuacao} active={isActive("atuacao")}>
                {t.focus.description}
              </ListItem>
              <ListItem href="#projetos" title={labels.projetos} active={isActive("projetos")}>
                {t.projects.description}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(TRIGGER_CLASS, isActive("atuacao") && ACTIVE_TRIGGER)}
          >
            <TriggerLabel icon={BriefcaseBusiness} label={labels.atuacao} />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[360px] gap-2 md:w-[440px] md:grid-cols-1">
              {FOCUS_AREAS.map((id) => {
                const area = t.focus.areas[id];
                return (
                  <ListItem
                    key={id}
                    href="#atuacao"
                    title={area.title}
                    active={isActive("atuacao")}
                    icon={BriefcaseBusiness}
                  >
                    {area.description}
                  </ListItem>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(TRIGGER_CLASS, isActive("competencias") && ACTIVE_TRIGGER)}
          >
            <TriggerLabel icon={Layers} label={labels.competencias} />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-2">
              {(Object.keys(t.skills.groups) as Array<keyof typeof t.skills.groups>).map((id) => {
                const group = t.skills.groups[id];
                return (
                  <ListItem
                    key={id}
                    href="#competencias"
                    title={group.title}
                    active={isActive("competencias")}
                    icon={Layers}
                  >
                    {group.items.slice(0, 4).join(" · ")}
                  </ListItem>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(TRIGGER_CLASS, isActive("experiencia") && ACTIVE_TRIGGER)}
          >
            <TriggerLabel icon={Code2} label={labels.experiencia} />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[320px] gap-2 md:w-[400px]">
              {(Object.keys(t.experience.cases) as Array<keyof typeof t.experience.cases>)
                .slice(0, 4)
                .map((id) => {
                  const item = t.experience.cases[id];
                  return (
                    <ListItem
                      key={id}
                      href="#experiencia"
                      title={item.title}
                      active={isActive("experiencia")}
                      icon={Code2}
                    >
                      {item.description}
                    </ListItem>
                  );
                })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="#projetos"
            closeOnClick
            active={isActive("projetos")}
            className={cn(
              navigationMenuTriggerStyle(),
              TRIGGER_CLASS,
              "flex-row items-center gap-1.5",
              isActive("projetos") && ACTIVE_TRIGGER,
            )}
          >
            <FolderKanban className="size-[18px]" aria-hidden="true" strokeWidth={2} />
            {labels.projetos}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPositioner>
        <NavigationMenuPopup>
          <NavigationMenuArrow />
        </NavigationMenuPopup>
      </NavigationMenuPositioner>
    </NavigationMenu>
  );
}

function TriggerLabel({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="size-[18px]" aria-hidden="true" strokeWidth={2} />
      {label}
    </span>
  );
}

function ListItem({
  title,
  children,
  href,
  active,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  title: string;
  active?: boolean;
  icon?: LucideIcon;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink href={href} closeOnClick active={active}>
        <div className="flex items-start gap-2">
          {Icon ? (
            <Icon className="mt-0.5 size-4 shrink-0 text-blue-500" aria-hidden="true" />
          ) : null}
          <div className="min-w-0">
            <div className="text-sm font-medium leading-none text-foreground">{title}</div>
            <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </div>
      </NavigationMenuLink>
    </li>
  );
}
