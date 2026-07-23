"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactDefaultValues, contactSchema, type ContactFormValues } from "@/schemas/contact";
import { env } from "@/lib/env";
import { cn } from "@/lib/cn";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

interface ContactFormProps {
  onSubmit?: (values: ContactFormValues) => Promise<{ success: boolean; message: string }>;
}

async function defaultSubmit(
  values: ContactFormValues,
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${env.apiUrl}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: values.name.trim(),
      message: values.message.trim(),
      website: values.website?.trim() || undefined,
      turnstileToken: values.turnstileToken || undefined,
    }),
  });

  let data: { success?: boolean; message?: string | string[] } = {};
  try {
    data = await res.json();
  } catch {
    // ignore
  }

  const message = Array.isArray(data?.message)
    ? data.message.join(", ")
    : data?.message ?? (res.ok ? "Mensagem enviada!" : "Não foi possível enviar sua mensagem.");

  return { success: res.ok && data?.success !== false, message };
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [state, setState] = React.useState<SubmitState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaultValues,
    mode: "onBlur",
  });

  const submitting = state.status === "submitting" || isSubmitting;

  const handler = handleSubmit(async (values) => {
    if (values.website && values.website.length > 0) {
      setState({ status: "success", message: "Mensagem recebida." });
      return;
    }

    setState({ status: "submitting" });
    try {
      const result = await (onSubmit ?? defaultSubmit)(values);
      if (result.success) {
        setState({
          status: "success",
          message: result.message || "Recebi sua mensagem. Obrigada!",
        });
        reset(contactDefaultValues);
      } else {
        setState({
          status: "error",
          message: result.message || "Não foi possível enviar sua mensagem.",
        });
      }
    } catch {
      setState({
        status: "error",
        message: "Erro de conexão. Verifique sua internet e tente novamente.",
      });
    }
  });

  return (
    <form
      onSubmit={handler}
      noValidate
      aria-describedby="contact-status"
      className="grid gap-5"
    >
      <FormField
        id="name"
        label="Nome"
        required
        error={errors.name?.message}
        input={
          <Input
            id="name"
            autoComplete="name"
            placeholder="Nome"
            invalid={!!errors.name}
            {...register("name")}
          />
        }
      />

      <FormField
        id="message"
        label="Mensagem"
        required
        error={errors.message?.message}
        input={
          <Textarea
            id="message"
            placeholder="Sua mensagem"
            rows={5}
            invalid={!!errors.message}
            {...register("message")}
          />
        }
      />

      <div aria-hidden="true" className="hidden" tabIndex={-1}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {env.turnstileSiteKey && (
        <div
          className="cf-turnstile"
          data-sitekey={env.turnstileSiteKey}
          data-callback="onTurnstileSuccess"
          data-theme="light"
          aria-label="Verificação anti-spam"
        />
      )}

      <div className="pt-1">
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Enviando…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Enviar mensagem
            </>
          )}
        </Button>
      </div>

      <div id="contact-status" role="status" aria-live="polite" className="min-h-[1.25rem]">
        {state.status === "success" && (
          <StatusBanner
            tone="success"
            icon={<CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
            message={state.message}
          />
        )}
        {state.status === "error" && (
          <StatusBanner
            tone="error"
            icon={<AlertCircle className="h-4 w-4" aria-hidden="true" />}
            message={state.message}
          />
        )}
      </div>
    </form>
  );
}

function FormField({
  id,
  label,
  required,
  hint,
  error,
  input,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  input: React.ReactNode;
}) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  const enhancedInput = React.isValidElement(input)
    ? React.cloneElement(input as React.ReactElement<{ "aria-describedby"?: string }>, {
        "aria-describedby": describedBy,
      })
    : input;

  return (
    <div className="grid gap-1.5">
      <div className="flex items-baseline justify-between">
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        {hint && !error && (
          <span id={hintId} className="text-xs text-[var(--text-secondary)]">
            {hint}
          </span>
        )}
      </div>
      {enhancedInput}
      {error && (
        <p id={errorId} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function StatusBanner({
  tone,
  icon,
  message,
}: {
  tone: "success" | "error";
  icon: React.ReactNode;
  message: string;
}) {
  return (
    <p
      className={cn(
        "mt-1 inline-flex items-center gap-2 rounded-[10px] border px-3 py-2 text-sm",
        tone === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
          : "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200",
      )}
    >
      {icon}
      {message}
    </p>
  );
}
