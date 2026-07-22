"use client";

import { useCallback, useRef, useState } from "react";

export function useCopyToClipboard(resetMs = 2000): {
  copied: boolean;
  copy: (value: string) => Promise<boolean>;
} {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (value: string): Promise<boolean> => {
      try {
        if (typeof navigator === "undefined" || !navigator.clipboard) {
          return false;
        }
        await navigator.clipboard.writeText(value);
        setCopied(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), resetMs);
        return true;
      } catch {
        setCopied(false);
        return false;
      }
    },
    [resetMs],
  );

  return { copied, copy };
}
