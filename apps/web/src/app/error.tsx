"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/shared/ErrorState";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="mx-auto grid min-h-[60vh] max-w-content place-items-center px-5 py-24">
      <ErrorState
        title="Algo deu errado"
        description="Tente novamente. Se o problema continuar, envie uma mensagem pelo formulário de contato."
        action={
          <Button variant="primary" size="md" onClick={() => reset()}>
            Tentar novamente
          </Button>
        }
      />
    </main>
  );
}
