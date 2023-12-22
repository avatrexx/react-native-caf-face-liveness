import React from "react";
import { View, Button } from "react-native";

import { useFaceLiveness } from "../src/hooks/useFaceLiveness";

const App = () => {
  const mobileToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2NTRjZmFlMWM5YTM0NTAwMDg4YzIwODUifQ.maH9fynasnaRR2Hm5PxQ1XzLxlVZiZSvpVDD9zVtfgs";
  const peopleId = "43485449806";

  const { startFaceLiveness } = useFaceLiveness(mobileToken, peopleId);

  return (
    <View>
      <Button title="Click me" onPress={startFaceLiveness} />
    </View>
  );
};

export { App };
