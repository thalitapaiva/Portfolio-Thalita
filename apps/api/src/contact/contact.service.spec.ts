import { BadRequestException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";

import { ContactService } from "./contact.service";
import { EmailService } from "./email/email.service";
import { TurnstileService } from "./turnstile.service";
import { PrismaService } from "../prisma/prisma.service";
import type { CreateContactDto } from "./dto/create-contact.dto";

describe("ContactService", () => {
  let service: ContactService;
  let prisma: { contactMessage: { create: jest.Mock } };
  let email: { send: jest.Mock };
  let turnstile: { isEnabled: jest.Mock; verify: jest.Mock };

  const baseDto: CreateContactDto = {
    name: "Ada Lovelace",
    email: "ADA@Example.com",
    subject: "Hello there",
    message: "This is a message long enough to pass validation.",
  };

  beforeEach(async () => {
    prisma = {
      contactMessage: {
        create: jest
          .fn()
          .mockResolvedValue({ id: "test-id", createdAt: new Date() }),
      },
    };
    email = { send: jest.fn().mockResolvedValue(undefined) };
    turnstile = {
      isEnabled: jest.fn().mockReturnValue(false),
      verify: jest.fn().mockResolvedValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        { provide: PrismaService, useValue: prisma },
        { provide: EmailService, useValue: email },
        { provide: TurnstileService, useValue: turnstile },
        {
          provide: ConfigService,
          useValue: {
            get: (k: string) =>
              ({
                EMAIL_FROM: "portfolio@example.com",
                EMAIL_TO: "contact@example.com",
              } as Record<string, string>)[k],
          },
        },
      ],
    }).compile();

    service = module.get(ContactService);
  });

  it("returns silent success and skips persistence when honeypot is filled", async () => {
    const res = await service.submit({ ...baseDto, website: "http://bot.example" });
    expect(res.success).toBe(true);
    expect(prisma.contactMessage.create).not.toHaveBeenCalled();
    expect(email.send).not.toHaveBeenCalled();
  });

  it("persists a sanitised message, lowercases the email and sends an email", async () => {
    const res = await service.submit(
      {
        ...baseDto,
        message: "<script>alert(1)</script>Legit body copy that is long enough.",
        subject: "  Padded  ",
      },
      { ip: "1.2.3.4", userAgent: "jest" },
    );

    expect(res.success).toBe(true);
    expect(prisma.contactMessage.create).toHaveBeenCalledTimes(1);
    const args = prisma.contactMessage.create.mock.calls[0]?.[0]?.data;
    expect(args.email).toBe("ada@example.com");
    expect(args.message).not.toMatch(/<script>/i);
    expect(args.message).toContain("Legit body copy");
    expect(args.ipHash).toBeDefined();
    expect(args.ipHash).not.toBe("1.2.3.4");
    expect(args.userAgent).toBe("jest");
    expect(email.send).toHaveBeenCalledTimes(1);
  });

  it("rejects submissions when Turnstile is enabled but verification fails", async () => {
    turnstile.isEnabled.mockReturnValue(true);
    turnstile.verify.mockResolvedValue(false);
    await expect(
      service.submit({ ...baseDto, turnstileToken: "bad" }, {}),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.contactMessage.create).not.toHaveBeenCalled();
  });

  it("passes through when Turnstile is enabled and verification succeeds", async () => {
    turnstile.isEnabled.mockReturnValue(true);
    turnstile.verify.mockResolvedValue(true);
    const res = await service.submit(
      { ...baseDto, turnstileToken: "good" },
      { ip: "1.1.1.1" },
    );
    expect(res.success).toBe(true);
    expect(turnstile.verify).toHaveBeenCalledWith("good", "1.1.1.1");
    expect(prisma.contactMessage.create).toHaveBeenCalled();
  });

  it("rejects when message becomes too short after HTML stripping", async () => {
    await expect(
      service.submit(
        {
          ...baseDto,
          message: "<p><b><i></i></b>Hi</p>", // sanitises to "Hi"
        },
        {},
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it("still returns success even if email delivery fails after persisting", async () => {
    email.send.mockRejectedValueOnce(new Error("SMTP down"));
    const res = await service.submit(baseDto, {});
    expect(res.success).toBe(true);
    expect(prisma.contactMessage.create).toHaveBeenCalled();
  });
});
