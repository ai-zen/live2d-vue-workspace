# live2d-vue

live2d-vue is an npm package for integrating Live2D views into Vue projects.

## Installation

Install using npm:

```shell
npm install live2d-vue
```

or using yarn:

```shell
yarn add live2d-vue
```

## Usage

Import the Live2D component in your Vue component and set its width and height using CSS styles:

```vue
<template>
  <Live2D class="live2d" @mounted="onLive2DMounted" />
</template>

<script setup lang="ts">
import {
  Live2D,
  LAppDelegateModule,
  LAppLive2DManagerModule,
} from "@ai-zen/live2d-vue";
import { ref } from "vue";

let currentModel = null;

const currentModelProfile = ref(null);

async function onLive2DMounted(
  _delegate: LAppDelegateModule.LAppDelegate,
  manager: LAppLive2DManagerModule.LAppLive2DManager
) {
  // Load the default model
  currentModel = await manager.changeModel(
    "/models/Hiyori",
    "Hiyori.model3.json"
  );

  // After loading the model, receive the character profile configuration (if any)
  currentModelProfile.value = await currentModel._profileManager.loadProfile();
}
</script>

<style scoped>
.live2d {
  width: 800px;
  height: 800px;
}
</style>
```

In addition, you need to manually include `live2dcubismcore.min.js`:

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Include the live2dcubismcore.min.js provided by the Live2D SDK in your website's HTML page -->
    <script src="/live2dcubismcore.min.js"></script>
  </head>
</html>
```

## API

### Props

This component does not expose any props.

### Events

| Event Name       | Description                                                            | Parameters                                                  |
| ---------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------- |
| mounted          | Triggered when the component is mounted                                | `delegate`: LAppDelegate, `manager`: LAppLive2DManager      |
| modelStateChange | Triggered if the state of the model changes during the loading process | `model`: LAppModel, `state`: LoadStep, `oldValue`: LoadStep |

### Instance Properties

This component exposes the following properties as-is: LAppDelegate, LAppLive2DManager
