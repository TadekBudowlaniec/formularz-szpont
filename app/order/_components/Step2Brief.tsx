"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { briefSchema, type BriefData } from "@/lib/schemas";

type Props = {
  defaultValues?: Partial<BriefData>;
  onBack: () => void;
  onSubmit: (data: BriefData) => void;
};

const inputBase =
  "w-full rounded-md border bg-neutral-900 px-3 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2";

const inputOk = `${inputBase} border-neutral-700 focus:border-emerald-600 focus:ring-emerald-600/30`;
const inputErr = `${inputBase} border-red-700 focus:border-red-600 focus:ring-red-600/30`;

export default function Step2Brief({ defaultValues, onBack, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BriefData>({
    resolver: zodResolver(briefSchema),
    defaultValues: {
      source: "Instagram",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Powiedz mi więcej o projekcie
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Krótki brief, żebym mógł się przygotować przed pierwszą rozmową.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
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

        <Field label="Numer telefonu (opcjonalnie)" error={errors.phone?.message}>
          <input
            type="tel"
            placeholder="+48 600 000 000"
            className={errors.phone ? inputErr : inputOk}
            {...register("phone")}
          />
        </Field>

        <Field label="Skąd trafiłeś?" error={errors.source?.message}>
          <input
            type="text"
            className={errors.source ? inputErr : inputOk}
            {...register("source")}
          />
        </Field>
      </div>

      <Field label="Opisz projekt w kilku zdaniach" error={errors.description?.message}>
        <textarea
          rows={5}
          placeholder="Czym się zajmujesz, czego oczekujesz, co Cię gryzie..."
          className={(errors.description ? inputErr : inputOk) + " resize-y"}
          {...register("description")}
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Kiedy chcesz zacząć?" error={errors.startDate?.message}>
          <select
            defaultValue=""
            className={errors.startDate ? inputErr : inputOk}
            {...register("startDate")}
          >
            <option value="" disabled>
              Wybierz termin
            </option>
            <option>Jak najszybciej</option>
            <option>Za 2-4 tygodnie</option>
            <option>Za 1-2 miesiące</option>
            <option>Elastycznie</option>
          </select>
        </Field>

        <Field label="Czy masz już materiały? (logo, teksty, zdjęcia)" error={errors.hasMaterials?.message}>
          <select
            defaultValue=""
            className={errors.hasMaterials ? inputErr : inputOk}
            {...register("hasMaterials")}
          >
            <option value="" disabled>
              Wybierz opcję
            </option>
            <option>Tak, mam wszystko</option>
            <option>Częściowo</option>
            <option>Nie, potrzebuję pomocy</option>
          </select>
        </Field>
      </div>

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
          Dalej →
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-neutral-300">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
