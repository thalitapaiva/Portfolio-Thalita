import { describe, expect, it } from "vitest";

import { contactSchema } from "./contact";

const baseValues = {
  name: "Thalita",
  message: "Gostaria de conversar sobre um projeto novo.",
  website: "",
  turnstileToken: "",
};

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    const parsed = contactSchema.safeParse(baseValues);
    expect(parsed.success).toBe(true);
  });

  it("rejects short names", () => {
    const res = contactSchema.safeParse({ ...baseValues, name: "A" });
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.issues[0]?.path).toEqual(["name"]);
    }
  });

  it("rejects too-short messages", () => {
    const res = contactSchema.safeParse({ ...baseValues, message: "oi" });
    expect(res.success).toBe(false);
  });

  it("flags a filled honeypot", () => {
    const res = contactSchema.safeParse({ ...baseValues, website: "http://spam" });
    expect(res.success).toBe(false);
  });

  it("allows omitted optional fields", () => {
    const { website, turnstileToken, ...rest } = baseValues;
    void website;
    void turnstileToken;
    const res = contactSchema.safeParse(rest);
    expect(res.success).toBe(true);
  });
});
