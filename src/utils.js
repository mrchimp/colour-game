export function setHue(hue) {
  document.documentElement.style.setProperty("--highlight-hue", hue);
}

export function randInt(max) {
  return Math.floor(Math.random() * max);
}
