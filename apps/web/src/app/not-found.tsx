import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-content place-items-center px-5 py-24 text-center">
      <div className="flex flex-col items-center gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--blue-700)]">
          404
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="max-w-md text-[var(--text-secondary)]">
          O conteúdo que você procura pode ter sido movido ou nunca ter existido.
        </p>
        <Button asChild variant="primary" size="lg">
          <Link href="/">Voltar para a home</Link>
        </Button>
      </div>
    </main>
  );
}
