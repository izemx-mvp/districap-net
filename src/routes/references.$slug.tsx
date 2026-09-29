import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Images,
  Layers,
  Maximize2,
  MapPin,
  Tag,
  X,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal, Stagger, StaggerItem, EASE } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { getProject, projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/references/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectPage,
  head: ({ params, loaderData }) => {
    const project = loaderData?.project;
    const title = project ? `${project.title} — Référence Districap` : "Référence — Districap";
    const description = project?.summary ?? "Projet réalisé par Districap au Maroc.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/references/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/references/${params.slug}` }],
    };
  },
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const [active, setActive] = useState<number | null>(null);
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const total = project.gallery.length;

  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + total) % total)),
    [total],
  );

  // Keyboard controls + scroll lock while the lightbox is open
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, step]);

  const facts = [
    { icon: Tag, label: "Secteur", value: project.sector },
    { icon: MapPin, label: "Ville", value: project.city },
    { icon: Layers, label: "Solutions installées", value: String(project.installed.length) },
    { icon: Images, label: "Visuels", value: String(total) },
  ];

  return (
    <>
      <PageHero
        eyebrow={project.sector}
        title={project.title}
        description={project.summary}
        image={project.image}
        crumbs={[{ label: "Références", to: "/references" }, { label: project.title }]}
      />

      {/* Project facts overlapping the hero */}
      <section className="relative z-10 -mt-10 md:-mt-14">
        <div className="container-page">
          <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-black/5 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {facts.map(({ icon: Icon, label, value }, i) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-3.5 px-5 py-5 md:px-7 md:py-6",
                  i % 2 === 1 && "border-l border-border lg:border-l-0",
                  i > 1 && "border-t border-border lg:border-t-0",
                )}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon strokeWidth={1.75} className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="truncate font-semibold">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl">Le projet</h2>
            <span className="mt-4 block h-[3px] w-20 rounded-full bg-primary" />
            <p className="mt-8 max-w-prose border-l-2 border-primary/30 pl-5 text-lg leading-relaxed text-foreground/90">
              {project.summary}
            </p>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            {project.placeholder ? (
              <p className="mt-8 rounded-lg bg-surface px-4 py-3 text-xs text-muted-foreground">
                Contenu de démonstration : à remplacer par une référence réelle et ses
                photos.
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={0.1} className="h-max lg:sticky lg:top-28">
            <div className="card-elevated overflow-hidden rounded-2xl border border-border">
              <div className="bg-primary px-6 py-5 text-primary-foreground">
                <h3 className="text-lg font-semibold">Solutions installées</h3>
                <p className="mt-1 text-sm text-primary-foreground/80">
                  Équipements fournis par Districap sur ce projet.
                </p>
              </div>
              <ul className="divide-y divide-border">
                {project.installed.map((item) => (
                  <li key={item.label}>
                    <Link
                      to="/solutions/$slug"
                      params={{ slug: item.slug }}
                      className="group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-primary/5"
                    >
                      <span>
                        <span className="block text-sm font-bold">{item.brand}</span>
                        <span className="block text-sm text-muted-foreground transition-colors group-hover:text-primary">
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        strokeWidth={1.75}
                        className="size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bento gallery: first image is the lead visual */}
      <section className="pb-16 md:pb-24">
        <div className="container-page">
          <SectionTitle eyebrow="Galerie" title="Images du projet" />
          <Stagger className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[230px] md:gap-4 lg:grid-cols-4">
            {project.gallery.map((src: string, i: number) => (
              <StaggerItem
                key={`${src}-${i}`}
                className={cn(i === 0 && "col-span-2 row-span-2")}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Agrandir le visuel ${i + 1}`}
                  className="group relative block size-full overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <img
                    src={src}
                    alt={`${project.title} — visuel ${i + 1}`}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="size-full object-cover transition-transform duration-[700ms] group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-3 right-3 grid size-9 translate-y-2 place-items-center rounded-full bg-white text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <Maximize2 className="size-4" />
                  </span>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} — galerie`}
            className="fixed inset-0 z-[80] flex flex-col bg-ink/95 p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="flex items-center justify-between text-ink-foreground">
              <p className="text-sm tabular-nums">
                {active + 1} / {total}
              </p>
              <button
                type="button"
                aria-label="Fermer"
                onClick={() => setActive(null)}
                className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <X strokeWidth={1.75} className="size-6" />
              </button>
            </div>

            <div className="relative grid flex-1 place-items-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={project.gallery[active]}
                  alt={`${project.title} — visuel ${active + 1}`}
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain"
                />
              </AnimatePresence>

              {total > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="Visuel précédent"
                    onClick={(e) => {
                      e.stopPropagation();
                      step(-1);
                    }}
                    className="absolute left-0 grid size-11 place-items-center rounded-full bg-white/10 text-ink-foreground transition-colors hover:bg-white/25 sm:left-2"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    aria-label="Visuel suivant"
                    onClick={(e) => {
                      e.stopPropagation();
                      step(1);
                    }}
                    className="absolute right-0 grid size-11 place-items-center rounded-full bg-white/10 text-ink-foreground transition-colors hover:bg-white/25 sm:right-2"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionTitle eyebrow="Autres références" title="À découvrir également" />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {others.map((p) => (
              <StaggerItem key={p.slug}>
                <ProjectCard project={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}