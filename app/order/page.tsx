import OrderFunnel from "./_components/OrderFunnel";
import ScarcityBar from "./_components/ScarcityBar";
import Link from "next/link";

export default function OrderPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
            <span className="text-emerald-500">ghostek</span>media
          </Link>
          <span className="text-xs text-neutral-500">Zamówienie</span>
        </div>
        <ScarcityBar />
      </header>
      <OrderFunnel />
    </div>
  );
}
