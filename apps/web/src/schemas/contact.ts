import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome (mínimo 2 caracteres).")
    .max(120, "Nome muito longo."),
  message: z
    .string()
    .trim()
    .min(10, "Descreva sua mensagem (mínimo 10 caracteres).")
    .max(4000, "Mensagem muito longa (máximo 4000 caracteres)."),
  website: z
    .string()
    .max(0, "Este campo deve ficar vazio.")
    .optional()
    .or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const contactDefaultValues: ContactFormValues = {
  name: "",
  message: "",
  website: "",
  turnstileToken: "",
};
