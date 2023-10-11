import { LAppDelegate } from "./lappdelegate";
import { LAppModel } from "./lappmodel";
import { TextureInfo } from "./lapptexturemanager";

export enum LoadStep {
  UnLoadTexture,
  WaitLoadTexture,
  CompleteLoadTexture,
}

export interface LAppSkin {
  Name: string;
  Mapping: Record<string, string>;
}

function loopSwitchByArray<T>(array: T[], value: T) {
  let index = array.indexOf(value);
  // if (index != -1) index++;
  index++; // -1 to 0
  if (index == array.length) index = 0;
  return array[index];
}

export class LAppSkinsManager {
  _loadState = LoadStep.UnLoadTexture;
  _skin: LAppSkin | null;
  _skins: LAppSkin[];
  _skinsMap: Map<string, LAppSkin>;
  getModel: () => LAppModel;

  constructor(getModel: () => LAppModel) {
    this.getModel = getModel;
  }

  setSkins(skins: LAppSkin[]) {
    this._skin = skins.find((skin) => skin.Name == "default") || null;
    this._skins = skins;
    this._skinsMap = new Map(skins.map((skin) => [skin.Name, skin]));
  }

  changeSkin(skinName: string) {
    const skin = this._skinsMap.get(skinName);
    if (skin) {
      this._skin = skin;
      this.setupTexturesByPathsMap(skin.Mapping);
    }
  }

  switchSkin() {
    const skin = loopSwitchByArray(this._skins, this._skin);
    this.changeSkin(skin.Name);
  }

  setupTexturesByPathsMap(pathsMap: Record<string, string>): void {
    const model = this.getModel();

    if (!model._modelSetting) return;

    console.log("[CALL INFO]setupTexturesByPathsMap", pathsMap);

    // iPhoneでのアルファ品質向上のためTypescriptではpremultipliedAlphaを採用
    const usePremultiply = true;

    // 这个方法行为是强制的，故需要更新状态
    this._loadState = LoadStep.WaitLoadTexture;

    // テクスチャ読み込み用
    const textureCount: number = model._modelSetting.getTextureCount();

    // 已完成数量
    let doneTextureCount = 0;

    // 标记步进完成
    const stepDone = () => {
      doneTextureCount++;

      if (doneTextureCount >= textureCount) {
        // ロード完了
        this._loadState = LoadStep.CompleteLoadTexture;
      }
    };

    for (
      let modelTextureNumber = 0;
      modelTextureNumber < textureCount;
      modelTextureNumber++
    ) {
      const rawTextureFileName =
        model._modelSetting.getTextureFileName(modelTextureNumber);
      const mapTextureFileName =
        model._modelHomeDir + pathsMap[rawTextureFileName];

      // テクスチャ名が空文字だった場合はロード・バインド処理をスキップ
      if (!rawTextureFileName) {
        console.log("rawTextureFileName null");
        stepDone();
        continue;
      }

      // 映射不存在时也跳过
      if (!mapTextureFileName) {
        console.log("mapTextureFileName null");
        stepDone();
        continue;
      }

      // WebGLのテクスチャユニットにテクスチャをロードする
      const texturePath = mapTextureFileName;

      // ロード完了時に呼び出すコールバック関数
      const onLoad = (textureInfo: TextureInfo): void => {
        model.getRenderer().bindTexture(modelTextureNumber, textureInfo.id);
        stepDone();
      };

      console.log("rawTextureFileName", rawTextureFileName);
      console.log("mapTextureFileName", mapTextureFileName);

      // 読み込み
      LAppDelegate.getInstance()
        .getTextureManager()
        .createTextureFromPngFile(texturePath, usePremultiply, onLoad);
      model.getRenderer().setIsPremultipliedAlpha(usePremultiply);
    }
  }
}
