<template>
  <Live2D class="live2d" @mounted="onLive2DMounted" />
</template>

<script setup lang="ts">
import {
  Live2D,
  LAppDelegateModule,
  LAppLive2DManagerModule,
} from "live2d-vue";
import { ref } from "vue";

let currentModel = null;

const currentModelProfile = ref(null);

async function onLive2DMounted(
  _delegate: LAppDelegateModule.LAppDelegate,
  manager: LAppLive2DManagerModule.LAppLive2DManager
) {
  // 加载默认模型
  currentModel = await manager.changeModel(
    "/models/Hiyori",
    "Hiyori.model3.json"
  );

  // 加载模型完成后，接收模型的人设配置
  currentModelProfile.value = await currentModel._profileManager.loadProfile();
}
</script>

<style scoped>
.live2d {
  width: 800px;
  height: 800px;
}
</style>
