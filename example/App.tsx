import React from "react";
import { View, Button, StyleSheet } from "react-native";

import {
  useFaceLiveness,
  FilterType,
  StageType,
  TimeType,
} from "react-native-caf-face-liveness";

const App = () => {
  const mobileToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2NTRjZmFlMWM5YTM0NTAwMDg4YzIwODUifQ.maH9fynasnaRR2Hm5PxQ1XzLxlVZiZSvpVDD9zVtfgs";
  const peopleId = "47496803898";

  const { startFaceLiveness, result, error, cancelled, isLoading} = useFaceLiveness(mobileToken, peopleId, {
    cafStage: StageType.PROD,
    filter: FilterType.LINE_DRAWING,
    imageUrlExpirationTime: TimeType.THREE_HOURS,
    enableScreenshots: false,
    loadingScreen: true,
  });
console.log("result ",result)
console.log("error ",error)
console.log("canceled ",cancelled)
console.log("loading ",isLoading)
  return (
    <View style={styles.container}>
      <Button title="teste" onPress={startFaceLiveness} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
