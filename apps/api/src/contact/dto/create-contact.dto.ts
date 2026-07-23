import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from "class-validator";
import type { ContactRequestDto } from "@portfolio/types";

const trim = ({ value }: { value: unknown }): unknown =>
  typeof value === "string" ? value.trim() : value;

export class CreateContactDto implements ContactRequestDto {
  @ApiProperty({ minLength: 2, maxLength: 120 })
  @Transform(trim)
  @IsString()
  @Length(2, 120)
  name!: string;

  @ApiProperty({ minLength: 10, maxLength: 5000 })
  @Transform(trim)
  @IsString()
  @Length(10, 5000)
  message!: string;

  /**
   * Honeypot field. Real users never see this — if it is filled we silently
   * accept the request without persisting anything.
   */
  @ApiPropertyOptional({
    description: "Honeypot — leave empty. If filled, the submission is dropped silently.",
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  website?: string;

  @ApiPropertyOptional({
    description: "Cloudflare Turnstile response token (when Turnstile is enabled).",
  })
  @IsOptional()
  @IsString()
  @MaxLength(4_096)
  turnstileToken?: string;
}
