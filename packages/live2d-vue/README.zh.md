# live2d-vue

Live2D-Vue 是一个 Vue 组件，用于集成 Live2D 视图到 Vue 项目中.

## 安装

使用 npm 安装：

```shell
npm install @ai-zen/live2d-vue
```

或使用 yarn 安装：

```shell
yarn add @ai-zen/live2d-vue
```

## 使用方式

在 Vue 组件中引入 Live2D 组件，并通过 css 样式为其设置宽高：

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

另外，需要手动引入 `live2dcubismcore.min.js` ：

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- 在你网站的 HTML 页面中引用 Live2D 官方 SDK 提供的 live2dcubismcore.min.js -->
    <script src="/live2dcubismcore.min.js"></script>
  </head>
</html>
```

## API

### Props

该组件没有暴露任何 props。

### Events

| 事件名           | 说明                               | 参数                                                         |
| ---------------- | ---------------------------------- | ------------------------------------------------------------ |
| ready            | Live2D 初始化完成后触发            |                                                              |
| modelStateChange | 模型在加载过程中如果状态变化则触发 | `model`: LAppModel, `state`: LoadStep, `prevState`: LoadStep |

### 实例属性

该组件暴露了以下属性：

- LAppDelegate
- LAppLive2DManager
- delegateRef
- managerRef
- isReady
