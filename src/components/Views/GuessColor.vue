<script setup>
import { onMounted, ref, watch } from "vue";
import throttle from "lodash.throttle";
import { randInt, setHue } from "../../utils";

const hue = ref(randInt(360));
const saturation = ref(randInt(100));
const lightness = ref(randInt(100));
const pick = ref(false);
const picker = ref(null);

const pickerSize = [0, 0];

watch(hue, () => {
  setHue(hue.value);
});

onMounted(() => {
  setHue(hue.value);
  pickerSize[0] = picker.value.clientWidth;
  pickerSize[1] = picker.value.clientHeight;
});

function onHueChange(e) {
  setHue(+e.target.value);
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
}
</script>

<template>
  <div class="container">
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
          />
        </div>

        <div
          ref="picker"
          class="picker-swatch"
          :style="`background: linear-gradient(to right, hsl(${hue},0%,50%), hsl(${hue},100%,50%));`"
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
          />
          <label for="#saturation">Saturation</label>
        </div>
      </div>
    </div>

    <div class="result">
      <div
        class="swatch preview-swatch"
        :style="`background: hsl(${hue},${saturation}%,${lightness}%)`"
      ></div>

      <div>
        <p>
          Hue: <span>{{ hue }}</span>
        </p>
        <p>
          Saturation: <span>{{ saturation }}</span>
        </p>
        <p>
          Lightness: <span>{{ lightness }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  --swatch-size: 200px;
  display: flex;
  column-gap: 4rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-inline: 4rem;
}

.result {
  padding-top: 3rem;
}

.picker-swatch,
.preview-swatch {
  width: var(--swatch-size);
  height: var(--swatch-size);
}

.picker-swatch {
  transition: background var(--trans-time) var(--trans-ease);
}

.picker-container {
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
