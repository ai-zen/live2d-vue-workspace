/// <reference types="vite/client" />

import Live2D from "./Live2D.vue";

import "@ai-zen/live2d-core/live2dcubismcore.d.ts";
import * as LAppDefineModule from "@ai-zen/live2d-app/dist/lappdefine";
import * as LAppDelegateModule from "@ai-zen/live2d-app/dist/lappdelegate";
import * as LAppLive2DManagerModule from "@ai-zen/live2d-app/dist/lapplive2dmanager";
import * as LAppModelModule from "@ai-zen/live2d-app/dist/lappmodel";
import * as LAppPalModule from "@ai-zen/live2d-app/dist/lapppal";
import * as LAppProfileModule from "@ai-zen/live2d-app/dist/lappprofile";
import * as LAppProfileManagerModule from "@ai-zen/live2d-app/dist/lappprofilemanager";
import * as LAppSkinsManagerModule from "@ai-zen/live2d-app/dist/lappskinsmanager";
import * as LAppSpriteModule from "@ai-zen/live2d-app/dist/lappsprite";
import * as LAppTextureManagerModule from "@ai-zen/live2d-app/dist/lapptexturemanager";
import * as LAppViewModule from "@ai-zen/live2d-app/dist/lappview";
import * as LAppWavFileHandlerModule from "@ai-zen/live2d-app/dist/lappwavfilehandler";
import * as TouchManagerModule from "@ai-zen/live2d-app/dist/touchmanager";

export {
  Live2D,
  LAppDefineModule,
  LAppDelegateModule,
  LAppLive2DManagerModule,
  LAppModelModule,
  LAppPalModule,
  LAppProfileModule,
  LAppProfileManagerModule,
  LAppSkinsManagerModule,
  LAppSpriteModule,
  LAppTextureManagerModule,
  LAppViewModule,
  LAppWavFileHandlerModule,
  TouchManagerModule,
};
