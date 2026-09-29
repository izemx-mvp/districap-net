import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { site } from "@/config/site";

export const Route = createFileRoute("/politique-de-confidentialite")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Districap" },
      {
        name: "description",
        content:
          "Comment Districap collecte et utilise les données transmises via les formulaires de devis, de contact et la newsletter.",
      },
      { property: "og:title", content: "Politique de confidentialité — Districap" },
      {
        property: "og:description",
        content: "Traitement des données personnelles sur le site Districap.",
      },
      { property: "og:url", content: "/politique-de-confidentialite" },
    ],
    links: [{ rel: "canonical", href: "/politique-de-confidentialite" }],
  }),
});

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Informations"
        title="Politique de confidentialité"
        crumbs={[{ label: "Politique de confidentialité" }]}
      />
      <section className="section-y">
        <div className="container-page max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-xl text-foreground">Données collectées</h2>
            <p className="mt-3">
              Les formulaires de demande de devis, de contact et d'inscription à la
              newsletter collectent uniquement les informations nécessaires au traitement de
              votre demande : nom, société, fonction, e-mail, téléphone, ville et
              description du projet.
            </p>
          </div>
          <div>
            <h2 className="text-xl text-foreground">Finalité</h2>
            <p className="mt-3">
              Ces données servent exclusivement à répondre à votre demande, établir un devis
              et assurer le suivi commercial et technique. Elles ne sont ni vendues ni
              cédées à des tiers.
            </p>
          </div>
          <div>
            <h2 className="text-xl text-foreground">Cookies</h2>
            <p className="mt-3">
              Le site peut utiliser des cookies de mesure d'audience. Vous pouvez accepter
              ou refuser leur dépôt via le bandeau affiché lors de votre première visite.
            </p>
          </div>
          <div>
            <h2 className="text-xl text-foreground">Vos droits</h2>
            <p className="mt-3">
              Vous pouvez demander l'accès, la rectification ou la suppression de vos
              données en écrivant à{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-primary">
                {site.email}
              </a>
              .
            </p>
          </div>
          <p className="rounded-lg bg-surface px-4 py-3 text-xs">
            Document type à faire valider par Districap avant publication définitive.
          </p>
        </div>
      </section>
    </>
  );
}
