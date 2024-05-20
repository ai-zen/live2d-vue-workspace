<template>
  <Live2D
    class="live2d"
    modelDir="/models/Hiyori"
    modelName="Hiyori.model3.json"
  />
</template>

<script setup lang="ts">
import { Live2D } from "@ai-zen/live2d-vue";
</script>

<style scoped>
.live2d {
  width: 800px;
  height: 800px;
}
</style>
