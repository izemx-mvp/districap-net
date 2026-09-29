import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  ShoppingBag,
  X,
} from "lucide-react";
import logo from "@/assets/logo_districap.png";
import { site, telHref, whatsappHref } from "@/config/site";
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

type NavItem = (typeof navItems)[number];
const isMega = (item: NavItem) => "mega" in item && item.mega;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [mobileSolutions, setMobileSolutions] = useState(false);
  const [hovered, setHovered] = useState(solutions[0]!.slug);
  const [hoverNav, setHoverNav] = useState<string | null>(null);
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);
  const lastY = useRef(0);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  // Scroll: solid state, hide on scroll down / show on scroll up, reading progress
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 80);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      if (y > 320 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4 || y < 320) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setDrawer(false);
    setMegaOpen(false);
  }, [pathname]);

  // Escape closes menus, body scroll lock for the drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setDrawer(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  // Hover intent to avoid flicker
  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    openTimer.current = window.setTimeout(() => setMegaOpen(true), 120);
  };
  const closeMega = () => {
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  };

  const solid = scrolled || !onHome || megaOpen;
  const hoveredSolution = solutions.find((s) => s.slug === hovered) ?? solutions[0]!;
  const HoveredIcon = solutionIcons[hoveredSolution.icon]!;

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
                className="inline-flex items-center gap-1.5 text-ink-foreground/75 transition-colors hover:text-primary"
              >
                <Phone strokeWidth={1.75} className="size-3.5" />
                {p}
              </a>
            ))}
            <span className="h-3 w-px bg-ink-foreground/20" />
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-1.5 text-ink-foreground/75 transition-colors hover:text-primary"
            >
              <Mail strokeWidth={1.75} className="size-3.5" />
              {site.email}
            </a>
          </div>
          <a
            href={site.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-ink-foreground/75 transition-colors hover:text-ink-foreground"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Boutique en ligne : livraison partout au Maroc
            <ExternalLink
              strokeWidth={1.75}
              className="size-3.5 text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>

      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-300",
          scrolled ? "top-0" : "top-0 lg:top-10",
          hidden && !megaOpen && !drawer ? "-translate-y-full" : "translate-y-0",
          solid
            ? "bg-background/95 shadow-[0_6px_24px_-12px_oklch(0.205_0_0/0.35)] backdrop-blur-md"
            : "bg-transparent",
        )}
        onMouseLeave={closeMega}
      >
        <div className="container-page flex h-[70px] items-center justify-between gap-4">
          <Link to="/" aria-label="Districap — accueil" className="shrink-0">
            <img
              src={logo}
              alt="Districap — Communication & Sécurité"
              className={cn(
                "w-auto origin-left transition-all duration-300",
                scrolled ? "h-8" : "h-10",
                solid ? "" : "brightness-0 invert",
              )}
            />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Navigation principale"
            onMouseLeave={() => setHoverNav(null)}
          >
            {navItems.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const mega = isMega(item);
              return (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => {
                    setHoverNav(item.to);
                    if (mega) openMega();
                    else closeMega();
                  }}
                >
                  <Link
                    to={item.to}
                    data-active={active}
                    aria-haspopup={mega ? "true" : undefined}
                    aria-expanded={mega ? megaOpen : undefined}
                    onFocus={() => mega && setMegaOpen(true)}
                    className={cn(
                      "relative z-10 inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      solid ? "text-foreground" : "text-ink-foreground",
                      active && "text-primary",
                    )}
                  >
                    {item.label}
                    {mega ? (
                      <ChevronDown
                        strokeWidth={1.75}
                        className={cn("size-4 transition-transform duration-300", megaOpen && "rotate-180")}
                      />
                    ) : null}
                  </Link>

                  {/* Hover pill that glides between items */}
                  {hoverNav === item.to && (
                    <motion.span
                      layoutId="nav-hover"
                      className={cn(
                        "absolute inset-0 rounded-full",
                        solid ? "bg-foreground/[0.05]" : "bg-white/10",
                      )}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  {/* Active indicator */}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-[13px] left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
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
                "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                solid
                  ? "border-border text-foreground hover:border-primary hover:text-primary"
                  : "border-ink-foreground/40 text-ink-foreground hover:border-ink-foreground hover:bg-white/10",
              )}
            >
              <ShoppingBag strokeWidth={1.75} className="size-4" />
              Boutique
              <ExternalLink
                strokeWidth={1.75}
                className="size-3 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <Link
              to="/devis"
              className="sheen group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.97]"
            >
              Demander un devis
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={drawer}
            onClick={() => setDrawer(true)}
            className={cn(
              "grid size-10 place-items-center rounded-full transition-colors lg:hidden",
              solid ? "text-foreground hover:bg-foreground/5" : "text-ink-foreground hover:bg-white/10",
            )}
          >
            <Menu strokeWidth={1.75} className="size-6" />
          </button>
        </div>

        {/* Reading progress */}
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 left-0 h-[2px] w-full origin-left bg-primary transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0",
          )}
          style={{ transform: `scaleX(${progress})` }}
        />

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25, ease: EASE }}
              onMouseEnter={() => window.clearTimeout(closeTimer.current)}
              className="hidden border-t border-border bg-background shadow-[0_24px_48px_-24px_oklch(0.205_0_0/0.4)] lg:block"
            >
              <div className="container-page grid grid-cols-[1fr_1fr_1fr_22rem] gap-8 py-8">
                {[0, 1, 2].map((col) => (
                  <motion.div
                    key={col}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: EASE, delay: col * 0.04 }}
                    className="space-y-2"
                  >
                    {solutions
                      .filter((_, i) => i % 3 === col)
                      .map((solution) => {
                        const Icon = solutionIcons[solution.icon]!;
                        const isHovered = hovered === solution.slug;
                        return (
                          <div
                            key={solution.slug}
                            onMouseEnter={() => setHovered(solution.slug)}
                            className={cn(
                              "rounded-xl p-3 transition-colors duration-200",
                              isHovered && "bg-surface",
                            )}
                          >
                            <Link
                              to="/solutions/$slug"
                              params={{ slug: solution.slug }}
                              className="group inline-flex items-center gap-2.5 text-sm font-semibold transition-colors hover:text-primary"
                            >
                              <span
                                className={cn(
                                  "grid size-8 place-items-center rounded-lg transition-colors duration-200",
                                  isHovered ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                                )}
                              >
                                <Icon strokeWidth={1.75} className="size-4" />
                              </span>
                              {solution.title}
                            </Link>
                            <ul className="mt-2 space-y-1 pl-[42px]">
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
                                <li>
                                  <Link
                                    to="/solutions/$slug"
                                    params={{ slug: solution.slug }}
                                    className="text-xs font-medium text-primary hover:underline"
                                  >
                                    + {solution.subs.length - 4} autres
                                  </Link>
                                </li>
                              ) : null}
                            </ul>
                          </div>
                        );
                      })}
                  </motion.div>
                ))}

                {/* Featured panel */}
                <Link
                  to="/solutions/$slug"
                  params={{ slug: hoveredSolution.slug }}
                  className="group relative min-h-[300px] overflow-hidden rounded-2xl bg-ink"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={hoveredSolution.slug}
                      src={hoveredSolution.image}
                      alt={hoveredSolution.title}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 0.55, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={hoveredSolution.slug}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="relative flex h-full flex-col justify-end p-6"
                    >
                      <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                        <HoveredIcon strokeWidth={1.75} className="size-5" />
                      </span>
                      <h3 className="mt-4 text-lg text-ink-foreground">{hoveredSolution.title}</h3>
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ink-foreground/75">
                        {hoveredSolution.short}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Découvrir la solution
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </Link>
              </div>

              {/* Bottom strip */}
              <div className="border-t border-border bg-surface">
                <div className="container-page flex items-center justify-between py-3.5 text-sm">
                  <Link
                    to="/solutions"
                    className="group inline-flex items-center gap-2 font-semibold transition-colors hover:text-primary"
                  >
                    Voir toutes les solutions
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <p className="text-muted-foreground">
                    Un projet spécifique ?{" "}
                    <Link to="/devis" className="font-semibold text-primary hover:underline">
                      Demandez une étude
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer ? (
          <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-background"
            >
              <div className="flex items-center justify-between border-b border-border p-5">
                <img src={logo} alt="Districap" className="h-8 w-auto" />
                <button
                  type="button"
                  aria-label="Fermer le menu"
                  onClick={() => setDrawer(false)}
                  className="grid size-10 place-items-center rounded-full transition-colors hover:bg-foreground/5"
                >
                  <X strokeWidth={1.75} className="size-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-4">
                {navItems.map((item, i) => {
                  const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                  const mega = isMega(item);
                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3, ease: EASE }}
                      className="border-b border-border"
                    >
                      {mega ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setMobileSolutions((v) => !v)}
                            aria-expanded={mobileSolutions}
                            className={cn(
                              "flex w-full items-center justify-between py-3.5 text-base font-medium",
                              active && "text-primary",
                            )}
                          >
                            {item.label}
                            <ChevronDown
                              strokeWidth={1.75}
                              className={cn("size-5 transition-transform duration-300", mobileSolutions && "rotate-180")}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {mobileSolutions && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: EASE }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-1 pb-3">
                                  {solutions.map((s) => {
                                    const Icon = solutionIcons[s.icon]!;
                                    return (
                                      <li key={s.slug}>
                                        <Link
                                          to="/solutions/$slug"
                                          params={{ slug: s.slug }}
                                          className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                                        >
                                          <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                                            <Icon strokeWidth={1.75} className="size-4" />
                                          </span>
                                          {s.title}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                  <li>
                                    <Link
                                      to="/solutions"
                                      className="mt-1 inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold text-primary"
                                    >
                                      Toutes les solutions <ArrowRight className="size-4" />
                                    </Link>
                                  </li>
                                </div>
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={item.to}
                          className={cn(
                            "flex items-center justify-between py-3.5 text-base font-medium",
                            active && "text-primary",
                          )}
                        >
                          {item.label}
                          {active && <span className="size-1.5 rounded-full bg-primary" />}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              <div className="space-y-3 border-t border-border bg-surface p-5">
                <Link
                  to="/devis"
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Demander un devis <ArrowRight className="size-4" />
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={site.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-3 text-sm font-semibold"
                  >
                    <ShoppingBag strokeWidth={1.75} className="size-4" />
                    Boutique
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-3 text-sm font-semibold text-white"
                  >
                    <MessageCircle strokeWidth={1.75} className="size-4" />
                    WhatsApp
                  </a>
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-1">
                  {site.phones.map((p) => (
                    <a
                      key={p}
                      href={telHref(p)}
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
                    >
                      <Phone strokeWidth={1.75} className="size-3.5" />
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}