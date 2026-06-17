/**
 * THE CONTROLLER — the HTTP layer. Decorators map HTTP routes to methods, and
 * the framework extracts params/body for you. Compare to the Express module:
 * there you assembled `router.get('/:id', validate(...), asyncHandler(...))` by
 * hand; here @Get(':id') + the global ValidationPipe + the param decorators do
 * the same wiring declaratively.
 *
 * THE KEY IDEA — DEPENDENCY INJECTION: this controller does NOT `new
 * UsersService()`. It declares a constructor parameter of type UsersService and
 * Nest's container INJECTS the shared instance. This inversion of control is the
 * heart of Nest: classes declare what they need; the framework supplies it. It
 * makes everything trivially mockable in tests (inject a fake service).
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // every route here is prefixed with /users
export class UsersController {
  // `private readonly usersService` is shorthand: TypeScript declares the field
  // AND assigns the injected instance. This is the canonical Nest DI pattern.
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll(); // returning a value => 200 + JSON
  }

  @Get(':id')
  findOne(
    // ParseIntPipe validates + coerces the ":id" string to a number, returning
    // a 400 for non-numeric input — a focused, per-param version of the
    // edge-validation idea. (The DTO/ValidationPipe handles bodies.)
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(201) // override the default 200 for a creation
  create(@Body() dto: CreateUserDto) {
    // `dto` is already validated and transformed by the global ValidationPipe.
    return this.usersService.create(dto);
  }
}
