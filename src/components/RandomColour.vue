<script setup>
import { onMounted, ref } from "vue";
import { randInt, setHue } from "../utils";

defineProps({});

const hue = ref(randInt(360));
const saturation = ref(randInt(100));
const lightness = ref(randInt(100));

onMounted(() => {
  setHue(hue.value);
});

function randomise() {
  hue.value = randInt(360);
  saturation.value = randInt(100);
  lightness.value = randInt(100);
  setHue(hue.value);
}

defineExpose({
  randomise,
});
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
  transition: background-color var(--trans-time) var(--trans-ease);
  border: 1px solid white;
  border-radius: 7px;
}
</style>
