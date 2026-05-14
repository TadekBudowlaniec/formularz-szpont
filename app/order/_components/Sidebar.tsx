"use client";

import { formatPLN, getPackage, type PackageId } from "@/lib/packages";

type Props = {
  packageId: PackageId | null;
};

export default function Sidebar({ packageId }: Props) {
  const pkg = packageId ? getPackage(packageId) : undefined;

  return (
    <aside className="md:sticky md:top-6">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Twój wybór
        </h2>

        {!pkg ? (
          <p className="mt-4 text-sm text-neutral-500">
            Wybierz pakiet, aby zobaczyć podsumowanie.
          </p>
        ) : (
          <>
            <div className="mt-4">
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                Pakiet {pkg.name}
              </p>
              <p className="mt-2 font-mono text-2xl font-semibold">
                {formatPLN(pkg.price)}
              </p>
              <p className="text-xs text-neutral-500">netto</p>
            </div>

            <ul className="mt-4 space-y-1.5 border-t border-neutral-800 pt-4 text-sm">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-neutral-300">
                  <span className="mt-0.5 shrink-0 text-emerald-500">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-2 border-t border-neutral-800 pt-4 text-xs text-neutral-400">
              <span aria-hidden>⏱</span>
              <span>Czas realizacji: {pkg.weeksLabel}</span>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
