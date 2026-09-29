import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  Calculator,
  Check,
  ChevronDown,
  ClipboardList,
  Clock,
  FileSearch,
  FileUp,
  Layers,
  Loader2,
  Paperclip,
  Phone,
  Ruler,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal, Stagger, StaggerItem, EASE } from "@/components/motion/Reveal";
import { solutions } from "@/data/solutions";
import { sectors } from "@/data/projects";
import { site } from "@/config/site";
import heroConference from "@/assets/hero-conference.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/devis")({
  component: QuotePage,
  head: () => ({
    meta: [
      { title: "Demander un devis — Districap" },
      {
        name: "description",
        content:
          "Décrivez votre projet de sécurité électronique, d'audiovisuel ou de précâblage : nos équipes vous répondent avec une recommandation technique et un chiffrage.",
      },
      { property: "og:title", content: "Demander un devis — Districap" },
      {
        property: "og:description",
        content: "Formulaire de demande de devis pour vos projets de courant faible.",
      },
      { property: "og:url", content: "/devis" },
    ],
    links: [{ rel: "canonical", href: "/devis" }],
  }),
});

type FormState = {
  nom: string;
  societe: string;
  fonction: string;
  email: string;
  telephone: string;
  ville: string;
  typeProjet: string;
  secteur: string;
  echeance: string;
  budget: string;
  description: string;
  consent: boolean;
};

const empty: FormState = {
  nom: "",
  societe: "",
  fonction: "",
  email: "",
  telephone: "",
  ville: "",
  typeProjet: "",
  secteur: "",
  echeance: "",
  budget: "",
  description: "",
  consent: false,
};

const steps = [
  { title: "Vos coordonnées", short: "Coordonnées", icon: UserRound },
  { title: "Votre projet", short: "Projet", icon: Layers },
  { title: "Détails et fichiers", short: "Détails", icon: ClipboardList },
];

const afterSteps = [
  {
    icon: FileSearch,
    title: "Analyse de votre demande",
    text: "Un conseiller étudie votre projet, son contexte et ses contraintes techniques.",
  },
  {
    icon: Ruler,
    title: "Recommandation technique",
    text: "Nous identifions les gammes et les marques les mieux adaptées à votre besoin.",
  },
  {
    icon: Calculator,
    title: "Chiffrage et échange",
    text: "Vous recevez une proposition chiffrée, puis nous en discutons ensemble.",
  },
];

const prepare = [
  "Plans ou implantation du site",
  "Nombre de zones, de points ou de postes",
  "Contraintes particulières (normes, existant, accès)",
  "Échéance souhaitée pour la livraison",
];

const faqs = [
  {
    q: "Quelles informations dois-je fournir ?",
    a: "Le type de projet, le lieu, l'échéance et une description de votre besoin suffisent pour démarrer. Plus vous êtes précis, plus notre recommandation le sera.",
  },
  {
    q: "Puis-je joindre des plans ou un cahier des charges ?",
    a: "Oui. À la dernière étape, déposez vos plans ou votre cahier des charges. Nos équipes s'en servent pour établir le chiffrage.",
  },
  {
    q: "Le budget est-il obligatoire ?",
    a: "Non. Le budget indicatif est facultatif : il nous aide simplement à cadrer les solutions adaptées.",
  },
  {
    q: "Mon projet est urgent, que faire ?",
    a: `Envoyez votre demande, puis appelez-nous au ${site.phones[0]} pour que nous la traitions en priorité.`,
  },
];

