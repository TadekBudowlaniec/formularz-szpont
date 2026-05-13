"use client";

import { calcTotals, formatPLN, getServicesByIds } from "@/lib/services";

type Props = {
  selectedIds: string[];
  step: 1 | 2 | 3;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
};

export default function Sidebar({
  selectedIds,
  step,
  onNext,
  nextLabel = "Dalej →",
  nextDisabled,
}: Props) {
  const items = getServicesByIds(selectedIds);
  const totals = calcTotals(selectedIds);

  return (
    <aside className="md:sticky md:top-6">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Podsumowanie
        </h2>

        {items.length === 0 ? (
          <p className="mt-4 text-sm text-neutral-500">
            Zaznacz usługi po lewej, aby zobaczyć wycenę.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {items.map((s) => (
              <li
                key={s.id}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <span className="text-neutral-200">
                  {s.name}
                  {s.recurring && (
                    <span className="ml-1 text-xs text-neutral-500">/mies.</span>
                  )}
                </span>
                <span className="shrink-0 font-mono text-neutral-300">
                  {formatPLN(s.price)}
                </span>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="mt-5 space-y-1 border-t border-neutral-800 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-400">Jednorazowo</span>
              <span className="font-mono font-semibold text-neutral-100">
                {formatPLN(totals.oneTime)}
              </span>
            </div>
            {totals.monthly > 0 && (
              <div className="flex justify-between">
                <span className="text-neutral-400">Miesięcznie</span>
                <span className="font-mono font-semibold text-emerald-400">
                  {formatPLN(totals.monthly)}
                </span>
              </div>
            )}
            {totals.weeks > 0 && (
              <div className="flex justify-between pt-1 text-xs text-neutral-500">
                <span>Szacowany czas</span>
                <span>ok. {totals.weeks} {totals.weeks === 1 ? "tydzień" : "tygodni"}</span>
              </div>
            )}
          </div>
        )}

        {step === 1 && onNext && (
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className="mt-5 w-full rounded-md bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
          >
            {nextLabel}
          </button>
        )}
      </div>
    </aside>
  );
}
