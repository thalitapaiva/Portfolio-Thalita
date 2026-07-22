import { describe, expect, it } from "vitest";

import { contactSchema } from "./contact";

const baseValues = {
  name: "Thalita",
  email: "thalita@example.com",
  subject: "Olá!",
  message: "Gostaria de conversar sobre um projeto novo.",
  company: "",
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

  it("rejects invalid email", () => {
    const res = contactSchema.safeParse({ ...baseValues, email: "not-an-email" });
    expect(res.success).toBe(false);
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
    const { company, website, turnstileToken, ...rest } = baseValues;
    void company;
    void website;
    void turnstileToken;
    const res = contactSchema.safeParse(rest);
    expect(res.success).toBe(true);
  });
});
