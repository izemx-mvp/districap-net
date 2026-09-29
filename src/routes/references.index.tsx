import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
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
  const available = ["Tous", ...sectors.filter((s) => projects.some((p) => p.sector === s))];
  const list = filter === "Tous" ? projects : projects.filter((p) => p.sector === filter);

  return (
    <>
      <PageHero
        eyebrow="Références"
        title="Des projets livrés sur tout le territoire"
        description="Nos équipements équipent des centres commerciaux, des hôtels, des administrations et des sites industriels. Voici une sélection de projets où Districap a fourni les solutions."
        image={heroMall}
        crumbs={[{ label: "Références" }]}
      />

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-wrap gap-2">
            {available.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  filter === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary hover:text-primary",
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((project, i) => (
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
