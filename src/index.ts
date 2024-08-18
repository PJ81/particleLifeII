import { BREAKS, FRICTION, HEIGHT, HH, hslToInt32, HW, K, map, MAX_MDST, MAX_RAD, MIN_MDIST, MIN_RAD, PART_TYPES, POP_SIZE, R, WIDTH, XTR_FRC } from "./low/const.js";
import Game from "./low/game.js";
import Point from "./low/point.js";
import Particle from "./particle.js";

class ParticleLifeII extends Game {

  particles: Particle[];
  radii: number[][];
  minDst: number[][];
  force: number[][];
  data: ImageData;
  buf: Uint32Array;

  constructor() {
    super();

    this.canvas.addEventListener("click", () => this.setParams());

    this.data = this.ctx.createImageData(WIDTH, HEIGHT);
    this.buf = new Uint32Array(this.data.data.buffer);
    this.buf.fill(0xff000000);

    this.createParticles(this.createColors());

    this.radii = Array.from({ length: POP_SIZE }, () => Array(POP_SIZE).fill(0));
    this.force = Array.from({ length: POP_SIZE }, () => Array(POP_SIZE).fill(0));
    this.minDst = Array.from({ length: POP_SIZE }, () => Array(POP_SIZE).fill(0));
    this.setParams();

    this.loop();
  }

  createParticles(clrs: number[]): void {
    this.particles = [];

    for (let p = 0; p < POP_SIZE; p++) {
      const z = R.randInt(PART_TYPES);
      this.particles.push(new Particle(z, clrs[z]));
    }
  }

  createColors(): number[] {
    const clr: number[] = [];
    for (let r = 0; r < PART_TYPES; r++) {
      clr.push(hslToInt32(360 / PART_TYPES * r, 1, .5));
    }
    return clr;
  }

  setParams(): void {

    let c: number;

    for (let b = 0; b < POP_SIZE; b++) {
      for (let a = 0; a < POP_SIZE; a++) {
        this.radii[a][b] = R.random(MIN_RAD, MAX_RAD);
        this.minDst[a][b] = R.random(MIN_MDIST, MAX_MDST);
        c = R.random(.3, 1);
        this.force[a][b] = R.random() < .5 ? c : -c;
      }
    }
  }

  correctBrdSideEfx(d: Point): Point {
    d.x += d.x > HW ? -WIDTH : d.x < -HW ? WIDTH : 0;
    d.y += d.y > HH ? -HEIGHT : d.y < -HH ? HEIGHT : 0;
    return d;
  }

  update(dt: number): void {
    let p1: Particle, p2: Particle;
    let
      dir = new Point(),
      totalF = new Point(),
      acc = new Point(),
      frc = new Point(),
      dst: number;

    for (let a = 0; a < POP_SIZE; a++) {
      p1 = this.particles[a];

      for (let b = 0; b < POP_SIZE; b++) {
        p2 = this.particles[b];

        dir = p2.pos.copy();
        dir.subPt(p1.pos);

        dir = this.correctBrdSideEfx(dir);

        dst = dir.length();
        dir.normalize();

        // separate
        if (dst < this.minDst[p1.type][p2.type]) {
          frc = dir.copy();
          let f = XTR_FRC * Math.abs(this.force[p1.type][p2.type]);
          frc.mul(f * -3);
          frc.mul(map(dst, 0, this.minDst[p1.type][p2.type], 1, 0));
          frc.mul(K);
          totalF.addPt(frc);
        }

        // move
        if (dst < this.radii[p1.type][p2.type]) {
          frc = dir.copy();
          let f = XTR_FRC * this.force[p1.type][p2.type];
          frc.mul(this.force[p1.type][p2.type]);
          frc.mul(map(dst, 0, this.radii[p1.type][p2.type], 1, 0));
          frc.mul(K);
          totalF.addPt(frc);
        }
      }

      //apply forces to particle
      acc.addPt(totalF);
      acc.mul(BREAKS);
      p1.vel.addPt(acc);
      p1.pos.addPt(p1.vel);

      // wrap around 
      p1.pos.x = (p1.pos.x + WIDTH) % WIDTH;
      p1.pos.y = (p1.pos.y + HEIGHT) % HEIGHT;

      p1.vel.mul(FRICTION);

      totalF.zero();
    }
  }

  draw(): void {
    this.buf.fill(0xff000000);

    this.particles.forEach(p => {
      this.buf[~~p.pos.x + ~~p.pos.y * WIDTH] = p.color;
    });

    this.ctx.putImageData(this.data, 0, 0);
  }
}

const p = new ParticleLifeII();