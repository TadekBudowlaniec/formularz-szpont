"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calcAmountDue, formatPLN, getPackage, type PackageId } from "@/lib/packages";
import type { BriefData } from "@/lib/schemas";

type Props = {
  packageId: PackageId;
  brief: BriefData;
  onBack: () => void;
};

type PaymentType = "deposit" | "full";

export default function Step3Summary({ packageId, brief, onBack }: Props) {
  const router = useRouter();
  const [paymentType, setPaymentType] = useState<PaymentType>("deposit");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pkg = getPackage(packageId);
  if (!pkg) return null;

  const fullPrice = calcAmountDue(pkg.price, "full");
  const fullSavings = pkg.price - fullPrice;
  const depositPrice = calcAmountDue(pkg.price, "deposit");
  const amountDue = calcAmountDue(pkg.price, paymentType);

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...brief,
          packageId,
          paymentType,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Nie udało się zapisać zamówienia");
      }
      const { id } = await res.json();
      router.push(`/order/success?id=${encodeURIComponent(id)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Coś poszło nie tak");
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Podsumowanie zamówienia
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Sprawdź pakiet i wybierz formę płatności.
        </p>
      </header>

      <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
              Pakiet {pkg.name}
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Czas realizacji: {pkg.weeksLabel}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-2xl font-semibold">
              {formatPLN(pkg.price)}
            </p>
            <p className="text-xs text-neutral-500">netto</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-neutral-200">
              <span className="mt-0.5 shrink-0 font-semibold text-emerald-500">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-500">
          Forma płatności
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          <PaymentCard
            active={paymentType === "deposit"}
            onClick={() => setPaymentType("deposit")}
            title="Zaliczka 30%"
            description="Rezerwujesz termin, resztę płacisz po akceptacji projektu."
            amountLabel="Teraz zapłacisz"
            amount={formatPLN(depositPrice)}
          />
          <PaymentCard
            active={paymentType === "full"}
            onClick={() => setPaymentType("full")}
            title="Pełna płatność"
            description={`-5% rabatu, oszczędzasz ${formatPLN(fullSavings)}`}
            amountLabel="Teraz zapłacisz"
            amount={formatPLN(fullPrice)}
            badge={`Oszczędzasz ${formatPLN(fullSavings)}`}
          />
        </div>
      </section>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-900/30 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-neutral-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="px-2 py-1 text-xs text-neutral-500 transition hover:text-neutral-300 disabled:opacity-50"
        >
          ← Wróć
        </button>
        <div className="flex flex-col items-stretch sm:items-end">
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="rounded-md bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
          >
            {submitting
              ? "Przygotowuję zamówienie..."
              : `Zapłać ${formatPLN(amountDue)} →`}
          </button>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-neutral-500">
            <span>🔒</span>
            <span>Bezpieczna płatność · Stripe · SSL</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function PaymentCard({
  active,
  onClick,
  title,
  description,
  amountLabel,
  amount,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description: string;
  amountLabel: string;
  amount: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative flex flex-col gap-3 rounded-lg border p-5 text-left transition",
        active
          ? "border-emerald-600 bg-emerald-600/5"
          : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700",
      ].join(" ")}
    >
      {badge && (
        <span className="absolute right-3 top-3 rounded bg-emerald-600/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
          {badge}
        </span>
      )}
      <span className="text-base font-semibold">{title}</span>
      <span className="text-xs text-neutral-400">{description}</span>
      <span className="mt-2 flex items-baseline justify-between">
        <span className="text-xs text-neutral-500">{amountLabel}</span>
        <span className="font-mono text-lg font-semibold">{amount}</span>
      </span>
    </button>
  );
}
