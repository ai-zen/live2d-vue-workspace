<template>
  <canvas ref="canvasEl"></canvas>
</template>

<script setup lang="ts">
import { LAppDelegate } from "live2d-app/dist/lappdelegate";
import * as LAppDefine from "live2d-app/dist/lappdefine";
import { onMounted, onUnmounted, ref, defineEmits } from "vue";
import { LAppLive2DManager } from "live2d-app/dist/lapplive2dmanager";
import { LAppModel, LoadStep } from "live2d-app/dist/lappmodel";

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
  LAppLive2DManager.getInstance()._events.on(
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
