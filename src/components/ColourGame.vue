<script setup>
import { nextTick, ref } from "vue";
import RandomColour from "./RandomColour.vue";
import GuessColour from "./GuessColour.vue";
import InstructionPopup from "./InstructionPopup.vue";

const tab = ref("random");
const randomiser = ref(null);
const showInstructions = ref(false);

function selectRandomiser() {
  tab.value = "random";
  nextTick(() => {
    randomiser.value.randomise();
  });
}
</script>

<template>
  <h1>Colour Game</h1>
  <button class="instructions-button" @click.prevent="showInstructions = true">
    Instructions
  </button>
  <div class="tabs">
    <button
      :class="{ active: tab === 'random' }"
      @click.prevent="selectRandomiser"
    >
      Player 1: Generate Colour
    </button>
    <button :class="{ active: tab === 'guess' }" @click.prevent="tab = 'guess'">
      Player 2: Guess Colour
    </button>
  </div>

  <RandomColour ref="randomiser" v-if="tab === 'random'" />
  <GuessColour v-else />

  <InstructionPopup v-if="showInstructions" @close="showInstructions = false" />
</template>

<style scoped>
h1 {
  margin-top: 3rem;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.instructions-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
