import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-emerald-500">
        Ghostek Media
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
        Zbudujmy coś, co konwertuje.
      </h1>
      <p className="mt-6 max-w-xl text-neutral-400">
        Strony, branding, kampanie i platformy. Skonfiguruj zakres w 3 krokach –
        dostaniesz cenę i szacowany czas realizacji od razu.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/order"
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-500"
        >
          Złóż zamówienie →
        </Link>
        <Link
          href="/admin"
          className="inline-flex items-center justify-center rounded-md border border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-200 transition hover:border-neutral-500"
        >
          Panel admina
        </Link>
      </div>
    </main>
  );
}
