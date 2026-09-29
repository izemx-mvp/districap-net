import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Check, FileUp, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/PageHero";
import { EASE } from "@/components/motion/Reveal";
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

const steps = ["Vos coordonnées", "Votre projet", "Détails"];

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
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
            "w-full rounded-md border bg-background px-3.5 py-2.5 pr-10 text-sm transition-shadow focus:outline-none",
            error
              ? "border-destructive"
              : "border-input focus:border-primary focus:shadow-[0_0_0_4px_oklch(0.538_0.201_32.5/0.14)]",
          )}
        />
        {value && !error ? (
          <Check
            strokeWidth={2.5}
            className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-primary"
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
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required ? <span className="text-primary">*</span> : null}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
      >
        <option value="">Sélectionner…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
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

  return (
    <>
      <PageHero
        eyebrow="Demande de devis"
        title="Décrivez votre projet, nous revenons vers vous"
        description="Nos équipes évaluent les enjeux techniques de votre projet et vous adressent une recommandation chiffrée. Réponse sous 48 heures ouvrées."
        image={heroConference}
        crumbs={[{ label: "Demander un devis" }]}
      />

      <section className="section-y">
        <div className="container-page max-w-3xl">
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="card-elevated border border-border p-10 text-center"
              >
                <motion.span
                  className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10"
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                >
                  <Check strokeWidth={2.5} className="size-8 text-primary" />
                </motion.span>
                <h2 className="mt-6 text-2xl">Demande envoyée</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Merci pour votre demande. Nos équipes l'étudient et vous répondent sous
                  48 heures ouvrées. Pour toute urgence, appelez-nous au{" "}
                  <span className="font-semibold text-foreground">{site.phones[0]}</span>.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
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
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-elevated border border-border p-6 sm:p-10"
              >
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className="text-primary">{steps[step]}</span>
                    <span>
                      Étape {step + 1} / {steps.length}
                    </span>
                  </div>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-surface">
                    <motion.div
                      className="h-full bg-primary"
                      animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="mt-8 space-y-5"
                  >
                    {step === 0 ? (
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Nom et prénom" id="nom" required value={form.nom} onChange={set("nom")} error={errors.nom} />
                        <Field label="Société" id="societe" value={form.societe} onChange={set("societe")} />
                        <Field label="Fonction" id="fonction" value={form.fonction} onChange={set("fonction")} />
                        <Field label="E-mail" id="email" type="email" required value={form.email} onChange={set("email")} error={errors.email} />
                        <Field label="Téléphone" id="telephone" required value={form.telephone} onChange={set("telephone")} error={errors.telephone} />
                        <Field label="Ville" id="ville" value={form.ville} onChange={set("ville")} />
                      </div>
                    ) : null}

                    {step === 1 ? (
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Select
                          label="Type de projet"
                          id="typeProjet"
                          required
                          value={form.typeProjet}
                          onChange={set("typeProjet")}
                          options={[...solutions.map((s) => s.title), "Autre"]}
                        />
                        <Select
                          label="Secteur"
                          id="secteur"
                          value={form.secteur}
                          onChange={set("secteur")}
                          options={[...sectors, "Autre"]}
                        />
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
                        {errors.typeProjet ? (
                          <p className="text-xs text-destructive sm:col-span-2">
                            {errors.typeProjet}
                          </p>
                        ) : null}
                      </div>
                    ) : null}

                    {step === 2 ? (
                      <div className="space-y-5">
                        <div>
                          <label
                            htmlFor="description"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            Description du besoin <span className="text-primary">*</span>
                          </label>
                          <textarea
                            id="description"
                            rows={6}
                            value={form.description}
                            onChange={(e) => set("description")(e.target.value)}
                            className={cn(
                              "mt-2 w-full rounded-md border bg-background px-3.5 py-2.5 text-sm focus:outline-none",
                              errors.description
                                ? "border-destructive"
                                : "border-input focus:border-primary",
                            )}
                            placeholder="Nature du site, surface, nombre de zones ou de points, contraintes particulières…"
                          />
                          {errors.description ? (
                            <p className="mt-1.5 text-xs text-destructive">{errors.description}</p>
                          ) : null}
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
                            "rounded-lg border-2 border-dashed p-6 text-center transition-colors",
                            dragging ? "border-primary bg-primary/5" : "border-border",
                          )}
                        >
                          <FileUp strokeWidth={1.75} className="mx-auto size-6 text-primary" />
                          <p className="mt-3 text-sm text-muted-foreground">
                            Déposez vos plans ou votre CDC ici, ou{" "}
                            <label className="cursor-pointer font-semibold text-primary">
                              parcourez vos fichiers
                              <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => addFiles(e.target.files)}
                              />
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
                                    className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs"
                                  >
                                    {f}
                                    <button
                                      type="button"
                                      aria-label={`Retirer ${f}`}
                                      onClick={() =>
                                        setFiles((list) => list.filter((_, idx) => idx !== i))
                                      }
                                    >
                                      <X strokeWidth={2} className="size-3" />
                                    </button>
                                  </motion.span>
                                ))}
                              </div>
                            ) : null}
                          </AnimatePresence>
                        </div>

                        <label className="flex items-start gap-3 text-sm">
                          <input
                            type="checkbox"
                            checked={form.consent}
                            onChange={(e) => set("consent")(e.target.checked)}
                            className="mt-1 size-4 accent-[var(--color-primary)]"
                          />
                          <span className="text-muted-foreground">
                            J'accepte que Districap utilise ces informations pour traiter ma
                            demande de devis.
                          </span>
                        </label>
                        {errors.consent ? (
                          <p className="text-xs text-destructive">{errors.consent}</p>
                        ) : null}
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-9 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-40"
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
                          <Loader2 strokeWidth={2} className="size-4 animate-spin" />
                          Envoi…
                        </>
                      ) : (
                        "Envoyer ma demande"
                      )}
                    </button>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
