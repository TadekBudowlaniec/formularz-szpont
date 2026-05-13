export type CategoryId =
  | "STRONY"
  | "BRANDING"
  | "KAMPANIE"
  | "PLATFORMY"
  | "DODATKI";

export type Service = {
  id: string;
  name: string;
  price: number;
  days: number;
  recurring?: boolean;
  category: CategoryId;
};

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "STRONY", label: "Strony internetowe" },
  { id: "BRANDING", label: "Branding" },
  { id: "KAMPANIE", label: "Kampanie" },
  { id: "PLATFORMY", label: "Platformy i aplikacje" },
  { id: "DODATKI", label: "Dodatki" },
];

export const SERVICES: Service[] = [
  { id: "landing", name: "Landing page", price: 4500, days: 10, category: "STRONY" },
  { id: "company-site", name: "Strona firmowa (do 10 podstron)", price: 8500, days: 20, category: "STRONY" },
  { id: "shop", name: "Sklep internetowy", price: 12000, days: 30, category: "STRONY" },

  { id: "logo", name: "Logo + identyfikacja wizualna", price: 3500, days: 10, category: "BRANDING" },
  { id: "brand-book", name: "Brand book (guidelines)", price: 2000, days: 7, category: "BRANDING" },

  { id: "meta-ads", name: "Setup kampanii Meta Ads", price: 2500, days: 5, category: "KAMPANIE" },
  { id: "google-ads", name: "Setup kampanii Google Ads", price: 2500, days: 5, category: "KAMPANIE" },
  { id: "ads-mgmt", name: "Zarządzanie kampanią", price: 1500, days: 0, recurring: true, category: "KAMPANIE" },

  { id: "webapp", name: "Web app / platforma", price: 15000, days: 45, category: "PLATFORMY" },
  { id: "mobile", name: "Aplikacja mobilna (React Native)", price: 25000, days: 60, category: "PLATFORMY" },

  { id: "copy", name: "Copywriting (cała strona)", price: 1200, days: 5, category: "DODATKI" },
  { id: "seo", name: "SEO podstawowe", price: 1500, days: 5, category: "DODATKI" },
  { id: "motion", name: "Animacje i motion", price: 2000, days: 7, category: "DODATKI" },
  { id: "cms", name: "CMS + szkolenie", price: 800, days: 3, category: "DODATKI" },
  { id: "support", name: "Opieka techniczna", price: 400, days: 0, recurring: true, category: "DODATKI" },
];

export function getService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function getServicesByIds(ids: string[]): Service[] {
  return ids
    .map((id) => getService(id))
    .filter((s): s is Service => Boolean(s));
}

export type Totals = {
  oneTime: number;
  monthly: number;
  totalDays: number;
  weeks: number;
};

export function calcTotals(ids: string[]): Totals {
  const items = getServicesByIds(ids);
  let oneTime = 0;
  let monthly = 0;
  let totalDays = 0;
  for (const s of items) {
    if (s.recurring) monthly += s.price;
    else oneTime += s.price;
    totalDays += s.days;
  }
  const weeks = totalDays === 0 ? 0 : Math.max(1, Math.ceil(totalDays / 5));
  return { oneTime, monthly, totalDays, weeks };
}

export function formatPLN(value: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(value);
}
