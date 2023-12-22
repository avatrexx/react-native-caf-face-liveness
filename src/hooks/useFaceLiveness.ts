import { useState, useEffect } from "react";

import { module, moduleEventEmitter } from "../module";

import { FaceLivenessOptions, FaceLivenessResponse } from "../types";

const useFaceLiveness = (
  mobileToken: string,
  peopleId: string,
  options?: FaceLivenessOptions
) => {
  console.log("options", options);

  const [response, setResponse] = useState<FaceLivenessResponse>({
    result: null,
    error: null,
    cancelled: false,
    isLoading: false,
  });

  const defaultOptions: FaceLivenessOptions = {
    cafStage: options?.cafStage || "PROD",
    filter: options?.filter || "NATURAL",
    setLoadingScreen: options?.setLoadingScreen || false,
    setEnableScreenshots: options?.setEnableScreenshots || false,
  };

  console.log("defaultOptions", defaultOptions);

  const formattedOptions = (options: FaceLivenessOptions): string => {
    const formatToJSON = JSON.stringify({
      ...options,
    });

    console.log("formattedOptions", formatToJSON);

    return formatToJSON;
  };

  const startFaceLiveness = () =>
    module.startFaceLiveness(
      mobileToken,
      peopleId,
      formattedOptions(defaultOptions)
    );

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
