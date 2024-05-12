<script setup>
import { ref, onMounted } from "vue";
import throttle from "lodash.throttle";
import { hsl, randInt, setHue } from "../utils";

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
    <div class="hue">
      <label for="hue">Hue</label>
      <input
        id="hue"
        type="range"
        min="0"
        max="360"
        v-model="hue"
        @input="onHueChange"
      />
    </div>

    <div class="picker-container">
      <div class="lightness">
        <label for="lightness">Lightness</label>
        <input
          id="lightness"
          type="range"
          min="0"
          max="100"
          v-model="lightness"
          @input="emitValues"
        />
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
          @input="emitValues"
        />
        <label for="#saturation">Saturation</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.picker-container {
  --swatch-size: 200px;
  display: grid;
  grid-template-columns: 2rem 1fr;
  position: relative;
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

.hue {
  label {
    display: block;
    text-align: left;
  }

  input {
    width: var(--swatch-size);
  }

  /* Chrome, Safari, Opera, and Edge  */
  input[type="range"]::-webkit-slider-runnable-track,
  /* Firefox */
  input[type="range"]::-moz-range-track {
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
    height: 1rem;
  }
}

.saturation {
  label {
    display: block;
    text-align: left;
  }
  input {
    width: var(--swatch-size);
  }
}

.lightness {
  position: absolute;
  top: 4.5rem;
  left: -8rem;
  transform: rotate(-90deg);

  label {
    display: block;
    text-align: left;
  }

  input {
    width: var(--swatch-size);
  }
}
</style>
