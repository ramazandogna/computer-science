/**
 * The domain entity — the shape of a user in our system. In a TypeORM/Prisma
 * app this would carry persistence decorators; here it's a plain type so the
 * module stays light and framework-agnostic.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
