import { createFileRoute } from "@tanstack/react-router";
import { Boxes, Headset, FileText, ShieldCheck } from "lucide-react";
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

const guarantees = [
  {
    icon: Boxes,
    title: "Stock local",
    text: "Les références clés sont disponibles au Maroc, sans délai d'import.",
  },
  {
    icon: Headset,
    title: "Support technique",
    text: "Une équipe formée par le constructeur vous accompagne du choix à la mise en service.",
  },
  {
    icon: FileText,
    title: "Documentation",
    text: "Fiches, schémas et guides disponibles pour vos études et vos chantiers.",
  },
];

function BrandsPage() {
  const exclusives = brands.filter((b) => b.exclusive);
  const partners = brands.filter((b) => !b.exclusive);

  const stats = [
    { value: exclusives.length, label: "marques en exclusivité au Maroc" },
    { value: partners.length, label: "partenaires internationaux" },
    { value: brands.length, label: "marques dans notre catalogue" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Nos marques"
        title="Plus de dix partenariats avec les grandes marques internationales"
        description="Districap sélectionne ses partenaires pour la fiabilité de leurs gammes, la qualité de leur support technique et leur conformité aux normes applicables au Maroc."
        image={heroConference}
        crumbs={[{ label: "Marques" }]}
      />

      {/* Key figures, overlapping the hero */}
      <section className="relative z-10 -mt-10 md:-mt-14">
        <div className="container-page">
          <dl className="grid divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-black/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-5 px-6 py-6 md:px-8 md:py-7">
                <dd className="text-5xl font-semibold tabular-nums leading-none tracking-tight text-primary md:text-6xl">
                  {String(s.value).padStart(2, "0")}
                </dd>
                <dt className="max-w-[12rem] text-sm leading-snug text-muted-foreground">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Exclusivities: sticky story on the left, brands on the right */}
      <section className="section-y relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-primary/5 blur-3xl"
        />
        <div className="container-page relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <SectionTitle
                  eyebrow="Distributeur exclusif"
                  title="Nos exclusivités au Maroc"
                  description="Pour ces marques, Districap assure la distribution exclusive sur le territoire marocain : stock, support technique et documentation."
                />

                <ul className="mt-10 space-y-6">
                  {guarantees.map(({ icon: Icon, title, text }) => (
                    <li key={title} className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <p className="font-medium">{title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Stagger className="grid gap-5 sm:grid-cols-2">
                {exclusives.map((brand) => (
                  <StaggerItem key={brand.name}>
                    <div className="group relative h-full rounded-2xl bg-gradient-to-br from-primary/40 via-border to-transparent p-px transition-transform duration-300 hover:-translate-y-1">
                      <div className="relative h-full overflow-hidden rounded-[15px] bg-background">
                        <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                          Exclusivité Maroc
                        </span>
                        <BrandCard brand={brand} />
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Other partners: denser, calmer grid */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <SectionTitle
                eyebrow="Partenaires"
                title="Les autres marques distribuées"
                description="Des gammes complémentaires pour couvrir l'ensemble des besoins de vos projets."
              />
            </div>
            <p className="shrink-0 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{partners.length}</span> marques
              partenaires
            </p>
          </div>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {partners.map((brand) => (
              <StaggerItem key={brand.name}>
                <div className="h-full rounded-2xl border border-border bg-background transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <BrandCard brand={brand} />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner title="Vous recherchez une marque en particulier ?" />
    </>
  );
}