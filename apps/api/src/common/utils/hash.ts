import { createHash } from "node:crypto";

/**
 * Hashes an IP address (or any short identifier) with SHA-256 + a per-process
 * salt so we can rate-limit / audit contact submissions without storing raw
 * IPs. If `IP_HASH_SALT` is not set we fall back to a stable per-boot random
 * value; this is intentional — we do not want to store recoverable IPs at all.
 */
const RUNTIME_SALT =
  process.env.IP_HASH_SALT ??
  createHash("sha256")
    .update(`${process.pid}:${Date.now()}:${Math.random()}`)
    .digest("hex")
    .slice(0, 32);

export function hashIp(ip: string | undefined | null): string | undefined {
  if (!ip) return undefined;
  return createHash("sha256").update(`${RUNTIME_SALT}:${ip}`).digest("hex");
}
