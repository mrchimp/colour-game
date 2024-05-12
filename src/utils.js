import Color from "colorjs.io";

export function setHue(hue) {
  document.documentElement.style.setProperty("--highlight-hue", hue);
}

export function randInt(max) {
  return Math.floor(Math.random() * max);
}

export function hsl(h, s, l) {
  return `hsl(${h},${s}%,${l}%)`;
}

export function limit(val, max, min = 0) {
  return Math.max(min, Math.min(val, max));
}

export function makeScore(target, guess) {
  const t = new Color("hsl", [target.h, target.s, target.l]);
  const g = new Color("hsl", [guess.h, guess.s, guess.l]);
  const diff = t.deltaE(g, "2000");

  return Math.max(0, 100 - diff);
}
