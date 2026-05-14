import { getOrder } from "@/lib/orderStore";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const { id } = await searchParams;
  const order = id ? getOrder(id) : undefined;

  return (
    <main className="mx-auto max-w-lg px-6 py-24 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/20 text-3xl text-emerald-400">
        ✓
      </div>
      <h1 className="text-3xl font-semibold tracking-tight">
        Płatność przyjęta. Działamy.
      </h1>
      <p className="mt-4 leading-relaxed text-neutral-400">
        Odezwę się do Ciebie na Instagramie w ciągu 24 godzin z potwierdzeniem
        i pierwszymi krokami.
      </p>
      {order && (
        <p className="mt-8 font-mono text-xs text-neutral-600">
          #{order.id.slice(0, 8)}
        </p>
      )}
    </main>
  );
}
