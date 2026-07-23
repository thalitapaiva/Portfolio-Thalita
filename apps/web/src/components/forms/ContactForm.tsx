"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  contactDefaultValues,
  createContactSchema,
  type ContactFormValues,
} from "@/schemas/contact";
import { env } from "@/lib/env";
import { useLang } from "@/lib/i18n";
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
  errorDefault: string,
  successFallback: string,
): Promise<{ success: boolean; message: string }> {
  const endpoints = ["/api/contact", `${env.apiUrl}/contact`];
  let lastMessage = errorDefault;

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
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
        : data?.message ?? (res.ok ? successFallback : lastMessage);

      if (res.ok && data?.success !== false) {
        return { success: true, message };
      }

      lastMessage = message;
      if (res.status >= 500 || res.status === 404) continue;
      return { success: false, message };
    } catch {
      continue;
    }
  }

  return { success: false, message: lastMessage };
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const { t, lang } = useLang();
  const [state, setState] = React.useState<SubmitState>({ status: "idle" });
  const schema = React.useMemo(
    () => createContactSchema(t.contact.validation),
    [t.contact.validation],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: contactDefaultValues,
    mode: "onBlur",
  });

  const submitting = state.status === "submitting" || isSubmitting;

  const handler = handleSubmit(async (values) => {
    if (values.website && values.website.length > 0) {
      setState({ status: "success", message: t.contact.successHoneypot });
      return;
    }

    setState({ status: "submitting" });
    try {
      const result = await (onSubmit
        ? onSubmit(values)
        : defaultSubmit(values, t.contact.errorDefault, t.contact.successDefault));
      if (result.success) {
        setState({
          status: "success",
          message: result.message || t.contact.successDefault,
        });
        reset(contactDefaultValues);
      } else {
        setState({
          status: "error",
          message: result.message || t.contact.errorDefault,
        });
      }
    } catch {
      setState({
        status: "error",
        message: t.contact.errorConnection,
      });
    }
  });

  React.useEffect(() => {
    setState({ status: "idle" });
  }, [lang]);

  return (
    <form
      onSubmit={handler}
      noValidate
      aria-describedby="contact-status"
      className="grid gap-5"
    >
      <FormField
        id="name"
        label={t.contact.name}
        required
        error={errors.name?.message}
        input={
          <Input
            id="name"
            autoComplete="name"
            placeholder={t.contact.namePlaceholder}
            invalid={!!errors.name}
            {...register("name")}
          />
        }
      />

      <FormField
        id="message"
        label={t.contact.message}
        required
        error={errors.message?.message}
        input={
          <Textarea
            id="message"
            placeholder={t.contact.messagePlaceholder}
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
          aria-label={t.contact.antiSpam}
        />
      )}

      <div className="pt-1">
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t.contact.sending}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              {t.contact.send}
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
