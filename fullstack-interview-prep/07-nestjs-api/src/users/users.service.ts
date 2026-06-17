/**
 * THE SERVICE — business logic, marked @Injectable so Nest's DI container can
 * construct it and hand it to anyone who asks for it by type (the controller).
 * Same responsibility as the Express service: rules + data, no HTTP.
 *
 * By default a provider is a SINGLETON — Nest creates ONE instance and shares it
 * everywhere it's injected. That's why the in-memory array below persists across
 * requests. (Other scopes exist: REQUEST, TRANSIENT — mention them if asked.)
 */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  // Toy in-memory store standing in for a database/repository.
  private readonly users: User[] = [
    { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'admin' },
    { id: 2, name: 'Alan Turing', email: 'alan@example.com', role: 'user' },
  ];
  private nextId = 3;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    // Throwing a Nest HTTP exception is the framework-native way to return a
    // 404. Nest's built-in exception filter turns it into the right status +
    // JSON — no manual res.status(404) and no central handler to wire (Nest
    // ships one). Compare to the Express module's custom HttpError + handler.
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  create(dto: CreateUserDto): User {
    if (this.users.some((u) => u.email === dto.email)) {
      throw new ConflictException(`Email already in use: ${dto.email}`);
    }
    const user: User = {
      id: this.nextId++,
      name: dto.name,
      email: dto.email,
      role: dto.role ?? 'user', // apply the default the DTO left optional
    };
    this.users.push(user);
    return user;
  }
}
