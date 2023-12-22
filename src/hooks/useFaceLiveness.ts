import { useState, useEffect } from "react";
import { Platform } from "react-native";

import { module, moduleEventEmitter } from "../module";

import {
  FaceLivenessOptions,
  FaceLivenessResponse,
  StageType,
  FilterType,
} from "../types";

const isAndroid = Platform.OS === "android";

const useFaceLiveness = (
  mobileToken: string,
  peopleId: string,
  options?: FaceLivenessOptions
) => {
  const [response, setResponse] = useState<FaceLivenessResponse>({
    result: null,
    error: null,
    cancelled: null,
    isLoading: false,
  });

  const defaultOptions: FaceLivenessOptions = {
    cafStage: options?.cafStage || StageType.PROD,
    filter: options?.filter || FilterType.NATURAL,
    setLoadingScreen: options?.setLoadingScreen || false,
    setEnableScreenshots: options?.setEnableScreenshots || false,
  };

  const formattedOptions = (): string => {
    const formatToJSON = JSON.stringify({
      ...defaultOptions,
      cafStage: isAndroid
        ? StageType[defaultOptions.cafStage!!]
        : defaultOptions.cafStage,
      filter: isAndroid
        ? FilterType[defaultOptions.filter!!]
        : defaultOptions.filter,
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
        cancelled: null,
        isLoading: false,
      });
    });

    moduleEventEmitter.addListener("FaceLiveness_Error", (event) => {
      setResponse({
        result: null,
        error: event,
        cancelled: null,
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

    moduleEventEmitter.addListener("onFaceLivenessLoading", (event) => {
      setResponse({
        result: null,
        error: null,
        cancelled: null,
        isLoading: event,
      });
    });

    moduleEventEmitter.addListener("FaceLiveness_Loaded", (event) => {
      setResponse({
        result: null,
        error: null,
        cancelled: null,
        isLoading: !event,
      });
    });

    return () => {
      moduleEventEmitter.removeAllListeners("FaceLiveness_Success");
      moduleEventEmitter.removeAllListeners("FaceLiveness_Error");
      moduleEventEmitter.removeAllListeners("FaceLiveness_Cancel");
      moduleEventEmitter.removeAllListeners("onFaceLivenessLoading");
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
