import { z } from "zod";

export type ContactValidationMessages = {
  nameMin: string;
  nameMax: string;
  messageMin: string;
  messageMax: string;
  website: string;
};

export function createContactSchema(messages: ContactValidationMessages) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, messages.nameMin)
      .max(120, messages.nameMax),
    message: z
      .string()
      .trim()
      .min(10, messages.messageMin)
      .max(4000, messages.messageMax),
    website: z
      .string()
      .max(0, messages.website)
      .optional()
      .or(z.literal("")),
    turnstileToken: z.string().optional(),
  });
}

export const contactSchema = createContactSchema({
  nameMin: "Informe seu nome (mínimo 2 caracteres).",
  nameMax: "Nome muito longo.",
  messageMin: "Descreva sua mensagem (mínimo 10 caracteres).",
  messageMax: "Mensagem muito longa (máximo 4000 caracteres).",
  website: "Este campo deve ficar vazio.",
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const contactDefaultValues: ContactFormValues = {
  name: "",
  message: "",
  website: "",
  turnstileToken: "",
};
