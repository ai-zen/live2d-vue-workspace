// vite.config.js
import vue from "@vitejs/plugin-vue";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  resolve: {
    alias: {
      "@app": resolve(__dirname, "./src/app"),
      "@core": resolve(__dirname, "./src/CubismSdkForWeb-5-r.1/Core"),
      "@framework": resolve(
        __dirname,
        "./src/CubismSdkForWeb-5-r.1/Framework/src"
      ),
    },
  },
  plugins: [
    vue(),
    dts({
      include: ["src"],
      staticImport: true,
      insertTypesEntry: true,
      rollupTypes: true,
      copyDtsFiles: true,
      tsconfigPath: "./tsconfig.json",
      afterBuild() {
        const mainDTs = resolve(__dirname, "./dist/main.d.ts");
        let content = readFileSync(mainDTs, { encoding: "utf-8" });
        content = `import "./live2dcubismcore.d.ts";\r\n` + content;
        writeFileSync(mainDTs, content);
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: "./src/CubismSdkForWeb-5-r.1/Core/live2dcubismcore.d.ts",
          dest: "./",
        },
        {
          src: "./src/CubismSdkForWeb-5-r.1/Core/live2dcubismcore.min.js",
          dest: "./",
        },
      ],
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/main.ts"),
      name: "Live2D Vue",
      // the proper extensions will be added
      fileName: "live2d-vue",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
