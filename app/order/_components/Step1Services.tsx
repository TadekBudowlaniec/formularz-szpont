"use client";

import { CATEGORIES, SERVICES, formatPLN } from "@/lib/services";

type Props = {
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export default function Step1Services({ selectedIds, onToggle }: Props) {
  const counts: Record<string, number> = {};
  for (const cat of CATEGORIES) {
    counts[cat.id] = SERVICES.filter(
      (s) => s.category === cat.id && selectedIds.includes(s.id),
    ).length;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Wybierz usługi
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Zaznacz wszystko, co Cię interesuje. Cena i czas liczą się na żywo po prawej.
        </p>
      </header>

      <nav
        aria-label="Kategorie usług"
        className="sticky top-0 z-10 -mx-4 border-b border-neutral-800 bg-neutral-950/95 px-4 py-3 backdrop-blur md:-mx-6 md:px-6"
      >
        <ul className="flex gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => {
            const count = counts[cat.id] ?? 0;
            const active = count > 0;
            return (
              <li key={cat.id}>
                <a
                  href={`#cat-${cat.id}`}
                  className={[
                    "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    active
                      ? "border-emerald-600 bg-emerald-600/10 text-emerald-300"
                      : "border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700",
                  ].join(" ")}
                >
                  {cat.label}
                  {count > 0 && (
                    <span className="rounded-full bg-emerald-600 px-1.5 text-[10px] font-semibold text-white">
                      {count}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="space-y-10">
        {CATEGORIES.map((cat) => {
          const items = SERVICES.filter((s) => s.category === cat.id);
          return (
            <section
              key={cat.id}
              id={`cat-${cat.id}`}
              className="scroll-mt-24"
            >
              <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-500">
                {cat.label}
              </h2>
              <ul className="grid gap-3">
                {items.map((s) => {
                  const checked = selectedIds.includes(s.id);
                  return (
                    <li key={s.id}>
                      <label
                        className={[
                          "flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition",
                          checked
                            ? "border-emerald-600 bg-emerald-600/5"
                            : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700",
                        ].join(" ")}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggle(s.id)}
                          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-neutral-600 bg-neutral-900"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-neutral-100">
                              {s.name}
                            </span>
                            {s.recurring && (
                              <span className="rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-300">
                                miesięcznie
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-neutral-400">
                            {s.description}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="font-mono text-sm font-semibold text-neutral-100">
                            {formatPLN(s.price)}
                          </div>
                          {s.recurring && (
                            <div className="font-mono text-[10px] text-neutral-500">
                              /mies.
                            </div>
                          )}
                        </div>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
