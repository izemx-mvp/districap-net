import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, MapPin } from "lucide-react";
import { solutionIcons } from "@/components/icons";
import type { Solution } from "@/data/solutions";
import type { Brand } from "@/data/brands";
import type { Project } from "@/data/projects";

export function SolutionCard({ solution }: { solution: Solution }) {
  const Icon = solutionIcons[solution.icon] ?? BadgeCheck;
  return (
    <Link
      to="/solutions/$slug"
      params={{ slug: solution.slug }}
      className="group relative block overflow-hidden rounded-xl bg-ink"
    >
      <div className="absolute inset-0">
        <img
          src={solution.image}
          alt={solution.title}
          loading="lazy"
          width={1280}
          height={960}
          className="h-full w-full object-cover opacity-70 transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20 transition-opacity duration-300 group-hover:from-ink group-hover:via-ink/80" />
      </div>
      <div className="relative flex h-full min-h-[19rem] flex-col justify-end p-6">
        <Icon strokeWidth={1.75} className="mb-4 size-7 text-primary" />
        <h3 className="text-xl text-ink-foreground transition-transform duration-300 group-hover:-translate-y-1.5">
          {solution.title}
        </h3>
        <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-ink-foreground/70 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
          {solution.short}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          <ArrowRight
            strokeWidth={1.75}
            className="size-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          />
          Découvrir
        </span>
      </div>
    </Link>
  );
}

export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <article className="card-elevated flex h-full flex-col border border-border p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <h3 className="truncate text-xl">{brand.name}</h3>
        {brand.exclusive ? (
          <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary-foreground">
            Exclusif
          </span>
        ) : null}
      </div>
      {brand.note ? (
        <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
          <BadgeCheck strokeWidth={1.75} className="size-4" />
          {brand.note}
        </span>
      ) : null}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {brand.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {brand.solutions.map((s) => (
          <Link
            key={s.slug}
            to="/solutions/$slug"
            params={{ slug: s.slug }}
            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {s.label}
          </Link>
        ))}
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/references/$slug"
      params={{ slug: project.slug }}
      className="group card-elevated flex h-full flex-col overflow-hidden border border-border"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          width={1280}
          height={960}
          className="h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-xs font-medium text-ink-foreground">
          {project.sector}
        </span>
        {project.placeholder ? (
          <span className="absolute right-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary-foreground">
            Exemple
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg">{project.title}</h3>
        <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin strokeWidth={1.75} className="size-4" />
          {project.city}
        </span>
        <ul className="mt-4 space-y-1.5 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
          {project.installed.map((item) => (
            <li key={item.label} className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{item.brand}</span>{" "}
              — {item.label}
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Voir la référence
          <ArrowRight
            strokeWidth={1.75}
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
