import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Building2,
  Check,
  Compass,
  Factory,
  Gauge,
  GraduationCap,
  Hotel,
  Landmark,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CountUp } from "@/components/CountUp";
import { CtaBanner } from "@/components/CtaBanner";
import { site } from "@/config/site";
import heroControl from "@/assets/hero-control-room.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/qui-sommes-nous")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "Qui sommes-nous — Districap, Casablanca depuis 2009" },
      {
        name: "description",
        content:
          "Créée en 2009 à Casablanca, Districap est l'importateur et distributeur de référence en sécurité électronique au Maroc, distributeur exclusif de LUMENS, ATEN, SATEL, FINSECUR et PREMIUM LINE.",
      },
      { property: "og:title", content: "Qui sommes-nous — Districap" },
      {
        property: "og:description",
        content: "Notre histoire, nos exclusivités, notre méthode et nos références depuis 2009.",
      },
      { property: "og:url", content: "/qui-sommes-nous" },
    ],
    links: [{ rel: "canonical", href: "/qui-sommes-nous" }],
  }),
});

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const DOMAINS = [
  "Détection incendie",
  "Vidéosurveillance",
  "Intrusion & contrôle d'accès",
  "Sonorisation",
  "Audioconférence",
  "Visioconférence",
  "Affichage & Pro AV",
  "Précâblage informatique",
];

const EXCLUSIVES = [
  { name: "FINSECUR", domain: "Détection incendie", note: "Gammes certifiées NF et NE" },
  { name: "SATEL", domain: "Intrusion & alarmes", note: "Centrales INTEGRA, Perfecta, MICRA" },
  { name: "LUMENS", domain: "Visioconférence", note: "Caméras et visualiseurs" },
  { name: "ATEN", domain: "Pro AV & KVM", note: "Distribution A/V et contrôle" },
  { name: "PREMIUM LINE", domain: "Solutions professionnelles", note: "Distribution exclusive au Maroc" },
];

const PILLARS = [
  {
    title: "Qualité",
    text: "Des gammes certifiées et des marques reconnues pour leur fiabilité dans le temps.",
  },
  {
    title: "Offre",
    text: "Une profondeur de gamme couvrant l'ensemble du courant faible, avec du matériel disponible.",
  },
  {
    title: "Service",
    text: "Une équipe qui évalue les enjeux de chaque projet et recommande les solutions les plus pertinentes.",
  },
];

const METHOD = [
  {
    title: "Préparation en amont",
    text: "Analyse des contraintes du site et des exigences normatives avant toute proposition.",
  },
  {
    title: "Choix techniques argumentés",
    text: "Des solutions pertinentes, justifiées et chiffrées poste par poste.",
  },
  {
    title: "Déploiement coordonné",
    text: "Une gestion optimale des phases de déploiement, en lien avec vos équipes.",
  },
  {
    title: "Maîtrise des délais",
    text: "Un suivi rigoureux, du bon de commande à la livraison sur site.",
  },
];

