import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Download,
  FolderKanban,
  Layers,
  Tags,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal, Stagger, StaggerItem, EASE } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/cards";
import { CtaBanner } from "@/components/CtaBanner";
import { getSolution, solutions } from "@/data/solutions";
import { projects } from "@/data/projects";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

// The same image is reused for every range, so vary the crop to keep blocks distinct
const crops = ["object-left", "object-center", "object-right"];

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

  const related = projects.filter((p) => p.installed.some((i) => i.slug === solution.slug));

  const facts = [
    { icon: Layers, label: "Gammes détaillées", value: solution.subs.length },
    { icon: Tags, label: "Marques associées", value: solution.brands.length },
    { icon: FolderKanban, label: "Projets réalisés", value: related.length },
  ];

  return (
    <>
      <PageHero
        eyebrow={solution.title}
        title={solution.title}
        description={solution.intro}
        image={solution.image}
        crumbs={[{ label: "Solutions", to: "/solutions" }, { label: solution.title }]}
      />

      <section className="relative z-10 -mt-10 md:-mt-14">
        <div className="container-page">
          <dl className="grid grid-cols-3 divide-x divide-border overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-black/5">
            {facts.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-start gap-2 px-4 py-5 sm:flex-row sm:items-center sm:gap-4 sm:px-8 sm:py-6"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon strokeWidth={1.75} className="size-5" aria-hidden />
                </span>
                <div>
                  <dd className="text-3xl font-semibold tabular-nums leading-none">
                    {String(value).padStart(2, "0")}
                  </dd>
                  <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</dt>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Sticky sub nav, pill style */}
      <nav
        aria-label="Sous-solutions"
        className="sticky top-0 z-30 mt-10 border-b border-border bg-background/90 backdrop-blur"
      >
        <div className="container-page flex gap-2 overflow-x-auto py-3">
          {solution.subs.map((sub) => (
            <a
              key={sub.slug}
              href={`#${sub.slug}`}
              aria-current={active === sub.slug ? "true" : undefined}
              className={cn(
                "relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === sub.slug ? "text-primary-foreground" : "hover:text-primary",
              )}
            >
              {active === sub.slug ? (
                <motion.span
                  layoutId={`subnav-${solution.slug}`}
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              ) : null}
              <span className="relative">{sub.title}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Blocks */}
      <div>
        {solution.subs.map((sub, i) => {
          const flipped = i % 2 === 1;
          return (
            <section
              key={sub.slug}
              id={sub.slug}
              className={cn("scroll-mt-20 py-16 lg:py-24", flipped && "bg-surface")}
            >
              <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <motion.div
                  className={cn("relative", flipped && "lg:order-2")}
                  initial={{ opacity: 0, x: flipped ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <div
                    aria-hidden
                    className={cn(
                      "absolute -z-0 hidden size-full rounded-3xl border-2 border-primary/20 lg:block",
                      flipped ? "-bottom-4 -left-4" : "-bottom-4 -right-4",
                    )}
                  />
                  <img
                    src={solution.image}
                    alt={sub.title}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className={cn(
                      "relative aspect-[4/3] w-full rounded-3xl object-cover shadow-xl shadow-black/10",
                      crops[i % crops.length],
                    )}
                  />
                  {sub.brand ? (
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background px-3.5 py-1.5 text-sm font-bold shadow-lg">
                      <BadgeCheck className="size-4 text-primary" aria-hidden />
                      {sub.brand}
                    </span>
                  ) : null}
                </motion.div>

                <Reveal className={flipped ? "lg:order-1" : undefined}>
                  <h2 className="text-2xl leading-tight sm:text-4xl">{sub.title}</h2>
                  <span className="mt-4 block h-[3px] w-16 rounded-full bg-primary" />
                  <p className="mt-6 max-w-prose text-base leading-relaxed text-muted-foreground">
                    {sub.description}
                  </p>

                  <div className="mt-7 rounded-2xl border border-border bg-background p-5 sm:p-6">
                    <p className="text-sm font-semibold">Ce que vous y gagnez</p>
                    <Stagger className="mt-4 grid gap-3 sm:grid-cols-2" step={0.06}>
                      {sub.benefits.map((b: string) => (
                        <StaggerItem key={b}>
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary">
                              <Check
                                strokeWidth={3}
                                className="size-3 text-primary-foreground"
                                aria-hidden
                              />
                            </span>
                            <span className="text-sm leading-relaxed">{b}</span>
                          </div>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <Link
                      to="/devis"
                      className="sheen group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.97]"
                    >
                      Demander un devis
                      <ArrowRight
                        strokeWidth={1.75}
                        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
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
                          aria-hidden
                        />
                        Télécharger la documentation
                      </button>
                    ) : null}
                  </div>

                  <p className="mt-7 rounded-lg border border-dashed border-border px-4 py-3 text-xs text-muted-foreground">
                    Tableau de spécifications techniques : emplacement à compléter avec les
                    données définitives du fabricant.
                  </p>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      {/* Marques associées */}
      <section className="section-y border-t border-border">
        <div className="container-page">
          <SectionTitle eyebrow="Marques associées" title="Les marques de cette gamme" />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solution.brands.map((b: string) => (
              <StaggerItem key={b}>
                <Link
                  to="/marques"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-background px-6 py-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                >
                  <span className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                    {b}
                  </span>
                  <ArrowUpRight
                    strokeWidth={1.75}
                    className="size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden
                  />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Projets */}
      {related.length > 0 ? (
        <section className="section-y bg-surface">
          <div className="container-page">
            <SectionTitle eyebrow="Références" title="Projets réalisés avec cette solution" />
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
      <section className="section-y">
        <div className="container-page">
          <SectionTitle eyebrow="Explorer" title="Découvrir les autres solutions" />
          <div className="mt-8 flex flex-wrap gap-3">
            {solutions
              .filter((s) => s.slug !== solution.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  to="/solutions/$slug"
                  params={{ slug: s.slug }}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {s.title}
                  <ArrowRight
                    strokeWidth={1.75}
                    className="size-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden
                  />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}