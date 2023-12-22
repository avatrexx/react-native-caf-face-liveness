export interface FaceLivenessResponse {
  result: string | null;
  error: string | null;
  cancelled: boolean;
  isLoading: boolean;
}

export type StageType = "BETA" | "PROD" | "DEV";

export type FilterType = "LINE_DRAWING" | "NATURAL";

export type TimeType = "THREE_HOURS" | "THIRTY_DAYS" | null;

export interface FaceLivenessOptions {
  cafStage?: StageType;
  filter?: FilterType;
  imageUrlExpirationTime?: TimeType;
  enableScreenshots?: boolean;
  loadingScreen?: boolean;
}