const VALUES = [
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

// TODO: confirm intermediate years (2012, 2016, 2020) with the client before going live.
const MILESTONES = [
  { year: "2009", title: "Création de Districap", text: "Lancement de l'activité de distribution de courant faible à Casablanca." },
  { year: "2012", title: "Premières exclusivités", text: "Signature des premiers accords de distribution exclusive au Maroc." },
  { year: "2016", title: "Élargissement de l'offre", text: "Extension vers l'audiovisuel professionnel et le précâblage informatique." },
  { year: "2020", title: "Grands comptes", text: "Accompagnement de projets d'envergure sur des sites recevant du public." },
  { year: "Aujourd'hui", title: "Plus de dix partenariats", text: "Une offre complète, du stock et une boutique en ligne pour les achats rapides." },
];

const REFERENCES = [
  {
    name: "Almazar",
    city: "Marrakech",
    solutions: ["Détection incendie FINSECUR"],
  },
  {
    name: "Marina Mall",
    city: "Casablanca",
    solutions: ["Sonorisation de sécurité BOSCH", "Alarme intrusion SATEL", "Détection incendie FINSECUR"],
  },
  {
    name: "Aeria Mall",
    city: "Casablanca",
    solutions: [
      "Sonorisation de sécurité BOSCH",
      "Détection incendie FINSECUR",
      "Vidéosurveillance UNIVIEW",
      "Alarme intrusion SATEL",
    ],
  },
];

const SECTORS = [
  { icon: ShoppingBag, label: "Centres commerciaux" },
  { icon: Building2, label: "Bureaux & sièges" },
  { icon: Factory, label: "Industrie & logistique" },
  { icon: Hotel, label: "Hôtellerie" },
  { icon: Landmark, label: "Administrations" },
  { icon: GraduationCap, label: "Éducation" },
  { icon: Stethoscope, label: "Santé" },
];

const GRID_BG = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
};

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Story() {
  const [first, ...others] = site.figures;

  return (
    <section className="section-y">
      <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        <Reveal>
          <SectionTitle eyebrow="Notre histoire" title="Une expertise construite année après année" />
          <p className="mt-8 text-xl leading-relaxed font-medium md:text-2xl">
            Depuis 2009, Districap s'est imposée comme{" "}
            <span className="text-primary">l'importateur et le distributeur de référence</span> de la
            sécurité électronique au Maroc.
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Nous sommes le distributeur exclusif au Maroc de LUMENS, ATEN, SATEL, FINSECUR et PREMIUM
            LINE, et comptons plus de dix partenariats avec de grandes marques internationales. Cette
            position nous permet d'offrir une profondeur de gamme, un support technique direct et une
            disponibilité réelle du matériel.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {DOMAINS.map((d) => (
              <span
                key={d}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                {d}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
          {first && (
            <div className="relative col-span-2 overflow-hidden rounded-2xl bg-ink p-8 text-ink-foreground">
              <div className="absolute inset-0 opacity-60" style={GRID_BG} aria-hidden />
              <div className="absolute -top-16 -right-16 size-48 rounded-full bg-primary/30 blur-3xl" aria-hidden />
              <p className="relative text-5xl font-bold text-primary md:text-6xl">
                <CountUp value={first.value} prefix={first.prefix} suffix={first.suffix} />
              </p>
              <p className="relative mt-2 text-sm text-ink-foreground/75">{first.label}</p>
            </div>
          )}
          {others.map((f) => (
            <div
              key={f.label}
              className="card-elevated group border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <p className="text-3xl font-bold text-primary">
                <CountUp value={f.value} prefix={f.prefix} suffix={f.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{f.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Exclusives() {
  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow="Nos exclusivités" title="Distributeur exclusif au Maroc" />
          <Reveal>
            <p className="max-w-md text-muted-foreground">
              Des constructeurs internationaux qui nous confient la distribution exclusive de leurs
              gammes sur le territoire marocain.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {EXCLUSIVES.map((b) => (
            <StaggerItem key={b.name}>
              <article className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-ink hover:text-ink-foreground">
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary uppercase">
                    Exclusif
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100" />
                </div>
                <p className="mt-auto text-2xl font-bold tracking-tight">{b.name}</p>
                <p className="mt-1 text-sm font-medium text-primary">{b.domain}</p>
                <p className="mt-3 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-ink-foreground/65">
                  {b.note}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function MissionMethod() {
  return (
    <section className="section-y relative overflow-hidden bg-ink">
      <div className="absolute inset-0 opacity-60" style={GRID_BG} aria-hidden />
      <div className="absolute top-1/3 -left-40 size-96 rounded-full bg-primary/15 blur-3xl" aria-hidden />

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <SectionTitle
            tone="dark"
            eyebrow="Mission & stratégie"
            title="Être la référence nationale en qualité, en offre et en service"
          />
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-ink-foreground/75">
              Notre stratégie : rester constamment à jour des évolutions technologiques de la
              sécurité électronique, pour proposer des solutions actuelles, conformes et
              maintenables. Notre promesse : une maîtrise complète des délais de mise en œuvre.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <StaggerItem key={p.title}>
              <div className="group h-full bg-ink p-8 transition-colors duration-300 hover:bg-white/[0.04]">
                <span className="text-sm font-bold text-primary">0{i + 1}</span>
                <h3 className="mt-4 text-2xl text-ink-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/70">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-20">
          <h3 className="text-lg text-ink-foreground">Notre méthode de travail</h3>
        </Reveal>
        <div className="relative mt-8">
          <span
            className="absolute top-5 right-0 left-0 hidden h-px bg-gradient-to-r from-primary via-primary/40 to-transparent lg:block"
            aria-hidden
          />
          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {METHOD.map((m, i) => (
              <StaggerItem key={m.title}>
                <div className="relative">
                  <span className="relative z-10 grid size-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground ring-8 ring-ink">
                    {i + 1}
                  </span>
                  <h4 className="mt-5 font-semibold text-ink-foreground">{m.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-foreground/70">{m.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="section-y">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.6fr]">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <SectionTitle eyebrow="Nos valeurs" title="Ce qui guide notre travail au quotidien" />
          <div className="relative mt-8 hidden overflow-hidden rounded-2xl lg:block">
            <img
              src={heroControl}
              alt="Salle de contrôle et de supervision"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <p className="absolute bottom-5 left-5 inline-flex items-center gap-2 text-sm font-medium text-white">
              <MapPin className="size-4 text-primary" /> Casablanca, Maroc
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <StaggerItem key={v.title}>
              <div
                className={cn(
                  "card-elevated group relative h-full overflow-hidden border border-border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40",
                  i % 2 === 1 && "sm:translate-y-8",
                )}
              >
                <span className="pointer-events-none absolute -top-4 -right-2 text-8xl font-bold text-foreground/[0.04] select-none">
                  0{i + 1}
                </span>
                <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
                  <v.icon strokeWidth={1.75} className="size-6" />
                </span>
                <h3 className="mt-6 text-lg">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <SectionTitle eyebrow="Étapes clés" title="Les dates qui ont marqué Districap" />

        {/* Desktop: horizontal timeline */}
        <div className="relative mt-16 hidden lg:block">
          <span className="absolute top-[22px] right-0 left-0 h-px bg-border" aria-hidden />
          <Stagger className="grid grid-cols-5 gap-6">
            {MILESTONES.map((m, i) => (
              <StaggerItem key={m.year}>
                <div className="group relative">
                  <span
                    className={cn(
                      "relative z-10 grid size-11 place-items-center rounded-full border-2 transition-all duration-300 group-hover:scale-110",
                      i === MILESTONES.length - 1
                        ? "border-primary bg-primary"
                        : "border-primary bg-surface group-hover:bg-primary",
                    )}
                  >
                    <span
                      className={cn(
                        "size-2 rounded-full transition-colors duration-300",
                        i === MILESTONES.length - 1 ? "bg-primary-foreground" : "bg-primary group-hover:bg-primary-foreground",
                      )}
                    />
                  </span>
                  <p className="mt-6 text-3xl font-bold tracking-tight text-primary">{m.year}</p>
                  <h3 className="mt-2 text-base">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="mt-12 space-y-8 border-l-2 border-border pl-6 lg:hidden">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.06} className="relative">
              <span className="absolute top-2 -left-[1.95rem] size-3 rounded-full bg-primary ring-4 ring-surface" />
              <p className="text-2xl font-bold text-primary">{m.year}</p>
              <h3 className="mt-1 text-lg">{m.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function References() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionTitle
          eyebrow="Références"
          title="Ils nous ont fait confiance"
          description="Des sites recevant du public, où la sécurité des personnes ne laisse aucune place à l'approximation."
        />

        <ul className="mt-12 border-t border-border">
          {REFERENCES.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <li className="group grid gap-4 border-b border-border py-8 md:grid-cols-[72px_1fr_1.5fr] md:items-center">
                <span className="text-sm font-bold text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-2xl transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                    {r.name}
                  </h3>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" /> {r.city} · Centre commercial
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {r.solutions.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs transition-colors duration-300 group-hover:border-primary/40"
                    >
                      <Check className="size-3 text-primary" /> {s}
                    </span>
                  ))}
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16">
          <p className="text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Secteurs accompagnés
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {SECTORS.map((s) => (
              <span
                key={s.label}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <s.icon strokeWidth={1.75} className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                {s.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

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
      <Story />
      <Exclusives />
      <MissionMethod />
      <Values />
      <Timeline />
      <References />
      <CtaBanner />
    </>
  );
}