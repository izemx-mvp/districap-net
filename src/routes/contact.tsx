import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  Clock,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
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
        content: "Téléphone, e-mail, adresse et horaires de Districap à Casablanca.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", sujet: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.nom.trim()) err.nom = "Merci d'indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) err.email = "Adresse e-mail invalide.";
    if (form.message.trim().length < 10) err.message = "Merci de détailler votre message.";
    setErrors(err);
    if (Object.keys(err).length > 0) {
      toast.error("Merci de corriger les champs signalés.");
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setStatus("done");
      toast.success("Votre message a bien été envoyé.");
    }, 1100);
  };

  const field = (
    id: keyof typeof form,
    label: string,
    type = "text",
    required = false,
  ) => (
    <motion.div animate={errors[id] ? { x: [0, -6, 6, -4, 0] } : { x: 0 }} transition={{ duration: 0.3 }}>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required ? <span className="text-primary">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={form[id]}
        onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
        className={cn(
          "mt-2 w-full rounded-md border bg-background px-3.5 py-2.5 text-sm focus:outline-none",
          errors[id]
            ? "border-destructive"
            : "border-input focus:border-primary focus:shadow-[0_0_0_4px_oklch(0.538_0.201_32.5/0.14)]",
        )}
      />
      {errors[id] ? <p className="mt-1.5 text-xs text-destructive">{errors[id]}</p> : null}
    </motion.div>
  );

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        description="Nos équipes sont à Casablanca, disponibles pour étudier votre besoin, vous orienter vers les bonnes gammes et vous communiquer les disponibilités."
        image={heroControl}
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl">Nos coordonnées</h2>
            <span className="mt-4 block h-[3px] w-20 bg-primary" />
            <ul className="mt-8 space-y-6 text-sm">
              <li className="flex gap-3">
                <MapPin strokeWidth={1.75} className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.country}
                </span>
              </li>
              <li className="flex flex-col gap-2">
                {site.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="flex gap-3 font-medium hover:text-primary">
                    <Phone strokeWidth={1.75} className="mt-0.5 size-5 shrink-0 text-primary" />
                    {p}
                  </a>
                ))}
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex gap-3 font-medium hover:text-primary">
                  <Mail strokeWidth={1.75} className="mt-0.5 size-5 shrink-0 text-primary" />
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock strokeWidth={1.75} className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days} : {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                <MessageCircle strokeWidth={1.75} className="size-4" />
                Écrire sur WhatsApp
              </a>
              <a
                href={site.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <ShoppingBag strokeWidth={1.75} className="size-4" />
                Acheter en ligne
                <ExternalLink strokeWidth={1.75} className="size-3.5" />
              </a>
            </div>

            <div className="mt-8 grid aspect-[16/10] place-items-center rounded-xl border border-border bg-surface text-center">
              <div className="px-6">
                <MapPin strokeWidth={1.75} className="mx-auto size-7 text-primary" />
                <p className="mt-3 text-sm font-medium">Carte à intégrer</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Emplacement réservé à la carte Google Maps de nos locaux d'Ain Harrouda.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="card-elevated h-max border border-border p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="py-10 text-center"
                >
                  <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10">
                    <Check strokeWidth={2.5} className="size-7 text-primary" />
                  </span>
                  <h2 className="mt-5 text-xl">Message envoyé</h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Merci, nous revenons vers vous rapidement pendant nos horaires
                    d'ouverture.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl">Écrivez-nous</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Pour une demande chiffrée, utilisez plutôt le formulaire de devis.
                  </p>
                  <div className="mt-7 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {field("nom", "Nom et prénom", "text", true)}
                      {field("email", "E-mail", "email", true)}
                      {field("telephone", "Téléphone")}
                      {field("sujet", "Sujet")}
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className={cn(
                          "mt-2 w-full rounded-md border bg-background px-3.5 py-2.5 text-sm focus:outline-none",
                          errors.message ? "border-destructive" : "border-input focus:border-primary",
                        )}
                      />
                      {errors.message ? (
                        <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="sheen inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.97] disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 strokeWidth={2} className="size-4 animate-spin" />
                          Envoi…
                        </>
                      ) : (
                        "Envoyer le message"
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>
    </>
  );
}
