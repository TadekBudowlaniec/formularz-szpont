import { calcAmountDue, getPackage } from "./packages";
import type { OrderInput } from "./schemas";

export type Order = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  description: string;
  packageId: "starter" | "growth" | "brand";
  packageName: string;
  price: number;
  paymentType: "deposit" | "full";
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
  const pkg = getPackage(input.packageId);
  if (!pkg) {
    throw new Error(`Nieznany pakiet: ${input.packageId}`);
  }
  const amountDue = calcAmountDue(pkg.price, input.paymentType);

  const order: Order = {
    id: makeId(),
    createdAt: new Date().toISOString(),
    name: input.name,
    email: input.email,
    description: input.description,
    packageId: pkg.id,
    packageName: pkg.name,
    price: pkg.price,
    paymentType: input.paymentType,
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
