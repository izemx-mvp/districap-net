import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Tag, X } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal, Stagger, StaggerItem, EASE } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { getProject, projects } from "@/data/projects";

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
  const [lightbox, setLightbox] = useState<string | null>(null);
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={project.sector}
        title={project.title}
        description={project.summary}
        image={project.image}
        crumbs={[{ label: "Références", to: "/references" }, { label: project.title }]}
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl">Le projet</h2>
            <span className="mt-4 block h-[3px] w-20 bg-primary" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            {project.placeholder ? (
              <p className="mt-6 rounded-lg bg-surface px-4 py-3 text-xs text-muted-foreground">
                Contenu de démonstration : à remplacer par une référence réelle et ses
                photos.
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={0.1} className="card-elevated h-max border border-border p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Fiche projet</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start gap-2.5">
                <Tag strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <dt className="text-muted-foreground">Secteur</dt>
                  <dd className="font-medium">{project.sector}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <dt className="text-muted-foreground">Ville</dt>
                  <dd className="font-medium">{project.city}</dd>
                </div>
              </div>
            </dl>
            <h3 className="mt-7 text-sm font-semibold uppercase tracking-wider">
              Solutions installées
            </h3>
            <ul className="mt-4 space-y-3">
              {project.installed.map((item) => (
                <li key={item.label}>
                  <Link
                    to="/solutions/$slug"
                    params={{ slug: item.slug }}
                    className="group block rounded-lg bg-surface p-3 transition-colors hover:bg-primary/10"
                  >
                    <span className="block text-sm font-bold">{item.brand}</span>
                    <span className="block text-xs text-muted-foreground group-hover:text-primary">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page">
          <SectionTitle eyebrow="Galerie" title="Images du projet" />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((src, i) => (
              <StaggerItem key={`${src}-${i}`}>
                <button
                  type="button"
                  onClick={() => setLightbox(src)}
                  className="group block w-full overflow-hidden rounded-xl"
                >
                  <img
                    src={src}
                    alt={`${project.title} — visuel ${i + 1}`}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
                  />
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/95 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Fermer"
              className="absolute right-6 top-6 text-ink-foreground"
            >
              <X strokeWidth={1.75} className="size-7" />
            </button>
            <motion.img
              src={lightbox}
              alt={project.title}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain"
            />
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
