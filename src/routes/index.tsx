import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Clock,
  ExternalLink,
  Handshake,
  ShoppingBag,
  Truck,
  Wallet,
} from "lucide-react";
import heroControl from "@/assets/hero-control-room.jpg";
import heroConference from "@/assets/hero-conference.jpg";
import heroMall from "@/assets/hero-mall.jpg";
import { site } from "@/config/site";
import { solutions } from "@/data/solutions";
import { exclusiveBrands } from "@/data/brands";
import { projects } from "@/data/projects";
import { SectionTitle } from "@/components/SectionTitle";
import { CountUp } from "@/components/CountUp";
import { Reveal, Stagger, StaggerItem, EASE } from "@/components/motion/Reveal";
import { SolutionCard, ProjectCard } from "@/components/cards";
import { BrandMarquee } from "@/components/BrandMarquee";
import { CtaBanner } from "@/components/CtaBanner";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      {
        title:
          "Districap — Distributeur de sécurité électronique et courant faible au Maroc",
      },
      {
        name: "description",
        content:
          "Depuis 2009, Districap importe et distribue à Casablanca les solutions de courant faible : sécurité incendie, vidéosurveillance, intrusion, sonorisation, audiovisuel et précâblage.",
      },
      {
        property: "og:title",
        content: "Districap — Sécurité électronique & courant faible au Maroc",
      },
      {
        property: "og:description",
        content:
          "Distributeur exclusif LUMENS, ATEN, SATEL, FINSECUR et PREMIUM LINE au Maroc. Plus de dix partenariats avec les grandes marques internationales.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const slides = [
  {
    image: heroControl,
    title: "Distributeur de référence de la sécurité électronique au Maroc",
    alt: "Salle de supervision de sécurité",
  },
  {
    image: heroConference,
    title: "L'audiovisuel professionnel, de l'étude à la mise en service",
    alt: "Salle de conférence équipée",
  },
  {
    image: heroMall,
    title: "Des solutions éprouvées sur les sites recevant du public",
    alt: "Centre commercial équipé en vidéosurveillance",
  },
];

const whyPoints = [
  {
    icon: Clock,
    title: "Une expertise depuis 2009",
    text: "Seize années de distribution de courant faible au service des professionnels, des entreprises et des grands comptes marocains.",
  },
  {
    icon: BadgeCheck,
    title: "Des exclusivités de marques",
    text: "Distributeur exclusif au Maroc de LUMENS, ATEN, SATEL, FINSECUR et PREMIUM LINE, avec plus de dix partenariats internationaux.",
  },
  {
    icon: Truck,
    title: "La maîtrise des délais",
    text: "Un stock disponible à Casablanca et une organisation logistique qui garantit la maîtrise des délais de mise en œuvre.",
  },
  {
    icon: Handshake,
    title: "Un accompagnement de A à Z",
    text: "Nos équipes évaluent les enjeux de chaque projet et recommandent les solutions techniques les plus pertinentes.",
  },
];

const method = [
  { title: "Étude", text: "Analyse du besoin, des contraintes du site et des exigences normatives." },
  { title: "Recommandation", text: "Choix techniques argumentés et chiffrage des solutions adaptées." },
  { title: "Approvisionnement", text: "Commande et disponibilité du matériel, coordonnées avec votre planning." },
  { title: "Livraison", text: "Livraison partout au Maroc, dans le respect des délais annoncés." },
  { title: "Accompagnement", text: "Support technique, formation et suivi tout au long du projet." },
];

