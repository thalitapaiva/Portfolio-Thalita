/**
 * Minimal, dependency-free sanitiser for user-submitted plain-text bodies.
 * Strips HTML tags, decodes a handful of common entities, collapses excessive
 * whitespace, and enforces a hard cap. Intended for the contact form message
 * body — not a substitute for a full HTML sanitiser like DOMPurify.
 */

const ENTITY_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

export interface SanitizeOptions {
  maxLength?: number;
}

export function stripHtml(input: string): string {
  return input
    // Remove script/style blocks entirely to avoid leaking their content.
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    // Strip remaining tags.
    .replace(/<[^>]*>/g, "");
}

export function decodeEntities(input: string): string {
  return input.replace(
    /&(?:amp|lt|gt|quot|#39|nbsp);/g,
    (m) => ENTITY_MAP[m] ?? m,
  );
}

export function collapseWhitespace(input: string): string {
  return input.replace(/[ \t\f\v]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

export function sanitizePlainText(
  input: string,
  options: SanitizeOptions = {},
): string {
  const { maxLength = 5_000 } = options;
  const withoutHtml = stripHtml(input);
  const decoded = decodeEntities(withoutHtml);
  const collapsed = collapseWhitespace(decoded);
  return collapsed.slice(0, maxLength);
}
