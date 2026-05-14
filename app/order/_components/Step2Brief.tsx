"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { briefSchema, type BriefData } from "@/lib/schemas";

type Props = {
  defaultValues?: Partial<BriefData>;
  onBack: () => void;
  onSubmit: (data: BriefData) => void;
};

const DESCRIPTION_MAX = 300;

const inputBase =
  "w-full rounded-md border bg-neutral-900 px-3 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2";

const inputOk = `${inputBase} border-neutral-700 focus:border-emerald-600 focus:ring-emerald-600/30`;
const inputErr = `${inputBase} border-red-700 focus:border-red-600 focus:ring-red-600/30`;

export default function Step2Brief({ defaultValues, onBack, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BriefData>({
    resolver: zodResolver(briefSchema),
    defaultValues,
  });

  const descLength = watch("description")?.length ?? 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Ostatni krok
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Dwa pola i możemy zaczynać.
        </p>
      </header>

      <Field label="Imię i nazwisko" error={errors.name?.message}>
        <input
          type="text"
          placeholder="Jan Kowalski"
          className={errors.name ? inputErr : inputOk}
          {...register("name")}
        />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input
          type="email"
          placeholder="jan@firma.pl"
          className={errors.email ? inputErr : inputOk}
          {...register("email")}
        />
      </Field>

      <Field
        label="Opisz projekt w jednym zdaniu"
        error={errors.description?.message}
        hint={`${descLength}/${DESCRIPTION_MAX}`}
      >
        <textarea
          rows={3}
          maxLength={DESCRIPTION_MAX}
          placeholder="np. Potrzebuję landing page dla gabinetu stomatologicznego w Krakowie"
          className={(errors.description ? inputErr : inputOk) + " resize-y"}
          {...register("description")}
        />
      </Field>

      <div className="flex items-center justify-between gap-3 border-t border-neutral-800 pt-6">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-neutral-700 px-4 py-2.5 text-sm text-neutral-200 transition hover:border-neutral-500"
        >
          ← Wstecz
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
        >
          Przejdź do płatności →
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-xs font-medium text-neutral-300">
        <span>{label}</span>
        {hint && <span className="font-mono text-neutral-500">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
