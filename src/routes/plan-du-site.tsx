import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { solutions } from "@/data/solutions";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/plan-du-site")({
  component: SitemapPage,
  head: () => ({
    meta: [
      { title: "Plan du site — Districap" },
      {
        name: "description",
        content:
          "Toutes les pages du site Districap : solutions, marques, références, entreprise et contact.",
      },
      { property: "og:title", content: "Plan du site — Districap" },
      { property: "og:description", content: "Navigation complète du site Districap." },
      { property: "og:url", content: "/plan-du-site" },
    ],
    links: [{ rel: "canonical", href: "/plan-du-site" }],
  }),
});

const mainPages = [
  { label: "Accueil", to: "/", desc: "Présentation de Districap et de ses solutions" },
  { label: "Solutions", to: "/solutions", desc: "Toutes nos solutions par domaine" },
  { label: "Marques", to: "/marques", desc: "Les marques que nous distribuons" },
  { label: "Références", to: "/references", desc: "Projets réalisés pour nos clients" },
  { label: "Qui sommes-nous", to: "/qui-sommes-nous", desc: "Notre entreprise et notre équipe" },
  { label: "Demander un devis", to: "/devis", desc: "Décrivez votre projet, nous vous répondons" },
  { label: "Contact", to: "/contact", desc: "Coordonnées et formulaire de contact" },
] as const;

const legalPages = [
  { label: "Mentions légales", to: "/mentions-legales" },
  { label: "Politique de confidentialité", to: "/politique-de-confidentialite" },
] as const;

/** Lowercase + strip accents so "references" matches "Références". */
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

function Group({
  id,
  title,
  count,
  children,
}: {
  id: string;
  title: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-border pt-5">
      <h2 id={id} className="flex items-baseline justify-between gap-3 text-lg">
        {title}
        <span className="text-sm font-normal text-muted-foreground" aria-label={`${count} pages`}>
          {count}
        </span>
      </h2>
      <ul className="mt-4 space-y-3 text-sm">{children}</ul>
    </section>
  );
}

const linkClass =
  "text-foreground underline-offset-4 hover:text-primary hover:underline " +
  "focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function SitemapPage() {
  const [query, setQuery] = useState("");
  const q = normalize(query);

  const filtered = useMemo(() => {
    const match = (text: string) => !q || normalize(text).includes(q);
    return {
      main: mainPages.filter((p) => match(p.label) || match(p.desc)),
      solutions: solutions.filter((s) => match(s.title)),
      projects: projects.filter((p) => match(p.title)),
      legal: legalPages.filter((p) => match(p.label)),
    };
  }, [q]);

  const total =
    filtered.main.length +
    filtered.solutions.length +
    filtered.projects.length +
    filtered.legal.length;

  return (
    <>
      <PageHero
        eyebrow="Informations"
        title="Plan du site"
        crumbs={[{ label: "Plan du site" }]}
      />
      <section className="section-y">
        <div className="container-page">
          {/* Search */}
          <div className="max-w-xl">
            <label htmlFor="sitemap-search" className="text-sm font-medium">
              Rechercher une page
            </label>
            <input
              id="sitemap-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex. : devis, sécurité, contact…"
              autoComplete="off"
              className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <p className="mt-2 text-sm text-muted-foreground" role="status" aria-live="polite">
              {q
                ? total > 0
                  ? `${total} page${total > 1 ? "s" : ""} trouvée${total > 1 ? "s" : ""}`
                  : "Aucune page ne correspond à votre recherche."
                : `${
                    mainPages.length + solutions.length + projects.length + legalPages.length
                  } pages sur le site`}
            </p>
          </div>

          {/* Groups */}
          {total > 0 ? (
            <nav
              aria-label="Plan du site"
              className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.main.length > 0 && (
                <Group id="sm-main" title="Pages principales" count={filtered.main.length}>
                  {filtered.main.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className={linkClass}>
                        {l.label}
                      </Link>
                      <p className="mt-0.5 text-muted-foreground">{l.desc}</p>
                    </li>
                  ))}
                </Group>
              )}

              {filtered.solutions.length > 0 && (
                <Group id="sm-solutions" title="Solutions" count={filtered.solutions.length}>
                  {filtered.solutions.map((s) => (
                    <li key={s.slug}>
                      <Link to="/solutions/$slug" params={{ slug: s.slug }} className={linkClass}>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </Group>
              )}

              {(filtered.projects.length > 0 || filtered.legal.length > 0) && (
                <div className="space-y-10">
                  {filtered.projects.length > 0 && (
                    <Group id="sm-refs" title="Références" count={filtered.projects.length}>
                      {filtered.projects.map((p) => (
                        <li key={p.slug}>
                          <Link
                            to="/references/$slug"
                            params={{ slug: p.slug }}
                            className={linkClass}
                          >
                            {p.title}
                          </Link>
                        </li>
                      ))}
                    </Group>
                  )}
                  {filtered.legal.length > 0 && (
                    <Group id="sm-legal" title="Informations légales" count={filtered.legal.length}>
                      {filtered.legal.map((l) => (
                        <li key={l.to}>
                          <Link to={l.to} className={linkClass}>
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </Group>
                  )}
                </div>
              )}
            </nav>
          ) : (
            <div className="mt-10 border-t border-border pt-6 text-sm">
              <p>
                Essayez un autre mot-clé, ou{" "}
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-primary underline underline-offset-4"
                >
                  affichez toutes les pages
                </button>
                .
              </p>
            </div>
          )}

          {/* Help */}
          <p className="mt-14 max-w-xl border-t border-border pt-6 text-sm text-muted-foreground">
            Vous ne trouvez pas ce que vous cherchez ?{" "}
            <Link to="/contact" className="text-primary underline underline-offset-4">
              Contactez-nous
            </Link>{" "}
            ou{" "}
            <Link to="/devis" className="text-primary underline underline-offset-4">
              demandez un devis
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}