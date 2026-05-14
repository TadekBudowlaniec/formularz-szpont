"use client";

import { PACKAGES, formatPLN, type PackageId } from "@/lib/packages";

type Props = {
  onChoose: (id: PackageId) => void;
};

export default function Step1Packages({ onChoose }: Props) {
  return (
    <div className="space-y-10">
      <header className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Wybierz pakiet
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Trzy gotowe ścieżki. Wybierz najbliższą i przechodzimy do briefu.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {PACKAGES.map((pkg) => {
          const highlighted = pkg.id === "growth";
          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => onChoose(pkg.id)}
              className={[
                "relative flex flex-col rounded-2xl border p-6 text-left transition",
                highlighted
                  ? "border-emerald-500 bg-emerald-600/5 shadow-[0_0_0_1px_rgba(16,185,129,0.3)] hover:bg-emerald-600/10"
                  : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700",
              ].join(" ")}
            >
              {pkg.badge && (
                <span className="absolute right-4 top-4 rounded-full bg-emerald-600 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                  {pkg.badge}
                </span>
              )}

              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
                {pkg.name}
              </span>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight">
                  {formatPLN(pkg.price)}
                </span>
                <span className="text-xs text-neutral-500">netto</span>
              </div>

              <ul className="mt-5 flex-1 space-y-2.5">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-neutral-200">
                    <span className="mt-0.5 shrink-0 font-semibold text-emerald-500">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-2 border-t border-neutral-800 pt-4 text-xs text-neutral-400">
                <span aria-hidden>⏱</span>
                <span>Czas realizacji: {pkg.weeksLabel}</span>
              </div>

              <span
                className={[
                  "mt-5 inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition",
                  highlighted
                    ? "bg-emerald-600 text-white hover:bg-emerald-500"
                    : "border border-emerald-600/60 text-emerald-300 hover:border-emerald-500 hover:bg-emerald-600/10",
                ].join(" ")}
              >
                Wybieram →
              </span>
            </button>
          );
        })}
      </div>

      <aside className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 md:flex md:items-center md:justify-between md:gap-6">
        <div>
          <h2 className="text-sm font-semibold text-neutral-100">
            Potrzebujesz czegoś innego?
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Masz niestandardowy projekt — platformę, aplikację, branding od zera?
          </p>
        </div>
        <a
          href="https://instagram.com/ghostekmedia"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex shrink-0 items-center justify-center rounded-md border border-neutral-700 px-4 py-2.5 text-sm text-neutral-200 transition hover:border-neutral-500 md:mt-0"
        >
          Porozmawiajmy na Instagramie →
        </a>
      </aside>
    </div>
  );
}
