package com.reactlibrary;

import com.caf.facelivenessiproov.input.CAFStage;
import com.caf.facelivenessiproov.input.iproov.Filter;
import com.caf.facelivenessiproov.input.Time;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;

public class FaceLivenessConfig implements Serializable {
    public CAFStage cafStage;
    public Filter filter;
    public Time imageUrlExpirationTime;
    public boolean enableScreenshots;
    public boolean loadingScreen;

    public  FaceLivenessConfig(String jsonString) throws JSONException {
        JSONObject jsonObject = new JSONObject(jsonString);

        this.cafStage = CAFStage.valueOf(jsonObject.getString("cafStage"));
        this.filter = Filter.valueOf(jsonObject.getString("filter"));
        this.imageUrlExpirationTime = Time.valueOf(jsonObject.getString("imageUrlExpirationTime"));
        this.enableScreenshots = jsonObject.getBoolean("enableScreenshots");
        this.loadingScreen = jsonObject.getBoolean("loadingScreen");
    }
}