import { JS } from "./rand.js";

export const

  IMAGES: Array<HTMLImageElement> = [],
  R = new JS(0),

  PI = Math.PI,
  HPI = PI / 2,
  TAU = 2 * PI,

  SCALE = 1,

  POP_SIZE = 1500,
  PART_SIZE = 2,
  PART_TYPES = 8,
  K = .05,
  FRICTION = .85,
  BREAKS = .75,

  XTR_FRC = 3,

  WIDTH = 800,
  HEIGHT = 900,
  HW = WIDTH >> 1,
  HH = HEIGHT >> 1,

  MIN_RAD = 70,
  MAX_RAD = 250,
  T_MAX_RAD = MAX_RAD << 1,

  MIN_MDIST = 20,
  MAX_MDST = 30;

function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function hslToInt32(h: number, s: number, l: number): number {

  const k = (n: number) => (n + h / 30) % 12,
    a = s * Math.min(l, 1 - l),
    f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))),

    r = Math.round(255 * f(0)),
    g = Math.round(255 * f(8)),
    b = Math.round(255 * f(4));

  return (0xff << 24) | ((b & 0xff) << 16) | ((g & 0xff) << 8) | (r & 0xff);

}

export { hslToInt32, map };

