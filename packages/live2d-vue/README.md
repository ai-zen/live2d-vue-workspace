# live2d-vue

Live2D-Vue is a vue component lib for integrating Live2D views into Vue projects.

## Installation

Install using npm:

```shell
npm install @ai-zen/live2d-vue
```

or using yarn:

```shell
yarn add @ai-zen/live2d-vue
```

## Usage

Import the Live2D component in your Vue component and set its width and height using CSS styles:

```vue
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

| Event Name       | Description                                                            | Parameters                                                   |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------ |
| ready            | Triggered when Live2D initialized.                                     |                                                              |
| modelStateChange | Triggered if the state of the model changes during the loading process | `model`: LAppModel, `state`: LoadStep, `prevState`: LoadStep |

### Instance Properties

This component exposes:

- LAppDelegate
- LAppLive2DManager
- delegateRef
- managerRef
- isReady
