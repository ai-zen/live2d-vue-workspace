export interface LAppProfile {
  Skins: {
    Name: string;
    Mapping: Record<string, string>;
  }[];
  Motions: {
    RandomIdleMotionInterval: number;
  };
}
