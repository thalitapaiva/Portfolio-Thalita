import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "JSON inválido." },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Dados inválidos. Revise o formulário." },
      { status: 400 },
    );
  }

  // Honeypot
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({
      success: true,
      message: "Mensagem recebida. Obrigada pelo contato!",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.EMAIL_TO ?? "thfonp@gmail.com";
  const from =
    process.env.EMAIL_FROM ?? "Portfólio Thalita <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY missing");
    return NextResponse.json(
      {
        success: false,
        message: "Envio de email não configurado no servidor.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const subject = `Mensagem de ${parsed.data.name}`;
  const text = [
    "Novo contato pelo portfólio de Thalita Paiva",
    "",
    `Nome: ${parsed.data.name}`,
    "",
    "Mensagem:",
    parsed.data.message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `[Portfólio Thalita] ${subject}`,
      text,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { success: false, message: "Não foi possível enviar agora. Tente de novo." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { success: false, message: "Erro ao enviar. Tente novamente em instantes." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Mensagem recebida com sucesso! Obrigada pelo contato.",
  });
}
