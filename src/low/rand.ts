export class LCG {

  protected m: number;
  protected a: number;
  protected c: number;
  protected state: number;

  constructor(seed: number) {
    this.m = 1;
    this.a = 0;
    this.c = 0;
    this.seed(seed);
  }

  seed(seed: number = 0): void {
    this.state = seed !== 0 ? seed : Date.now();
    this.state = this.state % this.m; // ensure the seed is within bounds
  }

  protected rnd(): number {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state / this.m;
  }

  rndMod(n: number): number {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state % n;
  }

  random(i: number = 1, a?: number): number {
    if (!a) return this.rnd() * i;
    return this.rnd() * (a - i) + i;
  }

  randInt(i: number = 1, a?: number): number {
    if (!a) return ~~(this.rnd() * i);
    return ~~(this.rnd() * (a - i) + i);
  }

  rollDice(diceSides: number = 6, diceCount: number = 1): number {
    let res = 0;
    for (let q = 0; q < diceCount; q++) {
      res += ~~(this.random(diceSides)) + 1;
    }
    return res;
  }

  choose<T>(arr: T[]): T {
    return arr[~~this.random(arr.length)];
  }

  randArray<T>(arr: T[]): T[] {
    return arr.sort(() => this.random(-1, 1));
  }
}

export class JS extends LCG {
  protected rnd(): number {
    return Math.random();
  }

  rndMod(n: number): number {
    return this.randInt(n);
  }
}

export class Knuth extends LCG {
  constructor(seed: number = 0) {
    super(seed);
    this.a = 1664525;
    this.c = 1013904223;
    this.m = 2 ** 32;
    this.seed(seed);
  }
}

export class Numerical_Recipes extends LCG {
  constructor(seed: number = 0) {
    super(seed);
    this.a = 1664525;
    this.c = 1013904223;
    this.m = 2 ** 32;
    this.seed(seed);
  }
}

export class RtlUniform extends LCG {
  constructor(seed: number = 0) {
    super(seed);
    this.a = 2397753;
    this.c = 1;
    this.m = 2 ** 64 - 59;//2 ** 48 - 1;
    this.seed(seed);
  }
}

export class Microsoft extends LCG {
  constructor(seed: number = 0) {
    super(seed);
    this.a = 214013;
    this.c = 2531011;
    this.m = 2 ** 32;
    this.seed(seed);
  }
}

export class Park_Miller extends LCG {
  constructor(seed: number = 0) {
    super(seed);
    this.a = 16807;
    this.c = 0;
    this.m = (2 ** 31) - 1;
    this.seed(seed);
  }
}

export class CarbonLib extends LCG {
  constructor(seed: number = 0) {
    super(seed);
    this.a = 16807;
    this.c = 0;
    this.m = (2 ** 31) - 1;
    this.seed(seed);
  }
}

export class VB6 extends LCG {
  constructor(seed: number = 0) {
    super(seed);
    this.a = 16598013;
    this.c = 12820163;
    this.m = 2 ** 24;
    this.seed(seed);
  }
}

export class VMS extends LCG {
  constructor(seed: number = 0) {
    super(seed);
    this.a = 69069;
    this.c = 1;
    this.m = 2 ** 32;
    this.seed(seed);
  }
}

export class Lehmer extends LCG {
  constructor(seed: number = 0) {
    super(seed);
    this.a = 48271;
    this.c = 0;
    this.m = (2 ** 31) - 1;
    this.seed(seed);
  }
}