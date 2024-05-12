<script setup></script>

<template>
  <div class="mask" @click="$emit('close')">
    <div class="instructions">
      <h2>Instructions</h2>
      <ol>
        <li>You and a friend both open the game on your phones.</li>
        <li>Player 1 generates a random colour</li>
        <li>
          Player 1 describes the colour to player 2 in five words or fewer,
          without using obvious colour names (blue, green, maroon, mauve etc.)
        </li>
        <li>
          Player 2 then tries to guess the colour based on your description
        </li>
        <li>Repeat with roles reversed</li>
        <li>Closest wins</li>
        <li>Winner gets a cake (if the loser is nice like that)</li>
      </ol>
      <button @click.prevent="$emit('close')">Ok, I'm ready</button>
    </div>
  </div>
</template>

<style scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 0, 0.9);
  padding: 1rem;
  overflow-x: auto;
}

.instructions {
  width: 100%;
  max-width: 350px;
}

ol {
  display: block;
  margin-inline: auto;
  text-align: left;
}
</style>
