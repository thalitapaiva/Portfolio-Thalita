import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, VersioningType, Logger as NestLogger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger as PinoLogger } from "nestjs-pino";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(PinoLogger));

  const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";
  const port = Number(process.env.PORT ?? 3001);

  app.setGlobalPrefix("api");
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: undefined });

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  app.enableCors({
    origin: frontendUrl.split(",").map((o) => o.trim()),
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Thalita Paiva — Portfolio API")
    .setDescription(
      "Public NestJS API that powers Thalita Paiva's portfolio site. All endpoints are read-only except for the contact form.",
    )
    .setVersion("1.0.0")
    .addTag("portfolio")
    .addTag("projects")
    .addTag("skills")
    .addTag("social-links")
    .addTag("integrations")
    .addTag("contact")
    .addTag("health")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(port, "0.0.0.0");
  new NestLogger("Bootstrap").log(
    `Portfolio API listening on http://localhost:${port}/api (docs: /api/docs)`,
  );
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Fatal error while starting the API:", err);
  process.exit(1);
});
