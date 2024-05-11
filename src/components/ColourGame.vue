<script setup>
import { nextTick, ref } from "vue";
import RandomColour from "./RandomColour.vue";
import GuessColour from "./GuessColour.vue";

defineProps({});

const tab = ref("random");
const randomiser = ref(null);

function selectRandomiser() {
  tab.value = "random";
  nextTick(() => {
    randomiser.value.randomise();
  });
}
</script>

<template>
  <h1>Colour Game</h1>
  <h2>Instructions</h2>
  <ol>
    <li>Generate a random colour</li>
    <li>
      Describe the colour to your friend in words that don't include colour
      names (reg, green, blue, etc.)
    </li>
    <li>
      Your friend then tries to guess the colour based on your description
    </li>
    <li>Repeat with roles reversed</li>
    <li>Closest wins</li>
    <li>Winner gets a cake (if the loser is nice like that)</li>
  </ol>
  <div class="tabs">
    <button :class="{ active: tab === 'random' }" @click="selectRandomiser">
      Player 1: Generate Colour
    </button>
    <button :class="{ active: tab === 'guess' }" @click="tab = 'guess'">
      Player 2: Guess Colour
    </button>
  </div>

  <RandomColour ref="randomiser" v-if="tab === 'random'" />
  <GuessColour v-else />
</template>

<style scoped>
.tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

ol {
  display: block;
  margin-inline: auto;
  max-width: 300px;
  text-align: left;
}
</style>
