import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { site, whatsappHref } from "@/config/site";
import { EASE } from "@/components/motion/Reveal";

export function WhatsAppButton() {
  const [shown, setShown] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShown(true), 2000);
    const t2 = setTimeout(() => setTooltip(true), 8000);
    const t3 = setTimeout(() => setTooltip(false), 14000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {shown ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-3"
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Écrire sur WhatsApp"
            className="glow-pulse grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-float)] transition-transform duration-200 hover:scale-105 active:scale-[0.97]"
          >
            <MessageCircle strokeWidth={1.75} className="size-6" />
          </a>
          <AnimatePresence>
            {tooltip ? (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="hidden rounded-md bg-ink px-3 py-2 text-xs font-medium text-ink-foreground shadow-[var(--shadow-float)] sm:block"
              >
                Un projet ? Écrivez-nous
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const r = 22;
  const c = 2 * Math.PI * r;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Revenir en haut"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-ink text-ink-foreground shadow-[var(--shadow-float)] transition-transform duration-200 hover:scale-105"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r={r}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - progress)}
            />
          </svg>
          <ArrowUp strokeWidth={1.75} className="relative size-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

const COOKIE_KEY = "districap-cookies";

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) setOpen(true);
  }, []);

  const close = (value: string) => {
    localStorage.setItem(COOKIE_KEY, value);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-float)] sm:inset-x-6"
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
            <p className="min-w-0 text-sm leading-relaxed text-muted-foreground">
              Ce site utilise des cookies pour mesurer son audience et améliorer votre
              expérience de navigation. Vous pouvez accepter ou refuser leur utilisation.
            </p>
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => close("dismissed")}
              className="shrink-0 self-start text-muted-foreground hover:text-foreground"
            >
              <X strokeWidth={1.75} className="size-4" />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => close("accepted")}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.97]"
            >
              Accepter
            </button>
            <button
              type="button"
              onClick={() => close("refused")}
              className="rounded-md border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              Refuser
            </button>
            <a
              href="/politique-de-confidentialite"
              className="px-2 py-2 text-sm font-medium text-primary"
            >
              En savoir plus
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function RouteProgress({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "85%" }}
          exit={{ width: "100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed left-0 top-0 z-[70] h-[3px] bg-primary"
        />
      ) : null}
    </AnimatePresence>
  );
}

export function IntroCurtain() {
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("districap-intro")) return;
    sessionStorage.setItem("districap-intro", "1");
    setDone(false);
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-ink"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold tracking-tight text-ink-foreground"
          >
            {site.legalName}
            <span className="text-primary">.</span>
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
