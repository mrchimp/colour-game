export function setHue(hue) {
  document.documentElement.style.setProperty("--highlight-hue", hue);
}

export function randInt(max) {
  return Math.floor(Math.random() * max);
}

export function hsl(h, s, l) {
  return `hslStr(${h},${s}%,${l}%)`;
}
