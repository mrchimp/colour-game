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
