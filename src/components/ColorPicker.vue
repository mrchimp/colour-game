<script setup>
import { ref, onMounted } from "vue";
import throttle from "lodash.throttle";
import { hsl, limit, randInt, setHue } from "../utils";

const emit = defineEmits(["change"]);
const picker = ref(null);
const hue = ref(randInt(360));
const saturation = ref(randInt(100));
const lightness = ref(randInt(100));
const pick = ref(false);
const pickerSize = [0, 0];

function onHueChange(e) {
  setHue(+e.target.value);
  emitValues();
}

const onMouseMove = throttle(function (e) {
  if (!pick.value) {
    return;
  }

  getPickerValues(e);
}, 16);

function getPickerValues(e) {
  const rect = picker.value.getBoundingClientRect();
  const x = e.clientX - rect.left; //x position within the element.
  const y = e.clientY - rect.top; //y position within the element.
  const xPerc = (x / pickerSize[0]) * 100;
  const yPerc = (y / pickerSize[1]) * 100;

  saturation.value = Math.round(xPerc);
  lightness.value = Math.round(100 - yPerc);

  emitValues();
}

function emitValues() {
  emit("change", {
    h: hue.value,
    s: saturation.value,
    l: lightness.value,
  });
}

function setColor({ h, s, l }) {
  hue.value = h;
  saturation.value = s;
  lightness.value = l;
}

function getColor() {
  return {
    h: hue.value,
    s: saturation.value,
    l: lightness.value,
  };
}

function nudgeHue(amount) {
  hue.value = limit(hue.value + amount, 360);
  emitValues();
}

function nudgeSaturation(amount) {
  saturation.value = limit(saturation.value + amount, 100);
  emitValues();
}

function nudgeLightness(amount) {
  lightness.value = limit(lightness.value + amount, 100);
  emitValues();
}

onMounted(() => {
  setHue(hue.value);
  pickerSize[0] = picker.value.clientWidth;
  pickerSize[1] = picker.value.clientHeight;
});

defineExpose({
  setColor,
  getColor,
});
</script>

<template>
  <div class="picker">
    <div class="picker-container">
      <div></div>
      <div class="hue">
        <div class="label">
          <button class="nudge" @click="nudgeHue(-1)">-</button>
          <label for="hue">Hue</label>
          <button class="nudge" @click="nudgeHue(+1)">+</button>
        </div>
        <input
          id="hue"
          type="range"
          min="0"
          max="360"
          v-model="hue"
          @input="onHueChange"
        />
      </div>
      <div class="lightness">
        <div class="rotator">
          <div class="label">
            <button class="nudge" @click="nudgeLightness(-1)">-</button>
            <label for="lightness">Lightness</label>
            <button class="nudge" @click="nudgeLightness(+1)">+</button>
          </div>
          <input
            id="lightness"
            type="range"
            min="0"
            max="100"
            v-model="lightness"
            @input="emitValues"
          />
        </div>
      </div>

      <div
        ref="picker"
        class="picker-swatch"
        :style="`background: linear-gradient(to right, ${hsl(
          hue,
          0,
          50
        )}, ${hsl(hue, 100, 50)});`"
        @mousedown="pick = true"
        @mouseup="pick = false"
        @mousemove="onMouseMove"
        @click="getPickerValues"
      >
        <div
          class="picker-marker"
          :style="{
            left: `${saturation}%`,
            bottom: `${lightness}%`,
          }"
        ></div>
      </div>
      <div></div>
      <div class="saturation">
        <input
          id="saturation"
          type="range"
          min="0"
          max="100"
          v-model="saturation"
          :style="{
            background: `linear-gradient(to right, ${hsl(hue, 0, 50)}, ${hsl(
              hue,
              100,
              50
            )})`,
          }"
          @input="emitValues"
        />
        <div class="label">
          <button class="nudge" @click="nudgeSaturation(-1)">-</button>
          <label for="#saturation">Saturation</label>
          <button class="nudge" @click="nudgeSaturation(+1)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.picker {
  --swatch-size: 200px;
}

.picker-container {
  display: grid;
  grid-template-columns: 4rem var(--swatch-size);
  position: relative;
  gap: 3px;
}

.picker-swatch {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: linear-gradient(
      to top,
      rgb(0, 0, 0),
      rgb(128, 128, 128, 0) 50%,
      rgb(255, 255, 255)
    );
  }
}

.picker-swatch {
  height: var(--swatch-size);
  transition: background var(--trans-time) var(--trans-ease);
  width: var(--swatch-size);
}

.picker-marker {
  border-radius: 50%;
  border: 2px solid white;
  background: rgb(0, 0, 0, 0.5);
  height: 1rem;
  position: absolute;
  pointer-events: none;
  transform: translate(-50%, 50%);
  width: 1rem;
  z-index: 1;
}

.label {
  display: flex;
  justify-content: space-between;
}

input[type="range"] {
  width: 100%;
}

input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-moz-range-track {
  background: transparent;
}

.hue {
  input {
    background: linear-gradient(
      to right,
      hsl(0, 100%, 50%),
      hsl(30, 100%, 50%),
      hsl(60, 100%, 50%),
      hsl(90, 100%, 50%),
      hsl(120, 100%, 50%),
      hsl(150, 100%, 50%),
      hsl(180, 100%, 50%),
      hsl(210, 100%, 50%),
      hsl(240, 100%, 50%),
      hsl(270, 100%, 50%),
      hsl(300, 100%, 50%),
      hsl(330, 100%, 50%),
      hsl(360, 100%, 50%)
    );
  }
}

.lightness {
  position: relative;

  input {
    background: linear-gradient(to right, #000, #fff);
  }

  .rotator {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-100%) rotate(-90deg);
    transform-origin: bottom right;
    width: var(--swatch-size);
  }
}

.nudge {
  align-items: center;
  background: transparent;
  color: currentColor;
  display: inline-flex;
  height: 1.5rem;
  justify-content: center;
  padding: 0;
  width: 2rem;
}
</style>
