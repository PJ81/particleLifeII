import { HEIGHT, R, WIDTH } from "./low/const.js";
import Point from "./low/point.js";

export default class Particle {

  pos: Point;
  vel: Point;
  color: number;
  type: number;

  constructor(type: number, clr: number) {
    this.pos = new Point(R.randInt(WIDTH), R.randInt(HEIGHT));
    this.vel = new Point();
    this.color = clr;
    this.type = type;
  }

  /*draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color.hex;
    ctx.fillRect(this.pos.x, this.pos.y, PART_SIZE, PART_SIZE);
  }*/
}