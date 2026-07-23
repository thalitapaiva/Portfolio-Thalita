import type { Metadata } from "next";
import Link from "next/link";

import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await api.getProfile();
  return buildMetadata({
    profile,
    title: "Privacidade",
    description:
      "Como os dados enviados pelo formulário de contato deste portfólio são tratados.",
    path: "/privacidade",
  });
}

export default async function PrivacyPage() {
  const [profile, github, socialLinks] = await Promise.all([
    api.getProfile(),
    api.getGithub(),
    api.getSocialLinks(),
  ]);

  return (
    <>
      <SiteHeader fullName={profile?.fullName} githubUrl={github?.htmlUrl} />
      <main className="mx-auto max-w-content px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--blue-700)]">
          Privacidade
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          Como os seus dados são tratados
        </h1>

        <div className="prose prose-slate mt-8 max-w-none text-[15px] leading-relaxed text-[var(--text-primary)]">
          <p>
            Este site é um portfólio pessoal. Os únicos dados coletados diretamente são
            aqueles enviados por você no formulário de contato: nome, email, empresa
            (opcional), assunto e mensagem.
          </p>
          <p>
            Esses dados são armazenados apenas para viabilizar a resposta ao seu contato.
            Não são compartilhados com terceiros, não alimentam newsletters e não são
            usados para fins de marketing.
          </p>
          <p>
            Para solicitar remoção dos seus dados, entre em contato pelo mesmo email
            informado nas seções{" "}
            <Link href="/#contato" className="underline underline-offset-4">
              Contato
            </Link>{" "}
            e{" "}
            <Link href="/#linkedin" className="underline underline-offset-4">
              LinkedIn
            </Link>
            .
          </p>
        </div>
      </main>
      <SiteFooter
        fullName={profile?.fullName}
        shortPhrase={profile?.headline}
        socialLinks={socialLinks}
      />
    </>
  );
}
