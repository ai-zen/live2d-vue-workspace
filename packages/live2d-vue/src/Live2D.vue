<template>
  <div class="live2d-vue">
    <canvas ref="canvasEl"></canvas>
  </div>
</template>

<script setup lang="ts">
import { AsyncQueue } from "@ai-zen/async-queue";
import * as LAppDefine from "@app/lappdefine";
import { LAppDelegate } from "@app/lappdelegate";
import { LAppLive2DManager } from "@app/lapplive2dmanager";
import { LAppModel, LoadStep } from "@app/lappmodel";
import {
  defineEmits,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watchEffect,
} from "vue";

const emits = defineEmits<{
  (
    event: "modelStateChange",
    model: LAppModel,
    state: LoadStep,
    prevState: LoadStep
  ): void;
  (event: "ready"): void;
}>();

const props = defineProps<{
  modelDir: string;
  modelName: string;
}>();

const canvasEl = ref<null | HTMLCanvasElement>(null);

const delegateRef = shallowRef<LAppDelegate | null>(null);

const managerRef = shallowRef<LAppLive2DManager | null>(null);

const currentModel = shallowRef<LAppModel | null>(null);

const isReady = ref(false);

function onResize() {
  if (LAppDefine.CanvasSize === "auto" || LAppDefine.CanvasSize === "inherit") {
    LAppDelegate.getInstance().onResize();
  }
}

function onModelStateChange(
  model: LAppModel,
  state: LoadStep,
  prevState: LoadStep
) {
  emits("modelStateChange", model, state, prevState);
}

const queue = new AsyncQueue<{ modelDir: string; modelName: string }>();

watchEffect(async () => {
  if (managerRef.value && props.modelDir && props.modelName) {
    queue.push({ modelDir: props.modelDir, modelName: props.modelName });
  }
});

onMounted(() => {
  if (LAppDelegate.getInstance().initialize(canvasEl.value!) == false) {
    return;
  }

  LAppDelegate.getInstance().run();

  LAppLive2DManager.getInstance()._events.on(
    "modelStateChange",
    onModelStateChange
  );

  window.addEventListener("resize", onResize);

  delegateRef.value = LAppDelegate.getInstance();

  managerRef.value = LAppLive2DManager.getInstance();

  isReady.value = true;

  emits("ready");

  (async () => {
    for await (const { modelDir, modelName } of queue) {
      currentModel.value = await managerRef.value!.changeModel(
        modelDir,
        modelName
      );
    }
  })();
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
  delegateRef,
  managerRef,
  isReady,
});
</script>

<style scoped></style>
