import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import logo from "@/assets/logo-districap.png.asset.json";
import { site, telHref } from "@/config/site";
import { solutions } from "@/data/solutions";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      toast.error("Merci de saisir une adresse e-mail valide.");
      return;
    }
    setSubscribed(true);
    setEmail("");
    toast.success("L'inscription a été effectuée avec succès.");
  };

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={logo.url}
            alt="Districap — Communication & Sécurité"
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="mt-5 text-sm leading-relaxed text-ink-foreground/70">
            Depuis 2009, Districap importe et distribue les équipements de courant faible
            et de sécurité électronique des plus grandes marques internationales, au
            service des professionnels, des entreprises et des grands comptes au Maroc.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-md border border-ink-foreground/20 p-2 transition-colors hover:border-primary hover:text-primary"
            >
              <Facebook strokeWidth={1.75} className="size-4" />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-md border border-ink-foreground/20 p-2 transition-colors hover:border-primary hover:text-primary"
            >
              <Linkedin strokeWidth={1.75} className="size-4" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-md border border-ink-foreground/20 p-2 transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram strokeWidth={1.75} className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-foreground">
            Solutions
          </h3>
          <ul className="mt-5 space-y-2">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/solutions/$slug"
                  params={{ slug: s.slug }}
                  className="text-sm text-ink-foreground/70 transition-colors hover:text-primary"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Entreprise</h3>
          <ul className="mt-5 space-y-2">
            {([
              { label: "Qui sommes-nous", to: "/qui-sommes-nous" },
              { label: "Références", to: "/references" },
              { label: "Marques", to: "/marques" },
              { label: "Contact", to: "/contact" },
              { label: "Demander un devis", to: "/devis" },
            ] as const).map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-ink-foreground/70 transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider">
            Informations
          </h3>
          <ul className="mt-5 space-y-2">
            {([
              { label: "Mentions légales", to: "/mentions-legales" },
              { label: "Politique de confidentialité", to: "/politique-de-confidentialite" },
              { label: "Plan du site", to: "/plan-du-site" },
            ] as const).map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-ink-foreground/70 transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-ink-foreground/70">
            <li className="flex gap-2.5">
              <MapPin strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.country}
              </span>
            </li>
            {site.phones.map((p) => (
              <li key={p} className="flex gap-2.5">
                <Phone strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={telHref(p)} className="hover:text-primary">
                  {p}
                </a>
              </li>
            ))}
            <li className="flex gap-2.5">
              <Mail strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`mailto:${site.email}`} className="hover:text-primary">
                {site.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days} : {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>

          <form onSubmit={submit} className="mt-7">
            <label
              htmlFor="newsletter"
              className="text-sm font-semibold uppercase tracking-wider"
            >
              Newsletter
            </label>
            {subscribed ? (
              <p className="mt-3 rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-ink-foreground">
                L'inscription a été effectuée avec succès.
              </p>
            ) : (
              <div className="mt-3 flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre e-mail"
                  className="min-w-0 flex-1 rounded-md border border-ink-foreground/20 bg-transparent px-3 py-2 text-sm placeholder:text-ink-foreground/40 focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.97]"
                >
                  OK
                </button>
              </div>
            )}
          </form>

          <a
            href={site.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Boutique en ligne
            <ExternalLink strokeWidth={1.75} className="size-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-foreground/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName} — {site.tagline}. Tous droits
            réservés.
          </p>
          <p>Casablanca, Maroc</p>
        </div>
      </div>
    </footer>
  );
}
