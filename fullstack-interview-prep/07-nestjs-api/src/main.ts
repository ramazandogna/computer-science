/**
 * THE BOOTSTRAP. Compare with the Express module's app.js: there you wired the
 * middleware pipeline by hand. Here Nest assembles the app from the module
 * graph, and cross-cutting concerns (validation, etc.) are applied declaratively.
 */

// MUST be the first import. Nest's dependency injection reads type metadata that
// TypeScript emits (via emitDecoratorMetadata) into this reflect-metadata
// polyfill at runtime. Without it, DI by type can't work.
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestFactory builds the whole app from the root module's dependency graph.
  const app = await NestFactory.create(AppModule);

  // A GLOBAL pipe: every incoming request body is validated/transformed against
  // the DTO's class-validator decorators BEFORE it reaches a controller. This is
  // the Nest equivalent of the Express module's `validate` middleware — but
  // declared once and applied everywhere.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip properties not declared in the DTO
      forbidNonWhitelisted: true, // 400 if the client sends unknown properties
      transform: true, // coerce payloads to the DTO class + types (e.g. "3" -> 3)
    }),
  );

  await app.listen(3001);
  console.log('NestJS API listening on http://localhost:3001');
}

bootstrap();
