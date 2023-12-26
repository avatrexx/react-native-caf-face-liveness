import React from "react";
import { View, Button, StyleSheet } from "react-native";

import { useFaceLiveness } from "react-native-caf-face-liveness-1";

const App = () => {
  const mobileToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2NTRjZmFlMWM5YTM0NTAwMDg4YzIwODUifQ.maH9fynasnaRR2Hm5PxQ1XzLxlVZiZSvpVDD9zVtfgs";
  const peopleId = "43485449806";

  const { startFaceLiveness, error } = useFaceLiveness(mobileToken, peopleId, {
    cafStage: "PROD",
    filter: "NATURAL",
    enableScreenshots: true,
    loadingScreen: true,
    imageUrlExpirationTime: "THIRTY_DAYS",
  });

  console.log(error);

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
