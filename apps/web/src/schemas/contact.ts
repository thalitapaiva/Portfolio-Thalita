import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome (mínimo 2 caracteres).")
    .max(120, "Nome muito longo."),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu email.")
    .email("Email inválido."),
  subject: z
    .string()
    .trim()
    .min(3, "Assunto muito curto.")
    .max(160, "Assunto muito longo."),
  message: z
    .string()
    .trim()
    .min(10, "Descreva sua mensagem (mínimo 10 caracteres).")
    .max(4000, "Mensagem muito longa (máximo 4000 caracteres)."),
  company: z
    .string()
    .trim()
    .max(160, "Empresa muito longa.")
    .optional()
    .or(z.literal("")),
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
  email: "",
  subject: "",
  message: "",
  company: "",
  website: "",
  turnstileToken: "",
};