function Home() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 7000);
    return () => clearTimeout(t);
  }, [index, paused]);

  const slide = slides[index]!;
  const words = slide.title.split(" ");

  return (
    <>
      {/* HERO */}
      <section
        className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              width={1920}
              height={1080}
              className="ken-burns h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-ink-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink-foreground) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="container-page relative py-28">
          <span className="eyebrow">Courant faible · Sécurité électronique</span>
          <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] text-ink-foreground sm:text-5xl lg:text-[4rem]">
            {words.map((word, i) => (
              <motion.span
                key={`${index}-${word}-${i}`}
                className="mr-[0.28em] inline-block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            key={`sub-${index}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: words.length * 0.06 + 0.12 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-foreground/80 sm:text-lg"
          >
            Depuis 2009, Districap importe et distribue les solutions de courant faible des
            plus grandes marques internationales, pour les professionnels, les entreprises
            et les grands comptes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: words.length * 0.06 + 0.24 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              to="/solutions"
              className="sheen glow-pulse group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.97]"
            >
              Découvrir nos solutions
              <ArrowRight
                strokeWidth={1.75}
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 rounded-md border border-ink-foreground/35 px-6 py-3.5 text-sm font-semibold text-ink-foreground transition-colors duration-200 hover:border-ink-foreground"
            >
              Demander un devis
            </Link>
          </motion.div>

          {/* Indicators */}
          <div className="mt-14 flex items-center gap-5">
            {slides.map((s, i) => (
              <button
                key={s.alt}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Afficher la diapositive ${i + 1}`}
                className="group flex items-center gap-3"
              >
                <span
                  className={
                    i === index
                      ? "text-sm font-semibold text-ink-foreground"
                      : "text-sm font-semibold text-ink-foreground/40"
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative block h-[2px] w-12 bg-ink-foreground/25">
                  {i === index ? (
                    <motion.span
                      key={`bar-${index}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: paused ? "40%" : "100%" }}
                      transition={{ duration: paused ? 0.3 : 7, ease: "linear" }}
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 text-ink-foreground/60"
        >
          <ChevronDown strokeWidth={1.75} className="size-6" />
        </motion.div>
      </section>

      {/* CHIFFRES */}
      <section className="border-b border-border bg-surface">
        <div className="container-page grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
          {site.figures.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.07} className="text-center lg:text-left">
              <p className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                <CountUp value={f.value} prefix={f.prefix} suffix={f.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{f.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section-y">
        <div className="container-page">
          <SectionTitle
            eyebrow="Nos solutions"
            title="Huit familles de solutions pour vos projets"
            description="De la détection incendie au précâblage informatique, Districap couvre l'ensemble de la chaîne du courant faible avec les gammes des grandes marques internationales."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution) => (
              <StaggerItem key={solution.slug}>
                <SolutionCard solution={solution} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* EXCLUSIVITÉS */}
      <section className="section-y bg-ink">
        <div className="container-page">
          <SectionTitle
            tone="dark"
            eyebrow="Distributeur exclusif au Maroc"
            title="Cinq marques distribuées en exclusivité"
            description="Districap est le distributeur exclusif de ces marques au Maroc, avec le stock, le support technique et la documentation associés."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {exclusiveBrands.map((brand) => (
              <StaggerItem key={brand.name}>
                <div className="h-full rounded-xl border border-ink-foreground/15 p-6 transition-colors duration-300 hover:border-primary">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                    <h3 className="truncate text-lg text-ink-foreground">{brand.name}</h3>
                    <BadgeCheck strokeWidth={1.75} className="size-5 shrink-0 text-primary" />
                  </div>
                  {brand.note ? (
                    <span className="mt-2 inline-block rounded-full bg-primary px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-primary-foreground">
                      {brand.note}
                    </span>
                  ) : null}
                  <p className="mt-3 text-sm leading-relaxed text-ink-foreground/70">
                    {brand.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* MARQUES */}
      <section className="section-y">
        <div className="container-page">
          <SectionTitle
            align="center"
            eyebrow="Nos partenaires"
            title="Plus de dix partenariats internationaux"
          />
        </div>
        <div className="mt-12">
          <BrandMarquee />
        </div>
        <div className="container-page mt-10 text-center">
          <Link
            to="/marques"
            className="link-underline text-sm font-semibold text-primary"
          >
            Voir toutes les marques
          </Link>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionTitle
            eyebrow="Pourquoi Districap"
            title="Une référence nationale en qualité, en offre et en service"
            description="Notre stratégie : rester constamment à jour des évolutions technologiques de la sécurité électronique, et tenir nos engagements de délais."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyPoints.map((p) => (
              <StaggerItem key={p.title}>
                <div className="card-elevated group h-full border border-border p-6 transition-transform duration-300 hover:-translate-y-1">
                  <p.icon
                    strokeWidth={1.75}
                    className="size-7 text-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-primary"
                  />
                  <h3 className="mt-5 text-lg">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {p.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* MÉTHODE */}
      <section className="section-y">
        <div className="container-page">
          <SectionTitle
            eyebrow="Notre méthode"
            title="Cinq étapes, du besoin à l'accompagnement"
            description="Chaque projet est préparé en amont : nos équipes évaluent les enjeux, orientent les choix techniques et gèrent les phases de déploiement."
          />
          <div className="relative mt-14">
            <motion.span
              className="absolute left-4 top-0 hidden h-full w-[2px] origin-top bg-primary lg:left-0 lg:top-6 lg:h-[2px] lg:w-full lg:origin-left lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: EASE }}
            />
            <Stagger className="grid gap-8 lg:grid-cols-5" step={0.12}>
              {method.map((step, i) => (
                <StaggerItem key={step.title}>
                  <div className="relative">
                    <motion.span
                      className="grid size-12 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, ease: EASE, delay: i * 0.1 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                    <h3 className="mt-5 text-lg">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* RÉFÉRENCES */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
            <SectionTitle
              eyebrow="Références"
              title="Des projets livrés sur des sites exigeants"
            />
            <Link
              to="/references"
              className="link-underline hidden shrink-0 pb-2 text-sm font-semibold text-primary sm:block"
            >
              Toutes les références
            </Link>
          </div>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* BOUTIQUE */}
      <section className="section-y">
        <div className="container-page">
          <Reveal className="card-elevated grid gap-8 border border-border p-8 lg:grid-cols-[1.2fr_1fr] lg:p-12">
            <div>
              <span className="eyebrow">Boutique en ligne</span>
              <h2 className="mt-3 text-2xl leading-tight sm:text-3xl">
                Besoin d'équipements en livraison rapide ? Découvrez notre boutique en
                ligne
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Commandez directement les références disponibles en stock. Livraison
                partout au Maroc et paiement à la livraison.
              </p>
              <a
                href={site.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sheen mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.97]"
              >
                <ShoppingBag strokeWidth={1.75} className="size-4" />
                Accéder à la boutique
                <ExternalLink strokeWidth={1.75} className="size-4" />
              </a>
            </div>
            <ul className="space-y-4 self-center">
              {[
                { icon: Truck, text: "Livraison partout au Maroc" },
                { icon: Wallet, text: "Paiement à la livraison" },
                { icon: Check, text: "Références disponibles en stock" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 rounded-lg bg-surface p-4">
                  <item.icon strokeWidth={1.75} className="size-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
