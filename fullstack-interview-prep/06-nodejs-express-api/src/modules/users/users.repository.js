/**
 * THE REPOSITORY — the ONLY layer that knows how data is stored/retrieved.
 *
 * Here it's an in-memory array with a simulated latency, standing in for a real
 * database. The point of the repository pattern: the service layer above asks
 * for "the user with id 3" and doesn't care whether that's Postgres, Mongo, an
 * HTTP API, or this array. Swap the storage by rewriting ONLY this file — the
 * service, controller, and routes don't change. That decoupling is the whole
 * reason layered architecture earns its extra files.
 */

// Seed data. In production this is your DB; the shape is your persistence model.
const usersTable = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'admin' },
  { id: 2, name: 'Alan Turing', email: 'alan@example.com', role: 'user' },
  { id: 3, name: 'Grace Hopper', email: 'grace@example.com', role: 'user' },
];
let nextId = 4;

// Simulate I/O latency so the Redis cache has something to actually save.
const simulateDbLatency = () => new Promise((r) => setTimeout(r, 150));

export const usersRepository = {
  async findAll() {
    await simulateDbLatency();
    // Return COPIES so callers can't mutate our "table" by reference — a subtle
    // bug source. Real ORMs return detached entities for the same reason.
    return usersTable.map((u) => ({ ...u }));
  },

  async findById(id) {
    await simulateDbLatency();
    const found = usersTable.find((u) => u.id === id);
    return found ? { ...found } : null;
  },

  async create({ name, email, role }) {
    await simulateDbLatency();
    const user = { id: nextId++, name, email, role };
    usersTable.push(user);
    return { ...user };
  },
};
