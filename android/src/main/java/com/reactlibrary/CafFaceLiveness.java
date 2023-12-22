package com.reactlibrary;

import android.content.Context;
import android.os.Bundle;

import javax.annotation.Nonnull;

import com.caf.facelivenessiproov.input.FaceLiveness;
import com.caf.facelivenessiproov.input.VerifyLivenessListener;
import com.caf.facelivenessiproov.output.FaceLivenessResult;
import com.caf.facelivenessiproov.output.failure.NetworkReason;
import com.caf.facelivenessiproov.output.failure.SDKFailure;
import com.caf.facelivenessiproov.output.failure.ServerReason;

import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONException;

public class CafFaceLiveness extends ReactContextBaseJavaModule {
    private Context context;
    private String customConfig;

    CafFaceLiveness(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return "CafFaceLiveness";
    }

    @ReactMethod
    public void startFaceLiveness(String token, String personId, String config) {
        customConfig = config;

        FaceLivenessConfig formattedConfig = new FaceLivenessConfig(customConfig);

        FaceLiveness faceLiveness = new FaceLiveness.Builder(token)
                .setStage(formattedConfig.cafStage)
                .setFilter(formattedConfig.filter)
                .setEnableScreenshots(formattedConfig.setEnableScreenshots)
                .setLoadingScreen(formattedConfig.setLoadingScreen)
                .build();

        faceLiveness.startSDK(this.context, personId, new VerifyLivenessListener() {
            @Override
            public void onSuccess(FaceLivenessResult faceLivenessResult) {
                WritableMap writableMap = new WritableNativeMap();
                writableMap.putString("data", faceLivenessResult.getSignedResponse());

                getReactInstanceManager().getCurrentReactContext()
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("FaceLiveness_Success", writableMap);
                finish();
            }

            @Override
            public void onError(FaceLivenessResult faceLivenessResult) {
                String message = "Error: " + faceLivenessResult.getErrorMessage();
                ;
                String type = "Error";
                WritableMap writableMap = new WritableNativeMap();
                SDKFailure sdkFailure = faceLivenessResult.getSdkFailure();

                if (sdkFailure instanceof NetworkReason) {
                    message = ("FaceLivenessResult " + "onError: " + " Throwable: " + ((NetworkReason) faceLivenessResult.getSdkFailure()).getThrowable());
                } else if (sdkFailure instanceof ServerReason) {
                    message = ("FaceLivenessResult " + "onError: " + " Status Code: " + ((ServerReason) faceLivenessResult.getSdkFailure()).getCode());
                    message = message + " Status Message: " + faceLivenessResult.getSdkFailure().getMessage();
                }

                writableMap.putString("message", message);
                writableMap.putString("type", type);

                getReactInstanceManager().getCurrentReactContext()
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("FaceLiveness_Error", writableMap);
                finish();
            }

            @Override
            public void onCancel(FaceLivenessResult faceLivenessResult) {
                WritableMap writableMap = new WritableNativeMap();
                getReactInstanceManager().getCurrentReactContext()
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("FaceLiveness_Cancel", writableMap);
                finish();
            }

            @Override
            public void onLoading() {
                WritableMap writableMap = new WritableNativeMap();

                getReactInstanceManager().getCurrentReactContext()
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("FaceLiveness_Loading", writableMap);
            }

            @Override
            public void onLoaded() {
                WritableMap writableMap = new WritableNativeMap();

                getReactInstanceManager().getCurrentReactContext()
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("FaceLiveness_Loaded", writableMap);
            }
        });
    }
}