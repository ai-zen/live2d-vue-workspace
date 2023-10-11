import { LAppModel } from "./lappmodel";
import { LAppProfile } from "./lappprofile";

export enum LoadStep {
  UnLoadProfile,
  WaitLoadProfile,
  CompleteLoadProfile,
}

export class LAppProfileManager {
  _loadState = LoadStep.UnLoadProfile;
  _profile: LAppProfile;
  getModel: () => LAppModel;

  constructor(getModel: () => LAppModel) {
    this.getModel = getModel;
  }

  async loadProfile<T extends LAppProfile>() {
    const model = this.getModel();
    try {
      this._loadState = LoadStep.WaitLoadProfile;
      const profileFile = "profile.json";
      const response = await fetch(`${model._modelHomeDir}${profileFile}`);
      const profile = await response.json();
      this._profile = profile;
      if (this._profile.Skins) {
        model._skinsManager.setSkins(this._profile.Skins);
      }
      if (this._profile.Motions.RandomIdleMotionInterval) {
        model._randomIdleMotionInterval =
          this._profile.Motions.RandomIdleMotionInterval;
      }
      return profile as T;
    } catch (error) {
      console.log(
        `Failed to load configuration file for ${model._modelHomeDir}.`,
        error
      );
      return undefined;
    }
  }
}
