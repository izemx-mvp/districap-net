import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Check,
  Clock,
  ExternalLink,
  FileText,
  Headset,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/PageHero";
import { Reveal, EASE } from "@/components/motion/Reveal";
import { site, telHref, whatsappHref } from "@/config/site";
import heroControl from "@/assets/hero-control-room.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Districap, Ain Harrouda Casablanca" },
      {
        name: "description",
        content:
          "Contactez Districap à Casablanca : 05 22 34 36 30, 06 68 49 93 59, contact@districap.ma. Quartier industriel Polygone Est, lot 114, Route côtière, Ain Harrouda.",
      },
      { property: "og:title", content: "Contact — Districap" },
      {
        property: "og:description",
        content: "Téléphone, WhatsApp, e-mail, adresse et horaires de Districap à Casablanca.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const MAP_QUERY = encodeURIComponent(
  "Quartier industriel Polygone Est lot 114 Route côtière Ain Harrouda Casablanca Maroc",
);
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

function whatsappWithText(text: string) {
  return `${whatsappHref}${whatsappHref.includes("?") ? "&" : "?"}text=${encodeURIComponent(text)}`;
}

// Opening hours (Africa/Casablanca). Keep in sync with site.hours.
// day: 0 = Sunday … 6 = Saturday; ranges in minutes from midnight.
const SCHEDULE: Record<number, [number, number][]> = {
  1: [[510, 750], [870, 1110]],
  2: [[510, 750], [870, 1110]],
  3: [[510, 750], [870, 1110]],
  4: [[510, 750], [870, 1110]],
  5: [[510, 750], [870, 1110]],
  6: [[510, 750]],
};

function useOpenStatus() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const compute = () => {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Casablanca",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const day = days.indexOf(get("weekday"));
      const minutes = Number(get("hour")) * 60 + Number(get("minute"));
      const ranges = SCHEDULE[day] ?? [];
      setOpen(ranges.some(([start, end]) => minutes >= start && minutes < end));
    };
    compute();
    const id = window.setInterval(compute, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return open;
}

const SUBJECTS = [
  "Demande d'information",
  "Disponibilité produit",
  "Support technique",
  "Partenariat",
  "Autre",
];

