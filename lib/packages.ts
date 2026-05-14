export type PackageId = "starter" | "growth" | "brand";

export type Package = {
  id: PackageId;
  name: string;
  price: number;
  features: string[];
  weeksLabel: string;
  badge?: string;
};

export const PACKAGES: Package[] = [
  {
    id: "starter",
    name: "Starter",
    price: 4500,
    features: [
      "Landing page (Next.js, 1 strona)",
      "Projekt w Figma",
      "Wdrożenie na Vercel",
      "CMS (Sanity) do edycji treści",
    ],
    weeksLabel: "2 tygodnie",
  },
  {
    id: "growth",
    name: "Growth",
    price: 9500,
    features: [
      "Strona firmowa do 8 podstron",
      "Projekt w Figma",
      "Wdrożenie na Vercel",
      "CMS (Sanity)",
      "Integracja formularza kontaktowego",
      "Podstawowe SEO",
    ],
    weeksLabel: "4 tygodnie",
    badge: "✦ Najczęściej wybierany",
  },
  {
    id: "brand",
    name: "Brand",
    price: 18000,
    features: [
      "Pełna identyfikacja wizualna (logo, brand book)",
      "Strona firmowa bez limitu podstron",
      "Projekt w Figma",
      "Wdrożenie na Vercel",
      "CMS (Sanity)",
      "Kampania Meta Ads (setup)",
    ],
    weeksLabel: "6–8 tygodni",
  },
];

export function getPackage(id: string): Package | undefined {
  return PACKAGES.find((p) => p.id === id);
}

export function formatPLN(value: number): string {
  const grouped = String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped} zł`;
}

export function calcAmountDue(price: number, paymentType: "deposit" | "full"): number {
  return paymentType === "full"
    ? Math.round(price * 0.95)
    : Math.round(price * 0.3);
}
