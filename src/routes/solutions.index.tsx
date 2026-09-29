import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SolutionCard } from "@/components/cards";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/CtaBanner";
import { solutions } from "@/data/solutions";
import heroControl from "@/assets/hero-control-room.jpg";

export const Route = createFileRoute("/solutions/")({
  component: SolutionsPage,
  head: () => ({
    meta: [
      { title: "Solutions courant faible et sécurité électronique — Districap" },
      {
        name: "description",
        content:
          "Sécurité incendie, vidéosurveillance, intrusion et contrôle d'accès, sonorisation, audioconférence, visioconférence, affichage Pro AV et précâblage informatique.",
      },
      { property: "og:title", content: "Nos solutions — Districap" },
      {
        property: "og:description",
        content:
          "Huit familles de solutions de courant faible distribuées au Maroc par Districap.",
      },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
});

function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos solutions"
        title="Toute la chaîne du courant faible, sous un même toit"
        description="Districap distribue les équipements de sécurité électronique, d'audiovisuel professionnel et de réseau, avec le conseil technique et la disponibilité qui font la différence sur un chantier."
        image={heroControl}
        crumbs={[{ label: "Solutions" }]}
      />
      <section className="section-y">
        <div className="container-page">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution) => (
              <StaggerItem key={solution.slug}>
                <SolutionCard solution={solution} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
