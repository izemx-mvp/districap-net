import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  BackToTop,
  CookieBanner,
  IntroCurtain,
  RouteProgress,
  WhatsAppButton,
} from "@/components/layout/Floating";
import { site } from "@/config/site";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-lg text-center">
        <svg
          viewBox="0 0 120 90"
          className="mx-auto h-28 w-auto animate-[districap-float_3s_ease-in-out_infinite] text-primary"
          aria-hidden="true"
        >
          <style>{`@keyframes districap-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
          <rect
            x="24"
            y="28"
            width="52"
            height="26"
            rx="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <path
            d="M76 36l18-8v26l-18-8z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <path d="M34 54v14" stroke="currentColor" strokeWidth="2.5" />
          <path
            d="M34 68c-8 0-14 4-14 10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="4 5"
            fill="none"
          />
          <circle cx="60" cy="41" r="3" fill="currentColor" />
        </svg>
        <h1 className="mt-8 text-6xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Cette page est introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Retour à l'accueil
          </Link>
          <Link
            to="/contact"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Cette page n'a pas pu s'afficher
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Une erreur est survenue. Vous pouvez réessayer ou revenir à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Districap — Distributeur sécurité électronique & courant faible au Maroc" },
      {
        name: "description",
        content:
          "Districap, importateur et distributeur de référence en sécurité électronique et courant faible au Maroc depuis 2009. Distributeur exclusif LUMENS, ATEN, SATEL, FINSECUR et PREMIUM LINE.",
      },
      { name: "author", content: "Districap" },
      { property: "og:site_name", content: "Districap" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Districap",
          alternateName: "Districap Communication & Sécurité",
          foundingDate: "2009",
          email: site.email,
          telephone: `+212 ${site.phones[0]}`,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: "Ain Harrouda, Casablanca",
            addressCountry: "MA",
          },
          sameAs: [site.storeUrl, site.social.linkedin, site.social.facebook],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Districap",
          image: site.storeUrl,
          priceRange: "$$",
          telephone: `+212 ${site.phones[0]}`,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            addressLocality: "Ain Harrouda, Casablanca",
            addressCountry: "MA",
          },
          openingHours: ["Mo-Fr 08:30-12:30", "Mo-Fr 14:30-18:30", "Sa 08:30-12:30"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname, isLoading } = useRouterState({
    select: (s) => ({ pathname: s.location.pathname, isLoading: s.isLoading }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <IntroCurtain />
      <RouteProgress active={isLoading} />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen"
        >
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <CookieBanner />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
