import { z } from "zod";

export const briefSchema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko"),
  email: z.string().trim().email("Nieprawidłowy adres email"),
  description: z
    .string()
    .trim()
    .min(5, "Opisz projekt w jednym zdaniu")
    .max(300, "Maksymalnie 300 znaków"),
});

export type BriefData = z.infer<typeof briefSchema>;

export const orderSchema = briefSchema.extend({
  packageId: z.enum(["starter", "growth", "brand"], {
    errorMap: () => ({ message: "Wybierz pakiet" }),
  }),
  paymentType: z.enum(["deposit", "full"], {
    errorMap: () => ({ message: "Wybierz formę płatności" }),
  }),
});

export type OrderInput = z.infer<typeof orderSchema>;
