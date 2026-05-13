"use client";

import { CATEGORIES, SERVICES, formatPLN } from "@/lib/services";

type Props = {
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export default function Step1Services({ selectedIds, onToggle }: Props) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Wybierz usługi
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Zaznacz wszystko, co Cię interesuje. Cena i czas liczą się na żywo po prawej.
        </p>
      </header>

      <div className="space-y-8">
        {CATEGORIES.map((cat) => {
          const items = SERVICES.filter((s) => s.category === cat.id);
          return (
            <section key={cat.id}>
              <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-500">
                {cat.label}
              </h2>
              <ul className="grid gap-2">
                {items.map((s) => {
                  const checked = selectedIds.includes(s.id);
                  return (
                    <li key={s.id}>
                      <label
                        className={[
                          "flex cursor-pointer items-center justify-between gap-4 rounded-lg border px-4 py-3 transition",
                          checked
                            ? "border-emerald-600 bg-emerald-600/5"
                            : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700",
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => onToggle(s.id)}
                            className="h-4 w-4 cursor-pointer rounded border-neutral-600 bg-neutral-900"
                          />
                          <span className="text-sm font-medium text-neutral-100">
                            {s.name}
                            {s.recurring && (
                              <span className="ml-2 rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-300">
                                miesięcznie
                              </span>
                            )}
                          </span>
                        </div>
                        <span className="shrink-0 font-mono text-sm text-neutral-300">
                          {formatPLN(s.price)}
                          {s.recurring && (
                            <span className="text-neutral-500">/mies.</span>
                          )}
                        </span>
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
