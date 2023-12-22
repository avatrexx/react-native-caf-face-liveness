export interface FaceLivenessResponse {
  result: string | null;
  error: string | null;
  cancelled: string | null;
  isLoading: boolean;
}

export interface FaceLivenessOptions {
  cafStage?: StageType;
  filter?: FilterType;
  setEnableScreenshots: boolean;
  setLoadingScreen: boolean;
}

export enum StageType {
  BETA,
  PROD,
  DEV,
}
export enum FilterType {
  LINE_DRAWING,
  NATURAL,
}
