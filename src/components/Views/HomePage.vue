<script setup>
import InstructionPopup from "../InstructionPopup.vue";
</script>

<template>
  <InstructionPopup @close="$router.push({ name: 'random-color' })" />
</template>
