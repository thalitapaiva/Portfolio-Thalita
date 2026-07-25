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
    description: "Como os dados deste portfólio são tratados.",
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
            Este site é um portfólio pessoal. Não há formulário de contato nem coleta
            direta de dados pessoais dos visitantes.
          </p>
          <p>
            Podem existir apenas dados técnicos anônimos de hospedagem (como logs de
            acesso do provedor) para funcionamento e segurança do site. Não há
            newsletters nem uso de dados para marketing.
          </p>
          <p>
            Para falar comigo, use o{" "}
            <Link
              href="https://www.linkedin.com/in/thalita-paiva-1301a122b/"
              className="underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
            .
          </p>
        </div>
      </main>
      <SiteFooter
        fullName={profile?.fullName}
        socialLinks={socialLinks}
      />
    </>
  );
}
