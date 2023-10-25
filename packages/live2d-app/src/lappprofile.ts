export interface LAppProfile {
  Model3: string;
  Skins: {
    Name: string;
    Mapping: Record<string, string>;
  }[];
  Motions: {
    RandomIdleMotionInterval: number;
  };
}
