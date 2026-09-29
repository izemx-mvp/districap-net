import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { site } from "@/config/site";

export const Route = createFileRoute("/mentions-legales")({
  component: LegalPage,
  head: () => ({
    meta: [
      { title: "Mentions légales — Districap" },
      {
        name: "description",
        content:
          "Mentions légales du site Districap : éditeur, coordonnées, hébergement et propriété intellectuelle.",
      },
      { property: "og:title", content: "Mentions légales — Districap" },
      { property: "og:description", content: "Informations légales du site Districap." },
      { property: "og:url", content: "/mentions-legales" },
    ],
    links: [{ rel: "canonical", href: "/mentions-legales" }],
  }),
});

function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="Informations"
        title="Mentions légales"
        crumbs={[{ label: "Mentions légales" }]}
      />
      <section className="section-y">
        <div className="container-page max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-xl text-foreground">Éditeur du site</h2>
            <p className="mt-3">
              {site.legalName} — {site.tagline}
              <br />
              {site.address.street}, {site.address.city}, {site.address.country}
              <br />
              Téléphone : {site.phones.join(" · ")}
              <br />
              E-mail : {site.email}
            </p>
            <p className="mt-3">
              Forme juridique, capital social, RC, IF, ICE et TVA : informations à
              compléter par Districap.
            </p>
          </div>
          <div>
            <h2 className="text-xl text-foreground">Hébergement</h2>
            <p className="mt-3">
              Le site est hébergé et servi en HTTPS. Les coordonnées de l'hébergeur sont à
              compléter.
            </p>
          </div>
          <div>
            <h2 className="text-xl text-foreground">Propriété intellectuelle</h2>
            <p className="mt-3">
              L'ensemble des contenus de ce site (textes, visuels, logos, marques) est
              protégé. Les marques citées appartiennent à leurs titulaires respectifs.
              Toute reproduction sans autorisation écrite est interdite.
            </p>
          </div>
          <div>
            <h2 className="text-xl text-foreground">Responsabilité</h2>
            <p className="mt-3">
              Les informations techniques présentées le sont à titre indicatif et peuvent
              évoluer selon les gammes des fabricants. Elles ne constituent pas un
              engagement contractuel ; seul un devis signé fait foi.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
