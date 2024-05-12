<script setup>
import { onMounted, ref } from "vue";
import { hsl, makeScore, randInt, setHue } from "../../utils";

const hue = ref(randInt(360));
const saturation = ref(randInt(100));
const lightness = ref(randInt(100));
const guess = ref({ h: 0, s: 0, l: 0 });

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

    <div class="guesses">
      <h2>Guess</h2>
      <p>Enter the guesser's guess here to get a score.</p>
      <div class="colors">
        <div class="color">
          <label>Hue</label>
          <input type="number" v-model="guess.h" />
        </div>
        <div class="color">
          <label>S</label>
          <input type="number" v-model="guess.s" />
        </div>
        <div class="color">
          <label>L</label>
          <input type="number" v-model="guess.l" />
        </div>
      </div>
      <div class="score">
        <p>
          Score:
          {{
            makeScore({ h: hue, s: saturation, l: lightness }, guess).toFixed(2)
          }}
        </p>
        <p
          v-if="makeScore({ h: hue, s: saturation, l: lightness }, guess) > 99"
        >
          Imperceptible!
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

h2 {
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-thickness: 2px;
  text-decoration-color: var(--highlight-color);
  transition: text-decoration-color var(--trans-time) var(--trans-ease);
}

.guesses {
  max-width: 400px;
  margin-top: 4rem;

  .colors {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .color {
    display: flex;
    flex-direction: column;
  }

  input {
    font-size: 2rem;
    width: 100%;
  }

  .score {
    font-size: 2rem;
  }
}
</style>
