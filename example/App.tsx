import { View, Button } from "react-native"
import CafFaceLiveness from "react-native-caf-face-liveness"
//import {FaceLivenessCAFStage, FaceLivenessFilter} from "./type"
export const App = () => {
  const config = {
    cafStage: "PROD",
    filter: "NATURAL",
    setEnableScreenshots: false,
    setLoadingScreen: true
  };
  function formatedConfig(config?: any) {
    const responseConfig = config;
  
    return JSON.stringify({
      ...responseConfig,
      filter: responseConfig.filter,
      cafStage: responseConfig.cafStage
    })
  }
  return (
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}><Button title="CafRN" onPress={() => CafFaceLiveness.faceLiveness("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2MmY1NmI2ODE4MWNmYjAwMDk0ZGM2ZTIifQ.rp0URQxpO8LC3NYALlhYboxMlLUVqHk1avk-b_3rtlk", "47496803898", formatedConfig(config))} /></View>
  )
}