<script setup>
import { onMounted, ref, watch } from "vue";
import { randInt, setHue } from "../../utils";
import { hsl } from "../../utils";
import ColorPicker from "../ColorPicker.vue";

const picker = ref(null);
const hue = ref(randInt(360));
const saturation = ref(randInt(100));
const lightness = ref(randInt(100));

function onPickerChange({ h, s, l }) {
  hue.value = h;
  saturation.value = s;
  lightness.value = l;
}

watch(hue, () => {
  setHue(hue.value);
});

onMounted(() => {
  setHue(hue.value);
});
</script>

<template>
  <div class="container">
    <ColorPicker ref="picker" @change="onPickerChange" />

    <div class="result">
      <div
        class="swatch preview-swatch"
        :style="{ background: hsl(hue, saturation, lightness) }"
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

.preview-swatch {
  width: var(--swatch-size);
  height: var(--swatch-size);
}
</style>
