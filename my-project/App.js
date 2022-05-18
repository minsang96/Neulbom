import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import Root from "./navigation/Root";
import store from "./store";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delay_splash() {
  await SplashScreen.preventAutoHideAsync();
  await sleep(1000);
  await SplashScreen.hideAsync();
}

export default function App() {
  delay_splash();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("늘봄(Neulbom)", remoteMessage.notification.body);
    });

    return unsubscribe;
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.block}>
        <Root></Root>
        {/* <Tabs></Tabs> */}
        {/* <Stack></Stack> */}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: "white",
  },
});
