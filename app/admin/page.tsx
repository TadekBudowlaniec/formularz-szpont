import Link from "next/link";
import { listOrders } from "@/lib/orderStore";
import { formatPLN } from "@/lib/packages";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const orders = listOrders();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-500">
            Szpontlab · Admin
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Zamówienia ({orders.length})
          </h1>
        </div>
        <Link
          href="/order"
          className="rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500"
        >
          Nowe zamówienie →
        </Link>
      </header>

      <div className="mb-6 rounded-md border border-amber-900/60 bg-amber-900/10 px-4 py-3 text-xs text-amber-200">
        Storage in-memory – zamówienia znikają przy restarcie serwera devu.
        Podepniemy bazę, jak będziesz gotowy.
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-800 px-6 py-16 text-center text-sm text-neutral-500">
          Brak zamówień. Złóż jedno na{" "}
          <Link href="/order" className="text-emerald-400 hover:underline">
            /order
          </Link>
          , żeby zobaczyć je tutaj.
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => (
            <li
              key={o.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5"
            >
              <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-neutral-500">
                    #{o.id.slice(0, 8)} ·{" "}
                    {new Date(o.createdAt).toLocaleString("pl-PL")}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold">{o.name}</h2>
                  <p className="text-sm text-neutral-400">
                    <a
                      href={`mailto:${o.email}`}
                      className="hover:text-neutral-200"
                    >
                      {o.email}
                    </a>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="rounded-full bg-emerald-600/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                    Pakiet {o.packageName}
                  </span>
                  <p className="font-mono text-lg font-semibold">
                    {formatPLN(o.price)}{" "}
                    <span className="text-xs font-normal text-neutral-500">
                      netto
                    </span>
                  </p>
                  <p className="text-xs text-neutral-500">
                    {o.paymentType === "full"
                      ? `Pełna płatność · ${formatPLN(o.amountDue)}`
                      : `Zaliczka 30% · ${formatPLN(o.amountDue)}`}
                  </p>
                </div>
              </header>

              <div>
                <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  Brief
                </p>
                <p className="whitespace-pre-wrap text-sm text-neutral-200">
                  {o.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
