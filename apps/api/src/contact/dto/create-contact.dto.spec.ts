import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { CreateContactDto } from "./create-contact.dto";

const base = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  subject: "Hello",
  message: "This is a valid message with enough characters.",
};

async function validateDto(input: unknown) {
  const dto = plainToInstance(CreateContactDto, input);
  const errors = await validate(dto, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });
  return { dto, errors };
}

describe("CreateContactDto", () => {
  it("accepts a valid payload", async () => {
    const { errors } = await validateDto(base);
    expect(errors).toHaveLength(0);
  });

  it("trims whitespace on string fields", async () => {
    const { dto, errors } = await validateDto({
      ...base,
      name: "  Ada  ",
      subject: "  Hello  ",
    });
    expect(errors).toHaveLength(0);
    expect(dto.name).toBe("Ada");
    expect(dto.subject).toBe("Hello");
  });

  it("rejects when email is not a valid address", async () => {
    const { errors } = await validateDto({ ...base, email: "not-an-email" });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === "email")).toBe(true);
  });

  it("rejects when message is too short", async () => {
    const { errors } = await validateDto({ ...base, message: "short" });
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === "message")).toBe(true);
  });

  it("rejects when required fields are missing", async () => {
    const { errors } = await validateDto({});
    const props = errors.map((e) => e.property).sort();
    expect(props).toEqual(
      expect.arrayContaining(["email", "message", "name", "subject"]),
    );
  });

  it("allows the honeypot 'website' field to be present and captures it", async () => {
    const { dto, errors } = await validateDto({
      ...base,
      website: "http://bot.example",
    });
    expect(errors).toHaveLength(0);
    expect(dto.website).toBe("http://bot.example");
  });

  it("allows an optional turnstileToken", async () => {
    const { dto, errors } = await validateDto({
      ...base,
      turnstileToken: "token-value",
    });
    expect(errors).toHaveLength(0);
    expect(dto.turnstileToken).toBe("token-value");
  });

  it("rejects unknown fields when forbidNonWhitelisted is enabled", async () => {
    const { errors } = await validateDto({ ...base, extra: "nope" });
    expect(errors.some((e) => e.property === "extra")).toBe(true);
  });
});
