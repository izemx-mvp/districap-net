import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { EASE } from "@/components/motion/Reveal";
import { projects, sectors } from "@/data/projects";
import heroMall from "@/assets/hero-mall.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/references/")({
  component: ReferencesPage,
  head: () => ({
    meta: [
      { title: "Références et projets réalisés — Districap" },
      {
        name: "description",
        content:
          "Centres commerciaux, hôtels, administrations, industrie : découvrez les projets équipés par Districap, dont ALMAZAR Marrakech, Marina Mall et Aeria Mall.",
      },
      { property: "og:title", content: "Références — Districap" },
      {
        property: "og:description",
        content:
          "Projets de sécurité électronique et d'audiovisuel professionnel réalisés au Maroc.",
      },
      { property: "og:url", content: "/references" },
    ],
    links: [{ rel: "canonical", href: "/references" }],
  }),
});

function ReferencesPage() {
  const [filter, setFilter] = useState<string>("Tous");
  const sectorList = sectors.filter((s) => projects.some((p) => p.sector === s));
  const available = ["Tous", ...sectorList];
  const countOf = (s: string) =>
    s === "Tous" ? projects.length : projects.filter((p) => p.sector === s).length;

  const list = filter === "Tous" ? projects : projects.filter((p) => p.sector === filter);
  const [featured, ...rest] = list;
  const cities = new Set(projects.map((p) => p.city)).size;

  const stats = [
    { value: projects.length, label: "projets présentés" },
    { value: sectorList.length, label: "secteurs d'activité" },
    { value: cities, label: cities > 1 ? "villes" : "ville" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Références"
        title="Des projets livrés sur tout le territoire"
        description="Nos équipements équipent des centres commerciaux, des hôtels, des administrations et des sites industriels. Voici une sélection de projets où Districap a fourni les solutions."
        image={heroMall}
        crumbs={[{ label: "Références" }]}
      />

      {/* Key figures overlapping the hero */}
      <section className="relative z-10 -mt-10 md:-mt-14">
        <div className="container-page">
          <dl className="grid grid-cols-3 divide-x divide-border overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-black/5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-start gap-1 px-4 py-5 sm:flex-row sm:items-center sm:gap-5 sm:px-8 sm:py-7"
              >
                <dd className="text-4xl font-semibold tabular-nums leading-none tracking-tight text-primary md:text-6xl">
                  {String(s.value).padStart(2, "0")}
                </dd>
                <dt className="text-xs leading-snug text-muted-foreground sm:text-sm">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          {/* Filters with counts */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div
              role="tablist"
              aria-label="Filtrer par secteur"
              className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
            >
              {available.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="tab"
                  aria-selected={filter === s}
                  onClick={() => setFilter(s)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                    filter === s
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "border-border bg-background hover:border-primary hover:text-primary",
                  )}
                >
                  {s}
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-xs tabular-nums",
                      filter === s ? "bg-primary-foreground/20" : "bg-surface text-muted-foreground",
                    )}
                  >
                    {countOf(s)}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {list.length} projet{list.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Featured project */}
          <AnimatePresence mode="wait">
            {featured ? (
              <motion.div
                key={featured.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-10"
              >
                <Link
                  to="/references/$slug"
                  params={{ slug: featured.slug }}
                  className="group relative block overflow-hidden rounded-3xl"
                >
                  <img
                    src={featured.image}
                    alt={featured.title}
                    width={1600}
                    height={900}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] group-hover:scale-105 sm:aspect-[16/8]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 text-white sm:p-10 lg:max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="rounded-full bg-primary px-3 py-1 font-medium text-primary-foreground">
                        {featured.sector}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-white/85">
                        <MapPin className="size-4" strokeWidth={1.75} aria-hidden />
                        {featured.city}
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold leading-tight sm:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="line-clamp-2 max-w-2xl text-sm text-white/80 sm:text-base">
                      {featured.summary}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-2 text-sm font-medium">
                      Voir le projet
                      <span className="grid size-8 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <ArrowUpRight className="size-4" aria-hidden />
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Remaining projects */}
          <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {rest.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.35, ease: EASE, delay: i * 0.04 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {list.length === 0 ? (
            <p className="mt-16 text-center text-sm text-muted-foreground">
              Aucun projet dans ce secteur pour le moment.
            </p>
          ) : null}

          <p className="mt-12 rounded-lg bg-surface px-4 py-3 text-xs text-muted-foreground">
            Les projets signalés « Exemple » sont des contenus de démonstration, à
            remplacer par vos références réelles.
          </p>
        </div>
      </section>

      <CtaBanner title="Votre projet mérite les mêmes garanties." />
    </>
  );
}