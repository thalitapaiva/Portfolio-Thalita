import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

const TURNSTILE_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
}

@Injectable()
export class TurnstileService {
  private readonly logger = new Logger(TurnstileService.name);

  constructor(private readonly config: ConfigService) {}

  isEnabled(): boolean {
    const secret = this.config.get<string>("TURNSTILE_SECRET_KEY");
    return !!secret && secret.trim().length > 0;
  }

  /**
   * Verifies a Turnstile token against Cloudflare. Returns `true` when the
   * feature is disabled (secret missing) so we don't accidentally block
   * submissions in local development.
   */
  async verify(token: string | undefined, remoteIp?: string): Promise<boolean> {
    if (!this.isEnabled()) return true;
    if (!token) return false;

    const secret = this.config.get<string>("TURNSTILE_SECRET_KEY")!;
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.append("remoteip", remoteIp);

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 5_000);
      const res = await fetch(TURNSTILE_URL, {
        method: "POST",
        body,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: controller.signal,
      }).finally(() => clearTimeout(timer));

      if (!res.ok) {
        this.logger.warn(`Turnstile verify HTTP ${res.status}`);
        return false;
      }

      const json = (await res.json()) as TurnstileResponse;
      if (!json.success) {
        this.logger.warn(
          `Turnstile verify failed: ${(json["error-codes"] ?? []).join(", ")}`,
        );
      }
      return Boolean(json.success);
    } catch (err) {
      this.logger.warn(
        `Turnstile verify network error: ${(err as Error).message}`,
      );
      return false;
    }
  }
}
