<template>
  <canvas ref="canvasEl"></canvas>
</template>

<script setup lang="ts">
import * as LAppDefine from "@ai-zen/live2d-app/dist/lappdefine";
import { LAppDelegate } from "@ai-zen/live2d-app/dist/lappdelegate";
import { LAppLive2DManager } from "@ai-zen/live2d-app/dist/lapplive2dmanager";
import { LAppModel, LoadStep } from "@ai-zen/live2d-app/dist/lappmodel";
import { defineEmits, onMounted, onUnmounted, ref } from "vue";

const emits = defineEmits<{
  (
    event: "modelStateChange",
    model: LAppModel,
    state: LoadStep,
    oldValue: LoadStep
  ): void;
  (event: "mounted", delegate: LAppDelegate, manager: LAppLive2DManager): void;
}>();

const canvasEl = ref<null | HTMLCanvasElement>(null);

function onResize() {
  if (LAppDefine.CanvasSize === "auto" || LAppDefine.CanvasSize === "inherit") {
    LAppDelegate.getInstance().onResize();
  }
}

function onModelStateChange(
  model: LAppModel,
  state: LoadStep,
  oldValue: LoadStep
) {
  emits("modelStateChange", model, state, oldValue);
}

onMounted(() => {
  // create the application instance
  if (LAppDelegate.getInstance().initialize(canvasEl.value!) == false) {
    return;
  }

  LAppDelegate.getInstance().run();

  LAppLive2DManager.getInstance()._events.on(
    "modelStateChange",
    onModelStateChange
  );

  window.addEventListener("resize", onResize);

  // 告诉外面实例挂载好了，可以初始化模型了
  emits("mounted", LAppDelegate.getInstance(), LAppLive2DManager.getInstance());
});

onUnmounted(() => {
  LAppLive2DManager.getInstance()._events.off(
    "modelStateChange",
    onModelStateChange
  );

  window.removeEventListener("resize", onResize);

  LAppDelegate.releaseInstance();
});

defineExpose({
  LAppDelegate,
  LAppLive2DManager,
});
</script>

<style scoped></style>
