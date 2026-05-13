const STEPS = [
  { n: 1, label: "Konfigurator" },
  { n: 2, label: "Brief" },
  { n: 3, label: "Płatność" },
];

export default function ProgressBar({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="mb-8">
      <ol className="flex items-center gap-2">
        {STEPS.map((s, i) => {
          const active = step === s.n;
          const done = step > s.n;
          return (
            <li key={s.n} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={[
                    "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
                    done
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : active
                      ? "border-emerald-600 text-emerald-400"
                      : "border-neutral-700 text-neutral-500",
                  ].join(" ")}
                >
                  {done ? "✓" : s.n}
                </span>
                <span
                  className={[
                    "hidden text-sm sm:inline",
                    active || done ? "text-neutral-100" : "text-neutral-500",
                  ].join(" ")}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={[
                    "h-px flex-1",
                    done ? "bg-emerald-600" : "bg-neutral-800",
                  ].join(" ")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
