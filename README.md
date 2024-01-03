<h1 align="center">
  react-native-caf-face-liveness
</h1>

# About

Library for React Native 

---

# Getting Started

```sh
yarn add react-native-caf-face-liveness
# or 
npm install react-native-caf-face-liveness
```

---

# Usage 

## TypeScript

```ts
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { 
  useFaceLiveness, 
  FaceLivenessOptions, 
  StageType, 
  FilterType, 
  TimeType 
} from 'react-native-caf-face-liveness';

export default function App() {
  const mobileToken: string = "";
  const peopleId: string = "";

  const options: FaceLivenessOptions = {
    cafStage: StageType.PROD;
    filter: FilterType.NATURAL;
    imageUrlExpirationTime: TimeType.THREE_HOURS;
    enableScreenshots: true;
    loadingScreen: true;
  } // optional

  const { 
    startFaceLiveness, 
    result, 
    error, 
    cancelled, 
    isLoading 
  } = useFaceLiveness(mobileToken, peopleId, options);

  return (
    <View style={styles.container}>
      <Button title="Press" onPress={startFaceLiveness} />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```
---

# Hooks

## useFaceLiveness

This hook provides `startFaceLiveness` method that start face liveness and your responses.

### Params

| Param       | Type                    | Default      | Description                                       |
| ----------- | ----------------------- | ------------ | ------------------------------------------------- |
| mobileToken | string                  | **Required** | Usage token associated with your Identity account |
| peopleId    | string                  | **Required** | User CPF                                          |
| options     | [FaceLivenessOptions](https://github.com/avatrexx/react-native-caf-face-liveness/tree/main?tab=readme-ov-file#facelivenessoptions) | Optional     | Settings for the liveness                         |

### Methods

| Method            | Params  | Response | Descriptions                    |    
| ----------------- | ------- | -------- | ------------------------------- | 
| startFaceLiveness | void    | void     | Method that start face liveness |

### Responses

[FaceLivenessResponse](https://github.com/avatrexx/react-native-caf-face-liveness/tree/main?tab=readme-ov-file#facelivenessresponse)

---

# Types

## FaceLivenessResponse

| Name      | Type           | Description                                              |
| --------- | -------------- | -------------------------------------------------------- |
| result    | string or null | Shows when face liveness returns a successful capture    |
| error     | string or null | Shows when the face livenes return some error            |
| cancelled | boolean        | Shows when user cancel the liveness                      |
| isLoading | boolean        | Shows when the face liveness is loading                  |

---

## FaceLivenessOptions

| Name                   | Type               | Description                                          |
| ---------------------- | ------------------ | ---------------------------------------------------- |
| cafStage               | [StageType](https://github.com/avatrexx/react-native-caf-face-liveness/tree/main?tab=readme-ov-file#stagetype)      | Change the development environment                   |
| filter                 | [FilterType](https://github.com/avatrexx/react-native-caf-face-liveness/tree/main?tab=readme-ov-file#filtertype)     | Change face liveness mask                            |
| imageUrlExpirationTime | [TimeType](https://github.com/avatrexx/react-native-caf-face-liveness/tree/main?tab=readme-ov-file#timetype)       | Change the expiration time of the face liveness url  |
| enableScreenshots      | boolean            | Toggle user screenshots                              | 
| loadingScreen          | boolean            | Toggle face liveness loading screen                  |

---

# Enums

## StageType

| Enum | Description             |
| ---- | ----------------------- |
| BETA | Beta environment        |
| PROD | Production environment  |
| DEV  | Develppment environment |

## FilterType

| Enum         | Description                        |
| ------------ | ---------------------------------- |
| LINE_DRAWING | Alternative mask for face liveness |
| NATURAL      | Normal mask for face liveness      |

## TimeType

| Enum        | Description                                         |
| ------------| --------------------------------------------------- |
| THREE_HOURS | Image url expiration time expires in three hours    |
| THIRTY_DAYS | Image url expiration time expires in thirty days    |
| THIRTY_MIN  | Image url expiration time expires in thirty minutes |




