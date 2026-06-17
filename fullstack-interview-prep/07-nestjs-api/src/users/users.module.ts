/**
 * THE FEATURE MODULE — wires the users slice together. It declares which
 * controller(s) handle routes and which provider(s) are available for injection
 * WITHIN this module.
 *
 * `controllers` and `providers` is all the wiring DI needs: Nest sees that
 * UsersController's constructor wants a UsersService, finds UsersService in this
 * module's providers, instantiates it once, and injects it. If another module
 * needed UsersService, we'd add it to an `exports: []` array here and `imports`
 * this module there — explicit, encapsulated sharing.
 */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // exports: [UsersService], // <- uncomment to let other modules inject it
})
export class UsersModule {}
