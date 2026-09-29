import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { EASE } from "@/components/motion/Reveal";

export type Crumb = { label: string; to?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-16 pt-36 lg:pb-24 lg:pt-44">
      {image ? (
        <div className="absolute inset-0 -z-10">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </div>
      ) : null}
      <div className="container-page">
        {crumbs.length > 0 ? (
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-foreground/60">
              <li>
                <Link to="/" className="hover:text-primary">
                  Accueil
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight strokeWidth={1.75} className="size-3.5" />
                  {c.to ? (
                    <a href={c.to} className="hover:text-primary">
                      {c.label}
                    </a>
                  ) : (
                    <span className="text-ink-foreground/90">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-3xl"
        >
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1 className="mt-3 text-4xl leading-[1.05] text-ink-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <span className="mt-6 block h-[3px] w-24 bg-primary" />
          {description ? (
            <p className="mt-6 text-base leading-relaxed text-ink-foreground/75 sm:text-lg">
              {description}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
