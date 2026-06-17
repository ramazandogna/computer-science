/**
 * THE ROOT MODULE. A Nest app is a TREE OF MODULES. Each module groups related
 * controllers and providers and declares its dependencies. The root module
 * imports feature modules — here just UsersModule.
 *
 * WHY modules: they give you clear boundaries and encapsulation. A provider is
 * only injectable in another module if its home module EXPORTS it and the other
 * module IMPORTS it. That explicit wiring is what makes large Nest apps stay
 * organized (and is the conceptual opposite of Express, where everything is just
 * a function you import wherever).
 */
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { LoggingInterceptor } from './common/logging.interceptor';

@Module({
  imports: [UsersModule],
  // Register a GLOBAL interceptor via DI. Using APP_INTERCEPTOR (instead of
  // app.useGlobalInterceptors in main.ts) means the interceptor itself can have
  // injected dependencies. It wraps every request across all modules.
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule {}
