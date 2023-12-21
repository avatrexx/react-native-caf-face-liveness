export interface FaceLivenessResponse {
  result: string | null;
  error: string | null;
  cancelled: string | null;
  isLoading: boolean;
}

export interface FaceLivenessProps {
  stage?: StageType;
  filter?: FilterType;
}

export type StageType = "PROD" | "BETA" | "DEV";
export type FilterType = "NATURAL" | "LINE_DRAWING";
