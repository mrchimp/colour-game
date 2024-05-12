<script setup>
import { ref } from "vue";
import ColorPicker from "../ColorPicker.vue";
import { hsl } from "../../utils";

const target = ref({ h: 0, s: 0, l: 0 });
const guess = ref({ h: 0, s: 0, l: 0 });
const score = ref(0);

function getScore() {
  score.value = 12;
  let hScore;
  let sScore;
  let lScore;

  hScore = Math.abs(target.value.h - guess.value.h);
  if (hScore > 180) {
    hScore = 360 - hScore;
  }

  sScore = Math.abs(target.value.s - guess.value.s);
  lScore = Math.abs(target.value.l - guess.value.l);

  score.value = 100 - ((hScore + sScore + lScore) / 380) * 100;
}
</script>

<template>
  <h2>Score: {{ score.toFixed(2) }}</h2>
  <div class="wrapper">
    <div>
      <p>Target</p>
      <ColorPicker
        @change="
          (c) => {
            target = c;
            getScore();
          }
        "
      />
    </div>
    <div
      class="swatch"
      :style="{ background: hsl(target.h, target.s, target.l) }"
    ></div>
    <div>
      <p>Guess</p>
      <ColorPicker
        @change="
          (c) => {
            guess = c;
            getScore();
          }
        "
      />
    </div>
    <div
      class="swatch"
      :style="{ background: hsl(guess.h, guess.s, guess.l) }"
    ></div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.swatch {
  margin-top: 6rem;
}
</style>
