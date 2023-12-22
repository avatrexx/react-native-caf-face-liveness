export interface FaceLivenessResponse {
  result: string | null;
  error: string | null;
  cancelled: boolean;
  isLoading: boolean;
}

export type StageType = "BETA" | "PROD" | "DEV";

export type FilterType = "LINE_DRAWING" | "NATURAL";

export interface FaceLivenessOptions {
  cafStage?: StageType;
  filter?: FilterType;
  setEnableScreenshots?: boolean;
  setLoadingScreen?: boolean;
}
