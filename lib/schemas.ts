import { z } from "zod";

export const briefSchema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko"),
  email: z.string().trim().email("Nieprawidłowy adres email"),
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => !v || /^[+\d][\d\s\-()]{6,}$/.test(v),
      "Nieprawidłowy numer telefonu",
    ),
  description: z
    .string()
    .trim()
    .min(30, "Opisz projekt w co najmniej 30 znakach"),
  startDate: z.enum(
    ["Jak najszybciej", "Za 2-4 tygodnie", "Za 1-2 miesiące", "Elastycznie"],
    { errorMap: () => ({ message: "Wybierz termin startu" }) },
  ),
  hasMaterials: z.enum(
    ["Tak, mam wszystko", "Częściowo", "Nie, potrzebuję pomocy"],
    { errorMap: () => ({ message: "Wybierz opcję" }) },
  ),
  source: z.string().trim().min(1, "Podaj źródło").default("Instagram"),
});

export type BriefData = z.infer<typeof briefSchema>;

export const orderSchema = briefSchema.extend({
  services: z.array(z.string().min(1)).min(1, "Wybierz co najmniej jedną usługę"),
  paymentType: z.enum(["deposit", "full"], {
    errorMap: () => ({ message: "Wybierz formę płatności" }),
  }),
});

export type OrderInput = z.infer<typeof orderSchema>;
