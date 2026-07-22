"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/cn";

interface CopyEmailButtonProps {
  email: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  className?: string;
  label?: string;
}

export function CopyEmailButton({
  email,
  variant = "outline",
  className,
  label,
}: CopyEmailButtonProps) {
  const { copied, copy } = useCopyToClipboard();
  const displayLabel = label ?? email;

  return (
    <Button
      type="button"
      variant={variant}
      size="md"
      onClick={() => void copy(email)}
      aria-live="polite"
      aria-label={copied ? "Email copiado" : `Copiar email ${email}`}
      className={cn("font-mono text-sm", className)}
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      <span className="truncate">{copied ? "Copiado!" : displayLabel}</span>
    </Button>
  );
}
