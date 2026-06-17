/**
 * AN INTERCEPTOR — Nest's tool for cross-cutting behavior that wraps a handler
 * BOTH before and after it runs (logging, timing, response shaping, caching).
 * This is the AOP (aspect-oriented) side of Nest.
 *
 * The request lifecycle order is worth memorizing for interviews:
 *   Middleware → Guards → Interceptors (pre) → Pipes → Handler
 *                                → Interceptors (post) → Exception filters
 *
 * Interceptors use RxJS: `next.handle()` returns an Observable of the eventual
 * response, and we `pipe(tap(...))` to run code after it emits — without
 * touching the handler itself.
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const startedAt = Date.now();

    // Everything before `return next.handle()` runs BEFORE the route handler.
    // The tap() callback runs AFTER the handler produces a response.
    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - startedAt;
        console.log(`${req.method} ${req.url} - ${ms}ms`);
      }),
    );
  }
}
