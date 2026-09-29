import { brands } from "@/data/brands";

export function BrandMarquee() {
  const list = [...brands, ...brands];
  return (
    <div className="group relative overflow-hidden py-2">
      <div className="marquee-track flex w-max gap-4 group-hover:[animation-play-state:paused]">
        {list.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="relative flex h-24 w-56 shrink-0 flex-col items-center justify-center rounded-xl border border-border bg-card opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <span className="text-lg font-bold tracking-tight">{brand.name}</span>
            {brand.exclusive ? (
              <span className="mt-1 rounded-full bg-primary px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-primary-foreground opacity-0 transition-opacity duration-300 hover:opacity-100 group-hover:opacity-0 [div:hover>&]:opacity-100">
                Distributeur exclusif
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
