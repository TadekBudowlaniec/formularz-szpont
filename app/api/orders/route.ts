import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/schemas";
import { createOrder, listOrders } from "@/lib/orderStore";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowy JSON" }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Walidacja nie powiodła się", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const order = createOrder(parsed.data);
  return NextResponse.json({ id: order.id }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ orders: listOrders() });
}
