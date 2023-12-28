export interface FaceLivenessResponse {
  result: string | null;
  error: string | null;
  cancelled: boolean;
  isLoading: boolean;
}

export enum StageType {"BETA", "PROD", "DEV"};

export enum FilterType {"LINE_DRAWING", "NATURAL"};

export enum TimeType {"THREE_HOURS", "THIRTY_DAYS", "THIRTY_MIN"};

export interface FaceLivenessOptions {
  cafStage?: StageType;
  filter?: FilterType;
  imageUrlExpirationTime?: TimeType;
  enableScreenshots?: boolean;
  loadingScreen?: boolean;
}
