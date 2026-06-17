/**
 * ============================================================================
 * PROTOTYPES & CLASSES — what `class` is really doing underneath.
 * Run me:  node src/04-prototypes-classes.js   (or: pnpm prototypes)
 * ============================================================================
 *
 * JS inheritance is PROTOTYPAL, not classical. Every object has an internal
 * link ([[Prototype]], readable via Object.getPrototypeOf) to another object.
 * When you read a property the engine walks this PROTOTYPE CHAIN until it finds
 * it or hits null. `class` is syntax sugar over exactly this mechanism.
 */

// --- 1. The prototype chain by hand -----------------------------------------
const animal = {
  // Methods on the prototype are SHARED by all linked objects (one copy in
  // memory), unlike per-instance data. This is the memory win of prototypes.
  describe() {
    return `${this.name} is a ${this.kind}`;
  },
};

// `dog`'s prototype is `animal`. `dog` has no `describe` of its own; the engine
// finds it one hop up the chain.
const dog = Object.create(animal);
dog.name = 'Rex';
dog.kind = 'dog';

console.log('1a. inherited method ->', dog.describe()); // Rex is a dog
console.log('1b. own property?    ->', dog.hasOwnProperty('describe')); // false — it's on the prototype
console.log('1c. chain link       ->', Object.getPrototypeOf(dog) === animal); // true

// --- 2. The same thing with `class` (the sugar) -----------------------------
class Vehicle {
  // Fields declared here are per-INSTANCE.
  #vin; // truly private (the # is enforced by the engine, not a convention)

  constructor(make, vin) {
    this.make = make;
    this.#vin = vin;
  }

  // Methods defined in a class body live on Vehicle.prototype — SHARED, exactly
  // like `animal.describe` above. `class` didn't change the mechanism.
  describe() {
    return `${this.make} (vin ending ${this.#vin.slice(-4)})`;
  }

  // static = on the constructor itself, not instances. Factory/utility home.
  static fromString(str) {
    const [make, vin] = str.split(':');
    return new Vehicle(make, vin);
  }
}

class Car extends Vehicle {
  constructor(make, vin, doors) {
    // `super(...)` MUST run before you touch `this` in a subclass constructor —
    // the parent is what creates/initializes the instance.
    super(make, vin);
    this.doors = doors;
  }

  // Override + call up the chain with super.method().
  describe() {
    return `${super.describe()} with ${this.doors} doors`;
  }
}

const car = new Car('Toyota', 'JT1234567890', 4);
console.log('2a. class inheritance ->', car.describe());
console.log('2b. instanceof chain  ->', car instanceof Vehicle, car instanceof Car); // true true
console.log('2c. static factory    ->', Vehicle.fromString('Honda:HX9988').describe());

// Private field is inaccessible from outside — this throws a SyntaxError if
// uncommented, which is the point (compile-time privacy, unlike `_underscore`):
// console.log(car.#vin);

// --- 3. Why this matters: prototype methods are shared -----------------------
// Both instances point at the SAME describe function object. With 1M instances
// you still have ONE method in memory, not a million closures.
const car2 = new Car('Mazda', 'MZ0001112222', 2);
console.log(
  '3. methods are shared ->',
  Object.getPrototypeOf(car).describe === Object.getPrototypeOf(car2).describe,
); // true

/**
 * INTERVIEW POINTS
 * - "Is JS class-based?" -> No. It's prototype-based; `class` is sugar over
 *   prototypes + constructor functions. Methods go on `.prototype` (shared).
 * - "What is the prototype chain?" -> the lookup path the engine walks for
 *   property access, ending at Object.prototype then null.
 * - "`__proto__` vs `prototype`?" -> `prototype` is a property on CONSTRUCTOR
 *   FUNCTIONS that becomes the [[Prototype]] of instances created with `new`.
 *   `__proto__` (legacy accessor; prefer Object.getPrototypeOf) is the actual
 *   link on an instance.
 * - "How do you do real privacy?" -> `#fields` (engine-enforced). `_name` is
 *   only a naming convention and is fully accessible.
 * - "Composition vs inheritance?" -> prefer composition; deep inheritance trees
 *   are brittle. Interviewers like hearing "favor composition over inheritance".
 */
