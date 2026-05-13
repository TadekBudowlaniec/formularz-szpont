"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  calcTotals,
  formatPLN,
  getServicesByIds,
} from "@/lib/services";
import type { BriefData } from "@/lib/schemas";

type Props = {
  selectedIds: string[];
  brief: BriefData;
  onBack: () => void;
};

type PaymentType = "deposit" | "full";

export default function Step3Summary({ selectedIds, brief, onBack }: Props) {
  const router = useRouter();
  const [paymentType, setPaymentType] = useState<PaymentType | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const items = getServicesByIds(selectedIds);
  const totals = calcTotals(selectedIds);

  const fullPrice = Math.round(totals.oneTime * 0.95);
  const fullSavings = totals.oneTime - fullPrice;
  const depositPrice = Math.round(totals.oneTime * 0.3);

  async function submit() {
    if (!paymentType) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...brief,
          services: selectedIds,
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
          Sprawdź szczegóły i wybierz formę płatności.
        </p>
      </header>

      <section className="rounded-xl border border-neutral-800 bg-neutral-900/40">
        <header className="border-b border-neutral-800 px-5 py-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Wybrane usługi
          </h2>
        </header>
        <ul className="divide-y divide-neutral-800">
          {items.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between gap-3 px-5 py-3 text-sm"
            >
              <span className="text-neutral-100">
                {s.name}
                {s.recurring && (
                  <span className="ml-2 text-xs text-neutral-500">/mies.</span>
                )}
              </span>
              <span className="font-mono text-neutral-200">
                {formatPLN(s.price)}
              </span>
            </li>
          ))}
        </ul>
        <footer className="space-y-1 border-t border-neutral-800 px-5 py-3 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-400">Jednorazowo</span>
            <span className="font-mono font-semibold">
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
        </footer>
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
            disabled={totals.oneTime === 0}
          />
          <PaymentCard
            active={paymentType === "full"}
            onClick={() => setPaymentType("full")}
            title="Pełna płatność"
            description={`-5% rabatu, oszczędzasz ${formatPLN(fullSavings)}`}
            amountLabel="Teraz zapłacisz"
            amount={formatPLN(fullPrice)}
            badge="Najlepsza cena"
            disabled={totals.oneTime === 0}
          />
        </div>
        {totals.oneTime === 0 && (
          <p className="mt-3 text-xs text-neutral-500">
            Twoje zamówienie składa się tylko z usług miesięcznych – płatność za
            pierwszy miesiąc ustalimy w wiadomości.
          </p>
        )}
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
          className="rounded-md border border-neutral-700 px-4 py-2.5 text-sm text-neutral-200 transition hover:border-neutral-500 disabled:opacity-50"
        >
          ← Wstecz
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={!paymentType || submitting}
          className="rounded-md bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
        >
          {submitting ? "Wysyłanie..." : "Złóż zamówienie"}
        </button>
      </div>

      <p className="pt-2 text-center text-xs text-neutral-500">
        Masz pytania? Napisz do mnie na Instagramie{" "}
        <a
          href="https://instagram.com/ghostekmedia"
          target="_blank"
          rel="noreferrer"
          className="text-emerald-400 hover:underline"
        >
          @ghostekmedia
        </a>
      </p>
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
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description: string;
  amountLabel: string;
  amount: string;
  badge?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "relative flex flex-col gap-3 rounded-lg border p-5 text-left transition",
        disabled
          ? "cursor-not-allowed border-neutral-800 bg-neutral-900/30 opacity-50"
          : active
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
