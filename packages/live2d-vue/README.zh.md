# live2d-vue

live2d-vue 是一个用于在 Vue 项目中集成 Live2D 视图的 npm 包。

## 安装

使用 npm 安装：

```shell
npm install live2d-vue
```

或使用 yarn 安装：

```shell
yarn add live2d-vue
```

## 使用方式

在 Vue 组件中引入 Live2D 组件，并通过 css 样式为其设置宽高：

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

| 事件名           | 说明                               | 参数                                                        |
| ---------------- | ---------------------------------- | ----------------------------------------------------------- |
| mounted          | 组件挂载完成时触发                 | `delegate`: LAppDelegate，`manager`: LAppLive2DManager      |
| modelStateChange | 模型在加载过程中如果状态变化则触发 | `model`: LAppModel, `state`: LoadStep, `oldValue`: LoadStep |

### 实例属性

该组件原样暴露了以下属性：LAppDelegate, LAppLive2DManager
