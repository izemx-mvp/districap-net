import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Check, Download } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal, Stagger, StaggerItem, EASE } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { getSolution, solutions } from "@/data/solutions";
import { projects } from "@/data/projects";
import { toast } from "sonner";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = getSolution(params.slug);
    if (!solution) throw notFound();
    return { solution };
  },
  component: SolutionPage,
  head: ({ params, loaderData }) => {
    const solution = loaderData?.solution;
    const title = solution ? `${solution.title} — Districap` : "Solution — Districap";
    const description = solution?.short ?? "Solutions de courant faible au Maroc.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/solutions/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/solutions/${params.slug}` }],
    };
  },
});

function SolutionPage() {
  const { solution } = Route.useLoaderData();
  const [active, setActive] = useState(solution.subs[0]!.slug);

  useEffect(() => {
    setActive(solution.subs[0]!.slug);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    solution.subs.forEach((sub) => {
      const el = document.getElementById(sub.slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [solution]);

  const related = projects.filter((p) =>
    p.installed.some((i) => i.slug === solution.slug),
  );

  return (
    <>
      <PageHero
        eyebrow={solution.title}
        title={solution.title}
        description={solution.intro}
        image={solution.image}
        crumbs={[{ label: "Solutions", to: "/solutions" }, { label: solution.title }]}
      />

      {/* Sticky sub nav */}
      <nav
        aria-label="Sous-solutions"
        className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur"
      >
        <div className="container-page flex gap-6 overflow-x-auto py-4">
          {solution.subs.map((sub) => (
            <a
              key={sub.slug}
              href={`#${sub.slug}`}
              className="relative shrink-0 whitespace-nowrap text-sm font-medium transition-colors hover:text-primary"
              data-active={active === sub.slug}
            >
              <span className={active === sub.slug ? "text-primary" : undefined}>
                {sub.title}
              </span>
              {active === sub.slug ? (
                <motion.span
                  layoutId={`subnav-${solution.slug}`}
                  className="absolute -bottom-4 left-0 h-[2px] w-full bg-primary"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              ) : null}
            </a>
          ))}
        </div>
      </nav>

      {/* Blocks */}
      <div className="divide-y divide-border">
        {solution.subs.map((sub, i) => (
          <section key={sub.slug} id={sub.slug} className="scroll-mt-24 py-16 lg:py-20">
            <div className="container-page grid items-center gap-10 lg:grid-cols-2">
              <motion.div
                className={i % 2 === 1 ? "lg:order-2" : undefined}
                initial={{ opacity: 0, x: i % 2 === 1 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <img
                  src={solution.image}
                  alt={sub.title}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                />
              </motion.div>
              <Reveal className={i % 2 === 1 ? "lg:order-1" : undefined}>
                {sub.brand ? <span className="eyebrow">{sub.brand}</span> : null}
                <h2 className="mt-3 text-2xl leading-tight sm:text-3xl">{sub.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {sub.description}
                </p>
                <Stagger className="mt-6 space-y-2.5" step={0.06}>
                  {sub.benefits.map((b) => (
                    <StaggerItem key={b}>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10">
                          <Check strokeWidth={2.5} className="size-3 text-primary" />
                        </span>
                        <span className="text-sm leading-relaxed">{b}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to="/devis"
                    className="sheen group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.97]"
                  >
                    Demander un devis
                    <ArrowRight
                      strokeWidth={1.75}
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                  {sub.hasDoc ? (
                    <button
                      type="button"
                      onClick={() =>
                        toast.info(
                          "Documentation sur demande : nos équipes vous l'envoient par e-mail.",
                        )
                      }
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      <Download
                        strokeWidth={1.75}
                        className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                      />
                      Télécharger la documentation
                    </button>
                  ) : null}
                </div>
                <p className="mt-6 rounded-lg bg-surface px-4 py-3 text-xs text-muted-foreground">
                  Tableau de spécifications techniques : emplacement à compléter avec les
                  données définitives du fabricant.
                </p>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      {/* Marques associées */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionTitle eyebrow="Marques associées" title="Les marques de cette gamme" />
          <div className="mt-10 flex flex-wrap gap-4">
            {solution.brands.map((b) => (
              <Link
                key={b}
                to="/marques"
                className="card-elevated border border-border px-8 py-5 text-lg font-bold transition-colors hover:text-primary"
              >
                {b}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projets */}
      {related.length > 0 ? (
        <section className="section-y">
          <div className="container-page">
            <SectionTitle
              eyebrow="Références"
              title="Projets réalisés avec cette solution"
            />
            <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
              {related.slice(0, 3).map((p) => (
                <StaggerItem key={p.slug}>
                  <ProjectCard project={p} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      {/* Autres solutions */}
      <section className="pb-4">
        <div className="container-page flex flex-wrap gap-3">
          {solutions
            .filter((s) => s.slug !== solution.slug)
            .map((s) => (
              <Link
                key={s.slug}
                to="/solutions/$slug"
                params={{ slug: s.slug }}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {s.title}
              </Link>
            ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