const GRID_BG = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function QuickChannels() {
  const phone = site.phones[0];
  const channels = [
    {
      icon: Phone,
      label: "Appelez-nous",
      value: phone,
      href: phone ? telHref(phone) : undefined,
      external: false,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Réponse pendant nos horaires",
      href: whatsappWithText("Bonjour Districap, j'ai une question."),
      external: true,
    },
    {
      icon: Mail,
      label: "E-mail",
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
    },
    {
      icon: Navigation,
      label: "Nous rendre visite",
      value: "Ain Harrouda, Casablanca",
      href: MAP_DIRECTIONS,
      external: true,
    },
  ];

  return (
    <section className="relative z-10 -mt-10">
      <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.06}>
            <a
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <c.icon strokeWidth={1.75} className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {c.label}
                </span>
                <span className="mt-0.5 block truncate text-sm font-semibold">{c.value}</span>
              </span>
              <ArrowRight className="ml-auto size-4 shrink-0 -translate-x-2 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function InfoPanel() {
  const open = useOpenStatus();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink p-7 text-ink-foreground sm:p-8">
      <div className="absolute inset-0 opacity-70" style={GRID_BG} aria-hidden />
      <div className="absolute -top-20 -right-20 size-56 rounded-full bg-primary/25 blur-3xl" aria-hidden />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl text-ink-foreground">Nos coordonnées</h2>
          {open !== null && (
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
                open ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-ink-foreground/70",
              )}
            >
              <span className="relative flex size-2">
                {open && (
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={cn(
                    "relative inline-flex size-2 rounded-full",
                    open ? "bg-emerald-400" : "bg-ink-foreground/40",
                  )}
                />
              </span>
              {open ? "Ouvert maintenant" : "Fermé actuellement"}
            </span>
          )}
        </div>

        <ul className="mt-8 space-y-6 text-sm">
          <li className="flex gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-primary">
              <MapPin strokeWidth={1.75} className="size-5" />
            </span>
            <span className="leading-relaxed text-ink-foreground/85">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.country}
            </span>
          </li>
          <li className="flex gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-primary">
              <Phone strokeWidth={1.75} className="size-5" />
            </span>
            <span className="flex flex-col gap-1">
              {site.phones.map((p) => (
                <a key={p} href={telHref(p)} className="font-semibold transition-colors hover:text-primary">
                  {p}
                </a>
              ))}
            </span>
          </li>
          <li className="flex gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-primary">
              <Mail strokeWidth={1.75} className="size-5" />
            </span>
            <a href={`mailto:${site.email}`} className="self-center font-semibold transition-colors hover:text-primary">
              {site.email}
            </a>
          </li>
          <li className="flex gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-primary">
              <Clock strokeWidth={1.75} className="size-5" />
            </span>
            <span className="w-full space-y-1.5">
              {site.hours.map((h) => (
                <span
                  key={h.days}
                  className="flex justify-between gap-4 border-b border-white/10 pb-1.5 last:border-0"
                >
                  <span className="text-ink-foreground/70">{h.days}</span>
                  <span className="text-right font-medium">{h.time}</span>
                </span>
              ))}
              <span className="flex justify-between gap-4 pt-0.5">
                <span className="text-ink-foreground/70">Dimanche</span>
                <span className="font-medium text-ink-foreground/50">Fermé</span>
              </span>
            </span>
          </li>
        </ul>

        <a
          href={whatsappWithText("Bonjour Districap, j'ai une question.")}
          target="_blank"
          rel="noopener noreferrer"
          className="sheen mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 active:scale-[0.97]"
        >
          <MessageCircle strokeWidth={2} className="size-4" />
          Écrire sur WhatsApp
        </a>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ nom: "", societe: "", email: "", telephone: "", message: "" });
  const [subject, setSubject] = useState(SUBJECTS[0]!);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = (id: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [id]: value }));
    if (errors[id]) setErrors((e) => ({ ...e, [id]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.nom.trim()) err.nom = "Merci d'indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) err.email = "Adresse e-mail invalide.";
    if (form.telephone && !/^(?:\+212|00212|0)[5-7]\d{8}$/.test(form.telephone.replace(/[\s.-]/g, "")))
      err.telephone = "Numéro marocain invalide.";
    if (form.message.trim().length < 10) err.message = "Merci de détailler votre message.";
    if (!consent) err.consent = "Merci d'accepter d'être recontacté.";
    setErrors(err);
    if (Object.keys(err).some((k) => err[k])) {
      toast.error("Merci de corriger les champs signalés.");
      return;
    }
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("done");
      toast.success("Votre message a bien été envoyé.");
    }, 1100);
  };

  const reset = () => {
    setForm({ nom: "", societe: "", email: "", telephone: "", message: "" });
    setSubject(SUBJECTS[0]!);
    setConsent(false);
    setStatus("idle");
  };

  const whatsappSummary = [
    "Bonjour Districap,",
    `Objet : ${subject}`,
    `Nom : ${form.nom}${form.societe ? ` (${form.societe})` : ""}`,
    form.telephone ? `Téléphone : ${form.telephone}` : "",
    "",
    form.message,
  ]
    .filter(Boolean)
    .join("\n");

  const field = (id: keyof typeof form, label: string, type = "text", required = false) => {
    const filled = form[id].trim().length > 0;
    const valid = filled && !errors[id];
    return (
      <motion.div
        animate={errors[id] ? { x: [0, -6, 6, -4, 0] } : { x: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <input
          id={id}
          type={type}
          placeholder=" "
          value={form[id]}
          onChange={(e) => set(id)(e.target.value)}
          className={cn(
            "peer w-full rounded-lg border bg-background px-4 pt-6 pb-2 text-sm transition-all duration-200 focus:outline-none",
            errors[id]
              ? "border-destructive"
              : "border-input focus:border-primary focus:shadow-[0_0_0_4px_oklch(0.538_0.201_32.5/0.14)]",
          )}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-4 left-4 text-sm text-muted-foreground transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:tracking-wider peer-focus:text-primary peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:uppercase"
        >
          {label} {required ? <span className="text-primary">*</span> : null}
        </label>
        <AnimatePresence>
          {valid && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-1/2 right-3 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-primary/10 text-primary"
            >
              <Check strokeWidth={3} className="size-3" />
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {errors[id] ? (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-1.5 text-xs text-destructive"
            >
              {errors[id]}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="card-elevated border border-border p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="py-10 text-center"
          >
            <svg viewBox="0 0 64 64" className="mx-auto size-16" aria-hidden>
              <motion.circle
                cx="32"
                cy="32"
                r="29"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-primary/20"
              />
              <motion.path
                d="M20 33l8 8 16-18"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              />
            </svg>
            <h2 className="mt-6 text-2xl">Message envoyé</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
              Merci {form.nom.split(" ")[0]}, nous revenons vers vous pendant nos horaires
              d'ouverture.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappWithText(whatsappSummary)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
              >
                <MessageCircle strokeWidth={2} className="size-4" />
                Envoyer aussi sur WhatsApp
              </a>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                Nouveau message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} noValidate>
            <h2 className="text-2xl sm:text-3xl">Écrivez-nous</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Réponse pendant nos horaires d'ouverture. Pour une demande chiffrée, utilisez le{" "}
              <Link to="/devis" className="font-medium text-primary underline-offset-4 hover:underline">
                formulaire de devis
              </Link>
              .
            </p>

            <fieldset className="mt-7">
              <legend className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Objet de votre demande
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSubject(s)}
                    aria-pressed={subject === s}
                    className={cn(
                      "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                      subject === s
                        ? "border-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {subject === s && (
                      <motion.span
                        layoutId="subject-pill"
                        className="absolute inset-0 rounded-full bg-primary"
                        transition={{ duration: 0.3, ease: EASE }}
                      />
                    )}
                    <span className="relative">{s}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {field("nom", "Nom et prénom", "text", true)}
                {field("societe", "Société")}
                {field("email", "E-mail", "email", true)}
                {field("telephone", "Téléphone", "tel")}
              </div>

              <motion.div
                animate={errors.message ? { x: [0, -6, 6, -4, 0] } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-end justify-between">
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                  >
                    Message <span className="text-primary">*</span>
                  </label>
                  <span
                    className={cn(
                      "text-xs tabular-nums",
                      form.message.length > 900 ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {form.message.length} / 1000
                  </span>
                </div>
                <textarea
                  id="message"
                  rows={6}
                  maxLength={1000}
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                  placeholder="Décrivez votre besoin : type de site, équipements recherchés, délais…"
                  className={cn(
                    "mt-2 w-full resize-none rounded-lg border bg-background px-4 py-3 text-sm transition-all duration-200 focus:outline-none",
                    errors.message
                      ? "border-destructive"
                      : "border-input focus:border-primary focus:shadow-[0_0_0_4px_oklch(0.538_0.201_32.5/0.14)]",
                  )}
                />
                <AnimatePresence>
                  {errors.message ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1.5 text-xs text-destructive"
                    >
                      {errors.message}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </motion.div>

              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (errors.consent) setErrors((er) => ({ ...er, consent: "" }));
                  }}
                  className="mt-0.5 size-4 shrink-0 accent-[var(--color-primary)]"
                />
                <span className={cn("text-muted-foreground", errors.consent && "text-destructive")}>
                  J'accepte que Districap utilise ces informations pour me recontacter au sujet de ma
                  demande.
                </span>
              </label>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="sheen group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.97] disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 strokeWidth={2} className="size-4 animate-spin" />
                      Envoi…
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                <span className="text-xs text-muted-foreground">
                  Les champs marqués <span className="text-primary">*</span> sont obligatoires.
                </span>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function MapSection() {
  return (
    <section className="container-page">
      <Reveal className="relative overflow-hidden rounded-2xl border border-border">
        <iframe
          title="Localisation de Districap à Ain Harrouda, Casablanca"
          src={MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[420px] w-full grayscale transition-all duration-700 hover:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <div className="pointer-events-auto flex max-w-md flex-col gap-4 rounded-xl bg-background/95 p-5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.3)] backdrop-blur sm:flex-row sm:items-center">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <MapPin strokeWidth={1.75} className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Districap — Ain Harrouda</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{site.address.street}</p>
            </div>
            <a
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              <Navigation strokeWidth={2} className="size-3.5" />
              Itinéraire
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Orientation() {
  const cards = [
    {
      icon: FileText,
      title: "Un projet à chiffrer ?",
      text: "Décrivez votre besoin et joignez vos plans : nous préparons une proposition adaptée.",
      cta: "Demander un devis",
      to: "/devis" as const,
    },
    {
      icon: Headset,
      title: "Une question technique ?",
      text: "Compatibilité, choix de gamme, disponibilité : échangez directement avec notre équipe.",
      cta: "Écrire sur WhatsApp",
      href: whatsappWithText("Bonjour Districap, j'ai une question technique."),
    },
    {
      icon: ShoppingBag,
      title: "Un achat rapide ?",
      text: "Commandez en ligne, livraison partout au Maroc et paiement à la livraison.",
      cta: "Visiter la boutique",
      href: site.storeUrl,
    },
  ];

  return (
    <section className="section-y">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            <span className="h-px w-8 bg-primary" /> Le bon canal <span className="h-px w-8 bg-primary" />
          </p>
          <h2 className="mx-auto mt-3 max-w-xl text-3xl sm:text-4xl">Comment pouvons-nous vous aider ?</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => {
            const inner = (
              <>
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
                  <c.icon strokeWidth={1.75} className="size-6" />
                </span>
                <h3 className="mt-6 text-lg">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-primary">
                  {c.cta}
                  {c.href ? (
                    <ExternalLink className="size-3.5" />
                  ) : (
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  )}
                </span>
              </>
            );
            const className =
              "card-elevated group relative flex h-full flex-col overflow-hidden border border-border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40";

            return (
              <Reveal key={c.title} delay={i * 0.08}>
                {c.to ? (
                  <Link to={c.to} className={className}>
                    {inner}
                  </Link>
                ) : (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {inner}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        description="Nos équipes sont à Casablanca, disponibles pour étudier votre besoin, vous orienter vers les bonnes gammes et vous communiquer les disponibilités."
        image={heroControl}
        crumbs={[{ label: "Contact" }]}
      />

      <QuickChannels />

      <section className="section-y">
        <div className="container-page grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <InfoPanel />
          </Reveal>
        </div>
      </section>

      <MapSection />
      <Orientation />
    </>
  );
}