# 07 — NestJS API (DI, modules, the opinionated Express)

NestJS is "Express with a framework's opinions". Under the hood it usually runs
on Express, but it adds a **module system**, **dependency injection**,
**decorators** for routing/validation, and built-in support for guards, pipes,
interceptors, and filters. This module is intentionally **light** — the same
`users` resource as module 06, so you can directly compare *wire-it-yourself*
(Express) with *let-the-framework-wire-it* (Nest).

Do module 06 first. Nest's value only clicks once you've felt the boilerplate it
removes.

## Run it

```bash
cd 07-nestjs-api
npm install
npm run build      # tsc -> dist/
npm start          # node dist/main.js  (http://localhost:3001)
# or: npm run dev  # ts-node, no build step

curl localhost:3001/users
curl localhost:3001/users/1
curl -X POST localhost:3001/users -H 'content-type: application/json' \
  -d '{"name":"Grace Hopper","email":"grace@example.com"}'
curl -i localhost:3001/users/abc        # 400 from ParseIntPipe
curl -i -X POST localhost:3001/users -H 'content-type: application/json' -d '{}'  # 400 from the DTO
```

## Read in this order

1. [`src/main.ts`](./src/main.ts) — bootstrap; the global `ValidationPipe`; why
   `reflect-metadata` must be imported first.
2. [`tsconfig.json`](./tsconfig.json) — the two load-bearing compiler flags
   (`experimentalDecorators`, `emitDecoratorMetadata`) that make DI work.
3. [`src/app.module.ts`](./src/app.module.ts) — the root module; modules as the
   app's skeleton; registering a global interceptor via DI.
4. [`src/users/users.module.ts`](./src/users/users.module.ts) — **the heart of
   the wiring.** controllers + providers, and how DI resolves the graph.
5. [`src/users/users.controller.ts`](./src/users/users.controller.ts) — routing
   decorators + **constructor injection** (the core Nest idea).
6. [`src/users/users.service.ts`](./src/users/users.service.ts) — an
   `@Injectable` singleton; throwing built-in HTTP exceptions.
7. [`src/users/dto/create-user.dto.ts`](./src/users/dto/create-user.dto.ts) —
   validation via decorators (the Nest analog of module 06's Zod schema).
8. [`src/common/logging.interceptor.ts`](./src/common/logging.interceptor.ts) —
   an interceptor + the request lifecycle order.

## Nest vs Express — the comparison interviewers want

| Concern | Express (module 06) | NestJS (this module) |
|---------|---------------------|----------------------|
| Wiring | manual: import + compose functions | DI container resolves the graph |
| Structure | conventions you enforce | modules enforced by the framework |
| Routing | `router.get(path, ...handlers)` | `@Get()` / `@Controller()` decorators |
| Validation | middleware (Zod) you mount | global `ValidationPipe` + DTO decorators |
| Get a dependency | `import { service }` | inject by type in the constructor |
| Errors | custom `HttpError` + your handler | built-in exceptions + exception filter |
| Cross-cutting | middleware | middleware **+ guards/pipes/interceptors/filters** |
| Testing | import and call | swap providers in a testing module |

**The trade-off to articulate:** Nest gives structure, testability (DI = trivial
mocking), and batteries included — at the cost of more abstraction, decorators,
and a learning curve. Express is minimal and explicit — at the cost of you
reinventing structure on every project. Neither is "better"; pick by team size
and project longevity.

## The one concept to nail: Dependency Injection

The controller never calls `new UsersService()`. It declares
`constructor(private readonly usersService: UsersService)` and Nest reads that
parameter's **type** (via the metadata `emitDecoratorMetadata` emits), finds a
matching provider in the module, instantiates it **once** (singleton scope), and
injects it. Benefits: classes depend on abstractions not construction details,
and in tests you inject a fake. This inversion of control is *the* reason Nest
exists.

## Request lifecycle (memorize the order)

```
Middleware → Guards → Interceptors(pre) → Pipes → Route handler
           → Interceptors(post) → Exception filters → response
```

- **Guards**: authn/authz — return true/false to allow the request.
- **Pipes**: transform/validate input (`ValidationPipe`, `ParseIntPipe`).
- **Interceptors**: wrap the handler before/after (logging, caching, mapping).
- **Filters**: catch exceptions and shape the error response.

---

## Interview drills

**Q1. What is dependency injection and why does Nest use it?**
The framework constructs and supplies a class's dependencies instead of the
class building them itself. It decouples classes from concrete construction,
makes wiring declarative, and makes testing easy (inject mocks). Nest resolves
the dependency graph from module `providers` using constructor parameter types.

**Q2. What are the building blocks of a Nest app?**
Modules (group + encapsulate), controllers (handle routes), providers/services
(`@Injectable` business logic), plus pipes, guards, interceptors, and exception
filters for cross-cutting concerns.

**Q3. Pipe vs Guard vs Interceptor vs Filter?**
Pipe transforms/validates input; Guard decides if the request may proceed
(auth); Interceptor wraps the handler to add behavior before/after; Filter
handles thrown exceptions. They run in that lifecycle order.

**Q4. How does validation work and how is it like/unlike the Express module?**
A DTO class carries class-validator decorators; the global `ValidationPipe`
validates and transforms the body before the controller runs (`whitelist`
strips unknown fields, `transform` coerces types). Same "validate at the edge"
principle as module 06's Zod middleware, expressed with decorators on a class
that doubles as the type.

**Q5. What is provider scope?**
Default is singleton (one instance shared app-wide). `REQUEST` scope creates an
instance per request (needed for request-specific state, but slower);
`TRANSIENT` creates a new instance per injection.

**Q6. Why the two tsconfig flags and reflect-metadata?**
`experimentalDecorators` enables the decorator syntax; `emitDecoratorMetadata`
makes TypeScript emit constructor parameter types into the `reflect-metadata`
runtime store, which Nest reads to know what to inject. Miss any one and DI fails
with "can't resolve dependencies".

### Coding task
Add an `AuthGuard` that checks for an `x-api-key` header and returns 401 when
missing, applied only to `POST /users`. Then add an interceptor that wraps every
response in `{ data, timestamp }`. Explain where each sits in the lifecycle and
why a guard (not a pipe) is the right tool for auth.
