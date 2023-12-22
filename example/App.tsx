import React from "react";
import { View, Button, StyleSheet } from "react-native";

import {
  useFaceLiveness,
  FaceLivenessOptions,
  StageType,
  FilterType,
} from "react-native-caf-face-liveness-1";

const App = () => {
  const mobileToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2NTRjZmFlMWM5YTM0NTAwMDg4YzIwODUifQ.maH9fynasnaRR2Hm5PxQ1XzLxlVZiZSvpVDD9zVtfgs";
  const peopleId = "43485449806";

  const { startFaceLiveness, result, cancelled, error, isLoading } =
    useFaceLiveness(mobileToken, peopleId, {});

  console.log("result", result);
  console.log("cancelled", cancelled);
  console.log("error", error);
  console.log("isLoading", isLoading);

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
