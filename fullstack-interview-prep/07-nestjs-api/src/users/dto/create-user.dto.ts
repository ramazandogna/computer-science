/**
 * A DTO (Data Transfer Object) — the validated shape of an incoming request
 * body. The class-validator decorators are READ at runtime by the global
 * ValidationPipe (configured in main.ts). If the body doesn't satisfy them, the
 * client gets a 400 with field-level messages and the controller never runs.
 *
 * This is the Nest equivalent of the Express module's Zod schema. Note the
 * difference in flavor: Nest uses decorators on a class; the data's TYPE and its
 * VALIDATION rules live together, and the same class doubles as the TypeScript
 * type for `req.body`.
 */
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'name must be at least 2 characters' })
  name!: string;

  @IsEmail({}, { message: 'must be a valid email' })
  email!: string;

  // Optional with a constrained set of values. If omitted, the service defaults
  // it — see users.service.ts.
  @IsOptional()
  @IsIn(['admin', 'user'])
  role?: 'admin' | 'user';
}