const labelCls = "block text-sm font-medium text-foreground";

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  required = false,
  error,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <motion.div animate={error ? { x: [0, -6, 6, -4, 0] } : { x: 0 }} transition={{ duration: 0.3 }}>
      <label htmlFor={id} className={labelCls}>
        {label} {required ? <span className="text-primary">*</span> : null}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          className={cn(
            "w-full rounded-xl border bg-background px-4 py-3 pr-10 text-sm transition-shadow focus:outline-none",
            error
              ? "border-destructive"
              : "border-input focus:border-primary focus:shadow-[0_0_0_4px_oklch(0.538_0.201_32.5/0.14)]",
          )}
        />
        {value && !error ? (
          <Check
            strokeWidth={2.5}
            className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-primary"
            aria-hidden
          />
        ) : null}
      </div>
      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-1.5 overflow-hidden text-xs text-destructive"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function Select({
  label,
  id,
  value,
  onChange,
  options,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-input bg-background px-4 py-3 pr-10 text-sm focus:border-primary focus:outline-none focus:shadow-[0_0_0_4px_oklch(0.538_0.201_32.5/0.14)]"
        >
          <option value="">Sélectionner…</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          strokeWidth={1.75}
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
      </div>
    </div>
  );
}

function QuotePage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = (key: keyof FormState) => (v: string | boolean) =>
    setForm((f) => ({ ...f, [key]: v }) as FormState);

  const validateStep = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!form.nom.trim()) e.nom = "Merci d'indiquer votre nom.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
        e.email = "Adresse e-mail invalide.";
      if (form.telephone.replace(/\D/g, "").length < 9)
        e.telephone = "Numéro de téléphone invalide.";
    }
    if (step === 1) {
      if (!form.typeProjet) e.typeProjet = "Merci de choisir un type de projet.";
    }
    if (step === 2) {
      if (form.description.trim().length < 20)
        e.description = "Merci de décrire votre besoin en quelques lignes.";
      if (!form.consent) e.consent = "Votre consentement est nécessaire.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) {
      toast.error("Merci de corriger les champs signalés.");
      return;
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) {
      toast.error("Merci de corriger les champs signalés.");
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setStatus("done");
      toast.success("Votre demande de devis a bien été envoyée.");
    }, 1200);
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles((f) => [...f, ...Array.from(list).map((x) => x.name)]);
  };

  const phoneHref = `tel:${site.phones[0].replace(/\s/g, "")}`;
  const typeOptions = [...solutions.map((s) => s.title), "Autre"];

  const commitments = [
    { icon: Clock, value: "48 h", label: "délai de réponse en jours ouvrés" },
    { icon: Layers, value: String(solutions.length).padStart(2, "0"), label: "familles de solutions couvertes" },
    { icon: Paperclip, value: "Plans", label: "et cahier des charges acceptés" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Demande de devis"
        title="Décrivez votre projet, nous revenons vers vous"
        description="Nos équipes évaluent les enjeux techniques de votre projet et vous adressent une recommandation chiffrée. Réponse sous 48 heures ouvrées."
        image={heroConference}
        crumbs={[{ label: "Demander un devis" }]}
      />

      {/* Commitments overlapping the hero */}
      <section className="relative z-10 -mt-10 md:-mt-14">
        <div className="container-page">
          <dl className="grid grid-cols-3 divide-x divide-border overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-black/5">
            {commitments.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-start gap-2 px-4 py-5 sm:flex-row sm:items-center sm:gap-4 sm:px-8 sm:py-6"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon strokeWidth={1.75} className="size-5" aria-hidden />
                </span>
                <div>
                  <dd className="text-2xl font-semibold leading-none sm:text-3xl">{value}</dd>
                  <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</dt>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Form column */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="card-elevated overflow-hidden rounded-3xl border border-border"
                >
                  <div className="bg-primary px-8 py-10 text-center text-primary-foreground">
                    <motion.span
                      className="mx-auto grid size-16 place-items-center rounded-full bg-white/20"
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                    >
                      <Check strokeWidth={2.5} className="size-8" aria-hidden />
                    </motion.span>
                    <h2 className="mt-5 text-2xl sm:text-3xl">Demande envoyée</h2>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/85">
                      Merci{form.nom ? `, ${form.nom.split(" ")[0]}` : ""}. Nos équipes étudient votre
                      demande et vous répondent sous 48 heures ouvrées.
                    </p>
                  </div>
                  <div className="p-6 sm:p-10">
                    <p className="text-sm font-semibold">Et maintenant ?</p>
                    <ol className="mt-5 space-y-5">
                      {afterSteps.map(({ icon: Icon, title, text }, i) => (
                        <li key={title} className="flex gap-4">
                          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                            <Icon strokeWidth={1.75} className="size-5" aria-hidden />
                          </span>
                          <div>
                            <p className="text-sm font-medium">
                              {i + 1}. {title}
                            </p>
                            <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-8 text-sm text-muted-foreground">
                      Pour toute urgence, appelez-nous au{" "}
                      <a href={phoneHref} className="font-semibold text-foreground">
                        {site.phones[0]}
                      </a>
                      .
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        to="/solutions"
                        className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                      >
                        Découvrir nos solutions
                      </Link>
                      <Link
                        to="/"
                        className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold"
                      >
                        Retour à l'accueil
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card-elevated overflow-hidden rounded-3xl border border-border"
                >
                  {/* Stepper */}
                  <div className="border-b border-border bg-surface px-6 py-6 sm:px-10">
                    <ol className="flex items-center">
                      {steps.map(({ short, icon: Icon }, i) => {
                        const done = i < step;
                        const current = i === step;
                        return (
                          <li key={short} className={cn("flex items-center", i < steps.length - 1 && "flex-1")}>
                            <button
                              type="button"
                              disabled={i > step}
                              onClick={() => setStep(i)}
                              aria-current={current ? "step" : undefined}
                              className="group flex items-center gap-3 disabled:cursor-default"
                            >
                              <span
                                className={cn(
                                  "grid size-10 shrink-0 place-items-center rounded-full border-2 transition-colors duration-300",
                                  done && "border-primary bg-primary text-primary-foreground",
                                  current && "border-primary bg-background text-primary",
                                  !done && !current && "border-border bg-background text-muted-foreground",
                                )}
                              >
                                {done ? (
                                  <Check strokeWidth={2.5} className="size-4" aria-hidden />
                                ) : (
                                  <Icon strokeWidth={1.75} className="size-4" aria-hidden />
                                )}
                              </span>
                              <span
                                className={cn(
                                  "hidden text-sm font-medium sm:block",
                                  current ? "text-foreground" : "text-muted-foreground",
                                )}
                              >
                                {short}
                              </span>
                            </button>
                            {i < steps.length - 1 ? (
                              <span className="mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-border sm:mx-5">
                                <motion.span
                                  className="block h-full bg-primary"
                                  animate={{ width: done ? "100%" : "0%" }}
                                  transition={{ duration: 0.4, ease: EASE }}
                                />
                              </span>
                            ) : null}
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  <div className="p-6 sm:p-10">
                    <h2 className="text-xl sm:text-2xl">{steps[step].title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Étape {step + 1} sur {steps.length} · les champs marqués d'un{" "}
                      <span className="text-primary">*</span> sont obligatoires.
                    </p>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="mt-8 space-y-6"
                      >
                        {step === 0 ? (
                          <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Nom et prénom" id="nom" required value={form.nom} onChange={set("nom")} error={errors.nom} />
                            <Field label="Société" id="societe" value={form.societe} onChange={set("societe")} />
                            <Field label="Fonction" id="fonction" value={form.fonction} onChange={set("fonction")} />
                            <Field label="Ville" id="ville" value={form.ville} onChange={set("ville")} />
                            <Field label="E-mail" id="email" type="email" required value={form.email} onChange={set("email")} error={errors.email} />
                            <Field label="Téléphone" id="telephone" type="tel" required value={form.telephone} onChange={set("telephone")} error={errors.telephone} />
                          </div>
                        ) : null}

                        {step === 1 ? (
                          <>
                            <fieldset>
                              <legend className={labelCls}>
                                Type de projet <span className="text-primary">*</span>
                              </legend>
                              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                                {typeOptions.map((o) => {
                                  const on = form.typeProjet === o;
                                  return (
                                    <button
                                      key={o}
                                      type="button"
                                      aria-pressed={on}
                                      onClick={() => set("typeProjet")(o)}
                                      className={cn(
                                        "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                                        on
                                          ? "border-primary bg-primary/5 text-primary shadow-[0_0_0_3px_oklch(0.538_0.201_32.5/0.12)]"
                                          : "border-input hover:border-primary/60",
                                      )}
                                    >
                                      {o}
                                      <span
                                        className={cn(
                                          "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                                          on ? "border-primary bg-primary text-primary-foreground" : "border-border",
                                        )}
                                      >
                                        {on ? <Check strokeWidth={3} className="size-3" aria-hidden /> : null}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                              {errors.typeProjet ? (
                                <p className="mt-2 text-xs text-destructive">{errors.typeProjet}</p>
                              ) : null}
                            </fieldset>

                            <div className="grid gap-5 sm:grid-cols-3">
                              <Select label="Secteur" id="secteur" value={form.secteur} onChange={set("secteur")} options={[...sectors, "Autre"]} />
                              <Select
                                label="Échéance"
                                id="echeance"
                                value={form.echeance}
                                onChange={set("echeance")}
                                options={["Immédiate", "Sous 1 mois", "1 à 3 mois", "Plus de 3 mois", "À l'étude"]}
                              />
                              <Select
                                label="Budget indicatif"
                                id="budget"
                                value={form.budget}
                                onChange={set("budget")}
                                options={[
                                  "Moins de 50 000 MAD",
                                  "50 000 – 200 000 MAD",
                                  "200 000 – 500 000 MAD",
                                  "Plus de 500 000 MAD",
                                  "À définir",
                                ]}
                              />
                            </div>
                          </>
                        ) : null}

                        {step === 2 ? (
                          <>
                            <div className="flex flex-wrap gap-2">
                              {[form.typeProjet, form.secteur, form.echeance, form.budget]
                                .filter(Boolean)
                                .map((v) => (
                                  <span key={v} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                    {v}
                                  </span>
                                ))}
                            </div>

                            <div>
                              <label htmlFor="description" className={labelCls}>
                                Description du besoin <span className="text-primary">*</span>
                              </label>
                              <textarea
                                id="description"
                                rows={6}
                                value={form.description}
                                onChange={(e) => set("description")(e.target.value)}
                                aria-invalid={Boolean(errors.description)}
                                className={cn(
                                  "mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none",
                                  errors.description
                                    ? "border-destructive"
                                    : "border-input focus:border-primary focus:shadow-[0_0_0_4px_oklch(0.538_0.201_32.5/0.14)]",
                                )}
                                placeholder="Nature du site, surface, nombre de zones ou de points, contraintes particulières…"
                              />
                              <div className="mt-1.5 flex justify-between text-xs">
                                <span className="text-destructive">{errors.description}</span>
                                <span className="text-muted-foreground">{form.description.length} caractères</span>
                              </div>
                            </div>

                            <div
                              onDragOver={(e) => {
                                e.preventDefault();
                                setDragging(true);
                              }}
                              onDragLeave={() => setDragging(false)}
                              onDrop={(e) => {
                                e.preventDefault();
                                setDragging(false);
                                addFiles(e.dataTransfer.files);
                              }}
                              className={cn(
                                "rounded-2xl border-2 border-dashed p-6 text-center transition-colors",
                                dragging ? "border-primary bg-primary/5" : "border-border bg-surface/50",
                              )}
                            >
                              <span className="mx-auto grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                                <FileUp strokeWidth={1.75} className="size-6" aria-hidden />
                              </span>
                              <p className="mt-3 text-sm text-muted-foreground">
                                Déposez vos plans ou votre CDC ici, ou{" "}
                                <label className="cursor-pointer font-semibold text-primary underline-offset-4 hover:underline">
                                  parcourez vos fichiers
                                  <input type="file" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
                                </label>
                              </p>
                              <AnimatePresence>
                                {files.length > 0 ? (
                                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                                    {files.map((f, i) => (
                                      <motion.span
                                        key={`${f}-${i}`}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs"
                                      >
                                        <Paperclip className="size-3 text-primary" aria-hidden />
                                        {f}
                                        <button
                                          type="button"
                                          aria-label={`Retirer ${f}`}
                                          onClick={() => setFiles((list) => list.filter((_, idx) => idx !== i))}
                                        >
                                          <X strokeWidth={2} className="size-3" />
                                        </button>
                                      </motion.span>
                                    ))}
                                  </div>
                                ) : null}
                              </AnimatePresence>
                            </div>

                            <div>
                              <label className="flex items-start gap-3 text-sm">
                                <input
                                  type="checkbox"
                                  checked={form.consent}
                                  onChange={(e) => set("consent")(e.target.checked)}
                                  className="mt-1 size-4 accent-[var(--color-primary)]"
                                />
                                <span className="text-muted-foreground">
                                  J'accepte que Districap utilise ces informations pour traiter ma demande de devis.
                                </span>
                              </label>
                              {errors.consent ? (
                                <p className="mt-1.5 text-xs text-destructive">{errors.consent}</p>
                              ) : null}
                            </div>
                          </>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-6">
                      <button
                        type="button"
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        disabled={step === 0}
                        className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary disabled:pointer-events-none disabled:opacity-40"
                      >
                        Précédent
                      </button>
                      {step < 2 ? (
                        <button
                          type="button"
                          onClick={next}
                          className="sheen rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.97]"
                        >
                          Continuer
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="sheen inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.97] disabled:opacity-70"
                        >
                          {status === "sending" ? (
                            <>
                              <Loader2 strokeWidth={2} className="size-4 animate-spin" aria-hidden />
                              Envoi…
                            </>
                          ) : (
                            "Envoyer ma demande"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:col-span-4 lg:sticky lg:top-28 lg:h-max">
            <Reveal>
              <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                <span className="grid size-11 place-items-center rounded-xl bg-white/15">
                  <Phone strokeWidth={1.75} className="size-5" aria-hidden />
                </span>
                <p className="mt-5 text-lg font-semibold">Un projet urgent ?</p>
                <p className="mt-1 text-sm text-primary-foreground/80">
                  Parlez directement à un conseiller.
                </p>
                <a
                  href={phoneHref}
                  className="mt-4 inline-block text-2xl font-semibold tracking-tight underline-offset-4 hover:underline"
                >
                  {site.phones[0]}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="font-semibold">Pour un devis plus précis</p>
                <p className="mt-1 text-sm text-muted-foreground">Ayez sous la main :</p>
                <ul className="mt-4 space-y-3">
                  {prepare.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10">
                        <Check strokeWidth={2.5} className="size-3 text-primary" aria-hidden />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* What happens next */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionTitle
            eyebrow="Après votre demande"
            title="Comment nous traitons votre projet"
            description="Trois étapes, de la réception de votre demande à la proposition chiffrée."
          />
          <Stagger className="relative mt-12 grid gap-5 md:grid-cols-3">
            {afterSteps.map(({ icon: Icon, title, text }, i) => (
              <StaggerItem key={title}>
                <div className="relative h-full rounded-2xl border border-border bg-background p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                      <Icon strokeWidth={1.75} className="size-6" aria-hidden />
                    </span>
                    <span className="text-4xl font-semibold tabular-nums text-border">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionTitle
              eyebrow="Questions fréquentes"
              title="Avant d'envoyer votre demande"
              description="Les réponses aux questions les plus courantes."
            />
          </div>
          <div className="space-y-3 lg:col-span-8">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-border bg-background transition-colors open:border-primary/40 open:bg-primary/[0.03]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown
                    strokeWidth={1.75}
                    className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180 group-open:text-primary"
                    aria-hidden
                  />
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}