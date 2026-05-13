import { calcTotals } from "./services";
import type { OrderInput } from "./schemas";

export type Order = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  description: string;
  startDate: string;
  hasMaterials: string;
  source: string;
  services: string[];
  paymentType: "deposit" | "full";
  oneTime: number;
  monthly: number;
  amountDue: number;
};

const globalRef = globalThis as unknown as {
  __orderStore?: Map<string, Order>;
};

const store: Map<string, Order> =
  globalRef.__orderStore ?? (globalRef.__orderStore = new Map());

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function createOrder(input: OrderInput): Order {
  const totals = calcTotals(input.services);
  const amountDue =
    input.paymentType === "full"
      ? Math.round(totals.oneTime * 0.95)
      : Math.round(totals.oneTime * 0.3);

  const order: Order = {
    id: makeId(),
    createdAt: new Date().toISOString(),
    name: input.name,
    email: input.email,
    phone: input.phone || undefined,
    description: input.description,
    startDate: input.startDate,
    hasMaterials: input.hasMaterials,
    source: input.source,
    services: input.services,
    paymentType: input.paymentType,
    oneTime: totals.oneTime,
    monthly: totals.monthly,
    amountDue,
  };

  store.set(order.id, order);
  return order;
}

export function listOrders(): Order[] {
  return Array.from(store.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function getOrder(id: string): Order | undefined {
  return store.get(id);
}
