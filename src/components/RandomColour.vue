<script setup>
import { ref } from "vue";

defineProps({});

const hue = ref(0);
const saturation = ref(0);
const lightness = ref(0);

function randVal(max) {
  return Math.floor(Math.random() * max);
}

function randomise() {
  hue.value = randVal(360);
  saturation.value = randVal(100);
  lightness.value = randVal(100);
}
</script>

<template>
  <div
    class="swatch"
    :style="`background-color: hsl(${hue},${saturation}%,${lightness}%)`"
    @click="randomise"
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

  <button @click="randomise">Randomise</button>
</template>

<style scoped>
.swatch {
  width: 100%;
  height: 200px;
}
</style>
