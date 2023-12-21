import { useState, useEffect } from "react";

import { module, moduleEventEmitter } from "../module";

import { FaceLivenessProps, FaceLivenessResponse } from "../types";

const useFaceLiveness = (
  mobileToken: string,
  peopleId: string,
  options?: FaceLivenessProps
) => {
  const [response, setResponse] = useState<FaceLivenessResponse>({
    result: null,
    error: null,
    cancelled: null,
    isLoading: false,
  });

  const startFaceLiveness = () =>
    module.startFaceLiveness(mobileToken, peopleId, options);

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
  }, [mobileToken]);

  return [
    startFaceLiveness,
    response.result,
    response.error,
    response.cancelled,
    response.isLoading,
  ];
};

export { useFaceLiveness };
