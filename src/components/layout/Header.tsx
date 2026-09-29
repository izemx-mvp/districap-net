import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Phone, ShoppingBag, X, ExternalLink } from "lucide-react";
import logo from "@/assets/logo-districap.png.asset.json";
import { site, telHref } from "@/config/site";
import { solutions } from "@/data/solutions";
import { solutionIcons } from "@/components/icons";
import { EASE } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Solutions", to: "/solutions", mega: true },
  { label: "Marques", to: "/marques" },
  { label: "Références", to: "/references" },
  { label: "Qui sommes-nous", to: "/qui-sommes-nous" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [hovered, setHovered] = useState(solutions[0]!.slug);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDrawer(false);
    setMegaOpen(false);
  }, [pathname]);

  const solid = scrolled || !onHome;
  const hoveredSolution = solutions.find((s) => s.slug === hovered) ?? solutions[0]!;

  return (
    <>
      {/* Top bar */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 hidden bg-ink text-ink-foreground transition-transform duration-300 lg:block",
          scrolled ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="container-page flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            {site.phones.map((p) => (
              <a
                key={p}
                href={telHref(p)}
                className="inline-flex items-center gap-1.5 text-ink-foreground/80 transition-colors hover:text-primary"
              >
                <Phone strokeWidth={1.75} className="size-3.5" />
                {p}
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="text-ink-foreground/80 transition-colors hover:text-primary"
            >
              {site.email}
            </a>
          </div>
          <a
            href={site.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-primary"
          >
            Boutique en ligne
            <ExternalLink strokeWidth={1.75} className="size-3.5" />
          </a>
        </div>
      </div>

      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-[250ms]",
          scrolled ? "top-0" : "lg:top-10 top-0",
          solid ? "bg-background shadow-[0_6px_24px_-12px_oklch(0.205_0_0/0.35)]" : "bg-transparent",
        )}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="container-page flex h-[70px] items-center justify-between gap-4">
          <Link to="/" aria-label="Districap — accueil" className="shrink-0">
            <img
              src={logo.url}
              alt="Districap — Communication & Sécurité"
              className={cn(
                "w-auto origin-left transition-all duration-[250ms]",
                scrolled ? "h-8" : "h-10",
                solid ? "" : "brightness-0 invert",
              )}
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {navItems.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <div
                  key={item.to}
                  onMouseEnter={() => setMegaOpen(Boolean((item as { mega?: boolean }).mega))}
                >
                  <Link
                    to={item.to}
                    data-active={active}
                    aria-haspopup={(item as { mega?: boolean }).mega ? "true" : undefined}
                    aria-expanded={
                      (item as { mega?: boolean }).mega ? megaOpen : undefined
                    }
                    className={cn(
                      "link-underline inline-flex items-center gap-1 py-2 text-sm font-medium transition-colors",
                      solid ? "text-foreground" : "text-ink-foreground",
                      active && "text-primary",
                    )}
                  >
                    {item.label}
                    {(item as { mega?: boolean }).mega ? (
                      <ChevronDown strokeWidth={1.75} className="size-4" />
                    ) : null}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={site.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors",
                solid
                  ? "border-border text-foreground hover:border-primary hover:text-primary"
                  : "border-ink-foreground/40 text-ink-foreground hover:border-ink-foreground",
              )}
            >
              <ShoppingBag strokeWidth={1.75} className="size-4" />
              Boutique
            </a>
            <Link
              to="/devis"
              className="sheen rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.97]"
            >
              Demander un devis
            </Link>
          </div>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setDrawer(true)}
            className={cn("lg:hidden", solid ? "text-foreground" : "text-ink-foreground")}
          >
            <Menu strokeWidth={1.75} className="size-7" />
          </button>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25, ease: EASE }}
              className="hidden border-t border-border bg-background shadow-[0_24px_48px_-24px_oklch(0.205_0_0/0.4)] lg:block"
            >
              <div className="container-page grid grid-cols-[1fr_1fr_1fr_20rem] gap-8 py-8">
                {[0, 1, 2].map((col) => (
                  <motion.div
                    key={col}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: EASE, delay: col * 0.04 }}
                    className="space-y-6"
                  >
                    {solutions
                      .filter((_, i) => i % 3 === col)
                      .map((solution) => {
                        const Icon = solutionIcons[solution.icon]!;
                        return (
                          <div
                            key={solution.slug}
                            onMouseEnter={() => setHovered(solution.slug)}
                          >
                            <Link
                              to="/solutions/$slug"
                              params={{ slug: solution.slug }}
                              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary"
                            >
                              <Icon strokeWidth={1.75} className="size-4 text-primary" />
                              {solution.title}
                            </Link>
                            <ul className="mt-2 space-y-1">
                              {solution.subs.slice(0, 4).map((sub) => (
                                <li key={sub.slug}>
                                  <Link
                                    to="/solutions/$slug"
                                    params={{ slug: solution.slug }}
                                    hash={sub.slug}
                                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                                  >
                                    {sub.title}
                                  </Link>
                                </li>
                              ))}
                              {solution.subs.length > 4 ? (
                                <li className="text-xs font-medium text-primary">
                                  + {solution.subs.length - 4} autres
                                </li>
                              ) : null}
                            </ul>
                          </div>
                        );
                      })}
                  </motion.div>
                ))}
                <div className="relative overflow-hidden rounded-xl bg-ink">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={hoveredSolution.slug}
                      src={hoveredSolution.image}
                      alt={hoveredSolution.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="relative flex h-full flex-col justify-end p-6">
                    <h3 className="text-lg text-ink-foreground">{hoveredSolution.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-foreground/75">
                      {hoveredSolution.short}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer ? (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              className="absolute inset-0 bg-ink/70"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto bg-background p-6"
            >
              <div className="flex items-center justify-between">
                <img src={logo.url} alt="Districap" className="h-8 w-auto" />
                <button
                  type="button"
                  aria-label="Fermer le menu"
                  onClick={() => setDrawer(false)}
                >
                  <X strokeWidth={1.75} className="size-6" />
                </button>
              </div>
              <nav className="mt-8 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3, ease: EASE }}
                  >
                    <Link
                      to={item.to}
                      className="block border-b border-border py-3 text-base font-medium"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <details className="mt-4 rounded-lg bg-surface p-4">
                <summary className="cursor-pointer text-sm font-semibold">
                  Toutes les solutions
                </summary>
                <ul className="mt-3 space-y-2">
                  {solutions.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/solutions/$slug"
                        params={{ slug: s.slug }}
                        className="text-sm text-muted-foreground"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
              <div className="mt-6 space-y-3">
                <Link
                  to="/devis"
                  className="block rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
                >
                  Demander un devis
                </Link>
                <a
                  href={site.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-border px-4 py-3 text-center text-sm font-semibold"
                >
                  Boutique en ligne
                </a>
                {site.phones.map((p) => (
                  <a
                    key={p}
                    href={telHref(p)}
                    className="block text-center text-sm text-muted-foreground"
                  >
                    {p}
                  </a>
                ))}
              </div>
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
