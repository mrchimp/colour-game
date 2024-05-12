<script setup>
import { nextTick, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import InstructionPopup from "./InstructionPopup.vue";

const route = useRoute();
const router = useRouter();
const routeComponent = ref(null);
const showInstructions = ref(false);

function selectRandomiser() {
  router.push({ name: "random-color" }).then(() => {
    nextTick(() => {
      routeComponent.value.randomise();
    });
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
      :class="{ active: route.name === 'random-color' }"
      @click.prevent="selectRandomiser"
    >
      Player 1: Generate Colour
    </button>
    <button
      :class="{ active: route.name === 'guess-color' }"
      @click.prevent="$router.push({ name: 'guess-color' })"
    >
      Player 2: Guess Colour
    </button>
  </div>

  <RouterView v-slot="{ Component }">
    <component ref="routeComponent" :is="Component" />
  </RouterView>

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
