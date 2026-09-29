import { createFileRoute } from "@tanstack/react-router";
import { Compass, Gauge, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CountUp } from "@/components/CountUp";
import { CtaBanner } from "@/components/CtaBanner";
import { site } from "@/config/site";
import heroControl from "@/assets/hero-control-room.jpg";

export const Route = createFileRoute("/qui-sommes-nous")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "Qui sommes-nous — Districap, Casablanca depuis 2009" },
      {
        name: "description",
        content:
          "Créée en 2009 à Casablanca, Districap est l'importateur et distributeur de référence en sécurité électronique pour les professionnels, entreprises et grands comptes au Maroc.",
      },
      { property: "og:title", content: "Qui sommes-nous — Districap" },
      {
        property: "og:description",
        content:
          "Notre histoire, notre stratégie et notre méthode de travail depuis 2009.",
      },
      { property: "og:url", content: "/qui-sommes-nous" },
    ],
    links: [{ rel: "canonical", href: "/qui-sommes-nous" }],
  }),
});

const values = [
  {
    icon: ShieldCheck,
    title: "Qualité",
    text: "Des gammes certifiées et des marques reconnues, sélectionnées pour leur fiabilité dans le temps.",
  },
  {
    icon: Compass,
    title: "Conseil",
    text: "Une lecture technique du besoin avant la proposition commerciale, pour orienter les bons choix.",
  },
  {
    icon: Gauge,
    title: "Délais",
    text: "La maîtrise complète des délais de mise en œuvre, du bon de commande à la livraison.",
  },
  {
    icon: Users,
    title: "Proximité",
    text: "Des équipes disponibles à Casablanca, au contact des installateurs et des bureaux d'études.",
  },
];

const milestones = [
  { year: "2009", title: "Création de Districap", text: "Lancement de l'activité de distribution de courant faible à Casablanca." },
  { year: "2012", title: "Premières exclusivités", text: "Signature des premiers accords de distribution exclusive au Maroc. (à confirmer)" },
  { year: "2016", title: "Élargissement de l'offre", text: "Extension vers l'audiovisuel professionnel et le précâblage informatique. (à confirmer)" },
  { year: "2020", title: "Grands comptes", text: "Accompagnement de projets d'envergure sur des sites recevant du public. (à confirmer)" },
  { year: "Aujourd'hui", title: "Plus de dix partenariats", text: "Une offre complète, du stock et une boutique en ligne pour les achats rapides." },
];

export default AboutPage;

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Qui sommes-nous"
        title="Importateur et distributeur de référence depuis 2009"
        description="Districap est une société marocaine créée en 2009 à Casablanca, spécialisée dans la distribution d'équipements de courant faible pour les professionnels, les entreprises et les grands comptes."
        image={heroControl}
        crumbs={[{ label: "Qui sommes-nous" }]}
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionTitle eyebrow="Notre histoire" title="Une expertise construite année après année" />
            <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Depuis sa création en 2009, Districap s'est imposée comme l'importateur et
                le distributeur de référence de la sécurité électronique au Maroc. Notre
                activité couvre l'ensemble du courant faible : détection incendie,
                vidéosurveillance, intrusion et contrôle d'accès, sonorisation,
                audioconférence, visioconférence, affichage professionnel et précâblage
                informatique.
              </p>
              <p>
                Nous sommes le distributeur exclusif au Maroc de LUMENS, ATEN, SATEL,
                FINSECUR et PREMIUM LINE, et comptons plus de dix partenariats avec de
                grandes marques internationales. Cette position nous permet d'offrir à nos
                clients une profondeur de gamme, un support technique direct et une
                disponibilité réelle du matériel.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-5 self-center">
            {site.figures.map((f) => (
              <div key={f.label} className="card-elevated border border-border p-6">
                <p className="text-3xl font-bold text-primary">
                  <CountUp value={f.value} prefix={f.prefix} suffix={f.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{f.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-ink">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionTitle
              tone="dark"
              eyebrow="Mission & stratégie"
              title="Être la référence nationale en qualité, en offre et en service"
            />
            <p className="mt-8 text-base leading-relaxed text-ink-foreground/75">
              Notre stratégie est de rester constamment à jour des évolutions
              technologiques de la sécurité électronique, afin de proposer à nos clients
              des solutions actuelles, conformes et maintenables. Notre promesse : une
              maîtrise complète des délais de mise en œuvre, avec une équipe qui évalue les
              enjeux de chaque projet et recommande les solutions les plus pertinentes.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="text-lg text-ink-foreground">Notre méthode de travail</h3>
            <ul className="mt-6 space-y-4">
              {[
                "Préparation du projet en amont, avec les contraintes du site et les exigences normatives.",
                "Choix techniques pertinents, argumentés et chiffrés.",
                "Gestion optimale des phases de déploiement, en coordination avec vos équipes.",
                "Contrôle des délais, de la commande à la livraison sur site.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-ink-foreground/75">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionTitle eyebrow="Nos valeurs" title="Ce qui guide notre travail au quotidien" />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="card-elevated group h-full border border-border p-6 transition-transform duration-300 hover:-translate-y-1">
                  <v.icon
                    strokeWidth={1.75}
                    className="size-7 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-primary"
                  />
                  <h3 className="mt-5 text-lg">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {v.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionTitle
            eyebrow="Étapes clés"
            title="Les dates qui ont marqué Districap"
            description="Les jalons intermédiaires sont des repères à confirmer avec vos équipes."
          />
          <div className="mt-12 space-y-8 border-l-2 border-border pl-6">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.06} className="relative">
                <span className="absolute -left-[1.95rem] top-2 size-3 rounded-full bg-primary" />
                <p className="text-sm font-bold text-primary">{m.year}</p>
                <h3 className="mt-1 text-lg">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {m.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionTitle
            eyebrow="Notre équipe"
            title="Des interlocuteurs techniques et commerciaux"
            description="Emplacements à compléter avec les photos et les fonctions réelles de votre équipe."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Direction commerciale",
              "Bureau d'études",
              "Support technique",
              "Logistique & stock",
            ].map((role) => (
              <StaggerItem key={role}>
                <div className="card-elevated border border-border p-6 text-center">
                  <div className="mx-auto grid size-16 place-items-center rounded-full bg-surface">
                    <Users strokeWidth={1.75} className="size-7 text-muted-foreground" />
                  </div>
                  <h3 className="mt-5 text-base">{role}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Nom et photo à compléter
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
