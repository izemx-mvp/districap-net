import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function CtaBanner({
  title = "Un projet de sécurité ou d'audiovisuel ? Parlons-en.",
  text = "Nos équipes évaluent les enjeux de votre projet et vous recommandent les solutions les plus pertinentes, avec une maîtrise complète des délais de mise en œuvre.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section-y">
      <div className="container-page">
        <Reveal className="gradient-drift overflow-hidden rounded-xl px-6 py-14 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl leading-tight text-ink-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-foreground/75">
            {text}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/devis"
              className="sheen group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.97]"
            >
              Demander un devis
              <ArrowRight
                strokeWidth={1.75}
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-ink-foreground/30 px-6 py-3 text-sm font-semibold text-ink-foreground transition-colors duration-200 hover:border-ink-foreground"
            >
              Nous contacter
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
