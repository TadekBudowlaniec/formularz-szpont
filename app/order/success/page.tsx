import Link from "next/link";
import { getOrder } from "@/lib/orderStore";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const { id } = await searchParams;
  const order = id ? getOrder(id) : undefined;

  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/20 text-2xl text-emerald-400">
        ✓
      </div>
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        Dzięki, mam Twoje zamówienie!
      </h1>
      <p className="mt-4 text-neutral-400">
        Odezwiemy się w ciągu 24 godzin z potwierdzeniem terminu i kolejnymi krokami.
      </p>

      {order && (
        <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900/40 px-4 py-2 font-mono text-xs text-neutral-300">
          <span className="text-neutral-500">Nr zamówienia:</span>
          <span>#{order.id.slice(0, 8)}</span>
        </div>
      )}

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href="https://instagram.com/ghostekmedia"
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-500"
        >
          Napisz na Instagramie →
        </a>
        <Link
          href="/"
          className="rounded-md border border-neutral-700 px-5 py-3 text-sm text-neutral-200 transition hover:border-neutral-500"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </main>
  );
}
