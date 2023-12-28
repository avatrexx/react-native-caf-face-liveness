import { useState, useEffect } from "react";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";

import { module, moduleEventEmitter } from "../module";

import {
  FaceLivenessOptions,
  FaceLivenessResponse,
  FilterType,
  StageType,
  TimeType,
} from "../types";

const useFaceLiveness = (
  mobileToken: string,
  peopleId: string,
  options?: FaceLivenessOptions
) => {
  const [response, setResponse] = useState<FaceLivenessResponse>({
    result: null,
    error: null,
    cancelled: false,
    isLoading: false,
  });

  const defaultOptions: FaceLivenessOptions = {
    cafStage: options?.cafStage ?? StageType.PROD,
    filter: options?.filter ?? FilterType.NATURAL,
    imageUrlExpirationTime:
      options?.imageUrlExpirationTime ?? TimeType.THIRTY_MIN,
    loadingScreen: options?.loadingScreen ?? false,
    enableScreenshots: options?.enableScreenshots ?? false,
  };

  const formattedOptions = (): string => {
    const formatToJSON = JSON.stringify({
      ...defaultOptions,
      filter: isAndroid
        ? FilterType[defaultOptions.filter!]
        : defaultOptions.filter,
      cafStage: isAndroid
        ? StageType[defaultOptions.cafStage!]
        : defaultOptions.cafStage,
      imageUrlExpirationTime: isAndroid
        ? TimeType[defaultOptions.imageUrlExpirationTime!]
        : defaultOptions.imageUrlExpirationTime,
    });

    return formatToJSON;
  };

  const startFaceLiveness = () =>
    module.startFaceLiveness(mobileToken, peopleId, formattedOptions());

  useEffect(() => {
    moduleEventEmitter.addListener("FaceLiveness_Success", (event) => {
      setResponse({
        result: event,
        error: null,
        cancelled: false,
        isLoading: false,
      });
    });

    moduleEventEmitter.addListener("FaceLiveness_Error", (event) => {
      setResponse({
        result: null,
        error: event,
        cancelled: false,
        isLoading: false,
      });
    });

    moduleEventEmitter.addListener("FaceLiveness_Cancel", (event) => {
      setResponse({
        result: null,
        error: null,
        cancelled: event,
        isLoading: false,
      });
    });

    moduleEventEmitter.addListener("FaceLiveness_Loading", (event) => {
      setResponse({
        result: null,
        error: null,
        cancelled: false,
        isLoading: event,
      });
    });

    moduleEventEmitter.addListener("FaceLiveness_Loaded", (event) => {
      setResponse({
        result: null,
        error: null,
        cancelled: false,
        isLoading: !event,
      });
    });

    return () => {
      moduleEventEmitter.removeAllListeners("FaceLiveness_Success");
      moduleEventEmitter.removeAllListeners("FaceLiveness_Error");
      moduleEventEmitter.removeAllListeners("FaceLiveness_Cancel");
      moduleEventEmitter.removeAllListeners("FaceLiveness_Loading");
      moduleEventEmitter.removeAllListeners("FaceLiveness_Loaded");
    };
  }, []);

  return {
    startFaceLiveness,
    result: response.result,
    error: response.error,
    cancelled: response.cancelled,
    isLoading: response.isLoading,
  };
};

export { useFaceLiveness };
