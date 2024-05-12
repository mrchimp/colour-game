<script setup>
import { onMounted, ref } from "vue";
import { hsl, randInt, setHue } from "../../utils";

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
  <div class="wrapper">
    <div
      class="swatch"
      :style="{ background: hsl(hue, saturation, lightness) }"
      @click="randomise"
    ></div>

    <div class="controls">
      <div>
        <button @click="randomise">Randomise</button>
      </div>
      <div class="output">
        <p>
          Hue: <b>{{ hue }}</b>
        </p>
        <p>
          Saturation: <b>{{ saturation }}</b>
        </p>
        <p>
          Lightness: <b>{{ lightness }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding-inline: 1rem;
  max-width: 100vw;
}

.swatch {
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;
  cursor: pointer;
}

.controls {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.output {
  text-align: left;

  p {
    margin-block: 0.5rem;
  }
}
</style>
