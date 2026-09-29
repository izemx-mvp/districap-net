import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { BrandCard } from "@/components/cards";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/CtaBanner";
import { brands } from "@/data/brands";
import heroConference from "@/assets/hero-conference.jpg";

export const Route = createFileRoute("/marques")({
  component: BrandsPage,
  head: () => ({
    meta: [
      { title: "Marques partenaires — Districap" },
      {
        name: "description",
        content:
          "Districap est distributeur exclusif au Maroc de LUMENS, ATEN, SATEL, FINSECUR et PREMIUM LINE, et partenaire de BOSCH, UNIVIEW, ABSEN, Optoma et HIKVISION.",
      },
      { property: "og:title", content: "Marques partenaires — Districap" },
      {
        property: "og:description",
        content:
          "Plus de dix partenariats avec les grandes marques internationales du courant faible.",
      },
      { property: "og:url", content: "/marques" },
    ],
    links: [{ rel: "canonical", href: "/marques" }],
  }),
});

function BrandsPage() {
  const exclusives = brands.filter((b) => b.exclusive);
  const partners = brands.filter((b) => !b.exclusive);

  return (
    <>
      <PageHero
        eyebrow="Nos marques"
        title="Plus de dix partenariats avec les grandes marques internationales"
        description="Districap sélectionne ses partenaires pour la fiabilité de leurs gammes, la qualité de leur support technique et leur conformité aux normes applicables au Maroc."
        image={heroConference}
        crumbs={[{ label: "Marques" }]}
      />

      <section className="section-y">
        <div className="container-page">
          <SectionTitle
            eyebrow="Distributeur exclusif"
            title="Nos exclusivités au Maroc"
            description="Pour ces marques, Districap assure la distribution exclusive sur le territoire marocain : stock, support technique et documentation."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {exclusives.map((brand) => (
              <StaggerItem key={brand.name}>
                <BrandCard brand={brand} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionTitle
            eyebrow="Partenaires"
            title="Les autres marques distribuées"
            description="Des gammes complémentaires pour couvrir l'ensemble des besoins de vos projets."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((brand) => (
              <StaggerItem key={brand.name}>
                <BrandCard brand={brand} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner title="Vous recherchez une marque en particulier ?" />
    </>
  );
}
