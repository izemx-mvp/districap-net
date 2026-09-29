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

function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Informations"
        title="Plan du site"
        crumbs={[{ label: "Plan du site" }]}
      />
      <section className="section-y">
        <div className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="text-lg">Pages principales</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {(
                [
                  { label: "Accueil", to: "/" },
                  { label: "Solutions", to: "/solutions" },
                  { label: "Marques", to: "/marques" },
                  { label: "Références", to: "/references" },
                  { label: "Qui sommes-nous", to: "/qui-sommes-nous" },
                  { label: "Demander un devis", to: "/devis" },
                  { label: "Contact", to: "/contact" },
                ] as const
              ).map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg">Solutions</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/solutions/$slug"
                    params={{ slug: s.slug }}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg">Références</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/references/$slug"
                    params={{ slug: p.slug }}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 text-lg">Informations</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {(
                [
                  { label: "Mentions légales", to: "/mentions-legales" },
                  {
                    label: "Politique de confidentialité",
                    to: "/politique-de-confidentialite",
                  },
                ] as const
              ).map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
