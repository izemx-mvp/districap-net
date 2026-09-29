import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowUp,
  Award,
  Check,
  Clock,
  ExternalLink,
  Facebook,
  Handshake,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShoppingBag,
  Truck,
} from "lucide-react";
import logo from "@/assets/logo_districap.png";
import { site, telHref, whatsappHref } from "@/config/site";
import { solutions } from "@/data/solutions";
import { EASE } from "@/components/motion/Reveal";

const TRUST = [
  { icon: Award, title: "Depuis 2009", text: "Plus de 16 ans d'expertise" },
  { icon: Check, title: "5 exclusivités", text: "Distributeur exclusif au Maroc" },
  { icon: Handshake, title: "+10 partenaires", text: "Marques internationales" },
  { icon: Truck, title: "Livraison nationale", text: "Partout au Maroc" },
];

const COMPANY_LINKS = [
  { label: "Qui sommes-nous", to: "/qui-sommes-nous" },
  { label: "Références", to: "/references" },
  { label: "Marques", to: "/marques" },
  { label: "Contact", to: "/contact" },
  { label: "Demander un devis", to: "/devis" },
] as const;

const LEGAL_LINKS = [
  { label: "Mentions légales", to: "/mentions-legales" },
  { label: "Confidentialité", to: "/politique-de-confidentialite" },
  { label: "Plan du site", to: "/plan-du-site" },
] as const;

const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: site.social.facebook },
  { icon: Linkedin, label: "LinkedIn", href: site.social.linkedin },
  { icon: Instagram, label: "Instagram", href: site.social.instagram },
];

const GRID_BG = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
};

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 text-sm text-ink-foreground/65 transition-colors duration-200 hover:text-ink-foreground"
    >
      <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" />
      {children}
    </Link>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError(true);
      toast.error("Merci de saisir une adresse e-mail valide.");
      return;
    }
    setError(false);
    setSubscribed(true);
    setEmail("");
    toast.success("L'inscription a été effectuée avec succès.");
  };

  return (
    <footer className="relative mt-24 bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-70" style={GRID_BG} aria-hidden />

      {/* CTA band overlapping the previous section */}
      <div className="container-page relative -translate-y-1/2">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-8 text-primary-foreground shadow-[0_24px_60px_-20px_oklch(0.538_0.201_32.5/0.55)] md:px-10">
          <div className="absolute -top-20 -right-10 size-56 rounded-full bg-white/10 blur-2xl" aria-hidden />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl text-primary-foreground md:text-3xl">Un projet ? Parlons-en.</h2>
              <p className="mt-1.5 text-sm opacity-90">
                Étude, choix du matériel et proposition chiffrée adaptée à votre site.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/devis"
                className="group inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-transform duration-200 active:scale-[0.97]"
              >
                Demander un devis
                <ArrowRight className="size-4 text-primary transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                <MessageCircle strokeWidth={1.75} className="size-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page relative -mt-6">
        {/* Trust badges */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div
              key={t.title}
              className="group flex items-center gap-3 bg-ink p-5 transition-colors duration-300 hover:bg-white/[0.03]"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <t.icon strokeWidth={1.75} className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{t.title}</span>
                <span className="block truncate text-xs text-ink-foreground/55">{t.text}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Main columns */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <img
              src={logo}
              alt="Districap — Communication & Sécurité"
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-foreground/65">
              Depuis 2009, Districap importe et distribue les équipements de courant faible et de
              sécurité électronique des plus grandes marques internationales, au service des
              professionnels, des entreprises et des grands comptes au Maroc.
            </p>

            {/* Store card */}
            <a
              href={site.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 flex max-w-sm items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:border-primary/60 hover:bg-white/[0.07]"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                <ShoppingBag strokeWidth={1.75} className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">Boutique en ligne</span>
                <span className="block text-xs text-ink-foreground/55">
                  Livraison partout au Maroc · paiement à la livraison
                </span>
              </span>
              <ExternalLink
                strokeWidth={1.75}
                className="size-4 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <div className="mt-7 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary"
                >
                  <s.icon strokeWidth={1.75} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-ink-foreground/50 uppercase">Solutions</h3>
            <ul className="mt-5 space-y-2.5">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/solutions/$slug"
                    params={{ slug: s.slug }}
                    className="group inline-flex items-center gap-1.5 text-sm text-ink-foreground/65 transition-colors duration-200 hover:text-ink-foreground"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-ink-foreground/50 uppercase">Entreprise</h3>
            <ul className="mt-5 space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.to}>
                  <FooterLink to={l.to}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-ink-foreground/50 uppercase">Contact</h3>
            <ul className="mt-5 space-y-3.5 text-sm text-ink-foreground/70">
              <li className="flex gap-3">
                <MapPin strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="leading-relaxed">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.country}
                </span>
              </li>
              {site.phones.map((p) => (
                <li key={p} className="flex gap-3">
                  <Phone strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-primary" />
                  <a href={telHref(p)} className="font-medium transition-colors hover:text-primary">
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Mail strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`mailto:${site.email}`} className="font-medium transition-colors hover:text-primary">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="space-y-0.5">
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      <span className="text-ink-foreground/50">{h.days} :</span> {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-ink-foreground/50 uppercase">Newsletter</p>
              <p className="mt-2 text-xs text-ink-foreground/55">Nouveautés et solutions, une fois par mois.</p>
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.p
                    key="ok"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="mt-3 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm"
                  >
                    <span className="grid size-5 place-items-center rounded-full bg-primary">
                      <Check strokeWidth={3} className="size-3" />
                    </span>
                    L'inscription a été effectuée avec succès.
                  </motion.p>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    noValidate
                    animate={error ? { x: [0, -6, 6, -4, 0] } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 flex items-center rounded-full border border-white/15 bg-white/[0.04] p-1 transition-colors focus-within:border-primary"
                  >
                    <label htmlFor="newsletter" className="sr-only">
                      Votre e-mail
                    </label>
                    <input
                      id="newsletter"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(false);
                      }}
                      placeholder="Votre e-mail"
                      className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm placeholder:text-ink-foreground/40 focus:outline-none"
                    />
                    <button
                      type="submit"
                      aria-label="S'inscrire"
                      className="group grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-200 active:scale-[0.94]"
                    >
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="pointer-events-none relative overflow-hidden" aria-hidden>
        <p className="container-page -mb-[0.18em] text-center text-[18vw] leading-none font-bold tracking-tighter text-transparent select-none [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] lg:text-[13rem]">
          DISTRICAP
        </p>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-ink-foreground/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName} — {site.tagline}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="transition-colors hover:text-primary">
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-medium text-ink-foreground/70 transition-colors hover:border-primary hover:text-ink-foreground"
            >
              Haut de page
              <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}